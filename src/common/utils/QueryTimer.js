/**
 * 预览一个类 方便添加时间控制  轮询接口 每个图表一个时钟
 * @Author: zc
 * @Modifications:
 * @See:
 */
import QueryPmBase from "@/common/model/QueryPmBase";

export default class QueryTimer extends QueryPmBase {

  constructor(id,queryMethod,param,handler,cycle=false, dur = -1, first=true) {
    super(queryMethod);
    this.id = id ;
    this.dur = dur;//时间间隔
    this.cycle = cycle ;//是否循环
    this.staticParam = param ;//发送参数固定
    this.dataHandler = handler ;
    this.timeId = -1 ;
    this.running = false ;
    this._runFlag = false ;
    this.first = first ;
    this.testHandler = null ;
  }

  /**
   * 停止查询
   */
  stopQuery(){
    this._runFlag = false ;
    clearInterval(this.timeId) ;
  }

  /**
   * 重置内部状态
   */
  reset(){
    this.stopQuery() ;
    this.first = false ;
  }

  /**
   * 开始计时查询
   */
  startQuery( ) {

    //不循环查询
    if(!this.cycle || this.first){
      this.queryResult() ;
      this.first = false ;
      return ;
    }

    //轮询接口
    var _this = this ;
    this._runFlag = true ;
    this.timeId = setInterval(()=>{
      if(!_this._runFlag)
        return ;

      _this.queryResult() ;
    } ,this.dur * 1000) ;
  }

  /**
   *
   */
  queryResult(){

    //本地测试
    if(this.testHandler!==null){
      this.testResultT() ;
      return ;
    }

    //计数器 后面再加
    let _send = this.staticParam ;
    if( typeof this.staticParam === "function" ) //动态设置参数
      _send = this.staticParam() ;
    this.query(_send,this.dataHandler) ;
  }

  /**
   * 本地测试使用
   */
  testResultT(){
    this.data.isLoading = true ;
    let _cid = setTimeout(()=>{
      clearTimeout(_cid) ;
      this.data.isLoading = false ;
      this.dataHandler(this.testHandler()) ;
    },300);
  }
}
