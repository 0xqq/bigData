//------------------------------------------------------------------
//title:
//author: zc
//date:
//desc:
//------------------------------------------------------------------


import TjServer from "./server/TjServer";
import SPath from "./server/SPath";
import ServerBase from "./server/ServerBase";

class DataStorageAPI {

  constructor( ) {
  }

  /**
   * 统计接口
   */
  static getStatisticsData( params,option = null ) {
    return DataStorageAPI.server.getData("/dataStorage.json");
  }

  /**
   * 外部数据源添加\编辑接口 配置信息
   */
  static saveConfigData( params,options=null ){
     return DataStorageAPI.server.postData("/dataStorage/dataSourceSave.json", params);
  }

  /**
   * 测试数据连通性
   * @param params page:1 pageSize:int//当前页显示条数，int能接受的较大值
   * @returns {*}
   */
  static testConnection(params,options=null){
    return DataStorageAPI.server.postData("/dataStorage/testConnection.json", params );
  }

  /**
   * 删除配置
   * @param params
   * @param options
   * @returns {*}
   */
  static deleteConfig(params,options=null){
    return DataStorageAPI.server.postData("/dataStorage/dataSourceDelete.json",params) ;
  }

  /**
   * 查询配置列表 -- 外部数据源
   * @param params
   * @param options
   * @returns {*}
   */
  static queryConfigList(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/dataSourceList/external.json",params) ;
  }

  /**
   * 查询配置列表 -- 原始区数据源
   * @param params
   * @param options
   * @returns {*}
   */
  static queryOriginalConfigList(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/dataSourceList/database/original.json",params) ;
  }

  /**
   * 查询配置列表 -- 处理区数据源
   * @param params
   * @param options
   * @returns {*}
   */
  static queryHandlerConfigList(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/dataSourceList/handler.json",params) ;
  }

  /**
   * 查询配置列表 -- 分析区数据源
   * @param params
   * @param options
   * @returns {*}
   */
  static queryAnalysisConfigList(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/dataSourceList/analysis.json",params) ;
  }

  /**
   * 资源标引查询接口 -- 外部数据源
   * @param params
   * @param options
   * @returns {*}
   */
  static queryExternalMarkerList(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/dataResourceList/external.json",params) ;
  }

  /**
   * 资源标引查询接口 --- 原始区数据源
   * @param params
   * @param options
   * @returns {*}
   */
  static queryOriginalMarkerList(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/dataResourceList/original.json",params) ;
  }

  /**
   * 资源标引查询接口 --- 保存编码
   * @param params
   * @param options
   * @returns {*}
   */
  static saveCodeData(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/saveResourceCode.json",params) ;
  }

  /**
   * 资源标引查询接口 --- 查询编码
   * @param params
   * @param options
   * @returns {*}
   */
  static queryCodeData(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/editResourceCode.json",params) ;
  }
  /**
   * 保存表注释
   * @param params
   * @param options
   * @returns {*}
   */
  static saveTableMarker(params,options=null){
    return DataStorageAPI.server.postData("/dataStorage/dataColumn-save.json",params) ;
  }

  /**
   * 保存表资源标引信息 -- 外部数据源
   * @param params
   * @param options
   * @returns {*}
   */
  static saveOutSourceMarker(params,options=null){
    return DataStorageAPI.server.postData("/dataStorage/dataResourceSave/external.json",params) ;
  }

  /**
   * 保存表资源标引信息 -- 原始区
   * @param params
   * @param options
   * @returns {*}
   */
  static saveOldSourceMarker(params,options=null){
    return DataStorageAPI.server.postData("/dataStorage/dataResourceSave/original.json",params) ;
  }

  /**
   * 保存表资源标引信息 -- 处理区
   * @param params
   * @param options
   * @returns {*}
   */
  static saveHandlerSourceMarker(params,options=null){
    return DataStorageAPI.server.postData("/dataStorage/dataResourceSave/handler.json",params) ;
  }

  /**
   * 资源标引查询接口 --- 处理区数据源
   * @param params
   * @param options
   * @returns {*}http://10.0.36.100:8070/dataStorage/dataResourceList/handle.json
   */
  static queryHandlerMarkerList(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/dataResourceList/handler.json",params) ;
  }

