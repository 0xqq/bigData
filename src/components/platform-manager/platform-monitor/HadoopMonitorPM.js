/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import QueryPmBase from "@/common/model/QueryPmBase" ;
import PieChart from "./hadoop/PieChart" ;
import LineChart from "./hadoop/LineChart" ;
import LabelChart from "./hadoop/LabelChart";
import StateTableChart from "./hadoop/StateTableChart" ;
import DiskTableChart from "./hadoop/DiskTableChart";
import PlatformAPI from "../../../common/service/PlatformAPI";
import QueryTimer from "@/common/utils/QueryTimer";
import NormalUtils from "@/common/utils/NormalUtils";

export default class HadoopMonitorPM extends QueryPmBase{

    constructor() {
       super() ;

       this.chartWidth = 180 ;
       this.longChart = 370 ;

       //当前集群名字
       this.clusterName = "" ;
       this.serviceList = [] ;
       this.serviceMap = {} ;//当前服务列表
       this.chartMap = {} ;//当前添加的所有图表
       this.queryMap = {} ;//查询器列表

       this.initData({
         chartList:[ ]
       }) ;
    }

  /**
   * 初始化视图
   */
  initView() {

    //先查名字
    this.query(null,
      (result) => {
        this.clusterName = result["cluster_name"];
        this.initQuery() ;
        this.initChartParam() ;
      }, null, PlatformAPI.getClusterName);
  }

  /**
   * 查询测试
   * @param id
   */
  testQuery( id){
    this.queryMap[id].startQuery() ;
  }



  /**
   * 查询图表数据  不单独写类了 都这里处理
   */
  initChartParam(){

    //查询节点数
    this.createChartItem("nodeNum","集群节点数量",LabelChart,"",{},"") ;
    this.createChartItem("cpu","CPU 使用情况",LineChart,"",{},[],{formatter:"{value}%"}) ;
    this.createChartItem("memory","内存使用情况",LineChart,"",{},[],{formatter:"{value}GB"}) ;
    this.createChartItem("network","网络使用情况",LineChart,"",{},[],{formatter:"{value}KB"} ) ;

    //查询服务数
    this.createChartItem("serverNum","集群服务数量",LabelChart,"",{},"") ;

    //查询服务列表
    this.query(this.getLocalParam(),
      (result) => {
          let _list = result.items ;
          this.serviceList = _list ;
          this.serviceMap = {} ;
          if(_list){
            for(let item of _list){
              this.serviceMap[item["service_name"]] = item ;
            }
            this.initServiceData() ;
            this.startQuery( ) ;
          }
      }, null, PlatformAPI.getServiceList);
  }

  /**
   * 查询服务相关指标
   */
  initServiceData(){

    //hdfs服务相关
    if(this.serviceMap.hasOwnProperty("HDFS")){
      //HDFS DataNodes Live
      this.createChartItem("hdfsDataNodes","DataNodes Live",LabelChart,"",{},"") ;
      //HDFS 磁盘使用
      this.createChartItem("hdfsDisk","HDFS 磁盘使用情况",PieChart) ;
      //HDFS 节点磁盘使用情况
      this.createChartItem("hdfsNodeDisk","HDFS 节点磁盘使用情况",DiskTableChart,"",{width:this.longChart+"px"}) ;
    }

    //hbase cpu 网络 磁盘 分类折线图
    if(this.serviceMap.hasOwnProperty("HBASE")){
      this.createChartItem("hbaseCpu","HBASE CPU使用情况",LineChart,"",{},[],{formatter:"{value}%"}) ;
      this.createChartItem("hbaseDisk","HBASE 磁盘使用情况",LineChart,"",{},[],{formatter:"{value}MBPS"}) ;
      this.createChartItem("hbaseNetwork","HBASE 网络使用情况",LineChart,"",{},[],{formatter:"{value}KB"} ) ;
    }

    //yarn
    if(this.serviceMap.hasOwnProperty("YARN"))
      this.createChartItem("yarnMemory","YARN 内存",PieChart) ;//

    //hive
    if(this.serviceMap.hasOwnProperty("HIVE")){
      this.createChartItem("hiveNodes", "HIVE 节点组件运行状态",StateTableChart,"",{width:this.longChart+"px"}) ;
    }
  }

  /**
   * 开始查询数据
   */
  startQuery(){
    //
    //  serverNum nodeNum cpu memory hdfsDataNodes hdfsDisk hdfsNodeDisk yarnMemory hbaseCpu hbaseNetwork
    // this.testQuery("hdfsDisk") ;
    // return ;
    for(let id in this.queryMap){
      this.queryMap[id].startQuery() ;
    }
  }

