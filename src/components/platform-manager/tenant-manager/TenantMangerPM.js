//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import FormPmBase from "@/common/model/FormPmBase" ;
import NormalUtils from "@/common/utils/NormalUtils";
import PathConst from "@/router/PathConst";
import PlatformAPI from "@/common/service/PlatformAPI" ;
import PlatformAssetsAPI from "@/common/service/PlatformAssetsAPI" ;
import PagePm from "@/common/model/PagePm";
import ConstManager from "@/common/manager/ConstManager";
import ModelLocator from "@/common/model/ModelLocator";

export default class AngerMangerPM extends FormPmBase{

  constructor( name,id="" ) {
    super(name,id);
    this.createMethod = PlatformAPI.saveTenant ;
    this.updateMethod = PlatformAPI.editTenant ;
    this.deleteMethod = PlatformAPI.deleteTenant ;

    //分页查询组件
    this.pagePM = new PagePm(PlatformAPI.queryTenantList,1,"tenantInfo") ;
    // this.pagePM.testHandler = this.testHandler ;

    //初始化绑定数据
    this.initData( {
        levelList:[], //级别
        typeList:[] //类型
      }
    ) ;

    //初始化查询表单
    this.initSearchForm( ) ;

    //编辑信息
    this.initFormData() ;
  }

  /*初始化查询表单*/
  initSearchForm( query=true ) {

    //清空查询条件
    this.initDataForm({
      tenant: ""
    },"searchForm")

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
      creator:ModelLocator.getInstance().loginUser.name,//加个用户信息
      tenantId:"",
      tenantName:"",
      rankId:"",
      typeId:"",
      desc:""
    },"form") ;
    this.initDataForm({
      "tenantName":""
    },"formError") ;
  }

  /**
   * 第一次进入 初始化数据
   */
  initView(){
    super.initView() ;

    //默认查询数据
    this.queryList() ;
  }

  /*查询列表*/
  queryList(){
    super.queryList(this.data.searchForm,(datas)=>{
      if(!datas)
        return ;
      for(let item of datas){
        let _num = parseInt(item.createTime) * 1000 ;
        item.createTime = NormalUtils.dateFormat(_num) ;
      }
    });
  }

  /**
   * 添加窗口
   */
  popCreateWin(){
    super.popCreateWin() ;

    //查询字段
    this.queryDicList() ;
  }


  /**
   *  弹出修改窗口
   */
  popEditeWin( item ){
    super.popEditeWin(item) ;

    NormalUtils.showObjStr(item);

    //解析数据到表单
    NormalUtils.copySimpleAtt(item,this.data.form) ;

    if(item.hasOwnProperty("tenantID"))
      this.data.form.tenantId = item.tenantID;

    //查询字段
    this.queryDicList() ;
  }

  /**
   * 验证用户是否存在
   */
  checkUser( backfunc = null ){
    let _this = this ;

    //如果是编辑状态 名称没修改不验证
    if(this.data.isPopUpdate && this.currentItem.tenantName === this.data.form.tenantName){
      if(backfunc!==null)
        backfunc() ;
      return ;
    }

    //验证名称
    PlatformAPI.checkTenant({tenantName:this.data.form.tenantName}).then(
      (result)=>{
        if(result.resultdata.result+"" === "1"){
          _this.data.formError.tenantName = "租户名称已经存在！" ;
        }
        else if(backfunc!==null)
          backfunc() ;
      }
    ) ;
  }

  /**
   * 查询类型 级别
   */
  queryDicList(){
    //软件类型
    this.query({dicType:"level"},(result)=>{
      this.data.levelList = result.resultdata ;
    },null,PlatformAssetsAPI.queryDicnation) ;
    //软件类型
    this.query({dicType:"type"},(result)=>{
      this.data.typeList = result.resultdata ;
    },null,PlatformAssetsAPI.queryDicnation) ;
  }

  /**
   * 提交表单
   */
  submit(){
    this.checkUser(()=>{
      super.submit() ;
    });
  }

  /**
   * 生成创建表单数据
   */
  getCreateParams(){
    let _send = this.initData(this.data.form,{}) ;
    delete _send.tenantId ;
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
    let _id = "" ;
    if(param.hasOwnProperty("tenantId"))
      _id = param.tenantId;
    else  if(param.hasOwnProperty("tenantID"))
      _id = param.tenantID;
    return {tenantId:_id} ;
  }

  /**
   * 跳转到租户授权
   * @param value
   */
  changeToSourceLink(value){
    NormalUtils.changeRouter(PathConst.PM_TENENT_AUTHORIZE, {id:value.tenantID,name:value.tenantName} ) ;
  }

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
