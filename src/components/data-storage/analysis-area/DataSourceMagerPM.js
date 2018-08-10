//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import FormPmBase from "@/common/model/FormPmBase" ;
import PagePm from "@/common/model/PagePm";
import DataStorageAPI from "@/common/service/DataStorageAPI";
import NormalUtils from "@/common/utils/NormalUtils";
import ShareViewPM from "../common-comps/ShareViewPM";

export default class DataSourceMagerPM extends ShareViewPM{

  constructor( ) {
    super();

    this.initData(
      {
        chartDomId:NormalUtils.createOID("chartid"),
        currentState: "search"
      }
    ) ;

  }

}
