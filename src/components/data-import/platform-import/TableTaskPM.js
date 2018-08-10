//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import FormPmBase from "@/common/model/FormPmBase" ;
import PagePm from "@/common/model/PagePm";
import DataImportAPI from "@/common/service/DataImportAPI";
import ConstManager from "@/common/manager/ConstManager";
import DataStorageAPI from "@/common/service/DataStorageAPI" ;
import NormalUtils from "@/common/utils/NormalUtils";

export default class TableTaskPM extends FormPmBase{

  constructor( name,id ) {
    super(name,id);

    this.createMethod = DataImportAPI.saveImportData ;
    this.updateMethod = DataImportAPI.saveImportData ;
    this.deleteMethod = DataImportAPI.deleteImport ;
    this.deleteMethod2 = DataImportAPI.deleteImport ;

    //分页查询
    this.pagePM = new PagePm(DataImportAPI.queryImportList) ;
    this.dbQuery = new PagePm(DataStorageAPI.queryExternalMarkerList) ;
    this.dbQuery.data.pageSize = 9999999 ;
    // this.pagePM.testHandler = this.testHandler ;

    //需要滚动容器id
    this.formContainerId = "" ;
    this.autoClose = false ;

    //绑定数据
    this.initData(
      {
        sourceTypeList:[],
        addLeftList:[],
        expandAll:false,
        themeList:[],
        addRightList:[],
        radioRight:"",
        radioLeft:"",
        popConfig:false
      }
    ) ;

    //初始化查询表单
    this.initSearchForm( ) ;

    //编辑信息
    this.initFormData() ;

    this.initDetailForm() ;
  }

  /**
   * 初始化异步列表数据
   */
  initAnayListData(){
    ConstManager.initDataDictionary(()=> {
      this.data.sourceTypeList = ConstManager.dbTypeList;
      this.data.themeList = ConstManager.themeList;
    });
  }

  /*初始化查询表单*/
  initSearchForm( query=true ) {
    this.initDataForm({
      startTime:"",
      endTime:"",
      createTime:[],
      jobName:"",
      orgId:'',
      theme:'',
      dataResourceName:'',
      resourceStyle:"database"
    },"searchForm") ;

    if(query===true)
      this.queryList() ;
  }

  /**
   * 初始化视图
   */
  initView(){
    this.initAnayListData() ;
    this.queryList() ;

    //默认显示添加
    this.popCreateWin() ;
  }

  /**
   * 查询接口
   */
  queryList(){
    let search = this.data.searchForm ;
    let params = NormalUtils.copyObjectAtt(search,{
      startTime:"",
      endTime:"",
      jobName:"",
      orgId:'',
      theme:'',
      dataResourceName:'',
      resourceStyle:"database"} ) ;
    if(search.createTime){
      if(search.createTime.length>0)
        params.startTime = NormalUtils.dateFormat(search.createTime[0]) ;
      if(search.createTime.length>1)
        params.endTime =  NormalUtils.dateFormat(search.createTime[1]) ;
    }
    // if(search.startTime)
    //   params.startTime = NormalUtils.dateFormat(search.startTime) ;
    // if(search.endTime)
    //   params.endTime =  NormalUtils.dateFormat(search.endTime) ;

    //分页第一次查询
    super.queryList(params,(datas)=>{
      for(let item of datas ){
        item.canRun = true ;
        item.canEdit = true ;
        item.canDel = true ;
        item.canConfig = false ;
        item.runBtnDisabled = false ;
        item.runLabel = item.startStatus===ConstManager.started?'停止':'启动' ;

        //如果状态不是 未启动 而且是一次性任务 不允许再执行 都是中文需要小心 提个静态变量 后台也会有验证temp?
        if(!item.timeUnit || !item.beginTime || (item.startStatus !==  ConstManager.unStart && item.timeUnit==="一次性"))
          item.canRun = false ;

        //如果任务正在运行中 不可以设置周期
        if(item.startStatus !== ConstManager.unStart)
          item.canEdit = false ;

        //只有任务执行中不可以删除 别的时候都可以删除
        if(item.startStatus === ConstManager.started )
          item.canDel = false ;

        //如果任务正在运行中 不可以设置周期
        if(item.startStatus === ConstManager.unStart || item.startStatus === ConstManager.stopped)
          item.canConfig = true ;
      }
    }) ;
  }


  /**
   * 出事哈
   * @isinit 是否完全重新初始化
   */
  initFormData( isinit = true ){
    //表单元素
    this.initDataForm({
      orgId:"",//部门id
      dataInstance:"",//库名
      id:"",//接入任务id
      jobName:"",//任务名称
      externalSourceId:'',//外部数据源id
      externaleRourceId:"",//外部资源表id
      originalRourceId:"",//原始区资源表id
      originalSourceId:""//原始区数据源id
    },"form") ;

    //初始化查询表单
    this.initAddSearchForm() ;

    //选中
    this.data.radioRight = "" ;
    this.data.radioLeft = "" ;

    //默认打开
    this.data.expends = [] ;
    this.catchEditTables = [] ;//缓存编辑的表  后台需要比较值

    //两个选中
    this.rightNode = null ;
  }

