//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import QueryPmBase from "@/common/model/QueryPmBase";
import TaskCreatePM from "../TaskCreatePM" ;
import Inject from "@/common/model/Inject";
import DragUtils from "@/common/utils/DragUtils";
import SuanziManager from "@/common/manager/SuanziManager";
import ProcessAPI from "@/common/service/ProcessAPI" ;
import DataStorageAPI from "@/common/service/DataStorageAPI" ;
import NodeVO from "./vo/NodeVO";
import PagePm from "@/common/model/PagePm";

export default class TaskTreePM extends QueryPmBase{

  constructor( name,id ) {
    super(name, id);

    //资源分页查询
    this.pagePM = new PagePm(DataStorageAPI.queryOriginalMarkerList) ;
    this.pagePM.pageSize = 9999 ;

    //当前操作节点
    this.currentNode = null ;

    this.initData({
      treeState: "data",
      dataState: "old",
      form:{},
      isPopAddDiyWin:false,

      treeData: [
        {"label":"原始区",id:"",idl:"old",type:"area",flag:1 ,children:[
            {"label":"部门",id:"",idl:"old_org",type:"orgRoot",flag:1 ,children:[this.createTempNode()]},
            {"label":"主题",id:"",idl:"old_theme",type:"themeRoot",flag:1 ,children:[this.createTempNode()]}
          ]},
        {"label":"处理区",id:"",idl:"handler",type:"area",flag:2,children:[
            {"label":"部门",id:"",idl:"handler_org",type:"orgRoot",flag:2 ,children:[this.createTempNode()]},
            {"label":"主题",id:"",idl:"handler_theme",type:"themeRoot",flag:2 ,children:[this.createTempNode()]}
          ]}
      ],

      //测试数据
      treeProps: {
        label: 'label',
        children: 'children',
        isLeaf: 'leaf'
      },

      //先写死
      controls: SuanziManager.controls,//先写死 等后面通过接口获得 temp?
      inputValu:''
    });

    this.dragData = null;
    this.dragType = "";
    this.dragView = this.createDragTempBox();
    this.drag = new DragUtils(null,
      this.dragView,
      (ev)=>{
        this.dragStartHandler(ev) ;
      },null,
      (ev)=>{
        this.dragUpHandler(ev) ;
      },null,0
    );

    //主控制类
    this.mainPm = Inject.getClass(TaskCreatePM);
  }

  initView(){
  }

  /**
   * 查询分级机构列表 -- 原始
   * node {id: ,name: ,type: }
   */
  loadResultLevel( node , data){
    this.currentNode = node ;

    //查询数据
    let _sendParams = {
      sourceFlag:node.flag,
      id:node.id,
      type:node.type,
      name:this.data.inputValu
    } ;
    if(node.type === "orgRoot"){
      _sendParams.type = "org" ;
      this.queryOrgLevel(node,_sendParams ) ;
    }
    if(node.type === "org" )
      this.queryOrgLevel(node,_sendParams ) ;
    else if(node.type==="source")
      this.queryTableList(node,_sendParams ) ;
    else if(node.type==="themeRoot"){
      _sendParams.type = "theme" ;
      this.queryThemeList(node,_sendParams );
    }
    else if(node.type === "themeFold")
      this.queryFileList(node,true) ;
    else if(node.type === "orgFold")
      this.queryFileList(node,false) ;
    else if(node.type === "tableType"){
      _sendParams.type = "theme" ;//根据theme来查
      this.queryTableList(node,_sendParams ) ;
    }
  }

  /**
   * 查询主题列表
   * @param params
   * @param resolve
   */
  queryThemeList(node,params ,resolve){
    this.query(params ,(result)=>{
      let theme = result.data.theme ;//返回的十个对象
      let list = [] ;
      if(theme){
        for(let att in theme){
          if(att){
            let tnode =  this.createNode(node,att,theme[att],"theme") ;
            tnode.children = [
              this.createTableTypeNode(tnode),
              this.createFileTypeNode(tnode,"themeFold")
            ] ;
            list.push(tnode) ;
          }
        }
      }
      node.children = list ;
    }, ()=>{
      node.children = [] ;
    },ProcessAPI.queryLevelResource) ;
  }

  /**
   * 查询机构
   * @param params
   */
  queryOrgLevel(node, params ,resolve){
    this.query(params ,(result)=>{
      let orglist = this.getResultList(result,"orgDtos") ;
      let dblist = this.getResultList(result,"dataSourceDtos") ;
      orglist = orglist.map((item)=>{
        return this.createNode(node,item.id,item.name,"org") ;
      }) ;
      dblist = dblist.map((item)=>{
        return this.createNode(node,item.id,item.dataInstance,"source") ;
      }) ;
      if(node.type !== "orgRoot")
        orglist = orglist.concat([this.createFileTypeNode(node,"orgFold")]) ;
      node.children =  orglist.concat(dblist) ;
    },()=>{
      node.children = [] ;
    },ProcessAPI.queryLevelResource) ;
  }

