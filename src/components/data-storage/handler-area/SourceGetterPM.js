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

      this.dataBaseType = "nosql" ;

      this.sourceList =  [
        {label:"NOSQL数据库",value:'nosql'},
        {label:"关系型数据库",value:'database'},
        {label:"文件数据",value:'file'}
      ];
      this.data.resourceStyle =  this.sourceList ;

      //分页查询部件
      this.pagePM.queryMethod = DataStorageAPI.queryHandlerMarkerList ;

      //初始化查询表单
      this.initFoldForm();
    }

    initAnsDataList() {
      super.initAnsDataList();
      this.data.resourceStyle = this.sourceList;
    }
}
