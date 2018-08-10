/**
 * 人大金仓的服务通信类
 * @Author: zc
 * @Modifications:
 * @See:
 */
import RdjcServer from "./RdjcServer";
import SPath from "./SPath";

export default class ProcessServer extends RdjcServer {

  constructor( ) {
    super(
      SPath.PROCESS_BASE,
      SPath.PROCESS_TEST,
      SPath.PROCESS_PROXY
    );
  }

  /**
   *  GET调用  任务的单独写 和别人的不同
   * @param url
   * @param param
   * @param method
   * @param type
   */
  getData(url, param = null, isvalid = true,  options = null) {
    if(isvalid)
      param = {models:param} ;
    return this.sendParams(url, param, "get", "json", true, {successFlag:"1"});
  }

  /**
   * post调用  任务的单独写 和别人的不同
   * @param url
   * @param param
   * @param method
   * @param type
   */
  postData(url, param = null, isvalid = true,  options = null) {
    if(isvalid)
      param = {models:param} ;
    return this.sendParams(url, param, "post", "json", true, {successFlag:"1"});
  }
}
