import TjServer from "./server/TjServer";

/**
 * 公用接口API
 * @Author: zc
 * @Modifications:
 * @See:
 */
class SysManagerAPI {
  constructor( ) {
  }

  /*--------------------------------------------------- role -----------------------------------------------*/
  /**
   * 查询角色列表
   * @param params
   * @param options
   * @returns {*}
   */
  static queryRoleList(params,options=null){
    return SysManagerAPI.server.getData("/roleList.json",params) ;
  }

  /**
   * 编辑 添加 角色
   * @param params
   * @param options
   * @returns {*}
   */
  static saveRole(params,options=null){
    return SysManagerAPI.server.postData("/roleAdd.json" ,params) ;
  }

  /**
   * 编辑 添加 角色
   * @param params
   * @param options
   * @returns {*}http:// 10.0.36.100:8070/roleDelete.json
   */
  static deleteRole(params,options=null){
    return SysManagerAPI.server.postData("/roleDelete.json" ,params,false) ;
  }

  /**
   * 保存角色权限
   * @param params
   * @param options
   * @returns {*}
   */
  static saveRoleAuthor(params,options=null){
    return SysManagerAPI.server.postData("/setRoleMenu.json" ,params) ;
  }

  /**
   * 查看角色用户列表
   * @param params
   * @param options
   * @returns {*}http:// 10.0.36.100:8070/roleUserList .json
   */
  static queryRoleUserList(params,options=null){
    return SysManagerAPI.server.getData("/roleUserList.json" ,params) ;
  }

  /**
   * 查询用户列表
   * @param params http:// 10.0.36.100:8070/userList.json
   * @param options
   * @returns {*}
   */
  static queryUserList(params,options=null){
    return SysManagerAPI.server.getData("/userList.json" ,params) ;
  }

  /**
   * 为用户分配角色
   * @param params
   * @param options
   * @returns {*}
   */
  static setRoleToUser(params,options=null){
    return SysManagerAPI.server.getData("/roleUserAdd.json" ,params) ;
  }

  /**
   * 获得用户详细信息
   * @param params
   * @param options
   * @returns {*}
   */
  static getUserRole(params,options=null){
    return SysManagerAPI.server.getData("/roleUserEdit.json" ,params) ;
  }

}
SysManagerAPI.server = new TjServer() ;
export default SysManagerAPI ;
