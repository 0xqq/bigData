import RdjcServer from "./server/RdjcServer";
import SPath from "./server/SPath";

/**
 * 公用接口API
 * @Author: zc
 * @Modifications:
 * @See:
 */
class PlatformAPI {
  constructor() {}

   /**
   * 查询集群名称monitor/api
   * @param params
   * @param options
   * @returns {*}
   */
  static getClusterName(params,options=null){
    return PlatformAPI.server.getData("/api/clusters",null,false) ;
  }

  /**
   * 获得节点数
   * @cluster 集群名称
   * @returns {*}
   */
  static getNodeNum(param,options=null){
    return PlatformAPI.server.getData("/api/clusters/"+param.cluster,{fields:"total_hosts"},false) ;
  }

  /**
   * 获得节点名列表
   * @cluster 集群名称
   * @returns {*}
   */
  static getNodeHosts(param,options=null){
    return PlatformAPI.server.getData("/api/clusters/"+param.cluster+"/hosts",null,false) ;
  }


  /**
   * 获得服务数
   * @cluster 集群名称
   * @returns {*}
   */
  static getServiceNum(param,options=null){
    return PlatformAPI.server.getData("/api/clusters/"+param.cluster ,{fields:"total_services"},false) ;
  }

  /**
   * 获得服务数 列表
   * @cluster 集群名称
   * @returns {*}
   */
  static getServiceList(param,options=null){
    return PlatformAPI.server.getData("/api/clusters/"+param.cluster+"/services/" ,{fields:"total_services"},false) ;
  }

  /**
   * 统计集群 cpu network memory
   * @param name:集群名称,
   * @parsm type 统计类型 cpu network memory
   * @parsm param 参数 start=<start_time>&end=<end_time>
   * @param options
   */
  static getClusterInfo(param,options=null){
    return PlatformAPI.server.getData("/api/clusters/"+param.cluster+"/monitoring/"+param.type ,param.param,false) ;
  }

  /**
   * 统计节点 cpu network
   * @param name:集群名称,
   * @param host:节点名称,
   * @parsm type 统计类型 cpu network
   * @parsm param 参数 start=<start_time>&end=<end_time>
   * @param options
   */
  static getNodeInfo( param,options=null){
    return PlatformAPI.server.getData("/api/clusters/"+param.cluster+"/hosts/"+param.host+"/monitoring/"+param.type ,param.param,false) ;
  }

  /**
   * 统计 HDFS 节点 状态
   * @param options name集群名称
   * @return
   * "cluster_name" : "<cluster_name>",
   * "service_name" : "HDFS",
   * "component_name" : "DATANODE",
   * "metrics" : {
   *            "started_count" : 4,运行的节点数
   *            “total_count” : 4 总数
   *             }
   */
  static getHdfsDataState(param,options=null){
    return PlatformAPI.server.getData("/api/clusters/"+param.cluster+"/services/HDFS/components/DATANODE/monitoring/node_counts" ,param.param,false) ;
  }

  /**
   * 统计 HDFS 节点 磁盘信息 返回所有节点
   * @param options name集群名称
   * @return
   */
  static getHdfsDataDisk(param,options=null){
    return PlatformAPI.server.getData("/api/clusters/"+param.cluster+"/services/HDFS/components/DATANODE/monitoring/disk" ,param.param,false) ;
  }

  /**
   * 统计 hdfs NAMENODE 当前 磁盘信息
   * @param options name集群名称
   * @return
   *  "cluster_name" : "<cluster_name>",
       "service_name" : "HDFS",
       "component_name" : "NAMENODE",
       "metrics" : {
        "hdfs_free" : 724.0,
        “hdfs_used” : 51.0
        “other_used” : 21.3
        }
   */
  static getHdfsNameDisk(param,options=null){
    return PlatformAPI.server.getData("/api/clusters/"+param.cluster+"/services/HDFS/components/NAMENODE/monitoring/disk" ,null,false) ;
  }

  /**
   * 统计yarn内存  MB
   * @param cluster 集群名称
   */
  static getYarnMemory(param,options=null){
    return PlatformAPI.server.getData("/api/clusters/"+param.cluster+"/services/YARN/components/RESOURCEMANAGER/monitoring/memory" ,null,false) ;
  }

  /**
   * 统计hive 各节点状态
   * @param param {} http://host:port/api/clusters/<cluster_name>/services/HIVE
   */
  static getHiveState(param,options=null){
    return PlatformAPI.server.getData("/api/clusters/"+param.cluster+"/services/HIVE/monitoring/nodes" ,null,false) ;
  }

