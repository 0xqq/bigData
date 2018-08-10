/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import FormPmBase from "@/common/model/FormPmBase";
import ConstManager from "@/common/manager/ConstManager";
import DataImportAPI from "@/common/service/DataImportAPI";
import PagePm from "@/common/model/PagePm";
import DataStorageAPI from "@/common/service/DataStorageAPI";
import NormalUtils from "../../../common/utils/NormalUtils";
import TaskVO from "../../data-analysis/data-mining/mining-model/model-edit/data-vo/TaskVO";
import AnalysisAPI from "../../../common/service/AnalysisAPI";

export default class FileTaskPM extends FormPmBase {

  constructor() {
    super();

    this.createMethod = DataImportAPI.saveImportFileData;
    this.updateMethod = DataImportAPI.saveImportFileData;
    this.deleteMethod = DataImportAPI.deleteImport;
    this.deleteMethod2 = DataImportAPI.deleteImport;

    //分页查询
    this.pagePM = new PagePm(DataImportAPI.queryImportFileList);
    // this.pagePM.testHandler = this.testHandler ;

    //需要滚动容器id
    this.formContainerId = "";
    this.autoClose = false ;

    //绑定数据
    this.initData({
      showFileBrowse: false,
      shareList: [],//共享方式
      themeList: [],//主题
      secureLevel: [],//敏感等级
      fileSystem: [], //系统目录
      modelType:''
    });

    //查询表单
    this.initSearchForm();

    //表单元素
    this.initFormData();
  }

  /**
   * 初始化查询表单
   * @param query  是否同时查询
   */
  initSearchForm(query = false) {
    this.initDataForm({
      startTime: "",
      endTime: "",
      createTime:[],
      jobName: '',
      orgId: '',
      resourceStyle: "file",
      dataResourceName: '',
      theme: ''
    }, "searchForm");

    if (query)
      this.queryList();
  }

  /**
   * 初始化增上改表单
   * @param isinit
   */
  initFormData(isinit = true) {
    this.initDataForm({
      id: "", //文件接入ID  如果添加为空
      jobName: "",//任务名称
      orgId: "",//机构名称
      dataResourceName: "",//资源名称
      dataSourceName: "", //数据源名称
      externalSourceId: "",//数据源
      externalDataInstance:"",//根目录
      originalSourceId: "",//外部数据源id
      originalDataInstance:"",//根目录
      shareWay: "",//共享方式
      sensitiveLevel: "",//敏感程度
      sourcePath: "",//文件路径
      notInRule: "",//排除规则
      inRule: "",//包含规则 和 exceptRule 只有一个不为空 为空不处理
      flag: false,//是否包含子文件夹
      theme: "",//主题
      isFile:"",
      sinkPath: ""//目标路径
    }, "form");

    this.initDataForm({
      exceptRule: false,//规则单选
      containRule: false
    }, "formView");
  }

  /**
   * 视图初始化
   */
  initView() {
    super.initView();

    //初始化异步数据
    this.initAnayListData();

    //默认查询列表
    this.queryList();

    //默认显示添加
    this.popCreateWin();
  }

  /**
   * 初始化异步列表数据
   */
  initAnayListData() {
    ConstManager.initDataDictionary(() => {
      this.data.themeList = ConstManager.themeList;
      this.data.shareList = ConstManager.shareTyple;
      this.data.secureLevel = ConstManager.secureLevel;
    });
  }

