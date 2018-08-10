import EventDispatcher from "@/common/event/EventDispatcher";
import EventList from "@/common/event/EventList";

class NormalUtils{
}
if(window)
  window.NormalUtils = NormalUtils ;

NormalUtils._startt = "";
NormalUtils._max = 999999999999998;
NormalUtils._st = 0;
NormalUtils._st1 = 0;
NormalUtils._st2 = 0;
NormalUtils.CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
NormalUtils.testLogNum = 0 ;//测试用

/*产生对象级唯一ID*/
NormalUtils.createOID = function (key) {
  NormalUtils._st += 1;
  if (NormalUtils._st >= NormalUtils._max) {
    NormalUtils._st = 0;
    NormalUtils._st1 += 1;
    if (NormalUtils._st1 >= NormalUtils._max) {
      NormalUtils._st2 += 1;
      NormalUtils._st1 = 0;
      if (NormalUtils._st2 >= NormalUtils._max) {
        NormalUtils._startt = new Date().getTime() + "" + parseInt(Math.random() * 100000);
        NormalUtils._st = 0;
        NormalUtils._st1 = 0;
        NormalUtils._st2 = 0;
      }
    }
  }
  return key + "c" + NormalUtils._st + "h" + NormalUtils._st1 + "o" + NormalUtils._st2 + "n" + NormalUtils._startt + "g";
};


/*产生唯一ID  */
NormalUtils.createUUid = function (key, len, radix) {
  var chars = NormalUtils.CHARS, uuid = [], i;
  radix = radix || chars.length;
  if (!key)
    key = "UID";
  key = key.toLocaleUpperCase();
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = 'ZC';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return key + "" + uuid.join('');
};

/**
 * 日期格式化
  * @param date yyyy-mm-dd hh:mm:ss
 * @param format
 * @returns {*}
 */
NormalUtils.dateFormat = function (date, format="yyyy-MM-dd hh:mm:ss") {
  if (!date)
    return "";

  if(typeof date === "string")
    date = NormalUtils.dateFromString(date) ;
  else if(typeof date === "number")
    date = new Date(date) ;

  var o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};

/**
 *  yyyy-mm-dd hh:mm:ss
 */
NormalUtils.dateFromString = function(dateString) {
  if (!dateString)
    return null;
  var arr1 = dateString.split(" ");
  if(arr1.length!==2)
    return null ;
  var sdate = arr1[0].split('-');
  if(sdate.length!==3)
    return null ;
  var stime = arr1[1].split(":") ;
  if(stime.length!==3)
    return null ;
  return new Date(sdate[0], sdate[1] - 1, sdate[2],stime[0],stime[1],stime[2]);
  ;
}

/**
 * 2018-04-08T06:06:13Z
 * @param dateString
 * @returns {*}
 */
NormalUtils.dateFromString1 = function(dateString) {
  if (!dateString)
    return "";
  if(dateString.indexOf("Z"))
    dateString = dateString.substring(0,dateString.length-1) ;
  var arr1 = dateString.split("T");
  if(arr1.length!==2)
    return null ;
  var sdate = arr1[0].split('-');
  if(sdate.length!==3)
    return null ;
  var stime = arr1[1].split(":") ;
  if(stime.length!==3)
    return null ;
  return new Date(sdate[0], sdate[1] - 1, sdate[2],stime[0],stime[1],stime[2]);
  ;
}

/**
 * 数组转map
 * @param array
 * @param key
 * @param func
 * @param map
 * @returns {*}
 */
NormalUtils.array2Map = function(array ,key  ,func,map) {
  var _re = map;
  if (!_re)
    _re = {};
  array.forEach(function (item,index) {
    if (item){
      let _key = "" ;
      if(typeof item ==="string")
        _key = item ;
      else if(item.hasOwnProperty(key))
        _key = item[key] + "" ;
      if(_key){
        if(func)
          _re[_key] = func(item,index);
        else
          _re[_key] = item;
      }
    }
  });
  return _re;
};

NormalUtils.isArray = function(arg){
  return Object.prototype.toString.call(arg) === '[object Array]';
};

