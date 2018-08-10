import Container from "../Container";
import ConfigConstants from "../charts/ConfigConstants";
import Chart from "../Chart";
import ChartEnum from './ChartEnum';

/**
 * chart，按照类型进行区分
 * 如：柱形图、折线图
 */
class ChartContainer {
  constructor(chartEnum,containers=[new Container()]){
    this.id = chartEnum.id;
    this.name = chartEnum.name;
    this.icon = chartEnum.icon;
    /**
     * containers虽然为数组，但务必确保仅有length === 1
     * 数据结构为确保配合拖拽组件使用
     * @type {*[]}
     */
    this.containers = containers;
    this.initContainer();
  }
  /**
   * 获得容器
   * @param target
   * @returns {*}
   */
  getContainer(target=this){
    return target.containers[0];
  }
  initContainer(){
    let container = this.getContainer();
    container.chart = new Chart();
    container.chart.type = this.id;

    if(ConfigConstants.chartConfigMap.has(this.id)){
      container.chart.config = new (ConfigConstants.chartConfigMap.get(this.id))();
    }else {
      throw new Error("构建图表枚举时出现意外...出现了未知的图表id");
    }
  }
}
/**
 * charts枚举，分组封装，用于菜单显示
 */
class ChartContainerGroup {
  constructor(){
    this.list = [];
    this.map = new Map();
  }
  /**
   * 增加图表
   * @param chartContainer
   */
  addChartContainer(chartContainer){
    this.list.push(chartContainer);
    if(this.map.get(chartContainer.id)){
      throw new Error("请勿重复定义图表");
    }else{
      this.map.set(chartContainer.id,chartContainer);
    }
  }
}

const ChartContainerEnum = new ChartContainerGroup();
let chartContainer = null;

for (let value of ChartEnum.chartEnumMap.values()) {
  chartContainer = new ChartContainer(value);
  ChartContainerEnum.addChartContainer(chartContainer);
}

export default ChartContainerEnum
