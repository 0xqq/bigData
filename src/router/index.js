import Vue from 'vue';
import Router from 'vue-router';
import PathConst from "./PathConst"
import MainView from '@/components/MainView';

//主页
const Home = r=>require.ensure([],()=>r(require('../components/Home'))) ;


//数据目录
const DataDirectories = r=>require.ensure([],()=>r(require('../components/data-dir/DataDirView'))) ;
const DD_Department = r=>require.ensure([],()=>r(require('../components/data-dir/DepartDir'))) ;
const DS_Theme = r=>require.ensure([],()=>r(require('../components/data-dir/ThemeDir'))) ;
const DS_ThemeFk = r=>require.ensure([],()=>r(require('../components/data-dir/theme/FankongDir'))) ;
const DS_ThemeXy = r=>require.ensure([],()=>r(require('../components/data-dir/theme/XinyongDir'))) ;
const DS_Base = r=>require.ensure([],()=>r(require('../components/data-dir/BaseDir'))) ;


//存储
const DataStorage = r=>require.ensure([],()=>r(require('../components/data-storage/DataStorage'))) ;
const DS_DataStorageDef = r=>require.ensure([],()=>r(require('../components/data-storage/def/DataStorageDef'))) ;
const DS_Old_AssetsMager = r=>require.ensure([],()=>r(require('../components/data-storage/old-area/AssetsMager'))) ;
const DS_Old_DataSourceMager = r=>require.ensure([],()=>r(require('../components/data-storage/old-area/DataSourceMager'))) ;
const DS_Old_SourceGetter = r=>require.ensure([],()=>r(require('../components/data-storage/old-area/SourceGetter'))) ;
const DS_Old_TableAndFold = r=>require.ensure([],()=>r(require('../components/data-storage/old-area/TableDirMager'))) ;
const DS_Old_TableList = r=>require.ensure([],()=>r(require('../components/data-storage/old-area/config/TableList'))) ;
const DS_Old_TableManager = r=>require.ensure([],()=>r(require('../components/data-storage/old-area/config/TableManager'))) ;
const DS_Old_Fold = r=>require.ensure([],()=>r(require('../components/data-storage/old-area/config/Directories'))) ;

const DS_Handler_AssetsMager = r=>require.ensure([],()=>r(require('../components/data-storage/handler-area/AssetsMager')) ) ;
const DS_Handler_DataSourceMager = r=>require.ensure([],()=>r(require('../components/data-storage/handler-area/DataSourceMager')) ) ;
const DS_Handler_SourceGetter = r=>require.ensure([],()=>r(require('../components/data-storage/handler-area/SourceGetter')) ) ;
const DS_Handler_TableAndFold = r=>require.ensure([],()=>r(require('../components/data-storage/handler-area/TableDirMager')) ) ;
const DS_Handler_TableList = r=>require.ensure([],()=>r(require('../components/data-storage/handler-area/config/TableList')) ) ;
const DS_Handler_TableManager = r=>require.ensure([],()=>r(require('../components/data-storage/handler-area/config/TableManager')) ) ;
const DS_Handler_Fold = r=>require.ensure([],()=>r(require('../components/data-storage/handler-area/config/Directories')) ) ;

const DS_Analysis_AssetsMager = r=>require.ensure([],()=>r(require('../components/data-storage/analysis-area/AssetsMager')) ) ;
const DS_Analysis_DataSourceMager = r=>require.ensure([],()=>r(require('../components/data-storage/analysis-area/DataSourceMager')) ) ;
const DS_Analysis_SourceGetter = r=>require.ensure([],()=>r(require('../components/data-storage/analysis-area/SourceGetter')) ) ;
const DS_Analysis_TableAndFold = r=>require.ensure([],()=>r(require('../components/data-storage/analysis-area/TableDirMager')) ) ;
const DS_Analysis_TableList = r=>require.ensure([],()=>r(require('../components/data-storage/analysis-area/config/TableList')) ) ;
const DS_Analysis_TableManager = r=>require.ensure([],()=>r(require('../components/data-storage/analysis-area/config/TableManager')) ) ;
const DS_Analysis_Fold = r=>require.ensure([],()=>r(require('../components/data-storage/analysis-area/config/Directories')) ) ;


