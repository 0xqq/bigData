//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import FormPmBase from "@/common/model/FormPmBase" ;
import NormalUtils from "@/common/utils/NormalUtils";
import PathConst from "@/router/PathConst";
import DataStorageAPI from "@/common/service/DataStorageAPI" ;
import PagePm from "@/common/model/PagePm";
import ConstManager from "@/common/manager/ConstManager";

export default class ConfigMagerPM extends FormPmBase{

  constructor( name,id ) {
    super(name,id);
    this.createMethod = DataStorageAPI.saveConfigData ;
    this.updateMethod = DataStorageAPI.saveConfigData ;
    this.deleteMethod = DataStorageAPI.deleteConfig ;
    this.deleteMethod2 = DataStorageAPI.deleteConfig ;

    //分页查询组件
    this.pagePM = new PagePm(DataStorageAPI.queryConfigList) ;
    this.pagePM.resultListHandler = (result)=>{return this.resultItemHandler(result) };
    // this.pagePM.testHandler = this.testHandler ;

    //初始化绑定数据
    this.initData(
      {
        showPart:true,
        sourceFenList2:[],

        //数据库类型
        sourceTypeList:[],

        //nosql 数据库列表
        nosqlTypeList:[],

        //数据源类别
        sourceFenList: ConstManager.sourceTypeList ,

        //文件类型
        fileTypeList:[
          {label:"FTP Server",value:'ftp'},
          {label:"Http Server",value:'http',disabled:true},
          {label:"HDFS",value:'hdfs',disabled:true},
          {label:"其它(自有协议)",value:'other',disabled:true}
        ],

        /*图表数据源*/
        tableData:[  ],

        //选中数据
        selectedItems:[]
      }
    ) ;

    //文件类型map
    //文件数据
    this.fileServerMap = NormalUtils.array2Map(this.data.fileTypeList,"value") ;


    //初始化查询表单
    this.initSearchForm();

    //编辑信息
    this.initFormData();
  }

  /**
   * 初始化异步列表数据
   */
  initAnayListData(){
    ConstManager.initDataDictionary(()=>{
      this.data.nosqlTypeList = ConstManager.nosqlList ;


      //资源类型
      this.data.sourceTypeList = ConstManager.dbTypeList ;
      this.data.sourceFenList = ConstManager.sourceTypeList ;
      //关系型数据库
      this.dbMap = NormalUtils.array2Map(this.data.sourceTypeList,"value") ;
    }) ;
  }

  /*初始化查询表单*/
  initSearchForm( query=true ) {

    //清空查询条件
    this.data.searchForm = this.initData({
      orgId: "",
      hostAddress: "",
      dbStyle: "",
      resourceStyle:""
    }, this.data.searchForm||{});

    //查询
    if (query === true)
      this.queryList();
  }

  /**
   * 初始化 增改表单项
   * @isinit 是否完全重新初始化
   */
  initFormData( isinit = true ){
    this.initDataForm({
      id: "",
      resourceStyle: "database",
      sourceFlag:0, //标记数据源  0 external 外部数据源 original原始区 handler处理 analysis分析
      orgId: "",//来源部门id
      orgName:"",//用于显示的机构名称
      dataSourceName: "",//数据源名称
      fileStyle:"",//文件服务类型类型
      foldPath:"",//文件目录
      dbStyle: "mysql",//数据库类型
      hostAddress: "",//主机地址
      hostPort: 3306,//端口
      dbUsername: "",//用户名
      dbPassword: "",//密码
      dataInstance: ""
    },"form") ;
  }

  /**
   * 第一次进入 初始化数据
   */
  initView(){
    super.initView() ;

    //进入视图初始化 异步列表数据
    this.initAnayListData() ;

    //查询机构列表

    //默认查询数据
    this.queryList() ;
  }

  /*查询列表*/
  queryList(){
    if(this.data.searchForm.resourceStyle==="file")
      this.data.searchForm.dbStyle = "" ;
    super.queryList(this.data.searchForm);
  }

