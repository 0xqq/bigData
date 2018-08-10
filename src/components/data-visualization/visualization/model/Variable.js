import Base from "./Base";

export default class Variable extends Base{
  constructor(pageId, screenId, chartId, name, alias, values=[]){
    super();
    /**
     * 主键
     * @type {String}
     */
    this.id = null;
    /**
     * 页面ID
     * @type {String}
     */
    this.pageId = pageId;
    /**
     * 屏幕ID
     * @type {String}
     */
    this.screenId = screenId;
    /**
     * 图表ID
     * @type {String}
     */
    this.chartId = chartId;
    /**
     * 变量名称
     * @type {String}
     */
    this.name = name;
    /**
     * 别名，通常用于变量的文字描述
     * @type {String}
     */
    this.alias = alias;
    /**
     * 取值
     * @type {Array}
     */
    this.values = values;
  }
}