  /**
   * 查询文件列表
   */
  queryFileList(node ,isTheme){
    let send = { resourceStyle:"file" } ;
    if(isTheme)
      send.theme = node.id ;
    else
      send.orgId = node.id ;
    this.pagePM.queryList(send,null,(datas)=>{
      let arr = [] ;
      for(let item of datas ){
        let nonnn =  this.createNode(node, item.id, item.tableName, "file", true,item.id,"FileInput");
        arr.push(nonnn) ;
      }
      node.children = arr ;
    }) ;
  }

  /**
   * 生成文件节点NODE
   */
  createFileTypeNode( parent ,type="fold"){
    return this.createNode(parent,parent.id,"文件资源",type,false,parent.id) ;
  }

  /**
   * 创建表分类
   * @param parent
   * @returns {{id: *, label: *, type: *, parentId: null|*}}
   */
  createTableTypeNode(parent){
    return this.createNode(parent,parent.id,"数据表","tableType",false,parent.id) ;
  }

  /**
   * 查询表列表
   * @param params
   * @param resolve
   */
  queryTableList(node,params ,resolve) {
    this.query(params, (result) => {
        let tblist = this.getResultList(result, "dataResourceDtos");
        tblist = tblist.map((item) => {
          // item.tableName =  item.tableName.toUpperCase() ;
          return this.createNode(node, item.id, item.tableName, "table", true,item.dataSourceId);
        });
        node.children = tblist;
      },
      () => {
        node.children = [];
      }, ProcessAPI.queryLevelResource);
  }

  /**
   * 创建本地节点
   * @param id
   * @param label
   * @param type
   * @param last
   * @returns {{id: *, label: *, type: *, parentId: null|*}}
   */
  createNode(node,id ,label,type,last=false,dbid="",name="TableInput"){
    let _re = {
      id:id,
      idl:NormalUtils.createOID("idl"),
      label:label,
      flag:node.flag,
      type:type,
      parentId:node,
      icon:"tj-biaoge1",
      name:name,
      dbId:dbid
    } ;
    _re.children =last?[]:[this.createTempNode()];
    return _re ;
  }

  /**
   *  匹配数据格式 进行一个转换
   * @param node
   * @param type
   * @returns {NodeVO}
   */
  createNodeData( node ,type){
    let obj = {
      name:node.label,
      type:node.name,
      group:node.type,
      icon:node.icon
    } ;
    if(type==="data"){
      obj.connection = node.dbId;//数据库ID
      obj.tableId = node.id ;
      obj.schema = "";
      obj.table = node.label;
      obj.group = SuanziManager.GROUP_INPUT ;
    }
    return new NodeVO( obj );
  }

  /**
   * 模拟加载状态
   * @returns {{id: string, idl: string, label: string, type: string, children: Array}}
   */
  createTempNode(){
    return {id:"",idl:NormalUtils.createOID("idl"),label:"loading...",type:"temp",children:[]} ;
  }

  /**
   * 添加窗口
   */
  popAddDiy(){
    this.data.isPopAddDiyWin = true ;
  }

  /**
   * 鼠标按下开始拖动
   * @param event
   * @param data
   * @param type
   */
  nodeDownHandler(event,data,type ){
    if(!data || data.type==="group")
      return ;
    if(type==="data" && data.type!=="table" && data.type!=="file" )
      return ;

    this.dragData = data ;
    this.dragType = type ;

    //手动触发鼠标按下
    this.drag.viewDownHandler(event) ;
  }

  /**
   * 开始拖动
   */
  dragStartHandler(){
    this.dragView.show() ;
  }

  /**
   * 拖动结束
   * @param ev
   */
  dragUpHandler(ev){
    if(!this.dragData || !this.mainPm.drawView)
      return ;

    //添加图标到绘制视图
    this.mainPm.drawView.dropNodeIn(ev.pageX-this.dragView.width()/2,
      ev.pageY-this.dragView.height()/2 ,
      this.createNodeData(this.dragData,this.dragType),
      this.dragType) ;

    //清除绑定等信息
    this.clearDragCatch() ;
  }

  /**
   * 清除拖动缓存数据
   **/
  clearDragCatch() {
    if (this.dragView)
      this.dragView.hide();
    this.dragData = null;
  }

  /**
   * 创建临时节点
   **/
  createDragTempBox(){
    let _view = $("<div class='tj-temp-drag-box'></div>");
    $("body").append(_view);
    _view.hide();
    return _view ;
  }

  /**
   * 切换视图
   * @param view
   */
  changeTreeState(view){
    this.data.treeState = view ;
  }

  /**
   * 生成 测试数据
   * @param data
   * @param len
   * @param resove
   */
  testTreeHandler(data,len, resove ,data2 ,id="idl"){
    setTimeout(()=>{
      let list = NormalUtils.createTestData(data,len,id) ;
      if(data2){
        let list2 = NormalUtils.createTestData(data2,len,id) ;
        list = list.concat(list2) ;
      }
      resove(list) ;
    } ,500) ;
  }

  reset(){

  }

  clear(){
    super.clear() ;
  }
}
