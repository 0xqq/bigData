import QueryPmBase from "./QueryPmBase" ;

export default class PagePm extends QueryPmBase{

  constructor( method = null ,mode=0,listAtt="list",noFilter=false) {
    super(method);
    this.testHandler = null ;//测试
    this.resulthandler = null ;//完全处理数据
    this.faultouthandler = null ;
    this.resultListHandler = null ;//单独处理数据
    this.resultItemHandler = null ;//对数据做单独处理
    this.initPageData() ;
    this.pageMode = mode ;//分页模式 0 自己的默认 1人大金仓的
    this.listAtts = listAtt;//列表对应属性
    this.noFilter = noFilter ;//是否有filters
    this.sortAtt = "dir" ;//排序字段
  }

  /**
   * 初始化分页数据
   */
  initPageData(){
    this.sendData = {};//参数
    this.initData({
      sourceList:[],//数据源列表
      totalIndex: 0,
      currentPage: 1,
      pageSize: 20,//每页条数
      pageSizes: [5,10,20, 50, 100, 200, 400]  //条数 列表
    });
  }

  /**
   * 重置为初始化状态
   */
  reset(){
    this.data.inited = false ;
    this.initPageData() ;
  }

  /**
   * 分页变化统一处理
   * @param data
   */
  pageChange(data){
    if(data.type==="size")
      this.pageSizeChange(data.val) ;
    else
      this.currentPageChange(data.val);
  }

  /**
   * 当前页变化
   */
  currentPageChange(val){
    if(val === this.data.currrentPage)
      return ;
    this.data.currrentPage = val ;
    this.pageQuery() ;
  }

  /**
   * 当前页数量变化
   */
  pageSizeChange(val){
    if(val === this.data.pageSize)
      return ;
    this.data.pageSize = val ;
    this.data.currrentPage = 1 ;
    this.pageQuery() ;
  }

  /**
   * 页变化查询
   */
  pageQuery(){
    this.sendData.page = this.data.currrentPage ;
    this.sendData.pageSize = this.data.pageSize ;

    this.query(  this.sendData ) ;
  }

  /**
   * 查询数据列表
   */
  queryList( param ,paramFixed ,resulthandler=null,sort=null,faulthandler=null){
    this.resulthandler = resulthandler ;
    this.faultouthandler =  faulthandler ;
    this.data.inited = true ;//查询过后打个标记
    this.data.totalIndex = 0 ;
    this.data.currrentPage = 1 ;
    this.sendData.page = this.data.currrentPage ;
    this.sendData.pageSize = this.data.pageSize ;

    //本地测试 跳过查询
    if(this.testHandler){
      this.data.isLoading = true ;
      setTimeout(()=>{
        this.data.isLoading = false ;
        let _list = this.testHandler() ;
        let _resulll = {list:_list,total:_list.length ,totalCount:_list.length} ;
        _resulll[this.listAtts] = _list ;
        let _result = {data:_resulll,resultdata:_resulll} ;
        this.sendQueryParamsHandler(_result) ;
      },600);
      return ;
    }

    //创建顾虑条件
    if(this.pageMode===1){
      this.sendData.startIndex = 0 ;//默认需要有个
      if(param)
        this.sendData = this.initData(param,this.sendData) ;
    }
    else{
      //固定参数
      if(paramFixed)
        this.initData(paramFixed,this.sendData) ;

      //又一个变异品种
      if(this.noFilter){
        if(param)
          this.sendData.filters = this.createFilter(param) ;
        if(sort)
          this.sendData.sort = this.createSort(sort) ;
      }
      else{
        this.sendData.filter = {} ;
        if(param)
          this.sendData.filter.filters = this.createFilter(param) ;
        if(sort)
          this.sendData.sort = this.createSort(sort) ;
      }
    }
    this.query( this.sendData ) ;
  }

  /**
   * 重新查询
   */
  reQuery(){
    this.query(  this.sendData ) ;
  }

  /**
   * 创建排序
   * @param sorts
   * @returns {*}
   */
  createSort(sorts){
    return super.createSort(sorts,this.sortAtt) ;
  }

  /**
   * 查询成功处理
   */
  sendQueryParamsHandler( result ){
    if(result ){

      //总页数
     this.data.totalIndex = this.getResultCount(result) ;

      if(this.resultListHandler!==null)
        this.data.sourceList = this.resultListHandler( result )  ;//
      else
        this.data.sourceList = this.getDefaultList( result ) ;

      if(this.resulthandler)
        this.resulthandler(this.data.sourceList) ;
    }
    else{ //避免同条数抖动 最后赋值
      this.data.sourceList = [] ;
    }
  }

  /**
   * 解析总页数
   * @param result
   */
  getResultCount( result ){
    let total = 0 ;
    if(this.pageMode===0) {
      if(!result.data || !result.data.total)//有空的情况过滤判断
        total = 0 ;
      else
        total = parseInt(result.data.total) ;
    }
    else
      total = parseInt(result.resultdata.totalCount) ;//人大金仓的
    if(isNaN(total))
      total = 0 ;
    return total ;
  }

  /**
   * 默认解析列表
   * @param result
   * @returns {Array}
   */
  getDefaultList( result ){
     if(this.pageMode===0)
      return this.getResultList(result) ;
    else if(this.pageMode===1){
        if(!this.listAtts)//规则性因人而异
           return result.resultdata;
       else
          return result.resultdata[this.listAtts] ;
     }
    return [] ;
  }

  /**
   * 错误处理
   * @param info
   */
  faultHandler(info){
    super.faultHandler(info) ;
    this.data.sourceList = [] ;
    if(this.faultouthandler!==null)
      this.faultouthandler() ;
  }
}

