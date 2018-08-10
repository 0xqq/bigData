/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import FormPmBase from "@/common/model/FormPmBase";
import PagePm from "@/common/model/PagePm";
import PlatformAPI from "@/common/service/PlatformAPI";
import NormalUtils from "../../../common/utils/NormalUtils";
import PathConst from "../../../router/PathConst";

export default class TenantAuthorizePM extends FormPmBase {

  constructor() {
    super();
    this.deleteMethod = PlatformAPI.delteTenantAuthor ;
    this.createMethod = PlatformAPI.saveAuthorData ;
    this.updateMethod = PlatformAPI.editAuthorData;

    //先不分开
    this.pagePM = new PagePm(PlatformAPI.queryTenantAuthor,1) ;
    this.pagePM.resultListHandler = (result)=>{return this.resultHandler(result)} ;
    // this.pagePM.testHandler = this.testHandler ;

    this.initData({
      currentView:"hadoop",
      subView:"hdfs",
      currentData:{
        id:"",
        name:"",
        orgName:""
      },
      typeList:[
        {label:"HDFS目录",value:"hdfs"},//
        {label:"HBASE表",value:"hbase"},
        {label:"HIVE库",value:"hive"},
      ],
      accessesListHdfs:[
        {type:"read",isAllowed:false},
        {type:"write",isAllowed:false},
        {type:"execute",isAllowed:false}
      ],
      accessesListHbase:[
        {type:"read",isAllowed:false},
        {type:"write",isAllowed:false},
        {type:"create",isAllowed:false},
        {type:"admin",isAllowed:false}
      ],
      accessesListHive:[
        {type:"select",isAllowed:false},
        {type:"update",isAllowed:false},
        {type:"create",isAllowed:false},
        {type:"drop",isAllowed:false},
        {type:"alter",isAllowed:false},
        {type:"index",isAllowed:false},
        {type:"lock",isAllowed:false},
        {type:"all",isAllowed:false}
      ],
    }) ;
    this.initSearchForm() ;
    this.initFormData() ;
  }

  /**
   * 初始化视图
   */
  initView(data){
    this.initData(data,this.data.currentData) ;
    this.queryList() ;
  }


  /**
   * 切换视图
   */
  changeView(){

  }

  /**
   * 切换二级视图
   */
  changeSubView(){
    this.queryList() ;
  }

/*-------------------------------------------------------------- query ------------------------------------*/

  /**
   * 初始化搜索表单
   * @param query
   */
  initSearchForm(query=false){
    this.initDataForm({
      objectName:""
    },"searchForm") ;
    if(query)
      this.queryList() ;
  }

  /**
   * 查询列表
   */
  queryList(){
    let send = this.getQueryParam() ;
    this.pagePM.queryList(send) ;
  }

  /**
   * 获得当前查询条件
   */
  getQueryParam(){
    let send = {
      tenant:this.data.currentData.id,
      type:this.data.subView
    } ;
    if(this.data.subView === "hdfs")
      send.path = this.data.searchForm.objectName ;
    else if(this.data.subView === "hbase")
      send.table = this.data.searchForm.objectName ;
    else if(this.data.subView === "hive")
      send.db = this.data.searchForm.objectName ;
    return send ;
  }


  /**
   * 列表数据返回处理
   * @param result
   */
  resultHandler(result){
    if(!result || !result.resultdata || !result.resultdata.policies)
      return [] ;
    let list = result.resultdata.policies ;
    for(let item of list ){
      this.initResultItem(item) ;
    }
    return list ;
  }

  /**
   * 解析单个
   * @param item
   * @param att
   */
  initResultItem(item){
    if(!item)
      return item ;
    item.resourcesName = item.resource ;
    item.policyItemsName = "" ;
    if( item.accesses){
      let typeArr = [] ;
      for(let plicy of item.accesses){
        if( (plicy.isAllowed+"") === "true")
          typeArr.push(plicy.type) ;
      }
      item.policyItemsName = typeArr.join("、") ;
    }
    return item;
  }

  /*------------------------------------------------------------ from -------------------------------*/

  /**
   * 初始化添加表单
   */
  initFormData(isDetail=false){
    this.initDataForm({
      id:"",
      type:"hdfs",
      input:"",
      objList:[],//输入的对象列表
      objNames:"",
      tanenat:"",
      createTime:"",
      updateTime:"",
      objDataName:"", //授权对象名称
      resourcesName : "" ,
      policyItemsName : "" ,
      typeName:"",
      allAccesses:"",
      accessesList:this.data.accessesListHdfs
    },"form") ;

    //类型以视图为准
    if(isDetail)
      this.data.form.type = this.data.subView;

    //默认第一个
    this.changeType() ;
  }

  /**
   * 弹出创建窗口
   */
  popCreateWin(item){
    super.popCreateWin(item) ;
    this.initFormData(true) ;
  }


  /**
   * 弹出详情
   * @param item
   */
  popEditeWin(item){
    super.popEditeWin(item) ;
    this.initFormData(true) ;
    NormalUtils.copyObjectAtt(item,this.data.form) ;

    //权限集合
    if(item.accesses){
        let map = {} ;
        for(let policy of item.accesses){
          if((policy.isAllowed+"")==="true")
            map[policy.type] = true ;
        }
        for(let cPolicy of this.data.form.accessesList){
          cPolicy.isAllowed = false ;
          if(map.hasOwnProperty(cPolicy.type))
            cPolicy.isAllowed = true ;
        }
        this.refreshCheck() ;
    }
  }

