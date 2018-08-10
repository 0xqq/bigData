//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import FormPmBase from "@/common/model/FormPmBase" ;
import ConstManager from "@/common/manager/ConstManager";
import NormalUtils from "@/common/utils/NormalUtils";
import DataStorageAPI from "@/common/service/DataStorageAPI";
import LocalPagePm from "@/common/model/LocalPagePm";
import PathConst from "../../../../router/PathConst";

export default class TableManagerPM extends FormPmBase{

  constructor( name,id ) {
    super(name,id);

    this.sourceFlag = 1 ;
    this.dataSourceObj = null ;//当前资源
    this.mainview = null ;//主视图
    this.currentTable = null ;//当前表
    this.catchFields = [] ;//缓存字段
    this.catchTables = [] ;//缓存所有表
    this.pagePM = new LocalPagePm(DataStorageAPI.querySourceTableList) ;
    // this.pagePM.resultListHandler = this.tableResultHandler ;
    this.pagePM.pageSizes = [10, 50, 100, 200] ;

    this.initData(
      {
        formContainerId:NormalUtils.createOID("div_id"),
        isShow:false,
        dbFieldType:ConstManager.dbFieldType,
        tbTypeList:[{label:"内部表",value:0},{label:"外部表",value:1}],
        "tbl_type":0,
        tableKey:"",
        treeWidth:200,
        treeId:NormalUtils.createOID("dom_id_tmager"),
        source:{
          id:"",
          orgId:"",
          dataSourceName: "",
          orgName: "",
          dataInstance: "",
          hostAddress: "",
          dbType: "",
          dbStyle:""
        },

        //数据库列表数据
        dbTreeData:[],
        treeOptions: {
          children: 'children',
          label: 'label'
        },

        nameEditState:false,//双击修改
        descEditState:false,
        tableName: "",
        annotation:"",
        tableFields:[]
      }
    ) ;

    //保证字段不多不少一样
    this.fieldObj = {
      id:"",
      columnName:"",//字段名
      columnStyle:"VARCHAR",//字段类型
      columnLength:0,//字段长度
      columnRename:"",//字段别名
      dataResourceId:"",//多加一个id
      comment:""//字段描述
    } ;
  }

  /**
   * 初始化视图
   * @param value
   */
  initView( value , mainview ){

    if(!value)
      return ;

    //重置视图
    this.reset() ;

    //当前资源 主视图
    this.dataSourceObj = value ;
    this.mainview = mainview ;

    NormalUtils.showObjStr(value) ;

    //解析显示数据
    this.initData(value,this.data.source) ;

    //查询所有表
    this.queryTableList() ;

    //默认添加表
    this.addTable() ;
  }

  /**
   * 重置视图
   */
  reset(){
    this.data.isAdd = false ;
    this.currentTable = null ;//当前表
    this.catchFields = [] ;//缓存字段
    this.data.isPopUpdate = false;
    this.pagePM.reset();
  }

  /**
   * 查询数据库列表
   */
  queryTableList() {
    this.data.dbTreeData = [] ;
    this.tableKey = "" ;//清空关键字
    if(this.dataSourceObj)
    this.pagePM.queryList({dataSourceId: this.dataSourceObj.id }) ;
  }

  /**
   * 重新查询数据
   */
  reQueryTableList(){
    this.pagePM.reQuery() ;
  }

  /**
   * 点击处理
   * @param item
   */
  nodeItemClick( item ){

    //清空数据
    this.clearTableView() ;

    //当前编辑状态
    this.data.isPopUpdate = true ;

    //缓存数据
    this.currentTable = item ;
    this.data.tableName = item.tableName ;
    this.data.annotation = item.annotation ;
    this.data.tbl_type = 0 ;
    if(item.tbl_type)
       this.data.tbl_type = item.tbl_type ;

    //查询所有的表字段
    this.query({dataResourceId:item.id},
      (result)=>{
        let _list = this.getResultList(result) ;
        if(_list){
          this.catchFields = _list ;
          this.data.tableFields = this.getLocalDataList(_list) ;
        }
      },
      null,DataStorageAPI.queryTableFields) ;

    //temp?
    NormalUtils.autoScrollForm(this.data.formContainerId) ;
  }

  /**
   * 添加表
   */
  addTable(){
    this.clearTableView( true ) ;
    this.currentTable = {
      id: "",
      tableName: "",
      annotation: "",
      tbl_type: 0,
      dataSourceId: this.dataSourceObj.id
    } ;
    this.data.isAdd = true ;
  }

  /**
   * 取消添加
   */
  cancleAdd(){
    this.clearTableView() ;
    this.data.isAdd = false ;
  }

  /**
   * 添加字段
   */
  addField( item ) {
    if (item) {
      let _index = NormalUtils.arrayIndexOf(item, this.data.tableFields);
      this.data.tableFields.splice(_index+1, 0, this.createTempField())
    }
    else
      this.data.tableFields.unshift(this.createTempField());
  }

  /**
   * 删除某个字段
   * @param item
   */
  removeField(item){
    NormalUtils.deleteItemFromArr(item,this.data.tableFields) ;
  }

