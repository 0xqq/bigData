//------------------------------------------------------------------
//title:
//author: zc
//date:
//desc:
//------------------------------------------------------------------

class PathConst{
}

PathConst.ROOT = "/" ;
PathConst.HOME = "/home" ;

//-------------------------------------------------------------------数据目录
PathConst.DATADIRECTORIES = "/datadirectories" ;
//部门
PathConst.DD_DEPARTMENT = "/datadirectories/department" ;
//主题
PathConst.DD_THEME = "/datadirectories/theme" ;
//主题 反恐
PathConst.DD_THEME_FK = "/datadirectories/theme/fk" ;
//主题 信用
PathConst.DD_THEME_XY = "/datadirectories/theme/xy" ;
//主题 信用
PathConst.DD_BASE = "/datadirectories/base" ;


//------------------------------------------------------------------数据存储
PathConst.DATASTORAGE = "/datastorage" ;
//数据存储默认页
PathConst.DS_DEF = "/datastorage/default" ;

//-------------------------------------------原始区域资源管理
//原始区域资源配置管理
PathConst.DS_OLD_CONFIG = "/datastorage/old/table_1" ;
//表管理--主视图
PathConst.DS_OLD_CONFIG_TABLE = "/datastorage/old/table_1" ;
//表管理--列表
PathConst.DS_OLD_CONFIG_TABLE_LIST = "/datastorage/old/table_1/list" ;
//表管理--操作
PathConst.DS_OLD_CONFIG_TABLE_MGER = "/datastorage/old/table_1/manager" ;
//配置管理-目录管理
PathConst.DS_OLD_CONFIG_FOLD = "/datastorage/old/table_1/fold" ;

//资源管理
PathConst.DS_OLD_ASSETS = "/datastorage/old/assetsmager_1" ;
//资源获取
PathConst.DS_OLD_SOURCE_GETTER = "/datastorage/old/sourcegetter_1" ;
//原始区域数据源管理
PathConst.DS_OLD_DATASOURCE = "/datastorage/old/datasourcemager_1" ;
//-------------------------------------------处理区
//原始区域资源配置管理
PathConst.DS_HANDLER_CONFIG = "/datastorage/handler/table_2" ;
//表管理--主视图
PathConst.DS_HANDLER_CONFIG_TABLE = "/datastorage/handler/table_2" ;
//表管理--列表
PathConst.DS_HANDLER_CONFIG_TABLE_LIST = "/datastorage/handler/table_2/list" ;
//表管理--操作
PathConst.DS_HANDLER_CONFIG_TABLE_MGER = "/datastorage/handler/table_2/manager" ;
//配置管理-目录管理
PathConst.DS_HANDLER_CONFIG_FOLD = "/datastorage/handler/table_2/fold" ;

//资源管理
PathConst.DS_HANDLER_ASSETS = "/datastorage/handler/assetsmager_2" ;
//资源获取
PathConst.DS_HANDLER_SOURCE_GETTER = "/datastorage/handler/sourcegetter_2" ;
//原始区域数据源管理
PathConst.DS_HANDLER_DATASOURCE = "/datastorage/handler/datasourcemager_2" ;

//-------------------------------------------分析区
//原始区域资源配置管理
PathConst.DS_ANALYSIS_CONFIG = "/datastorage/analysis/table_3" ;
//表管理--主视图
PathConst.DS_ANALYSIS_CONFIG_TABLE = "/datastorage/analysis/table_3" ;
//表管理--列表
PathConst.DS_ANALYSIS_CONFIG_TABLE_LIST = "/datastorage/analysis/table_3/list" ;
//表管理--操作
PathConst.DS_ANALYSIS_CONFIG_TABLE_MGER = "/datastorage/analysis/table_3/manager" ;
//配置管理-目录管理
PathConst.DS_ANALYSIS_CONFIG_FOLD = "/datastorage/analysis/table_3/fold" ;

//资源管理
PathConst.DS_ANALYSIS_ASSETS = "/datastorage/analysis/assetsmager_3" ;
//资源获取
PathConst.DS_ANALYSIS_SOURCE_GETTER = "/datastorage/analysis/sourcegetter_3" ;
//原始区域数据源管理
PathConst.DS_ANALYSIS_DATASOURCE = "/datastorage/analysis/datasourcemager_3" ;

//-------------------------------------------------------------------数据接入
PathConst.DATAIMPORT = "/dataimport" ;
//数据接入默认页
PathConst.DI_DEF = "/dataimport/default" ;
//数据源管理
PathConst.DI_ASSETSIMPORT = "/dataimport/assetsimport" ;
//外部数据源配置管理
PathConst.DI_CONFIGMGER = "/dataimport/configmager" ;
//平台接入 - 任务接入
PathConst.DI_IMPORT_TASK = "/dataimport/taskimport" ;
//平台接入 - 任务接入
PathConst.DI_IMPORT_TASK_TABLE = "/dataimport/taskimport/table" ;
//平台接入 - 任务接入
PathConst.DI_IMPORT_TASK_FILE = "/dataimport/taskimport/file" ;
//平台接入 - 任务监控
PathConst.DI_INPUT_MONITOR = "/dataimport/monitor" ;


//-------------------------------------------------------------------数据处理
PathConst.DATAHANDLER = "/datahandler" ;
PathConst.DH_DEF = "/datahandler/default" ;
PathConst.DH_OLD_SOURCE = "/datahandler/old/source" ;
PathConst.DH_ANALYSIS_SOURCE = "/datahandler/analysis/source" ;
PathConst.DH_TASK_CREATE = "/datahandler/task/create" ;
PathConst.DH_TASK_CONFIG = "/datahandler/task/config" ;
PathConst.DH_TASK_MONIOR = "/datahandler/task/monior" ;
PathConst.DH_TAG_MANAGER = "/datahandler/tag/manager" ;
PathConst.DH_TASK_REPORT = "/datahandler/task/report" ;

