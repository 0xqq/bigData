import Base from "../Base"

export default class Group extends Base{
  constructor(){
    super()

    /**
     * 主键
     * @type {String}
     */
    this.id = null
    /**
     * 当前表ID
     * @type {String}
     */
    this.tableId = null
    /**
     * 当前表字段ID
     * @type {String}
     */
    this.columnId = null
    /**
     * 排序码
     * @type {Number}
     */
    this.sortNumber = null
  }
}
