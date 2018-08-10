/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import DragUtils from "@/common/utils/DragUtils";
export default class DragTable {

    constructor(data,owner,pview) {
      this.data = data ;
      this.id = data.id ;
      this.owner = owner ;
      this.pview = pview ;
      this.links = new Map() ;

      this.widthV = 105 ;
      this.heightV = 28 ;
      this.isDraging = false ;

      this.itemOverHandler = null ;
      this.itemOuterHandler = null ;
      this.itemMoveHandler = null ;
      this.drawDot = null ;//
      this.fields = [] ;
      this.initView( );
    }

    initView(){
      this.createTableView( this.data ) ;
      this.initDrag();
    }


  /**
   * 创建视图
   * @param data  全手写  越乱越好
   */
  createTableView(data){
    let dotw = 25 ;
    let doth = 25 ;

    this.fields = [] ;
    this.view = $('<div id="'+data.id+'" style="font-size:12px;position:absolute;width:120px;border:1px solid #646a7d;min-height:50px;"></div>') ;
    let layout = $('<div class="tj-ver-group" style="width:100%;"></div>');
    this.header = $('<div id="'+data.id+'_header" ' +
      'style="color:#fff;position:relative;cursor:pointer;flex:none;width:100%;' +
      'height:25px;color:#fff;line-height:25px;vertical-align: middle;' +
      'background-color:#646a7d;color:#fff;font-size:13px;">' +
      '<div style="position:absolute;left:0;right:30px;text-align: center;">'+this.data.label+'</div>' +
      '</div>');
    this.closeBtn = $('<div style="cursor:pointer;position:absolute;right:10px;height:25px;"><i class="iconfont tj-guanbi1" style="cursor: pointer;" ></i></div>');
    this.header.append(this.closeBtn) ;
    layout.append( this.header) ;
    for(let item of data.children){
      let itemView = $('<div ' +
        'id="'+data.id+'_'+item.id+'" ' +
        'title="拖动链接表关系" ' +
        'style="background-color:#fff;' +
        'cursor:pointer;' +
        'position:relative;' +
        'flex:none;' +
        'width:100%;' +
        'height:25px;' +
        'border-bottom:1px solid #f3f3f4;' +
        'box-sizing:border-box;">' +
        '<div style="position:absolute;line-height:25px;vertical-align: middle;padding-left:5px;">'+item.label+'</div>' +
        '<div style="position:absolute;top:0;bottom:0;left:0;right:0;cursor: pointer;"></div>' +
        '</div>') ;
      itemView.data("field",data.label +"."+item.id) ;
      itemView.bind("mouseenter",(ev)=>{
        let ps = NormalUtils.globalToLocal(ev.pageX,ev.pageY,this.pview) ;
        this.drawDot.css("left",(ps.x-10)+"px").css("top",(ps.y-10)+"px");
        this.drawDot.show() ;
        this.itemOverHandler(itemView,this);
      }) ;
      itemView.bind("mousemove",(ev)=>{
        this.drawDot.show() ;
        let ps = NormalUtils.globalToLocal(ev.pageX,ev.pageY,this.pview) ;
        this.drawDot.css("left",(ps.x-10)+"px").css("top",(ps.y-10)+"px");
        this.itemMoveHandler(itemView,this) ;
      }) ;
      itemView.bind("mouseleave",(ev)=>{
        if (this.drawDot && NormalUtils.hitTestGlobal(ev.pageX, ev.pageY , this.drawDot))
          return;
        this.drawDot.hide() ;
        this.itemOuterHandler(itemView);
      }) ;
      layout.append(itemView) ;
      this.fields.push(itemView) ;
    }
    this.view.append(layout) ;

    this.closeBtn.bind("click",()=>{
      this.owner.removeTable(this) ;
    })
  }

  /**
   * 初始化拖动
   */
  initDrag(){
    if(!this.drag){
      this.drag = new DragUtils(this.header,this.view,
        (ev)=>{
          this.isDraging = true ;
        } ,
        (ev,x,y,dx,dy)=>{
          this.x = x ;
          this.y = y ;
          this.refreshLinks() ;
        },
        ()=>{
          this.isDraging = false ;
        }
      );
      this.drag.dragRangle = this.pview ;
    }
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

  refreshLinks(){
    if(!this.links)
      return ;
    this.links.forEach((line)=>{
      line.refresh() ;
    })
  }

  getHitField(px,py){
    if(!this.fields)
      return null ;

    let re = null ;
    for(let item of this.fields ){
      if (NormalUtils.hitTestGlobal(px, py, item)) {
        re = item ;
        break ;
      }
    }
    return re ;
  }

  clear(){
    if(this.view)
      this.view.remove() ;
    this.data = null ;
    this.owner = null ;
    this.pview = null ;
    this.links = null;
    this.itemOverHandler = null ;
    this.itemOuterHandler = null ;
    this.drawDot = null ;
    this.fields = null ;
  }

}
