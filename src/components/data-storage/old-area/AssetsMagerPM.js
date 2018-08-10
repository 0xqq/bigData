//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import DataStorageAPI from "@/common/service/DataStorageAPI" ;
import PagePm from "@/common/model/PagePm";
import ConstManager from "@/common/manager/ConstManager";
import NormalUtils from "@/common/utils/NormalUtils";
import ShareViewPM from "../common-comps/ShareViewPM";

export default class AssetsMagerPM extends ShareViewPM{

  constructor(main="",sourceFlag=1) {
    super(main,sourceFlag );
    this.dataBaseType = "database" ;

    //分页查询组件
    this.pagePM = new PagePm(DataStorageAPI.queryOriginalMarkerList) ;
    this.pagePM.resultListHandler = (result)=>{return this.pageDataHandler(result); };
    // this.pagePM.testHandler = this.testDataHandler ;

    //主页
    this.mainView = "" ;
    //可编辑属性
    this.updateAtts = ["dataResourceName","theme", "shareWay", "sensitiveLevel" ,"gatheringWay"] ;

    //初始化绑定数据
    this.initData(
      {
        isManager:true,//edit
        resourceStyle:[
          {label:"关系型数据库",value:"database"},
          {label:"文件",value:"file"},
          {label:"NOSQL",value:"nosql",disabled:true}
        ],
        dbTypeList: ConstManager.sourceTypeList,//资源类型
        sourceTypeList:ConstManager.sourceTypeList, //数据库类型
        shareWayList:ConstManager.shareTyple, //共享方式
        sensitiveLevelList:ConstManager.secureLevel,  //敏感级别
        gatheringWayList:ConstManager.gatheringWay,  //汇聚方式
        themeList:ConstManager.themeList,  //汇聚主题
        tableName:"", //当前标注的表名
        fieldList:[] //表字段列表
      }
    ) ;

    //初始化查询表单
    this.initSearchForm( ) ;
  }

  /**
   * 初始化异步码值
   */
  initAnsDataList() {
    this.data.sourceTypeList = ConstManager.sourceTypeList; //数据库类型
    this.data.shareWayList = ConstManager.shareTyple; //共享方式
    this.data.sensitiveLevelList = ConstManager.secureLevel; //敏感级别
    this.data.gatheringWayList = ConstManager.gatheringWay; //汇聚方式
    this.data.themeList = ConstManager.themeList;//汇聚主题
  }

  /*初始化查询表单*/
  initSearchForm( query=true ) {
    if (!this.data.searchForm)
      this.data.searchForm = {};
    this.initData({
      dataSourceId:"",//资源ID
      resourceName:"",
      // dbStyle:"",
      resourceStyle: this.dataBaseType,
      orgId:"",
      shareWay:"",
      gatheringWay:"",//汇聚方式
      theme:"", //汇聚主题
      updateTime:"",//更新时间
      sensitiveLevel:""//敏感等级
  }, this.data.searchForm);
    if (query === true)
      this.queryList();
  }

  /**
   *
   */
  initExecute(query){

    //初始化码表
    this.initAnsDataList() ;

    //清空当前视图
    this.pagePM.reset();
    this.mainView = "" ;
    this.data.searchForm.dataSourceId = "" ;

    //如果只是单个资源查询
    if(query && query.hasOwnProperty("id")){
      this.data.isManager = false ;
      this.mainView = query.path ;
      this.data.searchForm.dataSourceId = query.id ;
      this.queryList() ;
      return ;
    }
    this.data.isManager = true ;

    //默认查询数据
    this.queryList() ;

    this.data.inited = true ;
  }

  /*查询列表*/
  queryList(){
    let send = this.initData(this.data.searchForm ,{}) ;
    if(send.updateTime)
      send.updateTime = NormalUtils.dateFormat(send.updateTime,"yyyy-MM-dd") ;
    //直接这里改
    if(send.resourceName)
      send.dataResourceName = send.resourceName ;
    send.resourceName = "" ;
    super.queryList(NormalUtils.clearSpaceAtt(send));
  }

  /**
   * 处理每页数据
   * @param result
   * @returns {Array}
   */
  pageDataHandler(result){
    let _list = this.getResultList(result);
    let _arr = this.updateAtts ;
    let _typeMap = NormalUtils.array2Map(ConstManager.sourceTypeList,"value") ;
    for(let item of _list){
      item.isEdit = false ;
      NormalUtils.createLocalAtt(item, _arr ,(item,att)=>{
        if(item[att])
          item[att+"Flag"] = true ;
      }) ;

      //转换成本地名称
      item.resourceStyleName = item.resourceStyle ;
      if(_typeMap.hasOwnProperty(item.resourceStyle))
        item.resourceStyleName = _typeMap[item.resourceStyle].label ;
    }
    return _list ;
  }

  /**
   * 行点击进行编辑
   * @param row
   * @param event
   */
  rowClick(row ){
    if(this.currentItem)
      this.currentItem.isEdit = false ;
    row.isEdit = true ;
    this.currentItem = row ;
  }

  /**
   * 修改资源信息
   * @param item
   * @param att
   */
  changeRowData(item,att){
    if(item[att] === item["_"+att])
      return ;

    let _send = NormalUtils.copyLocalAttObj(item, this.updateAtts,(item,att)=>{
      if(!item[att])
        item[att] = "" ;
    }) ;
    _send.id = item.id ;
    this.query(_send ,
      (result)=>{
        item[att] = item["_"+att];
      },
      ()=>{
        item["_"+att] = item[att];
      },DataStorageAPI.saveOldSourceMarker) ;
  }

  /**
   * 测试数据
   */
  testDataHandler(){
    return NormalUtils.createTestData({
      orgId:"",
      dataResourceName:"dfd",
      dataSourceName:"dfdfd",
      org:{orgName:"dfd"},
      dbStyle:"mysql",
      shareWay:"",
      id:"dfdf",
      tableName:"dfdfd",
      gatheringWay:"",//汇聚方式
      theme:"", //汇聚主题
      updateTime:"",//更新时间
      sensitiveLevel:"",//敏感等级
      dataInstance:"zyzx",
      hostAddress:"dfdfdfd",
      resourceStyle:"database"
    },10) ;
  }
}
