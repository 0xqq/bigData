import Core from "./Core";

export default class Histogram extends Core{
  constructor(){
    super()
    this.data = {
      /**
       * 构建SQL过程中，形成了columns的具体取值
       * 除此之外，其他位置无需进行编辑
       */
      columns: [],
      /**
       *
       */
      rows: []
    }
    this.settings = {
      /**
       * 维度，默认columns第一项为维度
       */
      dimension: [],
      /**
       * 指标，默认columns第二项起为指标
       */
      metrics: [],
      /**
       * 左右坐标轴数据类型,可选值: KMB, normal, percent
       */
      yAxisType: ['normal'],
      /**
       * 左右坐标轴标题
       */
      yAxisName: [],
      /**
       * 指标所在的轴,默认不在right轴的指标都在left轴
       */
      axisSite: {left: [],right: []},
      /**
       * 堆叠选项
       */
      stack: {},
      /**
       * 	设置数据类型为percent时保留的位数
       */
      digit: 2,
      /**
       * 设置数据排序方式
       */
      dataOrder: false,
      /**
       * 	是否是脱离 0 值比例
       * 	默认为[false, false]，表示左右两个轴都不会脱离0值比例。设置成 true 后坐标刻度不会强制包含零刻度
       */
      scale:[false,false],
      /**
       * 左右坐标轴最小值
       * 二元数组，例如：[100, 300]；也可以设置为['dataMin', 'dataMin']，此时表示使用该坐标轴上的最小值为最小刻度
       */
      min: ['dataMin', 'dataMin'],
      /**
       * 左右坐标轴最大值
       * 二元数组，例如：[100, 300]；也可以设置为['dataMax', 'dataMax']，此时表示使用该坐标轴上的最大值为最大刻度
       */
      max: ['dataMax', 'dataMax'],
      /**
       * 设置指标的别名，同时作用于提示框和图例
       */
      labelMap: {},
      /**
       * 设置图表上方图例的别名
       */
      legendName: {},
      /**
       * 设置图形上的文本标签
       */
      label: {},
      /**
       * 图形样式
       */
      itemStyle: {},
      /**
       * 展示为折线图的指标
       */
      showLine: [],
      /**
       * 	横轴的类型,可选值'category'，'value'，默认为'category'
       */
      xAxisType: 'category',
      /**
       * 	透明度
       */
      opacity: 0
    }

  }

  /**
   * 覆盖父类方法
   * 仅设计子类自身属性值设置
   * @param source
   * @param target
   */
  init(source,target=this){
    this.copyAttribute(source.data, target.data, 'columns')
    this.copyAttribute(source.data, target.data, 'rows')

    this.copyAttribute(source.settings, target.settings, 'dimension')
    this.copyAttribute(source.settings, target.settings, 'metrics')
    this.copyAttribute(source.settings, target.settings, 'yAxisType')
    this.copyAttribute(source.settings, target.settings, 'yAxisName')
    this.copyAttribute(source.settings, target.settings, 'axisSite')
    this.copyAttribute(source.settings, target.settings, 'stack')
    this.copyAttribute(source.settings, target.settings, 'digit')
    this.copyAttribute(source.settings, target.settings, 'dataOrder')
    this.copyAttribute(source.settings, target.settings, 'scale')
    this.copyAttribute(source.settings, target.settings, 'min')
    this.copyAttribute(source.settings, target.settings, 'max')
    this.copyAttribute(source.settings, target.settings, 'labelMap')
    this.copyAttribute(source.settings, target.settings, 'legendName')
    this.copyAttribute(source.settings, target.settings, 'label')
    this.copyAttribute(source.settings, target.settings, 'itemStyle')
    this.copyAttribute(source.settings, target.settings, 'showLine')
    this.copyAttribute(source.settings, target.settings, 'xAxisType')
    this.copyAttribute(source.settings, target.settings, 'opacity')

    this.initCore(source,target)
  }
}
