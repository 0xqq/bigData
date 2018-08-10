<script>
  import TaskMonitorPM from "./TaskMonitorPM" ;
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import Inject from "@/common/model/Inject" ;
  import echarts from 'echarts';
  import PlatformAPI from "@/common/service/PlatformAPI";
  import ProcessAPI from "@/common/service/ProcessAPI";
  import AnalysisAPI from "@/common/service/AnalysisAPI";
  import TaskMoniorHisWin from "./TaskMoniorHisWin";
  import TaskMonitorAnalysisHisWin from "./TaskMonitorAnalysisHisWin";
  import NormalUtils from "@/common/utils/NormalUtils";
  import TaskMonitorListOrg from "./TaskMonitorListOrg";

  export default {
    components:{ ContentTitle,TaskMoniorHisWin,TaskMonitorAnalysisHisWin,TaskMonitorListOrg},
    data() {
      // this.viewPM = new TaskMonitorPM() ;
      this.viewPM = Inject.getClass(TaskMonitorPM);
      // console.log(this.viewPM.pagePM.data.sourceList);
      return {
        viewData: this.viewPM.data,
        page:this.viewPM.pagePM.data,   //处理任务llaa
        pageIM:this.viewPM.pagePMIM.data,  //接入任务
        pageAN:this.viewPM.pagePMAN.data,  //分析任务
        activeName:'import',
        tabName:'import',
        importData:{},
        processingData:{},
        analysisData:{},
        active:'',
        statusType:'',
        //接入任务
        /*valueListone:[],
        changeIdTwo:''*/
      }
    },
    computed: {},
    activated() {
      this.viewPM.initView();
    },
    methods: {
      //表一
      creatEchartone(){
        let ths = this;
        ths.chartOne = echarts.init(document.getElementById('insertTask'));
        //点击柱子事件
        this.chartOne.on("click",function(params){

          if(params.dataIndex === 0){

            ths.viewData.searchForm.status = '';
            ths.tabName = 'import';
            ths.viewData.currentView = 'import';
            ths.viewData.searchForm.modelName = '';
            ths.viewData.searchForm.taskName = '';
            ths.viewData.searchForm.modelStatus = '';
            ths.viewPM.queryListIM(ths.viewData.searchForm)

          }else if(params.dataIndex === 1){
            ths.viewData.searchForm.status = 'run';
            ths.tabName = 'import';
            ths.viewData.currentView = 'import';
            ths.viewData.searchForm.modelName = '';
            ths.viewData.searchForm.taskName = '';
            ths.viewData.searchForm.modelStatus = '';
            ths.viewPM.queryListIM(ths.viewData.searchForm)

          }else if(params.dataIndex === 2){
            ths.viewData.searchForm.status = 'err';
            ths.tabName = 'import';
            ths.viewData.currentView = 'import';
            ths.viewData.searchForm.modelName = '';
            ths.viewData.searchForm.modelStatus = '';
            ths.viewData.searchForm.taskName = '';
            ths.viewPM.queryListIM(ths.viewData.searchForm)
          }
        });
        var option = {
          backgroundColor: '#fff',
          title: {
            left: 'center',
            text: '接入任务',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter:function(params){

            // console.log(params);
              // top.window.hoverChartData = {indexChartData: params[0].dataIndex};

              var unit="个";
              var res='';
              for(var i=0;i<params.length;i++){
                if(i==1){
                  res+=params[i].marker+params[0].name+"&nbsp;&nbsp;<span style='float:right'>"+params[i].data+unit+'</span><br/>'
                }else{
                  res+=params[i].marker+params[0].name+"&nbsp;&nbsp;<span style='float:right'>"+params[i].data+unit+'</span><br/>'
                }
              }
              return res;
            },
          },
          xAxis: {
            data: ['总数','正在运行数','异常任务数'],
            axisTick: {
              alignWithLabel: true,
              show:false
            },
            axisLabel: {
              "show": true,
              "textStyle": {
                "fontWeight": "bold",
                "fontSize": 10
              },
            }
          },
          yAxis: {
            inverse: false,
            splitArea: {show: false},
            splitNumber:4
          },
          grid: {
            "x": "8%",
            "y": "15%",
            "x2": "4%",
            "y2": "15%"
          },
          series: [
            {
              type: 'bar',
              stack: 'two',
              label:{
                normal:{
                  show:true,
                  position:'top',
                  textStyle:{
                    color:'#000'
                  }
                }
              },
              itemStyle:{
                normal:{color:'#b4302d'}
              },
              data: []
            }
          ]
        };
        ths.chartOne.setOption(option);
      },
      creatEchartTwo(){
        let ths = this;
        ths.chartTwo = echarts.init(document.getElementById('processingTask'));

        this.chartTwo.on("click",function(params){
          //console.log(params);
          if(params.dataIndex === 0){
            ths.viewData.searchForm.status = '';
            ths.tabName = 'handler';
            ths.viewData.currentView = 'handler';
            ths.viewData.searchForm.modelName = '';
            ths.viewData.searchForm.taskName = '';
            ths.viewPM.queryListHD(ths.viewData.searchForm)



          }else if(params.dataIndex === 1){
            ths.viewData.searchForm.status = 'run';
            ths.tabName = 'handler';
            ths.viewData.currentView = 'handler';
            ths.viewData.searchForm.modelName = '';
            ths.viewData.searchForm.taskName = '';
            ths.viewPM.queryListHD(ths.viewData.searchForm)

          }else if(params.dataIndex === 2){
            ths.viewData.searchForm.status = 'err';
            ths.tabName = 'handler';
            ths.viewData.currentView = 'handler';
            ths.viewData.searchForm.modelName = '';
            ths.viewData.searchForm.taskName = '';
            ths.viewPM.queryListHD(ths.viewData.searchForm)

          }
        });

        var option = {
          backgroundColor: '#fff',
          title: {
            left: 'center',
            text: '处理任务',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter:function(params){
              var unit="个";
              var res='';
              for(var i=0;i<params.length;i++){
                if(i==1){
                  res+=params[i].marker+params[0].name+"&nbsp;&nbsp;<span style='float:right'>"+params[i].data+unit+'</span><br/>'
                }else{
                  res+=params[i].marker+params[0].name+"&nbsp;&nbsp;<span style='float:right'>"+params[i].data+unit+'</span><br/>'
                }
              }
              return res;
            },
          },
          xAxis: {
            data: ['总数','正在运行数','异常任务数'],
            axisTick: {
              alignWithLabel: true,
              show:false
            },
            axisLabel: {
              "show": true,
              "textStyle": {
                "fontWeight": "bold",
                "fontSize": 10
              },
            }
          },
          yAxis: {
            inverse: false,
            splitArea: {show: false},
            splitNumber:4
          },
          grid: {
            "x": "8%",
            "y": "15%",
            "x2": "4%",
            "y2": "15%"
          },
          series: [
            {
              type: 'bar',
              stack: 'two',
              label:{
                normal:{
                  show:true,
                  position:'top',
                  textStyle:{
                    color:'#000'
                  }
                }
              },
              itemStyle:{
                normal:{color:'#3875c6'}
              },
              data: []
            }
          ]
        };
        ths.chartTwo.setOption(option);
      },
      creatEchartthree(){
        let ths = this;
        ths.chartThree = echarts.init(document.getElementById('analysisTask'));

        this.chartThree.on("click",function(params){
          //console.log(params);
          if(params.dataIndex === 0){
            ths.viewData.searchForm.modelStatus = '';
            ths.tabName = 'analysis';
            ths.viewData.currentView = 'analysis';
            ths.viewData.searchForm.modelName = '';
            ths.viewData.searchForm.taskName = '';
            ths.viewData.searchForm.status = '';
            delete ths.viewData.searchForm.status;
            ths.viewPM.queryListAN(ths.viewData.searchForm);

          }else if(params.dataIndex === 1){
            ths.viewData.searchForm.modelStatus = '1';
            ths.tabName = 'analysis';
            ths.viewData.currentView = 'analysis';
            ths.viewData.searchForm.modelName = '';
            ths.viewData.searchForm.taskName = '';
            ths.viewData.searchForm.status = '';
            delete ths.viewData.searchForm.status;
            ths.viewPM.queryListAN(ths.viewData.searchForm);

          }else if(params.dataIndex === 2){
            ths.viewData.searchForm.modelStatus = '3';
            ths.tabName = 'analysis';
            ths.viewData.currentView = 'analysis';
            ths.viewData.searchForm.modelName = '';
            ths.viewData.searchForm.taskName = '';
            ths.viewData.searchForm.status = '';
            delete ths.viewData.searchForm.status;
            ths.viewPM.queryListAN(ths.viewData.searchForm);

          }
        });

        var option = {
          backgroundColor: '#fff',
          title: {
            left: 'center',
            text: '分析任务',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter:function(params){
              var unit="个";
              var res='';
              for(var i=0;i<params.length;i++){
                if(i==1){
                  res+=params[i].marker+params[0].name+"&nbsp;&nbsp;<span style='float:right'>"+params[i].data+unit+'</span><br/>'
                }else{
                  res+=params[i].marker+params[0].name+"&nbsp;&nbsp;<span style='float:right'>"+params[i].data+unit+'</span><br/>'
                }
              }
              return res;
            },
          },
          xAxis: {
            data: ['总数','正在运行数','异常任务数'],
            axisTick: {
              alignWithLabel: true,
              show:false
            },
            axisLabel: {
              "show": true,
              "textStyle": {
                "fontWeight": "bold",
                "fontSize": 10
              },
            }
          },
          yAxis: {
            inverse: false,
            splitArea: {show: false},
            splitNumber:4
          },
          grid: {
            "x": "8%",
            "y": "15%",
            "x2": "4%",
            "y2": "15%"
          },
          series: [
            {
              type: 'bar',
              stack: 'two',
              label:{
                normal:{
                  show:true,
                  position:'top',
                  textStyle:{
                    color:'#000'
                  }
                }
              },
              itemStyle:{
                normal:{color:'#8cb53d'}
              },
              data: []
            }
          ]
        };
        ths.chartThree.setOption(option);
        setTimeout(function (){
          window.onresize = function () {
            ths.chartOne.resize();
            ths.chartTwo.resize();
            ths.chartThree.resize();
          }
        },200)
      },

      /*areaClick: function () {
        let ths = this;
        setTimeout(function () {
          if (ths.changeIdTwo=='') {
          let name = top.window.hoverChartData.indexChartData;
          ths.changeIdTwo = ths.valueListtwo[name];

        }
        }, 30);
      },
    */
      getChartOne(){
        let ths =this;
        PlatformAPI.importTaskStatic({}).then(
          (result)=>{
            // console.log(result.resultdata);
            let data = result.resultdata;
            this.importData = data;
            let totalCount = Number(data.totalCount);
            let runningCount = Number(data.runningCount);
            let exceptionCount = Number(data.exceptionCount);
            ths.chartOne.setOption(
              {
                series: [{
                  data:[
                    totalCount,
                    runningCount,
                    exceptionCount
                  ]
                }]
              }
            )

          },
          ()=>{

          }
        );
      },
      getChartTwo(){
        let ths =this;
        ProcessAPI.importTaskStaticChu({}).then(
          (result)=>{
            // console.log(result.data);
            let data = result.data;
            this.processingData =data;
            let totalCount = Number(data.totalCount);
            let runningCount = Number(data.runningCount);
            let exceptionCount = Number(data.exceptionCount);
            ths.chartTwo.setOption(
              {
                series: [{
                  data:[
                    totalCount,
                    runningCount,
                    exceptionCount
                  ]
                }]
              }
            )

          },
          ()=>{

          }
        );
      },
      getChartThree(){
        let ths =this;
        AnalysisAPI.importTaskStaticAny({}).then(
          (result)=>{
            // console.log(result.data);
            let data = result.data;
            this.analysisData = data;
            let totalCount = Number(data.allCount);
            let runningCount = Number(data.runningCount);
            let exceptionCount = Number(data.errorCount);
            ths.chartThree.setOption(
              {
                series: [{
                  data:[
                    totalCount,
                    runningCount,
                    exceptionCount
                  ]
                }]
              }
            )

          },
          ()=>{

          }
        );
      },
      handleClick(tab,event) {
        this.tabName = tab.name;
        /*this.viewPM.initSearchForm(true);*/
        if(tab.name === 'import'){
          this.viewData.searchForm.modelName = '';
          this.viewData.searchForm.taskName = '';
          this.viewData.searchForm.modelStatus = '';
          this.viewPM.queryListIM(this.viewData.searchForm)
        }else if(tab.name === 'handler'){
          this.viewData.searchForm.modelName = '';
          this.viewData.searchForm.taskName = '';
          this.viewPM.queryListHD(this.viewData.searchForm)
        }else if(tab.name === 'analysis'){
          this.viewData.searchForm.modelName = '';
          this.viewData.searchForm.taskName = '';
          this.viewPM.queryListAN(this.viewData.searchForm);
        }

      },
      minTime(row,column){
        // return new Date(row.runTime).getMinutes() ===0 ? 0:new Date(row.runTime).getMinutes() + 'min';
        let num = row.runTime/1000 ;
        return isNaN(num)?"": (num+ ' s');
      },
      hdstartTime(row,column){
        //JJJJ
        let num = row.triggerTime;
        return NormalUtils.dateFormat(num,"yyyy-MM-dd hh:mm:ss")
      },
      //分析任务查看详情
      viewAnaOrg(item){
         this.$refs.anaWin.open(item);
      },
      //查看日志
      viewOrg(item){
        this.$refs.seeOrg.open(item);
      },
      //假联动
      /*seeView(a){
        if( a === 1){
          this.tabName = 'import';
          this.viewData.currentView = 'import';
          this.viewData.searchForm.modelName = '';
          this.viewData.searchForm.taskName = '';
          this.viewPM.queryListIM(this.viewData.searchForm)
        }else if(a === 2){
          this.tabName = 'handler';
          this.viewData.currentView = 'handler';
          this.viewData.searchForm.modelName = '';
          this.viewData.searchForm.taskName = '';
          this.viewPM.queryListHD(this.viewData.searchForm)
        }else if(a === 3){
          this.tabName = 'analysis';
          this.viewData.currentView = 'analysis';
          this.viewData.searchForm.modelName = '';
          this.viewData.searchForm.taskName = '';
          this.viewPM.queryListAN(this.viewData.searchForm);
        }
      }*/
    },
    mounted() {
      this.creatEchartone();
      this.creatEchartTwo();
      this.creatEchartthree();
      this.getChartOne();
      this.getChartTwo();
      this.getChartThree();
    }
  }
