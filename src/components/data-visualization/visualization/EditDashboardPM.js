/**
 * 添加类描述
 * @Author: hujie@mail.taiji.com.cn
 * @Modifications:
 * @See:
 */
import FormPmBase from "@/common/model/FormPmBase";
import PathConst from "@/router/PathConst";
import Inject from "@/common/model/Inject";
import VisualizationAPI from "@/common/service/VisualizationAPI" ;
import Page from "./model/Page";



export default class EditDashboardPM extends FormPmBase {

  constructor() {
    super();
    this.initData({
      board: {
        pageConfig: Inject.getClass(Page)
      }
    });
  }

  /**
   * 返回上一个路由（可视化首页）
   * @param board
   */
  changeToBoardIndex(){
    NormalUtils.changeRouter(PathConst.DV_BOARD_INDEX) ;
  }

}
