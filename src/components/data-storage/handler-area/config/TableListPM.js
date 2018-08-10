//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import OldTableListPM from "../../old-area/config/TableListPM";
import DataStorageAPI from "@/common/service/DataStorageAPI";
import PathConst from "@/router/PathConst";

export default class TableListPM extends OldTableListPM{

  constructor() {
    super();
    this.sourceFlag = 2 ;
    this.dataBaseType = "nosql" ;

    //分页查询组件
    this.pagePM.queryMethod = DataStorageAPI.queryHandlerConfigList ;
    //初始化查询表单
    this.initFormData() ;
  }

  /*跳转到表管理*/
  changeToTableView(item){
    this.data.showManager = true ;
    NormalUtils.changeRouter(PathConst.DS_HANDLER_CONFIG_TABLE_MGER,{data:item,path:PathConst.DS_HANDLER_CONFIG_TABLE_LIST}) ;
  }

  changeBackMain(){
    NormalUtils.changeRouter(PathConst.DS_HANDLER_CONFIG_TABLE_LIST ) ;
  }

}
