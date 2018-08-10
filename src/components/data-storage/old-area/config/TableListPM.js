//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import NormalUtils from "@/common/utils/NormalUtils";
import PathConst from "@/router/PathConst";
import DataStorageAPI from "@/common/service/DataStorageAPI" ;
import PagePm from "@/common/model/PagePm";
import ConstManager from "@/common/manager/ConstManager";
import ShareViewPM from "../../common-comps/ShareViewPM";

export default class TableListPM extends ShareViewPM{

  constructor( ) {
    super(PathConst.DS_OLD_CONFIG_TABLE_LIST);
    this.sourceFlag = 1 ;
    this.dataBaseType = "database" ;//数据库类型

    //分页查询组件
    this.pagePM = new PagePm(DataStorageAPI.queryOriginalConfigList) ;
    //this.pagePM.testHandler = this.testHandler ;

    this.initData({
      sourceTypeList:[],
      sourceFenList:[],
      showManager:false
    });

    //查询表单
    this.initSearchForm() ;

    //temp
    this.initFormData() ;
  }


  /*初始化查询表单*/
  initSearchForm( query=false ) {
    if (!this.data.searchForm)
      this.data.searchForm = {};
    this.initData({
      orgId: "",
      hostAddress: "",
      dbStyle: ""
    }, this.data.searchForm);
    if (query === true)
      this.queryList();
  }

  /**
   * 第一次进入 初始化数据
   */
  initExecute(query,inited){

    //进入视图初始化 异步列表数据
    this.initAnayListData() ;

    //默认查询数据
    this.queryList() ;
  }

  /*查询列表*/
  queryList(){
    this.pagePM.queryList(this.data.searchForm) ;
  }

  /**
   * 初始化异步列表数据
   */
  initAnayListData(){
    ConstManager.initDataDictionary(()=> {
      this.data.sourceTypeList = ConstManager.dbTypeList;
    });
    //temp
    // this.data.sourceFenList = ConstManager.sourceTypeList ;
  }

  /*跳转到资源标引*/
  changeToSourceLink(item){
  }

  /*跳转到表管理*/
  changeToTableView(item){
    this.data.showManager = true ;
    if(item.orgName)
      item.orgName = item.orgName ;
    NormalUtils.changeRouter(PathConst.DS_OLD_CONFIG_TABLE_MGER,{data:item,path:PathConst.DS_OLD_CONFIG_TABLE_LIST}) ;
  }

  changeBackMain(){
    NormalUtils.changeRouter(PathConst.DS_OLD_CONFIG_TABLE_LIST ) ;
  }

  /**
   * 测试联通性
   */
  testLink( item ){

    let _send = {
      id: "",
      resourceStyle: this.dataBaseType,
      sourceFlag:0,
      orgId: "",//来源部门id
      dataSourceName: "",//数据源名称
      dbStyle: "mysql",//数据库类型
      hostAddress: "",//主机地址
      hostPort: 3306,//端口
      dbUsername: "",//用户名
      dbPassword: "",//密码
      dataInstance: ""
    } ;
    NormalUtils.copyObjectAtt(item,_send) ;
    this.query(_send, (result)=>{
      if(result.result && result.result === "success")
        this.popMessage("连接成功!");
      else
        this.popMessage("连接失败!");
    },null, DataStorageAPI.testConnection) ;
  }

  /*------------------------------------------------ temp -----------------------------*/

  /**
   * 初始化 增改表单项
   * @isinit 是否完全重新初始化
   */
  initFormData( isinit = true ){
    this.createMethod = DataStorageAPI.saveConfigData ;
    this.updateMethod = DataStorageAPI.saveConfigData ;

    //文件类型
    this.data.fileTypeList = [
      {label:"FTP Server",value:'ftp'},
      {label:"Http Server",value:'http',disabled:true},
      {label:"HDFS",value:'hdfs',disabled:true},
      {label:"其它(自有协议)",value:'other',disabled:true}
    ];

    //表单元素
    if(!this.data.form)
      this.data.form = {  resourceStyle:this.dataBaseType } ;

    //数据库数据
    this.initData(this.getDbFormData(), this.data.form) ;
  }

  /**
   * 数据库表单
   * @param form
   * @returns {{id: string, resourceStyle: string, sourceFlag: string, orgId: string, dataSourceName: string, dbStyle: string, hostAddress: string, hostPort: number, dbUsername: string, dbPassword: string, dataInstance: string}}
   */
  getDbFormData() {
    return {
      id: "",
      resourceStyle: this.dataBaseType,
      sourceFlag:this.sourceFlag, //标记数据源  0 external 外部数据源 original原始区 handler处理 analysis分析
      orgId: "",//来源部门id
      dataSourceName: "",//数据源名称
      fileStyle:"",//文件服务类型类型
      dbStyle: "",//数据库类型
      hostAddress: "",//主机地址
      hostPort: 3306,//端口
      dbUsername: "",//用户名
      dbPassword: "",//密码
      dataInstance: ""
    };
  }

  /**
   *  弹出创建窗口
   */
  popCreateWin(formValue){
    super.popCreateWin();
    this.initFormData() ;
  }



  /**
   * 生成创建表单数据
   */
  getCreateParams(){
    let _send = NormalUtils.copyObjectAtt(this.data.form,{},true );
    if(_send.resourceStyle === "file"){
      _send.dbStyle = _send.fileStyle ;
      _send.hostPort = "" ;
    }
    delete _send.fileStyle ;

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


  clear(){
    super.clear() ;
    this.initFormData() ;//重新初始化数据
  }
}
