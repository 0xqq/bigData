<script>
  import OtherSourceMonitorPM from "./OtherSourceMonitorPM" ;
  import PlatformAPI from "@/common/service/PlatformAPI";

  export default {
    components:{  },
    data() {
      this.viewPM = new OtherSourceMonitorPM() ;
      return {
        viewData:this.viewPM.data,
        oneData:'0',
        twoData:'0',
        threeData:'0',
        fourData:'0'
      }
    },
    activated() {
      this.viewPM.initView() ;//进入刷新数据
    },
    methods:{
      //处理区1
      handleGetData(){
        PlatformAPI.getThreeNumber({
          partition:'2'
        }).then(
          (result)=>{
            // console.log(result)
             this.oneData = Number(result.resultdata.fileTotalSize).toLocaleString();
             this.twoData =Number(result.resultdata.dbTotalCount).toLocaleString();

          },
          ()=>{

          }
        )
      },
      //分析区
      analysisGetData(){
        PlatformAPI.getThreeNumber({
          partition:'3'
        }).then(
          (result)=>{
            // console.log(result)
            this.threeData =Number(result.resultdata.fileTotalSize).toLocaleString();
            this.fourData = Number(result.resultdata.dbTotalCount).toLocaleString();

          },
          ()=>{

          }
        )
      }
    },
    mounted(){
      this.handleGetData();
      this.analysisGetData();
    }
  }

</script>

<style lang="scss" scoped>
  .num-container{
    width:100%;
    display: flex;
    justify-content: space-around;
    color: #fff;
    font-size: 13px;
    font-weight: bolder;
    .num-sort{
      position: relative;
      .title{
        position: absolute;
        left: 13%;
        top: 20%;
      }
      .number{
        position: absolute;
        left: 13%;
        top:50%;
        font-size: 16px;
      }
    }
  }

  .chart-container{
    flex:auto;
    width:100%;
    overflow-y: auto;
    overflow-x: hidden;

    .chart-layout {
      width: 100%;
      position: relative;

      .chart-box{
        flex:none;
        width:300px;
        height:250px;
        border:1px solid #dddddd;
        border-radius: 5px;
        position:relative;
        margin: 10px 20px ;
        color:#555555;
        .title{
          @include abs-group(0,0,0,false) ;
          background-color:#e4e4e4 ;
          height:30px;
          padding-left: 10px;
          font-size:15px;
          font-weight: bold;
          line-height:30px;
          vertical-align: middle;
        }
        .chart{
          @include abs-group(10px,40px,10px,5px) ;
        }
      }
    }
  }

</style>

<template>
  <div class="tj-t-view-inner" >
    <v-group-iwt class="layout">

      <!--数值-->
      <div class="num-container">
        <div class="num-sort">
          <img src="../../../assets/image/storage/resource_monitor_bg.png" title="分布式文件系统"/>
          <span class="title">处理区总数据量（兆）</span>
          <span class="number">{{oneData}}</span>
        </div>
        <div class="num-sort">
          <img src="../../../assets/image/storage/resource_monitor_bg.png" title="分布式文件系统"/>
          <span class="title">处理区总数据量（条）</span>
          <span class="number">{{twoData}}</span>
        </div>
        <div class="num-sort">
          <img src="../../../assets/image/storage/resource_monitor_bg.png" title="分布式文件系统"/>
          <span class="title">分析区总数据量（兆）</span>
          <span class="number">{{threeData}}</span>
        </div>
        <div class="num-sort">
          <img src="../../../assets/image/storage/resource_monitor_bg.png" title="分布式文件系统"/>
          <span class="title">分析区总数据量（条）</span>
          <span class="number">{{fourData}}</span>
        </div>
      </div>

      <!--所有的指标展示-->
      <div class="chart-container">

        <tile-group-iwt class="chart-layout" >

          <!--动态生成视图-->
          <div v-for="(chart,index) in viewData.chartList"
               :key="index"
               class="chart-box"
               :style="chart.style" >

            <!--title-->
            <div class="title">
              {{chart.title}}
            </div>

            <!--chart-->
            <div class="chart">

              <!--chart content-->
              <component :is="chart.view"
                         :title="chart.title"
                         :data-source="chart.source"
                         :series="chart.series"
                         :is-loading="chart.query.isLoading"
                         :options="chart.options"
                         :query="chart.query">
              </component>
            </div>
            <s-loading v-show="chart.query.isLoading"></s-loading>
          </div>

        </tile-group-iwt>
      </div>
    </v-group-iwt>

    <s-loading v-show="viewData.isLoading"></s-loading>
  </div>
</template>

