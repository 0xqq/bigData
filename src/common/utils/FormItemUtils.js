/**
 * 动态表单工具类
 * @Author: zc
 * @Modifications:
 * @See:
 */
export default class FormItemUtils {

  constructor() {

  }

  /**
   * 获得BOOLEAN数据
   * @param value
   * @returns {boolean}
   */
  static getBoolean(value ) {
    let _bvalue = (value + "").toLowerCase();
    if (_bvalue === "true" ||_bvalue === "y"||_bvalue === "yes" )
      return true;
    return false;
  }

  /**
   * 获得输出数据
   * @param value
   * @param mode
   * @returns {string}
   */
  static getValueData(value,mode="0") {
    mode = mode+"";
    if (mode === "1")
      return value? "Y" : "N";
    if (mode === "2")
      return value? "YES" : "NO";
    return (value+"").toUpperCase();
  }


  /**
   * 获得对象的属性值
   * @param value
   * @param atts
   * @returns {*}
   */
  static getPathData( value ,attArr ,def=null) {
    if (!value)
      return def;

    if(!attArr)
      return value ;

    let _atts = attArr.split(".");
    let _data = value;
    for (let att of _atts) {
      if (!_data.hasOwnProperty(att)) {
        _data = def;
        break;
      }
      _data = _data[att];
    }
    return _data;
  }

  /**
   * 设置数据
   * @param value
   * @param atts
   * @param value
   * @returns {*}
   */
  static setPathData( attArr ,value) {
    if ( !attArr)
      return value ;
    let _atts = attArr.split(".");
    let _data = {};
    let _len = _atts.length -1 ;
    for (let i=0;i<_len;i++ ) {
      let att = _atts[i] ;
       _data[att] = {} ;
      _data = _data[att];
    }
    _data[_atts[_len]] = value ;
    return _data;
  }

  /**
   * 获得表单项数据
   * @param owner
   * @param name
   * @param def
   * @returns {string}
   */
  static getFormData( owner, name ,def=""){
    for(let item of owner){
      if(item.name === name){
        return item.value ;
        break ;
      }
    }
    return def ;
  }

  /**
   * 设置表单数据
   * @param owner
   * @param name
   * @param value
   */
  static setFormData( owner, name ,value){
    for(let item of owner){
      if(item.name === name){
         item.value = value ;
        break ;
      }
    }
  }

}
