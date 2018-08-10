//------------------------------------------------------------------
//title: 节点
//author: zc
//date:
//desc: 临时DIV拼 没图标 后改成SVG纯绘制
//------------------------------------------------------------------
import DrawBase from "./DrawBase" ;
import DragUtils from "@/common/utils/DragUtils";
import RightMenu from "@/common/utils/RightMenu";

export default class DrawNode extends DrawBase {

  constructor(view = null,data=null,type=null,drag=false) {
    super(view?view.root:view);
    if(data && data.idl)
      this.id = this.idl = data.idl ;
    this.owner = view ;
    this._data = data ;
    this.name = data?data.name:"";
    this.label = data?data.label:"";
    this.type = type;
    this.dragEnabled = drag ;
    this._selected = false ;
    this._cbtnW = 16 ;
    this.iconSize = 37 ;//都改成动态绘制
    this.links = new Map() ;

    this.widthV = 105 ;
    this.heightV = 28 ;
    this.isDraging = false ;
    this.editEnable = true ;
    this.initView(this.data );
  }

  /**
   * 初始化视图
   * @param data
   * @param type
   */
  initView( data ) {
    if(data){

      console.log(data);

      this.data = data ;
      this.name = data.name ;//name是必选项
      let hData = data.name;

      console.log(hData);

      sessionStorage.setItem('bigD',JSON.stringify(hData));

      this.label = data.label||data.name ;
    }
    this.editEnable = true ;
    if(this.data.type === "TableOutput")
      this.editEnable = false ;
    this.createView();
    this.refresh();
    this.initDrag();
    this.inited = true ;
    this.view.bind("dblclick",(ev)=>{
      if( this.editEnable)
      this.disStageEvent("NodeCompEditEvent",this) ;
    });
    this.view.bind("mouseup",(ev)=>{
      if (ev.which !== 3)
        return;

      if(!DrawNode.rightMenuList)
        DrawNode.rightMenuList = [
          {label:"编辑",value:"set"},
          {label:"删除",value:"delete"},
          {label:"复制",value:"copy",enabled:false},
          {label:"粘贴",value:"jion",enabled:false}
        ] ;

      RightMenu.showRightMenu(ev,DrawNode.rightMenuList,(item)=>{
         if(item.value === "delete"){
           this.owner.removeNode(this,true) ;
         }
      }) ;
    }) ;
  }


  /**
   * 单独设置数据
   * @param data
   */
  set data(data){
    this._data = data ;
    this.initDataBase(data) ;
    this.refreshLabel() ;
    this.initPosition() ;
  }

  addLine( line ){
    this.links.set(line.id,line) ;
  }

  removeLine(line){
    if(this.links.has(line.id))
      this.links.delete(line.id) ;
  }

  getLineArr(){
    if(this.links)
      return this.links.values() ;
    return [] ;
  }

  getLineArr2(){
    if(this.links)
      return Array.from(this.links.values()) ;
    return [] ;
  }

  /**
   * 初始化拖动
   */
  setDragEnabled( enabled ){
    this.dragEnabled = enabled ;
    this.initDrag() ;
  }

  /**
   * 初始化拖动
   */
  initDrag(){
    if(this.drag)
      this.drag.enabled = this.dragEnabled ;
    if(!this.dragEnabled)
      return ;
    if(!this.drag){
      this.drag = new DragUtils(this.view,this.view,
        (ev)=>{
           this.setIsDragging(true);
        } ,
        (ev,x,y,dx,dy)=>{
          this.x = x ;
          this.y = y ;
          this.refreshLinks() ;
          this.data.refreshPosition(x,y) ;
        },
        ()=>{
          this.setIsDragging(false) ;
        }
      );
      this.drag.dragRangle = this.owner.view ;
    }
  }
  /**
   * 单独刷新位置
   */
  refreshPosition() {
    super.refreshPosition();
    if (this.data)
      this.data.refreshPosition(this.x, this.y);
  }

