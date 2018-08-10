<template>
  <ve-histogram :data="chartData"
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
                :not-set-unchange	="chartConfig.notSetUnchange"></ve-histogram>
</template>

<script>
  import VeHistogram from 'v-charts/lib/histogram.common'
  export default {
    props:{
      containerConfig: Object
    },
    components:{VeHistogram},
    data: function () {
      return {
        container: this.containerConfig,
        chartConfig: this.containerConfig.chart.config,
        chartData: {
          columns: ['日期', '任务总数', '正在运行任务', '异常任务比率'],
          rows: [
            { '日期': '1/1', '任务总数': 1393, '正在运行任务': 1093, '异常任务比率': 0.01 },
            { '日期': '1/2', '任务总数': 3530, '正在运行任务': 3230, '异常任务比率': 0.1 },
            { '日期': '1/3', '任务总数': 2923, '正在运行任务': 2623, '异常任务比率': 0.02 },
            { '日期': '1/4', '任务总数': 1723, '正在运行任务': 1423, '异常任务比率': 0.006 },
            { '日期': '1/5', '任务总数': 3792, '正在运行任务': 3492, '异常任务比率': 0.01 },
            { '日期': '1/6', '任务总数': 4593, '正在运行任务': 4293, '异常任务比率': 0.09 }
          ]
        }
      }
    },
    computed: {},
    watch: {}
  }
</script>
