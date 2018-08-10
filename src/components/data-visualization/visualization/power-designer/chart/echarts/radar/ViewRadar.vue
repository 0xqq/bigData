<template>
  <ve-radar :data="chartData"
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
            :not-set-unchange	="chartConfig.notSetUnchange"></ve-radar>
</template>

<script>
  import VeRadar from 'v-charts/lib/radar.common'
  export default {
    props:{
      containerConfig: Object
    },
    components:{VeRadar},
    data: function () {
      return {
        container: this.containerConfig,
        chartConfig: this.containerConfig.chart.config,
        chartData: {
          columns: ['日期', '平台接入', '共享交换', '拷盘'],
          rows: [
            { '日期': '1/1', '平台接入': 1393, '共享交换': 1093, '拷盘': 1101 },
            { '日期': '1/2', '平台接入': 3530, '共享交换': 3230, '拷盘': 2100 },
            { '日期': '1/3', '平台接入': 2923, '共享交换': 2623, '拷盘': 1011 },
            { '日期': '1/4', '平台接入': 1723, '共享交换': 1423, '拷盘': 2011 },
            { '日期': '1/5', '平台接入': 3792, '共享交换': 3492, '拷盘': 1988 },
            { '日期': '1/6', '平台接入': 4593, '共享交换': 4293, '拷盘': 1566 }
          ]
        }
      }
    },
    computed: {},
    watch: {}
  }
</script>