  /**
   * 字段修改
   * @param data
   * @param field
   * @param val
   */
  fieldAttChange(data,field,val=""){
    data.isUpdate = true ;
  }

  /**
   * 验证当前表单
   * @returns {boolean}
   */
  validForm() {
    if (!this.data.tableName) {
      this.popMessage("表名称必须填写!");
      return false;
    }

    let nameRge = /^[a-zA-Z0-9_]+$/ ;
    if(!nameRge.test(this.data.tableName)){
      this.popMessage("表名称必须格式错误(数字字母下划线)!");
      return false;
    }

    var _fields = this.data.tableFields;
    let _len = _fields.length;
    if (_len === 0) {
      this.popMessage("请添加属性，数据表必须存在至少一个属性!");//192.168.58.110
      return false;
    }

    var _mess = "";
    let filedRge = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/ ;
    for (let i = 0; i < _len; i++) {
      let item = _fields[i];
      if (!item.columnName) {
        _mess = "第" + (i + 1) + "行字段名不能为空！";
        break;
      }
      if(!filedRge.test(item.columnName)){
        _mess = "第" + (i + 1) + "行字段名格式错误(字母、数字、下划线，首字符不能为数字且下划线不可连续)！";
        break;
      }
      if (!item.columnStyle) {
        _mess = "第" + (i + 1) + "行字段类型不能为空！";
        break;
      }
    }
    if (_mess) {
      this.popMessage(_mess);
      return false;
    }
    return true;
  }

  /**
   * 保存数据
   */
  submit() {
    if(!this.validForm())
      return ;

    let saveData = {dataSourceId: this.dataSourceObj.id};

    //比较哪些是删除的 哪些是添加的
    let catchMap = {};
    let oldMap = {};
    let addArr = [];
    let reduceArr = [];
    let updateArr = [];
    this.catchFields.forEach((item) => {
      catchMap[item.randId] = item;
    });
    this.data.tableFields.forEach((item) => {
      if (!catchMap.hasOwnProperty(item.randId)) {
        addArr.push(item);
      }
      else {
        oldMap[item.randId] = item;
        if (item.isUpdate)
          updateArr.push(item);
      }
    });
    this.catchFields.forEach((item) => {
      if (!oldMap.hasOwnProperty(item.randId))
        reduceArr.push(item);
    });

    //组织数据格式
    saveData.dataResourceDto = {
      id: this.currentTable.id,//资源ID
      tableName: this.data.tableName,//表名
      annotation: this.data.annotation,//表注释
      dataSourceId: this.currentTable.dataSourceId,// 数据源id
      dbName:this.dataSourceObj.dataInstance ,
      sourceFlag: this.sourceFlag ,
      tblType:this.data.tbl_type?this.data.tbl_type+"":"0"
    };
    saveData.addField = this.getWebDataList(addArr);
    saveData.updateField = this.getWebDataList(updateArr);
    saveData.deleteField = this.getWebDataList(reduceArr);

    //保存
    this.query(saveData, (result) => {

      //提示
      this.popMessage("保存成功！");

      //重新查询数据保证一致性
      this.reQueryTableList();

      //重新恢复为添加状态
      if(!this.data.isPopUpdate)
          this.addTable() ;

    }, null, DataStorageAPI.saveTableInfo);
  }

  /**
   * 添加几个临时变量
   * @param arr
   * @returns {Array}
   */
  getLocalDataList( arr ){
    let _copyList = [] ;
    arr.forEach((item)=>{
      item.isUpdate = false ;
      item.randId = NormalUtils.createOID("table_id") ;//生成一个随机ID
      if(!item.comment)
        item.comment = "" ;//不能有null值 否则保存会失败
      _copyList.push(item) ;
    }) ;
    return _copyList ;
  }

  /**
   * 只取后台需要的
   * @param arr
   * @returns {Array}
   */
  getWebDataList( arr ){
    let _copyList = [] ;
    arr.forEach((item)=>{
      let _citem = this.initData(this.fieldObj,{}) ;
      _citem = NormalUtils.copySimpleAtt(item, _citem) ;
      _copyList.push(_citem) ;
    }) ;
    return _copyList ;
  }

  /**
   * 情况表视图
   */
  clearTableView(  ){
    this.currentTable = null ;
    this.data.deleteItems = [] ;
    this.catchFields = [] ;
    this.data.tableFields = [] ;
    this.data.tableName = "" ;
    this.data.annotation = "" ;
    this.data.isPopUpdate = false ;
    this.data.tbl_type = 0 ;
  }

  /**
   * 清空视图
   */
  clearView(){
     this.clearTableView() ;
  }

  /**
  * 统一返回调用
  **/
  changeBackMain(){
    this.clearView() ;
    NormalUtils.changeRouter( PathConst.DS_OLD_CONFIG_TABLE_LIST) ;
  }

  /**
   * 添加临时字段
   */
  createTempField(){
    let _citem = this.initData(this.fieldObj,{}) ;
    _citem.isUpdate = false ;
    _citem.randId = NormalUtils.createOID("table_id");//生成一个随机ID
    _citem.dataResourceId = this.currentTable?this.currentTable.id :"" ;
    return _citem;
  }

}
