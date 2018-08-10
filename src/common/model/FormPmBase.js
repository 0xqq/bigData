//-----------------------------------------
// title: 常用的但表单 增 改 查 写基础组件 后面再改
// author:zc
// date:
// desc:
//------------------------------------------
import NormalUtils from "../utils/NormalUtils";
import QueryPmBase from "./QueryPmBase";

export default class FormPmBase extends QueryPmBase{

  constructor(name) {
    super();
    this.viewName = name ;
    this.updateMethod = null ;
    this.createMethod = null ;
    this.deleteMethod = null ;
    this.deleteMethod2 = null;//多个删除与一个分开
    this.defMessage = true ;
    this.autoResult = true ;
    this.autoQuery = true ;//添加 修改 删除后 自动查询
    this.currentItem = null ;//当前操作的对象
    this.closeHandler = null ;
    this.messageHandler = null ;//temp
    this.resetHandler = null ;
    this.popHandler = null ;
    this.ownerEvent = null ;
    this.deleteIdAtt = "id" ;
    this.autoClose = true ;
    //绑定属性单写 防止有效率问题
    this.data ={
      autoId:NormalUtils.createOID("autoFromWin") ,
      title:"",
      isLoading:false,
      itemData:null,
      isPopWin:false,
      isPopCreate:false,
      isPopUpdate:false,
      isPopDetail:false,
      deleteItems:[]
    }
  }

  /**
   *
   * @param param
   */
  initView(param){
    if(this.data.inited)
      return ;
    this.data.inited = true ;
    this.initExecute(param) ;
  }

  /**
   * 视图初始化处理
   * @param param
   */
  initExecute(param){

  }

  /**
   * 重置视图
   */
  reset(){

  }

  /**
   * 弹出创建窗口
   * @param item
   */
  popCreateWin(item) {
    this.resetPopFlag() ;
    this.data.isPopCreate = true;
    this.popWinHandler() ;
  }

  /**
   * 弹出编辑窗口
   * @param item
   */
  popEditeWin(item){
    this.currentItem = item ;
    this.resetPopFlag() ;
    this.data.isPopUpdate = true;
    this.popWinHandler() ;
  }

  /**
   * 弹出详情窗口
   * @param item
   */
  popDetailWin(item){
    this.currentItem = item ;
    this.resetPopFlag() ;
    this.data.isPopDetail = true;
    this.popWinHandler() ;
  }

  /**
   * 切换到编辑
   */
  changeToEdit(){
    this.popEditeWin(this.currentItem) ;
  }

  /**
   * 初始化弹出窗口
   */
  popWinHandler(){
    try{
      if(this.popHandler!==null)
        this.popHandler() ;
    }catch (e){}
  }

  /**
   * 提交表单
   */
  submit(...params) {
    if (!this.validForm())
      return;

    if ( this.data.isPopCreate)
      this.submitCreate(...params);
    else
      this.submitUpdate(...params);
  }

  /**
   * 验证表单
   *
   */
  validForm(){
    return true ;
  }

  /**
   * 创建提交
   */
  submitCreate(...parms){
    let createData = this.getCreateParams(...parms) ;
    this.sendParams(this.createMethod,createData).then(
      res => {
        this.submitResultHandler(res) ;
      },
      error =>{
        this.faultHandler(error) ;
      }
    ) ;
  }

  /**
   * 修改提交
   */
  submitUpdate(...parms){
    this.sendParams(this.updateMethod,this.getUpdateParams(...parms)).then(
      res => {
        this.submitResultHandler(res) ;
      },
      error =>{
        this.faultHandler(error) ;
      }
    ) ;
  }

  /**
   * 生成创建表单数据
   */
  getCreateParams(){
    return {} ;
  }

  /**
   * 生成更新表单数据
   */
  getUpdateParams(){
    return {} ;
  }

  /**
   *  这块代理部分可以封装 临时放这里 temp
   */
  submitResultHandler(result){
    this.data.isLoading = false ;
    if(!this.autoResult)
      return ;
    this.submitResultSuccessHandler(result) ;
  }

