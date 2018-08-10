/**
 * 页面中的屏幕,属性编辑时，务必使用单例模式
 */

import Base from './Base';
import Container from "./Container";
import Layout from "./Layout";

export default class Screen extends Base{
  constructor(id=NormalUtils.createUUid("container-",32),layout=new Layout()) {
    super();
    /**
     * 屏幕ID
     * @type {String}
     */
    this.id = id;
    /**
     * 所属页面ID
     * @type {String}
     */
    this.pageId = null;
    /**
     * 屏幕名称
     * @type {String}
     */
    this.name = "请修改名称";
    /**
     * 屏幕的基本样式封装
     * 后端字符串存储
     * @type {}
     */
    this.style = {
      height: '300px',    //自动同步至其他屏
      width: '1100px',    //自动同步至其他屏
      overflow: 'hidden', //超出部分隐藏，不可编辑
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      backgroundImage: null
    };

    /**
     * 该屏幕的布局
     * @type {Layout}
     */
    this.layout = layout;

    /**
     * 编辑屏幕基本信息时，使用element dialog，默认不显示
     * @type {boolean}
     */
    this.show = false;
  }

  /**
   * 仅涉及screen基本信息的编辑过程，名称、样式
   * 通常用户编辑开始时，进行初始化
   * @param screen
   */
  initScreenBase(screen,target=this){
    // this.id = screen.id; //不允许编辑
    target.name = screen.name;
    target.show = false;  //编辑初始化，不论数据库数据是什么，此处一律为false，防止弹出组件弹出
    // this.pageId = screen.pageId; //不允许编辑

    //做复制，仅复制this.style当前有的属性值，screen中多余属性不进行复制
    this.copyObjectAttribute(target.style, screen.style);

    // this.layout = screen.layout; //不允许编辑
  }

  /**
   * 屏幕基本属性编辑过程中，将部分属性同步至兄弟屏幕（一般原则，走马灯的高度、宽度是保持一致的）
   * @param target
   * @param source
   */
  synchronizer(target,source=this){
    target.style.height = source.style.height;
    target.style.width = source.style.width;
  }
}
