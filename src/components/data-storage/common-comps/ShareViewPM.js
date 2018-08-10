/**
 * 此类以后清理 弃用  视图和逻辑都分开 防止差别巨大  temp?
 * @Author: zc
 * @Modifications:
 * @See:
 */
import FormPmBase from "@/common/model/FormPmBase";

export default class ShareViewPM extends FormPmBase {

  constructor(main="",sourceFlag =1) {
    super();
    this.sourceFlag = sourceFlag ;
    this.mainPath = main ;
    this.initData({
      currentType: 1,
      viewInited: false,
      title: "",
      path: ""
    });
  }

  /**
   * 设置查询类型  temp
   * @param title
   * @param falg
   */
  setQueryFlag(query, title, flag) {
    this.data.title = title;
    this.data.currentType = flag;
    // this.sourceFlag = flag ;
  }

  /**
   * 刷新当前视图
   */
  refreshView( route ) {

    //重置视图
    this.reset();

    // this.mainPath = path ;
    // this.sourceFlag = flag ;

    //解析参数
    let query = route.query;
    this.setQueryFlag(query, query.title || "", query.type || "");

    //重新初始化视图
    this.initExecute(query, this.data.viewInited === false ? true : false);

    //
    this.data.viewInited = true;
  }

  /**
   * 执行查询
   */
  initExecute(query, flag) {

  }

  /**
   * 重置视图
   */
  reset() {

  }

}
