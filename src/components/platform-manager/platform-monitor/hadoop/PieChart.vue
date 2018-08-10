<script>
   import NormalUtils from "@/common/utils/NormalUtils";
   import echarts from "echarts" ;
    export default {
      // mixins: [ChartBase],
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
            color: ["#5ab400", "#ffffff"],
            series: [
              {
                tooltip: {show: false},
                color: ["#5ab400", "#ffffff"],
                type: 'pie',
                radius: ['70%', '90%'],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                itemStyle: {
                  normal: {
                    borderColor: '#dde3e5',
                    borderWidth: 2,
                    borderType: 'solid'
                  },
                  emphasis: {
                    borderColor: '#dde3e5',
                    borderWidth: 2,
                    borderType: 'solid'
                  },
                },
                label: {
                  normal: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold',
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '20',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
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
    bottom:5px;/*饼图也是以中心为中心*/
    right:0;
    position:absolute;
  }
</style>

<template>

    <!--图表-->
    <div class="chart-content" v-bind:id="chartId" >
    </div>

</template>
