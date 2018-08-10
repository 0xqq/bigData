/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import QueryPmBase from "@/common/model/QueryPmBase";
import DragUtils from "@/common/utils/DragUtils";
import "@/common/comps/libs/jquery-ui-fix.min";
import SvgDom from "@/common/utils/SvgDom" ;
import RightMenu from "@/common/utils/RightMenu" ;
import LinkLine from "./drag/LinkLine";
import DragTable from "./drag/DragTable";
import PagePm from "@/common/model/PagePm";
import DataStorageAPI from "@/common/service/DataStorageAPI";

export default class SqlFormViewPM extends QueryPmBase {

  constructor() {
    super();

    this.pagePM = new PagePm(DataStorageAPI.queryTableDataSql);
    this.pagePM.resultListHandler = (result)=>{return this.resultHandler(result); } ;
    // this.pagePM.testHandler = this.testHadler;

    this.initData({
      autoId: NormalUtils.createOID("div_id"),
      currentView:"view",
      treeData: [
        // {
        //   "label": "原始区", id: "", idl: "old", type: "area", flag: 1, children: [
            {"label": "部门", id: "", idl: "old_org", type: "orgRoot", flag: 1, children: [this.createTempNode()]},
            {"label": "主题", id: "", idl: "old_theme", type: "themeRoot", flag: 1, children: [this.createTempNode()]}
        //   ]
        // },
        // {
        //   "label": "处理区", id: "", idl: "handler", type: "area", flag: 2, children: [
        //     {"label": "部门", id: "", idl: "handler_org", type: "orgRoot", flag: 2, children: [this.createTempNode()]},
        //     {"label": "主题", id: "", idl: "handler_theme", type: "themeRoot", flag: 2, children: [this.createTempNode()]}
        //   ]
        // }
      ],

      //测试数据
      treeProps: {
        label: 'label',
        children: 'children',
        isLeaf: 'leaf'
      }
    });
    this.data.showCols = [] ;
    this.initFormData() ;

    //后台只支持一个表查询 加个变量做缓存
    this.currentTable = null ;
  }

  initView(){

    //两个响应视图
    this.fieldView = $("#"+this.data.autoId) ;
    this.tableView = $("#"+this.data.autoId+"table") ;

    //初始化画布
    this.initCanvas() ;

    //初始化拖动相关
    this.initDrag();

    //初始化绘制拖动
    this.initLineDrag() ;
  }

  /*------------------------------------------ 树 逻辑  -----------------------------*/

  /**
   * 查询分级机构列表 -- 原始
   * node {id: ,name: ,type: }
   */
  loadResultLevel(node, data) {
    this.currentNode = node;

    //查询数据
    let _sendParams = {
      resourceStyle:"db",
      sourceFlag: node.flag,
      id: node.id,
      type: node.type,
      name:''
    };
    if (node.type === "orgRoot") {
      _sendParams.type = "org";
      this.queryOrgLevel(node, _sendParams);
    }
    if (node.type === "org")
      this.queryOrgLevel(node, _sendParams);
    else if (node.type === "source")
      this.queryTableList(node, _sendParams);
    else if (node.type === "themeRoot") {
      _sendParams.type = "theme";
      this.queryThemeList(node, _sendParams);
    }
    else if (node.type === "theme") {
      _sendParams.type = "theme";//根据theme来查
      this.queryTableList(node, _sendParams);
    }
    else if (node.type === "table")
      this.queryFieldList(node);
  }

  /**
   * 查询主题列表
   * @param params
   * @param resolve
   */
  queryThemeList(node, params, resolve) {
    this.query(params, (result) => {
      let theme = result.data.theme;
      let list = [];
      if (theme) {
        for (let att in theme) {
          if (att) {
            let tnode = this.createNode(node, att, theme[att], "theme");
            list.push(tnode);
          }
        }
      }
      node.children = list;
    }, () => {
      node.children = [];
    }, DataStorageAPI.queryLevelResource);
  }

  /**
   * 查询机构
   * @param params
   */
  queryOrgLevel(node, params, resolve) {
    this.query(params, (result) => {
      let orglist = this.getResultList(result, "orgDtos");
      let dblist = this.getResultList(result, "dataSourceDtos");
      orglist = orglist.map((item) => {
        return this.createNode(node, item.id, item.name, "org");
      });
      dblist = dblist.map((item) => {
        return this.createNode(node, item.id, item.dataInstance, "source");
      });
      node.children = orglist.concat(dblist);
    }, () => {
      node.children = [];
    }, DataStorageAPI.queryLevelResource);
  }

