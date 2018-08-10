//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import DataStorageAPI from "@/common/service/DataStorageAPI" ;
import OldDirectoriesPM from "../../old-area/config/DirectoriesPM";

export default class DirectoriesPM extends OldDirectoriesPM{

  constructor( ) {
    super();
    this.sourceFlag = 2 ;
    //分页查询组件
    this.pagePM.queryMethod = DataStorageAPI.queryHandlerDirList ;
  }
}
