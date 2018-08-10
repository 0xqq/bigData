import Base from "../Base"

export default class Order extends Base {
  constructor() {
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
     * 升序还是降序
     * @type {boolean}
     */
    this.isDesc = false
  }
}
