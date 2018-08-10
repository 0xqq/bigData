import Base from "./Base";

export default class Chart extends Base{
  constructor(type,config){
    super();
    /**
     * 图表类型
     */
    this.type = type
    /**
     * 图表属性配置项，面向不同的type可能config得结构是不一样的
     * 后端字符串存储
     */
    this.config = config
    /**
     * 数据源ID，从哪个库执行查询操作
     * 单个仪表，目前不支持跨数据源查询
     * @type {Object}
     */
    this.dataSourceId = null
    /**
     * SQL动态构建关系,
     * @type {[Table]}
     */
    this.tables = []
    /**
     * 用于可视化图表基本属性
     * @type {boolean}
     */
    this.showConfigEdit = false
    /**
     * 用于可视化编辑数据源
     * @type {boolean}
     */
    this.showDatasourceEdit = false
  }
}
