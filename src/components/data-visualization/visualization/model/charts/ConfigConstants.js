import ChartEnum from '../enums/ChartEnum'

import ECHARTS_BAR from './echarts/Bar'
import ECHARTS_FUNNEL from './echarts/Funnel'
import ECHARTS_HISTOGRAM from './echarts/Histogram'
import ECHARTS_LINE from './echarts/Line'
import ECHARTS_BMAP from './echarts/BMap'
import ECHARTS_PIE from './echarts/Pie'
import ECHARTS_RADAR from './echarts/Radar'
import ECHARTS_RING from './echarts/Ring'
import ECHARTS_WATERFALL from './echarts/Waterfall'

class ConfigConstants{
  constructor(){

    this.chartConfigMap = new Map()

    this.ECHARTS_BAR = ECHARTS_BAR
    this.chartConfigMap.set(ChartEnum.ECHARTS_BAR.id,ECHARTS_BAR)

    this.ECHARTS_FUNNEL = ECHARTS_FUNNEL
    this.chartConfigMap.set(ChartEnum.ECHARTS_FUNNEL.id, ECHARTS_FUNNEL)

    this.ECHARTS_HISTOGRAM = ECHARTS_HISTOGRAM
    this.chartConfigMap.set(ChartEnum.ECHARTS_HISTOGRAM.id, ECHARTS_HISTOGRAM)

    this.ECHARTS_LINE = ECHARTS_LINE
    this.chartConfigMap.set(ChartEnum.ECHARTS_LINE.id, ECHARTS_LINE)

    this.ECHARTS_BMAP = ECHARTS_BMAP
    this.chartConfigMap.set(ChartEnum.ECHARTS_BMAP.id, ECHARTS_BMAP)

    this.ECHARTS_PIE = ECHARTS_PIE
    this.chartConfigMap.set(ChartEnum.ECHARTS_PIE.id, ECHARTS_PIE)

    this.ECHARTS_RADAR = ECHARTS_RADAR
    this.chartConfigMap.set(ChartEnum.ECHARTS_RADAR.id, ECHARTS_RADAR)

    this.ECHARTS_RING = ECHARTS_RING
    this.chartConfigMap.set(ChartEnum.ECHARTS_RING.id, ECHARTS_RING)

    this.ECHARTS_WATERFALL = ECHARTS_WATERFALL
    this.chartConfigMap.set(ChartEnum.ECHARTS_WATERFALL.id, ECHARTS_WATERFALL)
  }
}

export default new ConfigConstants();

