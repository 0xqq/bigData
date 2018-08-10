import Base from "./Base";

/**
 * 面向vue-grid-layout组件的配置
 * 构造函数中的参数为必填项,其中containers为自有容器对象封装
 */
export default class LayoutItem extends Base {
  constructor(layoutId,i=NormalUtils.createUUid("layout-item-",32),x=0,y=0,w=1,h=1,containers=[]) {
    super();
    /**
     * 唯一索引值（该字段有前端生成和管理，后端服务不涉及自动ID生成）
     */
    this.i = i;
    /**
     * 水平位置，必须为整数，可以理解为第几列
     * @type {number}
     */
    this.x = x;
    /**
     * 垂直位置，必须为整数，可以理解为第几行
     * @type {number}
     */
    this.y = y;
    /**
     * 横向的宽度，可以理解为横向占据多少列
     * @type {number}
     */
    this.w = w;
    /**
     * 垂直方向高度，可以理解为占据多少行
     * @type {number}
     */
    this.h = h;
    // this.minW  暂不考虑该配置项
    // this.minH  暂不考虑该配置项
    // this.maxW  暂不考虑该配置项
    // this.maxH  暂不考虑该配置项
    this.isDraggable = true;
    this.isResizable = true;
    /**
     * 严格为常量使用，请勿随意修改
     * @type {string}
     */
    this.dragIgnoreFrom = "a, button";
    /**
     * 严格为常量使用，请勿随意修改
     * 拖拽行为触发条件，当某元素具有该class，鼠标放置上方，点击，可实现拖拽
     * @type {string}
     */
    this.dragAllowFrom = ".vue-draggable-class";
    /**
     * 严格为常量使用，请勿随意修改
     * @type {string}
     */
    this.resizeIgnoreFrom = "a, button";

    /****************************************************/
    /********以下配置项为自有封装，结合了容器、仪表盘信息******/
    /****************************************************/
    /**
     * 数据库唯一ID，通常为主键
     * @type {String}
     */
    this.id = null;
    /**
     * 所属布局ID
     */
    this.layoutId = layoutId;
    /**
     * 一个布局item可以包含至少一个容器，每个容器，至多包含一个图表
     * @type {[]}
     */
    this.containers = containers;
    for(let i in containers){
      containers[i].layoutItemId = this.i;
    }
  }

  /**
   * 编辑过程中，为防止破坏data结构，使用该方法进行加载数据
   */
  initLayoutItemBase(layoutItem,target=this){
    target.i = layoutItem.i;
    target.x = layoutItem.x;
    target.y = layoutItem.y;
    target.w = layoutItem.w;
    target.h = layoutItem.h;
    // target.minW  暂不考虑该配置项
    // target.minH  暂不考虑该配置项
    // target.maxW  暂不考虑该配置项
    // target.maxH  暂不考虑该配置项
    target.isDraggable = layoutItem.isDraggable;
    target.isResizable = layoutItem.isResizable;
    target.dragIgnoreFrom = layoutItem.dragIgnoreFrom;
    target.dragAllowFrom = layoutItem.dragAllowFrom;
    target.resizeIgnoreFrom = layoutItem.resizeIgnoreFrom;
    target.layoutId = layoutItem.layoutId;
    target.containers = layoutItem.containers;
    for(let i in target.containers){
      target.containers[i].layoutItemId = target.i;
    }
  }
}
