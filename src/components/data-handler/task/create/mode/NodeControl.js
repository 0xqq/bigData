//------------------------------------------------------------------
//title: 节点基类
//author: zc
//date:
//desc:
//------------------------------------------------------------------
import DrawBase from "./DrawBase" ;
import DragUtils from "@/common/utils/DragUtils";
import DrawLine from "./DrawLine";

export default class NodeControl extends DrawBase {

  constructor(view = null) {
    super(view);
    this.owner = view ;
    this.drawView = view.view ;
    this.data = null ;
    this.node = null ;
    this.initView();

    this.widthV = 70 ;
    this.startP = null ;
    this.isInput = false ;

    this.isDraging = false ;
    this.dragNode = null ;

    //临时绘制对象
    this.drawTempLine = new DrawLine(view);
  }

  /**
   * 初始化视图
   * @param data
   * @param type
   */
  initView() {
    this.createView();
    this.refresh();
    this.inited = true ;

    //派发编辑事件
    this.editBtn.bind("click",()=>{
      this.hide();
      this.disStageEvent("NodeCompEditEvent",this.node) ;
    }) ;

    this.delBtn.bind("click",()=>{
      this.hide();
      this.disStageEvent("NodeCompDelEvent",this.node) ;
    }) ;
  }

  /**
   * 重置视图
   */
  reset(){
    this.hide();
    this.startP = null ;
    this.isInput = false ;
    this.isDraging = false ;
    this.dragNode = null ;

    this.data = null ;
    this.node = null ;
    if(this.drawTempLine )
        this.drawTempLine.clear() ;
  }

  /**
   * 创建视图
   */
  createView(){
    this.view = $("<div class='tj-shadow' style='z-index:4000;width:70px;height:33px;position:absolute;color:#3d6380'>" +
                    '<svg width="72" height="33" version="1.1">'+
                    '<path d="M36,0 L44,8 L28,8 Z" fill="#3d6380" stroke-width="0"></path>'+
                    '<rect x="0" y="8" rx="5" ry="5" width="72" height="25" stroke-width="2" stroke="#3d6380" fill="#ffffff" ></rect>'+
                    '</svg>'+
                "</div>") ;
    this.editBtn = $('<div class="tj-control-font-btn"><i style="font-size:25px;" class="iconfont tj-bj"></i></div>') ;
    this.delBtn = $('<div class="tj-control-font-btn"><i style="font-size:25px;" class="el-icon-delete"></i></div>') ;
    this.inputBtn = this.drawControlBtn();
    this.outBtn = this.drawControlBtn() ;

    this.inputBtn.css("left","5px") ;
    this.outBtn.css("left","49px") ;

    this.view.append(this.editBtn) ;
    this.view.append(this.inputBtn) ;
    this.view.append(this.outBtn);
    this.view.hide() ;
  }

  drawControlBtn( ){
    return $('<div class="tj-node-cbtn" ><i style="font-size:18px;" class="iconfont tj-xiayiyeqianjinchakangengduo-yuankuang"></i></div>') ;
  }

  initDrag(){
    this.dragControl0 = new DragUtils(this.inputBtn,null,
      (ev)=> { this.startHandler(ev,true);  },
      (ev,x,y)=> { this.moveHandler(ev,x,y,true); },
      (ev)=> {  this.endHandler(ev,true); },
      null,0) ;
    this.dragControl1 = new DragUtils(this.outBtn,null,
      (ev)=> { this.startHandler(ev,false);  },
      (ev,x,y)=> { this.moveHandler(ev,x,y,false); },
      (ev)=> {  this.endHandler(ev,false); },
      null,0) ;
  }

  startHandler(ev,isint){
    if(this.isDraging)
      return ;

    this.setIsDragging(true) ;
    this.isInput = isint ;
    this.dragNode = this.node ;
    this.startP = this.dragNode.getCenterPostion() ;
    this.drawTempLine.clear() ;

    //隐藏控制窗口
    this.view.hide() ;
  }

  moveHandler(ev,x,y){
    if(!this.isDraging)
      return ;

    let _p = NormalUtils.globalToLocal(x,y,this.owner.view) ;
    if(this.isInput)
       this.drawTempLine.render( _p,this.startP) ;
    else
      this.drawTempLine.render(this.startP, _p) ;
  }

  endHandler(ev){
    if(!this.isDraging)
      return ;
    let _node = this.owner.getHitNode(ev.pageX,ev.pageY,this.dragNode) ;

    //如果有 链接 添加对象 否则清空
    if(_node){
      if(this.isInput)
        this.owner.addLine(_node,this.dragNode) ;
      else
        this.owner.addLine(this.dragNode,_node) ;
    }
    this.drawTempLine.clear() ;
    this.setIsDragging(false) ;
    this.hide();
  }

  setIsDragging(value){
    this.isDraging = value ;
    this.owner.isDrawing = value ;
  }


  /**
   * 设置节点
   */
  show( node ){
    if( this.isDraging)
      return ;
    this.node = node ;
    this.showView(node) ;
    this.initDrag() ;
  }

  hide(){
    this.view.hide();
  }

  /**
   * 显示视图
   */
  showView(node){
    if(!node ||  this.isDraging)
      return ;

    let pos = node.view.position() ;
    let nodeWidth = node.view.width() ;
    this.view.css({
      "left": (pos.left + (nodeWidth-this.widthV)/2 )+"px" ,
      "top": ( (pos.top + node.view.height()-1 )+"px" )
    });
    this.view.show() ;
  }


  /**
   * 刷新
   */
  refresh(){

  }


}
