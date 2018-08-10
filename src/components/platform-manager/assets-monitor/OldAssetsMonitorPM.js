/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import FormPmBase from "@/common/model/FormPmBase" ;
import PagePm from "@/common/model/PagePm";
import NormalUtils from "../../../common/utils/NormalUtils";
import PlatformAssetsAPI from "@/common/service/PlatformAssetsAPI" ;


export default class OldAssetsMonitorPM extends FormPmBase {

  constructor(name,id) {
    super(name,id);

    //IP列表s
    this.pagePM = new PagePm(PlatformAssetsAPI.queryClusterIP,1,"reouceMonit");
    //IP列表--查看详情--部门名称
    this.detailPM = new PagePm(PlatformAssetsAPI.queryClusterIPdetail,1,"orgInfo") ;
    //IP列表--查看详情--软件名称
    this.detailPMSwName = new PagePm(PlatformAssetsAPI.queryClusterIPdetail,1,"softInfo") ;

    //软件名称列表
    this.pagePMSW = new PagePm(PlatformAssetsAPI.queryClusterSoft,1,'reouceMonit');

    //部门名称列表
    this.pagePMDM = new PagePm(PlatformAssetsAPI.queryClusterOrg,1,'reouceMonit');
    //部门名称--查看详情-部门名称
    this.detailPMOrg = new PagePm(PlatformAssetsAPI.queryClusterOrgdetail,1,'softInfo');


    this.initData({
      autoId: NormalUtils.createOID("chart_id"),
      currentView: "ip",
      taskName:"",
      //数据源类别
      stateList:[
        {label:"未执行",value:'0'},
        {label:"成功",value:'1'},
        {label:"失败",value:'2'},
        {label:"执行中",value:'3'}
      ],
      ipTitle:''
    });
    this.stateMap = NormalUtils.array2Map(this.data.stateList,"value") ;
    //初始化查询表单 aa
    this.initSearchForm( ) ;    //ip
    this.initSearchFormSW( ) ;  //软件
    this.initSearchFormDM( ) ;  //部门

  }

  /*初始化查询表单*/
  initSearchForm( query=true ) {  // ip
    this.data.searchForm = {
      partition:1,
      softName:"",
      ip:"",
      orgName:""
    };
    if(query===true)
      this.queryList() ;
  }

  initSearchFormSW( query=true ) {  //软件
    this.data.searchForm = {
      partition:1,
      softName:"",
      ip:"",
      orgName:""
    };
    if(query===true)
      this.queryListSW() ;
  }

  initSearchFormDM( query=true ) {  //部门lll
    this.data.searchForm = {
      partition:1,
      softName:"",
      ip:"",
      orgName:""
    };
    if(query===true)
      this.queryListDM() ;
  }


  /**
   * 初始化视图 aa
   */
  initView(){
    this.queryList() ;
    this.queryListSW();
    this.queryListDM();
  }

  /**
   * 定义查询方法
   */
  queryList(){
    this.pagePM.queryList(this.data.searchForm) ;//IP查询*/
  }

  queryListSW(){
    this.pagePMSW.queryList(this.data.searchForm) ;//软件查询*/
  }

  queryListDM(){
    this.pagePMDM.queryList(this.data.searchForm) ;//部门查询*/
  }


  /**
   *IP查看详情
   */
  popDetailWin(item){
    this.data.ipTitle = item;
    super.popDetailWin(item) ;
    this.queryDetailList(item) ;
    this.queryDetailListSwName(item);
  }

  /**
   *
   * IP-------@param item
   */
  queryDetailList(item){
    this.detailPM.queryList({partition:1,ip:item},(datas)=>{
    } ) ;
  }
  queryDetailListSwName(item){
    this.detailPMSwName.queryList({partition:1,ip:item},(datas)=>{
    } ) ;
  }

  /**
   * 切换视图
   */
  changeView(tab, event) {
    console.log(tab, event);
  }

  //---------------------------------------------------------- test -----------------------------------------
  testHandler(){
    return NormalUtils.createTestData({
      "id": 1,
      "name": "sds",
      "state": "sdsd",
      "startTime":"sdsd",
      "runningSeconds": "sdsdsd" ,
      "start":"sdsd",
      "creatorID": "sdsds",
      "createName": "sdsds"

    },10) ;
  }

}