  /**
   *
   */
  resultItemHandler(result){
    let list = this.getResultList(result) ;
    let _this = this ;
    for(let item of list){
      item.dbStyleName = item.dbStyle ;
      if(item.resourceStyle === "file"){

        item.resourceStyleName = "文件数据" ;
        //查看是否是对象自身下面的属性,返回值：false（不是）、true（是）
        if( _this.fileServerMap.hasOwnProperty(item.dbStyle))
          item.dbTypeName = _this.fileServerMap[item.dbStyle].label ;

      }else if(item.resourceStyle === "nosql"){

        item.resourceStyleName = "非关系型数据库" ;


      } else{

        item.resourceStyleName = "关系型数据库" ;

        if(_this.dbMap && _this.dbMap.hasOwnProperty(item.dbStyle))
          item.dbStyleName = _this.dbMap[item.dbStyle].label ;

      }
    }
    return list ;
  }

  /**
   * 组织删除参数
   * @param param
   * @param ismore
   * @param idfield
   */
  getDeleteParams(param,ismore=false,idfield="id"){
    if(!ismore)
      param = [param] ;
    return super.getDeleteParams(param,true,idfield) ;
  }

  /**
   * 重置表单
   */
  resetForm(){
    this.initFormData(false) ;
    if(this.resetHandler)
      this.resetHandler() ;
  }

  /**
   *  弹出创建窗口
   */
  popCreateWin(formValue){
    super.popCreateWin();
    this.initFormData() ;
  }

  /**
   *  弹出修改窗口
   */
  popEditeWin( item ){
    super.popEditeWin(item) ;

    //解析数据到表单
    NormalUtils.copySimpleAtt(item,this.data.form) ;
    // this.initData(item,this.data.form) ;
    if(this.data.form.resourceStyle === "file"){
      this.data.form.fileStyle = this.data.form.dbStyle ;
      this.data.form.dbStyle = "" ;
      this.data.form.foldPath = this.data.form.dataInstance ;
      this.data.form.dataInstance = "" ;
    }
  }

  /**
   * 生成创建表单数据
   */
  getCreateParams(){
    let _send = NormalUtils.copyObjectAtt(this.data.form,{},true );
    if(_send.resourceStyle === "file"){
      _send.dbStyle = _send.fileStyle ;
      _send.hostPort = "" ;
      _send.dataInstance = _send.foldPath ;
    }
    delete _send.fileStyle ;
    delete _send.foldPath ;
    delete _send.orgName ;

    //不需要包含其他的属性
    return _send;
  }

  /**
   * 测试联通行
   */
  testConnection(){
    this.query(this.getCreateParams(), (result)=>{
      if(result.result && result.result === "success")
        this.popMessage("连接成功!");
      else
        this.popMessage("连接失败!");
    },null, DataStorageAPI.testConnection) ;
  }

  /**
   * 生成更新表单数据
   */
  getUpdateParams(){
    return this.getCreateParams();
  }

  /*跳转到资源标引*/
  changeToSourceLink(item){
    NormalUtils.changeRouter(PathConst.DI_ASSETSIMPORT,{id:item.id,name:item.dataSourceName ,path:PathConst.DI_CONFIGMGER}) ;
  }


  /**
   * 更新表结构
   * @param item
   */
  refreshTable(item){
    this.isLoading = true ;
    DataStorageAPI.refreshTableSource({id:item.id}).then(
      ()=>{
        this.isLoading = false ;
        this.popMessage("更新成功！") ;
      },
      ()=>{
        this.isLoading = false ;
      }
    ) ;
  }

  clear(){
    super.clear() ;
    this.initFormData() ;//重新初始化数据
  }

  /**
   * 测试数据
   */
  testHandler(){
    return NormalUtils.createTestData({
      orgId:"",
      id:"dfdfdfdfd",
      dataResourceName:"dfd",
      dataSourceName:"dfdfd",
      org:{orgName:"dfd"},
      dbStyle:"mysql",
      shareWay:"",
      gatheringWay:"",//汇聚方式
      theme:"", //汇聚主题
      updateTime:"",//更新时间
      sensitiveLevel:"",//敏感等级
      dataInstance:"zyzx",
      hostAddress:"dfdfdfd"
    },10) ;
  }
}
