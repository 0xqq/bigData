//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import FormPmBase from "@/common/model/FormPmBase" ;
import NormalUtils from "@/common/utils/NormalUtils";
import PagePm from "@/common/model/PagePm";
import ProcessAPI from "@/common/service/ProcessAPI";

export default class TaskMoniorPM extends FormPmBase{

  constructor( name,id ) {
    super(name,id);

    this.pagePM = new PagePm(ProcessAPI.queryMoniorList );
    this.pagePM.sortAtt = "value" ;
    this.pagePM.noFilter = true ;//这的格式和通用的不同

    this.detailPM = new PagePm(ProcessAPI.queryMoniorDetail) ;
    // this.detailPM.testHandler = this.testHandler ;

    this.initData(
      {
        //数据源类别
        stateList:[
          {label:"未执行",value:'0'},
          {label:"成功",value:'1'},
          {label:"失败",value:'2'},
          {label:"执行中",value:'3'}
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
      runTime:[],
      taskName:"",
      status:"",
      startTime:"",
      endTime:"",
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
     },{triggerTime:"desc"}) ;
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

















  testHandler(){
    return NormalUtils.createTestData({
      id:"ssss"
    },10) ;
  }




}
