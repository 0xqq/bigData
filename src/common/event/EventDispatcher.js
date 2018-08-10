export default class EventDispatcher{

  constructor(){
    this.eventMap = {} ;
  }

  //删除所有监听
  removeAllListener(){
    this.eventMap = {} ;
  }

  //添加事件监听
  addListener(type,handler){
    if(!type || !handler)
      return ;

    if(!this.eventMap.hasOwnProperty(type))
      this.eventMap[type] = {fmap:new Map(),list:[]} ;
    let _mobj = this.eventMap[type] ;
    if(_mobj.fmap.has(handler))
      return ;
    _mobj.fmap.set(handler, true);
    _mobj.list.push(handler);
  }

  //删除事件监听
  removeListener(type,handler) {
    if (!type || !this.eventMap.hasOwnProperty(type))
      return;

    if (!handler) {
      delete  this.eventMap[type];
      return;
    }
    let _mobj = this.eventMap[type];
    if (_mobj.fmap.has(handler)) {
      _mobj.fmap.delete(handler);
      let len = _mobj.list.length;
      for (let i = 0; i < len; i++) {
        let func = _mobj.list[i];
        if (func === handler) {
          _mobj.list.splice(i, 1);
          break;
        }
      }
    }
  }

  //根据
  removeListenerById(poxy){
    if(poxy && poxy.type)
      this.removeListener(poxy.type,poxy.handler) ;
  }

  //派发事件
  disEvent(type,data){
    if(!type || !this.eventMap.hasOwnProperty(type))
      return ;
    var _list = this.eventMap[type].list ;
    for(var func of _list){
      if(func)
          func(data,type) ;//这里不加异常捕获 具体函数添加
    }
  }

  static addListener(type,handler){
    EventDispatcher.getInstance().addListener(type,handler);
    return {type:type,handler:handler} ;
  }

  static removeListener(type,handler){
    EventDispatcher.getInstance().removeListener(type,handler);
  }

  static removeListenerById(poxy){
    EventDispatcher.getInstance().removeListener(poxy);
  }

  static removeListeners(poxyarr){
    if(poxyarr){
      for(let poxy of poxyarr){
        EventDispatcher.getInstance().removeListener(poxy);
      }
    }
  }

  static disEvent(type,data){
    EventDispatcher.getInstance().disEvent(type,data);
  }
  static getInstance( ){
    if(!EventDispatcher._instance)
      EventDispatcher._instance = new EventDispatcher() ;
    return EventDispatcher._instance ;
  }
}