</script>

<style scoped lang="scss">
  .sucess-icon{
    font-size:16px;
    color:green;
  }
  .error-icon{
    font-size:18px;
    color:red;
  }
  .stop-icon{
    font-size:16px;
    color:#e7e7e7;
  }

  .container{
    @include abs-group();

    .layout{
      @include abs-group(10px,10px,10px,10px) ;
    }

    .chart-view {
      width:100%;
      flex:none;
      height:220px;
      background-color: #fff;
      .task-echart{
        margin: 0;
        padding: 0;
        background: #fff;
        width: 100%;
        height: 220px;
        display: flex;
        justify-content: space-between;
        .echarts{
          width: 33%;
          height: 100%;
          border:1px solid #d3d3d3;
          position: relative;
          div{
            width: 100%;
            height: 100%;
          }
          .noData{
            position: absolute;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            color: #909399;
          }
        }
      }
    }

    .nav-view{
      @include tab-card() ;
      margin-top: 10px;
      position:relative;
      .nav-inner{
        @include abs-group(0,0,0,-2px) ;
        overflow: hidden;
      }
      .head-nav-control{
        @include abs-group(false,0,10px,0) ;
      }
    }

    .nav-content{
      @include tab-content() ;
      flex:auto;
      width:100%;
      box-sizing:border-box;
      position:relative;

      .table-view{
        @include abs-group(0,0,0,30px) ;
      }
      .page-view{
        @include abs-group(0,false,0,0) ;
        height:30px;
      }
    }
  }
