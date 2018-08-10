/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import QueryPmBase from "@/common/model/QueryPmBase";
import PagePm from "@/common/model/PagePm";
import PlatformAPI from "@/common/service/PlatformAPI";
import echarts from "echarts" ;

export default class DataFileMonitorPM extends QueryPmBase {

  constructor() {
    super();
    this.dbPagePM = new PagePm(PlatformAPI.queryDbTypeNodeList, 1,"dataBaseInfo");
    this.dbPagePM.pageSize = 5 ;

    this.filePagePM = new PagePm(PlatformAPI.queryDbTypeNodeList, 1,"dataBaseInfo");
    this.filePagePM.pageSize = 5 ;

    // this.dbPagePM.testHandler = this.testListHandler ;

    //表清单列表
    this.listPagePM = new PagePm(PlatformAPI.getListOfTables,1,"result");
    this.totalPageNum = new PagePm(PlatformAPI.getListOfTables);

    this.initData({
      autoId:NormalUtils.createOID("chartid"),
      currentView: "database",
      currentIp:"",
      currentType:"",
      typeList: [],
      ipType:'',
      totalBiao:'0',
      /*biaoData:[]*/
    });
  }

  /**
   * 初始化视图
   */
  initView(){
    this.initDbView() ;
  }

  /**
   * 切换视图
   */
  changeView(){
    if(this.data.currentView==="database")
      this.initDbView() ;
    else
      this.initFileView() ;
  }

  /**
   * 初始化 -- 只初始化一次 切换不查询
   */
  initFileView() {
    this.queryFileList() ;
  }

  /**
   * 初始化数据视图
   */
  initDbView() {
    this.dbPagePM.reset();
    this.clearChartData();

    this.clearCodeIp();

    //查询类型列表及统计信息
    this.queryDbTypeList();
  }

  /**
   * 查询文件 对应节点列表
   */
  queryFileList(){
    this.filePagePM.queryList({type:"nfs"},null,(datas)=>{
      if(datas){
        for(let item of datas ){
          this.fixedNum(item,"cup"," %") ;
          this.fixedNum(item,"usedMemory"," %") ;
          this.fixedNum(item,"usedDisk"," GB") ;
        }
      }
    }) ;
  }

  fixedNum(item ,att ,endstr=null){
    let num = parseFloat(item[att]) ;
    if(isNaN(num))
      num = "" ;
    else{
      num = Math.round(num).toFixed(2) ;
      if(endstr)
        num = num + endstr ;
    }
    item[att] = num ;
  }

  /**
   * 查询数据库类型列表(四个tab切换拿到的key，count，value很重要)
   */
  queryDbTypeList() {
    this.query({},
      (result) => {
        let list = result.resultdata.installcount;
        this.data.typeList = list;
        // console.log(this.data.typeList);
        if(list && list.length>0)
          this.itemTypeClick(list[0]) ;
        // console.log(list[0])
      },
      null, PlatformAPI.queryDbTypeStic);
  }

  /**
   * 某个类型软件点击提交(人大金仓 + MY SQL +Oracle +postgreSQL)四个tab切换
   * @param item
   */
  itemTypeClick(item) {
    this.data.currentType = item.value ;
    this.data.ipType = item.value;
    //现在拿到我想要的type类型了，重点！！！
    //console.log(item.value);
    this.dbPagePM.queryList({type:item.value},null,(datas)=>{
      if(datas){
        for(let item of datas ){
          this.fixedNum(item,"cup"," %") ;
          this.fixedNum(item,"usedMemory"," %") ;
          this.fixedNum(item,"usedDisk"," GB") ;
        }
      }
    }) ;
    //echarts
    this.clearChartData() ;
    //表清单
     this.clearCodeIp(item.value);
    this.data.totalBiao = '0';
  }