  /**
   * 查询表列表
   * @param params
   * @param resolve
   */
  queryTableList(node, params, resolve) {
    this.query(params, (result) => {
        let tblist = this.getResultList(result, "dataResourceDtos");
        tblist = tblist.map((item) => {
          return this.createNode(node, item.id, item.tableName, "table", false, item.dataSourceId);
        });
        node.children = tblist;
      },
      () => {
        node.children = [];
      }, DataStorageAPI.queryLevelResource);
  }

  /**
   * 查询字段列表
   * @param params
   * @param resolve
   */
  queryFieldList(node, resolve=null) {
    this.query({dataResourceId: node.id},
      (result) => {
        let list = result.data.list;
        let fields = [];
        for (let col of list) {
          fields.push(this.createFieldNode(node, col));
        }
        node.children = fields;
        if(resolve!==null)
          resolve() ;
      },
      () => {
        node.children = [];
        if(resolve!==null)
          resolve() ;
      }, DataStorageAPI.queryTableFields);
  }

  /**
   * 创建本地节点
   * @param id
   * @param label
   * @param type
   * @param last
   * @returns {{id: *, label: *, type: *, parentId: null|*}}
   */
  createNode(node, id, label, type, last = false, dbid = "", name = "TableInput") {
    let _re = {
      id: id,
      idl: NormalUtils.createOID("idl"),
      label: label,
      flag: node.flag ? node.flag : "",
      type: type,
      parent: node,
      icon: "tj-biaoge1",
      name: name,
      dbId: dbid
    };
    _re.children = last ? [] : [this.createTempNode()];
    return _re;
  }

  /**
   * 字段节点
   * @param node
   * @param col
   */
  createFieldNode(node, col) {
    return {
      id: col.columnName,
      idl: NormalUtils.createOID("idl"),
      label: col.columnName,
      showLabel:node.label+"."+col.columnName ,
      name:node.label+"."+col.columnName ,
      type:"field",
      parent: node,
      dbId: node.dbId,
      tableId: node.id
    };
  }

  /**
   * 模拟加载状态
   * @returns {{id: string, idl: string, label: string, type: string, children: Array}}
   */
  createTempNode() {
    return {id: "", idl: NormalUtils.createOID("idl"), label: "loading...", type: "temp", children: []};
  }


  /*----------------------------------------- drag --------------------------------------*/

  initDrag() {
    this.dragData = null;
    this.dragType = "";
    this.dragView = this.createDragTempBox();
    this.drag = new DragUtils(null,
      this.dragView,
      (ev) => {
        this.dragStartHandler(ev);
      }, null,
      (ev) => {
        this.dragUpHandler(ev);
      }, null, 0
    );
  }

  /**
   * 鼠标按下开始拖动
   * @param event
   * @param data
   * @param type
   */
  nodeDownHandler(event, data) {
    if(this.data.currentView==="view" && data.type!=="table" && data.type!=="field")
      return ;
    if(this.data.currentView==="sql" && data.type!=="source" )
      return ;

    //开始拖动
    this.dragData = data;
    this.drag.viewDownHandler(event);
  }

  /**
   * 开始拖动
   */
  dragStartHandler() {
    this.dragView.show();
  }

  /**
   * 拖动结束
   * @param ev
   */
  dragUpHandler(ev) {
    if (!this.dragData || !NormalUtils.hitTestGlobal(ev.pageX,ev.pageY,this.fieldView)){
      this.clearDragCatch();
      return;
    }

    if(this.dragData.type==="field"){
      if(!this.isTableSameDb(this.dragData))
        this.popMessage("请拖入相同库内的表或字段！") ;
      else
        this.addFieldIn(this.dragData,true) ;
    }
    else if(this.dragData.type==="table"){
       if(!this.isTableSameDb(this.dragData))
         this.popMessage("请拖入相同库内的表或字段！") ;
       else if(this.hasTableIn(this.dragData))
         this.popMessage("表已经存在！") ;
       else
         this.addTableIn(this.dragData) ;
    }else if(this.dragData.type==="source"){
      this.addDbIn(this.dragData) ;
    }

    //清除绑定等信息
    this.clearDragCatch();
  }

/*-------------------------------------------------- data ----------------------------------*/

