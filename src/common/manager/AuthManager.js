/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import PathConst from "@/router/PathConst";
import NormalUtils from "../utils/NormalUtils";

class AuthManager {
}

//方便使用挂到windown下
if(window)
  window.AuthManager = AuthManager ;

/**
 * 平台管理员
 * @type {string}
 */
AuthManager.adminCode = "00000" ;
/**
 * 超级管理员
 * @type {string}
 */
AuthManager.superAdminCode = "11111" ;
/**
 * 只为使用放这里
 */
AuthManager.isAdmin = false ;
/**
 * 是否初始化
 * @type {boolean}
 */
AuthManager.initList = false ;
/**
 * 初始化权限树
 * @type {{}}
 */
AuthManager.has = {} ;

/**
 * 权限树  不整合了 麻烦
 * @type {*[]}
 */
AuthManager.treeList = [
    {selected:false,code:"1",label:"首页",path:PathConst.HOME,main:true},

    {selected:false,code:"2",label:"数据目录",path:PathConst.DATADIRECTORIES,main:true,
      children:[
        {selected:false,code:"21",label:"部门目录" ,path:PathConst.DD_DEPARTMENT,main:true ,
          children:[
            /*{selected:false,code:"22",label:"主题目录" ,path:PathConst.DD_THEME,main:true },
            {selected:false,code:"23",label:"信用目录",path:PathConst.DD_THEME_XY,main:true  },*/
            {selected:false,code:"22",label:"民政局" ,path:PathConst.DD_THEME,main:true },
            {selected:false,code:"23",label:"住建委",path:PathConst.DD_THEME_XY,main:true  },
            {selected:false,code:"23",label:"工商局",path:PathConst.DD_THEME_XY,main:true  },
          ]},
        {selected:false,code:"24",label:"主题目录" ,path:PathConst.DD_THEME_FK,main:true,
          children:[
            {selected:false,code:"22",label:"信用目录" ,path:PathConst.DD_THEME,main:true },
            {selected:false,code:"23",label:"反恐目录",path:PathConst.DD_THEME_XY,main:true  },
            {selected:false,code:"23",label:"物联网目录",path:PathConst.DD_THEME_XY,main:true  },
          ]},
        {selected:false,code:"25",label:"基础目录" ,path:PathConst.DD_BASE,main:true,
          children:[
            {selected:false,code:"22",label:"人口库目录" ,path:PathConst.DD_THEME,main:true },
            {selected:false,code:"23",label:"法人库目录",path:PathConst.DD_THEME_XY,main:true  },
            {selected:false,code:"23",label:"空间地理库目录",path:PathConst.DD_THEME_XY,main:true  },
        ]}
      ]},

    {selected:false,code:"3",label:"数据接入",path:PathConst.DATAIMPORT,main:true  ,
      children:[
        {selected:false,code:"31",label:"数据源管理",path:PathConst.DI_CONFIGMGER,main:true,
          btns:[
            {selected:false,code:"33",label:"添加" },
            {selected:false,code:"34",label:"编辑" },
            {selected:false,code:"35",label:"资源标引" },
            {selected:false,code:"36",label:"删除" }
          ] },
        {selected:false,code:"37",label:"资源标引",path:PathConst.DI_ASSETSIMPORT,main:true,
          btns:[
            {selected:false,code:"39",label:"字段注释" }
          ] },
        {selected:false,code:"310",label:"接入任务管理" ,path:PathConst.DI_IMPORT_TASK,main:true,
          children:[
            {selected:false,code:"311",label:"数据库接入"  ,path:PathConst.DI_IMPORT_TASK_TABLE,
              btns:[
                {selected:false,code:"313",label:"添加" },
                {selected:false,code:"314",label:"编辑" },
                {selected:false,code:"315",label:"删除" },
                {selected:false,code:"316",label:"设置周期" },
                {selected:false,code:"317",label:"启动" },
                {selected:false,code:"318",label:"停止" },
                {selected:false,code:"319",label:"查看信息" }
              ]},
            {selected:false,code:"320",label:"文件接入",path:PathConst.DI_IMPORT_TASK_FILE,
              btns:[
                {selected:false,code:"322",label:"添加" },
                {selected:false,code:"323",label:"编辑" },
                {selected:false,code:"324",label:"删除" },
                {selected:false,code:"325",label:"设置周期" },
                {selected:false,code:"326",label:"启动" },
                {selected:false,code:"327",label:"停止" },
                {selected:false,code:"328",label:"查看信息" }
              ] },
          ]},
        {selected:false,code:"329",label:"任务监控" ,path:PathConst.DI_INPUT_MONITOR,main:true,
          btns:[
            {selected:false,code:"331",label:"查看详情" },
            {selected:false,code:"332",label:"查看日志" }
          ]},

        /*{selected:false,code:"333",label:"业务系统直采" ,main:true},
        {selected:false,code:"334",label:"共享交换平台",main:true }*/

      ]},

    {selected:false,code:"4",label:"数据存储管理",main:true ,path:PathConst.DATASTORAGE,
      children:[
        {selected:false,code:"41",label:"统计导航", path:PathConst.DS_DEF },

        {selected:false,code:"421",label:"原始区管理",main:true,
          children:[
            {selected:false,code:"422",label:"表/目录管理",main:true,path:PathConst.DS_OLD_CONFIG,
              children:[
                {selected:false,code:"423",label:"表管理" ,
                  btns:[
                    {selected:false,code:"425",label:"测试连接" }
                  ],
                  children:[
                    {selected:false,code:"426",label:"数据表管理",
                      btns:[
                        {selected:false,code:"427",label:"添加数据表" },
                        {selected:false,code:"428",label:"编辑数据表" },
                        {selected:false,code:"429",label:"添加字段" },
                        {selected:false,code:"4210",label:"删除字段" }
                      ] }
                  ]},
                {selected:false,code:"4211",label:"目录管理",
                  btns:[
                    {selected:false,code:"4213",label:"管理目录" },
                    {selected:false,code:"4214",label:"添加目录" }
                  ] },
              ] },

            {selected:false,code:"4215",label:"资源管理",main:true ,path:PathConst.DS_OLD_ASSETS ,
              btns:[
                {selected:false,code:"4217",label:"修改资源信息" },
                {selected:false,code:"4218",label:"打标签" },
                {selected:false,code:"4219",label:"授权" },
                {selected:false,code:"4220",label:"字段注释" },
                {selected:false,code:"4221",label:"资源编码" }
              ]},

            {selected:false,code:"4222",label:"数据获取",main:true ,path:PathConst.DS_OLD_SOURCE_GETTER,
              children:[
                {selected:false,code:"4224",label:"表数据下载" },
                {selected:false,code:"4225",label:"文件下载" },
                {selected:false,code:"4226",label:"查询" },
                {selected:false,code:"4227",label:"接口" },
                {selected:false,code:"4228",label:"交换" },
                {selected:false,code:"4229",label:"浏览" }
              ] },

            {selected:false,code:"4230",label:"数据查看" ,main:true ,path:PathConst.DS_OLD_DATASOURCE,
              children:[
                {selected:false,code:"4231",label:"即席查询" },
                {selected:false,code:"4232",label:"视图模式查询" },
                {selected:false,code:"4233",label:"SQL模式查询" },
                {selected:false,code:"4234",label:"下载资源" },
                {selected:false,code:"4235",label:"标签云查询" },
                {selected:false,code:"4236",label:"下载资源" }
              ]}
          ] },

        {selected:false,code:"431",label:"处理区管理",main:true,
          children:[
            {selected:false,code:"432",label:"表/目录管理",main:true,path:PathConst.DS_HANDLER_CONFIG,
              children:[
                {selected:false,code:"433",label:"表管理" ,
                  btns:[
                    {selected:false,code:"435",label:"测试连接" }
                  ],
                  children:[
                    {selected:false,code:"436",label:"数据表管理",
                      btns:[
                        {selected:false,code:"437",label:"添加数据表" },
                        {selected:false,code:"438",label:"编辑数据表" },
                        {selected:false,code:"439",label:"添加字段" },
                        {selected:false,code:"4310",label:"删除字段" }
                      ] }
                  ]},
                {selected:false,code:"4311",label:"目录管理",
                  btns:[
                    {selected:false,code:"4313",label:"管理目录" },
                    {selected:false,code:"4314",label:"添加目录" }
                  ] },
              ] } ,

            {selected:false,code:"4315",label:"资源管理" ,main:true ,path:PathConst.DS_HANDLER_ASSETS,
              btns:[
                {selected:false,code:"4317",label:"修改资源信息" },
                {selected:false,code:"4318",label:"打标签" },
                {selected:false,code:"4319",label:"授权" },
                {selected:false,code:"4320",label:"字段注释" },
                // {selected:false,code:"4321",label:"资源编码" }
              ]},

            {selected:false,code:"4322",label:"数据获取",main:true ,path:PathConst.DS_HANDLER_SOURCE_GETTER,
              children:[
                {selected:false,code:"4324",label:"表数据下载" },
                {selected:false,code:"4325",label:"文件下载" },
                {selected:false,code:"4326",label:"查询" },
                {selected:false,code:"4327",label:"接口" },
                {selected:false,code:"4328",label:"交换" },
                {selected:false,code:"4329",label:"浏览" }
              ] },

            {selected:false,code:"4330",label:"数据查看" ,main:true ,path:PathConst.DS_HANDLER_DATASOURCE,
              children:[
                {selected:false,code:"4331",label:"即席查询" },
                {selected:false,code:"4332",label:"视图模式查询" },
                {selected:false,code:"4333",label:"SQL模式查询" },
                {selected:false,code:"4334",label:"下载资源" },
                {selected:false,code:"4335",label:"标签云查询" },
                {selected:false,code:"4336",label:"下载资源" }
              ]}

          ] },

        {selected:false,code:"441",label:"分析区管理",main:true ,
          children:[
            {selected:false,code:"442",label:"表/目录管理",main:true ,path:PathConst.DS_ANALYSIS_CONFIG,
              children:[
                {selected:false,code:"443",label:"表管理" ,
                  btns:[
                    {selected:false,code:"445",label:"测试连接" }
                  ],
                  children:[
                    {selected:false,code:"446",label:"数据表管理",
                      btns:[
                        {selected:false,code:"447",label:"添加数据表" },
                        {selected:false,code:"448",label:"编辑数据表" },
                        {selected:false,code:"449",label:"添加字段" },
                        {selected:false,code:"4410",label:"删除字段" }
                      ] }
                  ]},

                {selected:false,code:"4411",label:"目录管理",
                  btns:[
                    {selected:false,code:"4413",label:"管理目录" },
                    {selected:false,code:"4414",label:"添加目录" }
                  ] },
              ] } ,

            {selected:false,code:"4415",label:"资源管理" ,main:true ,path:PathConst.DS_ANALYSIS_ASSETS,
              btns:[
                {selected:false,code:"4417",label:"修改资源信息" },
                {selected:false,code:"4418",label:"打标签" },
                {selected:false,code:"4419",label:"授权" },
                {selected:false,code:"4420",label:"字段注释" },
                // {selected:false,code:"4421",label:"资源编码" }
              ]},

            {selected:false,code:"4422",label:"数据获取",main:true ,path:PathConst.DS_ANALYSIS_SOURCE_GETTER,
              children:[
                {selected:false,code:"4424",label:"表数据下载" },
                {selected:false,code:"4425",label:"文件下载" },
                {selected:false,code:"4426",label:"查询" },
                {selected:false,code:"4427",label:"接口" },
                {selected:false,code:"4428",label:"交换" },
                {selected:false,code:"4429",label:"浏览" }
              ] },

            {selected:false,code:"4430",label:"数据查看" ,main:true ,path:PathConst.DS_ANALYSIS_DATASOURCE,
              children:[
                {selected:false,code:"4431",label:"即席查询" },
                {selected:false,code:"4432",label:"视图模式查询" },
                {selected:false,code:"4433",label:"SQL模式查询" },
                {selected:false,code:"4434",label:"下载资源" },
                {selected:false,code:"4435",label:"标签云查询" },
                {selected:false,code:"4436",label:"下载资源" }
              ]}
          ] },

      ] },

    {selected:false,code:"5",label:"数据处理",main:true ,path:PathConst.DATAHANDLER,
      children:[
        {selected:false,code:"52",label:"基础处理",main:true ,children:[
            {selected:false,code:"53",label:"创建任务",main:true ,path:PathConst.DH_TASK_CREATE,
              btns:[
                {selected:false,code:"54",label:"添加自定义组件" }
              ] },
            {selected:false,code:"55",label:"任务配置",main:true ,path:PathConst.DH_TASK_CONFIG,
              btns:[
                {selected:false,code:"57",label:"编辑任务" },
                {selected:false,code:"58",label:"删除任务" },
                {selected:false,code:"59",label:"配置任务周期" },
                {selected:false,code:"510",label:"启动任务" },
                {selected:false,code:"511",label:"停止任务" }
              ] },
            {selected:false,code:"512",label:"任务监控",main:true ,path:PathConst.DH_TASK_MONIOR,
              btns:[
                {selected:false,code:"514",label:"查看任务详情" },
                {selected:false,code:"515",label:"查看日志" }
              ] },
            {selected:false,code:"513",label:"质量分析报告",main:true ,path:PathConst.DH_TASK_REPORT}
          ] },
        //新加的
        {selected:false,code:"52",label:"数据质量管理",main:true ,children:[
            {selected:false,code:"53",label:"创建任务",main:true ,path:PathConst.DH_QUALITY_CREATE,
              btns:[
                {selected:false,code:"54",label:"添加自定义组件" }
              ] },
            {selected:false,code:"55",label:"任务配置",main:true ,path:PathConst.DH_QUALITY_CONFIG,
              btns:[
                {selected:false,code:"57",label:"编辑任务" },
                {selected:false,code:"58",label:"删除任务" },
                {selected:false,code:"59",label:"配置任务周期" },
                {selected:false,code:"510",label:"启动任务" },
                {selected:false,code:"511",label:"停止任务" }
              ] },
            {selected:false,code:"512",label:"任务监控",main:true ,path:PathConst.DH_QUALITY_MONIOR,
              btns:[
                {selected:false,code:"514",label:"查看任务详情" },
                {selected:false,code:"515",label:"查看日志" }
              ] },
            {selected:false,code:"513",label:"质量分析报告",main:true ,path:PathConst.DH_QUALITY_REPORT}
          ] },

        {selected:false,code:"516",label:"脱敏处理",main:true ,path:PathConst.DH_DIS_SENSITIVE,children:[
            {selected:false,code:"5163",label:"创建任务",main:true ,path:PathConst.DH_DIS_TASK_CREATE},
            {selected:false,code:"5165",label:"任务配置",main:true ,path:PathConst.DH_DIS_TASK_CONFIG,
              btns:[
                {selected:false,code:"5167",label:"编辑任务" },
                {selected:false,code:"5168",label:"删除任务" },
                {selected:false,code:"5169",label:"配置任务周期" },
                {selected:false,code:"51610",label:"启动任务" },
                {selected:false,code:"51611",label:"停止任务" }
              ] },
            {selected:false,code:"51612",label:"任务监控",main:true ,path:PathConst.DH_DIS_TASK_MONIOR,
              btns:[
                {selected:false,code:"51614",label:"查看任务详情" },
                {selected:false,code:"51615",label:"查看日志" }
              ] }
          ] },
        {selected:false,code:"517",label:"标签管理",main:true ,children:[
            {selected:false,code:"518",label:"资源标签",main:true ,path:PathConst.DH_TAG_MANAGER,
              children:[
                {selected:false,code:"519",label:"标签管理",
                  btns:[
                    {selected:false,code:"520",label:"添加标签" }
                  ] },
                {selected:false,code:"521",label:"打标签"}
              ] },

            /*{selected:false,code:"524",label:"数字贴标签",main:true ,path:PathConst.DH_TAGDATA_MANAGER }*/

          ] },

        /*{selected:false,code:"525",label:"规则管理",main:true ,path:PathConst.DH_PLANT_MANAGER }*/

      ] },

    {selected:false,code:"6",label:"数据分析",main:true ,path:PathConst.DATAANALYSIS,
      children:[
        {selected:false,code:"61",label:"多维分析",main:true ,children:[
            {selected:false,code:"62",label:"查询" ,main:true ,path: PathConst.DA_MORE_SEARCH},
            {selected:false,code:"63",label:"模型" ,main:true ,path: PathConst.DA_MORE_MODEL},
            {selected:false,code:"64",label:"监控" ,main:true ,path: PathConst.DA_MORE_MONIOR},
            {selected:false,code:"65",label:"系统" ,main:true ,path: PathConst.DA_MORE_SYSTEM}
          ] },
        {selected:false,code:"66",label:"数据挖掘",main:true ,children:[
            {selected:false,code:"67",label:"模型任务管理",main:true ,path: PathConst.DA_MINING_MANAGER,
              btns:[
                    // {selected:false,code:"69",label:"配置周期" },
                    {selected:false,code:"610",label:"启动" },
                    {selected:false,code:"611",label:"停止" },
                    {selected:false,code:"612",label:"编辑" },
                    {selected:false,code:"613",label:"删除" },
                    {selected:false,code:"616",label:"添加" },
                    {selected:false,code:"619",label:"发布" },
                    {selected:false,code:"620",label:"试运行" },
                    {selected:false,code:"621",label:"查看结果" }
                    // {selected:false,code:"622",label:"停止试运行" }
              ] },
            {selected:false,code:"623",label:"任务监控",main:true ,path: PathConst.DA_MINING_MONITOR,
              btns:[
                {selected:false,code:"625",label:"查看任务详情" },
                {selected:false,code:"626",label:"查看任务日志" }
              ] },
          ] },

      ] },

    {selected:false,code:"7",label:"数据可视化",main:true ,path:PathConst.DATAVISUALIZATION,
      children:[
        {selected:false,code:"71",label:"可视化管理",main:true , icon:"iconfont tj-tubiao",path:PathConst.DV_BOARD_INDEX ,
          children:[
            {selected:false,code:"72",label:"分组管理",btns:[
                {selected:false,code:"73",label:"添加分组" },
                {selected:false,code:"74",label:"删除分组" },
                {selected:false,code:"75",label:"编辑分组" }
              ] },

            {selected:false,code:"76",label:"添加可视化" },
            {selected:false,code:"77",label:"编辑可视化" },
            {selected:false,code:"78",label:"发布可视化" }
          ]},
        {selected:false,code:"79",label:"数据源管理",main:true , icon: "iconfont tj-msnui-db",path: PathConst.DV_DATA_MANAGER }
      ] },

    {selected:false,code:"8",label:"平台管理与监控",main:true ,path:PathConst.PLATFORMMANAGER,
      children:[
        {selected:false,code:"811",label:"平台资产管理" ,main:true ,children:[
            {selected:false,code:"812",label:"创建库/文件",main:true , path: PathConst.PM_ASSETS_REGISTER,
              btns:[
                {selected:false,code:"813",label:"创建" },
                {selected:false,code:"814",label:"编辑" },
                {selected:false,code:"815",label:"删除" }
              ] },

            {selected:false,code:"816",label:"软件分配", main:true ,path: PathConst.PM_ASSETS_SET,
              btns:[
                {selected:false,code:"817",label:"分配" },
                {selected:false,code:"818",label:"编辑" },
                {selected:false,code:"819",label:"删除" }
              ] }

          ]},

        {selected:false,code:"8110",label:"平台资产监控" ,main:true ,children:[
            {selected:false,code:"8111",label:"原始区监控",main:true , path: PathConst.PM_ASSETS_MONITOR_OLD },
            {selected:false,code:"8112",label:"处理/分析区监控",main:true , path: PathConst.PM_ASSETS_MONITOR_OTHER },
          ]},

        {selected:false,code:"8113",label:"平台监控",main:true ,children:[
            {selected:false,code:"8114",label:"任务监控", main:true ,path: PathConst.PM_PM_TASK },
            {selected:false,code:"8115",label:"数据库/文件监控", main:true ,path: PathConst.PM_PM_DATAFILE },
            {selected:false,code:"8116",label:"Hadoop监控", main:true ,path: PathConst.PM_PM_HADOOP }

            /*{selected:false,code:"8117",label:"平台应用监控", main:true ,path: PathConst.PM_PM_APPLICATION },*/

          ] },

        {selected:false,code:"8118",label:"数据资源监控",main:true ,children:[
            {selected:false,code:"8119",label:"原始区监控" , main:true ,path: PathConst.PM_OLD_SOURCE_MONITOR},
            {selected:false,code:"8120",label:"处理/分析区监控", main:true ,path: PathConst.PM_OTHER_SOURCE_MONITOR },
          ] },

        {selected:false,code:"821",label:"租户管理" ,main:true ,children:[

            {selected:false,code:"822",label:"租户管理" , main:true ,path: PathConst.PM_TENENT_MANAGER,
              btns:[
                {selected:false,code:"824",label:"添加" },
                {selected:false,code:"825",label:"编辑" },
                {selected:false,code:"826",label:"删除" }
              ],
              children:[
                {selected:false,code:"827",label:"关联管理",btns:[
                    {selected:false,code:"828",label:"添加关联" },
                    {selected:false,code:"829",label:"取消关联" }
                  ] }
              ]
            },


           /* {selected:false,code:"8210",label:"组织机构" ,main:true,path: PathConst.PM_ORGAN_MANAGER},*/

          ]},

        {selected:false,code:"831",label:"权限管理" ,main:true , path: PathConst.PM_ORGAN_MANAGER,
          children:[

            {selected:false,code:"832",label:"角色管理",main:true , path: PathConst.PM_ROLE_MANAGER,
              btns:[
                {selected:false,code:"833",label:"添加" },
                {selected:false,code:"834",label:"编辑" },
                {selected:false,code:"835",label:"删除" },
                {selected:false,code:"836",label:"授权" },
                {selected:false,code:"837",label:"用户列表" },
              ] },

            {selected:false,code:"838",label:"用户管理" ,main:true , path: PathConst.PM_USER_MANAGER,
              btns:[
                {selected:false,code:"839",label:"分配角色" }
              ]}
          ]},


        /*{selected:false,code:"841",label:"项目管理",main:true , path: PathConst.PM_PROJECT_MANAGER,
          btns:[
            {selected:false,code:"842",label:"条件查询" },
            {selected:false,code:"843",label:"添加" },
            {selected:false,code:"844",label:"编辑" },
            {selected:false,code:"845",label:"删除" }
          ] }*/

      ] },

   {selected:false,code:"9",label:"系统设置",main:true ,path:PathConst.SYSTEMMANAGER }
] ;

