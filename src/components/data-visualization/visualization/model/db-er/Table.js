import Base from "../Base"

/**
 * 关于SQL构建的说明
 * 1、目前子查询不支持多表关联，仅支持单表的where过滤
 * 2、目前不支持union联合操作
 */
export default class Table extends Base{
    constructor(){
      super()
      /**
       * ID
       * @type {String}
       */
      this.id = null
      /**
       * 图表ID
       * @type {null}
       */
      this.chartId = null
      /**
       * 表名
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
       * 进行对象封装，详见: Column.js
       * @type {Array}
       */
      this.columns = []
      /**
       * 关联关系，详见: ForeignKey.js
       * @type {Object}
       */
      this.foreignKeys = []
      /**
       * 条件过滤，进行对象封装详见: Condition.js
       * @type {Array}
       */
      this.conditions = []
      /**
       * group by分组，详见Group.js
       * @type {Array}
       */
      this.groups = []
      /**
       * 排序，详见Order.js
       * @type {Array}
       */
      this.orders = []
    }
}
