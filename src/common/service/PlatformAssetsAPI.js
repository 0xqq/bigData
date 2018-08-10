import RdjcServer from "./server/RdjcServer";
import SPath from "./server/SPath";

/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
class PlatformAssetsAPI {

    constructor() { }



  /**
   * 查询集群列表
   */
  static queryCluster(param, options=null){
    return PlatformAssetsAPI.server.getData("/api/management/asset/getClusterList" ,param) ;
  }

  /**
   * 添加资产
   */
  static addAssets(param, options=null){
    return PlatformAssetsAPI.server.postData("/api/management/asset/registerSoft" ,param) ;
  }

  /**
   * 删除资产
   */
  static deleteAssets(param, options=null){
    return PlatformAssetsAPI.server.postData("/api/management/asset/registerSoft" ,param) ;
  }

  /**
   * 编辑资产
   */
  static editAssets(param, options=null){
    return PlatformAssetsAPI.server.postData("/api/management/asset/deleteAssets" ,param) ;
  }

  /**
   * 查询资产列表
   */
  static queryAssets(param, options=null){
    return PlatformAssetsAPI.server.getData("/api/management/asset/getSoftList" ,param) ;
  }

  /**
   * 检查名称是否唯一
   */
  static checkAssetsName(param, options=null){
    return PlatformAssetsAPI.server.getData("/api/management/asset/checkSoftName" ,param) ;
  }

  /**
   * 查询IP及对应的端口
   */
  static queryIpPortName(param, options=null){
    return PlatformAssetsAPI.server.getData("/api/management/asset/getSingleInfoList" ,param) ;
  }

  static queryIpPortNameJiQun(param, options=null){
    return PlatformAssetsAPI.server.getData("/api/management/asset/getClusterList" ,param) ;
  }


  /**
   * 验证平台有效性
   */
  static checkIpPortName(param, options=null){
    return PlatformAssetsAPI.server.getData("/api/management/asset/checkSupportRegisterSoft" ,param) ;
  }

  /**
   * 查询码表
   */
  static queryDicnation(param, options=null){
    return PlatformAssetsAPI.server.getData("/api/management/asset/getDicTypeInfo" ,param) ;
  }

/*-------------------------------------------------- 软件分配 ---------------------------------------------*/

  /**
   * 分配软件
   */
  static addAssignAssets(param, options=null){
    return PlatformAssetsAPI.server.postData("/api/management/asset/saveTenantResouceJoin" ,param) ;
  }

  /**
   * 删除 分配
   */
  static deleteAssignAssets(param, options=null){
    return PlatformAssetsAPI.server.postData("/" ,param) ;
  }

  /**
   * 编辑 分配
   */
  static editAssignAssets(param, options=null){
    return PlatformAssetsAPI.server.postData("/" ,param) ;
  }

  /**
   * 编辑 校验名称是否存在
   */
  static editAssignAssets(param, options=null){
    return PlatformAssetsAPI.server.postData("/checkResourceByMyql" ,param) ;
  }

  /**
   * 校验资源名称是否存在
   */
  static querySourceAssets(param, options=null){
    return PlatformAssetsAPI.server.getData("/api/management/asset/checkResource" ,param) ;
  }

  /**
   * 查询分配列表
   */
  static queryAssignAssets(param, options=null){
    return PlatformAssetsAPI.server.getData("/api/management/asset/getRsJoinTenantList" ,param) ;
  }

/*------------------------------------------平台资产监控    原始区--------------------------------------*/
  /**
   * IP--查询分配列表
   */
  static queryClusterIP(param, options=null){
    return PlatformAssetsAPI.server.getData("/api/monitor/asset/rawRegion/getPlatformSourceByIP" ,param) ;
  }

  /**
   * IP--查看详情
   */
  static queryClusterIPdetail(param, options=null){
    return PlatformAssetsAPI.server.getData("/api/monitor/asset/rawRegion/getPlatformSourceByIPdetail" ,param) ;
  }

  /**
   * 软件---查询分配列表
   */
  static queryClusterSoft(param, options=null){
    return PlatformAssetsAPI.server.getData("/api/monitor/asset/rawRegion/getPlatformSourceBySoft" ,param) ;
  }

  /**
   * 部门---查询分配列表
   */
  static queryClusterOrg(param, options=null){
    return PlatformAssetsAPI.server.getData("/api/monitor/asset/rawRegion/getPlatformSourceByOrg" ,param) ;
  }

  /**
   * 部门--查看详情
   */
  static queryClusterOrgdetail(param, options=null){
    return PlatformAssetsAPI.server.getData("/api/monitor/asset/rawRegion/getPlatformSourceByOrgdetail" ,param) ;
  }


}

/**
 * 人大金仓服务
 */
PlatformAssetsAPI.server = new RdjcServer() ;
export default PlatformAssetsAPI ;
