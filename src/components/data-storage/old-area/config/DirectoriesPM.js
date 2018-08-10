//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import PathConst from "@/router/PathConst";
import DataStorageAPI from "@/common/service/DataStorageAPI" ;
import PagePm from "@/common/model/PagePm";
import ShareViewPM from "../../common-comps/ShareViewPM";

export default class DirectoriesPM extends ShareViewPM{

  constructor( ) {
    super();
    this.sourceFlag = 1 ;

    //分页查询组件
    this.pagePM = new PagePm(DataStorageAPI.queryDirResourceList) ;

    this.initData({
    });

    //查询表单
    this.initSearchForm() ;
  }


  /*初始化查询表单*/
  initSearchForm( query=true ) {
    if (!this.data.searchForm)
      this.data.searchForm = {};
    this.initData({
      orgId: "",
      foldName: "",
    }, this.data.searchForm);
    if (query === true)
      this.queryList();
  }

  /**
   * 第一次进入 初始化数据
   */
  initExecute(query,inited){
    //默认查询数据
    this.queryList() ;
  }

  /*查询列表*/
  queryList(){
    this.pagePM.queryList(this.data.searchForm) ;
  }


  /*跳转到资源标引*/
  changeToSourceLink(item){
  }

  clear(){
    super.clear() ;
    this.initFormData() ;//重新初始化数据
  }
}
