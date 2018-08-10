import Base from "../Base"

export default class Column extends Base{
  constructor(){
    super()
    /**
     * ID
     * @type {String}
     */
    this.id = null
    /**
     * 列名
     * @type {String}
     */
    this.name = null
    /**
     * 数据库别名，常用语SQL中的 as 名称
     * @type {String}
     */
    this.asName = this.name
    /**
     * 页面显示别名，一般为中文显示名称，辅助设计目的
     * @type {String}
     */
    this.alias = this.name
    /**
     * 计算属性，通常被一些函数包裹
     * @type {String}
     */
    this.calculate = this.name
    /**
     * 是否被选中了
     * @type {boolean}
     */
    this.selected = false
  }
}
