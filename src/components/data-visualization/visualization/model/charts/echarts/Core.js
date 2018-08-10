/**
 * 配置项属性基类，请参考当前使用的v-charts组件
 * 位于其源码：src/packages/core
 * v-charts中未给予默认值的则此处给予undefined作为默认值
 */
import EchartsThemeEnum from '../../enums/echarts/ThemeEnum'

export default class Core{
  constructor() {
    /**
     * 宽度，无需配置，自动获取容器宽度
     * @type {string}
     */
    this.width = 'auto'
    /**
     * 高度，无需配置，自动获取容器高度
     * @type {string}
     */
    this.height = '400px'

    this.events = undefined
    /**
     * Echarts init参数，结合封装，此处并非所有属性都需要封装
     * 详见 http://echarts.baidu.com/api.html#echarts.init
     * @returns {{}}
     */
    this.initOptions = {
      renderer: 'canvas',  //canvas/svg
    }
    /**
     * 是否显示提示框
     * @type {boolean}
     */
    this.tooltipVisible = true
    /**
     * 图例是否可见
     * @type {boolean}
     */
    this.legendVisible = true
    /**
     * 主题配置项
     * 无需配置，通过theme-name实现
     * @type {}
     */
    this.theme = null
    /**
     * 主题名称
     * @type {String}
     */
    this.themeName = EchartsThemeEnum.ECHARTS_DEFAULT.id
    /**
     * 是否处理生成图表时的宽度问题
     * 无需配置
     * @type {boolean}
     */
    this.judgeWidth = false
    /**
     * 容器宽度变化的延迟
     * 无需配置
     * @type {number}
     */
    this.widthChangeDelay = 300
    /**
     * 是否处理窗口 resize 事件
     * 无需配置
     * @type {boolean}
     */
    this.resizeable = true
    /**
     * 是否禁用 resize 时的容器检测
     * 无需配置
     * @type {boolean}
     */
    this.cancelResizeCheck = false
    /**
     * 窗口 resize 事件回调的延迟
     * @type {number}
     */
    this.resizeDelay = 200
    /**
     * 属性修改触发图表重绘回调的延迟
     * 无需配置
     * @type {number}
     */
    this.changeDelay = 0
    /**
     * echarts setOption 的第二个参数
     * 无需配置
     * @type {boolean}
     */
    this.setOptionOpts = true
    /**
     * 未发生变化时不参加 setOption 的属性
     * 无需配置
     * @type {[]}
     */
    this.notSetUnchange = undefined

    //增加标识元素的属性
    this.markLine = undefined
    this.markArea = undefined
    this.markPoint = undefined

    //状态属性
    /**
     * 加载状态
     * 无需配置
     * @type {boolean}
     */
    this.loading = false
    /**
     * 空数据
     * 无需配置
     * @type {boolean}
     */
    this.dataEmpty = true
    /**
     * 拓展配置，目前提供的可视化配置可能无法满足实际的需求
     * 该字段用于封装原生Echarts配置项
     * @type {Object}
     */
    this.extend = "{}"
  }
  /**
   * 数据初始化，子类必须重写
   * 此处仅面向公共属性的值设置
   * 此类重写也仅设计子类自身属性值设置
   */
  initCore(source,target=this){
    this.copyAttribute(source, target, 'width')
    this.copyAttribute(source, target, 'height')
    this.copyAttribute(source, target, 'events')
    this.copyAttribute(source, target, 'initOptions')
    this.copyAttribute(source, target, 'tooltipVisible')
    this.copyAttribute(source, target, 'legendVisible')
    this.copyAttribute(source, target, 'themeName')
    this.copyAttribute(source, target, 'judgeWidth')
    this.copyAttribute(source, target, 'widthChangeDelay')
    this.copyAttribute(source, target, 'resizeable')
    this.copyAttribute(source, target, 'cancelResizeCheck')
    this.copyAttribute(source, target, 'resizeDelay')
    this.copyAttribute(source, target, 'changeDelay')
    this.copyAttribute(source, target, 'setOptionOpts')
    this.copyAttribute(source, target, 'markLine')
    this.copyAttribute(source, target, 'markArea')
    this.copyAttribute(source, target, 'markPoint')
    this.copyAttribute(source, target, 'loading')
    this.copyAttribute(source, target, 'dataEmpty')
    this.copyAttribute(source, target, 'extend')
  }

  copyAttribute(source,target,filed){
    if(Array.isArray(source[filed])){
      target[filed] = source[filed].concat()
    }else{
      target[filed] = source[filed]
    }
  }
}
