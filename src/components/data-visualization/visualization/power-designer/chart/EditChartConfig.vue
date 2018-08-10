<script>
  import Vue from 'vue'
  import Inject from "@/common/model/Inject"
  import EventDispatcher from "@/common/event/EventDispatcher"
  import EventList from "@/common/event/EventList"
  import ChartEnum from "../../model/enums/ChartEnum"
  import Chart from '../../model/Chart'
  import Common from '../common'
  import EchartConfigComponents from './echarts/EchartConfigComponents'

  Vue.use(Common)
  Vue.use(EchartConfigComponents)

  export default {
    props: {},
    components:{},
    data() {
      this.chartPM = Inject.getClass(Chart)
      return {
        chart: this.chartPM,
        ChartEnum: ChartEnum
      }
    },
    computed: {},
    mounted() {},
    activated() {},
    methods: {
      save(){
        EventDispatcher.disEvent(EventList.CHART_CONFIG_COMPLETE)
      },
      removeListeners(){
        EventDispatcher.removeListener(EventList.CHART_CONFIG_COMPLETE)
      }
    }
  }
</script>
<template>
  <el-dialog @close="removeListeners" :visible.sync="chart.showConfigEdit" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" :fullscreen="true">
    <div slot="title">
      <span style="height: 45px; line-height: 45px;">显示配置项编辑</span>
      <el-button type="primary" icon="iconfont tj-icon-save" @click="save" class="chart-title-btn">保存</el-button>
      <el-button type="info" icon="iconfont tj-icon-backward" @click="chart.showConfigEdit = false" class="chart-title-btn">取消</el-button>
    </div>
    <echart-config-bar v-if="chart.type === ChartEnum.ECHARTS_BAR.id"></echart-config-bar>
    <echart-config-funnel v-else-if="chart.type === ChartEnum.ECHARTS_FUNNEL.id"></echart-config-funnel>
    <echart-config-histogram v-else-if="chart.type === ChartEnum.ECHARTS_HISTOGRAM.id"></echart-config-histogram>
    <echart-config-line v-else-if="chart.type === ChartEnum.ECHARTS_LINE.id"></echart-config-line>
    <echart-config-b-map v-else-if="chart.type === ChartEnum.ECHARTS_BMAP.id"></echart-config-b-map>
    <echart-config-pie v-else-if="chart.type === ChartEnum.ECHARTS_PIE.id"></echart-config-pie>
    <echart-config-radar v-else-if="chart.type === ChartEnum.ECHARTS_RADAR.id"></echart-config-radar>
    <echart-config-ring v-else-if="chart.type === ChartEnum.ECHARTS_RING.id"></echart-config-ring>
    <echart-config-waterfall v-else-if="chart.type === ChartEnum.ECHARTS_WATERFALL.id"></echart-config-waterfall>
  </el-dialog>
</template>

<style scoped lang="scss">
  .chart-title-btn{
    float: right;
    margin-left: 10px;
  }
</style>