</style>


<template>
  <div class="container" >

    <v-group-iwt class="layout">
      <div class="chart-view">
        <div class="task-echart">
          <!--接入任务-->
          <div class="echarts">
            <div id="insertTask"></div>
            <div class="noData" v-if="!importData.totalCount">
                暂无数据
            </div>
          </div>
          <!--处理任务-->
          <div class="echarts">
            <div id="processingTask"></div>
           <div class="noData" v-if="!processingData.totalCount">
              暂无数据
            </div>
          </div>
          <!--分析任务-->
          <div class="echarts">
            <div id="analysisTask"></div>
            <div class="noData" v-if="!analysisData.allCount">
              暂无数据
            </div>
          </div>
        </div>
      </div>
      <!--tab也签切换-->
      <div class="nav-view">
        <div class="nav-inner">
          <el-tabs v-model="viewData.currentView"
                   type="border-card"
                   @tab-click="handleClick">
            <el-tab-pane label=" 接入任务" name="import" >
              <span slot="label"><i class="iconfont tj-biaoge iconbtn"></i> 接入任务</span>
            </el-tab-pane>
            <el-tab-pane label=" 处理任务" name="handler" >
              <span slot="label"><i class="iconfont tj-weibiaoti5 iconbtn"></i> 处理任务</span>
            </el-tab-pane>
            <el-tab-pane label=" 分析任务" name="analysis" >
              <span slot="label"><i class="iconfont tj-weibiaoti5 iconbtn"></i> 分析任务</span>
            </el-tab-pane>
          </el-tabs>
         <!-- 接入任务查询-->
          <h-group-iwt class="head-nav-control" v-show="this.tabName === 'import'">
            <el-input v-model="viewData.searchForm.taskName"
                      size="mini"
                      placeholder="输入任务名称关键字" style="margin-right: 5px;width: 250px"></el-input>
            <el-button type="primary"
                       size="mini" @click="viewPM.queryListIM()">查询</el-button>
          </h-group-iwt>
          <!--处理任务查询-->
          <h-group-iwt class="head-nav-control" v-show="this.tabName === 'handler'">
            <el-input v-model="viewData.searchForm.taskName"
                      size="mini"
                      placeholder="输入任务名称关键字" style="margin-right: 5px;width: 250px"></el-input>
            <el-button type="primary"
                       size="mini" @click="viewPM.queryListHD()">查询</el-button>
          </h-group-iwt>
          <!--分析任务查询-->
          <h-group-iwt class="head-nav-control" v-show="this.tabName === 'analysis'">
            <el-input v-model="viewData.searchForm.modelName"
                      size="mini"
                      placeholder="输入任务名称关键字" style="margin-right: 5px;width: 250px"></el-input>
            <el-button type="primary"
                       size="mini" @click="viewPM.queryListAN()">查询</el-button>
          </h-group-iwt>
        </div>
      </div>
      <!--接入任务1-->
      <div v-show="viewData.currentView === 'import'" class="nav-content">
        <div class="table-view">
          <el-table
            border
            stripe
            size="mini"
            :data="pageIM.sourceList"
            style="width:100%;"
            height="100%"
            max-height="100%" >
            <el-table-column prop="name"  label="任务名称"
                             min-width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="startTime"
                             label="开始时间"
                             min-width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="start"
                             label="当前状态"
                             min-width="90"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="runningSeconds"
                             label="运行时长"
                             min-width="80"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="state"
                             label="运行状态"
                             min-width="80"
                             show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="createName"
                             label="创建者"
                             min-width="90"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="170" >
              <template slot-scope="scope">
                <el-button type="text" size="mini"  >查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <h-group-iwt :hor="'center'"
                     class="page-view">
          <el-pagination background
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="pageIM.totalIndex"
                         :page-sizes="pageIM.pageSizes"
                         :page-size="pageIM.pageSize"
                         @size-change="(val)=>{this.viewPM.pagePMIM.pageSizeChange(val)}"
                         @current-change="(val)=>{this.viewPM.pagePMIM.currentPageChange(val)}">
          </el-pagination>
        </h-group-iwt>
      </div>
      <!--处理任务2-->
      <div v-show="viewData.currentView === 'handler'" class="nav-content">
        <div class="table-view">
          <el-table
            border
            stripe
            size="mini"
            :data="page.sourceList"
            style="width:100%;"
            height="100%"
            max-height="100%" >
            <el-table-column prop="taskName"  label="任务名称"
                             min-width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="triggerTime"
                             label="开始时间"
                             :formatter = "hdstartTime"
                             min-width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <!--<el-table-column prop="status"-->
                             <!--label="当前状态"-->
                             <!--min-width="90" >-->
            <!--</el-table-column>-->
            <el-table-column prop="runTime"
                             label="运行时长"
                             min-width="80"
                             :formatter = "minTime"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status"
                             label="运行状态"
                             min-width="80"
                             show-overflow-tooltip>
              <template slot-scope="scope">

                <i v-if="scope.row.status==='0'"
                   class="iconfont tj-tingzhishangbao stop-icon"
                   :title="scope.row.statusName" ></i>

                <i v-else-if="scope.row.status==='1'"
                   class="iconfont tj-duigou1 sucess-icon"
                   :title="scope.row.statusName" ></i>

                <i v-else-if="scope.row.status==='2'"
                   class="iconfont tj-71shibai error-icon"
                   :title="scope.row.statusName" ></i>

                <i v-else-if="scope.row.status==='3'"
                   class="iconfont tj-yunxingzhong sucess-icon"
                   :title="scope.row.statusName" ></i>

                <span v-else>{{scope.row.status}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="creator"
                             label="创建者"
                             min-width="90"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="170" >
              <template slot-scope="scope">
                <el-button type="text" size="mini"  @click="viewPM.popDetailWin(scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>

        <h-group-iwt :hor="'center'"
                     class="page-view">
          <el-pagination background
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="page.totalIndex"
                         :page-sizes="page.pageSizes"
                         :page-size="page.pageSize"
                         @size-change="(val)=>{this.viewPM.pagePM.pageSizeChange(val)}"
                         @current-change="(val)=>{this.viewPM.pagePM.currentPageChange(val)}">
          </el-pagination>
        </h-group-iwt>

      </div>
      <!--分析任务3-->
      <div v-show="viewData.currentView === 'analysis'" class="nav-content">
        <div class="table-view">
          <el-table  border  stripe
                     size="mini"
                     :data="pageAN.sourceList"
                     max-height="100%;"
                     height="100%"
                     style="width:100%;height:100%;" >

            <el-table-column prop="modelName"  label="名称">
            </el-table-column>
            <el-table-column prop="modelProject"  label="项目名称">
            </el-table-column>
            <el-table-column  prop="modelStatus" label="运行状态" >

              <template slot-scope="scope">

                <i v-if="scope.row.modelStatus==='0'"
                   class="iconfont" style="font-size: 12px">未运行</i>

                <i v-else-if="scope.row.modelStatus==='1'"
                   class="iconfont" style="font-size: 12px">运行中</i>

                <i v-else-if="scope.row.modelStatus==='2'"
                   class="iconfont"
                   :title="scope.row.modelStatusName"  style="font-size: 12px">
                  {{scope.row.modelIsPublish ==='1'?'已发布':'成功'}}
                </i>

                <i v-else-if="scope.row.modelStatus==='3'"
                   class="iconfont"
                   :title="scope.row.modelStatusName" style="font-size: 12px">失败</i>

              </template>

            </el-table-column>
            <el-table-column  prop="modelCreateTime"  label="创建时间" >
            </el-table-column>
            <el-table-column  prop="modelPublishTime"  label="发布时间" >
            </el-table-column>
            <el-table-column  prop="modelUserName"  label="创建人" >
            </el-table-column>

            <el-table-column label="操作"  fixed="right">
              <template slot-scope="scope">
                <el-button type="text"  size="mini"
                           @click="viewOrg(scope.row)" >查看日志</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>

        <h-group-iwt :hor="'center'"
                     class="page-view">
          <el-pagination background
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="pageAN.totalIndex"
                         :page-sizes="pageAN.pageSizes"
                         :page-size="pageAN.pageSize"
                         @size-change="(val)=>{this.viewPM.pagePMAN.pageSizeChange(val)}"
                         @current-change="(val)=>{this.viewPM.pagePMAN.currentPageChange(val)}">
          </el-pagination>
        </h-group-iwt>



      </div>

    </v-group-iwt>

    <!--接入任务弹框-->
    <task-monior-his-win></task-monior-his-win>
    <!--分析任务弹框-->
    <task-monitor-analysis-his-win ref="anaWin"></task-monitor-analysis-his-win>
    <!--查看日志-->
    <task-monitor-list-org ref="seeOrg"></task-monitor-list-org>

  </div>
</template>