  /**
   * 切换类型
   */
  changeType(){
    let _lb = "HDFS文件目录" ;
    let _arr = this.data.accessesListHdfs ;
    if(this.data.form.type==="hbase"){
      _lb = "HBASE表";
      _arr = this.data.accessesListHbase ;
    }
    else if(this.data.form.type==="hive"){
      _lb = "HIVE库";
      _arr = this.data.accessesListHive ;
    }
    for(let item of _arr){
      item.isAllowed = false ;
    }
    this.data.form.objDataName = _lb ;
    this.data.form.accessesList = _arr ;
    this.data.form.objList = [] ;
    this.data.form.input = "" ;
    this.data.form.objNames = "" ;//业务有变
  }

  /**
   *
   * @returns {{name, description, resources: {path: {values: Array}}, policyItems: *[]}}
   */
  getCreateParams(){
    return {
      type:this.data.form.type,
      param:{
        user: this.data.currentData.id,
        resource:this.data.form.objList[0].value ,
        accesses: this.getSelectData()
      }
    };
  }

  /**
   * 编辑表单
   * @returns {{name, description, resources: {path: {values: Array}}, policyItems: *[]}}
   */
  getUpdateParams() {
    return {
      type: this.data.form.type,
      param: {
        policieID: this.data.form.id,
        user: this.data.currentData.id,
        resource: this.data.form.resourcesName,
        accesses: this.getSelectData()
      }
    };
  }

  /**
   * 获得当前选中的权限
   */
  getSelectData(){
    let _re = [] ;
    this.data.form.accessesList.forEach((item)=>{
      if( item.isAllowed )
        _re.push(item) ;
    })
    return _re ;
  }

  /**
   * 刷新权限
   */
  refreshCheck(){
    let _arr = this.getSelectData() ;
    this.data.form.allAccesses = _arr.join(",") ;
  }

  /**
   * 回收参数
   * @param param
   * @param ismore
   * @param idfield
   */
  getDeleteParams(param,ismore=false,idfield="id"){
    return {
      type:this.data.subView ,
      param:{
        pid:param.id,
        uid:this.data.currentData.id
      }
    } ;
  }

  /**
   * 删除返回处理
   * @param result
   * @param mes
   */
  deleteResultHandler(result,ismore=false,mes=""){
    super.deleteResultHandler(result,ismore,"回收成功！") ;
  }

  /*----------------------------------------------------------- 自动匹配 逻辑有变 ----------------------------*/

  /**
   * 选择
   * @param item
   */
  handleAutoSelect(item){
    if(item.hasOwnProperty("type") && item.type==="temp")
      return ;
    // this.data.form.input = "" ;//---------修改回 注释放开
    if(!this.data.form.objList)
      this.data.form.objList = [] ;

    //如果已经存在不添加
    let _index = NormalUtils.getSelectIndex(this.data.form.objList,item.value,"value") ;
    if(_index>-1)
      return ;

    this.data.form.objList.push(item) ;
    this.refreshAutoName() ;
  }

  /**
   * 删除某个对象
   * @param item
   */
  removeAutoSelect(item){
    let _index = this.data.form.objList.indexOf(item) ;
    if(_index>-1)
      this.data.form.objList.splice(_index,1) ;
    this.refreshAutoName() ;

    //新逻辑修改添加 如改回 注释掉
    this.data.form.input = "" ;
  }

  /**
   * 刷新验证标识
   */
  refreshAutoName(){
    this.data.form.objNames = this.data.form.objList.length>0?this.data.form.objList[0].value:"" ;
  }

  /**
   * 自动匹配路径等
   * @param str
   * @param cback
   */
  queryKeyInfo(str, cback) {
    if(!str){
      cback([]);
      return ;
    }
    this.data.inputError = "" ;
    let send = {"userInput": str};
    let _this = this;
    let _method = PlatformAPI.queryHdfsPath;
    let _type = this.data.form.type ;
    if (_type === "hdfs") {
      send.resourceName = "path";
      send.resources = {"path": [str]};
    }
    else if (_type === "hbase") {
      send.resourceName = "table";
      send.resources = {"table": [str]};
      _method = PlatformAPI.queryHbaseTable;
    }
    else if (_type === "hive") {
      send.resourceName = "database";
      send.resources = {"database": [str]};
      _method = PlatformAPI.queryHiveDb;
    }
    _method(send).then(
      (result) => {
        cback(_this.initAutoList(result, str));
      },
      () => {
        cback([]);//{value: "暂无匹配项",type:"temp"}
      }
    );
  }

  /**
   *
   * @param result
   * @param str
   * @returns {Array}
   */
  initAutoList(result,str){
    let list = result.resultdata ;
    let arr = [] ;
    if(list){
      for(let item of list ){
        arr.push({value:item}) ;
      }
    }
    // if(arr.length===0)
    //   arr.push() ;
    return arr ;
  }

  /**
   * 返回主页
   */
  changeBackMain() {
    NormalUtils.changeRouter(PathConst.PM_TENENT_LIST) ;
  }

  /**
   * 测试数据
   */
  testHandler(){
    return NormalUtils.createTestData({
      id:"dfdf",
      name:"dfdfdfdf",
      resourcesName:"dfdfdf,dfdfdf,dfdfdfd",
      policyItemsName:"dfdf,dfdfd"
    })
  }

}
