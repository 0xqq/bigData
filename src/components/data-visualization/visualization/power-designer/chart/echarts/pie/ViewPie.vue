<template>
  <ve-pie :data="chartData"
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
          :not-set-unchange	="chartConfig.notSetUnchange"></ve-pie>
</template>

<script>
  import VePie from 'v-charts/lib/pie.common'
  export default {
    props:{
      containerConfig: Object
    },
    components:{VePie},
    data: function () {
      return {
        container: this.containerConfig,
        chartConfig: this.containerConfig.chart.config,
        chartData: {
          columns: ['日期', '数据导出'],
          rows: [
            { '日期': '1/1', '数据导出': 1393 },
            { '日期': '1/2', '数据导出': 3530 },
            { '日期': '1/3', '数据导出': 2923 },
            { '日期': '1/4', '数据导出': 1723 },
            { '日期': '1/5', '数据导出': 3792 },
            { '日期': '1/6', '数据导出': 4593 }
          ]
        }
      }
    },
    computed: {},
    watch: {}
  }
</script>