  /**
   * 表单数据
   */
  initFormData(){
    this.initData({
      isMax:false,
      sql:"",
      sqlDbName:"",
      inputSql:"",
      hasDb:false,
      fieldList:[],
      tableList:[]
    });
    this.lineMap = new Map() ;
    this.sqlDb = null ;
    this.tableViewList = [] ;
  }


  /**
   * 删除所有视图
   */
  reset(){
    this.removeAllTables() ;
    this.removeAllLines() ;
    this.initFormData() ;
  }

  /**
   * 提交查询
   */
  submit(){

    if(this.data.currentView==="view"){
      if(this.data.tableList.length === 0){
        this.popMessage("请拖曳表或字段进行查询！");
         return ;
      }
      if(this.data.fieldList.length === 0){
        this.popMessage("请拖曳字段进行查询！");
        return ;
      }
      //简单判断
      if(this.data.tableList.length>1){
        if(this.lineMap.size<(this.data.tableList.length-1)){
          this.popMessage("请建立完整表关系再进行查询！");
          return ;
        }
        let tblls = "_"+Array.from(this.lineMap.keys()).join("_") ;
        for(let tb of this.data.tableList){
          if(tblls.indexOf("_"+tb.label+".")===-1){
            this.popMessage("请建立完整表关系再进行查询！");
            return;
          }
        }
      }
      let tb = this.data.tableList[0] ;
      let sql = this.getCurrentSql() ;
      this.pagePM.queryList(null,{id:tb.dbId,tableName:tb.label ,sql:sql});
    }
    else{
      if( !this.sqlDb){
        this.popMessage("请选择数据库！");
        return ;
      }
      if(!this.data.inputSql || (this.data.inputSql.toLowerCase()).indexOf("select")!==0){
        this.popMessage("请输入SQL查询语句！");
        return ;
      }
      this.pagePM.queryList(null,{id:this.sqlDb.dbId,tableName:"",sql:this.data.inputSql});
    }
  }

  /**
   * 查询结果处理
   * @param result
   */
  resultHandler(result){
      let cols = result.data.columns ;
      let list = result.data.tabResults ;
      let arr = [] ;
      for(let col of cols){
        arr.push({name:col ,label:col}) ;
      }
      this.data.showCols = arr ;
      return list ;
  }

  /**
   * 切换视图
   * @param type
   */
  changeView(type) {
    if (type === "sql") {//清空sql 默认显示视图的sql
      this.data.sqlDbName = "";
      this.data.hasDb = false;
      this.sqlDb = null;

      if(this.data.tableList.length>0){
        let tb = this.data.tableList[0] ;
        this.addDbIn(tb.parent) ;
      }
      this.data.inputSql = this.getCurrentSql();
    }
    else {//不清空

    }
    this.data.currentView = type;
  }

  /**
   * 最大化显示表关系
   */
  maxShow(flag=true){
    this.data.isMax = flag ;
  }

  /**
   * 验证表是否是一个库的
   * @returns {boolean}
   */
  isTableSameDb(data){
    let db = "" ;
    if(this.data.tableList.length>0)
      db = this.data.tableList[0].dbId ;
    if(db && db!== data.dbId)
      return false ;
    return true ;
  }

  /**
   * 表是否已经存在
   * @param data
   */
  hasTableIn(data){
    if(!this.data.tableList )
      return false ;
    let re = false ;
    for(let db of this.data.tableList) {
      if (db.id === data.id) {
        re = true;
        break;
      }
    }
    return re ;
  }

  /**
   * 添加一个表
   */
  addTableIn(data ,addField=true ){

    //如果还没加载字段 加载一遍
    if(this.nodeNoChildren(data)){
      this.queryFieldList(data,()=>{
        this.addTableView(data,addField) ;
      });
    }
    else
       this.addTableView(data,addField) ;
  }

  /**
   * 判断节点是否有子孩子
   * @param node
   * @returns {boolean}
   */
  nodeNoChildren(node){
    if(node.children && node.children.length>0 && node.children[0].type!=="temp")
      return false ;
    return true ;
  }

  /**
   * 添加表视图
   */
  addTableView(data ,addField=true) {
    if(!this.data.tableList)
      this.data.tableList = [] ;
    this.data.tableList.push(data) ;

    let tView = new DragTable(data,this, this.tableView);
    tView.itemOverHandler = (itemView, table) => {
      this.downNode = {view: itemView, table: table};
    };
    tView.itemMoveHandler = (itemView, table) => {
      this.downNode = {view: itemView, table: table};
    };
    tView.itemOuterHandler = () => {
      this.downNode = null;
    };
    tView.drawDot = this.drawDot;//

    //先简单显示位置 水平追加显示
    let len = this.data.tableList.length;

    let tableCon = $("#"+this.data.autoId+"table") ;
    tView.view.css("left", (10+(len-1) * (tView.view.width()+30)) + "px").css("top", "30px");
    tableCon.append(tView.view);

    //加表视图
    this.tableViewList.push(tView);

    //先把字段都加上
    if(addField)
      this.addTableFileds(data.children);
  }