  /**
   * 成功处理
   */
  submitResultSuccessHandler(result){
    // this.popMessage(this.data.isPopCreate? "添加成功！":"修改成功！") ;
    this.popMessage("保存成功！") ;
    if(this.autoClose)
    this.closeWin() ;

    if(this.autoQuery){
      if(this.data.isPopUpdate)
        this.reQuery() ;
      else
        this.queryList() ;
    }
  }

  /**
   * 设置选中对象
   * @param items
   */
  setDeleteItems(items){
    if(items)
      this.data.deleteItems = items ;
    else
      this.data.deleteItems = [] ;
  }

  deleteItem(item ,idfield='id',title="",valid=true){
    if(valid){
      if(!title)
        title = "是否确认删除?" ;
      window.vm.$confirm(title , '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.executeDelete(item,false,idfield) ;
      }) ;
      return ;
    }
    this.executeDelete(item,false,idfield) ;
  }

  /**
   * 消息询问框
   * @param data
   * @param title
   * @param message
   * @param handler
   */
  askMessage(message,handler,data,title="提示"){
    window.vm.$confirm( message,title , {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      handler(data) ;
    }) ;
  }

  /*删除选中对象*/
  deleteSelectItems(items,idfield="id",title="",valid=true){
    if(!items)
      items = this.data.deleteItems ;
    if(!items || items.length===0) {
      this.popMessage("请选择需要删除的数据源") ;
      return ;
    }
    if(!title)
      title = "是否确认删除所有选中数据源?" ;
    if(valid){
      window.vm.$confirm(title , '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.executeDelete(items, true,idfield) ;
      }) ;
      return ;
    }
    this.executeDelete(items,true,idfield) ;
  }

  /**
   * 执行删除
   * @param methodd
   * @param parms
   */
  executeDelete( parms,isMore=false,idField="id"){
    if(!parms)
      return ;

    let methodd = this.deleteMethod ;
    if(isMore)
      methodd = this.deleteMethod2 ;

    //参数
    parms = this.getDeleteParams(parms,isMore,idField) ;
    if(!parms){
      //如果没有合法参数不处理
      return ;
    }

    //调用
    methodd(parms).then(
      (result)=>{
        this.deleteResultHandler(result, isMore) ;
      },
      (error)=>{
        this.faultHandler(error) ;
      }
    );
  }

  /**
   * 获得删除参数
   * @param param
   * @param idfield
   * @param ismore
   * @returns {*}
   */
  getDeleteParams(param,ismore=false,idfield="id"){
    if(ismore){
      if(param.length===0)
        return null;
      let _ids = [] ;
      param.forEach((item)=>{
        if(item  && item.hasOwnProperty(idfield)){//默认组装成单个对象
          let _id = {};
          _id[idfield] = item[idfield] ;
          _ids.push(_id) ;
        }
      }) ;
      return _ids ;
    }
    else{
      if(param && param.hasOwnProperty(idfield))
        return param[idfield] ;
    }
    return null ;
  }


  /**
   * 删除成功处理
   * @param res
   */
  deleteResultHandler(res ,isMore=false,mess="删除成功！"){
    this.popMessage(mess) ;
    if(this.autoQuery)
      this.queryList();
  }

  /**
   * 重置弹出状态
   */
  resetPopFlag( pop = true ){
    this.data.isPopCreate = false;
    this.data.isPopUpdate = false;
    this.data.isPopDetail = false;
    this.data.isPopWin = pop;
  }

  /**
   * 关闭窗口
   */
  closeWin(){
    // this.clear();
    if(this.closeHandler)
      this.closeHandler() ;
    this.resetPopFlag(false) ;
  }

  /**
   * 清空
   */
  clear(){
    this.currentItem = null ;
  }

  /**
   * 销毁
   */
  destroy(){
    this.clear() ;
    this.popHandler = null ;
    this.closeHandler = null ;
    this.messageHandler = null ;
  }
}