  /**
   * 一次性初始化
   */
  initQuery(){
    let cycleDur = 30 ;
    this.createQuery("nodeNum",PlatformAPI.getNodeNum, this.getLocalParam(),
      (result)=>{
        this.setChartData("nodeNum",result["total_hosts"]) ;
      }
    ) ;
    this.createQuery("cpu",PlatformAPI.getClusterInfo,
      ()=>{
        return  this.getLocalParam("cpu",this.getTimeParam());
      },
      (result)=>{
        this.initLineData("cpu",result) ;
      }
    ,true,cycleDur) ;
    this.createQuery("memory",PlatformAPI.getClusterInfo,
      ()=>{
        return  this.getLocalParam("memory",this.getTimeParam());
      },
      (result)=>{
        this.initLineData("memory",result) ;
      }
    ,true,cycleDur) ;
    this.createQuery("network",PlatformAPI.getClusterInfo,
      ()=>{
        return  this.getLocalParam("network",this.getTimeParam());
      },
      (result)=>{
        this.initLineData("network",result) ;
      }
      ,true,cycleDur) ;
    this.createQuery("hiveNodes",PlatformAPI.getHiveState, this.getLocalParam(),
      (result)=>{
        let _data = result.metrics ;
        let _list = [] ;
        this.initNodeSateItem(_data,"metastore_started_count","Metastore",_list) ;
        this.initNodeSateItem(_data,"server_started_count","Hive Server",_list) ;
        this.initNodeSateItem(_data,"mysql_started_count","MySql",_list) ;
        this.initNodeSateItem(_data,"webchat_server_started_count","Webhcat Server",_list) ;
        if(_data.hasOwnProperty("hive_client_installed_count"))
        _list.push({name:"Hive Client",state:2,value:"Hive Client 已安装 "+_data["hive_client_installed_count"]});
        if(_data.hasOwnProperty("hcat_client_installed_count"))
        _list.push({name:"HCat Client",state:2,value:"HCat Client 已安装 "+_data["hcat_client_installed_count"]});
        this.setChartData("hiveNodes",_list) ;
      }
    ) ;
    //-----------------------hbase----------------------------------
    this.createQuery("hbaseNetwork",PlatformAPI.getHBaseInfo,
      ()=>{
        return  this.getLocalParam("network",this.getTimeParam()) ;
      },
      (result)=>{
        this.initLineData("hbaseNetwork",result) ;
      }
      ,true,cycleDur) ;
    this.createQuery("hbaseDisk",PlatformAPI.getHBaseInfo,//磁盘信息
      ()=>{
        return this.getLocalParam("disk",this.getTimeParam()) ;
      },
      (result)=>{
        this.initLineData("hbaseDisk",result) ;
      }
      ,true,cycleDur) ;
    this.createQuery("hbaseCpu",PlatformAPI.getHBaseInfo,
      ()=>{
        return this.getLocalParam("cpu",this.getTimeParam());
      },
      (result)=>{
        this.initLineData("hbaseCpu",result) ;
      }
      ,true,cycleDur ) ;
    this.createQuery("yarnMemory",PlatformAPI.getYarnMemory, this.getLocalParam(),
      (result)=>{
        let total = parseFloat(result.metrics.available) ;//总数
        let used =  parseFloat(result.metrics.used) ;//使用了
        let _detail = this.getPreDetailLb("使用",result.metrics.used,used,total,"MB") +
                      "<br>总量<br>"+result.metrics.available+"MB" ;
        let _list = [
          {name:this.getPrecentNum(total,used)+"%",value:used},
          {name:"",value:total-used}
        ];
        this.setChartData("yarnMemory",_list,null,_detail) ;
      }
      ,true,120 ) ;
    this.createQuery("hdfsNodeDisk",PlatformAPI.getHdfsDataDisk, this.getLocalParam("network"),
      (result)=> {
        let _datas = result.metrics;
        let _list = [];
        let _detail = "" ;
        if (_list) {
          for (let item of _datas) {
            let free = parseFloat(item.disk_free);//空闲
            let total = parseFloat(item.disk_total);//总共
            let used = total - free;
            _list.push({name: item["host_name"], pre: (used / total), value: item.disk_free + "/" + item.disk_total+"GB"});
          }
        }
        this.setChartData("hdfsNodeDisk", _list);
      }
      ) ;
    this.createQuery("hdfsDisk",PlatformAPI.getHdfsNameDisk, this.getLocalParam(),
      (result)=> {
        // let _datas = result.metrics;
        let _datas = result.metrics[0];
        let _list = [];
        let _detail = "" ;
        if (_datas) {
          let other = parseFloat(_datas.other_used);//其他使用的
          let hdfs = parseFloat(_datas.hdfs_used);//hdfs使用的
          let free = parseFloat(_datas.hdfs_free);//空闲
          let total = other + hdfs + free;
          _detail = this.getPreDetailLb("DFS使用的",_datas.hdfs_used,hdfs,total) +"<br>"+
            this.getPreDetailLb("非DFS使用的",_datas.other_used,other,total) +"<br>"+
            this.getPreDetailLb("剩余量",_datas.hdfs_free,free,total) ;

          _list.push( {name:this.getPrecentNum(total,other+hdfs)+"%",value:other+hdfs},{name:"",value:free});
        }
        this.setChartData("hdfsDisk", _list,null,_detail);
      }
    ) ;
    this.createQuery("hdfsDataNodes",PlatformAPI.getHdfsDataState, this.getLocalParam( ),
      (result)=> {
        let _datas = result.date_node;
        let _lb = "" ;
        let _detail = "";
        if(_datas){
          _lb = _datas["started_count"] +"/"+ _datas["total_count"];
          _detail = "启动数量 "+ _datas["started_count"] +" 个<br>"+ "总数 "+ _datas["total_count"] +" 个";
        }
        this.setChartData("hdfsDataNodes", _lb,null,_detail);
      }
      ,true,60) ;
    this.createQuery("serverNum",PlatformAPI.getServiceNum, this.getLocalParam( ),
      (result)=> {
        this.setChartData("serverNum", result["total_services"] );
      }
    ) ;
  }

