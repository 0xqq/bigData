/**
 * 基础公共组件封装
 * 建议仅仅封装函数，不进行属性封装
 */
export default class Base {

  constructor() {

  }

  /**
   * 对象属性复制
   * @param target
   * @param source
   * @param left 是否为左复制
   */
  copyObjectAttribute(target,source,left=true){
    if(left){
      for(let attribute in target){
        target[attribute] = source[attribute];
      }
    }else{
      Object.assign(target,source);
    }
  }

  /**
   * 深度对象或数组复制，防止出现地址被引用现象
   * @param target
   * @param source
   */
  deepCopy(source){
    return JSON.parse(JSON.stringify(source));
  }

  /**
   * 触发数组变化
   * 常用于：数组内部对象属性变化，响应不及时，主动触发数组长度变化
   */
  refreshArray(array=[]){
    array.push({});
    array.pop();
  }
}
