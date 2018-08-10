/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */

export default class SvgDom {

  constructor() {
  }

  //创建svg相关元素
  static createSvg(tag, attr) {
    let _svg = $(document.createElementNS('http://www.w3.org/2000/svg', tag));
    if(attr){
      for (let key in attr) {
        switch (key) {
          case 'xlink:href':
            _svg[0].setAttributeNS('http://www.w3.org/1999/xlink', key, attr[key]);
            break;
          default:
            _svg.attr(key, attr[key]);
        }
      }
    }
    return _svg;
  }

}
