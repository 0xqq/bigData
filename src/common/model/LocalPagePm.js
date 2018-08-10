//-----------------------------------------
// title: 本地分页控制类
// author:zc
// date:
// desc:
//------------------------------------------

import QueryPmBase from "./QueryPmBase" ;

export default class LocalPagePm extends QueryPmBase{

  constructor( method = null ) {
    super(method);
    this.resulthandler = null ;//完全处理数据
    this.resultListHandler = null ;//单独处理数据
    this.initData({
      sourceList:[],//数据源列表
      totalIndex: 0,
      hasMorePage:0,
      currentPage: 1,
      pageSize: 20,//每页条数
      pageSizes: [5,10,20, 50, 100, 200, 400]  //条数 列表
    });

    this.sendData = {};//参数
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
    let _re = [] ;
    let _endIndex = Math.min(this.data.currrentPage * this.data.pageSize,this.catchList.length );
    let _startIndex = (this.data.currrentPage-1) * this.data.pageSize ;
    for(let i=_startIndex;i<_endIndex;i++){
      _re.push(this.catchList[i]) ;
    }
    this.data.sourceList = _re ;
  }

  /**
   * 查询数据列表
   */
  queryList( param , sort ){
    this.data.totalIndex = 0 ;
    this.data.currrentPage = 1 ;
    this.sendData = param ;
    this.query(  param ) ;
  }

  /**
   * 重新查询
   */
  reQuery(){
    this.query( this.sendData ) ;
  }

  /**
   * 查询成功处理
   */
  sendQueryParamsHandler( result ){
    if(result ){
      let _list = [] ;
      if(this.resultListHandler)
        _list = this.resultListHandler(result )  ;//
      else
        _list = this.getResultList(result) ;//
      this.setQueryResult( _list ) ;
    }

    else{ //避免抖动 最后赋值
      this.setQueryResult([])
    }
  }

  /**
   * 外部设置列表
   * @param list
   */
  setQueryResult( list ){
    this.data.currrentPage = 1 ;
    this.catchList =  list  ;//
    this.data.totalIndex = this.catchList.length ;//总页数
    this.pageQuery() ;
  }

  /**
   * 重置
   */
  reset(){
    this.catchList = [] ;
    this.data.sourceList = [] ;
    this.data.currrentPage = 1 ;
    this.data.totalIndex = 0 ;
  }

  /**
   * 错误处理
   * @param info
   */
  faultHandler(info){
    super.faultHandler(info) ;
    this.catchList = [] ;
    this.data.sourceList = [] ;
  }
}

