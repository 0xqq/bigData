//------------------------------------------------------------------
//title:
//author: zc
//date:
//desc:
//------------------------------------------------------------------


import AnalysisServer from "./server/AnalysisServer";
import ProcessAPI from "./ProcessAPI";

class AnalysisAPI {

  constructor( ) {
  }

  /**
   * 数据分析 - 添加、修改分析任务基本信息   dfdfd
   * @param params
   * @param options
   * @returns {*}
   */
  static saveTaskData(params,options=null){
    return AnalysisAPI.server.postData("/analyModelAdd.json",params) ;
  }

  /**
   * 数据分析 -  查询任务列表
   * @param params
   * @param options
   * @returns {*}
   */
  static queryTaskList(params,options=null){
    return AnalysisAPI.server.postData("/analyModelList.json",params) ;
  }

  static queryTaskListLianDong(params,options=null){
    return AnalysisAPI.server.postData("/analyModelListWithOutUser.json",params) ;
  }

  /**
   * 数据分析 -  删除任务列表
   * @param params
   * @param options
   * @returns {*}
   */
  static deleteTask(params,options=null){
    return AnalysisAPI.server.postData("/analyModelDelete.json",{id:params}) ;
  }

  /**
   * 数据分析 -  6.1	保存任务模型详细信息
   * @param params
   * @param options
   * @returns {*}
   */
  static saveTaskModelData(params,options=null){
    return AnalysisAPI.server.postData("/analyModelUpdate",params) ;
  }

  /**
   * 数据分析 -  6.1	查询任务详细信息
   * @param params
   * @param options
   * @returns {*}
   */
  static queryModelDetail(params,options=null){
    return AnalysisAPI.server.postData("/analyModelById.json",params) ;
  }

  /**
   * 数据分析 -  	试运行任务
   * @param params
   * @param options
   * @returns {*}
   */
  static pilotRunTask(params,options=null){
    return AnalysisAPI.server.postData("/analyModelStart.json",params) ;
  }

  /**
   * 数据分析 -  	查看结果
   * @param params
   * @param options
   * @returns {*}
   */
  static viewResult(params,options=null){
    return AnalysisAPI.server.postData("/querySparkResult.json",params) ;
  }

  /**
   * 数据分析 -  	发布----弹出--保存按钮(保存模型)
   * @param params
   * @param options
   * @returns {*}
   */
  static publishTaskModel(params,options=null){      //发布按钮
    return AnalysisAPI.server.postData("/analyModelPublisSyncUpdate.json",params) ;
  }

  static stopPublishTaskModel(params,options=null){   //终止按钮
    return AnalysisAPI.server.postData("/analyModelStopSync.json",params) ;
  }

  static publishModelId(params,options=null){
    return AnalysisAPI.server.postData("/analyModelPublisByModelId.json",params) ;
  }

  /**
   * 数据分析 -  配置分析任务周期
   * @param params
   * @param options
   * @returns {*}
   */
  static configTaskRules(params,options=null){
    return AnalysisAPI.server.postData("/dataAnalysis/",params) ;
  }


  /**
   * 数据分析 -  启动、停止分析任务
   * @param params
   * @param options
   * @returns {*}
   */
  static runOrStopTask(params,options=null){
    return AnalysisAPI.server.postData("/dataAnalysis/",params) ;
  }

  /**
   * 数据分析 -  查询算子分组列表
   * @param params
   * @param options
   * @returns {*}
   */
  static queryOperatorGroup(params,options=null){
    return AnalysisAPI.server.postData("/analyAlgorithmClassifyList.json",params) ;
  }

  /**
   *
   * @param params
   * @param options
   * @returns {*}
   */
  static queryOperatorGroupLevel2(params,options=null){
    return AnalysisAPI.server.postData("/analyAlgorithmTypeList.json",params) ;
  }
  /**
   * 数据分析 -  查询分析算子列表
   * @param params
   * @param options
   * @returns {*}
   */
  static queryOperatorList(params,options=null){
    return AnalysisAPI.server.postData("/analyAlgorithmList.json",params) ;
  }

  /**
   * 查询算子属性--支持多个
   */
  static queryOperatorProps(params,options=null){
    return AnalysisAPI.server.postData("/analyAlgorithmParamList.json",params) ;
  }

  /**
   * 数据分析 -  查询任务监控列表
   * @param params
   * @param options
   * @returns {*}
   */
  static queryMonitorList(params,options=null){
    return AnalysisAPI.server.postData("/analyModelMonitor.json",params) ;
  }

  /**
   * 数据分析 - (任务监控) ----(查看详情)
   * @param params
   * @param options
   * @returns {*}
   */
  static queryMonitorDetail(params,options=null){
    return AnalysisAPI.server.postData("/analyModelPublishStatusList.json",params) ;
  }

  /**
   * 数据分析 - (任务监控)----(查看详情)----(查看日志)
   * @param params
   * @param options
   * @returns {*}
   */
  static queryMonitorLogg(params,options=null){
    return AnalysisAPI.server.postData("/analyModelPublishStatusLog.json",params) ;
  }

  /**
   * 数据分析 - (数据分析)----(数据挖掘)----(模型任务管理)----(查看日志)
   * @param params
   * @param options
   * @returns {*}
   */
  static modelTaskOrg(params,options=null){
    return AnalysisAPI.server.postData("/analyModelLog.json",params) ;
  }


  /**
   * 数据分析 -  查看任务详情日志
   * @param params
   * @param options
   * @returns {*}
   */
  static queryMonitorLog(params,options=null){
    return AnalysisAPI.server.getData("/dataAnalysis/",params) ;
  }

  /**
   * 任务监控 -- 分析任务统计(图表) dfd
   */
  static importTaskStaticAny(params,options=null){
    return AnalysisAPI.server.postData("/analyModelStatistics.json",params) ;
  }



}

AnalysisAPI.server = new AnalysisServer() ;
export default AnalysisAPI ;
