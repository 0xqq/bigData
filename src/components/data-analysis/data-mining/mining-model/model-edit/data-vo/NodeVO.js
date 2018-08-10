/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */

export default class NodeVO {

  constructor(data) {
    this.autoId = NormalUtils.createOID("NodeVO") ;
    this.idl = this.autoId ;//冗余一个属性
    this.id = "" ;//步骤ID
    this.name = "";//步骤名称
    this.type = "";//步骤类型
    this.icon = "" ;//图标
    this.group = "";//类型  input 数据 handler 处理 out 输出
    this.pGroup = "";
    this.data = {};//原始数据
    this.options = [] ;//配置信息
    this.optionsMap = {} ;
    if (data)
      this.initData(data);
    this.fixedAtt = ["autoId","id", "type","icon","group","pGroup"] ;
  }

  /**
   * 单独设置名称
   * @param label
   */
  setOptionItem(att,value){
     if(this.hasOwnProperty(att))
       this[att] = value ;
     for(let item of this.options){
       if(item.name === att)
         item.value = value ;
     }
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
    NormalUtils.copySimpleData(data,this ) ;
    if(data.algorithmName)
      this.name = data.algorithmName ;

    if(!data.props)
      return ;

    for (let item of data.props) {
      this.initItemDatas(item ) ;
    }
    this.options = data.props;

    if(data.position){
      this.x = parseFloat(data.position.x) ;
      this.y = parseFloat(data.position.y) ;
    }
    else {
      this.data.position = {
        x: 0,
        y: 0
      };
    }
  }

  /**
   * 解析基本数据
   * @param item
   * @param data
   * @param map
   */
  initItemDatas(item,data){
     if(item && item.config && typeof item.config === "string")
       item.config = JSON.parse(item.config) ;
     else
       item.config = {} ;
  }

  /**
   * 刷新基础信息
   * @param data
   */
  refreshBaseData( data ){
    NormalUtils.showObjStr(data) ;
    NormalUtils.copySimpleData(data,this,this.fixedAtt) ;
  }

  /**
   * 刷新表单数据
   * @param data
   */
  refreshOptions( data ){
    if(!data || data.length===0)
      return ;
    if(!this.options){
      this.options = data ;
      return ;
    }
    let map = {} ;
    for(let item of this.options){
      map[item.name] = item ;
    }
    for(let itemData of data ){
      if(map.hasOwnProperty(itemData.name))
        map[itemData.name].value = itemData.value ;
    }
  }

  getOptions(){
    return this.options ;
  }

  /**
   * 刷新位置参数
   * @param x
   * @param y
   */
  refreshPosition( x , y ){
    if(!this.data.position)
      this.data.position = {x:0,y:0 } ;
    this.data.position.x = parseFloat(x );
    this.data.position.y = parseFloat(y) ;
  }

  /**
   * 获得位置参数
   * @returns {{x: number, y: number}}
   */
  getPosition(){
    if(this.data.position){
      let _x = parseFloat(this.data.position.x );
      let _y = parseFloat(this.data.position.y );
      return {x:isNaN(_x)?0:_x ,y:isNaN(_y)?0:_y} ;
    }
    return {x:0,y:0} ;
  }

  /**
   *
   * @returns {{}|*}
   */
  getSaveData(){
    let _data = NormalUtils.copyObjectDeep(this.data ) ;
    _data.props = {} ;
    if(this.options){
      for(let item of  this.options){
         this.getSaveItemData(_data.props,item) ;
      }
    }
    NormalUtils.copySimpleData(this,_data,this.fixedAtt) ;
    _data.algorithmName = _data.name ;
    return _data ;
  }

  /**
   * 获得 单个属性 保存数据
   * @param item
   * @param data
   */
  getSaveItemData(  data ,item){
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
    _data[atts[_len]] = item.value ;
  }

  /**
   * 浅拷贝数据
   * @returns {*}
   */
  clone(){
    return NormalUtils.copyObjectAtt(this,new NodeVO(),true) ;
  }

  /**
   * 将返回的属性列表扁平化方便合并
   * @param resultData
   */
  initPropsMap(resultData){

  }

  /**
   * 解析后台数据到本地数据格式 差别有点大 避免改太多
   * @param item
   * @returns {Array}
   */
  static initPropsList( list ,isdef=false ){
    if(!list )
      return [] ;

    let re = [] ;
    for(let prop of list ){
      let itemProp = {
        id:prop.id ,
        name:prop.algorithmParamName,
        label:prop.algorithmParamDesc,
        config:prop.algorithmParamConfig,
        dataType:prop.algorithmParamType,
        algorithmId:prop.algorithmId,
        flag:prop.flag,
        value:prop.algorithmParamRecommend //推荐值
      } ;
      if(itemProp.value === undefined)
        itemProp.value = "" ;
      re.push(itemProp) ;
    }
    return re ;
  }

}
