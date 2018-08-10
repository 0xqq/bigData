import Core from "./Core";

/**
 * 参数说明详见v-charts Radar
 */
export default class Radar extends Core{
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
      metrics: [],
      /**
       * 数据类型，可选值: , KMB,normal,例如percent{ '占比': 'percent' }
       */
      dataType: {},
      /**
       * 设置数据类型为percent时保留的位数
       */
      digit: 2,
      /**
       * 设置图形上的文本标签
       */
      label:{},
      /**
       * 折线拐点标志的样式
       */
      itemStyle: {},
      /**
       * 线条样式
       */
      LineStyle: {},
      /**
       * 区域填充样式
       */
      areaStyle: {},
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
    this.copyAttribute(source.settings, target.settings, 'digit')
    this.copyAttribute(source.settings, target.settings, 'areaStyle')
    this.copyAttribute(source.settings, target.settings, 'label')
    this.copyAttribute(source.settings, target.settings, 'lineStyle')
    this.copyAttribute(source.settings, target.settings, 'itemStyle')

    this.initCore(source,target)
  }
}
