import TjServer from "./server/TjServer";
import RdjcServer from "./server/RdjcServer";

/**
 * 公用接口API
 * @Author: zc
 * @Modifications:
 * @See:
 */
class CommonAPI {
  constructor( ) {
  }

  /**
   * 首页查询信息
   * @param params
   * @param options
   * @returns {*}
   */
  static homeStatistics(params,options=null){
    return CommonAPI.server.getData("/dataStorage.json",params) ;
  }

  /**
   * 首页查询信息
   * @param params
   * @param options
   * @returns {*}
   */
  static login(params,options=null){
     return CommonAPI.rdjcServer.postData("/api/tenant/userLogin" ,params) ;
  }
}
CommonAPI.rdjcServer = new RdjcServer() ;
CommonAPI.server = new TjServer() ;
export default CommonAPI ;