  /**
   * 统计HBase
   * @parsm cluster 集群名称
   * @param type 统计类型  cpu network disk
   * @param {start,end}
   */
  static getHBaseInfo(param, options=null){
    return PlatformAPI.server.getData("/api/clusters/"+param.cluster+"/services/HBASE/components/REGIONSERVER/monitoring/"+param.type ,param.param,false) ;
  }

  /**
   * 统计HBase
   * @parsm cluster 集群名称
   * @param type 统计类型  cpu network disk
   * @param {start,end}
   */
  static getDataSourceWeight(param, options=null){
    return PlatformAPI.server.getData("/api/monitor/dataResource/rawRegion/getDataSourceWeight" ,param,false) ;
  }


  /*--------------------------------------------------- 租户 -------------------------------------------*/
  /**
   * 查询租户列表
   */
  static queryTenantList(param, options=null){
    return PlatformAPI.server.getData("/api/tenant/getTenantInfo" ,param) ;
  }

  /**
   * 验证用户是否已经存在
   */
  static checkTenant(param, options=null){
    return PlatformAPI.server.getData("/api/tenant/checkDuplicateTenant" ,param) ;
  }

  /**
   * 保存租户信息
   */
  static saveTenant(param, options=null){
    return PlatformAPI.server.postData("/api/tenant/saveTenantInfo" ,param) ;
  }

  /**
   * 保存租户信息
   */
  static editTenant(param, options=null){
    return PlatformAPI.server.postData("/api/tenant/mergeTenantInfo" ,param) ;
  }

  /**
   * 删除租户
   */
  static deleteTenant(param, options=null){
    return PlatformAPI.server.postData("/api/tenant/deleteTenantInfo" ,param) ;
  }

  /**
   * 查询租户权限列表 格式一样 当一个写
   */
  static queryTenantAuthor(param, options=null){
    let _type = "showhdfsinfo" ;
    if(param.type === "hive")
      _type = "showhivedbinfo";
    else if(param.type === "hbase")
      _type = "showhbaseinfo" ;
    delete param.type ;
    return PlatformAPI.server.getData("/api/tenant/"+_type ,param) ;
  }

  /**
   * 保存租户授权
   * @param param
   * @param options
   * @returns {*}
   */
  static saveAuthorData(param, options=null){
    let type = "granthdfs" ;
    if(param.type==="hbase")
        type = "granthbase" ;
    else if(param.type==="hive")
      type = "granthivedb" ;
    return PlatformAPI.server.postData("/api/tenant/"+type ,param.param) ;
  }

  /**
   * 编辑权限集合
   * @param param
   * @param options
   * @returns {*}
   */
  static editAuthorData(param, options=null){
    let type = "mergehdfs" ;
    if(param.type==="hbase")
      type = "mergehbase" ;
    else if(param.type==="hive")
      type = "mergehivedb" ;
    return PlatformAPI.server.postData("/api/tenant/"+type ,param.param) ;
  }

  /**
   * 删除租户授权
   */
  static delteTenantAuthor(param, options=null){
    let type = "revokehdfs"
    if(param.type === "hbase")
      type = "revokehbase" ;
    else if(param.type === "hive")
      type = "revokehivedb" ;
    return PlatformAPI.server.postData("/api/tenant/"+type,param.param) ;
  }


  /**
   * 模糊匹配 hdfs 路径
   */
  static queryHdfsPath(param, options=null){
    return PlatformAPI.server.postData("/api/tenant/gethdfsresouce" ,param,false) ;
  }

  /**
   * 模糊匹配 hbase 表
   */
  static queryHbaseTable(param, options=null){
    return PlatformAPI.server.postData("/api/tenant/gethbaseresouce" ,param,false) ;
  }

  /**
   * 模糊匹配 hive 库
   */
  static queryHiveDb(param, options=null){
    return PlatformAPI.server.postData("/api/tenant/gethiveresouce" ,param,false) ;
  }

  /**
   * 查询详情
   */
  static queryAuthorDetail(param,options=null){
    let type = "showsinglehdfs" ;
    if(param.type==="hbase")
      type = "showsinglehbase";
    else if(param.type==="hive")
      type = "showsinglehivedb" ;
    return PlatformAPI.server.getData("/api/tenant/"+type ,param.param) ;
  }

  /*----------------------------------------------------- task monitor ------------------------*/

  /**
   * 任务监控 -- 接入任务统计(图表)
   */
   static importTaskStatic(param,options=null){
     return PlatformAPI.server.getData("/api/monitor/task/showReceiveTaskMeasure" ,param) ;
   }


   /**
    * 任务监控 -- 接入任务统计(分页)
   */
   static importTaskStaticList(params,options=null){
     return PlatformAPI.server.getData("/api/monitor/task/showReceiveTaskInfo" ,params) ;
   }

