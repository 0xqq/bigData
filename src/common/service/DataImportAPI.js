//------------------------------------------------------------------
//title: 数据接入接口
//author: zc
//date:
//desc:
//------------------------------------------------------------------

import TjServer from "./server/TjServer";

class DataImportAPI {

  constructor( ) {
  }

  /**
   * 接入查询接口
   * @param params
   * @param options
   * @returns {*}
   */
  static queryImportList(params,options=null){
    return DataImportAPI.server.getData("/dataSync/syncJobList/database.json",params) ;
  }

  /**
   * 接入查询接口 ---- 文件
   * @param params
   * @param options
   * @returns {*}
   */
  static queryImportFileList(params,options=null){
    return DataImportAPI.server.getData("/dataSync/syncJobList/file.json",params) ;
  }

  /**
   * 接入修改添加保存
   * @param params
   * @param options
   * @returns {*}
   */
  static saveImportData(params,options=null){
    return DataImportAPI.server.postData("/dataSync/syncJobSave/database.json",params) ;
  }

  /**
   * 接入 配置 保存
   * @param params
   * @param options
   * @returns {*}
   */
  static saveConfig(params,options=null){
    return DataImportAPI.server.postData("/dataSync/syncJobSetCycle.json",params) ;
  }

  /**
   * 配置 - 获取自增字段
   * @param params
   * @param options
   * @returns {*}
   */
  static getJobAutoFields(params,options=null){
    return DataImportAPI.server.getData("/dataStorage/autoIncreColumnList.json",params) ;
  }

  /**
   * 接入删除
   * @param params
   * @param options
   * @returns {*}
   */
  static deleteImport(params,options=null){
    return DataImportAPI.server.postData("/dataSync/syncJobDelete.json",params) ;
  }

  /**
   * 接入 添加 默认查询 数据库
   * @param params
   * @param options
   * @returns {*}
   */
  static syncJobAdd(params,options=null){
    return DataImportAPI.server.getData("/dataSync/syncJobAdd/database.json",params) ;
  }

  /**
   * 与编辑
   * @param params
   * @param options
   * @returns {*}
   */
  static syncJobEdit(params,options=null){
    return DataImportAPI.server.getData("/dataSync/syncJobEdit/database.json",params) ;
  }

  /**
   * 监控列表查询
   * @param params
   * @param options
   * @returns {*}http://10.0.36.100:8070/dataSync/syncStateList.json
   */
  static queryJobMonitor(params,options=null){
    return DataImportAPI.server.getData("/dataSync/syncJobList/jobMonitor.json",params) ;
  }

  /**
   * 启动
   * @param params
   * @param options
   * @returns {*}
   */
  static startJob(params,options=null){
    return DataImportAPI.server.postData("/dataSync/syncJobStart.json",params,false) ;
  }

  /**
   * 停止
   * @param params
   * @param options
   * @returns {*}
   */
  static stopJob(params,options=null){
    return DataImportAPI.server.postData("/dataSync/syncJobStop.json",params,false) ;
  }

  /**
   * 文件接入任务 保存接口
   * @param params
   * @param options
   * @returns {*}
   */
  static saveImportFileData(params,options=null){
    return DataImportAPI.server.postData("/dataSync/syncJobSave/file.json",params) ;
  }

  /**
   * 文件接入查询详情
   * @param params
   * @param options
   * @returns {*}
   */
  static queryFileImportDetail(params,options=null){
    return DataImportAPI.server.getData("/dataSync/syncJobEdit/file.json",params) ;
  }


  /**
   * 文件接入 查询原始区 数据源 --- 后期需要单写个窗口
   * @param params
   * @param options
   * @returns {*}
   */
  static queryFileOriginalList(params,options=null){
    return DataImportAPI.server.getData("/dataSync/syncJobAdd/file.json",params) ;
  }

  /*------------------------------------------------------- file ----------------------------------------*/
  /**
   * 文件目录浏览接口
   * @param params
   * @param options
   * @returns {*}
   */
  static queryFoldList(params,options=null){
    return DataImportAPI.server.postData("/dataStorage/getDirDesc.json",params) ;
  }

  /**
   * 查询文件系统目录
   * @param params
   * @param options
   * @returns {*}
   */
  static querySysFileList(params,options=null){
    return DataImportAPI.server.getData("/dataStorage/manageSonDir.json",params) ;
  }

  /*------------------------------------------------ 监控 ---------------------------------*/
  /**
   * 查看接入任务详情
   * @param params
   * @param options
   * @returns {*}
   */
  static queryTaskMoniorDetail(params,options=null){
    return DataImportAPI.server.getData("/dataSync/syncStateList/rootState.json",params) ;
  }

  /**
   * 查看接入任务详情-历史日志
   * @param params
   * @param options
   * @returns {*}
   */
  static queryTaskHistory(params,options=null){
    return DataImportAPI.server.getData("/dataSync/syncStateList/sonState.json",params) ;
  }
}

DataImportAPI.server = new TjServer() ;
export default DataImportAPI ;