  /**
   * 资源标引查询接口 --- 分析区数据源
   * @param params
   * @param options
   * @returns {*}
   */
  static queryAnalysisMarkerList(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/dataResourceList/analysis.json",params) ;
  }

  /**
   * 查询数据源数据库列表
   * @param params
   * @param options
   * @returns {*}
   */
  static querySourceDbList(params,options=null){
    return DataStorageAPI.server.postData("/dataStorage/allSourceList.json",params,false) ;
  }

  /**
   * 查询表列表
   * @param params
   * @param options
   * @returns {*}
   */
  static querySourceTableList(params,options=null){
    return DataStorageAPI.server.postData("/dataStorage/allResourceList.json",params,false) ;
  }

  /**
   * 查询表的所有字段
   */
  static queryTableFields(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/dataColumnList-all.json",params,false) ;
  }

  static queryTableFieldsNew(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/getAutoIncreColumns.json",params,false) ;
  }

  /**
   * 保存表信息
   */
  static saveTableInfo(params,options=null){
    return DataStorageAPI.server.postData("/dataStorage/tableManageSave.json",params) ;
  }

  /**
   * 删除数据表
   */
  static deleteTable(params,options=null){
    return DataStorageAPI.server.postData("/dataStorage/dataResourceDelete.json",params,false) ;
  }

  /**
   * 查询码表数据
   * @param params
   * @param options
   * @returns {*}
   */
  static dataDictionary(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/dataDictionary.json",params,false) ;
  }


  /**
   * 分级查询 资源
   * @param params
   * @param options
   * @returns {*}
   */
  //resourceStyle:/资源类型：databse（关系型数据库）、nosql(非关系型数据库)、file(文件类型)、db(关系型+非关系型)
  static queryLevelResource(params,options=null){
    if(!params.hasOwnProperty("resourceStyle")) //以前的接口不动 默认查关系数据库database
      params.resourceStyle = "dh";
    if(!params.hasOwnProperty("dbStyle"))
      params.dbStyle = "" ;
    return DataStorageAPI.server.getData("/dataStorage/resourceListByOrgAndTheme.json",params) ;
  }

  static queryLevelResourceDbFile(params,options=null){
    if(!params.hasOwnProperty("resourceStyle")) //以前的接口不动 查找dbFile！
      params.resourceStyle = "dbFile";
    if(!params.hasOwnProperty("dbStyle"))
      params.dbStyle = "" ;
    return DataStorageAPI.server.getData("/dataStorage/resourceListByOrgAndTheme.json",params) ;
  }

  static queryLevelResourceFile(params,options=null){
    if(!params.hasOwnProperty("resourceStyle")) //以前的接口不动 查找file！
      params.resourceStyle = "file";
    if(!params.hasOwnProperty("dbStyle"))
      params.dbStyle = "" ;
    return DataStorageAPI.server.getData("/dataStorage/resourceListByOrgAndTheme.json",params) ;
  }

  static queryLevelResourceDataBase(params,options=null){
    if(!params.hasOwnProperty("resourceStyle")) //以前的接口不动 查找file！
      params.resourceStyle = "database";
    if(!params.hasOwnProperty("dbStyle"))
      params.dbStyle = "" ;
    return DataStorageAPI.server.getData("/dataStorage/resourceListByOrgAndTheme.json",params) ;
  }

  /**
   * 更新表结构
   * @param params
   * @param options
   * @returns {*}
   */
  static refreshTableSource(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/freshSource.json",params,false) ;
  }

  /**
   * 查询 目录 资源列表
   * @param params
   * @param options
   * @returns {*}
   */
  static queryDirResourceList(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/dataSourceList/file/original.json",params) ;
  }

  /**
   * 查询 目录 资源列表 --- 处理区
   * @param params
   * @param options
   * @returns {*}
   */
  static queryHandlerDirList(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/dataSourceList/file/handler.json",params) ;
  }

  /**
   * 查询 目录 资源列表 --- 分析区
   * @param params
   * @param options
   * @returns {*}
   */
  static queryAnalysisDirList(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/dataSourceList/file/analysis.json",params) ;
  }

