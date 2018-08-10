/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import ConstManager from "@/common/manager/ConstManager" ;
import PagePm from "@/common/model/PagePm";
import DataStorageAPI from "@/common/service/DataStorageAPI";
import ShareViewPM from "../common-comps/ShareViewPM";
import TagManagerAPI from "@/common/service/TagManagerAPI" ;

export default class SourceGetterPM extends ShareViewPM{

    constructor() {
      super();

      this.dataBaseType = "database" ;

      //分页查询部件
      this.pagePM = new PagePm(DataStorageAPI.queryOriginalMarkerList);
      this.pagePM.resultListHandler = (result)=>{return this.pageDataHandler(result); };

      this.initData({
        resourceStyle:ConstManager.sourceTypeList,
        sourceTypeList: ConstManager.sourceTypeList, //数据库类型
        shareWayList: ConstManager.shareTyple, //共享方式
        sensitiveLevelList: ConstManager.secureLevel, //敏感级别
        gatheringWayList: ConstManager.gatheringWay, //汇聚方式
        themeList: ConstManager.themeList //汇聚主题
      });

      //初始化查询表单
      this.initFoldForm();
    }

  /**
   * 目录表单
   */
  initFoldForm( query=false){
    this.initDataForm({
      dataSourceId:"",//资源ID
      resourceStyle:this.dataBaseType,
      orgId:"",
      // dbStyle:"",
      shareWay:"",
      tagName:"",
      gatheringWay:"",//汇聚方式
      theme:"", //汇聚主题
      updateTime:"",//更新时间
      sensitiveLevel:""//敏感等级
    },"searchForm") ;
    if(query)
      this.queryList() ;
  }

  /**
   * 每次进入视图
   */
  initExecute(){
    this.initFoldForm() ;//进入重置表单
    this.initAnsDataList() ;
    this.queryList() ;
  }

  /**
   * 初始化异步码值
   */
  initAnsDataList() {
    ConstManager.initDataDictionary(()=>{
      this.data.sourceTypeList = ConstManager.sourceTypeList; //数据库类型
      this.data.shareWayList = ConstManager.shareTyple; //共享方式
      this.data.sensitiveLevelList = ConstManager.secureLevel; //敏感级别
      this.data.gatheringWayList = ConstManager.gatheringWay; //汇聚方式
      this.data.themeList = ConstManager.themeList;//汇聚主题
    }) ;
  }

  /**
   * 查询数据列表
   */
  queryList(){
    let _send = NormalUtils.clearSpaceAtt(this.initData(this.data.searchForm,{} ) ) ;//单独过滤 有些不需要过滤
    if(_send.updateTime && typeof _send.updateTime !=="string")
      _send.updateTime = NormalUtils.dateFormat(_send.updateTime,"yyyy-MM-dd");

    this.pagePM.queryList(_send) ;
  }

  /**
   * 数据处理
   */
  pageDataHandler(result){
    let _list = this.getResultList(result);
    let _typeMap = NormalUtils.array2Map(ConstManager.sourceTypeList,"value") ;
    for(let item of _list){
      item.resourceStyleName = item.resourceStyle ;
      if(_typeMap.hasOwnProperty(item.resourceStyle))
        item.resourceStyleName = _typeMap[item.resourceStyle].label ;
    }
    return _list ;
  }

  /**
   * 自动匹配资源标签  --- 后台太懒了 说好几遍了 还是没给接口
   * @param str
   * @param cb
   */
  queryKeyInfo(str,cb){
  }

  /**
   * 选中处理
   */
  autoSelectHandler(){

  }

  /**
   * 浏览文件
   */
  downFile(data ){
    if(data.resourceStyle==='file'){
      DataStorageAPI.fileDataExport(data);
    }
    else
      DataStorageAPI.tableDataExport(data) ;
  }

  openFile(item){
    this.query({id:item.id},(result)=>{
      let win = window.open('','' ) ;
      win.document.write(result.result+"") ;
      win.focus() ;

    },null,DataStorageAPI.browseFileHtml) ;
  }
}
