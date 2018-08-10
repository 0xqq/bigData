/**
 * 页面类型定义
 */
class PageType {
  constructor(id,config,name,url) {
    this.id = id; //id标识符
    this.name = name; //名称
    this.url = url; //base64img 图片
    /**
     * 此处均填写默认值null，详细默认值，位于PageType实例化时填写
     * @type {}
     */
    this.config = {
      /**
       * 走马灯的类型
       */
      type: null,
      /**
       * 默认展示的屏幕索引，从0开始
       */
      initialIndex: null,
      /**
       * 非定向指示器位置
       */
      indicatorPosition: null,
      /**
       * 非定向指示器触发方式
       */
      trigger: null,
      /**
       * 定向指示器显示时机
       */
      arrow: null,
      /**
       * 是否自动切换
       */
      autoplay: null,
      /**
       * 自动切换的时间间隔，单位为毫秒
       */
      interval: null,

    };
    Object.assign(this.config,config);
  }
}
const PageTypeEnum = {};
let config = null;

PageTypeEnum.types = [];
PageTypeEnum.map = new Map();

/**
 * 单页面模式
 * @type {string}
 */
config = {};
PageTypeEnum.single = new PageType("SINGLE",config,"单屏页面","./static/img/visualization/pageType/1.png");
PageTypeEnum.types.push(PageTypeEnum.single);
PageTypeEnum.map.set(PageTypeEnum.single.id,PageTypeEnum.single);

/**
 * element ui 走马灯
 * @type {string}
 */
config = {};
config.type = ''; //走马灯的类型   ''/card
config.initialIndex = 0;  //默认展示的屏幕索引，从0开始
config.indicatorPosition = 'inside';  //非定向指示器位置  outside/inside/none
config.trigger = 'hover';  //非定向指示器触发方式  hover/click
config.arrow = 'hover'; //定向指示器显示时机 always/hover/never
config.autoplay = true; // 是否自动切换 true/false
config.interval = 3000; //自动切换的时间间隔，单位为毫秒

PageTypeEnum.carsousel = new PageType("CAROUSEL",config,"走马灯模式","./static/img/visualization/pageType/2.png");
PageTypeEnum.types.push(PageTypeEnum.carsousel);
PageTypeEnum.map.set(PageTypeEnum.carsousel.id,PageTypeEnum.carsousel);

export default PageTypeEnum;
