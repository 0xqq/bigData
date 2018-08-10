/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import FormPmBase from "@/common/model/FormPmBase" ;
import PagePm from "@/common/model/PagePm";
import PlatformAPI from "@/common/service/PlatformAPI";
import NormalUtils from "../../../common/utils/NormalUtils";
import ProcessAPI from "@/common/service/ProcessAPI";
import AnalysisAPI from "@/common/service/AnalysisAPI";

export default class TaskMonitorPM extends FormPmBase {

  constructor(name,id) {
    super(name,id);

    //接入任务 -- 分页查询组件
     this.pagePMIM = new PagePm(PlatformAPI.importTaskStaticList,1,'result');
    // this.pagePM.resultListHandler = (result)=>{return this.resultItemHandler(result) };
    // this.pagePM.testHandler = this.testHandler ;


    //处理任务  -- 分页查询组件
    this.pagePM = new PagePm(ProcessAPI.queryMoniorListAll);
    this.pagePM.sortAtt = "value" ;
    this.pagePM.noFilter = true ;//这的格式和通用的不同
    this.detailPM = new PagePm(ProcessAPI.queryMoniorDetail) ;


    //分析任务   --分页查询
    this.pagePMAN = new PagePm(AnalysisAPI.queryTaskListLianDong );
    this.pagePMAN.sortAtt = "dir" ;

    this.detailPMAN = new PagePm(AnalysisAPI.queryMonitorDetail) ;





    this.initData({
      autoId: NormalUtils.createOID("chart_id"),
      currentView: "import",
      taskName:"",

      //数据源类别
      stateList:[
        {label:"未执行",value:'0'},
        {label:"成功",value:'1'},
        {label:"失败",value:'2'},
        {label:"执行中",value:'3'}
      ]
    });
    this.stateMap = NormalUtils.array2Map(this.data.stateList,"value") ;
    //初始化查询表单 aa
    this.initSearchFormHD();
    this.initSearchFormIM();
    this.initSearchFormAN();
    this.initSearchFormANde();

  }

  /*初始化查询表单*/
  initSearchFormHD( query=true ) {  //处理任务
    this.data.searchForm = {
      taskName:"",
      status:''
    };
    if(query===true)
      this.queryListHD() ;
  }

  initSearchFormIM( query=true ) {  //接入任务
    this.data.searchForm = {
      taskName:"",
      status:'',
      modelStatus:''
    };
    if(query===true)
      this.queryListIM() ;
  }

  initSearchFormAN( query=true ) {  //分析任务
    this.data.searchForm = {
      modelName:"",
      modelStatus:'',
      status:''
    };
    if(query===true)
      this.queryListAN() ;
  }


  initSearchFormANde( query=true ) {  //分析任务详情（貌似没用）
    this.data.searchForm = {
      taskName:""
    };
    if(query===true)
      this.queryListANde() ;
  }


  /**
   * 初始化视图 aa
   */
  initView(){
     this.queryListHD() ;
     this.queryListIM();
     this.queryListAN();
     this.queryListANde();
  }


  /**
   * 定义查询方法
   */
  //处理任务   查询
  queryListHD(){
    // this.pagePM.queryList({taskName:this.data.taskName}) ;查询
    let send = {
      taskName:this.data.searchForm.taskName,
      status:this.data.searchForm.status,
      startTime:"",
      endTime:""
    } ;

    // let send = this.initData(this.data.searchForm,{}) ;          //处理任务
    // if(send.runTime){
    //   if(send.runTime.length>0)
    //     send.startTime = NormalUtils.dateFormat(send.runTime[0]) ;
    //   if(send.runTime.length>1)
    //     send.endTime = NormalUtils.dateFormat(send.runTime[1]) ;
    // }
    // delete send.runTime ;
    this.pagePM.queryList(send,null,(datas)=>{
      /*for(let item of datas){
        if( item.triggerTime )
          item.triggerTime = NormalUtils.dateFormat(parseInt(item.triggerTime)) ;
        if( item.handlerTime )
          item.handlerTime = NormalUtils.dateFormat(parseInt(item.handlerTime)) ;
        item.statusName = "";
        if(this.stateMap.hasOwnProperty(item.status+""))
          item.statusName = this.stateMap[item.status+""].label ;
      }*/
    },{triggerTime:"desc"}) ;
  }