  initAddSearchForm( query=false){
    this.initDataForm({
      dataInstance:"",
      theme:"",
      orgId:""
    },"addForm") ;
    if(query)
      this.addFomQueryList() ;
  }

  initDetailForm(){
    this.initDataForm({
      jobName:"",
      fromDb:"",
      tables:"",
      targetDb:""
    },"detailForm") ;
  }

  /**
   *  弹出创建窗口
   */
  popCreateWin(formValue,reopen=false){
    this.clearFormData() ;
    this.data.expandAll = false ;
    super.popCreateWin();
    this.addFomQueryList() ;//默认查询所有 应该分级查询 temp?
  }

  /**
   * 重置添加视图
   */
  resetListState(){
    if(this.data.addLeftList){
      for(let item of this.data.addLeftList){
        if(item.children){
          for(let tab of item.children){
            tab.selected = false ;
          }
        }
      }
    }
    if(this.data.addRightList){
      for(let item of this.data.addRightList){
        item.selected = false ;
      }
    }
    this.initFormData() ;
  }

  /**
   *  弹出修改窗口
   */
  popEditeWin( item ){
    this.clearFormData() ;
    this.data.expandAll = true ;
    super.popEditeWin(item) ;
    this.editFormQueryList() ;
    this.data.form.id = item.id ;
    this.data.form.jobName = item.jobName ;

    //temp?
    NormalUtils.autoScrollForm(this.formContainerId) ;
  }

  /**
   * 弹出详情
   * @param item
   */
  popDetailWin(item){
     super.popDetailWin(item) ;
    this.initDetailForm() ;
    this.data.detailForm.jobName = item.jobName ;
    this.editDetailQueryList() ;
  }

  /**
   * 清空当前列表
   */
  clearFormData(){
    this.rightNode = null ;
    this.data.addLeftList = [] ;
    this.data.addRightList = [] ;
    this.initFormData() ;
  }

  editClickHandler(item){
    if(item.canEdit)
      this.popEditeWin(item) ;
    else
      this.popDetailWin(item) ;
  }

  /**
   * 添加窗口默认查询
   */
  addFomQueryList(){
    this.data.expandAll = false;
    this.query(this.data.addForm,(result)=>{
      this.data.addLeftList = this.initDbData(result,"externalSourceDtos",true) ;

      //第一次赋值
      if(!this.data.addRightList || this.data.addRightList.length===0)
        this.data.addRightList = this.initDbData(result,"originalSourceDtos" ) ;
    },null,DataImportAPI.syncJobAdd) ;
  }

  /**
   *  与编辑
   */
  editFormQueryList(){
    if(! this.currentItem )
      return ;
    this.data.expandAll = true;
    let send = this.initData(this.data.addForm,{  id: this.currentItem.id  }) ;
    this.query(send,(result)=>{

      //左侧树
      let dbList = this.initDbData(result,"externalSourceDtos") ;
      this.initLeftTableData(result,dbList) ;

      //解析右侧表单
      let rightList =  this.initDbData(result,"originalSourceDtos") ;
      this.rightNode = NormalUtils.getSelectItem( rightList,result.data.originalSourceId ,"id") ;
      if(this.rightNode)
          this.rightNode.selected = true ;
      this.data.addRightList = rightList ;

      this.data.expandAll = true;
    },null,DataImportAPI.syncJobEdit) ;
  }

  /**
   *  与编辑***********
   */
  editDetailQueryList(){
    if(! this.currentItem )
      return ;
    let send = this.initData(this.data.addForm,{  id: this.currentItem.id  }) ;
    this.query(send,(result)=>{

      let dbId = "" ;
      let tbs = [] ;
      if(result.data.externalIds && result.data.externalIds.externalSourceId ){
        dbId = result.data.externalIds.externalSourceId ;
        tbs = result.data.externalIds.externalResourceId || [] ;
      }
      let dbList = this.getResultList(result,"externalSourceDtos") ;//解析库
      let tbList = this.getResultList(result,"externalResourceDtos") ;//表
      let selDb = NormalUtils.getSelectItem(dbList,dbId,'id');
      let tbMap = NormalUtils.array2Map(tbList,"id") ;
      let selTbs = [] ;
      for(let tb of tbs){
        if(tbMap.hasOwnProperty(tb))
          selTbs.push(tbMap[tb]) ;
      }
      let rightList = this.getResultList(result,"originalSourceDtos") ;
      let rightNode = NormalUtils.getSelectItem( rightList,result.data.originalSourceId ,"id") ;
      this.initData({
        fromDb:selDb?selDb.dataInstance:"",
        tables:selTbs?selTbs:[],
        targetDb:rightNode?rightNode.dataInstance:""
      },this.data.detailForm) ;
    },null,DataImportAPI.syncJobEdit) ;
  }

