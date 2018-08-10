class ChartBase {
  constructor(id,name,icon){
    this.id = id;
    this.name = name;
    this.icon = icon;
  }
}

const ChartEnum = {}
ChartEnum.chartEnumMap = new Map()

ChartEnum.ECHARTS_BAR = new ChartBase('echarts_bar', '条形图', require('@/assets/image/charts/echarts/bar.png'))
ChartEnum.chartEnumMap.set(ChartEnum.ECHARTS_BAR.id, ChartEnum.ECHARTS_BAR)

ChartEnum.ECHARTS_FUNNEL = new ChartBase('echarts_funnel', '漏斗图', require('@/assets/image/charts/echarts/funnel.png'))
ChartEnum.chartEnumMap.set(ChartEnum.ECHARTS_FUNNEL.id, ChartEnum.ECHARTS_FUNNEL)

ChartEnum.ECHARTS_HISTOGRAM = new ChartBase('echarts_histogram', '柱形图', require('@/assets/image/charts/echarts/histogram.png'))
ChartEnum.chartEnumMap.set(ChartEnum.ECHARTS_HISTOGRAM.id, ChartEnum.ECHARTS_HISTOGRAM)

ChartEnum.ECHARTS_LINE = new ChartBase('echarts_line', '折线图', require('@/assets/image/charts/echarts/line.png'))
ChartEnum.chartEnumMap.set(ChartEnum.ECHARTS_LINE.id, ChartEnum.ECHARTS_LINE)

ChartEnum.ECHARTS_BMAP = new ChartBase('echarts_bmap', '地图', require('@/assets/image/charts/echarts/bmap.png'))
ChartEnum.chartEnumMap.set(ChartEnum.ECHARTS_BMAP.id, ChartEnum.ECHARTS_BMAP)

ChartEnum.ECHARTS_PIE = new ChartBase('echarts_pie', '饼图', require('@/assets/image/charts/echarts/pie.png'))
ChartEnum.chartEnumMap.set(ChartEnum.ECHARTS_PIE.id, ChartEnum.ECHARTS_PIE)

ChartEnum.ECHARTS_RADAR = new ChartBase('echarts_radar', '雷达图', require('@/assets/image/charts/echarts/radar.png'))
ChartEnum.chartEnumMap.set(ChartEnum.ECHARTS_RADAR.id, ChartEnum.ECHARTS_RADAR)

ChartEnum.ECHARTS_RING = new ChartBase('echarts_ring', '环图', require('@/assets/image/charts/echarts/ring.png'))
ChartEnum.chartEnumMap.set(ChartEnum.ECHARTS_RING.id, ChartEnum.ECHARTS_RING)

ChartEnum.ECHARTS_WATERFALL = new ChartBase('echarts_waterfall', '瀑布图', require('@/assets/image/charts/echarts/waterfall.png'))
ChartEnum.chartEnumMap.set(ChartEnum.ECHARTS_WATERFALL.id, ChartEnum.ECHARTS_WATERFALL)


export default ChartEnum
