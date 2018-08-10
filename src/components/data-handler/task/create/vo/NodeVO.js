/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import SuanziManager from "@/common/manager/SuanziManager" ;
import NormalUtils from "../../../../../common/utils/NormalUtils";

export default class NodeVO {

  constructor(data) {
    this.autoId = NormalUtils.createOID("NodeVO") ;
    this.name = "";//步骤名称
    this.type = "";//步骤类型
    this.icon = "" ;//图标
    this.group = "";//类型  input 数据 handler 处理 out 输出
    this.data = {};//原始数据
    this.options = {};//配置信息
    this.optionsMap = {};//配置信息扁平化方便设置
    this.position = {} ;
    if (data)
      this.initData(data);
  }

  /**
   * 单独设置名称
   * @param label
   */
  setOptionItem(att,value){
    if(this.optionsMap.hasOwnProperty(att))
      this.optionsMap[att].value = value ;
    if(this.hasOwnProperty(att))
      this[att] = value ;
  }

  /**
   * 初始化数据
   * @param data
   */
  initData(data) {
    this.data = data;
    if(!data)
      return ;

    //基本信息
    NormalUtils.copySimpleAtt(data,this,[ "name","type" ,"group","icon"]) ;

    let options = SuanziManager.getNodeOption(data.type);

    console.log(options);
    if(!options || !options.hasOwnProperty("vs"))
      return ;

    this.optionsMap = {} ;
    this.group = options.group ;
    this.icon = options.icon ;
    let items = options.formItems;
    for (let item of items) {
      this.initItemDatas(item,data,this.optionsMap) ;
    }
    this.options = options;

    if(this.data.GUI){
      this.x = parseFloat(this.data.GUI.xloc) ;
      this.y = parseFloat(this.data.GUI.yloc) ;
    }
    else{
      this.data.GUI = {
        "xloc":0,
        "yloc":0,
        "draw": "Y"
      };
    }
  }

  /**
   * 解析基本数据
   * @param item
   * @param data
   * @param map
   */
  initItemDatas(item,data,map){
    if(item.type === "group")
      this.initGroupItems(item,data,map) ;
    else if (data.hasOwnProperty(item.name))
      item.value = data[item.name];
    else if(item.name.indexOf(",")>-1)
      item.value = this.getJionValue(item.name,data,item.value) ;
    else if(item.name.indexOf(".")>-1){
      item.value = this.getPathValue(item.name,data,item.value) ;
    }

    //解析挂列表的数据
    if(item.hasOwnProperty("formList") && item.formList)
      this.initFormListItems(item,data,map) ;
  }
  /**
   *
   */
  getPathValue(name , value,def=""){
    let _atts = name.split(".");
    let _data = value;
    for (let att of _atts) {
      if (!_data.hasOwnProperty(att)) {
        return def;
        break;
      }
      _data = _data[att];
    }
    return _data ;
  }
  /**
   * 组合的数据
   * @param name
   * @param data
   * @returns {string}
   */
  getJionValue(name , data ,defs=""){
    let atts = name.split(",") ;
    let vals = defs?defs.split(","):[] ;
    let values = [] ;
    for(let i=0;i<atts.length;i++ ){
      let att = atts[i] ;
      if (data.hasOwnProperty(att))
        values.push(data[att]) ;
      else{
        if(i<vals.length)
          values.push(vals[i]) ;
        else
          values.push("")  ;
      }
    }
    return values.join(",") ;
  }

  /**
   * 列表类型的数据
   */
  initFormListItems(group,data ){
    for(let item of group.formList ){
        this.initItemDatas(item,data) ;
    }
  }

  /**
   * 解析分组的数据
   * @param group
   * @param data
   */
  initGroupItems( group,data ){
    for(let content of group.value ){
       for(let item of content.value ){
         this.initItemDatas(item,data) ;
       }
    }
  }


  refreshOptions( data ){
    this.options.formItems = data ;
    // for(let item of data){
    //   this.data[item.name] = item.value;
    // }
    // this.name = this.data.name ;
    // this.type = this.data.type ;
  }

  /**
   * 刷新位置参数
   * @param x
   * @param y
   */
  refreshPosition( x , y ){
    if(!this.data.GUI)
      this.data.GUI = {
        "xloc":0,
        "yloc":0,
        "draw": "Y"
      } ;
    this.data.GUI.xloc = parseInt(x );//后台只要整形 不能传float
    this.data.GUI.yloc = parseInt(y) ;
  }

  /**
   * 获得位置参数
   * @returns {{x: number, y: number}}
   */
  getPosition(){
    if(this.data.GUI){
      let _x = parseInt(this.data.GUI.xloc );
      let _y = parseInt(this.data.GUI.yloc );//后台只要整形 不能传float
      return {x:isNaN(_x)?0:_x ,y:isNaN(_y)?0:_y} ;
    }
    return {x:0,y:0} ;
  }

  /**
   *
   * @returns {{}|*}
   */
  getSaveData(){
    if(this.options.formItems){
      for(let item of  this.options.formItems){
         this.getSaveItemData(this.data,item) ;
      }
    }
    return this.data ;
  }

  /**
   * 获得 单个属性 保存数据
   * @param item
   * @param data
   */
  getSaveItemData(  data ,item){
    if(item.type === "group")
      this.getSaveGroupData(data,item ) ;
    else if(item.name.indexOf(",")>0)
      this.initJionData( data , item) ;
    else if(item.name.indexOf(".")>0)
      this.initPathData( data , item) ;
    else
      data[item.name] = item.value;

    //挂列表的数据
    if(item.hasOwnProperty("formList") && item.formList)
      this.getSaveListData(data,item) ;
  }

  /**
   * 获得分组格式的保持属性
   * @param data
   * @param group
   */
  getSaveGroupData(data,group){
    for(let content of group.value ){
      for(let item of content.value ){
        this.getSaveItemData( data,item) ;
      }
    }
  }

  /**
   * 列表类型的集合
   * @param data
   * @param group
   */
  getSaveListData(data,list){
    for(let item of list.formList ){
      this.getSaveItemData( data,item) ;
    }
  }

  /**
   * 将数据拆分组合
   * @param name
   * @param data
   * @returns {string}
   */
  initJionData( data ,item){
    let atts = item.name.split(",") ;
    let values = item.value.split(",") ;
    for(let i=0;i<atts.length;i++){
      let att = atts[i] ;
      data[att] = i<values.length?values[i]:"" ;
    }
  }

  /**
   *
   */
  initPathData(data,item){
    let atts = item.name.split(".") ;
    let _len = atts.length -1 ;
    let _data = data ;
    for (let i=0;i<_len;i++ ) {
      let att = atts[i] ;
      if(!_data.hasOwnProperty(att) || !_data[att])
        _data[att] = {} ;
      _data = _data[att];
    }
    if(item.value==="" && item.hasOwnProperty("def"))
      _data[atts[_len]] = item.def ;
    else
      _data[atts[_len]] = item.value ;
  }

  /**
   * 浅拷贝数据
   * @returns {*}
   */
  clone(){
    return NormalUtils.copyObjectAtt(this,new NodeVO(),true) ;
  }

}
