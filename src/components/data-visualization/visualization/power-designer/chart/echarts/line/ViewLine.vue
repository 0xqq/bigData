<template>
  <ve-line :data="chartConfig.data"
           :settings="chartConfig.settings"
           :width="container.style.width"
           :height="container.style.height"
           :events="chartConfig.events"
           :init-options="chartConfig.initOptions"
           :tooltip-visible="chartConfig.tooltipVisible"
           :legend-visible="chartConfig.legendVisible"
           :theme="chartConfig.theme"
           :theme-name="chartConfig.themeName"
           :judge-width="chartConfig.judgeWidth"
           :width-change-delay="chartConfig.widthChangeDelay"
           :resizeable="chartConfig.resizeable"
           :cancel-resize-check="chartConfig.cancelResizeCheck"
           :resize-delay="chartConfig.resizeDelay"
           :change-delay="chartConfig.changeDelay"
           :set-option-opts="chartConfig.setOptionOpts"
           :not-set-unchange	="chartConfig.notSetUnchange"
           :extend="JSON.parse(chartConfig.extend)"></ve-line>
</template>

<script>
  import VeLine from 'v-charts/lib/line.common'


  export default {
    props:{
      containerConfig: Object
    },
    components:{VeLine},
    data: function () {
      this.testData()
      return {
        container: this.containerConfig,
        chartConfig: this.containerConfig.chart.config
      }
    },
    methods:{
      testData(){
        let config = this.containerConfig.chart.config
        config.settings.dimensions = ['日期']
        config.settings.metrics = ['民政局', '公安局', '气象局']
        config.data = {
          columns: ['日期', '民政局', '公安局', '气象局'],
          rows: [
            { '日期': '1/1', '民政局': 1393, '公安局': 1093, '气象局': 1302 },
            { '日期': '1/2', '民政局': 3530, '公安局': 3230, '气象局': 2011 },
            { '日期': '1/3', '民政局': 2923, '公安局': 2623, '气象局': 1988 },
            { '日期': '1/4', '民政局': 1723, '公安局': 1423, '气象局': 1001 },
            { '日期': '1/5', '民政局': 3792, '公安局': 3492, '气象局': 1567 },
            { '日期': '1/6', '民政局': 4593, '公安局': 4293, '气象局': 1902 }
          ]
        }
      }
    },
    computed: {},
    watch: {}
  }
</script>
