//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象 套一层保证内容可以独立使用
// author:zc
// date:
// desc:
//------------------------------------------
import FormPmBase from "@/common/model/FormPmBase";
import NormalUtils from "@/common/utils/NormalUtils";
import DrawContainer from "./create/mode/DrawContainer";
import ProcessAPI from "@/common/service/ProcessAPI";
import TaskVO from "./create/vo/TaskVO";

export default class TaskManagerPM extends FormPmBase{

  constructor( name,id ) {
    super(name,id);
    this.initData({
        drawId:NormalUtils.createOID("taskdraw"),
        isEdit:false,
        taskName:""
    });

    //画布对象
    this.rootStage = {} ;

    //初始化基本
    this.initBaseFrom() ;

    //创建表单
    this.initCreateForm() ;
  }

  /**
   * 基本信息初始化
   */
  initBaseFrom(){

    //基本绑定属性
    this.initData({
      taskName:"",//当前任务名称
      form:{}
    });

    //动态表单基本属性
    this.initDiyAttForm() ;
  }

  /**
   * 初始化动态表单 属性
   */
  initDiyAttForm(){

    //绑定属性
    this.initDataForm({
      title:"",//标题
      formItemList:[],//表单项
      isPopWin:false
    },"diyAttWinForm") ;

    //缓存对象
    this.diyAttWinForm = {
      data: null,
      currentNode:null
    };
  }

  /**
   * 初始化创建表单
   * @param value
   * @returns {{name: string, description: string}}
   */
  initCreateForm(){
    this.initDataForm({
      name:"",
      description:""
    },"form") ;
  }

  /**
   * 初始化当前舞台
   */
  initDrawStage( data ){

    //重置当前视图
    this.reset() ;

    //查询详情
    if(data && data.id){
      this.data.taskName = data.name ;
      this.data.isEdit = true ;
      this.query({id:data.id},(result)=>{

        let _data = this.initData(data,{}) ;
        _data.model = result.model ;

        this.executeInitDraw( new TaskVO(_data) ) ;

      },null,ProcessAPI.queryTaskDetail) ;
    }
    else
      this.executeInitDraw() ;
  }

  /**
   * 执行初始化
   * @param data
   */
  executeInitDraw( data = null ){

    //画布对象
    if(!this.drawView){
      this.drawView = new DrawContainer(this.data.drawId,this.rootStage) ;

      //添加组件编辑事件
      this.drawView.addStageEvent("NodeCompEditEvent",(ev)=>{
        this.popCompsEditWin( ev.dataValue ) ;
      });
    }

    //初始化
    this.drawView.initView(data);
  }

  /**
   * 创建新的任务
   */
  addNewTask(){
    if(this.drawView.hasData()){
       this.askMessage("当前任务尚未保存，是否继续添加?",()=>{
         this.drawView.clear() ;
         this.data.taskName = "";
       });
       return ;
    }
    this.drawView.clear() ;
    this.data.taskName = "";
    this.data.isEdit = false;
  }

  /**
   * 弹出节点编辑窗口
   * @param node
   */
  popCompsEditWin( node ){
    let _form =  this.data.diyAttWinForm ;
    this.diyAttWinForm.currentNode = node ;
    _form.formItemList = [] ;
    _form.title = node.name ;
    _form.formItemList = node.getOptions() ;
    _form.isPopWin = true ;
  }

  /**
   * 保存单个算子的配置信息
   */
  saveFormListData(formdata){
    this.diyAttWinForm.currentNode.setOptions(formdata) ;
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

    //弹出保存窗口
    if(!_data.id)
      this.popCreateWin() ;
    else
      this.executeSubmit(_data) ;
  }

  /**
   * 创建窗口
   */
  popCreateWin(){
    this.initCreateForm() ;
    super.popCreateWin() ;
  }

  /**
   * 弹出修改窗口
   */
  popEditeWin(){
    let task = this.getCurrentTask() ;
    if(!task){
      this.popMessage("当前任务为空！");
      return ;
    }
    super.popEditeWin( task) ;
    this.initCreateForm() ;
    NormalUtils.copySimpleAtt(task,this.data.form) ;
  }

  /**
   * 创建保存
   */
  submit(){
    //只编辑当前数据 不保存 点保存再一起保存
    if(this.data.isPopUpdate){
      this.drawView.setCreateData(this.data.form) ;
      this.data.taskName = this.drawView.data.name ;
      this.closeWin();
      return ;
    }
    this.drawView.setCreateData(this.data.form) ;
    let _data = this.drawView.getSaveData() ;
    _data.type = "2" ;
    this.executeSubmit(_data) ;
  }

  /**
   * 执行保存
   * @param data
   */
  executeSubmit( data ){
    this.query(data,(result)=>{
      if(result.data && result.data.id){
        this.popMessage("保存成功！") ;
        this.drawView.data.id = result.data.id ;
        this.data.taskName = this.drawView.data.name ;
        this.data.isEdit = true ;
        this.closeWin() ;
      }
      else{
        this.popMessage("保存失败，请重新尝试！") ;
      }
    },null, ProcessAPI.saveTask) ;
  }

  /**
   * 获得当前任务
   */
  getCurrentTask(){
    if(this.drawView)
      return this.drawView.data ;
    return null ;
  }

  /**
   * 重置视图
   */
  reset(){
    this.initBaseFrom() ;
    if(this.drawView)
      this.drawView.reset() ;
    this.data.isEdit = false ;
    this.data.taskName = "";
    this.currentTask = null ;
  }

  clear(){
    super.clear() ;
  }
}