  //接入任务    查询
  queryListIM(){
    this.pagePMIM.queryList(this.data.searchForm) ;   //接入任务查询
  }

  //分析任务   查询
  queryListAN(){
    this.pagePMAN.queryList(this.data.searchForm,null,(datas)=>{  //分析任务
      for(let item of datas ){
        item.timeUnit = item.cycle?item.cycle+"":"" ;
        item.status = item.status+"" ;//统一字符串
        item.name = item.taskName ;
        item.createTime = NormalUtils.dateFormat(parseInt(item.createTime)) ;
        item.startTime = NormalUtils.dateFormat(parseInt(item.startTime)) ;
        item.canRun = false ;
        if(item.startTime && item.timeUnit )
          item.canRun = true ;
      }
    },{modelCreateTime:"desc"}) ;
  }


  //分析任务详情 （貌似没用到）
  queryListANde(){
    this.detailPMAN.queryList(this.data.searchForm,null,(datas)=>{
      for(let item of datas){
        item.handleCodeName = "" ;
        if( item.triggerTime )
          item.triggerTime = NormalUtils.dateFormat(parseInt(item.triggerTime)) ;
        if( item.handlerTime )
          item.handlerTime = NormalUtils.dateFormat(parseInt(item.handlerTime)) ;
        if(item.handleTime)
          item.handleTime = NormalUtils.dateFormat(parseInt(item.handleTime)) ;
        if(item.handleCode){
          item.handleCode = item.handleCode+"" ;
          if(item.handleCode==="200")
            item.handleCodeName = "成功" ;
          else  if(item.handleCode==="500")
            item.handleCodeName = "失败" ;
          else  if(item.handleCode==="0")
            item.handleCodeName = "正在进行中" ;
        }
      }
    },{publishStartTime:"desc"} ) ;
  }


  /**
   *查看详情
   */
  popDetailWin(item){
    super.popDetailWin(item) ;
    this.queryDetailList(item) ;
  }

  /**
   *
   * @param item
   */
  //接入任务查看详情
  queryDetailList(item){
    this.detailPM.queryList({},{id:item.id},(datas)=>{
      for(let item of datas){
        item.handleCodeName = "" ;
        if( item.triggerTime )
          item.triggerTime = NormalUtils.dateFormat(parseInt(item.triggerTime)) ;
        if( item.handlerTime )
          item.handlerTime = NormalUtils.dateFormat(parseInt(item.handlerTime)) ;
        if(item.handleTime)
          item.handleTime = NormalUtils.dateFormat(parseInt(item.handleTime)) ;
        if(item.handleCode){
          item.handleCode = item.handleCode+"" ;
          if(item.handleCode==="200")
            item.handleCodeName = "成功" ;
          else  if(item.handleCode==="500")
            item.handleCodeName = "失败" ;
          else  if(item.handleCode==="0")
            item.handleCodeName = "正在进行中" ;
        }
      }
    } ) ;
  }

  //分析任务查看详情
  queryDetailListAN(item){
    this.detailPMAN.queryList({publishModelId:item.id},null,(datas)=>{
      for(let item of datas){
        item.handleCodeName = "" ;
        if( item.triggerTime )
          item.triggerTime = NormalUtils.dateFormat(parseInt(item.triggerTime)) ;
        if( item.handlerTime )
          item.handlerTime = NormalUtils.dateFormat(parseInt(item.handlerTime)) ;
        if(item.handleTime)
          item.handleTime = NormalUtils.dateFormat(parseInt(item.handleTime)) ;
        if(item.handleCode){
          item.handleCode = item.handleCode+"" ;
          if(item.handleCode==="200")
            item.handleCodeName = "成功" ;
          else  if(item.handleCode==="500")
            item.handleCodeName = "失败" ;
          else  if(item.handleCode==="0")
            item.handleCodeName = "正在进行中" ;
        }
      }
    },{publishStartTime:"desc"} ) ;
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
