//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import FormPmBase from "@/common/model/FormPmBase" ;
import NormalUtils from "@/common/utils/NormalUtils";
import PagePm from "@/common/model/PagePm";
import AnalysisAPI from "@/common/service/AnalysisAPI";


export default class MiningTaskMonitorPM extends FormPmBase{

  constructor( name,id ) {
    super(name,id);

    this.pagePM = new PagePm(AnalysisAPI.queryMonitorList );
     this.pagePM.sortAtt = "dir" ;
    // this.pagePM.noFilter = true ;//这的格式和通用的不同

    this.detailPM = new PagePm(AnalysisAPI.queryMonitorDetail) ;
    // this.detailPM.testHandler = this.testHandler ;

    this.initData(
      {
        //数据源类别
        stateList:[
          {label:"未运行",value:'0'},
          {label:"运行中",value:'1'},
          {label:"成功停止",value:'2'},
          {label:"报错停止",value:'3'}
        ]
      }
    ) ;

    this.stateMap = NormalUtils.array2Map(this.data.stateList,"value") ;

    //初始化查询表单
    this.initSearchForm( ) ;
  }

  /*初始化查询表单*/
  initSearchForm( query=true ) {
    this.data.searchForm = {
      modelName:"", //任务名 空查询所有 支持模糊
      modelProject:"",//项目名称 空查询所有 支持模糊
      modelDeptId:"",//创建人 空查询所有 支持模糊
      modelUserName:"",//创建人 空查询所有 支持模糊
      modelIsPublish:'1',//已发布
      modelPublishTime:'',//发布时间,
      syncStatus:'' //执行状态
    };
    if(query===true)
      this.queryList() ;
  }

  /**
   * 初始化视图
   */
  initView(){
    this.queryList() ;
  }

  /*查询列表*/
  queryList(){
    let send = this.initData(this.data.searchForm,{}) ;
    if(send.runTime){
      if(send.runTime.length>0)
        send.startTime = NormalUtils.dateFormat(send.runTime[0]) ;
      if(send.runTime.length>1)
        send.endTime = NormalUtils.dateFormat(send.runTime[1]) ;
    }
    delete send.runTime ;
     super.queryList(send,(datas)=>{
       for(let item of datas){
         if( item.triggerTime )
           item.triggerTime = NormalUtils.dateFormat(parseInt(item.triggerTime)) ;
         if( item.handlerTime )
           item.handlerTime = NormalUtils.dateFormat(parseInt(item.handlerTime)) ;
         item.statusName = "";
         if(this.stateMap.hasOwnProperty(item.status+""))
           item.statusName = this.stateMap[item.status+""].label ;
       }
     },{modelCreateTime:"desc"}) ;

    /*this.pagePM.queryList(this.data.searchForm,null,(datas)=>{
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
    },{modelCreateTime:"desc"}) ;*/

  }

  popDetailWin(item){
    super.popDetailWin(item) ;
    this.queryDetailList(item) ;
  }

  /**
   *
   * @param item
   */
  queryDetailList(item){
    this.detailPM.queryList({publishModelId:item.id},null,(datas)=>{
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
















  testHandler(){
    return NormalUtils.createTestData({
      id:"ssss"
    },10) ;
  }




}
