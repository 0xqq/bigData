//------------------------------------------------------------------
//title: 节点基类
//author: zc
//date:
//desc:
//------------------------------------------------------------------

import EventDispatcher from "@/common/event/EventDispatcher";

export default class DrawBase {

  constructor(root=null) {
     this._eventArr = [] ;
     this.root = root ;
     if(root && root.hasOwnProperty("root"))
      this.root = root.root ;
     this.owner = root ;
     this.id = NormalUtils.createOID("drawView") ;
     this.idl = this.id ;//冗余一个 不修改以前逻辑
     this.view = null ;
     this.data = null ;
     this.x = NaN ;
     this.y = NaN ;
     this.widthV = NaN ;
     this.heightV = NaN ;
     this.inited = false ;

     //简单写几个变量 不写静态了"TableOutput" ;
     this.TYPE_OPERATOR = "Operator" ;
     this.TYPE_INPUT = "TableInput" ;
     this.TYPE_OUTPUT = "TableOutput" ;
     this.JQ_GROUP = "60046c033fe1418eb908af9cd19d56dc" ;//机器学习分组ID 后台确认此ID永远不会变
  }

  popMessage(str){
    if(this.root && this.root.owner)
      this.root.owner.popMessage(str) ;
  }

  /**
   * 添加内部事件
   * @param type
   * @param handler
   * @param owner
   * @returns {{type: *, func: function(*=)}}
   */
  addStageEvent(type,handler,ownerv,id){
    let _func = (ev)=>{
      handler(ev) ;
    };
    if(!ownerv)
      ownerv = this.root ;
    if(!ownerv)
      return ;
    $(ownerv).bind(type, handler );

    let _item = {type:type,func:_func,id:id } ;
    this._eventArr.push(_item) ;
    return _item ;
  }

  /**
   * 派发舞台事件
   */
  disStageEvent( type ,data){
    $(this.root ).trigger({type:type,dataValue:data} );
  }

  /**
   * 设置位置
   * @param pxy{x: ,y:}
   */
  setPosition(pxy,py){
    if(py!==undefined){
      this.x = pxy ;
      this.y = py ;
    }
    else{
      this.x = pxy.x ;
      this.y = pxy.y ;
    }
    this.refreshPosition() ;
  }

  /**
   * 单独刷新位置
   */
  refreshPosition(){
    if(!isNaN(this.y) && !isNaN(this.x))
         this.view.css({top:this.y+"px",left:this.x+"px"}) ;
  }

  /**
   * 实际宽度
   * @returns {number | *}
   */
  width(){
    if(this.view)
    return this.view.width();
    return this.widthV ;
  }

  /**
   * 实际高度
   * @returns {number | *}
   */
  height(){
    if(this.view)
      return this.view.height();
    return this.heightV ;
  }

  /**
   * 清除绑定的内部事件
   */
  clearEvents(){
  }

  /**
   * 销毁
   */
  destroy(){
    this.clearEvents() ;
    if(this.view)
      this.view.remove() ;
  }

  enabledView(view , flag ){
    if(!view)
      return ;
    view.css("opacity",flag?1:.5)
      .css("pointer-events",flag?"auto":"none") ;
  }
}