  /**
   * 查询列表数据
   */
  queryList() {
    let search = this.data.searchForm;
    let params = this.initData(this.data.searchForm, {});
    if(search.createTime ){
       if(search.createTime.length>0)
         params.startTime = NormalUtils.dateFormat(search.createTime[0]);
      if(search.createTime.length>1)
        params.endTime = NormalUtils.dateFormat(search.createTime[1]);
    }
    delete params.createTime ;

    //分页第一次查询
    super.queryList(params,(datas)=>{
      for(let item of datas ){
        item.canRun = true ;
        item.canEdit = true ;
        item.canConfig = false ;
        item.canDel = true ;
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



  /*------------------------------------------------------ form -------------------------------------*/
  /**
   * 弹出创建表单
   */
  popCreateWin() {
    this.initFormData();
    super.popCreateWin();
    this.queryOriginalList();
  }

  /**
   * 弹出创建表单
   */
  popEditeWin(item) {
    super.popEditeWin();

    //重新初始化表单
    this.initFormData();

    //基本数据
    NormalUtils.copySimpleAtt(item, this.data.form);
    if (item.externalSourceName)
      this.data.form.dataSourceName = item.externalSourceName;

    //查询详情
    this.queryEditDetail();

    //定位到顶部
    NormalUtils.autoScrollForm(this.formContainerId);
  }

  /**
   * 查询外部数据源
   *   id:string,//原始区数据源
   orgId:string,//部门主键
   dataInstance,//库名
   */
  queryOriginalList() {
    this.query({}, (result) => {
      let list = this.getResultList(result, "originalSourceDtos");//label value
      this.data.fileSystem = list;
    }, null, DataImportAPI.queryFileOriginalList);
  }


  /**
   * 查询详情
   */
  queryEditDetail() {
    this.query({id:this.data.form.id}, (result) => {
      let list = this.getResultList(result, "originalSourceDtos");//label value
      this.data.fileSystem = list;
      NormalUtils.copySimpleAtt(result.data, this.data.form);
      if(result.data.hasOwnProperty(" externalSourceName"))
        this.data.form.dataSourceName = result.data[" externalSourceName"] ;
      else
        this.data.form.dataSourceName = result.data.externalSourceName ;

     //如果有这个ID使用这个
     if(result.data.hasOwnProperty("resourceId"))
         this.data.form.sourcePath = result.data.resourceId ;

      this.data.form.flag = (this.data.form.flag+"")==="1"?true:false;
      this.data.formView.exceptRule = this.data.form.notInRule?true:false ;
      this.data.formView.containRule = this.data.form.inRule?true:false ;
    }, null, DataImportAPI.queryFileImportDetail);
  }

  /**
   * 控制只能选择一个
   * @param att
   */
  ruleCheckChange(att, att2) {
    if (this.data.formView[att] === true)
      this.data.formView[att2] = false;
  }

  /**
   * 选择文件
   */
  selectFile() {
    this.data.showFileBrowse = true;
  }

  /**
   * 浏览数据源目录选中处理
   */
  fileSelectHandler(fold) {
    this.data.form.sourcePath = fold.path;
    this.data.form.isFile = fold.type==="fold"?"0":"1";
  }

  /**
   * 目标路径选择处理
   * @param fold
   */
  fileTargetHandler(fold) {
    this.data.form.sinkPath = fold.path;
  }

  /**
   * 资源选择处理
   */
  sourceSelectHandler(data) {
    this.data.form.dataSourceName = data.dataSourceName;
    this.data.form.externalSourceId = data.id;
    this.data.form.externalDataInstance = data.dataInstance;
    this.data.form.orgId = data.orgId;
    this.data.form.sourcePath =  data.dataInstance;//默认显示下路径
  }

  /**
   * 获得当前表单的外部数据源对象
   * @returns {{id: string|*, dataSourceName: string|*|string|{required: boolean, message: string, trigger: string}[]|{required: boolean, message: string, trigger: string}[], dataInstance: string|*}}
   */
  getResourceData(){
    return {
      id:this.data.form.externalSourceId,
      dataSourceName:this.data.form.dataSourceName,
      dataInstance:this.data.form.externalDataInstance
    };
  }

  /**
   * 获得当前的目标对象
   * @returns {*}
   */
  getOrgainData(){
    let _index = NormalUtils.getSelectIndex(this.data.fileSystem,this.data.form.originalSourceId) ;
    if(_index>-1)
      return this.data.fileSystem[_index] ;
    else if(this.data.form.originalDataInstance)
      return {id:this.data.form.originalSourceId,dataInstance:this.data.form.originalDataInstance} ;
    return null ;
  }

  /**
   * 修改任务状态
   * @param value
   */
  changeJobState(value,flag) {
    let method = DataImportAPI.startJob;
    if(!flag)
      method = DataImportAPI.stopJob;

    //调用启动命令
    this.query({id: value.id}, (result) => {
      //加个延时控制 避免点击过快
      this.data.isLoading = true ;
      let cid = setTimeout(()=>{
        clearTimeout(cid) ;
        this.data.isLoading = false ;
        this.reQuery() ;//保证状态的准确性
      },5000) ;
    }, null, method);
  }

  /**
   * 获得创建参数
   */
  getCreateParams() {
    let _form = NormalUtils.copyObjectAtt(this.data.form,{
      orgId:"",//部门id
      id:"",//接入任务id
      jobName:"",//任务名称
      externalSourceId:"",//外部数据源id
      originalSourceId:"",//原始区数据源id
      theme:"",//主题
      notInRule:"",// 剔除规则  ps：剔除规则和包含规则不可共有
      inRule:"",// 包含规则
      flag:"",//是否包含子文件夹，0表示不包含，1表示包含
      sourcePath:"",//源路径
      sinkPath:"",
      isFile:""
    }) ;
    _form.notInRule = this.data.formView.exceptRule ? _form.notInRule : "";
    _form.inRule = this.data.formView.containRule ? _form.inRule : "";
    _form.flag = _form.flag ? 1 : 0;
    return _form;
  }

  /**
   * 生成更新表单数据
   */
  getUpdateParams() {
    return this.getCreateParams();
  }

  /**
   * 添加成功处理
   */
  submitResultHandler(result){
    super.submitResultHandler(result) ;
    // if(this.data.isPopCreate)
    this.popCreateWin();//重新清空表单
  }

//获取模型modleType（   0是 数据库，1是文件   ）
  initDrawStage( data ){
    //只接受编辑
    if(!data || !data.id)
      return ;
    this.query({id:data.id},(result)=>{
      this.data.modelType = result.data.modelType;
      console.log(this.data.modelType);
    },()=>{
    },AnalysisAPI.queryModelDetail) ;
  }


  /**
   * 组织删除参数
   * @param param
   * @param ismore
   * @param idfield
   */
  getDeleteParams(param, ismore = false, idfield = "id") {
    if (!ismore)
      param = [param];
    return super.getDeleteParams(param, true, idfield);
  }

  clear() {
    super.clear();
    this.initFormData();//重新初始化数据
    this.initSearchForm();
  }

  testHandler(){
    return NormalUtils.createTestData({
      id:"",
      jobName:""
    },30)
  }

}
