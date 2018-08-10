import EChartViewBar from './bar/ViewBar'
import EChartViewFunnel from './funnel/ViewFunnel'
import EChartViewHistogram from './histogram/ViewHistogram'
import EChartViewLine from './line/ViewLine'
import EChartViewBMap from './bmap/ViewBMap'
import EChartViewPie from './pie/ViewPie'
import EChartViewRadar from './radar/ViewRadar'
import EChartViewRing from './ring/ViewRing'
import EChartViewWaterfall from './waterfall/ViewWaterfall'

const install = {
  install: function (Vue) {
    Vue.component('echart-view-bar',EChartViewBar)
    Vue.component('echart-view-funnel',EChartViewFunnel)
    Vue.component('echart-view-histogram',EChartViewHistogram)
    Vue.component('echart-view-line',EChartViewLine)
    Vue.component('echart-view-b-map',EChartViewBMap)
    Vue.component('echart-view-pie',EChartViewPie)
    Vue.component('echart-view-radar',EChartViewRadar)
    Vue.component('echart-view-ring',EChartViewRing)
    Vue.component('echart-view-waterfall',EChartViewWaterfall)
  }
}
export default install
