import EChartConfigBar from './bar/ConfigBar'
import EChartConfigFunnel from './funnel/ConfigFunnel'
import EChartConfigHistogram from './histogram/ConfigHistogram'
import EChartConfigLine from './line/ConfigLine'
import EChartConfigBMap from './bmap/ConfigBMap'
import EChartConfigPie from './pie/ConfigPie'
import EChartConfigRadar from './radar/ConfigRadar'
import EChartConfigRing from './ring/ConfigRing'
import EChartConfigWaterfall from './waterfall/ConfigWaterfall'

const install = {
  install: function (Vue) {
    Vue.component('echart-config-bar',EChartConfigBar)
    Vue.component('echart-config-funnel',EChartConfigFunnel)
    Vue.component('echart-config-histogram',EChartConfigHistogram)
    Vue.component('echart-config-line',EChartConfigLine)
    Vue.component('echart-config-b-map',EChartConfigBMap)
    Vue.component('echart-config-pie',EChartConfigPie)
    Vue.component('echart-config-radar',EChartConfigRadar)
    Vue.component('echart-config-ring',EChartConfigRing)
    Vue.component('echart-config-waterfall',EChartConfigWaterfall)
  }
}
export default install


