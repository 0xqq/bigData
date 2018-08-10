<template>
  <ve-map :data="chartData"
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
          :not-set-unchange	="chartConfig.notSetUnchange"></ve-map>
</template>

<script>
  import VeMap from 'v-charts/lib/map.common'
  export default {
    props:{
      containerConfig: Object
    },
    components:{VeMap},
    data: function () {
      this.chartSettings = {
        position: 'china',
        label: false,
        itemStyle: {
          normal: {
            borderColor: '#00f'
          }
        },
        zoom: 1.2
      };
      return {
        container: this.containerConfig,
        chartConfig: this.containerConfig.chart.config,
        chartData: {
          columns: ['位置', '人口'],
          rows: [
            { '位置': '吉林', ' 人口': 123 },
            { '位置': '北京', ' 人口': 1223 },
            { '位置': '上海', ' 人口': 2123 },
            { '位置': '浙江', ' 人口': 4123 }
          ]
        }
      }
    },
    computed: {},
    watch: {}
  }
</script>
