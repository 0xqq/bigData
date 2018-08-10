//------------------------------------------------------------------
//title:
//author: zc
//date:
//desc:
//------------------------------------------------------------------
import ModelLocator from "@/common/model/ModelLocator" ;
import NormalUtils from "@/common/utils/NormalUtils";
import SPath from "./SPath" ;

export default class ServerBase{

  constructor(fixUrl=SPath.TJ_BASE,testPath=SPath.TJ_TEST,proxy=SPath.PROXY_BASE ) {
    //----------------------如果使用代理 默认设置为 /api
    this.proxyPath = proxy?proxy:SPath.PROXY_BASE ;
    this.fixedUrl = fixUrl?fixUrl:SPath.TJ_BASE ;
    this.testServicePath = testPath?testPath:SPath.TJ_TEST ;//测试服务地址
  }

  /**
   *  GET调用
   * @param url
   * @param param
   * @param method
   * @param type
   */
  getData(url ,param=null,iscreet=true ,options=null){
    return this.sendParams(url ,param ,"get" ,"json" ,iscreet,options) ;
  }

  /**
   * post调用
   * @param url
   * @param param
   * @param method
   * @param type
   */
  postData(url ,param=null,iscreet=true,options=null){
    return  this.sendParams(url ,param ,"post" ,"json",iscreet,options ) ;
  }

  /**
   * 生成访问路径
   * @param url
   * @returns {string}
   */
  createServerUrl(url){
    if(SPath.DEV){

      //本地测试模式
      if(this.hasOwnProperty("testServicePath") && this.testServicePath)
        return this.testServicePath + url ;

      //代理访问模式
      if(this.hasOwnProperty("proxyPath") && this.proxyPath)
        return this.proxyPath + url ;
    }
    else{
      if(this.fixedUrl)
        url = this.fixedUrl + url ;
    }
    return url ;
  }

  /**
   * 发送数据
   * @param url
   * @param param
   * @param method
   * @param type
   * @returns {AxiosPromise}
   */
  sendParams( url ,param ,method ,type="json",iscreet=true,options=null) {

    //代理路径
    url = this.createServerUrl(url) ;

    //发送数据
    let _sendData = this.createParams(param,url,iscreet) ;
    let _this = this ;

    //使用 jquery吧
    var _promise = new Promise(function(resolve,reject){
      $.ajax({
        type:method,
        url:url,
        data:_sendData,
        success:function(result){
          //约定接口
          if (result) {
            NormalUtils.showObjStr(result,url+"----------->>返回数据") ;

            if (parseInt(result.code) === 1){
              return resolve(result);
            }
            else {
              let oBject = JSON.parse(result);
              if (oBject.message)
                NormalUtils.popMessage(oBject.message);
              else
                NormalUtils.popMessage("服务器通信失败！");
               reject(oBject);
              /*if (result.message)
                NormalUtils.popMessage(result.message);
              else
                NormalUtils.popMessage("服务器通信失败！");
              reject(result);*/

            }
          }
          //否则直接返回
          else{
            _this.showErrorInfo('',url) ;
            return  resolve(result);
          }
        },
        error:function(error){
          _this.showErrorInfo(error,url) ;
          reject(error);
        }
      });
    }) ;
    return _promise ;
  }

  /**
   * 错误提示
   * @param error
   */
  showErrorInfo(error,url){
    let _error = "服务通信失败！" ;
    if(error ){
      if(error.responseText)
        _error = error.responseText ;
      else if(error.message)
        _error = error.message ;
    }
    console.log(url+"通信失败------------》》》》"+_error) ;
    NormalUtils.popMessage( "服务通信失败！" );
  }

  /**
   * 创建参数
   * @param param
   * @param url
   * @param iscreet
   * @returns {*}
   */
  createParams(param,url,iscreet){
    let _sendData = param;
    if(iscreet){
      NormalUtils.showObjStr({models:param},url+"----------->>发送参数") ;
      _sendData = {models: JSON.stringify(param) } ;
    }
    else
      NormalUtils.showObjStr( param,url+"----------->>发送参数") ;
    return _sendData ;
  }

  /**
   * 直接拼接URL
   * @param url
   * @param param
   * @returns {string}
   */
  static getUrlParams( param){
     return  "?models=" +JSON.stringify(param) ;
  }

  canvas2Blob(canvas,type='image/jpeg'){
    let data = window.atob(canvas.toDataURL(type).split(',')[1]);
    let _uint8Array = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      _uint8Array[i] = data.charCodeAt(i);
    }
    return new Blob([_uint8Array], { type: type });
  }

}