NormalUtils.initXmlWithArr = function( xmlstr , att ){
  var obj = NormalUtils.xmlStr2Object(xmlstr) ;
  if(obj.hasOwnProperty(att)){
    var arr = obj[att] ;
    if(!NormalUtils.isArray(arr)){
      obj[att] = [arr] ;
    }
  }
  return obj ;
}

/**
 * 将一个对象和另一个对象相同属性进行赋值
 * @param fromobj
 * @param toobj
 * @param isall 将对象所有属性拷贝到目标
 * @returns {*}
 */
NormalUtils.copyObjectAtt = function(fromobj, toobj ,isall=false) {
  if (!fromobj || !toobj)
    return toobj;
  for (var att in fromobj){
    if(isall)
      toobj[att] = fromobj[att];
    else if( toobj.hasOwnProperty(att))
      toobj[att] = fromobj[att];
  }
  return toobj ;
};

/**
 * 以目标为主 赋值
 * @param fromobj
 * @param toobj
 * @param arr
 * @returns {*}
 */
NormalUtils.copySimpleAtt = function(fromobj, toobj ,arr) {
  if (!fromobj || !toobj)
    return toobj;

  if(arr){
    for(var att of arr){
      if(fromobj.hasOwnProperty(att) && toobj.hasOwnProperty(att))
        toobj[att] = fromobj[att];
    }
  }
  else{
    for (var att in toobj) {
      if (fromobj.hasOwnProperty(att))
        toobj[att] = fromobj[att];
    }
  }
  return toobj ;
};

/**
 *
 * @param fromobj
 * @param toobj
 */
NormalUtils.copySimpleData = function(fromobj, toobj,exatt=null){
  let map = {} ;
  if(exatt){
    for(let ex of exatt){
      map[ex] = true ;
    }
  }
  for(let att in fromobj){
    if(typeof fromobj[att] !== "object" && !map.hasOwnProperty(att))
      toobj[att] = fromobj[att] ;
  }
  return toobj;
}

NormalUtils.getArrByAtt = function(arr,att){
  var _re = [] ;
  arr.forEach(function(item){
    if(item && item.hasOwnProperty(att))
      _re.push(item[att]) ;
  })
  return _re ;
};

/**
 * 条件删除
 * @param arr
 * @param func
 * @returns {*}
 */
NormalUtils.deleteByFunc = function(arr,func){
  let len = arr.length ;
  for(let i=0;i<len;i++){
    if(!func(arr[i],i)){
      arr.splice(i,1) ;
      i-=1 ;
      len-=1 ;
    }
  }
  return arr ;
};


/**
 * 获得对象的 路径 属性值
 * @param value
 * @param atts
 * @returns {*}
 */
