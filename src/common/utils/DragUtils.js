export default class DragUtils{
   constructor( owner = null,tarager=null,start=null,move=null,end=null,down=null,type=1 ){
     this.owner = owner ;
     this.dragView = tarager ;

     this.downFlag = false ;
     this.moveFlag = false;
     this._px = 0 ;
     this._py = 0 ;
     this._downHandler = null ;
     this.dragType = type ;// 0鼠标跟随 1移动

     this.dragRangle = null ;
     this.dragDownHandler = down ;
     this.startDragHandler = start ;
     this.draggIngHandler = move;
     this.dragEndHandler = end ;
     this.enabled = true ;
     if(this.owner)
       this.init(this.owner) ;
   }

  /**
   * 初始化
   * @param view
   */
   init(){
     if(!this.owner)
       return ;
     this._downHandler = (ev)=>{
       if (ev.which === 3)
         return;
       if(! this.enabled)
         return ;
       this.viewDownHandler(ev) ;
     }
     this.owner.bind("mousedown",this._downHandler) ;
   }

  /**
   * 视图鼠标按下处理
   * @param ev
   */
  viewDownHandler( ev ){
    this.downFlag = true ;
    this._px = ev.pageX ;
    this._py = ev.pageY ;
    if(!this._moveHandler)
      this._moveHandler = (ev)=>{
        this.dragMoveHandler(ev) ;
      }
    if(!this._upHandler)
      this._upHandler = (ev)=>{
        this.dragUpHandler(ev) ;
      }
    $(document).bind("mousemove",this._moveHandler) ;
    $(document).bind("mouseup",this._upHandler) ;

    if(this.dragDownHandler)
      this.dragDownHandler(ev) ;
  }

  /**
   * 拖动处理
   * @param ev
   */
  dragMoveHandler(ev){
    if(!this.downFlag)
      return ;

    //开始拖动
    if(!this.moveFlag){
      if(this.startDragHandler)
        this.startDragHandler(ev) ;
    }

    this.moveFlag = true ;
    let x = ev.pageX  ;
    let y = ev.pageY  ;
    let _dx = x - this._px ;
    let _dy = y - this._py ;
    let _limitxy = null ;

    //移动
    if(this.dragView){
      if(this.dragType===0){
        x = x-this.dragView.width()/2 ;
        y = y-this.dragView.height()/2 ;
        this.dragView.css({left:x+"px",top:y+"px"}) ;
      }
      else{
        if(this.dragView){
          let pos = this.dragView.position() ;
          x = pos.left + _dx ;
          y = pos.top + _dy ;
          //先支持本地判断 不转换
          if(this.dragRangle){
            //如果鼠标超出结束
            if(!NormalUtils.hitTestGlobal(ev.pageX,ev.pageY,this.dragRangle,true) ){
              this.dragUpHandler(null);
              return ;
            }

            //如果元素超出回调
            _limitxy = NormalUtils.getLimitPos(x,y,this.dragView,this.dragRangle,true) ;
             x = _limitxy.x ;
             y = _limitxy.y ;
          }
          this.dragView.css({left:x+"px",top:y+"px"}) ;
        }
      }
    }
    this._px = ev.pageX ;
    this._py = ev.pageY ;

    //处理
    if(this.draggIngHandler)
      this.draggIngHandler(ev,x,y,_dx,_dy) ;
  }

  /**
   * 鼠标抬起处理
   * @param ev
   */
  dragUpHandler(ev){
    if(!this.downFlag) {
      this.clearDragCatch() ;
      return ;
    }
    if(this.dragEndHandler)
      this.dragEndHandler(ev);
    this.clearDragCatch() ;
  }

  dragLimit(){
    if(!this.dragRangle)
      return ;

  }

  /**
   * 清除拖动缓存数据
   **/
  clearDragCatch() {
    this.downFlag = false ;
    this.moveFlag = false ;
    if (this._moveHandler)
      $(document).unbind("onmousemove", this._moveHandler);
    if (this._upHandler)
      $(document).unbind("onmouseup", this._upHandler);
  }

  /**
   * 销毁
   */
  destroy(){
    this.clearDragCatch() ;
    if(this.owner && this._downHandler)
      this.owner.unbind("mousedown",this._downHandler) ;
    this.owner = null ;
    this.dragDownHandler = null ;
    this.startDragHandler = null ;
    this.draggIngHandler = null;
    this.dragEndHandler = null ;
  }

}
