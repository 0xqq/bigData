//-----------------------------------------
// title: 具有事件派发的类
// author:zc
// date:
// desc:
//------------------------------------------
import EventDispatcher from "./EventDispatcher";

export default class BaseClassDispatcher{

  constructor() {
    this.disper = new EventDispatcher();
  }

  addListener(type,handler){
    this.disper.addListener(type,handler) ;
  }

  //删除事件监听
  removeListener(type,handler) {
    this.disper.removeListener(type,handler) ;
  }

  //根据
  removeListenerById(poxy){
    this.disper.removeListenerById(poxy) ;
  }

  //删除所有
  removeAllListener(){
    this.disper.removeAllListener();
  }

  //派发事件
  disEvent(type,data){
    this.disper.disEvent(type,data) ;
  }

}
