import Base from "./Base";
import LayoutItem from "./LayoutItem";

/**
 * 面向vue-grid-layout组件的配置
 * 构造函数中的参数为必填项
 * 使用该类时，请务必使用单例模式
 */
export default class Layout extends Base {
  constructor(screenId,layoutItems=[new LayoutItem()]) {
    super();
    /**
     * 布局item初始化，使用对象LayoutItem封装
     * 即layout配置项，未避免和screen中layout属性混淆，此处使用名称layoutItems更加合理
     * @type {Array}
     */
    this.layoutItems = layoutItems;
    /**
     * 布局grid默认的列数量，列数量越多，拖拽的精度越高，但对计算性能有影响
     * @type {number}
     */
    this.colNum = 4;
    /**
     * 布局grid默认的行高
     * @type {number}
     */
    this.rowHeight = 300;
    /**
     * 布局grid默认最多有多少行
     * @type {number}
     */
    this.maxRows = 10;
    /**
     * 布局grid内部单元item元素的margin取值
     * 必须为二元数组，第一个元素为水平距离，第二个元素为垂直取值
     * 建议统一将该配置设置为0，0，具体功能应该由内部容器替代
     * @type {number[]}
     */
    this.margin = [1,1];
    /**
     * 局grid内部单元item元素是否可改变位置
     * @type {boolean}
     */
    this.isDraggable = true;
    /**
     * 局grid内部单元item元素是否可改变大小
     * @type {boolean}
     */
    this.isResizable = true;
    /**
     * 方向是否颠倒，RTL/LTR，从左到右或从右到左
     * @type {boolean}
     */
    this.isMirrored = false;
    /**
     * 容器的高度是否自适应实际可容纳的空间
     * @type {boolean}
     */
    this.autoSize = true;
    /**
     * 布局垂直方向是否应该紧凑
     * @type {boolean}
     */
    this.verticalCompact = false;
    /**
     * 是否使用动画过度
     * @type {boolean}
     */
    this.useCssTransforms = false;



    /**********************************
     * 以下为自有属性
     *********************************/
    /**
     * 数据库存储的布局ID
     * @type {String}
     */
    this.id = null;
    /**
     *  是否为模板
     * @type {boolean}
     */
    this.isTemplate = true;
     /**
     * 屏幕ID
     */
    this.screenId = screenId;
    /**
     * 布局名称
     * @type {String}
     */
    this.name = null;
    /**
     * 用于elementUI，dialog弹出编辑行为，默认不弹出
     * 后端无需存储
     * @type {boolean}
     */
    this.show = false;
    /**
     * 是否为公共模板布局
     * @type {String}
     */
    this.isPublic = true;
    /**
     * 用户ID
     * 私有模板布局时生效
     * @type {String}
     */
    this.userId = null;
    /**
     * 缩略图路径
     * @type {String}
     */
    this.imgUrl = null;
  }

  /**
   * Layout类使用过程中未单例模式，通常为this.layoutPM = Inject.getClass(Layout);
   * initLayout，将来自数据库layout配置项，赋予给当前的单例对象
   * @param layout
   */
  initLayout(layout,target=this){
    //防止数组地址相同，进行细粒度深度复制
    target.layoutItems = this.deepCopy(layout.layoutItems);
    target.colNum = layout.colNum;
    target.rowHeight = layout.rowHeight;
    target.maxRows = layout.maxRows;
    target.margin = this.deepCopy(layout.margin);
    target.isDraggable = layout.isDraggable;
    target.isResizable = layout.isResizable;
    target.isMirrored = layout.isMirrored;
    target.autoSize = layout.autoSize;
    target.verticalCompact = layout.verticalCompact;
    target.useCssTransforms = layout.useCssTransforms;

    target.id = layout.id;
    target.screenId = layout.screenId;
    target.name = layout.name;
    /**
     *  该位置务必为false，确保不论数据库中该值是什么，布局弹窗都不会被显示
     * @type {boolean}
     */
    target.show = false;
    target.isPublic = layout.isPublic;
    target.userId = layout.userId;
    target.imgUrl = layout.imgUrl;
  }
}
