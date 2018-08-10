//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import QueryPmBase from "@/common/model/QueryPmBase";
import ProcessAPI from "@/common/service/ProcessAPI" ;
import DataStorageAPI from "@/common/service/DataStorageAPI" ;
import PagePm from "@/common/model/PagePm";

export default class SelectTablePM extends QueryPmBase{

  constructor( name,id ) {
    super(name, id);

    //资源分页查询
    this.pagePM = new PagePm(DataStorageAPI.queryOriginalMarkerList) ;
    this.pagePM.pageSize = 9999 ;

    //当前操作节点
    this.currentNode = null ;
    this.isHive = false ;

    this.initData({
      treeState: "data",
      dataState: "old",
      form:{},
      isPopAddDiyWin:false,
      //测试数据
      treeProps: {
        label: 'label',
        children: 'children',
        isLeaf: 'leaf'
      },
      inputValu:''
    });

    //初始化树数据
    this.initTreeData() ;
  }

  /**
   * 初始化树数据
   */
  initTreeData(){
    //先用原始区的库走流程
    this.data.treeData = [
      {"label":"原始区(临时)",id:"",idl:"old",type:"area",flag:1 ,children:[
          {"label":"部门",id:"",idl:"old_org",type:"orgRoot",flag:1 ,children:[this.createTempNode()]},
          {"label":"主题",id:"",idl:"old_theme",type:"themeRoot",flag:1 ,children:[this.createTempNode()]}
        ]},
      {"label":"处理区",id:"",idl:"old",type:"area",flag:2 ,children:[
          {"label":"部门",id:"",idl:"old_org",type:"orgRoot",flag:2 ,children:[this.createTempNode()]},
          {"label":"主题",id:"",idl:"old_theme",type:"themeRoot",flag:2 ,children:[this.createTempNode()]}
        ]},
      {"label":"分析区",id:"",idl:"handler",type:"area",flag:3,children:[
          {"label":"部门",id:"",idl:"handler_org",type:"orgRoot",flag:3 ,children:[this.createTempNode()]},
          {"label":"主题",id:"",idl:"handler_theme",type:"themeRoot",flag:3 ,children:[this.createTempNode()]}
        ]}
    ];
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
      resourceStyle:this.isHive?"nosql":"database",
      dbStyle:this.isHive?"hive":"",
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
    else if(node.type === "theme")
      this.queryTableList(node,_sendParams ) ;
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
      node.children =  orglist.concat(dblist) ;
    },()=>{
      node.children = [] ;
    },ProcessAPI.queryLevelResource) ;
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
   * 模拟加载状态
   * @returns {{id: string, idl: string, label: string, type: string, children: Array}}
   */
  createTempNode(){
    return {id:"",idl:NormalUtils.createOID("idl"),label:"loading...",type:"temp",children:[]} ;
  }
}
