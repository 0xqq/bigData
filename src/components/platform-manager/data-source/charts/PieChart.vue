<script>
  import NormalUtils from "@/common/utils/NormalUtils";
  import * as echarts from "echarts/echarts.simple" ;
  export default {
    props: ["dataSource", "series", "options", "isLoading"],
    data() {
      return {
        chartId: NormalUtils.createOID("chartId")
      }
    },
    watch: {
      dataSource: function () {
        this.renderData();
      }
    },
    mounted() {
      //初始化图表
      this.initChart();
    },
    methods: {
      /**
       * 初始化图表
       */
      initChart() {
        let chartDom = document.getElementById(this.chartId);
        this.chart = echarts.init(chartDom);
        this.option = this.getOptions();
        this.chart.setOption(this.option);
        this.renderData();
      },

      getOptions() {
        return {
          color:["#db843d","#4572a7","#aa4643","#89a54e","#93a9cf","#b9cd96" ],
          series: [
            {
              type: 'pie',
              radius:['60%','100%'],
              hoverAnimation:false,
              label: {
                normal: {
                  show: true,
                  position:'inside',
                  formatter: '{b} {d}%',
                  color:"#000"
                }
              }
            }
          ]
        };
      },

      renderData() {
        if (!this.dataSource)
          return;
        this.chart.setOption({
          series: [{data: this.dataSource}]
        });
      }
    },
    beforeDestroy() {

    }
  }
</script>

<style scoped>
  .chart-content{
    left:0;
    top:0px;
    bottom:5px;
    right:0;
    position:absolute;
  }
</style>

<template>

  <!--图表-->
  <div class="chart-content" v-bind:id="chartId" >
  </div>

</template>