//数据接入
const DataImport = r=>require.ensure([],()=>r(require('../components/data-import/DataImport'))) ;
const DataImportDef = r=>require.ensure([],()=>r(require('../components/data-import/def/DataImportDef'))) ;
const DI_AssetsImport = r=>require.ensure([],()=>r(require('../components/data-import/out-data/AssetsImport'))) ;
const DI_ConfigMager = r=>require.ensure([],()=>r(require('../components/data-import/out-data/ConfigMager'))) ;
const DI_TaskImport = r=>require.ensure([],()=>r(require('../components/data-import/platform-import/PlatformImport'))) ;
const DI_TaskTable = r=>require.ensure([],()=>r(require('../components/data-import/platform-import/TableTask'))) ;
const DI_TaskFold = r=>require.ensure([],()=>r(require('../components/data-import/platform-import/FoldTask'))) ;

const DI_TaskMonior = r=>require.ensure([],()=>r(require('../components/data-import/platform-import/TaskMonior'))) ;

//数据分析
const DataAnalysis = r=>require.ensure([],()=>r(require('../components/data-analysis/DataAnalysis')) ) ;
const DA_Def = r=>require.ensure([],()=>r(require('../components/data-analysis/def/DataAnalysisDef')) ) ;
const DA_MoreModel = r=>require.ensure([],()=>r(require('../components/data-analysis/more-analysis/AnalysisModel')) ) ;
const DA_MoreMonitor = r=>require.ensure([],()=>r(require('../components/data-analysis/more-analysis/AnalysisMonior')) ) ;
const DA_MoreSearch = r=>require.ensure([],()=>r(require('../components/data-analysis/more-analysis/AnalysisSearch')) ) ;
const DA_MoreSystem = r=>require.ensure([],()=>r(require('../components/data-analysis/more-analysis/AnalysisSystem')) ) ;

const DA_MiningTaskMonitor = r=>require.ensure([],()=>r(require('../components/data-analysis/data-mining/MiningTaskMonitor')) ) ;
const DA_MiningTaskManager = r=>require.ensure([],()=>r(require('../components/data-analysis/data-mining/MiningTaskManager')) ) ;
const DA_ModelTaskList = r=>require.ensure([],()=>r(require('../components/data-analysis/data-mining/mining-model/ModelTaskList')) ) ;
const DA_MiningModelEdit = r=>require.ensure([],()=>r(require('../components/data-analysis/data-mining/mining-model/ModelEditView')) ) ;


//数据处理
const DataHandler = r => require.ensure([], () => r(require('../components/data-handler/DataHandler'))) ;
const DataHandlerDef = r => require.ensure([], () => r(require('../components/data-handler/def/DataHandlerDef'))) ;
const DH_TaskConfig = r => require.ensure([], () => r(require('../components/data-handler/task/TaskConfig'))) ;
const DH_TaskCreate = r => require.ensure([], () => r(require('../components/data-handler/task/TaskCreate'))) ;
const DH_TaskMonior = r => require.ensure([], () => r(require('../components/data-handler/task/TaskMonior'))) ;
const DH_TaskReport = r => require.ensure([], () => r(require('../components/data-handler/task/TaskReport'))) ;

//数据质量管理
const DH_QualityCreate = r => require.ensure([], () => r(require('../components/data-handler/quality/TaskCreate'))) ;
const DH_QualityConfig = r => require.ensure([], () => r(require('../components/data-handler/quality/TaskConfig'))) ;
const DH_QualityMonior = r => require.ensure([], () => r(require('../components/data-handler/quality/TaskMonior'))) ;
const DH_QualityReport = r => require.ensure([], () => r(require('../components/data-handler/quality/TaskReport'))) ;

//脱敏处理
const DH_DisTaskConfig = r => require.ensure([], () => r(require('../components/data-handler/dis-sensitive/TaskConfig'))) ;
const DH_DisTaskCreate = r => require.ensure([], () => r(require('../components/data-handler/dis-sensitive/TaskCreate'))) ;
const DH_DisTaskMonior = r => require.ensure([], () => r(require('../components/data-handler/dis-sensitive/TaskMonior'))) ;


