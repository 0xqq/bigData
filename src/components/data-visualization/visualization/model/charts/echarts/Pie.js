import Core from "./Core";

export default class Pie extends Core{
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
       * legend显示数量限制
       * legend数量过多会导致饼图样式错误，限制legend最大值并且当超过此值时，隐藏legend可以解决这个问题
       */
      legendLimit: undefined,
      /**
       * 选中模式
       * 可选值：single, multiple，默认为false
       */
      selectedMode: "false",
      /**
       * 是否开启 hover 在扇区上的放大动画效果,默认值为true
       */
      hoverAnimation: true,
      /**
       * 饼图半径,数字型
       */
      radius: undefined,
      /**
       * 纵向偏移量
       */
      offsetY: undefined,
      /**
       * 设置数据类型为percent时保留的位数
       */
      digit: 2,
      /**
       * 显示为南丁格尔玫瑰图
       * 默认不展示为南丁格尔玫瑰图，可设置为'radius', 'area'
       */
      roseType: "",
      /**
       * 饼图图形上的文本标签
       */
      label: {},
      /**
       * 标签的视觉引导线样式
       */
      labelLine: {},
      /**
       * 图形样式
       */
      itemStyle: {},
      /**
       * 多圆饼图时设置
       */
      level: [],
      /**
       * 设置超过此数字时使用‘其他’代替，此时数据会根据有大到小的顺序显示,number
       */
      limitShowNum: undefined,
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
    this.copyAttribute(source.settings, target.settings, 'legendLimit')
    this.copyAttribute(source.settings, target.settings, 'selectedMode')
    this.copyAttribute(source.settings, target.settings, 'hoverAnimation')
    this.copyAttribute(source.settings, target.settings, 'radius')
    this.copyAttribute(source.settings, target.settings, 'offsetY')
    this.copyAttribute(source.settings, target.settings, 'digit')
    this.copyAttribute(source.settings, target.settings, 'roseType')
    this.copyAttribute(source.settings, target.settings, 'label')
    this.copyAttribute(source.settings, target.settings, 'labelLine')
    this.copyAttribute(source.settings, target.settings, 'itemStyle')
    this.copyAttribute(source.settings, target.settings, 'level')
    this.copyAttribute(source.settings, target.settings, 'limitShowNum')

    this.initCore(source,target)
  }
}
