//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc1
// date:
// desc:
//------------------------------------------
import QueryPmBase from "@/common/model/QueryPmBase";
import ModelEditViewPM from "../ModelEditViewPM" ;
import Inject from "@/common/model/Inject";
import DragUtils from "@/common/utils/DragUtils";
import DataStorageAPI from "@/common/service/DataStorageAPI" ;
import NodeVO from "./data-vo/NodeVO";
import PagePm from "@/common/model/PagePm";
import AnalysisAPI from "../../../../../common/service/AnalysisAPI";
import TaskVO from "./data-vo/TaskVO";

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
      modelType:'',

      treeData: [
        {"label":"原始区",id:"",idl:"old",type:"area",flag:1 ,children:[
            {"label":"部门",id:"",idl:"old_org",type:"orgRoot",flag:1 ,children:[this.createTempNode()]},
            {"label":"主题",id:"",idl:"old_theme",type:"themeRoot",flag:1 ,children:[this.createTempNode()]}
          ]},
        {"label":"处理区",id:"",idl:"handler",type:"area",flag:2,children:[
            {"label":"部门",id:"",idl:"handler_org",type:"orgRoot",flag:2 ,children:[this.createTempNode()]},
            {"label":"主题",id:"",idl:"handler_theme",type:"themeRoot",flag:2 ,children:[this.createTempNode()]}
          ]},
        {"label":"分析区",id:"",idl:"analysis",type:"area",flag:3,children:[
            {"label":"部门",id:"",idl:"analysis_org",type:"orgRoot",flag:3 ,children:[this.createTempNode()]},
            {"label":"主题",id:"",idl:"analysis_theme",type:"themeRoot",flag:3 ,children:[this.createTempNode()]}
          ]}
      ],

      dbTreeData:[
        // {"label":"原始区",id:"",idl:"old",type:"area",flag:1 ,children:[
        //     {"label":"部门",id:"",idl:"old_org",type:"orgRoot",flag:1 ,children:[this.createTempNode()]}
        //   ]},
        {"label":"处理区",id:"",idl:"handler",type:"area",flag:2,children:[
            {"label":"部门",id:"",idl:"handler_org",type:"orgRoot",flag:2 ,children:[this.createTempNode()]}
          ]},
        {"label":"分析区",id:"",idl:"analysis",type:"area",flag:3,children:[
            {"label":"部门",id:"",idl:"analysis_org",type:"orgRoot",flag:3 ,children:[this.createTempNode()]}
          ]}
      ],

      //测试数据
      treeProps: {
        label: 'label',
        children: 'children',
        isLeaf: 'leaf'
      },

      //组件列表
      controls: [],
      controlsFile:[],

      inputValu:''
    });

    this.tableInput = {
      name:"cols",type:"DataGrid", value:"",list:"", label: "选择处理字段",
      check:true,
      get:{
        type:"table",
        param:{dataResourceId:"$tableId"},
        nameField:[{t:"name",f:"value"}],
        fill:{type:"fill"}
      },
      params: {
        col: [
          {name: "name", label: "字段名称", type: "ComboBox"}
        ]
      }
    };

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
      },()=>{
      },0
    );

    //主控制类
    this.mainPm = Inject.getClass(ModelEditViewPM);
  }

  /**
   * 初始化视图
   */
  initView(){
    this.queryOperatorGroup() ;
  }

  /**
   * 查询分级机构列表 -- 原始
   * node {id: ,name: ,type: }
   */
  loadResultLevel( node , data){
    this.currentNode = node ;

    console.log(this.currentNode);

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
    else if(node.type === "tableType"){
      _sendParams.type = "theme" ;//根据theme来查
      this.queryTableList(node,_sendParams ) ;
    }
  }



  //获取模型modleType（   0是 数据库，1是文件   ）
  initDrawStage( data ){

    //只接受编辑
    if(!data || !data.id)
      return ;

    this.query({id:data.id},(result)=>{

      this.data.modelType = result.data.modelType;

      sessionStorage.setItem('blockNo',JSON.stringify(this.data.modelType));

      //console.log(this.data.modelType);

      let detail = result.data ;
      let ids =  TaskVO.getStepIds( detail ) ;
      let task = new TaskVO() ;

      //拷贝基本信息
      NormalUtils.copySimpleAtt(detail,this.data.modelOptions) ;
      if(ids && ids.length>0){
        this.query({algorithmIds:ids},(result)=>{
          task.init(detail,result.data) ;
          this.executeInitDraw( task ) ;
        },null,AnalysisAPI.queryOperatorProps);
      }
      else{

      }
    },()=>{
      this.executeInitDraw( new TaskVO() ) ;
    },AnalysisAPI.queryModelDetail) ;
  }



  /**
   * 查询主题列表
   * @param params
   * @param resolve
   */
  queryThemeList(node,params ,resolve){

    if( this.data.modelType === '0'){
      this.query(params ,(result)=>{
        let theme = result.data.theme ;//返回的十个对象
        let list = [] ;
        if(theme){
          for(let att in theme){
            if(att){
              let tnode =  this.createNode(node,att,theme[att],"theme") ;
              tnode.children = [
                this.createTableTypeNode(tnode)
              ] ;
              list.push(tnode) ;
            }
          }
        }
        node.children = list ;
      }, ()=>{
        node.children = [] ;
      },DataStorageAPI.queryLevelResourceDataBase) ;
    }else if(this.data.modelType === '1'){
      this.query(params ,(result)=>{

        console.log('1112222');

        let theme = result.data.theme ;//返回的十个对象
        let list = [] ;
        if(theme){
          for(let att in theme){
            if(att){
              let tnode =  this.createNode(node,att,theme[att],"theme") ;
              tnode.children = [
                this.createTableTypeNode(tnode)
              ] ;
              list.push(tnode) ;
            }
          }
        }
        node.children = list ;
      }, ()=>{
        node.children = [] ;
      },DataStorageAPI.queryLevelResourceFile) ;
    }
  }

  /**
   * 查询机构
   * @param params
   */
  queryOrgLevel(node, params ,resolve){
    //0是数据库，1是文件
    if(this.data.modelType === '0'){
      this.query(params ,(result)=>{
        let orglist = this.getResultList(result,"orgDtos") ;
        let dblist = this.getResultList(result,"dataSourceDtos") ;
        orglist = orglist.map((item)=>{
          return this.createNode(node,item.id,item.name,"org") ;
        }) ;
        dblist = dblist.map((item)=>{
          return this.createNode(node,item.id,item.dataInstance,"source") ;
        }) ;
        node.children =  orglist.concat(dblist) ;
      },()=>{
        node.children = [] ;
      },DataStorageAPI.queryLevelResourceDataBase) ;
    }else if(this.data.modelType === '1'){
      this.query(params ,(result)=>{
        console.log('111');
        let orglist = this.getResultList(result,"orgDtos") ;
        let dblist = this.getResultList(result,"dataSourceDtos") ;
        console.log(dblist);
        if ( dblist.length > 0 ){
          sessionStorage.setItem('analyLu',JSON.stringify(dblist[0].foldName))
        };
        orglist = orglist.map((item)=>{
          return this.createNode(node,item.id,item.name,"org") ;
        }) ;

        dblist = dblist.map((item)=>{
          return this.createNode(node,item.id,item.dataInstance,"source") ;
        }) ;

        console.log(dblist);

        node.children =  orglist.concat(dblist) ;

      },()=>{
        node.children = [] ;
      },DataStorageAPI.queryLevelResourceFile) ;
    }
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
    if(this.data.modelType === '0'){
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
        }, DataStorageAPI.queryLevelResourceDataBase);
    }else if(this.data.modelType === '1'){
      this.query(params, (result) => {


          console.log('33333');
          let tblist = this.getResultList(result, "dataResourceDtos");
          tblist = tblist.map((item) => {
            // item.tableName =  item.tableName.toUpperCase() ;
            return this.createNode(node, item.id, item.tableName, "table", true,item.dataSourceId);
          });
          node.children = tblist;
        },
        () => {
          node.children = [];
        }, DataStorageAPI.queryLevelResourceFile);
    }
  }

  /*------------------------------------------------ operator ------------------*/
  /**
   * 查询一级菜单
   */
  queryOperatorGroup(){
    this.data.controls = [] ;
    this.data.controlsFile = [];
    this.query({},(result)=>{
      /*let _list = this.optGroupTest();//result.data.list ;//id name type
      _list = _list.map((item)=>{
        return  this.createOptGroupNode(item) ;
      }) ;
      this.data.controls = _list ;*/
      let _list = result.data;
      // console.log(_list);
      //es6的map数据用法，类似于对象，也是键值对的集合
      _list = _list.map((item)=>{
        return  this.createOptGroupNode(item,0)
      });
      // console.log(_list);
      this.data.controls = _list.slice(1,3);
      this.data.controlsFile = _list.slice(0,1);
    },null, AnalysisAPI.queryOperatorGroup) ;
  }

  /**
   * 查询空间列表   (获取二级菜单 + 获得算子)
   * @param isroot
   */
  queryOperatorList(node ){

    if(node.level===0){//调第二个接口 获得二级分组
      this.queryGroupLevel2(node);
    }
    else{//调第三个接口    获得算子
      this.queryOperatorListSuan(node);
    }

  }

  /**
   * 获得二级分组
   */
  queryGroupLevel2(node){
    this.query({typeClassifyId:node.id},(result)=>{
        let _list = result.data;
        _list = _list.map((item)=>{
          return  this.createOptGroupNodeTwo(item,1,node.id) ; //分组
        });
        node.children = _list
      },
      ()=>{
        node.children = [] ;
      }, AnalysisAPI.queryOperatorGroupLevel2) ;
  }

  /**
   * 获取算子了
   */
  queryOperatorListSuan(node){
    this.query({typeId:node.id},(result)=>{
        let _list = result.data;
        _list = _list.map((item)=>{
          return  this.createOptItemNode(item,node) ; //算子
        });
        node.children = _list
      },
      ()=>{
        node.children = [] ;
      }, AnalysisAPI.queryOperatorList) ;

  }

  /**
   * 生成分组节点  (组件  分组  一级菜单)
   * @param item
   * @returns {{id: *, type: string, label: *, flag: number}}
   */
  createOptGroupNode( item ,level){  //这是一级菜单
    return {
      id: item.id,
      type: "group",
      level:level,
      label: item.classifyName,
      children:[this.createTempNode()]
    };
  }

  createOptGroupNodeTwo( item ,level ,ptype){ //这是二级菜单
    return {
      id: item.id,
      type: "group",
      level:level,
      label: item.typeName,
      pType:ptype,
      children:[this.createTempNode()]
    };
  }

  /**
   * 生成分组节点 (组件  分组  aa  二级菜单)
   * @param item
   * @returns {{id: *, type: string, label: *, flag: number}}
   */
  createOptItemNode( item ,pnode){    //这是算子菜单
    let data = {
      id: item.id,
      type: "Operator" ,
      pGroup:pnode.pType,//父父的分组ID
      group:pnode.id,
      label: item.algorithmDesc,
      name:item.algorithmName,
      children:[],
      props:[]
    };

    //转换数据格式
    if(item.algorithmParam)
      data.props = NodeVO.initPropsList(item.algorithmParam,true);
    return data ;
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
  createNodeData( node){
    let obj = {
      name:node.label,
      type:node.name
    } ;
    if(node.name==="TableInput"){
      obj.connection = node.dbId;//数据库ID
      obj.id = node.id ;
      obj.name = node.label ;
      obj.type = "TableInput" ;
      obj.resourceId = node.id ;
      obj.table = node.label;
      obj.inputCol = "";
      obj.props = [] ;
    }
    else if(node.name==="TableOutput"){
      obj.sourceId = node.id;//数据库ID
      obj.labelCol = "" ;
      obj.type = "TableOutput" ;
      obj.id = node.id ;
      obj.props = [] ;
    }
    else {
      NormalUtils.copyObjectAtt(node,obj,true) ;
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
   * 鼠标按下开始拖动
   * @param event
   * @param data
   * @param type
   */
  nodeDownHandler(event,data,type ){
    if(data && (data.type==="table" || (data.name==="TableOutput" && data.type==="source") || data.type==="Operator")){

      this.dragData = data ;
      this.dragType = type ;

      //手动触发鼠标按下
      this.drag.viewDownHandler(event) ;
    }
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
      this.createNodeData(this.dragData) ) ;

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

  /*------------------------------------------------------- loaddb ----------------------------*/

  /**
   * 查询分级机构列表
   * node {id: ,name: ,type: }
   */
  loadLevelDb( node , data){
    this.currentDbLevel = node ;

    //查询数据
    let _sendParams = {
      sourceFlag:node.flag,
      id:node.id,
      type:node.type,
      name:this.data.inputValu
    } ;
    if(node.type === "orgRoot"){
      _sendParams.type = "org" ;
      this.queryDbOrgLevel(node,_sendParams ) ;
    }
    if(node.type === "org" )
      this.queryDbOrgLevel(node,_sendParams ) ;
  }

  /**
   * 查询机构
   * @param params
   */
  queryDbOrgLevel(node, params ,resolve){
    if(this.data.modelType === '0'){
      this.query(params ,(result)=>{
        let orglist = this.getResultList(result,"orgDtos") ;
        let dblist = this.getResultList(result,"dataSourceDtos") ;
        orglist = orglist.map((item)=>{
          return this.createNode(node,item.id,item.name,"org") ;
        }) ;
        dblist = dblist.map((item)=>{
          return this.createNode(node,item.id,item.dataInstance,"source",true,item.id,"TableOutput") ;
        }) ;
        node.children =  orglist.concat(dblist) ;
      },()=>{
        node.children = [] ;
      },DataStorageAPI.queryLevelResourceDataBase) ;
    }else if(this.data.modelType === '1'){
      this.query(params ,(result)=>{

        console.log('444444');

        let orglist = this.getResultList(result,"orgDtos") ;
        let dblist = this.getResultList(result,"dataSourceDtos") ;

        console.log(dblist);

        if ( dblist.length > 0 ){
          sessionStorage.setItem('analyLuTwo',JSON.stringify(dblist[0].foldName))
        };

        orglist = orglist.map((item)=>{
          return this.createNode(node,item.id,item.name,"org") ;
        }) ;
        dblist = dblist.map((item)=>{
          return this.createNode(node,item.id,item.dataInstance,"source",true,item.id,"TableOutput") ;
        }) ;
        node.children =  orglist.concat(dblist) ;
      },()=>{
        node.children = [] ;
      },DataStorageAPI.queryLevelResourceFile) ;
    }
  }

  reset(){
  }

  clear(){
    super.clear() ;
  }


  /*------------------------------------------------ test --------------------------------------*/
  optGroupTest(){
    let _id = NormalUtils.createOID("fdf") ;
    return [
      {id:_id+"1",name:"分组01",type:"group"},
      {id:_id+"2",name:"分组02",type:"group"},
      {id:_id+"3",name:"分组03",type:"group"},
      {id:_id+"4",name:"分组04",type:"group"}
    ] ;
  }

  operatorTest(){
    let _id = NormalUtils.createOID("fdf") ;
    let props = [
      {name:"att1",label:"显示文字",
        config:JSON.stringify( {type:"TextInput",  required:true,  min:0, max:255 })},
      {name:"att2",label:"显示文字2",
        config:JSON.stringify( { type:"NumberInput", required:true, step:0.01,  min:0, max:1 })},
      {name:"att3",label:"显示文字3",
        config:JSON.stringify( { type:"CheckBox", required:true })}
    ] ;
    return [
      {id:_id+"1",name:"子分组01",type:"group"},
      {id:_id+"2",name:"组件01",type:"operator",props:NormalUtils.copyObjectDeep(props) },
      {id:_id+"3",name:"组件02",type:"operator",props:NormalUtils.copyObjectDeep(props) },
      {id:_id+"4",name:"组件03",type:"operator",props:NormalUtils.copyObjectDeep(props) },
      {id:_id+"5",name:"组件04",type:"operator",props:NormalUtils.copyObjectDeep(props) },
    ] ;
  }

}
