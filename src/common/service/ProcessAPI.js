import ProcessServer from "./server/ProcessServer";
import SPath from "./server/SPath";
import TjServer from "./server/TjServer";
import PlatformAPI from "./PlatformAPI";
import RdjcServer from "./server/RdjcServer";
import PlatformAssetsAPI from "./PlatformAssetsAPI";
/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
class ProcessAPI {
    constructor() {
    }

  /**
   * 保存任务
   */
  static saveTask(params,options=null){
    if(!params.hasOwnProperty("type"))//默认类型为1
      params.type = "1" ;
    return ProcessAPI.server.postData("/task/save", params ) ;
  }
  /**
   * 数据质量管理--保存任务
   */
  static saveQuality(params,options=null){
    /*if(!params.hasOwnProperty("type"))//默认类型为1
      params.type = "1" ;*/
    return ProcessAPI.rdjcServer.postData("/api/dataGovernance/addMTaskInfo", params ) ;
  }


  /**
   * 任务管理 -- 获得源数据
   */
  static queryNamedClusters(params,options=null){
    return ProcessAPI.server.postData("/task/namedClusters",params) ;
  }

  /*
  *获取HBase Table name接口
   */
  static queryNamedHbaseTable(params,options=null){
    return ProcessAPI.server.postData("/task/getMappedTables",params) ;
  }

  /*
  *获取Mapping names接口
   */
  static queryNamedMappings(params,options=null){
    return ProcessAPI.server.postData("/task/getHBaseTableMappings",params) ;
  }

  /*
   *获取Create/Edit mappings下面HBase Table name接口
    */
  static queryNamedGetTable(params,options=null){
    return ProcessAPI.server.postData("/task/getTableNames",params) ;
  }

  /*
   *获取列簇数据
  */

  static queryClusterData(params,options=null){
    return ProcessAPI.server.postData("/task/getHBaseTableFamiles",params) ;
  }

 /*
   *点击第二个表格第二个值的时候调的接口
   */

  static queryNamedHbsaeMapp(params,options=null){
    return ProcessAPI.server.postData("/task/getHBaseMapping",params) ;
  }

  /*
  *保存按钮
   */
  static querySaveHbase(params,options=null){
    return ProcessAPI.server.postData("/task/saveHBaseMapping",params) ;
  }

  /*
  *删除按钮
   */
  static queryDeleteHbase(params,options=null){
    return ProcessAPI.server.postData("/task/deleteHBaseMapping",params) ;
  }

  /*
  *获取原信息按钮
   */
  static queryIncomingFields(params,options=null){
    return ProcessAPI.server.postData("/task/getHBaseMappingMould",params) ;
  }

  /**
   * 查询任务列表
   * @param params
   * @param options
   * @returns {*}
   */
  static queryTaskList(params,options=null){
    if(!params.hasOwnProperty("type"))//默认类型为1
      params.type = "1" ;
    return ProcessAPI.server.postData( "/task/list",params) ;
  }


  /**
   * 删除任务
   * @param params id string
   * @param options
   * @returns {*} task/delete
   */
  static deleteTask(params,options=null){
    return ProcessAPI.server.postData( "/task/delete",{id:params}) ;
  }

  /**
   * 查询任务详情任务
   * @param params
   * @param options
   */
  static queryTaskDetail(params,options=null){
    return ProcessAPI.server.postData( "/task/open",params) ;
  }
  /**
   * 任务 获得源数据
   * @param params
   * @param options
   */
  static queryBeforeColumns(params,options=null){
    return ProcessAPI.server.postData( "/task/metadata",params) ;
  }
  /**
   * 获得HDFS元数据
   */
  static getHdfsFields(params,options=null){
    return ProcessAPI.server.postData( "/task/getHdfsFields",params) ;
  }
  /**
   * 启动任务
   * @param params
   * @param options
   * @returns {*}
   */
  static runTask(params,options=null){
    return ProcessAPI.server.postData( "/task/execute", params) ;
  }


  /**
   * 停止任务
   * @param params
   * @param options
   * @returns {*}
   */
  static stopTask(params,options=null){
    return ProcessAPI.server.postData( "/task/list",params) ;
  }


  /**
   * 查询监控列表
   * @param params
   * @param options
   * @returns {*}
   */
  static queryMoniorDetail(params,options=null){
    return ProcessAPI.server.postData("/task/monitorDetail",params) ;
  }

  /**
   * 查询监控列表--详情窗口
   * @param params
   * @param options
   * @returns {*}
   */
  static queryMoniorLog(params,options=null){
    return ProcessAPI.server.postData("/task/logDetail",params) ;
  }

  /**
   * 查询监控列表
   * @param params
   * @param options
   * @returns {*}
   */
  static queryMoniorList(params,options=null){
    if(!params.hasOwnProperty("type"))//默认类型为1
      params.type = "1" ;
    return ProcessAPI.server.postData("/task/monitorList",params) ;
  }

  static queryMoniorListAll(params,options=null){
    if(!params.hasOwnProperty("flag"))//默认类型为1
      params.flag = "monitor" ;
    return ProcessAPI.server.postData("/task/monitorList",params) ;
  }


