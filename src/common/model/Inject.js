//------------------------------------------------------------------
//title:
//author: zc
//date:
//desc:
//------------------------------------------------------------------

export default class Inject {

  constructor() {
    this._classMap = new Map();
  }

  /**
   * 获得注入的class
   */
  static getClass(value, ...ddddd) {
    let _this = Inject.getInstance();
    if (_this._classMap.has(value))
      return _this._classMap.get(value);
    let _nc = new value(...ddddd);
    _this._classMap.set(value, _nc);
    return _nc;
  }

  /**
   * 先不处理 key 有空加上
   * @param value
   * @param ddddd
   * @returns {*}
   */
  static getDiyClass(key,value, ...ddddd) {
    return new value(...ddddd);
  }

  /**
   * 删除class
   */
  static removeClass() {
    if (Inject.getInstance()._classMap.has(value))
      return Inject.getInstance()._classMap.delete(value);
  }

  static getInstance() {
    if (!Inject._instance)
      Inject._instance = new Inject();
    return Inject._instance;
  }
}