NormalUtils.getPathData = function( value ,attArr ,def=null) {
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
 * 设置 路径属性 数据
 * @param value
 * @param atts
 * @param value
 * @returns {*}
 */
NormalUtils.setPathData = function( attArr ,value) {
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


//检查两个DIV是否相交
NormalUtils.hitTestDiv = function (div0, div1) {
  var _off1 = div0.offset();
  var _off2 = div1.offset();
  var _r1 = {x: _off1.left, y: _off1.top, w: div0.width(), h: div0.height()};
  var _r2 = {x: _off2.left, y: _off2.top, w: div1.width(), h: div1.height()};
  return NormalUtils.hitTestRec(_r1, _r2);
};

//获得相对子容器的坐标
NormalUtils.getFixLocalPos = function (px, py, con) {
  return {x: px - con.position().left, y: py - con.position().top};
};

//同布局范围内的DIV碰撞检查 节省效率
NormalUtils.hitTestDiv2 = function (div0, div1) {
  var _r1 = {x: div0.position().left, y: div0.position().top, w: div0.width(), h: div0.height()};
  var _r2 = {x: div1.position().left, y: div1.position().top, w: div1.width(), h: div1.height()};
  return NormalUtils.hitTestRec(_r1, _r2);
};

NormalUtils.getDivGlobalRec = function (div,ofx=0,ofy=0) {
  let _off1 = div.offset();
  let _re = {x: 0, y: 0, w: div.width()+ofx, h: div.height()+ofy};
  if (_off1) {
    _re.x = _off1.hasOwnProperty("left") ? _off1.left : 0;
    _re.y = _off1.hasOwnProperty("top") ? _off1.top : 0;
  }
  return _re ;
};

/**/
NormalUtils.hitTestGlobal = function (gx, gy, div,isl=false,ofx=0,ofy=0) {
  if(isl)
    return NormalUtils.hitTest2(gx, gy, NormalUtils.getDivGlobalRec(div,ofx,ofy));
  return NormalUtils.hitTest(gx, gy, NormalUtils.getDivGlobalRec(div,ofx,ofy));
};

/**/
NormalUtils.hitTestLocal = function (gx, gy, div) {
  return NormalUtils.hitTest(gx, gy, {
    x: div.position().left,
    y: div.position().top,
    w: div.width(),
    h: div.height()
  });
};

//点和面碰撞
NormalUtils.hitTest = function (x, y, box) {
  if (x >= box.x && x <= (box.x + box.w) && y >= box.y && y <= (box.y + box.h))
    return true;
  return false;
};

//左上角判断
NormalUtils.hitTest2 = function (x, y, box) {
  if (x >= box.x  && y >= box.y  )
    return true;
  return false;
};

//检查两个矩形是否相交
NormalUtils.hitTestRec = function (r1, r2) {
  if ((r1.x >= r2.x && r1.x >= r2.x + r2.w) || (r1.x <= r2.x && r1.x + r1.w <= r2.x) || (r1.y >= r2.y && r1.y >= r2.y + r2.h) || (r1.y <= r2.y && r1.y + r1.h <= r2.y))
    return false;
  return true;
};

//全局坐标转换成本地坐标
NormalUtils.globalToLocal = function ( px, py, div ) {
  var _offet = div.offset();
  return {x:px-_offet.left,y:py-_offet.top} ;
};

/**
 *
 * @param x
 * @param y
 * @param div
 * @param pdiv
 * @returns {{x: *, y: *}}
 */
NormalUtils.getLimitPos = function(x,y,div,pdiv,isl=false) {
  var _flag = false ;
  if (x < 0){
    x = 0
    _flag = true ;
  }
  else  if(!isl){
    let _w = div.width();
    let _pw = pdiv.width();
    if ((x + _w) > _pw){
      _flag = true ;
      x = _pw - _w;
    }
  }
  if (y < 0){
    _flag = true ;
    y = 0;
  }
  else if(!isl){
    let _h = div.height();
    let _ph = pdiv.height();
    if ((y + _h) > _ph){
      _flag = true ;
      y = _ph - _h;
    }
  }
  return {x: x, y: y,isout:_flag};
}

/*深度拷贝对象*/
NormalUtils.copyObjectDeep = function(obj) {
  if (!obj)
    return {};
  try {
    let _str = JSON.stringify(obj);
    let _re = JSON.parse(_str);
    return _re;
  } catch (e) {
    console.trace(e.stack);
  }
  return {};
}

/**
 * 弹出提示信息
 * @param info
 * @param type
 */
NormalUtils.popMessage = function( message ,type ="info" ){
  if(window.vm){
    window.vm.$message({
      message:message,
      type: type
    });
  }
}

/**
 * 直接删除某个对象
 * @param item
 * @param arr
 */
NormalUtils.deleteItemFromArr = function( item ,arr ){
  let len = arr.length ;
  for(let i=0;i<len;i++){
    if(item === arr[i] ){
      arr.splice(i,1) ;
      break ;
    }
  }
}

/**
 * 直接删除某个对象
 * @param item
 * @param arr
 */
NormalUtils.arrayIndexOf = function( item ,arr ){
  let len = arr.length ;
  let _index = -1 ;
  for(let i=0;i<len;i++){
    if(item === arr[i] ){
      _index = i ;
      break ;
    }
  }
  return _index ;
}

/**
 * 直接删除某个对象
 * @param item
 * @param arr
 */
NormalUtils.getArrayItemByAtt = function( item ,arr ,att ){
  let len = arr.length ;
  let _re = null ;
  for(let i=0;i<len;i++){
    let _item = arr[i] ;
    if( _item.hasOwnProperty(att) &&  (item[att] === _item[att]) ){
      _re = _item ;
      break ;
    }
  }
  return _re ;
}

/**
 * 输出对象内容
 */
NormalUtils.showObjStr = function( obj ,key){
  console.log(key+"------------------------>>>"+JSON.stringify(obj)) ;
}

/**
 * 过滤数据
 * @param datas
 * @param cols
 * @param att
 * @param isblank
 * @returns {Array}
 */
NormalUtils.filterData = function( datas ,cols ,att="name",isblank=false ) {
  if (!datas || !cols)
    return [];
  var _arr = [];
  for (let item of datas) {
    let obj = {};
    for (let col of cols) {
      obj[col[att]] = item[col[att]];
    }
    //过滤空
    if(isblank){
      let flag = NormalUtils.validObjBlank(obj,cols,att) ;
      if(!flag)
        _arr.push(obj);
    }
    else
      _arr.push(obj);
  }
  return _arr;
}

/**
 *
 * @param obj
 * @param cols
 * @param att
 * @returns {boolean}
 */
NormalUtils.validObjBlank = function(obj ,cols ,att="name"){
  let flag = true ;
  for (let col of cols) {
    let item = obj[col[att]];
    if (item!==undefined && item!=="" ){
      flag = false ;
      break ;
    }
  }
  return flag ;
}

/**
 * 过滤空属性
 */
NormalUtils.clearSpaceAtt = function( obj ){
    for(var att in obj ){
      if(obj[att] === "" || obj[att] === null )
        delete obj[att] ;
    }
    return obj ;
}

/**
 * 过滤空属性
 */
NormalUtils.createLocalAtt = function( item ,atts ,func=null){
  for(let att of atts ){
    item["_"+att] = item[att] ;
    if(func!==null)
      func(item,att) ;
  }
  return item ;
}

/**
 * 获得本地属性
 */
NormalUtils.setLocalAtt = function( item ,atts ){
  for(let att of atts ){
    item[ att] = item["_"+att] ;
  }
  return item ;
}
/**
 * 获得本地属性
 */
NormalUtils.copyLocalAttObj = function( item ,atts,itemfunc=null ){
  let  toItem = {} ;
  for(let att of atts ){
    toItem[ att] = item["_"+att] ;
    if(itemfunc!=null)
      itemfunc(toItem,att) ;
  }
  return toItem ;
}

/**
 * 获得数组中的某个对象
 * @param arr
 * @param value
 * @param att
 * @returns {*}
 */
NormalUtils.getSelectItem = function( arr , value ,att="id" ){
  let _re = null ;
  for(let item of arr ){
    if(item.hasOwnProperty(att) && item[att] === value){
      _re = item ;
      break ;
    }
  }
  return _re ;
}

/**
 * 根据值 获得数组中的某个对象
 * @param arr
 * @param value
 * @param att
 * @returns {*}
 */
NormalUtils.getSelectIndex = function( arr , value ,att="id",del=false ){
  let _re = -1 ;
  let _len = arr.length ;
  let _item ;
  for(let i=0;i<_len;i++ ){
    _item = arr[i] ;
    if(_item.hasOwnProperty(att) && _item[att] === value){
      _re = i ;
      if(del)
        arr.splice(i,1) ;
       break ;
    }
  }
  return _re ;
}

/**
 * 单独写个删除
 * @param arr
 * @param value
 * @param att
 */
NormalUtils.removeItemsArray = function( arr , value ,att="id" ){
  let _len = arr.length ;
  let _item ;
  for(let i=0;i<_len;i++ ){
    _item = arr[i] ;
    if(_item.hasOwnProperty(att) && _item[att] === value){
      arr.splice(i,1) ;
      i-=1 ;
      _len-=1 ;
    }
  }
}

/**
 * 排序数组
 * @param arr
 * @param mode
 */
NormalUtils.sortNumArray = function( arr ,att ){
  function compare(porps ){
    return function(obj1,obj2){
      return obj1[porps] - obj2[porps] ;     // 升序
    }
  }
  return  arr.sort(compare(att));
}

/**
 * 正序排序数组
 * @param x
 * @param y
 * @returns {number}
 */
NormalUtils.compare0 = function (x, y) {
  return x - y;
}

/**
 * 倒序排序数组
 * @param x
 * @param y
 * @returns {number}
 */
NormalUtils.compare1 = function (x, y) {
  return y - x;
}

/**
 * 列表组织成树
 * @param arr
 * @param id
 * @param pid
 */
NormalUtils.initListToTree = function(arr,id="id",pid="parentId", child="children") {

  //如果为空直接返回
  if (!arr)
    return [];

  //组装树结构
  let _list = [];
  let _map = {};
  for (let node of arr) {
    node[child] = [];
    _map[node[id]] = node;
  }
  for (let item of arr) {
    if (_map.hasOwnProperty(item[pid]))
      _map[item[pid]][child].push(item);
    else
      _list.push(item);
  }
  return _list;
}

/**
 * 遍历树
 * @param arr
 * @param itemFunc
 * @param child
 * @param level
 */
NormalUtils.travelTree = function(arr,itemFunc=null,child="children",level=0,pItem=null ) {
  if(!arr)
    return ;
  for(let node of arr){
    if(itemFunc!=null)
      itemFunc(node,level,pItem) ;
    if(node.hasOwnProperty(child) && node[child])
    NormalUtils.travelTree(node[child],itemFunc,child ,level+1,node) ;
  }
  return ;
}


/**
 * @formItem 表单元素对象 this.$refs["formItemName"]
 * @containerId 控制滚动的容器ID 为空不控制滚动 ,如果是 "OUTSCROLLER" 控制工程整体外层滚动
 * @isdom 是否是DOM原始元素 默认 false
 */
NormalUtils.autoScrollForm = function( containerId  ,fcDomId) {
  if(!containerId)
    return ;

  //滚动容器  OUTSCROLLER 外部容器
  let container = $("#" + containerId);
  if(!container[0])
    return ;

  if(!fcDomId){
    container[0].scrollTop = 0 ;
    return ;
  }
  let py = $("#"+fcDomId).offset().top;
  let cy = container.offset().top;
  if (container[0].scrollHeight > container[0].clientHeight)
    container[0].scrollTop = Math.max(py + container[0].scrollTop - cy, 0);
};

/**
 * 开始时间测试
 */
NormalUtils.startTimeLog = function( key="" ){
  NormalUtils.testLogNum = 0 ;
  NormalUtils.showTimeLog(key) ;
}

/**
 * 输出测试
 */
NormalUtils.showTimeLog = function( key="",isstart=false ){
  let timee = new Date().getTime();
  console.log("--------------------"+key+"------------------->>>>>"+(isstart?0:(timee-NormalUtils.testLogNum))) ;
  NormalUtils.testLogNum = timee ;
}

/**
 * 创建测试数据
 */
NormalUtils.createTestData = function( telemp , len = 10,id="id"){
  var _re = [] ;
  for(var i=0;i<len;i++){
    var _item = {} ;
    _re.push( Object.assign(_item,telemp)) ;
    if(_item.hasOwnProperty(id))
      _item[id] = _item[id]+i ;
  }
  return _re ;
}

/**
 * 切换路由
 */
NormalUtils.changeRouter = function(path,query,menu=null){
  let sendData = {
    route:{
      path:path,
      query:query,
      params:query
    },
    data:menu} ;
  if(query)
    NormalUtils.setSession(path+"_query",query) ;
  else
    NormalUtils.removeSession(path+"_query") ;
  EventDispatcher.disEvent(EventList.CHANGE_MAIN_VIEW_SYS,sendData );
}

/**
 * 获得路由参数
 */
NormalUtils.getRouteQuery = function( path ){
  return NormalUtils.getSession(path+"_query") ;
}

/**
 * 写session
 */
NormalUtils.setSession = function(key,value){
  if(typeof value==="object"){
    let str = JSON.stringify(value) ;
    window.sessionStorage.setItem( key,str);
  }
  else{
    window.sessionStorage.setItem( key,value+"");
  }
}

/**
 * 读取session
 */
NormalUtils.getSession = function(key,isObj=true ){
  if(isObj){
    let str =  window.sessionStorage.getItem( key );
    if(str && (str.indexOf("{")===0 || str.indexOf("[")===0) )
      return JSON.parse(str) ;
    else
      return str ;
  }
  return  window.sessionStorage.getItem( key );
}

/**
 * 读取session
 */
NormalUtils.clearSession = function( ){
  window.sessionStorage.clear( );
}

/**
 * 删除
 * @param key
 */
NormalUtils.removeSession = function(key ){
  window.sessionStorage.removeItem(key) ;
}


export default NormalUtils ;