  /**
   * 分级查询 资源
   * @param params
   * @param options
   * @returns {*}
   */
  static queryLevelResource(params,options=null){
    if(!params.hasOwnProperty("resourceStyle"))//以前的接口不动 默认查关系数据库
      params.resourceStyle = "dh";
    if(!params.hasOwnProperty("dbStyle"))
      params.dbStyle = "" ;
    return ProcessAPI.serverTj.getData("/dataStorage/resourceListByOrgAndTheme.json",params) ;
  }

  /**
   * 查询表的所有字段
   */
  static queryTableFields(params,options=null){
    return ProcessAPI.serverTj.getData("/dataStorage/dataColumnList-all.json",params,false) ;
  }

  /**
   * 任务监控 -- 处理任务统计(图表) dfd
   */
  static importTaskStaticChu(params,options=null){
    return ProcessAPI.server.postData("/task/countTaskStatus",params) ;
  }

  /*----------------------------------------------质量分析报告--------------------------------------------------*/
  /**
   * 用户排名前三
   */
  static qualityUser(params,options=null){
    return ProcessAPI.rdjcServer.getData("/api/dataGovernance/getdatQualityDeptTopNbyTimeTopN",params) ;
  }
  static qualityQualityUser(params,options=null){
    return ProcessAPI.rdjcServer.getData("/api/dataGovernance/getTaskInfoAnalyzeDeptTopNbyTimeTOP",params) ;
  }

  /*
  *资源排名前三名
   */

  static resourceRank(params,options=null){
    return ProcessAPI.rdjcServer.getData("/api/dataGovernance/getdatQualityComponentTopN",params) ;
  }

  static resourceQualityRank(params,options=null){
    return ProcessAPI.rdjcServer.getData("/api/dataGovernance/getTaskInfoAnalyzeComponentTopNbyTimeTOP",params) ;
  }

  /*
  *质量分析报告列表内容
   */

  static qualityAnalysisReportList(params,options=null){
    return ProcessAPI.rdjcServer.getData("/api/dataGovernance/getdatQualityTaskListPage",params) ;
  }

  static qualityQualityReportList(params,options=null){
    return ProcessAPI.rdjcServer.getData("/api/dataGovernance/getTaskInfoAnalyzePage",params) ;
  }

  /*
  *质量分析报告列表内容查看详情
   */

  static qualityAnalysisReportListSeeDetails(params,options=null){
    return ProcessAPI.rdjcServer.getData("/api/dataGovernance/getdataQualityTaskListDetail",params) ;
  }

  static qualityQualityReportListSeeDetails(params,options=null){
    return ProcessAPI.rdjcServer.getData("/api/dataGovernance/getTaskInfoAnalyzelisttDetail",params) ;
  }

  /*
  *质量分析报告列表内容查看详情 ---去重接口
   */

  static qualityAnalysisReportListGoHeavy(params,options=null){
    return ProcessAPI.rdjcServer.getData("/api/dataGovernance/getQualityInfoList",params) ;
  }

  static qualityQualityReportListGoHeavy(params,options=null){
    return ProcessAPI.rdjcServer.getData("/api/dataGovernance/getTaskInfoAnalyzelistDetailinfo",params) ;
  }



  /*
  *质量分析报告列表内容查看详情---问题个数详情 ---下载按钮接口
   */
  static qualityAnalysisReportListDownLoad(params,options=null){
    return ProcessAPI.rdjcServer.getData("/api/dataGovernance/downLoad",params) ;
  }


  /**
   * 停止任务
   * @param params
   * @param options
   * @returns {*}
   */
  static saveConfig(params,options=null){
    return ProcessAPI.server.postData("/task/setCycle",params) ;
  }

  /*
  * 基础管理 -- 任务配置 ---查看结果
  *
  */
  static taskViewResult(params,options=null){
    return ProcessAPI.server.postData("/task/getTableData",params) ;
  }


  /*
   * 数据质量管理 -- 查询任务列表 --设置周期
   */
  static saveQualityConfig(param,options=null){
    return ProcessAPI.rdjcServer.postData("/api/dataGovernance/addTaskCron?id="+param.id+'&beginTime='+param.beginTime+'&timeUnit='+param.timeUnit,param);
  }

  /*
    * 数据质量管理 -- 查询任务列表 --删除任务
    */
  static deleteQuality(param,options=null){
    return ProcessAPI.rdjcServer.postData("/api/dataGovernance/delTaskInfo?taskId="+param.taskId,param) ;
  }

  static runQuality(param,options=null){
    return ProcessAPI.rdjcServer.postData( "/api/dataGovernance/execute?id="+param.id+'&status='+param.status, param) ;
  }

  /*
  * 数据质量管理 -- 查询任务列表
  */
  static queryQualityList(params,options=null){
    return ProcessAPI.rdjcServer.getData("/api/dataGovernance/getTaskList",params) ;
  }

  /*数据质量管理-任务监控列表*/
  static queryQualityMonitorList(params,options=null){
    return ProcessAPI.rdjcServer.getData("/api/dataGovernance/getTaskResultList",params) ;
  }

  /*数据质量管理-任务监控列表--详情列表*/
  static queryQualityMonitorListDetail(params,options=null){
    return ProcessAPI.rdjcServer.getData("/api/dataGovernance/getTaskResult",params) ;
  }
}
//自己的通信服务
ProcessAPI.serverTj = new TjServer() ;
//服务对象
ProcessAPI.server = new ProcessServer() ;
//服务对象
ProcessAPI.rdjcServer = new RdjcServer();
export default ProcessAPI;
