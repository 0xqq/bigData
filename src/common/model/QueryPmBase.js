//-----------------------------------------
// title:单个查询信息基类 参数组装可以放到 api发送拦截位置 temp?
// author:zc
// date:
// desc:
//------------------------------------------

export default class QueryPmBase{

  constructor(queryMethod) {
    this.queryData = null ;//查询返回数据
    this.queryMethod = queryMethod ;//查询方法
    this.pagePM = null ;
    this.owner = null ;
    this.data ={
      inited:false,
      isLoading:false,
    }
  }

  /**
   * 补充数据
   */
  initData(value,toobj){
    if(!toobj)
      toobj = this.data ;
    if(value)
      Object.assign(toobj, value);
    return toobj ;
  }

  /**
   * 补充数据
   */
  initDataForm(value, att , toObj=null){
    if(!toObj)
      toObj = this.data ;
    if(!toObj.hasOwnProperty(att) || !toObj[att])
      toObj[att] = {} ;
    this.initData(value,toObj[att]) ;
    return toObj[att] ;
  }

  /**
  * 查询数据列表
  */
  queryList( params ,handler=null,order=null){
    this.data.deleteItems = [] ;
    if(this.pagePM)
      this.pagePM.queryList(params,null,handler,order) ;
  }

  /**
   * 重新查询当前数据
   */
  reQuery(){
    if(this.pagePM)
      this.pagePM.reQuery() ;
  }

  /**
   * 查询数据 开始没整理好 temp?
   */
  query(param,successfunc=null,errorfunc=null,qmethod=null){
    if(qmethod===null)
      qmethod = this.queryMethod ;
    this.sendQueryParams(qmethod,param,successfunc,errorfunc) ;
  }


  /**
   * 创建统一过滤条件格式参数
   * @param params
   * @returns {*}
   */
  createFilter( params ) {
    let _filters = [];
    for (let att in params) {
      _filters.push({field: att, value: params[att]});
    }
    return _filters ;
  }

  /**
   * 创建排序字段
   * @param sorts
   */
  createSort( sorts ,attName="dir"){
    if(!sorts)
      return ;
    let _sorts = [];
    for (let att in sorts) {
      let dir = (sorts[att]+"").toUpperCase() ;
      if(dir ==="ASC" || dir === "DESC"){
        let sor = {field: att} ;
        sor[attName] =  dir ;
        _sorts.push(sor);
      }
    }
    return _sorts ;
  }

  /**
   * 获得当前用户通用信息对象
   */
  createUserParams( params ){
    return params ;
  }
  getCurrentInfo(){
  }

  /**
   *  调用远程接口
   */
  sendParams( apimethod ,params){
    if(!apimethod)
      return ;
    this.data.isLoading = true ;
    var param = this.createUserParams(params) ;
    return apimethod(param) ;
  }

  /**
   * 独立一个查询
   */
  sendQueryParams(qmethod,param,successfunc=null,errorfunc=null){
    if(!qmethod)
      return ;
    this.data.isLoading = true ;
    this.sendParams(qmethod,param).then(
      (result)=>{
          this.data.isLoading = false ;
          if(!successfunc)
            this.sendQueryParamsHandler(result) ;
          else
            successfunc(result) ;
      },
      (info)=>{
        this.data.isLoading = false ;
        if(errorfunc)
          errorfunc(info) ;
        else
          this.faultHandler(info) ;
      }
    );
  }

  /**
   * 工具方法 获得列表
   * @param result
   * @returns {Array}
   */
  getResultList(result,att="list" ,datt="data"){
    if(result && result.hasOwnProperty(datt) && result[datt] && result[datt].hasOwnProperty(att)){
      let re = result[datt][att] ;
      if(Array.isArray(re))
         return re ;
      else if(re)
         return [ re ] ;
    }
    return [] ;
  }

  /**
   * 默认集成 一个 查询
   */
  sendQueryParamsHandler(result){
    this.queryData = result ;
  }

  /**
   *  这块代理部分可以封装 临时放这里 temp
   */
  faultHandler(info){
    this.data.isLoading = false ;
  }

  /**
   * 获得错误消息
   */
  getErrorMessage(info ,def=""){
    if(!info)
      return def ;
    if(typeof info === "string")
      return info ;
    if(info.hasOwnProperty("message"))
      return info.message+"";
    return "" ;
  }

  /**
   * 弹出提示消息  出不来
   */
  popMessage(message,type = "info"){
    // Message({ message:message,type:type|"info"})  ;
    if(this.messageHandler)
      this.messageHandler(message,type) ;
    else  if(window.vm){
      window.vm.$message({
        message:message,
        type: type
      });
    }
  }

  ____showObjStr( obj ,key){
    console.log(key+"------------------------>>>"+JSON.stringify(obj)) ;
  }

  /*创建测试数据*/
  createTestList(atts, len=10){
    let arr = [] ;
    //解析列表
    for(let i=0;i<len;i++ ){
       let item = {} ;
       for(let j=0;j<atts.length;j++ ){
         item[atts[j]] = atts[j]+"_"+i ;
       }
      item.id = "id_"+i ;
      arr.push(item) ;
    }
    return arr ;
  }

}
