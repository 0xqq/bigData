<template>
  <ve-funnel :data="chartData"
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
             :not-set-unchange	="chartConfig.notSetUnchange"></ve-funnel>
</template>

<script>
  import VeFunnel from 'v-charts/lib/funnel.common'
  export default {
    props:{
      containerConfig: Object
    },
    components:{VeFunnel},
    data: function () {
      return {
        container: this.containerConfig,
        chartConfig: this.containerConfig.chart.config,
        chartData: {
          columns: ['数据来源机构', '数值'],
          rows: [
            { '数据来源机构': '民政局', '数值': 900 },
            { '数据来源机构': '工商局', '数值': 600 },
            { '数据来源机构': '公安局', '数值': 300 },
            { '数据来源机构': '气象局', '数值': 100 }
          ]
        }
      }
    },
    computed: {},
    watch: {}
  }
</script>
