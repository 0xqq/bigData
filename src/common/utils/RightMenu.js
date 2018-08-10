//-----------------------------------------
// title:
// author:zc
// date:
// desc:
//------------------------------------------
export default class RightMenu{

  constructor( ) {
    this.source = null ;
    this.itemfunc = null ;
    this.exdata = null ;
    this.flag = "" ;
    this.content = null ;
    this.items = null ;
    this.outHandler = null ;
  }

  /**
   *
   * @param data
   * @param itemhandler
   * @param exdata
   * @param opts
   */
  init(data, itemhandler, exdata, opts) {

    //清空所有子 和临时变量
    this.destroy();
    if (!data)
      return;

    let _lis = [] ;
    let _liitem = null ;
    let _aln = "left" ;
    let _this = this ;
    let _lbfield = "label";

    this.source = data;
    this.itemfunc = itemhandler;
    this.exdata = exdata;

    if (!this.content)
      this.content = $('<ul class="z-dropdown-right-menu" style="overflow-y:auto;font-size: 14px;" ></ul>');

    //支持 width align rowheight
    if (opts) {
      if (opts.hasOwnProperty("minWidth"))
        this.content.css("min-width", parseFloat(opts.minWidth));
      if (opts.hasOwnProperty("align"))
        _aln = opts.align;
      if(opts.hasOwnProperty("labelField"))
        _lbfield = opts.labelField ;
    }

    //生成菜单
    data.forEach(function (item, index) {
      if (item.hasOwnProperty("type") && item.type === "line")
        _liitem = $('<li class="divider" style="margin:0"></li>');
      else if (!item.hasOwnProperty("visible") || item.visible === true) {

        let _showLb = "" ;
        if(item.hasOwnProperty(_lbfield))
          _showLb = item[_lbfield] ;

        if (item.hasOwnProperty("enabled") && item.enabled === false) {
          _liitem = $('<li style="pointer-events:none;padding:0;text-align:' + _aln + '"> </li>');
          var _lb = $('<a tabindex="-1" style="">' + _showLb + '</a>');
          _liitem.append(_lb);
          _lb.css("opacity", 0.5);//用jquery的不然要写一堆
        }
        else
          _liitem = $('<li style="padding:0;text-align:' + _aln + '"> <a tabindex="-1">' + _showLb + '</a></li>');
        _liitem.on("mousedown", function (event) {
          event.preventDefault();
          event.stopPropagation();
          if (_this.itemfunc){
            try{
              _this.itemfunc(item, exdata,index);
            }catch (e){
              console.trace("rightmenu.click"+e.stack) ;
            }
          }
          _this.hidden();
        });
      }
      _lis.push(_liitem);
      _this.content.append(_liitem);
    });
    this.items = _lis;
  }

  //隐藏菜单
  hidden() {
    if (!this.content)
      return;
    this.content.css({
      display: "none"
    });
    this.content.remove();
    this.flag = "" ;
    $(window).unbind("mousedown", this.outHandler);
    $(window).unbind("resize", this.outHandler);
    this.hasshow = false ;
  }

  //显示菜单
  show(px, py, isset,option) {
    if (!this.content)
      return;

    $('body').append(this.content);
    this.flag = px+":"+py ;

    if(option && option.width)
      this.content.css("width",option.width+"px") ;
    else
      this.content.css("width","") ;

    //如果向下高出 上移动点
    if (!isset) {
      let pxy = RightMenu.getLimitPos(px,py,this.content.width(),this.content.height()) ;
      px = pxy.x;
      py = pxy.y ;
    }

    this.content.css({
      display: "inline-block",
      top: py,
      left: px
    }).fadeIn(200 );
    this.hasshow = true ;

    this.outHandler = (ev)=>{
      this.windowOutClick(ev) ;
    }

    $(window).bind("mousedown",this.outHandler );
    $(window).bind("resize", this.outHandler);
  }

