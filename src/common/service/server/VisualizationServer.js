
import SPath from "./SPath";
import ServerBase from "./ServerBase";
import axios from 'axios'

export default class VisualizationServer extends ServerBase{

  constructor(fixUrl=SPath.VISUALIZATION_BASE,testPath=SPath.VISUALIZATION_TEST,proxy=SPath.VISUALIZATION_PROXY) {
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
    return this.sendParams(url, param, "get", "json", true, {successFlag:"1"});
  }

  /**
   * @param url
   * @param param
   * @param method
   * @param type
   */
  postProcess(url, param = null, isvalid = true,  options = null) {

    return this.sendParams(url, param, "post", "json", true, {successFlag:"1"});
  }

  postCanvasProcess(url,canvas,imgName,resolve,reject){
    let formdata = new FormData();
    formdata.append(imgName, this.canvas2Blob(canvas), imgName+".jpeg");
    formdata.append("Type", "Image");
    url = this.createServerUrl(url);
    let _this = this;
    let config = {
      headers: {'Content-Type': 'multipart/form-data'}
    };
    axios.post(url, formdata, config).then(response => {
      let result = response.data;
      if (result) {
        if ((result.code + "") === "1"){
          return resolve(result);
        } else {
          if (result.hasOwnProperty("message") && result.message)
            NormalUtils.popMessage(result.message);
          else if(result.hasOwnProperty("msg")&& result.msg)
            NormalUtils.popMessage(result.msg);
          else
            NormalUtils.popMessage("服务器通信失败！");
        }
      }else {
        _this.showErrorInfo('', url);
        return resolve(result);
      }
    });
  }

  /**
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
}