/**
 * 获得导航菜单
 * @param mainPath
 */
AuthManager.getMainMenuList = function(mainPath) {
  AuthManager.initMenuMap();

  let arr = [];
  if (mainPath === PathConst.ROOT) {
    for (let item of AuthManager.treeList) {
      arr.push(NormalUtils.copySimpleData(item, {}));
    }
  }
  else if (AuthManager.menuMap.hasOwnProperty(mainPath)) {
    let mainMenu = AuthManager.menuMap[mainPath];
    //只有两层直接循环
    for (let sub of mainMenu.children) {
      if (sub.main && AuthManager.has[sub.code] ) {
        let _sub = NormalUtils.copySimpleData(sub, {});
        if (sub.children && sub.children.length > 0) {
          _sub.children = [];
          for (let ssub of sub.children) {
            if(ssub.main && AuthManager.has[ssub.code])
            _sub.children.push(NormalUtils.copySimpleData(ssub, {}));
          }
        }
        arr.push(_sub);
      }
    }
  }
  return arr ;
}

/**
 * 获得菜单对象
 * @param path
 */
AuthManager.getMenuItem = function(path){
  AuthManager.initMenuMap();
  if (AuthManager.menuMap.hasOwnProperty(path))
    return NormalUtils.copySimpleData(AuthManager.menuMap[path],{});
  return null ;
}