  /*--------------------------------------------------- tanant link -------------------------------------------*/


  /**
   * 查询关联列表
   */
  static queryTenantLinkList(param,options=null){
    return PlatformAPI.server.getData("/api/tenant/getJoinDeptInfo" ,param) ;
  }

  /**
   * 添加 租户 关联关系
   */
  static saveTenantLink(param,options=null){
    return PlatformAPI.server.postData("/api/tenant/saveJoinInfo" ,param) ;
  }


  static checkGuanLian(param,options=null){
    return PlatformAPI.server.postData("/api/tenant/checkJoinInfo" ,param) ;
  }


  /**
   * 编辑 租户关联关系
   */
  static editTenantLink(param,options=null){
    return PlatformAPI.server.postData("/api/tenant/updateJoinAccount" ,param) ;
  }

  /**
   * 删除 租户 关联关系
   */
  static deleteTenantLink(param,options=null){
    return PlatformAPI.server.postData("/api/tenant/deleteJoinInfo" ,param) ;
  }

  /**
   *  获取尚未关联的租户列表  全部获得 不知道多不多
   */
  static queryUnLinkTenant(param,options=null){
    return PlatformAPI.server.getData("/api/tenant/getNotJoinTenant" ,param) ;
  }

  /**
   *  获取尚未关联的部门列表 全部获得 不知道多不多
   */
  static queryUnLinkOrg(param,options=null){
    return PlatformAPI.server.getData("/api/tenant/getNotJoinDept" ,param) ;
  }
  /**
   *  获取指定部门下的用户
   */
  static queryUserByOrg(param,options=null){
    return PlatformAPI.server.getData("/api/tenant/getDeptAccountList" ,param) ;
  }

  /**
   *  获取指定部门下的用户
   */
  static queryTenantDic(param,options=null){
    return PlatformAPI.server.getData("/api/tenant/getDicType" ,param) ;
  }

  /*------------------------------------------------------------------------------ 数据库文件监控 ----------------------*/
  /**
   *  获得数据库类型统计信息列表
   */
  static queryDbTypeStic(param,options=null){
    return PlatformAPI.server.getData("/api/monitor/asset/getInstallCount" ,param) ;
  }
  /**
   *  查询某个类型的软件节点列表 统计信息
   */
  static queryDbTypeNodeList(param,options=null){
    return PlatformAPI.server.getData("/api/monitor/asset/getDataBaseInfo" ,param) ;
  }
  /**
   *  查询某个节点的cpu统计信息
   */
  static queryDbTypeNodeCpu(param,options=null){
    return PlatformAPI.server.getData("/api/monitor/asset/getZabbixCPU" ,param) ;
  }

  /**
   *  部门占比统计
   */
  static queryOrgZhanbi(param,options=null){
    return PlatformAPI.server.getData("/api/monitor/asset/getPercentageByOrg" ,param) ;
  }

  /**
   *  部门占比统计
   */
  static queryOrgExopotStic(param,options=null){
    return PlatformAPI.server.getData("/api/monitor/asset/getExportTopByOrg" ,param) ;
  }

  /**
   * 导出类型占比
   */
  static getExportTypeStic(param, options=null){
    return PlatformAPI.server.getData("/api/monitor/asset/getExportTpye" ,param) ;
  }

  /**
   * 处理数据排名
   */
  static handlerDataTop(param, options=null){
    return PlatformAPI.server.getData("/api/dataGovernance/getdataDisposeTop" ,param) ;
  }

  /**
   * 主题排名
   */
  static themeDataTop(param, options=null){
    return PlatformAPI.server.getData("/api/dataGovernance/getdataThemeTop" ,param) ;
  }
  /**
   * 统计原始区 数据01
   */
  static queryOldSticNum(param, options=null){
    /*return PlatformAPI.server.getData("/api/monitor/asset/getDBCounts" ,param) ;*/
    return PlatformAPI.server.getData("/api/monitor/asset/getMonitorCounts",param) ;
  }
  /**
   * 统计原分析处理区 数据02
   */
  static queryHandlerAnNum(param, options=null){
    return PlatformAPI.server.getData("/api/monitor/asset/getExportWay" ,param) ;
  }

  /**
   * 原始区监控
   */
  static getThreeNumber(param, options=null){
    return PlatformAPI.server.getData("/api/monitor/asset/getMonitorCounts",param) ;
  }

  /**
   *平台监控 ---数据/文件监控
   */
  static getListOfTables(param, options=null){
    return PlatformAPI.server.getData("/api/monitor/asset/getTableInfo",param) ;
  }
}
/**
 * 人大金仓服务
 */
PlatformAPI.server = new RdjcServer() ;
export default PlatformAPI ;
