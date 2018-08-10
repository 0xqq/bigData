<template>
  <ve-bar :data="chartData"
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
          :not-set-unchange	="chartConfig.notSetUnchange"></ve-bar>
</template>

<script>
  import VeBar from 'v-charts/lib/bar.common'
  export default {
    props:{
      containerConfig: Object
    },
    components:{VeBar},
    data: function () {
      return {
        container: this.containerConfig,
        chartConfig: this.containerConfig.chart.config,
        chartData: {
          columns: ['日期', '接入任务', '处理任务', '处理率'],
          rows: [
            { '日期': '1/1', '接入任务': 1393, '处理任务': 1093, '处理率': 0.32 },
            { '日期': '1/2', '接入任务': 3530, '处理任务': 3230, '处理率': 0.26 },
            { '日期': '1/3', '接入任务': 2923, '处理任务': 2623, '处理率': 0.76 },
            { '日期': '1/4', '接入任务': 1723, '处理任务': 1423, '处理率': 0.49 },
            { '日期': '1/5', '接入任务': 3792, '处理任务': 3492, '处理率': 0.323 },
            { '日期': '1/6', '接入任务': 4593, '处理任务': 4293, '处理率': 0.78 }
          ]
        }
      }
    },
    computed: {},
    watch: {}
  }
</script>
