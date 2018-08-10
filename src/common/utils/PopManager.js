/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
export default class PopManager {

  constructor() {
    this.layer = null;
    this.pops = [];
    this.popMap = {};
  }

  //弹出框
  createView() {
    if (!this.layer)
      this.layer = $("<div style='position: fixed;left:0px;top:0px;right:0;bottom:0;z-index:9999999;pointer-events:none;overflow:hidden;' ></div>");
    $("body").append(this.layer);
    var _this = this ;
    $(window).on("resize", () => {
      _this.resizeLayer(true);
    });
  }

  /**
   * 隐藏视图
   */
  hiddenView() {
    if (!this.layer)
      return;
    if (this.pops.length === 0)
      this.layer.hide();
  }

  /**
   * 创建蒙版
   * @returns {*|jQuery|HTMLElement}
   */
  createMask() {
    var _mask = $("<div style='width:100%;height:100%;position:absolute;pointer-events:auto;'></div>");
    return _mask;
  }

  /**
   * 弹出一个DIV
   * @param div
   * @param x
   * @param y
   * @param opt
   */
  popDiv(div, x, y, opt) {
    if (!div)
      return;
    div.hide();
    div.css("position", "absolute")
      .css("z-index", 999999);
    $('body').append(div);

    var _hh = div.height(),
      _ww = div.width(),
      _left = 0 || x,
      _top = 0 || y;

    if (opt && opt.limit) {
      var _cheight = $(window).height(),
        _cwidth = $(window).width();
      if (_cheight === 0)
        _cheight = $(document).height();
      if (_cwidth === 0)
        _cwidth = $(document).width();
      if ((_top + _hh) > _cheight)
        _top = _cheight - _hh;
      if ((_left + _ww) > _cwidth)
        _left = _cwidth - _ww;
    }
    div.css("left", _left + "px")
      .css("top", _top + "px");
    div.show();
  };

  /**
   * 弹出html
   * @param html
   * @param title
   * @param option
   */
  popHtmlWin(html, title, option) {
    //100% 100px
    var _ic = true,
      _md = true,
      _max = false,
      _padd = 5,
      _self = true,
      _full = false,
      _win = null,
      _cont = null;
    if (option) {
      if (option.center === false)
        _ic = false;
      if (option.max === true)
        _max = true;
      if (option.mode === false)
        _md = false;
      if (option.padding === false)
        _padd = 0;
      if (option.hasOwnProperty("full"))
        _full = option.full;
    }
    if (_full) {
      _win = $('<div style="pointer-events:auto;width:100%;height:100%;position:absolute;"></div>');
      _cont = $('<div style="top:0;left:0;right:0;overflow: hidden;"></div>');
      _cont.append(html);
      _win.append(_cont);
      _win.append($('<div class="trx-win-blue-con"><div class="trx-win-blue-cl"title="退出"></div></div>'));
    }
    else {
      _win = $('<div class="trx-win-blue trx-win-blue-hide" style="pointer-events:auto;">' +
        '<div class="trx-win-blue-hd" >' +
        '<span class="trx-win-blue-tl" >' + title + '</span>' +
        '<i class="iconfont tj-guanbi1 trx-win-blue-cl" title="退出"></i>' +
        '</div>' +
        '</div>');
      _cont = $('<div class="trx-win-blue-by" style="padding:' + _padd + 'px;"></div>');
      _cont.append(html);
      _win.append(_cont);
    }
    if (option) {
      if (option.width)
        _win.css("width", option.width);
      if (option.height)
        _win.css("height", option.height);
      if (option.x)
        _win.css("left", option.x);
      if (option.y)
        _win.css("top", option.y);
    }
    var _clos = _win.find(".trx-win-blue-cl");
    _clos.on("click", function () {
      _win.trigger({type: "close"});
    });
    return this.popwin(_win, _ic, _md, _max, option);
  };

  /**
   * 弹出一个窗口
   * @param win
   * @param center
   * @param model
   * @param maxsize
   * @param option
   * @returns {*}
   */
  popwin(win, center, model, maxsize, option) {
    //字符 直接转成对象
    var _win = win;
    if (typeof win === "string")
      _win = $(win);
    if (!_win)
      return _win;
    if (model === undefined)
      model = true;
    _win.hide();
    if (!this.layer)
      this.createView();

    var _mask = null;
    if (model === true) {
      _mask = this.createMask();
      _mask.append(_win);
      this.layer.append(_mask);
    }
    else
      this.layer.append(_win);
    this.pops.push([_win, _mask, center, maxsize]);
    this.resizeLayer();

    this.layer.show();
    var _this = this ;
    _win.bind("close", function (e) {
      if (e.target)
        _this.removewin(e.target,option);
      if (option.close)
        option.close();
    });
    _win.show();

    if (maxsize === true)
      _win.css({"position": "absolute", left: "0px", top: "0px", width: "100%", height: "100%"});
    if (center === true)
      this.setWinCenter(_win);

    if (_win.hasClass("trx-win-blue"))
      _win.addClass("trx-win-blue-show");
    return _win;
  };

  /**
   * 尺寸变化
   * @param rwin
   */
  resizeLayer(rwin) {
    if (!this.layer)
      return;
    // var _w = document.body.clientWidth;
    // var _h = document.body.clientHeight;
    // this.layer.css("width", _w)
    //   .css("height", _h);

    if (rwin === true && this.pops && this.pops.length > 0) {
      this.pops.forEach((winarr) => {
        if (winarr[2] === true)
          this.setWinCenter(winarr[0]);
      })
    }
  };

  /**
   * 中心对齐
   * @param win
   */
  setWinCenter(win) {
    var _w = this.layer.width(),
      _h = this.layer.height(),
      _ww = win.width(),
      _wh = win.height();
    win.css({"position": "absolute", left: ((_w - _ww) / 2) + "px", top: ((_h - _wh) / 2) + "px"});
  };

  /**
   * 是否已有窗体
   * @param win
   * @returns {boolean}
   */
  hasWin(win) {
    for (var i = 0, _len = this.pops.length; i < _len; i++) {
      var item = this.pops[i];
      if (item.data == win)
        return true;
    }
    return false;
  }

  /**
   * 删除窗体
   * @param win
   * @param options
   */
  removewin(win,options) {
    if (!win)
      return;
    if (win[0])
      win = win[0];
    for (var i = 0, _len = this.pops.length; i < _len; i++) {
      var item = this.pops[i];
      var winn = item[0];
      if (winn[0])
        winn = winn[0];
      if (winn === win) {
        item[0].unbind("close");
        if(options && options.closeHandler)
          options.closeHandler() ;
        item[0].remove();
        if (item[1])
          item[1].remove();
        this.pops.splice(i, 1);
        break;
      }
    }
    if (this.pops.length === 0)
      this.hiddenView();
  };

  /**
   * 本地弹出窗口
   * @param html
   * @param title
   * @param option
   */
  static popStaticWin(html, title, option){
    return PopManager.getInstance().popHtmlWin(html, title, option) ;
  }

  static getInstance(){
    if(!PopManager._instance)
      PopManager._instance = new PopManager() ;
    return PopManager._instance ;
  }
}
