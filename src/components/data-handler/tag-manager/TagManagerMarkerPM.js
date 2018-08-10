/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import FormPmBase from "@/common/model/FormPmBase";
import TagManagerAPI from "@/common/service/TagManagerAPI" ;
import DataStorageAPI from "@/common/service/DataStorageAPI" ;
import PagePm from "@/common/model/PagePm";

export default class TagManagerMarkerPM extends FormPmBase{

    constructor() {
      super() ;
      //分页查询组件
      this.pagePM = new PagePm(DataStorageAPI.queryOriginalMarkerList) ;

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
      //
      this.initTagForm() ;
    }


  /*初始化查询表单*/
  initSearchForm( query=true ) {
    if (!this.data.searchForm)
      this.data.searchForm = {};
    this.initData({
      dataSourceId:"",//资源ID
      resourceName:"",
      // dbStyle:"",
      resourceStyle:"database",
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
   * 初始化异步码值
   */
  initAnsDataList() {
    ConstManager.initDataDictionary(()=> {
      this.data.sourceTypeList = ConstManager.sourceTypeList; //数据库类型
      this.data.shareWayList = ConstManager.shareTyple; //共享方式
      this.data.sensitiveLevelList = ConstManager.secureLevel; //敏感级别
      this.data.gatheringWayList = ConstManager.gatheringWay; //汇聚方式
      this.data.themeList = ConstManager.themeList;//汇聚主题
    });
  }

  /**
   *
   */
  initView(query){

    //初始化码表
    this.initAnsDataList() ;

    //清空当前视图
    this.pagePM.reset();
    this.mainView = "" ;
    this.data.searchForm.dataSourceId = "" ;

    //默认查询数据
    this.queryList() ;
  }

  /*查询列表*/
  queryList(){
    super.queryList(NormalUtils.clearSpaceAtt(this.data.searchForm));
  }

  /**
   * 打标签
   */
  initTagForm(){
    this.tagList = null ;//标签数据源
    this.tagMap = {} ;
    this.sourceTagList = null ;
    this.initData({
      tagTreeData:[],//资源标签
      tagAddList:[],//资源标签
      isPopTag:false,
      tagSingleFlag:true,//是否只给一个对象打标签
      tagSourceList:[],
      tagSource:{}

    }) ;
  }

  /**
   * 打标签
   * @param item
   */
  popTagWin(value){
    this.initTagForm() ;
    if(!value) {
      if(!this.data.deleteItems || this.data.deleteItems.length===0)
        return ;
      this.data.tagSourceList = this.data.deleteItems ;
      this.data.tagSingleFlag = false ;
    }
    else{
      this.data.tagSource = value ;
      this.querySourceTag();
    }

    //弹出打标签
    this.data.isPopTag = true ;

    //查询标签库
    this.queryTagTree() ;
  }

  /**
   * 查询标签树
   */
  queryTagTree() {
    this.query({}, (result) => {
      this.tagList = result.resultdata;//tid tname  tdesc parent_id
      this.tagMap = {} ;
      NormalUtils.getSelectIndex(this.tagList,"1","tid",true) ;
      for(let item of  this.tagList){
        item.selected = false ;
        item.id = item.tid ;//转换为本地属性  别的逻辑就不改了
        item.name = item.tname ;
        item.parentId = item.parent_id ;
        this.tagMap[item.id] = item ;
      }

      //初始化选中状态
      if(this.data.tagSingleFlag)
        this.initTagSelected() ;

      //解析树结构
      let tree = NormalUtils.initListToTree(this.tagList,"id","parentId");

      //添加一个级别标识
      NormalUtils.travelTree(tree,(item,level)=>{
        item.level = level;
        item.levelStyle= level ;
        if(item.level>4)
          item.levelStyle = "mini" ;
      }) ;
      this.data.tagTreeData = tree ;
    }, null, TagManagerAPI.queryTagList);
  }

  /**
   * 查询某个资源已经打的标签
   */
  querySourceTag(){
    this.query({id:this.data.tagSource.id}, (result) => {
      let _list = result.data;
      let _select = [] ;
      for(let item of _list ){
        _select.push({id:item.labelId }) ;
      }
      this.sourceTagList = _select ;
      this.initTagSelected() ;
    }, null, DataStorageAPI.querySourceTag);
  }


  /**
   * 初始化选中状态
   */
  initTagSelected(){
    if(!this.data.tagSingleFlag || !this.sourceTagList ||  !this.tagList  )
      return ;

    let _arr = [] ;
    for(let tag of this.sourceTagList){
      if(this.tagMap.hasOwnProperty(tag.id)){
        let node = this.tagMap[tag.id] ;
        node.selected = true ;
        _arr.push(node) ;
      }
      else {
        tag.levelStyle = "";
        _arr.push(tag) ;
      }
    }
    this.data.tagAddList = _arr ;
  }

  /**
   * 删除某个资源
   * @param source
   */
  removeTagSource(source){
    if(this.data.tagSourceList.length===1){
      this.popMessage("至少需要保留一个资源！") ;
      return ;
    }
    NormalUtils.getSelectIndex(this.data.tagSourceList,source.id,"id",true) ;
  }

  /**
   * 某个标签选中
   * @param node
   */
  tagItemSelect(node,isToggle=false){
    if(isToggle)
      node.selected = !node.selected ;
    if(node.selected)
      this.addSelectTag(node) ;
    else
      NormalUtils.getSelectIndex(this.data.tagAddList,node.id,"id",true) ;
  }

  /**
   * 添加标签
   * @param node
   */
  addSelectTag(node){
    let list = this.data.tagAddList ;
    let len = list.length ;
    let item ;
    let added = false ;
    for(let i=0;i<len;i++){
      item = list[i] ;
      if(node.level<=item.level){
        list.splice(i,0,node) ;
        added = true ;
        break ;
      }
    }
    if(!added)
      list.push(node) ;
  }

  /**
   * 移除选中标签
   * @param item
   */
  tagClose(item){
    NormalUtils.getSelectIndex(this.data.tagAddList,item.id,"id",true) ;
    if(this.tagMap.hasOwnProperty(item.id))
      this.tagMap[item.id].selected = false ;
  }

  /**
   * 提交标签
   */
  submitTag(){
    if(!this.data.tagSingleFlag){
      if(this.data.tagAddList.length===0){
        this.popMessage("请至少选择一个标签！");
        return ;
      }
      if(this.data.tagSourceList.length===0){
        this.popMessage("资源列表不能为空！");
        return ;
      }
    }

    //参数
    let _sourceList = [] ;
    let _tagList = this.getArrAttList(this.data.tagAddList) ;
    if(this.data.tagSingleFlag===true)
      _sourceList = [this.data.tagSource] ;
    else
      _sourceList =  this.data.tagSourceList  ;

    let send = [] ;
    for(let source of _sourceList){
      send.push({resourceId:source.id,labelIds:_tagList}) ;
    }

    //保存数据
    this.query(send,(result)=>{
      this.popMessage("添加成功！") ;
      this.closeTagWin();
    },null,DataStorageAPI.saveTagOfSource);
  }

  /**
   * 获得列表内对象某个属性列表
   * @param arr
   * @param att
   * @returns {Array}
   */
  getArrAttList(arr ,att="id" ){
    let _re = [] ;
    for(let item of arr){
      _re.push(item[att]) ;
    }
    return _re ;
  }

  /**
   * 关闭窗口
   */
  closeTagWin(){
    this.data.isPopTag = false ;
  }

}