  /**
   * 添加一个字段
   */
  addFieldIn(data ,isDrag=false){
    this.addTableFileds([data],isDrag) ;
  }

  /**
   * 添加数据库
   */
  addDbIn(node){
    this.data.hasDb = true ;
    this.data.sqlDbName = node.label ;
    this.data.hasDb = true ;
    this.sqlDb = node ;
  }

  /**
   * 删除字段
   * @param item
   */
  removeField(item){
    NormalUtils.getSelectIndex(this.data.fieldList,item.showLabel,"showLabel",true) ;
    let table = item.tableId ;
    //判断是否所有字段都删除了 如果删除了清除表
    let flag = true ;
    for(let item of this.data.fieldList){
      if(item.tableId === table){
        flag = false ;
        break ;
      }
    }
    if(flag){
      let tableView = NormalUtils.getSelectItem(this.tableViewList,table,"id") ;
      if(tableView)
        this.removeTable(tableView,false) ;
    }
  }

  /**
   * 添加一堆字段
   * @param fiels
   */
  addTableFileds( fiels  ,isDrag=false){
    if(!this.data.fieldList)
      this.data.fieldList = [] ;
    let map = NormalUtils.array2Map(this.data.fieldList,"showLabel") ;
    let tmap = NormalUtils.array2Map(this.data.tableList,"id") ;
    let addTable = [] ;
    for(let item of fiels){
      if(!map.hasOwnProperty(item.showLabel)){
        this.data.fieldList.push(item) ;
        if(!tmap.hasOwnProperty(item.tableId)){
          addTable.push(item.parent) ;
        }
      }
    }
    if(addTable.length>0)
      this.addTableIn(addTable[0],isDrag?false:true) ;
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
  createDragTempBox() {
    let _view = $("<div style='width:50px;height:50px;opacity: 0.5;cursor: pointer;color:#3d6380;position:absolute;border:2px solid #3d6380;border-radius:3px;'></div>");
    $("body").append(_view);
    _view.hide();
    return _view;
  }
/*--------------------------------------------- 建立表关联 ---------------------------------------*/

  /**
   *
   */
  initLineDrag(){
    this.drawDot = $('<div style="z-index:99;position:absolute;cursor:pointer;width:25px;height:25px;background-color: rgba(0,0,0,0)">' +
      '</div>') ;
    this.drawDot.hide();
    this.tableView.append(this.drawDot) ;

    this.drawDot.bind("mouseleave",()=>{
      this.drawDot.hide();
    });

    this.dragControlLine = new DragUtils(this.drawDot,null,
      (ev)=> { this.startLineHandler(ev,true);  },
      (ev,x,y)=> { this.moveLineHandler(ev,x,y,true); },
      (ev)=> {  this.endLineHandler(ev,true); },
      null,0) ;
  }

  startLineHandler(ev,isint){
    this.isDraging = true ;
    this.dragNode = this.downNode ;
    this.drawTempLine.clear() ;
    this.drawDot.hide();
    this.startP = this.getDivPosition(this.dragNode.view) ;
  }

  moveLineHandler(ev,x,y){
    if(!this.isDraging)
      return ;
    let _p = NormalUtils.globalToLocal(x,y,this.tableView) ;
    this.drawTempLine.render( this.startP ,_p ,this.dragNode.view.width()) ;
  }

  /**
   * 获得本地坐标
   * @param divobj
   * @returns {{x, y}}
   */
  getDivPosition(divobj ){
    let div = NormalUtils.getDivGlobalRec(divobj) ;
    return NormalUtils.globalToLocal(div.x ,div.y+div.h/2,this.tableView) ;
  }

  endLineHandler(ev){
    if(!this.isDraging)
      return ;
    let _node = this.getHitNode(ev.pageX,ev.pageY,this.dragNode) ;

    //如果有 链接 添加对象 否则清空
    if(_node)
        this.addLine(this.dragNode,_node) ;
    this.drawTempLine.clear() ;
    this.isDraging = false ;
    this.drawDot.hide();
  }

  /**
   * 初始化画布
   */
  initCanvas() {

    //只创建一次
    if(this.lineCanvas)
      return ;

    this.lineCanvas = SvgDom.createSvg("svg")
      .attr("width", 5000)
      .attr("height", 5000)
      .attr("style","position:absolute;");

    this.tableView.append(this.lineCanvas) ;
    this.drawTempLine = new LinkLine(this.lineCanvas,this,this.tableView) ;
  }

  /**
   * 添加线
   * @param fromn
   * @param ton
   */
  addLine(fromn ,ton){
    let fid = fromn.view.data("field") ;
    let tid = ton.view.data("field") ;
    if(this.lineMap.has(fid+"_"+tid) || this.lineMap.has(tid+"_"+fid))
      return ;
    let line = new LinkLine(this.lineCanvas,this,this.tableView,fromn,ton) ;
    fromn.table.addLine(line) ;
    ton.table.addLine(line) ;
    this.lineMap.set(fid+"_"+tid,line) ;
  }

  /**
   *
   */
  removeAllLines(){
    let arr = this.lineMap.values() ;
    for(let line of arr){
      this.removeLine(line) ;
    }
    this.lineMap = new Map() ;
  }

  /**
   * 删除线
   * @param line
   */
  removeLine( line ){
    if(!line)
      return ;

    let fid = "";
    let tid =  "" ;
    try{
      if(line.fromObject){
        if(line.fromObject.table)
          line.fromObject.table.removeLine(line) ;
        if(line.fromObject.view && line.fromObject.view.length>0)
          fid = line.fromObject.view.data("field") ;
      }
      if(line.toObject){
        if( line.toObject.table)
          line.toObject.table.removeLine(line) ;
        if(line.toObject.view && line.toObject.view.length>0)
          tid = line.toObject.view.data("field");
      }
    }catch(e){}

    line.clear() ;
    if(this.lineMap.has(fid+"_"+tid))
      this.lineMap.delete(fid+"_"+tid) ;
    if(this.lineMap.has(tid+"_"+fid))
      this.lineMap.delete(tid+"_"+fid) ;
  }

  /**
   * 删除所有节点
   */
  removeAllTables(removeField=false){
    if(this.tableViewList){
      for(let tb of this.tableViewList){
        this.removeTable(tb , removeField ) ;
      }
    }
    this.data.tableList = [] ;
    this.tableViewList = [] ;
  }

  /**
   * 删除图表
   * @param table
   */
  removeTable(table ,removeField=true){
    //删除数据
    if(table.data)
       NormalUtils.getSelectIndex(this.data.tableList,table.data.id,"id",true) ;
    //删除视图
    NormalUtils.getSelectIndex(this.tableViewList,table,"id",true) ;
    //删除字段
    if(removeField)
      NormalUtils.removeItemsArray(this.data.fieldList,table.id,"tableId") ;

    let lines = table.getLineArr() ;
    for(let item of lines){
      this.removeLine( item,false ) ;
    }
    //自己清空
    table.clear() ;
  }

  /**
   * 只检测一个
   * @param px
   * @param py
   */
  getHitNode(px, py, snode) {
    let _re = null;
    let _table = snode.table ;
    for (let tview of this.tableViewList ) {
      if (tview !== _table) {
        if (NormalUtils.hitTestGlobal(px, py, tview.view)) {
           let hField = tview.getHitField(px, py) ;
           if(hField){
             _re = {view:hField,table:tview} ;
             break ;
           }
        }
      }
    }
    return _re;
  }

  /**
   * 获得当前组织的sql
   * @returns {string}
   */
  getCurrentSql(){
    let sql = "" ;
    if(this.data.fieldList.length>0 && this.data.tableList.length>0){
      sql += "select ";
      let arr = NormalUtils.getArrByAtt(this.data.fieldList,"showLabel") ;
      let arrt = NormalUtils.getArrByAtt(this.data.tableList,"label") ;
      let links = this.lineMap.values() ;
      let rels = [] ;
      for(let line of links){
        rels.push(line.fromObject.view.data("field") + "=" +line.toObject.view.data("field") ) ;
      }
      sql += arr.join(",") +" from "+ arrt.join(",");
      if(rels.length>0)
        sql += " where " + rels.join(" and ") ;
    }
    return sql ;
  }

  /**
   * 下载数据
   * @param data
   */
  downFile(){
    DataStorageAPI.tableDataExport(data) ;
  }
}