//标签管理
const DH_TagManager = r => require.ensure([], () => r(require('../components/data-handler/tag-manager/TagManager'))) ;
const DH_DataTagManager = r => require.ensure([], () => r(require('../components/data-handler/tag-manager/DataTagManager'))) ;
const DH_PlantManager = r => require.ensure([], () => r(require('../components/data-handler/plant/PlantManager'))) ;


//平台与监控
const PlatformManager = r => require.ensure([], () => r(require('../components/platform-manager/PlatformManager')), 'platform') ;
const PlatformManagerDef = r => require.ensure([], () => r(require('../components/platform-manager/def/PlatformManagerDef')), 'platform') ;
//数据文件监控
const PM_DataFileMonitor =  r => require.ensure([], () => r(require('../components/platform-manager/platform-monitor/DataFileMonitor')) ) ;
//应用监控
const PM_ApplicationMonitor =  r => require.ensure([], () => r(require('../components/platform-manager/platform-monitor/ApplicationMonitor')) ) ;

//机构管理
const PM_OrganManager = r => require.ensure([], () => r(require('../components/platform-manager/tenant-manager/OrganManager')) ) ;
//租户管理
const PM_TenentManager = r => require.ensure([], () => r(require('../components/platform-manager/tenant-manager/TenantManger')), 'tanant') ;
const PM_TenantAuthorize = r => require.ensure([], () => r(require('../components/platform-manager/tenant-manager/TenantAuthorize')), 'tanant') ;
const PM_TenentList = r => require.ensure([], () => r(require('../components/platform-manager/tenant-manager/TenantList')), 'tanant') ;
const PM_TenentLink = r => require.ensure([], () => r(require('../components/platform-manager/tenant-manager/TenantLink')), 'tanant') ;
//资产注册
const PM_AssetsRegister = r => require.ensure([], () => r(require('../components/platform-manager/assets/AssetsRegister')), 'platformassets') ;
//资产分配
const PM_AssetsAssigin = r => require.ensure([], () => r(require('../components/platform-manager/assets/AssetsAssign')), 'platformassets') ;

//平台数据源监控--原始区
const PM_OldSourceMonitor =  r => require.ensure([], () => r(require('../components/platform-manager/data-source/OldSourceMonitor')) ,"pm_monitor") ;
//平台数据源监控--处理分析区
const PM_OtherSourceMonitor =  r => require.ensure([], () => r(require('../components/platform-manager/data-source/OtherSourceMonitor')) ,"pm_monitor") ;
//平台资产监控--原始区
const PM_OldAssetsMonitor =  r => require.ensure([], () => r(require('../components/platform-manager/assets-monitor/OldAssetsMonitor')) ,"pm_monitor") ;
//平台资产监控--处理分析区
const PM_OtherAssetsMonitor =  r => require.ensure([], () => r(require('../components/platform-manager/assets-monitor/OtherAssetsMonitor')) ,"pm_monitor") ;
//hadoop监控
const PM_HadoopMonitor = r => require.ensure([], () => r(require('../components/platform-manager/platform-monitor/HadoopMonitor')) ,"pm_monitor") ;
//任务监控
const PM_TaskMonitor =  r => require.ensure([], () => r(require('../components/platform-manager/platform-monitor/TaskMonitor')) ,"pm_monitor") ;

//角色管理
const PM_RoleManager =  r => require.ensure([], () => r(require('../components/platform-manager/authority/RoleManager')) ) ;
//用户管理
const PM_UserManager =  r => require.ensure([], () => r(require('../components/platform-manager/authority/UserManager')) ) ;
//项目管理
const PM_ProjectManager =  r => require.ensure([], () => r(require('../components/platform-manager/project/ProjectManager')) ) ;

/*------------------------------------------------------------- system -----------------------------------------------------*/

//系统管理
const SystemManager = r => require.ensure([], () => r(require('../components/system-manager/SystemManager')), 'system') ;

