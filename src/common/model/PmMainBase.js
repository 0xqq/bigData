//------------------------------------------------------------------
//title:
//author: zc
//date:
//desc:
//------------------------------------------------------------------

import FormPmBase from "./FormPmBase";
import NormalUtils from "@/common/utils/NormalUtils";

export default class PmMainBase extends FormPmBase {

    constructor(name) {
      super(name) ;
    }

  /*
   * 切换子页面
   * */
  changeView(item){
    NormalUtils.changeRouter( item.path ) ;
  }

}
