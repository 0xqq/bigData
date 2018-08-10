//------------------------------------------------------------------
//title:
//author: zc
//date:
//desc:
//------------------------------------------------------------------


import VisualizationServer from "./server/VisualizationServer";

class VisualizationAPI {

  constructor( ) {
  }

  /*--------------------------------------------------------- 分组 ------------------------------------*/

  /**
   * 查询分组树
   */
  static queryGroupTree( params,option = null ) {
    return VisualizationAPI.server.getProcess("/dashboardGroup/findAll",params);
  }

  /**
   * 保存分组树
   */
  static saveTreeGroup( params,option = null ) {
    return VisualizationAPI.server.postProcess("/dashboardGroup/saveOrUpdate",params);
  }

  /**
   * 删除分组树
   */
  static deleteTreeGroup( params,option = null ) {
    return VisualizationAPI.server.postProcess("/dashboardGroup/delete",params,false);
  }


  /*--------------------------------------------------------- 仪表盘 ------------------------------------*/
  /**
   * 按分组查询仪表盘列表
   */
  static queryBoardList( params,option = null ) {
    return VisualizationAPI.server.postProcess("/dashboard/findByGroupIdAndHasSub",params);
  }

  /**
   * 添加 修改 仪表盘基本信息
   */
  static createOrEditBoard( params,option = null ) {
    return VisualizationAPI.server.postProcess("/dashboard/saveOrUpdate",params);
  }

  /**
   * 删除仪表盘
   */
  static deleteBoard( params,option = null ) {
    return VisualizationAPI.server.postProcess("/dashboard/delete",params,false);
  }
  /**
   *  查询仪表盘详情
   */
  static queryBoardDetail( params,option = null ) {
    return VisualizationAPI.server.postProcess("/dashboard/findInfo",params);
  }

  /**
   *  保存仪表盘信息
   */
  static saveBoard( params,option = null ) {
    return VisualizationAPI.server.postProcess("/dataStorage.json",params);
  }

  /********************************************************************************************************
   *************************************布局操作************************************************************
   ********************************************************************************************************/
  /**
   * canvas转图片上传
   * @param canvas
   * @param fileName
   * @param successFunc
   * @param errorFunc
   */
  static uploadLayoutImg(canvas,fileName,successFunc,errorFunc){
    VisualizationAPI.server.postCanvasProcess('/upload/img',canvas,fileName,successFunc,errorFunc);
  }
  /**
   * 新增或修改布局
   * @param params
   * @param successFunc
   * @param errorFunc
   */
  static saveOrUpdateLayout(params,successFunc,errorFunc){
    let layout = Object.assign({},params);
    layout.config = JSON.stringify(params.layoutItems);
    delete layout.layoutItems;
    layout.margin = JSON.stringify(params.margin);

    VisualizationAPI.server.postProcess('/layout/saveOrUpdate',layout).then(successFunc,errorFunc);
  }
  /**
   * 查询布局
   * @param userId
   * @param successFunc
   * @param errorFunc
   */
  static findLayoutByIsPubAndUserId(userId,successFunc,errorFunc){
    VisualizationAPI.server.postProcess('/layout/findByIsPubAndUserId',{isPub:false,userId: userId}).then(successFunc,errorFunc);
  }
  /**
   * 删除布局
   * @param layoutId
   * @param successFunc
   * @param errorFunc
   */
  static deleteLayoutById(layoutId,successFunc,errorFunc){
    VisualizationAPI.server.postProcess('/layout/delete',{id: layoutId}).then(successFunc,errorFunc);
  }

  static getUploadBackgroundImgUrl(){
    return this.createServerUrl('/upload/img');
  }

  static createServerUrl(url){
    return VisualizationAPI.server.createServerUrl(url);
  }
}

VisualizationAPI.server = new VisualizationServer() ;
export default VisualizationAPI ;