//数据可视化
const DataVisualization = r => require.ensure([], () => r(require('../components/data-visualization/DataVisualization')), 'vis') ;
//数据可视化-仪表盘
const DV_BoardIndex = r => require.ensure([], () => r(require('../components/data-visualization/visualization/Visualization')), 'vis') ;
//数据可视化-仪表盘-编辑
const DV_BoardEidt = r => require.ensure([], () => r(require('../components/data-visualization/visualization/EditDashboard')), 'vis') ;
//数据可视化-数据源管理
const DV_DataSource = r => require.ensure([], () => r(require('../components/data-visualization/data-source/DataSource')), 'vis') ;


Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: '',
    component: MainView,
    // redirect: PathConst.HOME,
    children: [
      {
        path: PathConst.HOME,//首页
        component: Home,
        meta: {  keepAlive: true  }// 需要缓存
      },

//------------------------------------------------------- 数据目录 --------------------------------
      {
        path: PathConst.DATADIRECTORIES,
        component: DataDirectories,
        // redirect: PathConst.DD_DEPARTMENT,
        meta: {keepAlive: true},
        children:[
          {
            path: PathConst.DD_DEPARTMENT,
            component: DD_Department,
            meta: {keepAlive: true}
          },
          {
            path: PathConst.DD_THEME,//DD_Department
            component: DS_Theme,
            meta: {keepAlive: true},
            children:[
              {
                path: PathConst.DD_THEME_FK,//DD_Department
                component: DS_ThemeFk,
                meta: {keepAlive: true}
              },
              {
                path: PathConst.DD_THEME_XY,//DD_Department
                component: DS_ThemeXy,
                meta: {keepAlive: true}
              },
            ]

          },
          {
            path: PathConst.DD_BASE,
            component: DS_Base,
            meta: {keepAlive: true}
          },
        ]
      },

//------------------------------------------------------- 数据存储 --------------------------------
      {
        path: PathConst.DATASTORAGE,//数据存储
        component: DataStorage,
        redirect: PathConst.DS_DEF,
        meta: {  keepAlive: true  },
        children: [
          {
            path:  PathConst.DS_DEF,
            meta: {  keepAlive: true  },
            component: DS_DataStorageDef
          },
          {
            path:  PathConst.DS_OLD_ASSETS,
            meta: {  keepAlive: true  },
            component: DS_Old_AssetsMager
          },
          {
            path:  PathConst.DS_OLD_CONFIG,
            component: DS_Old_TableAndFold,
            meta: {  keepAlive: true  },
            redirect: PathConst.DS_OLD_CONFIG_TABLE_LIST,
            children:[
              {
                path:  PathConst.DS_OLD_CONFIG_TABLE_LIST,
                meta: {  keepAlive: true  },
                component: DS_Old_TableList
              },
              {
                path:  PathConst.DS_OLD_CONFIG_TABLE_MGER,
                meta: {  keepAlive: true  },
                component: DS_Old_TableManager
              },
              {
                path:  PathConst.DS_OLD_CONFIG_FOLD,
                meta: {  keepAlive: true  },
                component: DS_Old_Fold
              }
            ]
          },
          {
            path:  PathConst.DS_OLD_SOURCE_GETTER,
            meta: {  keepAlive: true  },
            component: DS_Old_SourceGetter
          },
          {
            path:  PathConst.DS_OLD_DATASOURCE,
            meta: {  keepAlive: true  },
            component: DS_Old_DataSourceMager
          },

          {
            path:  PathConst.DS_HANDLER_ASSETS,
            meta: {  keepAlive: true  },
            component: DS_Handler_AssetsMager
          },
          {
            path:  PathConst.DS_HANDLER_CONFIG,
            component: DS_Handler_TableAndFold,
            meta: {  keepAlive: true  },
            redirect: PathConst.DS_HANDLER_CONFIG_TABLE_LIST,
            children:[
              {
                path:  PathConst.DS_HANDLER_CONFIG_TABLE_LIST,
                meta: {  keepAlive: true  },
                component: DS_Handler_TableList
              },
              {
                path:  PathConst.DS_HANDLER_CONFIG_TABLE_MGER,
                meta: {  keepAlive: true  },
                component: DS_Handler_TableManager
              },
              {
                path:  PathConst.DS_HANDLER_CONFIG_FOLD,
                meta: {  keepAlive: true  },
                component: DS_Handler_Fold
              }
            ]
          },
          {
            path:  PathConst.DS_HANDLER_SOURCE_GETTER,
            meta: {  keepAlive: true  },
            component: DS_Handler_SourceGetter
          },
          {
            path:  PathConst.DS_HANDLER_DATASOURCE,
            meta: {  keepAlive: true  },
            component: DS_Handler_DataSourceMager
          },

          {
            path:  PathConst.DS_ANALYSIS_ASSETS,
            meta: {  keepAlive: true  },
            component: DS_Analysis_AssetsMager
          },
          {
            path:  PathConst.DS_ANALYSIS_CONFIG,
            component: DS_Analysis_TableAndFold,
            meta: {  keepAlive: true  },
            redirect: PathConst.DS_ANALYSIS_CONFIG_TABLE_LIST,
            children:[
              {
                path:  PathConst.DS_ANALYSIS_CONFIG_TABLE_LIST,
                meta: {  keepAlive: true  },
                component: DS_Analysis_TableList
              },
              {
                path:  PathConst.DS_ANALYSIS_CONFIG_TABLE_MGER,
                meta: {  keepAlive: true  },
                component: DS_Analysis_TableManager
              },
              {
                path:  PathConst.DS_ANALYSIS_CONFIG_FOLD,
                meta: {  keepAlive: true  },
                component: DS_Analysis_Fold
              }
            ]
          },
          {
            path:  PathConst.DS_ANALYSIS_SOURCE_GETTER,
            meta: {  keepAlive: true  },
            component: DS_Analysis_SourceGetter
          },
          {
            path:  PathConst.DS_ANALYSIS_DATASOURCE,
            meta: {  keepAlive: true  },
            component: DS_Analysis_DataSourceMager
          },
        ]
      },

      //------------------------------------------------------- 数据接入 --------------------------------
      {
        path: PathConst.DATAIMPORT,//
        component: DataImport,
        // redirect: PathConst.DI_CONFIGMGER,
        meta: {  keepAlive: true   },
        children:[
          {
            path:  PathConst.DI_DEF,
            meta: {  keepAlive: true   },
            component: DataImportDef
          },
          {
            path:  PathConst.DI_CONFIGMGER,
            meta: {  keepAlive: true  },
            component: DI_ConfigMager
          },
          {
            path:  PathConst.DI_ASSETSIMPORT,
            meta: {  keepAlive: true  },
            component: DI_AssetsImport
          },
          {
            path:  PathConst.DI_IMPORT_TASK,
            meta: {  keepAlive: true   },
            component: DI_TaskImport,
            // redirect: PathConst.DI_IMPORT_TASK_TABLE,
            children:[
              {
                path:  PathConst.DI_IMPORT_TASK_TABLE,
                meta: {  keepAlive: true  },
                component: DI_TaskTable
              },
              {
                path:  PathConst.DI_IMPORT_TASK_FILE,
                meta: {  keepAlive: true  },
                component: DI_TaskFold
              },
            ]
          },
          {
            path:  PathConst.DI_INPUT_MONITOR,
            meta: {  keepAlive: true   },
            component: DI_TaskMonior
          }
        ]
      },

      //------------------------------------------------------- 数据处理 --------------------------------
      {
        path:PathConst.DATAHANDLER,
        component: DataHandler,
        meta: {  keepAlive: true   },
        // redirect: PathConst.DH_TASK_CREATE,
        children:[
          {
            path:  PathConst.DH_DEF,
            meta: {  keepAlive: true   },
            component: DataHandlerDef
          },
          {
            path:  PathConst.DH_OLD_SOURCE,
            meta: {  keepAlive: true   },
            component:DS_Old_DataSourceMager
          },
          // {
          //   path:  PathConst.DH_ANALYSIS_SOURCE,
          //   meta: {  keepAlive: true   },
          //   component:DS_Old_DataSourceMager
          // },
          {
            path:  PathConst.DH_TASK_CREATE,
            meta: {  keepAlive: true   },
            component:DH_TaskCreate
          },

          {
            path:  PathConst.DH_QUALITY_CREATE,
            meta: {  keepAlive: true   },
            component:DH_QualityCreate
          },

          {
            path:  PathConst.DH_TASK_CONFIG,
            meta: {  keepAlive: true   },
            component:DH_TaskConfig
          },

          {
            path:  PathConst.DH_QUALITY_CONFIG,
            meta: {  keepAlive: true   },
            component:DH_QualityConfig
          },

          {
            path:  PathConst.DH_TASK_MONIOR,
            meta: {  keepAlive: true   },
            component: DH_TaskMonior
          },

          {
            path:  PathConst.DH_QUALITY_MONIOR,
            meta: {  keepAlive: true   },
            component: DH_QualityMonior
          },


          {
            path:  PathConst.DH_TASK_REPORT,
            meta: {  keepAlive: true   },
            component: DH_TaskReport
          },

          {
            path:  PathConst.DH_QUALITY_REPORT,
            meta: {  keepAlive: true   },
            component: DH_QualityReport
          },

          {
            path:  PathConst.DH_DIS_TASK_CREATE,
            meta: {  keepAlive: true   },
            component: DH_DisTaskCreate
          },
          {
            path:  PathConst.DH_DIS_TASK_CONFIG,
            meta: {  keepAlive: true   },
            component: DH_DisTaskConfig
          },
          {
            path:  PathConst.DH_DIS_TASK_MONIOR,
            meta: {  keepAlive: true   },
            component: DH_DisTaskMonior
          },
          {
            path:  PathConst.DH_TAG_MANAGER,//标签管理
            meta: {  keepAlive: true   },
            component: DH_TagManager,
          },
          {
            path:  PathConst.DH_TAGDATA_MANAGER,//数字标签管理
            meta: {  keepAlive: true   },
            component: DH_DataTagManager
          },
          {
            path:  PathConst.DH_PLANT_MANAGER,//规划管理
            meta: {  keepAlive: true   },
            component: DH_PlantManager
          }
        ]
      },

      //------------------------------------------------------- 数据分析 --------------------------------
      {
        path: PathConst.DATAANALYSIS,
        meta: {  keepAlive: true   },
        component: DataAnalysis,
        // redirect:PathConst.DA_MINING_MANAGER,
        children:[
          {
            path:PathConst.DA_MORE_MODEL,
            meta: {  keepAlive: true   },
            component: DA_MoreModel
          },
          {
            path:PathConst.DA_MORE_MONIOR,
            meta: {  keepAlive: true   },
            component: DA_MoreMonitor
          },
          {
            path:PathConst.DA_MORE_SEARCH,
            meta: {  keepAlive: true   },
            component: DA_MoreSearch
          },
          {
            path:PathConst.DA_MORE_SYSTEM,
            meta: {  keepAlive: true   },
            component: DA_MoreSystem
          },
          {
            path:PathConst.DA_MINING_MANAGER,
            meta: {  keepAlive: true   },
            component: DA_MiningTaskManager,
            redirect: PathConst.DA_MINING_LIST,
            children:[
              {
                path:PathConst.DA_MINING_LIST,
                meta: {  keepAlive: true   },
                component:DA_ModelTaskList
              },
              {
                path:PathConst.DA_MINING_MODEL,
                meta: {  keepAlive: true   },
                component:DA_MiningModelEdit
              }
            ]
          },
          {
            path:PathConst.DA_MINING_MONITOR,
            meta: {  keepAlive: true   },
            component:DA_MiningTaskMonitor
          }
        ]
      },

      //------------------------------------------------------- 数据可视化 --------------------------------
      {
        path: PathConst.DATAVISUALIZATION,
        meta: {  keepAlive: true   },
        component: DataVisualization,
        redirect: PathConst.DV_BOARD_INDEX,
        children:[
          {
            path: PathConst.DV_BOARD_INDEX,
            meta: {  keepAlive: true   },
            component: DV_BoardIndex,
          },
          {
            path: PathConst.DV_BOARD_EDIT,
            meta: {  keepAlive: true   },
            component: DV_BoardEidt,
          },
          {
            path: PathConst.DV_DATA_MANAGER,
            meta: {  keepAlive: true   },
            component: DV_DataSource,
          }
        ]
      },

      //------------------------------------------------------- 平台监控 --------------------------------
      {
        path: PathConst.PLATFORMMANAGER,
        meta: {  keepAlive: true   },
        component: PlatformManager,
        redirect: PathConst.PM_ASSETS_REGISTER,
        children:[
          {
            path:PathConst.PM_DEF,//默认页面
            meta: {  keepAlive: true   },
            component: PlatformManagerDef
          },

          {
            path:PathConst.PM_ASSETS_REGISTER,//资产注册
            meta: {  keepAlive: true   },
            component: PM_AssetsRegister
          },
          {
            path:PathConst.PM_ASSETS_SET,//资产分配
            meta: {  keepAlive: true   },
            component: PM_AssetsAssigin
          },
          {
            path:PathConst.PM_PM_HADOOP,//平台监控hadoop
            meta: {  keepAlive: true   },
            component: PM_HadoopMonitor
          },
          {
            path:PathConst.PM_PM_TASK,//任务监控
            meta: {  keepAlive: true   },
            component: PM_TaskMonitor
          },
          {
            path:PathConst.PM_PM_DATAFILE,//数据文件监控
            meta: {  keepAlive: true   },
            component: PM_DataFileMonitor
          },
          {
            path:PathConst.PM_PM_APPLICATION,//应用监控
            meta: {  keepAlive: true   },
            component: PM_ApplicationMonitor
          },
          {
            path:PathConst.PM_OLD_SOURCE_MONITOR,//原区数据源统计
            meta: {  keepAlive: true   },
            component: PM_OldSourceMonitor
          },
          {
            path:PathConst.PM_OTHER_SOURCE_MONITOR,//原区数据源统计
            meta: {  keepAlive: true   },
            component: PM_OtherSourceMonitor
          },

          {
            path:PathConst.PM_TENENT_MANAGER,//租户管理
            meta: {  keepAlive: true   },
            component: PM_TenentManager,
            redirect: PathConst.PM_TENENT_LIST,
            children:[
              {
                path:PathConst.PM_TENENT_LIST,//租户授权
                meta: {  keepAlive: true   },
                component: PM_TenentList
              },
              {
                path:PathConst.PM_TENENT_AUTHORIZE,//租户授权
                meta: {  keepAlive: true   },
                component: PM_TenantAuthorize
              },
              {
                path:PathConst.PM_TENENT_LINK,//租户关联
                meta: {  keepAlive: true   },
                component: PM_TenentLink
              }
            ]
          },
          {
            path:PathConst.PM_ORGAN_MANAGER,//机构管理
            meta: {  keepAlive: true   },
            component: PM_OrganManager
          },
          {
            path:PathConst.PM_ROLE_MANAGER,//角色管理
            meta: {  keepAlive: true   },
            component: PM_RoleManager
          },
          {
            path:PathConst.PM_USER_MANAGER,//用户管理
            meta: {  keepAlive: true   },
            component: PM_UserManager
          },
          {
            path:PathConst.PM_PROJECT_MANAGER,//项目
            meta: {  keepAlive: true   },
            component: PM_ProjectManager
          },
          {
            path:PathConst.PM_ASSETS_MONITOR_OLD,//平台资产管理-原始区
            meta: {  keepAlive: true   },
            component: PM_OldAssetsMonitor
          },
          {
            path:PathConst.PM_ASSETS_MONITOR_OTHER,//平台资产管理-处理分析区
            meta: {  keepAlive: true   },
            component: PM_OtherAssetsMonitor
          }
        ]
      },

      //------------------------------------------------------- 系统设置 --------------------------------
      {
        path: PathConst.SYSTEMMANAGER,
        meta: {  keepAlive: true   },
        component: SystemManager
      }
    ]
  }
  ]
  // base:"/bigdata/"
});