/**
 * 验证获得 菜单项
 * @param path
 * @returns {null}
 */
AuthManager.getValidMenuItem = function(path){
  AuthManager.initMenuMap();
  if (AuthManager.menuMap.hasOwnProperty(path)){
    let item = AuthManager.menuMap[path] ;
    if(AuthManager.has[item.code+""])
      return NormalUtils.copySimpleData(item,{});
  }
  return null ;
}

/**
 * 刷新权限
 */
AuthManager.refreshAuth = function( isMust = false ){
  //权限列表
  if(AuthManager.initList && !isMust)
    return ;
  let list =  NormalUtils.getSession("authList") ;
  if(list){
    // if(list==="all"){
    //   AuthManager.isAdmin = true ;
    //   AuthManager.defaultAll(false) ;
    // }
    // else if(list)
      AuthManager.initAuth(list,false) ;
  }
}

/**
 * 初始化角色权限
 * @param role
 */
AuthManager.initRole = function(role){
  // if(role.roleCode === AuthManager.adminCode){ 平台管理员也根据权限进行验证
  //   AuthManager.isAdmin = true ;
  //   AuthManager.defaultAll() ;
  // }
  // else
    AuthManager.initAuth(role.menuIds) ;
}

/**
 * 初始化权限列表
 */
AuthManager.initAuth = function( authList ,init=true){
  AuthManager.initMenuMap() ;
  NormalUtils.setSession("authList",authList) ;
  let authMap = {} ;
  for(let auth of authList){
    authMap[auth] = true ;
  }
  let map = {} ;
  for(let item of AuthManager.allList){
    map[item.code] = false ;
    if(authMap.hasOwnProperty(item.code))
      map[item.code] = true ;
  }
  AuthManager.has = map ;
  AuthManager.initList = true ;
}

