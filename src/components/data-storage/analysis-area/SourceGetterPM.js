/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import DataStorageAPI from "@/common/service/DataStorageAPI";
import OldSourceGetterPM from "../old-area/SourceGetterPM";

export default class SourceGetterPM extends OldSourceGetterPM{

    constructor() {
      super();

      //分页查询部件
      this.pagePM.queryMethod = DataStorageAPI.queryAnalysisMarkerList ;
    }
}
