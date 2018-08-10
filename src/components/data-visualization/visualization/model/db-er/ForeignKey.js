import Base from "../Base"

export default class ForeignKey extends Base{
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
     * 外键表ID
     * @type {String}
     */
    this.targetTableId = null
    /**
     * 外键表字段ID
     * @type {String}
     */
    this.targetTableColumnId = null
    /**
     * 别名，通常用于文字描述
     * @type {String}
     */
    this.alias = null
  }
}