  refreshLinks(){
    if(!this.links)
      return ;
    this.links.forEach((line)=>{
      line.refresh() ;
    })
  }

  /**
   * 绘制视图
   */
  createView() {
    if (this.view)
      return;

    this.view = $("<div class='tj-dh-node tj-shadow' style='user-select: none;' ></div>") ;
    this.iconBox = $("<div class='tj-dh-icon'></div>");
    this.iconView = $("<i class='iconfont tj-msnui-running' style='font-size:23px;' ></i>");
    this.iconBox.append(this.iconView);
    this.iconView.attr("class",  this.getNodeIcon(this.data ));
    this.labelView = $("<div class='tj-dh-drag-lb'>"+this.name+"</div>") ;

    this.view.append(this.iconBox) ;
    this.view.append(this.labelView);
    this.view.append($("<div style='left:0;right:0;bottom:0;top:0;position:absolute;cursor:pointer;background-color:rgba(0,0,0,0)'></div>"))
  }

  /**
   * 解析数据
   * @param value
   */
  initDataBase(value){
    if(!value)
      return ;
    this.name = value.name ;

  }

  /**
   * 解析位置
   */
  initPosition(){
    if(!this.data)
      return ;
    let _ps = this.data.getPosition() ;
    this.x = _ps.x ;
    this.y = _ps.y ;
    if(this.inited)
    this.refreshPosition();
  }

  get data(){
    return this._data ;
  }

  set selected(value){
    this._selected = value ;
    if(this.inited)
      this.refresh() ;
  }

  get selected(){
    return this._selected ;
  }

  /**
   * 设置数据基本参数
   */
  setDataBase( data ){
    this.data.refreshBaseData( data ) ;
  }

  /**
   * 设置表单项
   * @param options
   */
  setOptions(options){
    this.data.refreshOptions(options) ;
  }

  /**
   * 获得配置项
   */
  getOptions(){
    return this.data.getOptions();
  }

  /**
   * 获得保存数据{ options:{dfdf:"",}}
   */
  getSaveData( nodevo ){
    if(nodevo)
      return nodevo.getSaveData() ;
    return this.data.getSaveData() ;
  }

  setIsDragging(value){
    this.isDraging = value ;
    this.owner.isDragging = value ;
    if(value)
      this.owner.nodeControl.hide();
  }

  /**
   * 解析保存的数据
   */
  initData(){

  }

  /**
   * 获得图标中心位置 temp 都需要改成 svg绘制 保证那些文字选中不影响
   */
  getCenterPostion() {
    return {x: this.x + this.widthV/2, y: this.y + this.heightV/2};
  }

  /**
   * 刷新
   */
  refresh(){

    //刷新位置
    this.refreshPosition();

    //刷新标签
    this.refreshLabel() ;

    //刷新图标
    if(this.iconView)
      this.iconView.attr("class",  this.getNodeIcon(this.data ));
  }

  /**
   * 刷新标签位置
   */
  refreshLabel(){
    if( this.labelView){
      this.labelView.text( this.label ) ;
      this.view.attr("title",this.label) ;

      if(this._selected)
        this.view.css("border","3px solid #3d6380") ;
      else
        this.view.css("border","2px solid #3d6380") ;
    }
  }

  /**
   * 显示控制器
   * @param showcontrol
   */
  setControlState( showcontrol ){
  }

  /**
   * 解析图标
   * @param data
   * @returns {string}
   */
  getNodeIcon(data){
    let icon = "tj-msnui-running" ;
    if(data){
      if(data.icon)
        icon = data.icon ;
      else if(data.type === "TableInput")
        icon = "tj-biaoge1" ;
      else if(data.type === "TableOutput")
        icon = "tj-shujuku";
      else if(data.type === "Operator")
        icon = "tj-msnui-running";
    }
    return "iconfont "+icon ;
  }

  clear(){
    if(this.view)
      this.view.remove() ;
  }


  /**
   * 销毁
   */
  destroy(){
    super.destroy() ;
    if(this.links)
      this.links.clear() ;
  }

}
