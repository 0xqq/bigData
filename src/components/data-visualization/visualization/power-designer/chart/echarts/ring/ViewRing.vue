<template>
  <ve-ring :data="chartData"
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
           :not-set-unchange	="chartConfig.notSetUnchange"></ve-ring>
</template>

<script>
  import VeRing from 'v-charts/lib/ring.common'
  export default {
    props:{
      containerConfig: Object
    },
    components:{VeRing},
    data: function () {
      return {
        container: this.containerConfig,
        chartConfig: this.containerConfig.chart.config,
        chartData: {
          columns: ['来源', '占比'],
          rows: [
            { '来源': '平台接入', '占比': 1393 },
            { '来源': '共享交换', '占比': 3530 },
            { '来源': '拷盘', '占比': 2923 },
            { '来源': '邮件', '占比': 1723 }
          ]
        }
      }
    },
    computed: {},
    watch: {}
  }
</script>
