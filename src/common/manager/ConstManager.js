import DataStorageAPI from "../service/DataStorageAPI";

class ConstManager {
  constructor() {
  }
}

/**
 * 数据库类型
 * @type {Array}
 */
ConstManager.dbTypeList = [
] ;

/**
 * 数据库类型
 * @type {string}
 */
ConstManager.SOURCE_TYPE_DB = "database";
/**
 * 数据库类型
 * @type {string}
 */
ConstManager.SOURCE_TYPE_FILE = "file";

/**
 * 资源类型
 * @type {*[]}
 */
ConstManager.sourceTypeList = [
  {label:"关系型数据库",value:'database'},
  {label:"文件数据",value:'file'},
  {label:"NOSQL数据库",value:'nosql' }
];

/**
 * 任务执行状态
 * @type {*[]}
 */
ConstManager.taskRunTypeList = [
  {label:"全部",value:""},
  {label:"未启动",value:'未启动'},
  {label:"执行中",value:'执行中'},
  {label:"已停止",value:'已停止' }
];
ConstManager.unStart = "未启动" ;
ConstManager.started = "执行中" ;
ConstManager.stopped = "已停止" ;

/**
 * 敏感度
 * @type {*[]}
 */
ConstManager.secureLevel = [
];

/**
 * no sql 数据库 后台接口返回
 * @type {Array}
 */
ConstManager.nosqlList = [
] ;

/**
 * 共享方式
 * @type {*[]}
 */
ConstManager.shareTyple = [
];

/**
 * 汇聚方式
 * @type {*[]}
 */
ConstManager.gatheringWay = [
];

/**
 * 主题
 * @type {*[]}
 */
ConstManager.themeList = [
];

/**
 * 分区列表
 * @type {*[]}
 */
ConstManager.areaList = [
  {label:"原始区",value:"1"},
  {label:"处理区",value:"2"},
  {label:"分析区",value:"3"}
];

/**
 * 物理分区列表
 * @type {*[]}
 */
ConstManager.areaList2 = [
  {value:"原始区",key:"original"},
  {value:"处理区/分析区",key:"handle_analysis"}
];

/**
 * 物理分区列表 -- 原始区
 */
ConstManager.areaOld = "1" ;
/**
 * 物理分区列表 -- 原始区
 */
ConstManager.areaOld2 = "original" ;
/**
 * 物理分区列表 -- 分析区/处理区
 */
ConstManager.areaOther = "handle_analysis" ;

/**
 * 机构列表 加到本地缓存
 * @type {Array}
 */
ConstManager.orgList = [] ;

/**
 * 数据库字段类型
 * @type {*[]}
 */
ConstManager.dbFieldType = [
  {label:"CHAR",value:"CHAR"},
  {label:"VARCHAR",value:"VARCHAR"},
  {label:"TINYBLOB",value:"TINYBLOB"},
  {label:"TINYTEXT",value:"TINYTEXT"},
  {label:"BLOB",value:"BLOB"},
  {label:"TEXT",value:"TEXT"},
  {label:"MEDIUMBLOB",value:"MEDIUMBLOB"},
  {label:"MEDIUMTEXT",value:"MEDIUMTEXT"},
  {label:"TINYINT",value:"TINYINT"},
  {label:"SMALLINT",value:"SMALLINT"},
  {label:"MEDIUMINT",value:"MEDIUMINT"},
  {label:"INTEGER",value:"INTEGER"},
  {label:"INT",value:"INT"},
  {label:"BIGINT",value:"BIGINT"},
  {label:"FLOAT",value:"FLOAT"},
  {label:"DOUBLE",value:"DOUBLE"},
  {label:"DECIMAL",value:"DECIMAL"},
  {label:"LOGNGBLOB",value:"LOGNGBLOB"},
  {label:"LONGTEXT",value:"LONGTEXT"},
  {label:"TEXT",value:"TEXT"},
  {label:"DATE",value:"DATE"},
  {label:"TIME",value:"TIME"},
  {label:"TEAR",value:"TEAR"},
  {label:"DATEYIME",value:"DATEYIME"},
  {label:"TIMESTAMP",value:"TIMESTAMP"}
] ;


/**
 * 数据库字段类型
 * @type {*[]}
 */
ConstManager.hiveFieldType = [
  {label:"STRING",value:"STRING"},
  {label:"FLOAT",value:"FLOAT"},
  {label:"DOUBLE",value:"DOUBLE"},
  {label:"BOOLEAN",value:"BOOLEAN"},
  {label:"BINARY",value:"BINARY"},
  {label:"DATE",value:"DATE"},
  {label:"CHAR",value:"CHAR"},
  {label:"VARCHAR",value:"VARCHAR"},
  {label:"INT",value:"INT"},
  {label:"BIGINT",value:"BIGINT"},
  {label:"DECIMAL",value:"DECIMAL"},
  {label:"TIMESTAMP",value:"TIMESTAMP"},
  {label:"SMALLINT",value:"SMALLINT"},
  {label:"TINYINT",value:"TINYINT"}
] ;

/**
 * 查询存储的码表  临时放着 temp?
 */
ConstManager.dicInited = false ;
ConstManager.callMap = [] ;
ConstManager.initDataDictionary = function( reback = null ){
  if(!ConstManager.dicInited){
    if(reback!==null)
      ConstManager.callMap.push(reback) ;
    DataStorageAPI.dataDictionary().then(
      (result)=>{
        ConstManager.dbTypeList = ConstManager.initMap(result.dbTypes) ;
        ConstManager.shareTyple = ConstManager.initMap(result.shareWay) ;
        ConstManager.gatheringWay = ConstManager.initMap(result.gatheringWay) ;
        ConstManager.secureLevel = ConstManager.initMap(result.sensitiveLevel) ;
        ConstManager.themeList = ConstManager.initMap(result.theme) ;
        ConstManager.nosqlList = ConstManager.initMap(result.noSqlTypes) ;
        ConstManager.dicInited = true ;
        for(let func of ConstManager.callMap){
          if(func!==null)
            func() ;
        }
        ConstManager.callMap = [] ;
      }
    );
  }
  else if(reback!==null)
    reback() ;
}

/**
 * 解析码表值
 * @param data
 * @returns {Array}
 */
ConstManager.initMap = function (data) {
   if(!data)
     return [] ;
   var _re = [] ;
   for(let att in data){
     if(!att)
       _re.push({label:"--请选择--",value:att}) ;//空先这样解析 temp?
     else
     _re.push({label:data[att],value:att}) ;
   }
   return _re ;
}

if(!window.ConstManager)
  window.ConstManager = ConstManager ;

export default ConstManager ;
