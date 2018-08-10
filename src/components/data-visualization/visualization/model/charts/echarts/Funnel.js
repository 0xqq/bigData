import Core from "./Core";

/**
 * 参数说明详见v-charts Funnel
 */
export default class Funnel extends Core{
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
      dimension: "",
      /**
       * 指标，默认columns第二项起为指标
       */
      metrics: "",
      /**
       * 数据类型，可选值: , KMB,normal,percent
       */
      dataType: undefined,
      /**
       * 数据显示顺序，默认按照数据大小顺序
       */
      sequence: [],
      /**
       * 是否显示为金字塔，默认为false
       */
      ascending: false,
      /**
       * 是否自动按照数值大小排序,默认为false
       */
      useDefaultOrder: false,
      /**
       * 是否过滤指标为0的数据,默认为false
       */
      filterZero: false,
      /**
       * 设置数据类型为percent时保留的位数
       */
      digit: 2,
      /**
       * 设置图形上的文本标签
       */
      label:{},
      /**
       * 标签的视觉引导线样式
       */
      labelLine: {},
      /**
       * 图形样式
       */
      itemStyle: {},
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
    this.copyAttribute(source.settings, target.settings, 'dataType')
    this.copyAttribute(source.settings, target.settings, 'sequence')
    this.copyAttribute(source.settings, target.settings, 'ascending')
    this.copyAttribute(source.settings, target.settings, 'useDefaultOrder')
    this.copyAttribute(source.settings, target.settings, 'filterZero')
    this.copyAttribute(source.settings, target.settings, 'digit')
    this.copyAttribute(source.settings, target.settings, 'label')
    this.copyAttribute(source.settings, target.settings, 'labelLine')
    this.copyAttribute(source.settings, target.settings, 'itemStyle')

    this.initCore(source,target)
  }
}
