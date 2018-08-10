import NormalUtils from "../utils/NormalUtils";
import AuthManager from "../manager/AuthManager" ;

export default class ModelLocator{

  constructor() {

    //是否初始化
    this.inited = false ;

    //当前登录用户
    this.loginUser = {
      userId: "",
      userName: "",
      deptId: "",
      orgName:"",
      tenantId: "",
      id: "",
      name: "",
      roleId:"",
      roleCode:"",
      isAdmin:false,
      logined:false
    };
  }

  /**
   * 设置用户角色信息
   */
  setUserRole( role ) {
    if (!role || !role.id)
      return;

    //写到本地session 后面的再说
    NormalUtils.setSession("role", role );
  }

  /**
   * 设置当前用户
   * @param userInfo
   */
  setCurrentUser( userInfo ){
    Object.assign(this.loginUser,userInfo);
    this.loginUser.id = this.loginUser.userId ;
    this.loginUser.name = this.loginUser.userName ;

    //外层赋值
    if(this.loginUser.roleCode === AuthManager.adminCode || this.loginUser.roleCode === AuthManager.superAdminCode)
      this.loginUser.isAdmin = true ;
    this.loginUser.logined = true ;

    //写到本地session 后面的再说
    if(!this.inited){
      NormalUtils.setSession("user",this.loginUser) ;
      NormalUtils.setSession("userId",this.loginUser.id) ;
    }

    this.inited = true ;
  }

  /**
   * 刷新用户信息
   */
  refreshUserInfo(){
    if( this.inited )
      return ;
    let _luser = NormalUtils.getSession("user") ;
    if(_luser)
      this.setCurrentUser(_luser) ;
  }

  /**
   * 强制刷新用户所有信息
   */
  refreshUserAll(){
    this.refreshUserInfo() ;
    if(this.loginUser.logined)
      AuthManager.refreshAuth(true);
  }

  /**
   * 获得当前用户信息
   */
  getCurrentUser(){
    this.refreshUserInfo() ;
    return this.loginUser ;
  }

  /**
   * 初始化
   */
  init(){
    this.refreshUserInfo() ;
  }

  static getInstance( ){
    if(!ModelLocator._instance){
      ModelLocator._instance = new ModelLocator() ;
      ModelLocator._instance.init() ;
    }
    return ModelLocator._instance ;
  }
}
