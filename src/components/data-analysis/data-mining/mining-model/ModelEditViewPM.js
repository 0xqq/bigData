//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象 套一层保证内容可以独立使用
// author:zc
// date:
// desc:
//------------------------------------------
import FormPmBase from "@/common/model/FormPmBase";
import DrawContainer from "./model-edit/model/DrawContainer";
import AnalysisAPI from "@/common/service/AnalysisAPI";
import TaskVO from "./model-edit/data-vo/TaskVO";
import PathConst from "../../../../router/PathConst";
import NormalUtils from "../../../../common/utils/NormalUtils";

export default class ModelEditViewPM extends FormPmBase{

  constructor( name,id ) {
    super(name,id);
    this.initData({
      drawId:NormalUtils.createOID("analysisTask"),
      taskName:""
    });

    //画布对象
    this.rootStage = {
      owner:this
    } ;

    //初始化基本
    this.initDiyAttForm() ;

    //初始化模型参数表达
    this.initOptionFrom() ;
  }

  /**
   * 初始化动态表单 属性
   */
  initDiyAttForm() {

    //绑定属性
    this.initDataForm({
      formItemList: [],
      title: "",
      data:null,
      type: "",
      isPopWin: false
    }, "diyAttWinForm");
    this.diyAttWinForm = {
      currentNode:null,
      data:null,
      model:null
    };
  }

  /**
   * 模型参数表单
   */
  initOptionFrom(){
    this.initDataForm({
      modelExecutorMemory:'512m', //Executor内存
      modelExecutorCores:'1',  //Executor内核心
      modelExecutorNum:'4', //Executor个数
      modelDriverMemory:'512m'  //Driver内存
    },"options") ;
    this.data.modelOptions = this.initData(this.data.options,{}) ;
  }

  /**
   * 弹出参数设置窗口
   */
  popEditeWin(){
    NormalUtils.copySimpleAtt(this.data.modelOptions,this.data.options) ;
    super.popEditeWin() ;
  }

  /**
   * 保存设置参数
   */
  submit(){
    NormalUtils.copySimpleAtt(this.data.options,this.data.modelOptions) ;
    this.closeWin();
  }

  /**
   *
   */
  changeBack(){
    NormalUtils.changeRouter(PathConst.DA_MINING_MANAGER) ;
  }

  /**
   * 初始化当前舞台
   */
  initDrawStage( data ){

    //重置当前视图
    this.reset() ;

    //初始化
    this.initDraw() ;

    //只接受编辑
    if(!data || !data.id)
      return ;

    //查询详情
    this.data.taskName = data.name ;
    this.query({id:data.id},(result)=>{

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
        task.init( detail ) ;
        this.executeInitDraw( task ) ;
      }
    },()=>{
      this.executeInitDraw( new TaskVO() ) ;
    },AnalysisAPI.queryModelDetail) ;  //点击（编辑）按钮（跳转）----到（算子这块）传的参数
  }

  /**
   * 初始化画布
   */
  initDraw(){
    //画布对象
    if(this.drawView)
      return ;

    this.drawView = new DrawContainer(this.data.drawId,this.rootStage) ;

    //添加组件编辑事件
    this.drawView.addStageEvent("NodeCompEditEvent",(ev)=>{
      this.popCompsEditWin( ev.dataValue ) ;
    });
  }

  /**
   * 执行初始化
   * @param data
   */
  executeInitDraw( data = null ){
    this.drawView.initView(data);
  }

  /**
   * 创建新的任务
   */
  resetModel(){
    this.askMessage("确认清空当时模型吗？",()=>{
      this.drawView.clear() ;
    });
  }

  /**
   * 弹出节点编辑窗口
   * @param node
   */
  popCompsEditWin( node ){
    this.initDiyAttForm() ;
    let _form =  this.data.diyAttWinForm ;
    this.diyAttWinForm.currentNode = node ;
    _form.inputMode = this.getCurrentInput() ;
    _form.formItemList = [] ;
    _form.title = node.name ;
    _form.data = this.initData(node.data ,{});
    _form.type = node.data.type ;
    _form.formItemList = node.getOptions() ;
    _form.isPopWin = true ;
  }

  /**
   * 获得当前输入节点
   */
  getCurrentInput(){
    return this.drawView.getInputDatas() ;
  }

  /**
   * 保存单个算子的配置信息
   */
  saveFormData(formData , formList){
    if(formData)
      this.diyAttWinForm.currentNode.setDataBase(formData) ;
    if(formList)
      this.diyAttWinForm.currentNode.setOptions(formList) ;
  }

  /**
   * 获得保存数据
   * @param valid 是否需要验证
   * @returns {{error}|*}
   */
  getSaveData(valid=true){
    return this.drawView.getSaveData(valid) ;
  }

  /**
   * 获得当前编辑节点
   */
  getCurrentNode(){
    return this.diyAttWinForm.currentNode ;
  }

  /**
   * 保存视图
   */
  saveData(){
    let _data = this.getSaveData() ;
    if(_data===null){
      this.popMessage("尚无保存内容，请编辑后再进行保存！") ;
      return ;
    }
    if(_data.error){
      this.popMessage(_data.error) ;
      return ;
    }

    //添加配置参数
    this.initData(this.data.modelOptions,_data) ;

    console.log(_data);

    let _sourcePath =JSON.parse(sessionStorage.getItem('sourcePath'));
    let _userStopWords = JSON.parse(sessionStorage.getItem('userStopWords'));
    let _userWords = JSON.parse(sessionStorage.getItem('userWords'));
    let _language =JSON.parse(sessionStorage.getItem('language'));

    let fourValue ={
      sourcePath:_sourcePath === null ? '' :_sourcePath,
      userStopWords:_userStopWords === null ? '':_userStopWords,
      userWords:_userWords ===null ? '' :_userWords,
      language:_language === null ? '' : _language
    };
    console.log(fourValue);

    delete _data.modelOriginalParam.steps[0].table;

    Object.assign(_data.modelOriginalParam.steps[0],fourValue);

    let _targetPath =JSON.parse(sessionStorage.getItem('targetPath'));

    let oneValue = {
      targetPath:_targetPath === null ? '' :_targetPath
    };

    Object.assign(_data.modelOriginalParam.steps[2],oneValue);

    console.log(_data);


    if(_data.modelOriginalParam.steps[0].sourcePath === ''){
      this.popMessage("请填写输入路径！") ;
      return
    }else if(_data.modelOriginalParam.steps[0].language === ''){
      this.popMessage("请选择中/英文！") ;
      return
    }else {
      this.query(_data,(result)=>{
        this.popMessage("保存成功！") ;
      },null, AnalysisAPI.saveTaskModelData) ;
    }

  }

  /**
   * 重置视图
   */
  reset(){
    if(this.drawView)
      this.drawView.reset() ;
    this.data.taskName = "";
    this.initOptionFrom() ;
  }

  clear(){
    super.clear() ;
  }
}