  //外部点击隐藏
  windowOutClick(e) {
    if(!this.hasshow | !this.content)
      return ;
    if(this.hitTestGlobal(e.pageX,e.pageY,this.content,25))
      return ;

    this.hidden();
    return false;
  }

  //销毁
  destroy() {
    if (this.content) {
      this.items.forEach(function (item, index) {
        item.unbind("click");
        item.remove();
      });
      $(this.content).empty();
    }
    this.flag = "" ;
    this.hasshow = false ;
    this.source = null;
    this.itemfunc = null;
    this.exdata = null;
    this.items = null;
    $(window).unbind("mousedown", this.outHandler);
    $(window).unbind("resize", this.outHandler);
  }

  hitTestGlobal(gx, gy, div ,ofx=0,ofy=0) {
    return this.hitTest(gx, gy, this.getDivGlobalRec(div,ofx,ofy));
  }

//点和面碰撞
  hitTest(x, y, box) {
    if (x >= box.x && x <= (box.x + box.w) && y >= box.y && y <= (box.y + box.h))
      return true;
    return false;
  }

  getDivGlobalRec(div,ofx=0,ofy=0) {
    let _off1 = div.offset();
    let _re = {x: 0, y: 0, w: div.width()+ofx, h: div.height()+ofy};
    if (_off1) {
      _re.x = _off1.hasOwnProperty("left") ? _off1.left : 0;
      _re.y = _off1.hasOwnProperty("top") ? _off1.top : 0;
    }
    return _re ;
  }

  static getLimitPos(px,py,ww,hh){
    let _cheight = $(window).height() || $(document).height();
    let  _cwidth = $(window).width();
    if ((py + 20 + hh) > _cheight)
      py = _cheight - hh - 20;
    else if(py<5)
      py = 5 ;
    if ((px + 15 + ww) > _cwidth)
      px = _cwidth - 15 - ww;
    else if(px<5)
      px = 5 ;
    return {x:px,y:py} ;
  }

  /**
   *  显示右键菜单
   *  @event:鼠标事件
   *  @data:菜单列表 [{label:"",type:""}]
   *  @itemhandler:菜单点击回调
   *  @exdata:回调扩展参数
   */
  static showRightMenuEvent(event, data, itemhandler, exdata, opts) {
    if (event.which !== 3)
      return false;
    RightMenu.showRightMenu(event, data, itemhandler, exdata, opts);
    return true;
  }

  /*
   *  显示右键菜单
   *  @event:鼠标事件
   *  @data:菜单列表 [{label:"",type:""}]
   *  @itemhandler:菜单点击回调
   *  @exdata:回调扩展参数
   * */
  static showRightMenu(event, data, itemhandler, exdata, opts) {
    if (event.stopPropagation)
      event.stopPropagation();
    if (event.preventDefault)
      event.preventDefault();
    event.returnValue = false;
    event.cancelBubble = true;

    $("body").bind("contextmenu", function () {
      return false;
    });

    if (!RightMenu._singleMenu )
      RightMenu._singleMenu = new RightMenu();

    RightMenu._singleMenu.init(data, itemhandler, exdata, opts);
    var _x = event.pageX,
      _y = event.pageY,
      _nojust = false;
    if (opts) {
      if (opts.hasOwnProperty("px"))
        _x = parseFloat(opts.px);
      if (opts.hasOwnProperty("py"))
        _y = parseFloat(opts.py);
      if (opts.hasOwnProperty("just"))
        _nojust = opts.just === false ? true : false;
    }
    RightMenu._singleMenu.show(_x, _y, _nojust,opts);
  }

  /*
   *  隐藏右键菜单
   * */
  static hiddenRightMenu(){
    if (RightMenu._singleMenu )
      RightMenu._singleMenu.hidden();
  }

  /*
   *  获得当前菜单的扩展数据
   * */
  static getCurrentExdata(){
    if (RightMenu._singleMenu )
      return RightMenu._singleMenu.exdata ;
    return null ;
  }

}

