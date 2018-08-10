/**
 * 页面，顶层结构封装
 * 平台页面管理过程中，务必确保Page使用Inject单例化管理，便于不同组件使用的是相同的对象实例
 */

import Base from './Base';
import Screen from './Screen';
import PageTypeEnum from './enums/PageTypeEnum';
import Variable from "./Variable";

export default class Page extends Base{


  constructor(pageType=PageTypeEnum.single,screens=[new Screen()],variables=[]) {
    super();
    /**
     * 页面ID
     * @type {String}
     */
    this.id = null;
    /**
     * 分组ID
     * @type {String}
     */
    this.groupId = null;
    /**
     * 页面名称
     * @type {String}
     */
    this.name = "请修改名称";
    /**
     *页面类型，源自枚举，每种页面类型有自己的独立配置项，详见枚举内部构造过程
     */
    this.pageType = pageType.id;
    /**
     * 基本配置项详见页面类型枚举
     * 后续添加页面类型，出现较大差异时，应当独立进行配置，相关可视化配置过程中，需要添加一定的识别
     * 数据库中存储字符串
     * @type {}
     */
    this.config = pageType.config;
    /**
     * 分屏展示，一般情况，一个页面至少一个屏幕
     */
    this.screens = screens;
    /**
     * 当前页面可用的变量，用于仪表查询、联动特效
     * 类型详见Variable class
     */
    this.variables = variables;
    /**
     * 页面预览照片地址
     * 页面保存过程中，将自动进行缩略图截取，上传至服务端
     * @type {String}
     */
    this.imgUrl = null;
    /**
     * 页面配置项是否显示编辑，后端服务无需存储
     * @type {boolean}
     */
    this.show = false;
  }

  /**
   * Page 类在使用过程中，必须使用单例模式
   * 将数据库中的配置项，赋予给当前单例对象
   */
  init(pageConfigFromDB){
    this.id = pageConfigFromDB.id;
    this.name = pageConfigFromDB.name;
    this.pageType = pageConfigFromDB.pageConfig.pageType;
    //做复制，仅复制this.style当前有的属性值，screen中多余属性不进行复制
    this.copyObjectAttribute(this.config, pageConfigFromDB.pageConfig.config);
    this.screens = pageConfigFromDB.pageConfig.screens;
    this.variables = pageConfigFromDB.pageConfig.variables;
    /**
     * 每次此时化，都默认不显示页面基础配置项的编辑
     * @type {boolean}
     */
    this.show = false;
  }

  /**
   * 设置新的页面基础信息配置项config
   * @param page
   * @param target
   */
  initConfig(config,target=this){
    Object.assign(target.config,config);
  }
  /**
   * 切换页面类型
   * @param pageType
   * @param index 切换至单页面模式时，index为必传项，被保留的screen数组下标，从0开始
   */
  changePageType(pageType){
    this.pageType = pageType.id;
    Object.assign(this.config, pageType.config);
    if(this.pageType === PageTypeEnum.single.id){
      for(let i=1; i<this.screens.length; i++){ //保留第一块屏幕
        this.screens.pop();
      }
    }

  }

  /**
   * 增加屏幕，指定位置，默认为末尾处
   * @param screen
   */
  addScreen(index,screen=new Screen()){
    if(index === undefined || index === null){
      index = this.screens.length;
    }
    this.screens.splice(index,0,screen);
  }

  /**
   * 删除指定屏幕
   * @param index 被删除的数组下标
   */
  removeScreen(index){
    //page中至少包含一个屏幕，此处不添加提示信息控制
    if(this.screens.length === 1){return ;}

    this.screens.splice(this.screens.findIndex((v,i) => i === index),1);
  }
  /**
   * 交换两个屏幕的顺序
   * @param x
   * @param y
   */
  exchangeScreen(x,y){
    if(x === y)return;
    if(x >= this.screens.length || y >= this.screens.length)return;
    if(x < 0 || y < 0)return;
    [this.screens[x],this.screens[y]] = [this.screens[y],this.screens[x]];
    //数组长度并未发生变化，vue响应式存在演示，此处模拟数组长度变化
    this.screens.push(new Screen());
    this.screens.pop();
  }
}
