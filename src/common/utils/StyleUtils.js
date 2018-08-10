/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
export default class StyleUtils {

    constructor() {
    }

  /*垂直渐变*/
  static drawVLinearRecJ( jobj,colors ,radios ,alpha,dir ){
    StyleUtils.drawVLinearRec(jobj[0].getContext("2d"),jobj.attr("width"),jobj.attr("height"),colors ,radios,alpha,dir);
  }

  /*水平渐变*/
  static  drawHLinearRecJ(  jobj,colors ,radios,alpha){
    StyleUtils.drawHLinearRec(jobj[0].getContext("2d"),jobj.attr("width"),jobj.attr("height"),colors ,radios,alpha)
  }

  /*垂直渐变*/
  static  drawVLinearRec( cxt ,width,height,colors ,radios,alpha,dir){
    if(!cxt)
      return ;
    if(!width)
      width = 0 ;
    if(!height)
      height = 0 ;
    let gr = dir===1? cxt.createLinearGradient(0,0,width,0) : cxt.createLinearGradient(0,0,0,height) ;
    StyleUtils.fillLinearRec(gr,cxt ,width,height,colors ,radios,alpha) ;
  }
  /*水平渐变*/
  static  drawHLinearRec( cxt ,width,height,colors ,radios,alpha){
    let gr = cxt.createLinearGradient(0,0,width,0);
    StyleUtils.fillLinearRec(gr,cxt ,width,height,colors ,radios,alpha) ;
  }

  /*渐变填充*/
  static  fillLinearRec( gradient,cxt ,width,height,colors ,radios,alpha){
    let _len = colors.length ;
    let _rv = 1/(_len-1) ;
    if(!alpha && alpha!==0)
      alpha = 1;
    cxt.globalAlpha = alpha ;
    colors.forEach(( item ,index )=>{
      let _c =  StyleUtils.getColorFromStr(item)  ;
      if(radios)
        gradient.addColorStop(radios[index],_c);
      else
        gradient.addColorStop(_rv *index,_c);
    });
    cxt.fillStyle = gradient;
    cxt.fillRect(0,0,parseFloat(width),parseFloat(height));
  }

  //将字符转换为 颜色格式
  static getColorFromStr(value, def) {
    if (!def)
      def = "#000000";
    if (!value && value !== 0)
      return def;
    if (typeof value === "number")
      return "#" + value.toString(16) + "";
    if (typeof value === "string") {
      if (value.indexOf("#") === 0)
        return value;
      else if (value.indexOf("0x") === 0)
        return value.replace("0x", "#");
      else if (parseInt(value) !== NaN)
      {
        var _str = parseInt(value, 10).toString(16);
        if(_str.length<6)
          _str += StyleUtils.reapterStr("0",(6-_str.length)) ;
        return "#" + _str;
      }
    }
    return def;
  }

  /**
   *
   * @param str
   * @param num
   * @returns {string}
   */
  static reapterStr(str,num){
    let re = "" ;
    for(let i=0;i<num;i++){
      re += str ;
    }
    return re ;
  }


  static getRgbaFromRgb(colorv,alpha){
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if(!alpha && alpha!==0)
      alpha = 1 ;
    let sColor = colorv.toLowerCase();
    if(sColor && reg.test(sColor)){
      if(sColor.length === 4){
        var sColorNew = "#";
        for(var i=1; i<4; i+=1){
          sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for(var j=1; j<7; j+=2){
        sColorChange.push(parseInt("0x"+sColor.slice(j,j+2)));
      }
      return "rgba(" + sColorChange.join(",") +","+alpha+ ")";
    }else{
      return sColor;
    }
  }

  /*转换rgba颜色*/
  static transRgbaFromRgb( values ,alpha ){
    if(!values)
      return "" ;
    if(Array.isArray(values)){
      let _arr = [] ;
      values.forEach(function(item){
        _arr.push(StyleUtils.getRgbaFromRgb(item ,alpha)) ;
      }) ;
      return _arr ;
    }
    else
      return  StyleUtils.getRgbaFromRgb(values ,alpha) ;
  }

  //批量转换颜色
  static  transColorFromArr(value, def) {
    value.forEach(function (item,index) {
      value[index] = StyleUtils.getColorFromStr(item,def);
    });
    return value ;
  }

  //批量转成数字
  static transNumberFromAtts(value,atts){
    atts.forEach(function( att ){
      if(value.hasOwnProperty(att))
        value[att] = parseFloat(value[att]) ;
    }) ;
  }

  //解析后台的颜色数据
  static initWebDbColor( dbcolor,defvalue){
    if(!Array.isArray(dbcolor))
    {
      if (!dbcolor && dbcolor!==0)
        dbcolor = defvalue;
      else if((dbcolor+"").indexOf(",")>-1)
        dbcolor = dbcolor.split(",");
      else
        dbcolor = [dbcolor, dbcolor];
    }
    return StyleUtils.transColorFromArr(dbcolor) ;
  }
  //封装颜色数据
  static getWebDbColor( dbcolor,defvalue){
    if (!dbcolor || dbcolor.length===0)
      dbcolor = defvalue;
    return StyleUtils.transColorFromArr(dbcolor) ;
  }

  //批量转换颜色
  static transColorFromStr(value, atts, def) {
    atts.forEach(function (att) {
      if (value.hasOwnProperty(att))
        value[att] = StyleUtils.getColorFromStr(value[att]);
    });
  }

  //批量转换颜色
  static transColorToValueArr(arr,def) {
    arr.forEach(function (att,index) {
      arr[index] = StyleUtils.getColorValue(att,def);
    });
    return arr ;
  }

  //颜色 转 十进制数值
  static getColorValue(value, def) {
    if (!def)
      def = 0;
    if (!value && value !== 0)
      return def;
    if (typeof value === "number")
      return value;
    if (typeof value === "string") {
      if (value.indexOf("#") == 0)
        return parseInt(value.substring(1, value.length), 16).toString(10);
      else if (value.indexOf("0x") == 0)
        return parseInt(value.substring(2, value.length), 16).toString(10);
      else if (parseInt(value) !== NaN)
        return parseInt(value);
    }
    return def;
  }

  /*绘制背景图*/
  static drawDivBackImg( div , imgset ){
    if(!div || !imgset || !imgset.url)
      return ;
    div.css("background-clip", "border-box")
      .css("background-image","url("+imgset.url+")")
      .css("background-position","center")
      .css("background-repeat","no-repeat") ;

    //清除
    div.css("background-size","")
      .css("background-size",null);

    if(imgset.align){
      if(imgset.align ==="11")
        div.css("background-size","100% 100%");
      else   if(imgset.align ==="22")
        div.css("background-size","contain");
      else if(imgset.align ==="33")
        div.css("background-size","cover");
      else if(imgset.align ==="44"){
        div.css("background-repeat","repeat");
        div.css("background-position","top left");
      }
    }
  }
}