  /**
   * 某个节点点击处理(点击table某一行的@row-click事件，很重要Q)
   * @param item
   */
  itemNodeClick(item) {
    let date = new Date() ;
    let send = {
      ip: item.ip,
      limit:1000000,
      start:Math.floor((date.getTime()-(7*24*3600000))/1000),
      end: Math.floor(date.getTime()/1000)+""
    } ;
    this.data.currentIp = item.ip ;
    this.query(send,
      (result) => {
        let list = result.resultdata.cpu ;
        for(let item of list ){
          item.time = item.clock ;
          let _value = parseFloat(item.value) * 100 ;
          item.value = (isNaN(_value)?0:_value) ;
        }
        this.renderChart(list);
      },
      () => {
        this.clearChartData();
      }, PlatformAPI.queryDbTypeNodeCpu);


    //ip点击处理 +表清单
    this.listPagePM.queryList({ip:item.ip,type:this.data.ipType},null,(result)=>{
        // console.log(result);

      }
    );
    //表总数
   this.query({
         page: '1',
         pageSize: '20',
         startIndex: '0',
         ip:item.ip,
         type:this.data.ipType},
     (result) => {
       // console.log(result.resultdata.totalCount);
       this.data.totalBiao = result.resultdata.totalCount;
     },null,PlatformAPI.getListOfTables)

  }


  /**
   * 初始化图表
   */
  renderChart(datas,values){
    if(!this.chart){
      let chartDom = document.getElementById(this.data.autoId);
      this.chart = echarts.init(chartDom);
    }
    this.chartOptions = this.getOptions() ;
    this.chartOptions.xAxis.data = this.getFormatLabels(datas) ;
    this.chartOptions.series[0].data = datas;
    this.chart.setOption(this.chartOptions);
  }

  /**
   * 清空图表数据
   */
  clearChartData(){
    this.data.currentIp = "" ;
     if( this.chartOptions){
       this.chartOptions.series[0].data = [] ;
       this.chart.setOption( this.chartOptions );
     }
  }

  //初始化
  clearCodeIp(item){
    this.data.ipType = item;
    //listPagePM 重置
    this.listPagePM.reset();
  }



  /**
   * 格式化菜单
   */
  getFormatLabels( lastData ) {
    if (!lastData || lastData.length === 0)
      return [];

    let _map = {};
    let _date = new Date();
    let len = lastData.length;
    let labels = [];
    for (let i = 0; i < len; i++) {
      _date.setTime(parseInt(lastData[i].time) * 1000);
      let _lb = NormalUtils.dateFormat(_date, "MM-dd");
      if (!_map.hasOwnProperty(_lb)) {
        _map[_lb] = _lb ;
        labels.push( _lb ) ;
      }
      else {
        labels.push("") ;
      }
    }
    return labels ;
  }

  /**
   * 不封装了直接写
   */
  getOptions(){
    return {
      color: ["#990099","#ffcc00", "#ff8000","#330099","#0066b3", "#00cc00"],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        show:false
      },
      grid: {
        show:true,
        left: '20',
        right: '20',
        top:"20",
        bottom: '5',
        containLabel: true,
        borderColor:"#fff",
        borderWidth:0
      },
      /*grid: {
        "x": "4%",
        "y": "5%",
        "x2": "1%",
        "y2": "10%"
      },*/
      series:[
        {
          name:"CPU",
          type:'line',
          hoverAnimation:false,
          step:true,
          showSymbol:false,
          markPoint:{
            show:false
          }
        }
      ],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#dddddd',
            width: 1,
            type: 'solid'
          }
        },
        axisLabel:{
          color:"#000",
          fontSize:12,
          interval:(index, value)=>{
            if(value)
              return true;
            return false
          }
        },
        splitLine:{
          show:true,
          lineStyle:{
            color: ['#dddddd'],
            width:0.5,
            type: 'dashed'
          }
        }
      },
      yAxis: {
        min:0,
        max:100,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#dddddd',
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: {
          color: "#000",
          fontSize: 13,
          fontWeight: "bold",
          formatter:"{value}%",
          showMinLabel:false
        },
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#dddddd'],
            width: 0.5,
            type: 'dashed'
          }
        }
      }
    };
  }


}