  /**
   * 查询目录结构
   * @param params
   * @param options
   * @returns {*}
   */
  static queryResourceDirs(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/manageSonDir.json",params) ;
  }

  //数据分析 -编辑 - 路径选择按钮 - 只能选择文件（不能选择文件夹）
  static queryResourceDirsData(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/manageSonDirNeedFile.json",params) ;
  }


  /**
   * 添加子目录
   * @param params
   * @param options
   * @returns {*}
   */
  static addSubDir(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/makeDir.json",params) ;
  }

  /**
   * 打标签--查询资源已经打的标签
   * @param params
   * @param options
   * @returns {*}http://10.0.40.28:8090/tagTree//getAllTagList GET
   */
  static querySourceTag(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/resourceLabelEdit.json",params) ;
  }

  /**
   * 打标签--保存
   * @param params
   * @param options
   * @returns {*}
   */
  static saveTagOfSource(params,options=null){
    return DataStorageAPI.server.postData("/dataStorage/resourceLabelSave.json",params) ;
  }

  /**
   * 授权--保存
   * @param params
   * @param options
   * @returns {*}
   */
  static saveAuthorOfSource(params,options=null){
    return DataStorageAPI.server.postData("/dataStorage/resourceTenementSave.json",params) ;
  }


  /**
   * 授权--查询资源已经收的券
   * @param params
   * @param options
   * @returns {*}
   */
  static queryAuthorOfSource(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/resourceTenementEdit.json",params) ;
  }

  /*----------------------------------------------------------- dataSource ---------------------------------------*/
  /**
   * 数据下载 --- 查询
   * @param params
   * @param options
   * @returns {*}http://10.0.40.28:8090/tagTree//getAllTagList GET
   */
  static queryTableAllData(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/queryDataOfTable.json",params) ;
  }
  /**
   * 数据下载 --- 接口信息
   * @param params
   * @param options
   * @returns {*}http://10.0.40.28:8090/tagTree//getAllTagList GET
   */
  static queryTableInterface(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/findDataTabInterface.json",params) ;
  }
  /**
   * 数据下载 --- 交换信息
   * @param params
   * @param options
   * @returns {*}http://10.0.40.28:8090/tagTree//getAllTagList GET
   */
  static queryTableExchange(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/resourceExchangeInfoEdit.json",params) ;
  }
  /**
   * 数据下载 --- 交换信息 保存
   * @param params
   * @param options
   * @returns {*}http://10.0.40.28:8090/tagTree//getAllTagList GET
   */
  static saveTableExchange(params,options=null){
    return DataStorageAPI.server.postData("/dataStorage/findExchangeMsgSave.json",params) ;
  }

  /**
   * 分层查询 机构树
   * @param params
   * @param options
   */
  static queryOrgListLevel(params,options=null){
    return DataStorageAPI.server.getData("/orgListByParent.json",params) ;
  }

  /**
   * 分层查询 机构列表 所有的机构
   * @param params
   * @param options
   */
  static queryOrgList(params,options=null){
    return DataStorageAPI.server.getData("/orgList.json",params) ;
  }

  /**
   * 文件浏览 --- 这种调用稍微有点奇葩 多两层转换 打开窗口还不方便
   * @param params
   * @param options
   */
  static browseFileHtml(params,options=null){
    return DataStorageAPI.server.getData("/dataStorage/fileBrowse.json",params,false) ;
  }

  /**
   * 下载数据表数据
   * @param params
   * @param options
   */
  static tableDataExport(params,options=null){
    window.open(SPath.getDataStorageUrl()+"/dataStorage/dataExport.json?id="+params.id);
  }

  /**
   * 下载 文件 数据
   * @param params
   * @param options
   */
  static fileDataExport(params,options=null){
    window.open(SPath.getDataStorageUrl()+"/dataStorage/fileDownLoad.json?id="+params.id);
  }

  /**
   * 即席sql 查询
   * @param params
   * @param options
   */
  static queryTableDataSql(params,options=null){
    return DataStorageAPI.server.postData("/dataStorage/queryBySql.json",params) ;
  }
}

DataStorageAPI.server = new TjServer() ;
export default DataStorageAPI ;
