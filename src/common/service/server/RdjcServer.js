/**
 * 人大金仓的服务通信类
 * @Author: zc
 * @Modifications:
 * @See:
 */
import ServerBase from "./ServerBase";
import ModelLocator from "@/common/model/ModelLocator" ;
import Base64 from "@/common/utils/Base64" ;
import NormalUtils from "@/common/utils/NormalUtils";
import SPath from "./SPath";

export default class RdjcServer extends ServerBase {

  constructor(fixUrl=SPath.RDJC_BASE,testPath=SPath.RDJC_TEST,proxy=SPath.RDJC_PROXY) {
    super();
    this.fixedUrl = fixUrl ;
    this.proxyPath = proxy ;
    this.testServicePath = testPath ;//测试服务地址
  }

  /**
   *  GET调用  任务的单独写 和别人的不同
   * @param url
   * @param param
   * @param method
   * @param type
   */
  getProcess(url, param = null, isvalid = true,  options = null) {
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
  postProcess(url, param = null, isvalid = true,  options = null) {
    if(isvalid)
      param = {models:param} ;
    return this.sendParams(url, param, "post", "json", true, {successFlag:"1"});
  }

  /**
   * 人大金仓的接口 单独写
   * @param url
   * @param param
   * @param method
   * @param type
   * @returns {AxiosPromise}
   */
  sendParams(url, param, method, type = "json", isvalid = true, options = null) {

    //代理路径
    url = this.createServerUrl(url);

    //发送数据
    let _sendData = param;
    let _header = this.createSendHeader();
    let _valid = isvalid;//开始的都没有外层格式 后面的都加了格式 默认不验证 18-04-15
    let _successFlag = "0";//人大金仓后期接口0成功1失败 任务那1成功
    if (options) {
      if (options.hasOwnProperty("successFlag"))
        _successFlag = options.successFlag + "";
    }

    NormalUtils.showObjStr(_sendData, url + "----------->>发送参数");

    //post 转json字符
    if (method === "post")
      _sendData = JSON.stringify(_sendData);

    //使用 jquery吧
    let _this = this;
    var promiseObj = new Promise(function (resolve, reject) {
      $.ajax({
        type: method,
        url: url,
        data: _sendData,
        contentType: 'application/json',
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', _header);
        },
        success: function (result) {
          NormalUtils.showObjStr(result, url + "----------->>返回数据");
          if (!_valid)
            return resolve(result);

          if (result) {
            if ((result.code + "") === _successFlag)
              return resolve(result);
            else {
              if (result.hasOwnProperty("message") && result.message)
                NormalUtils.popMessage(result.message);
              else if(result.hasOwnProperty("msg")&& result.msg)
                NormalUtils.popMessage(result.msg);
              else
                NormalUtils.popMessage("服务器通信失败！");
              reject(result);
            }
          }
          //否则直接返回
          else {
            _this.showErrorInfo('', url);
            return resolve(result);
          }
        },
        error: function (error) {
          NormalUtils.popMessage("服务通信失败！");
          reject(error);
        }
      });
    });
    return promiseObj;
  }

  /**
   * 生成表头验证信息
   */
  createSendHeader() {
    let _user = ModelLocator.getInstance().getCurrentUser();
    // return "Basic " + Base64.encode(_user.id + ":" + _user.role);
    return "Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQURNSU4sQVVUSF9XUklURSIsInN1YiI6ImFkbWluIiwiZXhwIjoxNTI0OTg2ODM4fQ.OYHKt8U_h4aWoVD-cesJc2s2kT6MSYhLwjvrLBkoUfT1soSymozsMzHl0yIX5cW7GDiMU5luEL55vJbrfCHvQQ";
  }

}
