/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
class SPath {

  /**
   * 获得全路径 保证 开发环境也可以看效果
   */
  static getDataStorageUrl(){
    if(SPath.DEV)
       return  SPath.FULL_PATH ;
    return SPath.TJ_BASE ;
  }
}

//
SPath.DEV = false ;

/**
 * 自己的服务
 * @type {string}
 */
SPath.FULL_PATH = "http://192.168.71.59:28080/app" ;//只是本地测试用
SPath.PROXY_BASE = "/proxyApi" ;
SPath.TJ_BASE = "/app" ;//dataStorage-0.1
SPath.TJ_TEST = "" ;//用于测试用

/**
 * 人大金仓 默认配置
 * @type {string}
 */
SPath.RDJC_PROXY = "/proxyRdjc" ;
SPath.RDJC_BASE = "/app" ;//project
SPath.RDJC_TEST = "";

/**
 * 任务过程服务dfdff
 * @type {string}
 */
SPath.PROCESS_PROXY = "/proxProcess" ;
SPath.PROCESS_BASE = "/app" ;//dataProcess
SPath.PROCESS_TEST = "" ;

/**
 * 数据分析地址
 * @type {string}
 */
SPath.ANAYSIS_PROXY = "/proxyAnalysis" ;
SPath.ANAYSIS_BASE = "/app" ;//analysisMing
SPath.ANAYSIS_TEST = "" ;

/**
 * 可视化
 * @type {string}
 */
SPath.VISUALIZATION_PROXY = "/proxyVisualization" ;
SPath.VISUALIZATION_BASE = "/app" ;
SPath.VISUALIZATION_TEST = "" ;


SPath.VISUALIZATION_PROXY = "/proxyVisualization" ;
SPath.VISUALIZATION_BASE = "/visual" ;
SPath.VISUALIZATION_TEST = "" ;

export default SPath ;
