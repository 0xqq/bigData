import Base from "../Base"
import ConditionTypeEnum from '../enums/ConditionTypeEnum'
import Variable from "../Variable";

export default class Condition extends Base{
  constructor(type=ConditionTypeEnum.EQUAL){
    super()

    /**
     * 主键
     * @type {String}
     */
    this.id = null
    /**
     * 条件类型，ConditionTypeEnum.js
     */
    this.type = type
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
     * 是否使用Column的calculate封装至条件中
     * @type {String}
     */
    this.useCalculate = false
    /**
     * 变量ID
     * @type {String}
     */
    this.variableId = null
  }
}
