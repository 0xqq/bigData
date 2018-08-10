<script>
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import HadoopMonitorPM from "./HadoopMonitorPM" ;

  export default {
    components:{ ContentTitle},
    data() {
      this.viewPM = new HadoopMonitorPM() ;
      return {
        viewData:this.viewPM.data
      }
    },
    activated() {
      this.viewPM.initView() ;//进入刷新数据
    },
    methods:{
      showDetail(chart,flag){
         if(!chart.hasDetail)
           return ;
        chart.showDetail=flag;
      }
    }
  }

</script>

<style lang="scss" scoped>
   @mixin abs-group($l:0,$t:0,$r:0,$b:0) {
    left:$l;
    right:$r;
    bottom:$b;
    top:$t;
     position:absolute;
  }

  .chart-container{
     width:100%;
     flex:auto;
     overflow-y: auto;
     overflow-x: hidden;

    .chart-layout{
      width:100%;
      position:relative;
      .chart-box{
        flex:none;
        width:180px;
        height:170px;
        border:1px solid #dddddd;
        position:relative;
        margin: 5px 10px 5px 0 ;
        color:#555555;
        .title{
          height:40px;
          left:7px;
          right:0;
          position:absolute;
          font-size:15px;
          font-weight: bold;
          line-height:40px;
          vertical-align: middle;
        }
        .chart{
          @include abs-group(10px,40px,10px,5px) ;
        }

        /*图表鼠标覆盖层*/
        .chart-mask{
          @include abs-group() ;
          cursor: pointer;
          background-color: rgba(black,0);
        }

        /*详情*/
        .detail{
          @include abs-group() ;
          background-color:rgba(white,.5);
          .mouse-div{
            @include abs-group() ;
            background-color: rgba(black,0);
            cursor: pointer;
          }
        }
        .link-layout{
          width:100%;
        }
        .link-font{
          width:100%;
          font-size:13px;
          font-weight: bold;
          cursor: pointer;
          color:#0088cc;
          flex:none;
          padding: 5px 0 ;
          text-align: center;
          &:hover{
            color:#555555;
            text-decoration:underline;
          }
        }
      }
    }
  }
   .detail-lb{
     flex:none;
     overflow: hidden;
     word-break:break-all;
     text-align: center;
     line-height:20px;
     vertical-align: middle;
     font-size:12px;
     font-weight: bold;
   }
  .layout-detail{
    @include abs-group() ;
  }
</style>

<template>
  <div class="tj-t-view-inner" >
    <v-group-iwt class="layout">

      <!--title-->
     <!-- <content-title title="Hadoop监控">
      </content-title>
      <v-gap-iwt></v-gap-iwt>-->

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
                         :query="chart.query"
                         @detailClose="viewPM.detailClose(chart)"
                         @showDetail="viewPM.detailPop(chart)">

              </component>

              <!--detail 先放外面-->
              <div class="chart-mask" v-show="chart.hasDetail"
                   @mouseover="showDetail(chart,true)" >
              </div>
              <div class="detail" v-show="chart.showDetail">
                <h-group-iwt :hor="'center'"
                             class="layout-detail" >
                  <div class="detail-lb" v-html="chart.detail"></div>
                </h-group-iwt>
                <div class="mouse-div" @mouseout="showDetail(chart,false)"></div>
              </div>
            </div>
            <s-loading v-show="chart.query.isLoading"></s-loading>
          </div>

        </tile-group-iwt>
      </div>
    </v-group-iwt>

    <s-loading v-show="viewData.isLoading"></s-loading>
  </div>
</template>