  /**
   * 解析数据库列表
   * @param orgAtt
   * @param tabAtt
   * @returns {Array}
   */
  initDbData(result, orgAtt ,isLeft){
    let dbList = this.getResultList(result,orgAtt) ;//解析库
    let _list = [] ;
    for(let db of dbList){
      let _dbItem =  this.createDbNode(db,isLeft);
      _list.push(_dbItem) ;
    }
    return _list ;
  }

  /**
   * 解析左侧表数据
   */
  initLeftTableData( result ,dbList ){
    let tbList = this.getResultList(result,"externalResourceDtos") ;
    let dbMap = NormalUtils.array2Map(dbList,"id") ;
    let selectTable = result.data.externalIds ;
    let selectMap = "," ;
    let _list = [] ;

    //解析选中的对象
    if(selectTable ){
      let dbId = selectTable.externalSourceId ;
      if(selectTable.externalResourceId){
        for(let tb of selectTable.externalResourceId){
          selectMap+=  dbId+"_"+tb +","  ;

        }
        this.catchEditTables = [].concat(selectTable.externalResourceId) ;
      }
    }

    //解析所有表
    let selectedTable = "" ;
    for(let table of tbList){
      let itemData = this.createTableNode(table) ;
      if(dbMap.hasOwnProperty(table.dataSourceId)){
        let parent = dbMap[table.dataSourceId] ;
        itemData.parent = parent ;
        itemData.dataInstance = parent.dataInstance ;
        dbMap[table.dataSourceId].children.push(itemData) ;
        if( selectMap.indexOf(","+(table.dataSourceId+"_"+itemData.id)+",")>-1){
          itemData.selected = true ;
          selectedTable = itemData.autoId ;
        }
      }
      _list.push(itemData) ;
    }
    if(selectedTable)
      this.data.expends = [selectedTable] ;
    this.data.addLeftList = dbList ;
  }

  /**
   * 数据库节点
   * @param db
   * @returns {{id, type: string, label: string|*|string|{required: boolean, message: string, trigger: string}[], orgId, selected: boolean, dataInstance: string|*|string|{required: boolean, message: string, trigger: string}[], children: Array}}
   */
  createDbNode(db ,addTemp=false){
    let _re = {
      id:db.id,
      type:"db",
      label:db.dataInstance,
      orgId:db.orgId ,
      selected:false,
      dataInstance:db.dataInstance,
      autoId:NormalUtils.createOID("node_id"),
      children:[]
    } ;
    if(addTemp)
      _re.children.push( this.createTempNode()) ;
    return _re ;
  }

  /**
   * 创建表节点
   * @param tb
   * @returns {{id, type: string, label: string|*|string|string, selected: boolean, dataSourceId: *|string|string}}
   */
  createTableNode( tb ){
    return {
      id:tb.id,
      autoId:NormalUtils.createOID("node_id"),
      type:"table",
      label:tb.tableName,
      selected:false,
      dataSourceId:tb.dataSourceId
    }
  }

  /**
   * 模拟加载状态
   * @returns
   */
  createTempNode() {
    return {
      id: "",
      idl: NormalUtils.createOID("idl"),
      label: "loading...",
      type: "temp",
      children: []
    };
  }

  /**
   * 打开数据库 查询
   * @param node
   */
  queryTableList(node,data){
    if(node.type!=="db" || !this.hasTempNode(node))
      return ;

    let _this = this ;

    let send = {dataSourceId:node.id} ;

    this.dbQuery.queryList({dataSourceId: node.id },null,
    // this.query({dataSourceId: node.id },
      (result) => {
        let _list = result;//this.getResultList(result) ;
        let _nodes = [] ;
        _list.forEach((item)=>{
          let itemData = this.createTableNode(item) ;
          _nodes.push(itemData) ;
        });
        node.children = _nodes ;
      } ) ;
      // null,DataStorageAPI.querySourceTableList ) ;//queryConfigList
  }

  /**
   * 是否是临时节点
   * @param node
   * @returns {boolean}
   */
  hasTempNode(node){
    if(!node.children || node.children.length===0)
      return false ;
    let item = node.children[0] ;
    if(item.type==="temp")
      return true ;
    return false ;
  }

  /**
   * 保险点 直接接收对象
   * @param node
   */
  rightTreeClick(node){
    if( this.rightNode)
      this.rightNode.selected =false ;
    this.rightNode = node ;
    this.rightNode.selected = true ;
  }

