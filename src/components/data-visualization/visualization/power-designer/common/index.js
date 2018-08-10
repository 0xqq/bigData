import ArrayItemInput from './form/ArrayItemInput'
import ArrayItemSwitch from './form/ArrayItemSwitch'

import EchartJsonEditor from './editor/EchartsJsonEditor'

import EchartStack from './echarts/Stack'
import EchartDimensionMetric from './echarts/DimensionMetric'
import EchartCommonConfig from './echarts/CommonConfig'
import EchartVerticalMinMax from './echarts/vertical/MinMax'
import EchartVerticalScale from './echarts/vertical/Scale'
import EchartVerticalYAxisName from './echarts/vertical/YAxisName'
import EchartVerticalYAxisType from './echarts/vertical/YAxisType'
import EchartHorizontalAxisSite from './echarts/horizontal/AxisSite'
import EchartHorizontalXAxisType from './echarts/horizontal/XAxisType'

const install = {
  install: function (Vue) {
    //-----------------------------------------表单辅助组件 -----------------------------
    Vue.component('form-array-item-input',ArrayItemInput)
    Vue.component('form-array-item-switch',ArrayItemSwitch)
    //-----------------------------------------JSON编辑器 ------------------------------
    Vue.component('echart-json-editor',EchartJsonEditor)
    //-----------------------------------------Echarts组件 -------------------------
    Vue.component('echart-stack',EchartStack)
    Vue.component('echart-dimension-metric',EchartDimensionMetric)
    Vue.component('echart-common-config',EchartCommonConfig)
    Vue.component('echart-vertical-min-max',EchartVerticalMinMax)
    Vue.component('echart-vertical-scale',EchartVerticalScale)
    Vue.component('echart-vertical-y-axis-name',EchartVerticalYAxisName)
    Vue.component('echart-vertical-y-axis-type',EchartVerticalYAxisType)
    Vue.component('echart-horizontal-axis-site',EchartHorizontalAxisSite)
    Vue.component('echart-horizontal-x-axis-type',EchartHorizontalXAxisType)
    //----------------------------------------- directive ---------------------------
    // Vue.use(NormalDirective)
  }
}
export default install
