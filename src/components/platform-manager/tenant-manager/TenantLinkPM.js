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
import PagePm from "@/common/model/PagePm";

export default class TenantLinkPM extends FormPmBase{

  constructor( name,id="" ) {
    super(name,id);
    this.createMethod = PlatformAPI.saveTenantLink ;
    this.updateMethod = PlatformAPI.editTenantLink ;
    this.deleteMethod = PlatformAPI.deleteTenantLink ;

    //分页查询组件
    this.pagePM = new PagePm(PlatformAPI.queryTenantLinkList,1,"tenantInfo") ;
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
      tenant: "",
      dept:""
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
    this.initDataForm({
      tenantId:"",
      deptId:"",
      userId:"",
    },"form") ;

    this.initDataForm({
      deptName:"",
      tenantName:"",
      userName:""
    },"formView") ;

    this.data.tanentList = [] ;
    this.data.orgList = [] ;
    this.data.userList = [] ;
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
        item.tenantId = item.tenant.id ;
        item.tenantName = item.tenant.name ;
        item.deptId = item.dept.id ;
        item.deptName = item.dept.name ;
        item.userName = item.user.name ;
        item.userId = item.user.id ;
      }
    });
  }

  popCreateWin(){
    super.popCreateWin() ;
    this.initFormData() ;
    this.queryUnLinkTenant() ;
    this.queryUnLinkOrg() ;
  }

  /**
   *  弹出修改窗口
   */
  popEditeWin( item ){
    super.popEditeWin(item) ;
    this.initFormData() ;
    NormalUtils.copySimpleAtt(item,this.data.form) ;
    NormalUtils.copySimpleAtt(item,this.data.formView) ;
    this.queryUserByOrg() ;
  }

  /**
   * 切换部门查询 部门下的用户
   */
  changeOrgHandler(){
     // this.queryUserByOrg() ;
  }

  /**
   * 查询没有关联的租户
   */
  queryUnLinkTenant(){
    this.query(this.getPageSend() ,(result)=>{
       this.data.tanentList = this.getResultList(result,"tenants","resultdata") ;
    },null,PlatformAPI.queryUnLinkTenant) ;
  }

  /**
   * 查询没有关联的部门
   */
  queryUnLinkOrg(){
    this.query(this.getPageSend() ,(result)=>{
      this.data.orgList = this.getResultList(result,"depts","resultdata") ;
    },null,PlatformAPI.queryUnLinkOrg) ;
  }

  /**
   * 查询部门下的账号
   */
  queryUserByOrg(){
    if(!this.data.form.deptId)
      return ;
    let send = this.getPageSend() ;
    send.dept = this.data.form.deptId  ;
    this.query(send ,(result)=>{
      this.data.userList = this.getResultList(result,"account","resultdata") ;
    },null,PlatformAPI.queryUserByOrg) ;
  }

  /**
   * 生成创建表单数据
   */
  getCreateParams(){
    return this.initData(this.data.form,{}) ;
  }

  /**
   * 生成更新表单数据
   */
  getUpdateParams(){
    return NormalUtils.copySimpleAtt(this.data.form,{tenantId:"",userId:""}) ;
  }

  /**
   * 删除参数
   * @param param
   */
  getDeleteParams(param,ismore=false,idfield="id"){
    return {id:param.tenantId} ;
  }

  /**
   * 原型看是查询所有
   * @returns {{page: number, pageSize: number, startIndex: number}}
   */
  getPageSend(){
    return {
      page:1,
      pageSize:999999,
      startIndex:0
    } ;
  }

  /**
   * 返回主页
   */
  changeBackMain(){
    NormalUtils.changeRouter(PathConst.PM_TENENT_LIST) ;
  }

  testHandler() {
    return NormalUtils.createTestData({
        "tenant": {
          "id": "ssss",
          "name": "sssssssss",
          "createtime": "",
          "creator": "",
          "desc": ""
        },
        "dept": {
          "id": "id",
          "name": "sssssssssssssffff",
        },
        "account":
          {
            "id":
              "id",
            "name":
              "ssssssss"
          }
      },  20 ) ;
  }

}
