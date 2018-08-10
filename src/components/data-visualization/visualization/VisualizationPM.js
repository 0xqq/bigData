/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import FormPmBase from "@/common/model/FormPmBase";
import VisualizationAPI from "@/common/service/VisualizationAPI"
import PathConst from "@/router/PathConst";
import Page from "./model/Page";
import Inject from "@/common/model/Inject";
import AnalysisAPI from "../../../common/service/AnalysisAPI";

export default class VisualizationPM extends FormPmBase {

  constructor() {
    super();
    this.queryBoard = VisualizationAPI.queryBoardList;
    this.createMethod = VisualizationAPI.createOrEditBoard ;
    this.updateMethod = VisualizationAPI.createOrEditBoard ;
    this.deleteMethod = VisualizationAPI.deleteBoard ;

    this.initData({
      boardList: [],//选定分组下的所有仪表盘
      boardQueryForm: {id: null,name: '正在处理默认分组，请稍后'}
    });

    //添加表单
    this.initFormData() ;
  }

  /*--------------------------------------------------------- 仪表盘基本信息表单 -----------------------------------------*/

  /**
   * 创建表单
   */
  initFormData(){
    this.initDataForm({
      id: "",
      groupId: "",
      name: "",
      description: ""
    },"form") ;
  }

  /**
   * 编辑窗口
   * @param item
   */
  popEditeWin(item){
    super.popEditeWin(item) ;
    NormalUtils.copySimpleAtt(item,this.data.form) ;
  }

  /**
   * 创建窗口
   */
  popCreateWin(){
    super.popCreateWin() ;
    this.initFormData() ;
  }

  /**
   * 创建参数
   */
  getCreateParams(){
    if(this.data.boardQueryForm.id === null){
      this.popMessage("请选择分组");
      return;
    }
    var board = this.initData(this.data.form,{});
    board.groupId = this.data.boardQueryForm.id;
    return board;
  }

  /**
   * 编辑参数
   */
  getUpdateParams(){
    return this.initData(this.data.form,{}) ;
  }

  /**
   * 删除参数
   */
  getDeleteParams(param,isMore=false,idField="id"){
     return {id:param.id } ;
  }




/*--------------------------------------------------- 仪表盘列表信息 -----------------------------------------*/
  /**
   * 切换分组查询
   */
  changeBoardQueryForm( item ) {
    if(item){
      this.initData(item,this.data.boardQueryForm) ;
      this.queryList() ;
    }
  }

  /**
   * 刷新当前视图
   */
  reQuery(){
    this.queryList() ;
  }

  /**
   * 查询可视化列表
   */
  queryList(){
    if(this.data.boardQueryForm.id === null)return ;
    this.data.boardList = [] ;

    //查询列表
    // this.query({groupId: this.data.boardQueryForm.id, hasSub: true},(result)=>{
       let list = this.testHandler();//this.getResultList(result) ;
       for(let item of list ){
         item.showControl = false ;
       }
      //列表
      this.data.boardList = list ;
    // },null,this.queryBoard) ;
  }

  /**
   * 切换到编辑页面
   * @param board
   */
  changeToBoard(item){
    // this.query({id: item.id},(result)=>{
    let config = this.testPageDetail(); //JSON.parse(result.data);
    NormalUtils.changeRouter(PathConst.DV_BOARD_EDIT,{id:item.id, name:item.name, pageConfig: config}) ;
    // }, null, VisualizationAPI.queryBoardDetail);
  }

  /*----------------------------------------------------- test --------------------------------------*/
  testHandler(){
    return NormalUtils.createTestData({
      id:"1",
      groupId: '1',
      name:"日志实时监测",
      img:"sss"
    },20) ;
  }

  testPageDetail(){
    return Inject.getClass(Page);
  }

}
