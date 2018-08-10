//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import OldTableManagerPM from "../../old-area/config/TableManagerPM";
import PathConst from "@/router/PathConst";
import DataStorageAPI from "@/common/service/DataStorageAPI";

export default class TableManagerPM extends OldTableManagerPM{

  constructor( name,id ) {
    super(name,id);
    this.sourceFlag = 2 ;
  }

  /**
   * 统一返回调用
   **/
  changeBackMain(){
    this.clearView() ;
    NormalUtils.changeRouter( PathConst.DS_HANDLER_CONFIG_TABLE_LIST) ;
  }
}
