<template>
  <ve-waterfall
    :data="chartData"
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
    :not-set-unchange	="chartConfig.notSetUnchange"></ve-waterfall>
</template>

<script>
  import VeWaterfall from 'v-charts/lib/waterfall.common'
  export default {
    props:{
      containerConfig: Object
    },
    components:{VeWaterfall},
    data: function () {
      return {
        container: this.containerConfig,
        chartConfig: this.containerConfig.chart.config,
        chartData: {
          columns: ['数据来源类型', '数据来源分析'],
          rows: [
            { '数据来源类型': ' 关系型数据库', '数据来源分析': 4 },
            { '数据来源类型': 'NoSql数据库', '数据来源分析': 10 },
            { '数据来源类型': '文件', '数据来源分析': 5 }
          ]
        }
      }
    },
    computed: {},
    watch: {}
  }
</script>