  /**
   * 显示详情 开始轮询
   * @param chart
   */
  detailPop(chart){
    this.getQuery(chart.id).startQuery() ;
  }

  /**
   * 关闭窗口 停止轮询
   * @param chart
   */
  detailClose(chart){
    this.getQuery(chart.id).stopQuery() ;
  }

  /**
   * 详情标签
   * @param lb
   * @param numlb
   * @param num
   * @param total
   * @param fix
   * @returns {string}
   */
  getPreDetailLb(lb,numlb,num,total,fix="GB"){
     return lb +"<br>"+numlb +fix+"("+this.getPrecentNum(total, num)+"%)" ;
  }

  /**
   * 获得百分比
   * @param total
   * @param num
   * @returns {number}
   */
  getPrecentNum( total,num){
    return Math.floor(( num/total)*100) ;//取整数
  }

  /**
   * 节点状态解析辅助
   * @param data
   * @param att
   * @param name
   * @returns {*}
   */
  initNodeSateItem(data, att ,name ,arr){
    if(!data.hasOwnProperty(att))
      return ;
    if((data[att]+"")==="1")
      arr.push( {name:name,state:1,value:"Started"}) ;
    else
      arr.push(   {name:name,state:0,value:"Stopped"}) ;
  }

  /**
   * 解析折线图数据
   * @param id
   * @param result
   * @param att
   */
  initLineData(id,result,att="metrics"){
    let metrics = result[att] ;
    let typeName = [] ;
    let datas = [] ;
    let lastData = null ;
    for(let att in metrics){
      typeName.push({name:att}) ;
      let _list = metrics[att] ;
      let _itemList = [] ;
      for(let itemList of _list){
        _itemList.push({name:itemList[1],value:itemList[0]}) ;
      }
      lastData = _itemList ;
      datas.push(_itemList) ;
    }

    //处理显示标签 默认抽取四个显示  15 30 45 00分钟抽一个
    if(lastData){
      let _map = {"15":"15","30":"30","45":"45","00":"00"} ;
      let _date = new Date() ;
      let len = lastData.length ;
      // let step = Math.max(Math.floor(len/4),1) ;
      for(let i=0;i<len;i++){
        _date.setTime(parseInt(lastData[i].name)*1000) ;
        let _lb = NormalUtils.dateFormat(_date,"mm") ;
        if(_map.hasOwnProperty(_lb)){
          delete _map[_lb] ;
          lastData[i].showLabel = NormalUtils.dateFormat(_date,"hh:mm") ;
        }
        // if(i%step===0 || i===(len-1)){
        //   _date.setTime(parseInt(lastData[i].name)*1000) ;
        //   lastData[i].showLabel = NormalUtils.dateFormat(_date,"hh:mm") ;
        // }
      }
    }

    this.setChartData(id,datas,typeName) ;
  }

  /**
   * 设置图表数据
   * @param id
   * @param source
   * @param serise
   */
  setChartData(id,source,serise,detail=""){
    if( !this.chartMap.hasOwnProperty(id))
      return ;

    let chart =  this.chartMap[id] ;
    if(serise)
      chart.series = serise ;
    chart.source = source ;
    chart.hasDetail = false ;
    if(detail){
      chart.detail = detail ;
      chart.hasDetail = true ;
    }
  }

  /**
   * 创建查询器
   * @param id
   * @param method
   * @param param
   * @param dataHandler
   */
  createQuery( id,method,param,dataHandler,cycle,dur,first){
    this.queryMap[id] = new QueryTimer(id,method,param,dataHandler,cycle,dur,first) ;
  }

  /**
   * 获得查询器
   * @param id
   * @returns {*}
   */
  getQuery(id){
    return this.queryMap[id] ;
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
        options:options,
        showDetail:false,
        hasDetail:true,
        detail:""
      };
      this.chartMap[id] = _item ;
      this.data.chartList.push(_item) ;
    }
    return this.chartMap[id] ;
  }

  /**
   * 统一参数都要加上 集群名称
   * @param parms
   * @returns {{cluster: string|*}}
   */
  getLocalParam(type="",parms=null){
    let _re = {cluster:this.clusterName} ;
    _re.type = type ;
    _re.param = parms ;
    return _re ;
  }

  /**
   * 时间段参数
   * @returns {{start: string|*, end: string|*}}
   */
  getTimeParam(){
    let date = new Date() ;
    return {
      start:Math.floor((date.getTime()-3600000)/1000) ,
      end: Math.floor(date.getTime()/1000)+""
    } ;
  }

}