//数据质量管理
PathConst.DH_QUALITY_CREATE = "/datahandler/quality/create" ;
PathConst.DH_QUALITY_CONFIG = "/datahandler/quality/config" ;
PathConst.DH_QUALITY_MONIOR = "/datahandler/quality/monior" ;
PathConst.DH_QUALITY_REPORT = "/datahandler/quality/report" ;

//脱敏处理
PathConst.DH_DIS_SENSITIVE = "/datahandler/sensitive" ;
PathConst.DH_DIS_TASK_CREATE = "/datahandler/sensitive/create";
PathConst.DH_DIS_TASK_CONFIG = "/datahandler/sensitive/config";
PathConst.DH_DIS_TASK_MONIOR = "/datahandler/sensitive/monior" ;

//数字标签管理
PathConst.DH_TAGDATA_MANAGER = "/datahandler/datatag/manager" ;
//规划管理
PathConst.DH_PLANT_MANAGER = "/datahandler/plant" ;

//-------------------------------------------------------------------数据分析
//数据分析
PathConst.DATAANALYSIS = "/dataanalysis" ;
//数据分析默认页
PathConst.DA_DEF = "/dataanalysis/default" ;

//数据分析 搜索
PathConst.DA_MORE_SEARCH = "/dataanalysis/more/search" ;
//数据分析 模型
PathConst.DA_MORE_MODEL = "/dataanalysis/more/model" ;
//数据分析 监控
PathConst.DA_MORE_MONIOR = "/dataanalysis/more/monior" ;
//数据分析 系统
PathConst.DA_MORE_SYSTEM = "/dataanalysis/more/system" ;

//数据分析 数据挖掘
PathConst.DA_MINING_DATAMINING = "/dataanalysis/mining" ;
//数据分析 模型任务管理
PathConst.DA_MINING_MANAGER = "/dataanalysis/mining/manager" ;
//数据分析 挖掘模型 列表
PathConst.DA_MINING_LIST = "/dataanalysis/mining/manager/list" ;
//数据分析 挖掘模型 编辑
PathConst.DA_MINING_MODEL = "/dataanalysis/mining/manager/model" ;
//数据分析 任务监控
PathConst.DA_MINING_MONITOR = "/dataanalysis/mining/monitor" ;

/*0---------------------------------------------------------------- platform -------------------------------*/
//平台管理与监控
PathConst.PLATFORMMANAGER = "/platformmanager" ;
//默认页面
PathConst.PM_DEF = "/platformmanager/default" ;
//hadoop监控
PathConst.PM_PM_HADOOP = "/platformmanager/monitor/hadoop" ;
//任务监控
PathConst.PM_PM_TASK = "/platformmanager/monitor/task" ;
//数据文件监控
PathConst.PM_PM_DATAFILE = "/platformmanager/monitor/dataandfile" ;
//应用监控
PathConst.PM_PM_APPLICATION = "/platformmanager/monitor/application" ;

//租户管理
PathConst.PM_TENENT_MANAGER = "/platformmanager/tenent/tenentmanager" ;
//租户列表
PathConst.PM_TENENT_LIST = "/platformmanager/tenent/tenentmanager/list" ;
//租户授权
PathConst.PM_TENENT_AUTHORIZE = "/platformmanager/tenent/tenentmanager/authorize" ;
//租户关联
PathConst.PM_TENENT_LINK = "/platformmanager/tenent/tenentmanager/link" ;
//租户关联
PathConst.PM_ORGAN_MANAGER = "/platformmanager/tenent/orgmanager" ;

//资产添加
PathConst.PM_ASSETS_REGISTER = "/platformmanager/assets/add" ;
//资产分配
PathConst.PM_ASSETS_SET = "/platformmanager/assets/set" ;



//数据源资源监控 原始区
PathConst.PM_OLD_SOURCE_MONITOR = "/platformmanager/datasource/old" ;
//数据源资源监控 分析处理区
PathConst.PM_OTHER_SOURCE_MONITOR = "/platformmanager/datasource/other" ;

//项目管理
PathConst.PM_PROJECT_MANAGER = "/platformmanager/project" ;

//角色管理
PathConst.PM_ROLE_MANAGER = "/platformmanager/role" ;

//用户管理
PathConst.PM_USER_MANAGER = "/platformmanager/user" ;

//平台资产监控---原始区
PathConst.PM_ASSETS_MONITOR_OLD = "/platformmanager/assetsmonitor/old" ;

//平台资产监控--处理分析区
PathConst.PM_ASSETS_MONITOR_OTHER = "/platformmanager/assetsmonitor/other" ;

//------------------------------------------------------------------- 数据可视化 ------------------

//数据可视化
PathConst.DATAVISUALIZATION = "/datavisualization" ;
//仪表盘首页
PathConst.DV_BOARD_INDEX = "/datavisualization/board" ;
//仪表盘编辑页
PathConst.DV_BOARD_EDIT = "/datavisualization/board/edit" ;
//仪表盘数据源管理
PathConst.DV_DATA_MANAGER = "/datavisualization/datasource" ;

/*0---------------------------------------------------------------- system -------------------------------*/

//系统设置
PathConst.SYSTEMMANAGER = "/SystemManager" ;

export default PathConst ;