  /**
   * 修改任务状态
   * @param value
   */
  changeJobState(value,flag){
    let method = DataImportAPI.startJob ;
    if(!flag)
      method = DataImportAPI.stopJob ;

    //调用启动命令
    this.query({id:value.id},(result)=>{
      //加个延时控制 避免点击过快
      this.data.isLoading = true ;
      let cid = setTimeout(()=>{
        clearTimeout(cid) ;
        this.data.isLoading = false ;
        this.reQuery() ;//保证状态的准确性
      },5000) ;
    },null,method) ;
  }

  /**
   * 验证是否一个库下
   * @param node
   * @param data
   */
  validCheck(node,data){
    if(!data.selected)
      return ;
    let valid = this.getLeftSelectd() ;
    if(valid===null)
      data.selected = false ;
  }

  /**
   * 获得当前选中的表  限制只能选一个库的  验证写里面了 temp?
   * @returns {Array}
   */
  getLeftSelectd(){
    if(!this.data.addLeftList )
      return [] ;
    let _reArr = [] ;
    let _has = "" ;
    for(let db of this.data.addLeftList){
      let dbSelect = null ;
      for(let table of db.children){
        if(table.selected===true){
          if(!dbSelect){
            dbSelect = {
              externalSourceId:db.id,
              dataInstance:db.dataInstance,
              externaleResourceId:[]
            } ;
            _reArr.push(dbSelect) ;
          }
          dbSelect.externaleResourceId.push(table.id) ;
        }
      }

      //不让添加
      if(dbSelect){
        if(_has && _has !== dbSelect.externalSourceId){
          this.popMessage("请选择同一库下的数据表！") ;
          return null ;
          break ;
        }
        _has = dbSelect.externalSourceId ;
      }
    }
    return _reArr ;
  }

  /**
   * 提交表单
   */
  submit(){
    let checks = this.getLeftSelectd() ;
    if(checks===null)
      return ;
    if(!this.data.form.jobName){
      this.popMessage("请输入任务名称！") ;
      return ;
    }
    if(checks.length===0){
      this.popMessage("请选择资源表！") ;
      return ;
    }
    if(!this.rightNode){
      this.popMessage("请选择目标库！") ;
      return ;
    }
    let item = this.data.addLeftList[0] ;

    let send = {
      id:this.data.form.id,//接入任务id
      jobName:this.data.form.jobName,
      orgId:item.orgId,//部门id
      externalIds:checks[0],//外部数据源的库名
      addResourceId:[],
      delResourceId:[]
    }
    send.originalSourceId = this.rightNode.id ;//原始区数据源id
    if(this.data.isPopCreate)
        send.addResourceId = checks[0].externaleResourceId ;
    else
       this.comperaTables(checks[0].externaleResourceId,this.catchEditTables,send) ;

    if(this.data.isPopUpdate)
      send.id = this.currentItem.id ;

    this.query(send,()=>{
      this.popMessage("操作成功！");
      this.queryList() ;
      if(this.data.isPopCreate)
        this.resetListState() ;
    },null,this.createMethod) ;
  }

  /**
   * 比较增加的删除的
   * @param newTables
   * @param oldTables
   * @param send
   */
  comperaTables( newTables,oldTables,send){

    let add = [] ;
    let del = [] ;
    let oldMap = NormalUtils.array2Map(oldTables) ;
    let newMap = NormalUtils.array2Map(newTables) ;
    for(let tb of newTables){
      if(!oldMap.hasOwnProperty(tb))
        add.push(tb) ;
    }
    for(let otb of oldTables){
      if(!newMap.hasOwnProperty(otb))
        del.push(otb) ;
    }
    send.addResourceId = add ;
    send.delResourceId = del ;
  }

  /**
   * 组织删除参数
   * @param param
   * @param ismore
   * @param idfield
   */
  getDeleteParams(param,ismore=false,idfield="id"){
    if(!ismore)
      param = [param] ;
    return super.getDeleteParams(param,true,idfield) ;
  }

  /**
   * 重置表单
   */
  resetForm(){
    this.initFormData(false) ;
    if(this.resetHandler)
      this.resetHandler() ;
  }

  clear(){
    super.clear() ;
    this.initFormData() ;//重新初始化数据
    this.initSearchForm();
  }

  testHandler(){
    return NormalUtils.createTestData({
      orgId:"",//部门id
      dataInstance:"",//库名
      id:"",//接入任务id
      externalSourceId:'',//外部数据源id
      externaleRourceId:"",//外部资源表id
      originalRourceId:"",//原始区资源表id
      originalSourceId:"",//原始区数据源id
      beginTime:"",
      timeUnit:""
    },100) ;
  }
}
