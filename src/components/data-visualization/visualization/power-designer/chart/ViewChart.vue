<script>
  import Vue from 'vue'
  import ChartEnum from '../../model/enums/ChartEnum'
  import EchartViewComponents from './echarts/EchartViewComponents'

  Vue.use(EchartViewComponents)

  export default {
    props:{
      containerConfig: Object
    },
    components:{},
    data() {
      return {
        container: this.containerConfig,
        ChartEnum: ChartEnum
      }
    },
    computed: {},
    mounted() {},
    activated() {},
    methods: {},
    watch: {}
  }
</script>

<template>
  <div style="width: 100%; height: 100%;">
    <echart-view-bar :containerConfig="container" v-if="container.chart.type === ChartEnum.ECHARTS_BAR.id" :key="container.chart.randomID"></echart-view-bar>
    <echart-view-funnel :containerConfig="container" v-if="container.chart.type === ChartEnum.ECHARTS_FUNNEL.id"></echart-view-funnel>
    <echart-view-histogram :containerConfig="container" v-if="container.chart.type === ChartEnum.ECHARTS_HISTOGRAM.id"></echart-view-histogram>
    <echart-view-line :containerConfig="container" v-if="container.chart.type === ChartEnum.ECHARTS_LINE.id"></echart-view-line>
    <echart-view-b-map :containerConfig="container" v-if="container.chart.type === ChartEnum.ECHARTS_BMAP.id"></echart-view-b-map>
    <echart-view-pie :containerConfig="container" v-if="container.chart.type === ChartEnum.ECHARTS_PIE.id"></echart-view-pie>
    <echart-view-radar :containerConfig="container" v-if="container.chart.type === ChartEnum.ECHARTS_RADAR.id"></echart-view-radar>
    <echart-view-ring :containerConfig="container" v-if="container.chart.type === ChartEnum.ECHARTS_RING.id"></echart-view-ring>
    <echart-view-waterfall :containerConfig="container" v-if="container.chart.type === ChartEnum.ECHARTS_WATERFALL.id"></echart-view-waterfall>
  </div>
</template>

<style scoped lang="scss">

</style>
