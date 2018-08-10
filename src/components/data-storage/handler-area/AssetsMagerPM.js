//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import OldAssetsMagerPM from "../old-area/AssetsMagerPM" ;
import DataStorageAPI from "@/common/service/DataStorageAPI" ;
import PathConst from "../../../router/PathConst";

export default class AssetsMagerPM extends OldAssetsMagerPM {

  constructor() {
    super(PathConst.DS_HANDLER_ASSETS, 2);

    //分页查询组件
    this.pagePM.queryMethod = DataStorageAPI.queryHandlerMarkerList;

    this.data.resourceStyle = [
      {label: "NOSQL数据库", value: 'nosql'},
      {label: "关系型数据库", value: 'database'},
      {label: "文件数据", value: 'file'}
    ];

    this.dataBaseType = "nosql" ;

    //初始化查询表单
    this.initSearchForm( ) ;
  }
}
