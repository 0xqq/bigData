//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import PmMainBase from "@/common/model/PmMainBase" ;
import NormalUtils from "@/common/utils/NormalUtils";
import PathConst from "@/router/PathConst";
import PagePm from "../../../common/model/PagePm";
import ProcessAPI from "@/common/service/ProcessAPI";

export default class TaskConfigPM extends PmMainBase{

  constructor( name,id ) {
    super(name,id);

    this.deleteMethod = ProcessAPI.deleteQuality;
    this.updateMethod = ProcessAPI.saveQualityConfig ;

    //数据加载
    this.pagePM = new PagePm(ProcessAPI.queryQualityList,1,'list') ;
    // this.pagePM.sortAtt = "value" ;
    // this.pagePM.noFilter = true ;//这的格式和通用的不同
    // this.pagePM.testHandler = this.testHandler ;

    this.initData(
      {
        tenantList:[],//租户列表
        timeUnitList:[
          {label:"每月",value:"1"},//1：月 2 :周 3: 天 4 :小时 5 :分钟 6 :一次性
          {label:"每周",value:"2"},
          {label:"每日",value:"3"},
          {label:"小时",value:"4"},
          {label:"分钟",value:"5"},
          {label:"一次性",value:"6"}
        ],
        runState:{
            none:"0",
            run:"1",
            stop:"2",
            "lb0":"未启动",
            "lb1":"正在执行",
            "lb2":"已停止"
        }
      }
    ) ;

    this.data.dateList = [] ;
    for(let i=0;i<31;i++){
      this.data.dateList.push({label:(i+1)+"",value:(i+1)}) ;
    }
    //初始化查询表单
    this.initSearchForm( ) ;

    //初始化配置表单
    this.initFormData() ;
  }

  /**
   * 初始化视图
   */
  initView(){
    this.queryList() ;
  }

  /*初始化查询表单*/
  initSearchForm( query=false ) {
    this.data.searchForm = {
      tenantName: "",
      taskName: "",
      userName: ""
    };
    if(query)
      this.queryList() ;
  }

  /*查询列表*/
  queryList(){
     this.pagePM.queryList(this.data.searchForm,null,(datas)=>{
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
     },{createTime:"desc"}) ;
  }

  /**
   * 改变任务状态
   * @param item
   */
  changeState(item) {
    let send = {
      id: item.id,
      status: (item.status !== this.data.runState.run ? "1" : "0")
    };
    this.query(send,
      (result) => {
        this.reQuery();
      }, null, ProcessAPI.runQuality);
  }

  /*------------------------------------------------------- form ---------------------------------*/

  /**
   * 初始化配置表单
   */
  initFormData(){
    this.initDataForm({
      id:"",
      startTime:"",
      timeUnit:"1"
    } ,"form") ;
  }

  /**
   * 弹出修改窗口
   * @param item
   */
  popEditeWin(item){
    super.popEditeWin(item) ;
    this.initFormData() ;
    NormalUtils.copyObjectAtt(item,this.data.form) ;
  }

  /**
   * 周期参数
   * @returns {*}
   */
  getUpdateParams(){
    let send = NormalUtils.copyObjectAtt(this.data.form ,{},true) ;
    send.beginTime = send.startTime ;
    if(typeof send.startTime!=="string")
      send.beginTime = NormalUtils.dateFormat(send.startTime,"yyyy-MM-dd hh:mm:ss");
    delete send.startTime ;
    return send ;
  }

  /*跳转编辑界面*/
  changeToSourceLink(item){
    NormalUtils.changeRouter(PathConst.DH_QUALITY_CREATE, {id:item.id,name:item.name} ) ;
  }

  //test
  testHandler(){
    return NormalUtils.createTestData({
      id:"dfdf", //标签ID
      name:"dfdfdfd",//标签名称
      tenant:"dfdfdfd",//租户
      createBy:"dfdfdf",//创建人
      createTime:"sdfdfd",//创建时间
      cycle:"sdfdf",//任务周期 cron表达式
      state:"1"//任务状态 0停止 1启动 .
    }) ;
  }

  clear(){
    super.clear() ;
    this.initSearchForm() ;//重新初始化数据
  }
}