/**
 * 初始化所有权限
 */
AuthManager.defaultAll = function(init=true){
  AuthManager.initMenuMap() ;
  let map = {} ;
  for(let item of AuthManager.allList){
    map[item.code] = true ;
  }
  AuthManager.has = map ;
  AuthManager.initList = true ;
  NormalUtils.setSession("authList","all") ;
}

/**
 * 验证路由  --- 验证已添加的一层 主路由
 * @param path
 */
AuthManager.validPath = function(path){
  AuthManager.initMenuMap() ;

  //根地址不验证 不登录 显示登录页面
  if(path!==PathConst.ROOT && AuthManager.menuMap.hasOwnProperty(path)){
    let item = AuthManager.menuMap[path] ;
    if(item.code)
      return AuthManager.has[item.code] ;
  }
  return true ;
}

/**
 * 初始化所有对象
 */
AuthManager.initMenuMap = function(){
  if(AuthManager.inited)
    return ;

  let map = {} ;
  let list = [] ;
  NormalUtils.travelTree(AuthManager.treeList,(item)=>{
    map[item.code] = item ;
    if(item.path)
      map[item.path] = item ;
    list.push(item) ;
    if(item.btns){
      for(let btn of item.btns){
        map[btn.code] = btn ;
        list.push(btn) ;
      }
    }
  }) ;
  AuthManager.menuMap = map ;
  AuthManager.allList = list ;
  AuthManager.inited = true ;
}

AuthManager.inited = false ;

export default AuthManager ;
