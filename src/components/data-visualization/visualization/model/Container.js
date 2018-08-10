import Base from "./Base";
import LayoutItem from "./LayoutItem";

export default class Container extends Base{
  constructor(id=NormalUtils.createUUid("container-",32),layoutItemId=null) {
    super();
    this.id = id;
    /**
     * 容器反向关联所在的布局item，用户编辑过程中，重新调整布局时，可快速溯源定位
     * layoutId在编辑过程中，由于拖拽行为，导致他实际指向的可能不是他的真实layoutItemId
     * 使用该属性时慎重，通常，保存至数据库时，会重新梳理和定义确保指向正确
     */
    this.layoutItemId = layoutItemId;
    /**
     * 样式封装
     * 后端字符串存储
     * @type {Object}
     */
    this.style = {
      height: '300px',
      width: '300px',
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      float: 'none'
    };
    /**
     * echarts图表封装
     * @type {null}
     */
    this.chart = null;
    /**
     * 容器基本属性编辑使用
     */
    this.show = false;
  }

  /**
   * 初始化容器基本信息
   * @param container
   * @param target
   */
  initContainerBase(container,target=this){
    Object.assign(target.style,container.style);
  }
}
