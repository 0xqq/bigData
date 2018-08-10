/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import QueryPmBase from "@/common/model/QueryPmBase" ;
import PieChart from "./charts/PieChart" ;
import TableChart from "./charts/TableChart" ;
import QueryTimer from "@/common/utils/QueryTimer";
import PlatformAPI from "@/common/service/PlatformAPI";
import NormalUtils from "../../../common/utils/NormalUtils";

export default class OldSourceMonitorPM extends QueryPmBase{

  constructor() {
    super() ;

    //当前集群名字
    this.chartMap = {} ;//当前添加的所有图表
    this.queryMap = {} ;//查询器列表

    this.initData({
      chartList:[ ],
      numList:[
        {name:"总数据量（兆）",val:"0"},
        {name:"总数据量（条）",val:"0"},
        {name:"总文件数（个）",val:"0"}
      ]
    }) ;
  }

  /**
   * 初始化视图
   */
  initView() {
    //初始化数据查询配置
    this.initChartQuery() ;
    //初始化视图配置
    this.initChartParam() ;
    //直接开始查询
    this.startQuery();
    //统计数量
    this.queryNum() ;
  }

  /**
   * 查询统计总数
   */
  queryNum(){
    this.query({startDate:"",endDate:"",partition:"1"},(result)=>{
       let datas = result.resultdata ;
      this.data.numList[0].val = datas.fileTotalSize +"";
      this.data.numList[1].val = datas.dbTotalCount+"";
      this.data.numList[2].val = datas.fileTotalCount  +"";
    },null,PlatformAPI.queryOldSticNum) ;
  }

  /**
   * 初始化查询器
   */
  initChartQuery(){

    //  机构占比
    this.createQuery("org",PlatformAPI.queryOrgZhanbi,{startDate:"",endDate:"",partition:1},(result)=>{
        this.setChartData("org", this.initPieResult2(result ));
     }).startQuery()  ;

    //  主题占比
    this.createQuery("theme",PlatformAPI.getDataSourceWeight,this.getSend("themeWeight"),(result)=>{
      this.setChartData("theme", this.initPieResult(result ));
    }).startQuery()  ;

    //  类型占比
    this.createQuery("style",PlatformAPI.getDataSourceWeight,this.getSend("typeWeight"),(result)=>{
      this.setChartData("style", this.initPieResult(result ));
    }).startQuery()  ;

    //  方式占比
    this.createQuery("type",PlatformAPI.getDataSourceWeight,this.getSend("interfaceWegith"),(result)=>{
      this.setChartData("type", this.initPieResult(result ));
    }).startQuery()  ;

    //  委办局导出条数排行前五名
    this.createQuery("indexTop",PlatformAPI.queryOrgExopotStic,
      {startDate:"",endDate:"",type:"database,nosql",partition:1,start:0,top:5},
      (result)=> {
        this.setChartData("indexTop",  this.initTableResult2(result) );
      }
    ).startQuery()  ;
     // 委办局导出文件数排行前五名
    this.createQuery("fileTop",PlatformAPI.queryOrgExopotStic,
      {startDate:"",endDate:"",type:"file",partition:1,start:0,top:5},
      (result)=> {
        this.setChartData("fileTop",  this.initTableResult2(result) );
      }
    ).startQuery()  ;
    //  导出类型占比
    this.createQuery("exportStyle",PlatformAPI.getExportTypeStic,{startDate:"",endDate:"",partition:1},
      (result)=> {
        this.setChartData("exportStyle", this.initPieResult2(result ));
      }
    ).startQuery()  ;
    //  导出方式占比
    this.createQuery("exportType",PlatformAPI.queryHandlerAnNum,{startDate:"",endDate:"",partition:1},
      (result)=> {
        this.setChartData("exportType", this.initPieResult2(result ) );
      }
    ).startQuery()  ;
  }

