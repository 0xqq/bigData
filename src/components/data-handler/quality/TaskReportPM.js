//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import FormPmBase from "@/common/model/FormPmBase" ;
import NormalUtils from "@/common/utils/NormalUtils";

import ProcessAPI from "@/common/service/ProcessAPI" ;

import PlatformAssetsAPI from "@/common/service/PlatformAssetsAPI" ;
import PlatformAPI from "@/common/service/PlatformAPI" ;
import PagePm from "@/common/model/PagePm";
import ConstManager from "../../../common/manager/ConstManager";


export default class TaskReportPM extends FormPmBase{

  constructor( name,id="" ) {
    super(name,id);
    this.autoClose = false ;
    this.createMethod = PlatformAssetsAPI.addAssignAssets ;
    this.updateMethod = PlatformAssetsAPI.editAssignAssets ;
    this.deleteMethod = PlatformAssetsAPI.deleteAssignAssets ;

    //分页查询组件
    this.pagePM = new PagePm(ProcessAPI.qualityQualityReportList,1,"qualityTasks") ;
    // this.pagePM.testHandler = this.testHandler ;

    //初始化绑定数据
    this.initData({
      autoId: NormalUtils.createOID("container"),
      softList: [],
      nameList: [],
      areaList: []
    }) ;

    this.initAreaList() ;

    //初始化查询表单
    this.initSearchForm( ) ;

    //编辑信息
    this.initFormData() ;
  }

  /**
   * 除原始区外的分区
   */
  initAreaList(){
    let arr = [] ;
    for(let item of ConstManager.areaList){
      if(item.value !== ConstManager.areaOld)
        arr.push(item) ;
    }
    this.data.areaList = arr ;
  }

  /*初始化查询表单*/
  initSearchForm( query=true ) {

    //清空查询条件
    this.initDataForm({
      startTime:'',
      endTime:'',
      taskName:'',
      rule:'',
      resouceName:'',
      runTime:''
    },"searchForm");

    //查询
    if (query === true)
      this.queryList();
  }

  /**
   * 初始化 增改表单项
   * @isinit 是否完全重新初始化
   */
  initFormData( isinit = true ){
    //清空查询条件
    this.initDataForm({
      startTime:'',
      endTime:'',
      taskName:'',
      rule:''
    },"form") ;
    this.initDataForm({
      rsName:""
    },"formError") ;
    this.data.sourcePartitionName = "" ;
    this.data.adminResourceId = "";
  }

  /**
   * 第一次进入 初始化数据
   */
  initView(){
    super.initView() ;
    this.queryList() ;
    //默认显示创建窗口
    this.popCreateWin() ;
  }

  /**
   * 查询租户列表
   */
  queryTanentList(){
    let send = this.getSendParam({ tenant: ""}) ;
    this.query(send,(result)=>{
      this.data.nameList = result.resultdata.tenantInfo ;
    },null,PlatformAPI.queryTenantList) ;
  }

  /**
   * 查询软件列表
   */
  querySoftList(){
    let send = this.getSendParam({ ip:"", type:""  }) ;
    this.query(send,(result)=>{
      this.data.softList = result.resultdata.softInfo ;
    },null,PlatformAssetsAPI.queryAssets) ;
  }

  /*查询列表*/
  queryList(){
    let send = this.initData(this.data.searchForm,{}) ;
    if(send.runTime){
      if(send.runTime.length>0)
        send.startTime = NormalUtils.dateFormat(send.runTime[0]) ;
      if(send.runTime.length>1)
        send.endTime = NormalUtils.dateFormat(send.runTime[1]) ;
    }
    delete send.runTime ;
    this.pagePM.queryList(send)
  }

  /**
   * 添加窗口
   */
  popCreateWin(){
    super.popCreateWin() ;

    this.initFormData() ;

    //查询租户列表
    this.queryTanentList() ;

    //查询软件列表
    this.querySoftList() ;
  }

  /**
   *  弹出修改窗口
   */
  popEditeWin( item ){
    super.popEditeWin(item) ;

    this.initFormData() ;

    //解析数据到表单
    NormalUtils.copySimpleAtt(item,this.data.form) ;

    //查询租户列表
    this.queryTanentList() ;

    //查询软件列表
    this.querySoftList() ;
  }

  /**
   * 切换软件变化 分区
   */
  changeSoftHandler(){
    this.data.form.sourcePartition = "" ;
    this.data.sourcePartitionName = "" ;
    this.data.adminResourceId = "";
    if(!this.data.softList || !this.data.form.softId)
      return ;
    let index = NormalUtils.getSelectIndex(this.data.softList,this.data.form.softId,"id") ;
    if(index>-1){
      this.data.form.sourcePartition = this.data.softList[index].partition ;
      this.data.sourcePartitionName =  this.data.softList[index].partitionVal ;
      this.data.partitionDis = false ;
      if(this.data.form.sourcePartition+"" === ConstManager.areaOld2 ||
        this.data.form.sourcePartition+"" === ConstManager.areaOld ){
        this.data.form.sourcePartition = ConstManager.areaOld ;
        this.data.partitionDis = true ;
      }
      else {
        this.data.form.sourcePartition = "" ;//temp?
      }
      this.data.adminResourceId = this.data.softList[index].adminResourceId ;
    }
  }

  /**
   * 资源名称校验
   */
  checkSourceName( cback=null ){
    this.data.formError.rsName = "" ;
    if(!this.data.form.rsName || !this.data.adminResourceId )
      return ;
    let send = {adminResourceId:this.data.adminResourceId,name:this.data.form.rsName } ;
    PlatformAssetsAPI.querySourceAssets(send).then(
      (result)=>{
        if((result.resultdata.isfalg + "") ==="1")
          this.data.formError.rsName = "数据库已经存在！" ;
        else {
          if(cback!==null)
            cback() ;
        }
      }) ;
  }

  submit(){

    this.checkSourceName(()=>{
      super.submit() ;
    }) ;
  }

  /**
   * 生成创建表单数据
   */
  getCreateParams(){
    let _send = this.initData(this.data.form,{}) ;
    delete _send.id ;
    return _send ;
  }

  /**
   * 生成更新表单数据
   */
  getUpdateParams(){
    return  this.initData(this.data.form,{}) ;
  }

  /**
   * 删除参数
   * @param param
   */
  getDeleteParams(param,ismore=false,idfield="id"){
    return {id:param.id} ;
  }

  getSendParam(params){
    let re = {page:1,pageSize:99999,startIndex:0} ;
    Object.assign(re,params) ;
    return re ;
  }

  /**
   *
   * @param result
   */
  submitResultHandler(result){
    super.submitResultHandler(result) ;

    //继续添加
    if(this.data.isPopCreate)
      this.popCreateWin() ;
  }

  /*-------------------------------------------------------- test ----------------------------------------*/
  testHandler(){
    return NormalUtils.createTestData({
      tenantId:"dfdfd",
      tenantName:"dfd",
      level:"dfdf",
      type:"dfdfd",
      desc:"dfdfdf"
    },20) ;
  }

}