  /**
   * 查询图表数据
   */
  initChartParam(){
    this.createChartItem("org","数据来源机构占比",PieChart ) ;
    this.createChartItem("theme","数据来源主题占比",PieChart ) ;
    this.createChartItem("style","数据来源类型占比",PieChart ) ;
    this.createChartItem("type","数据来源方式占比",PieChart ) ;
    this.createChartItem("indexTop","委办局导出次数排行前五名",TableChart,"",{},this.getBlankList()) ;
    this.createChartItem("fileTop","委办局导出文件次数排行前五名",TableChart,"",{},this.getBlankList() ) ;
    this.createChartItem("exportStyle","导出类型占比",PieChart ) ;
    this.createChartItem("exportType","导出方式占比",PieChart ) ;
  }

  /**
   *  解析饼图数据
   * @param datas
   * @returns {*}
   */
  initPieResult(result){
    //添加多层过滤判断
    if(!result || !result.resultdata || !Array.isArray(result.resultdata))
      return [] ;
    let arr = [] ;
    for(let item of result.resultdata){
      if(item.key && !isNaN(item.value))
        arr.push({name:item.key,value:parseFloat(item.value)}) ;
    }
    return arr ;
  }


  /**
   * 第二种解析格式
   * @param result
   * @returns {Array}
   */
  initPieResult2(result){
    if(!result || !result.resultdata || !result.resultdata.res)
      return [] ;
    let arr = [] ;
    for(let item of result.resultdata.res){
      if(item && item.length===2){
        let value = parseFloat(item[1]) ;
        if(isNaN(value))
          value = 0 ;
        arr.push({name:item[0],value:value}) ;
      }
    }
    return arr ;
  }

  /**
   * 表格 第二种解析格式 两个人写的
   * @param result
   * @returns {Array}
   */
  initTableResult2(result){
    let len = 0 ;
    let arr = [] ;
    if(result && result.resultdata && result.resultdata.res){
      len = result.resultdata.res.length ;
      for(let item of result.resultdata.res){
        if(item && item.length===2){
          let value = parseFloat(item[1]) ;
          if(isNaN(value))
            value = 0 ;
          arr.push({key:item[0],val:value}) ;
        }
      }
    }
    if(len<5){
      for(let i=0;i<(5-len);i++){
        arr.push({key:"",val:""}) ;
      }
    }
    return arr ;
  }

  /**
   * 创建查询器
   */
  createQuery( id,method,param,dataHandler,cycle=false, dur = -1, first=true){
    if(!this.queryMap.hasOwnProperty(id)){
      let query = new QueryTimer(id,method,param,dataHandler,cycle,dur,first) ;
      this.queryMap[id] = query ;
    }
    return this.queryMap[id] ;
  }

  /**
   * 查询数据
   */
  startQuery(){
    // for(let id in this.queryMap){
    //   this.queryMap[id].startQuery() ;
    // }
  }

  /**
   * 设置图表数据
   * @param id
   * @param source
   * @param serise
   */
  setChartData(id,source,serise=null,detail="") {
    if (!this.chartMap.hasOwnProperty(id))
      return;
    let chart = this.chartMap[id];
    if (serise)
      chart.series = serise;
    chart.source = source;
  }

  /**
   * 创建视图
   */
  createChartItem(id,title,view, series="",style={},data=[],options=""){
    if(!this.chartMap.hasOwnProperty(id)){
      let _query = this.queryMap[id] ;
      let _item = {
        id:id,
        style:style,
        title: title,//标题
        view: view,//组件
        source:data,//数据源
        series:series,
        query:_query.data,
        options:options
      };
      this.chartMap[id] = _item ;
      this.data.chartList.push(_item) ;
    }
    return this.chartMap[id] ;
  }

  /**
   * 获得默认空白数据
   */
  getBlankList(){
    return NormalUtils.createTestData({
      key:"",
      val:""
    },5)
  }

  /**
   * 获得查询参数
   * @param type
   * @returns {{type: *, start: string, end: string}}
   */
  getSend(type) {
    return {
      type: type, start: "",
      end: ""
    };
  }

}
