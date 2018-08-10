/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import DragUtils from "@/common/utils/DragUtils";
import "@/common/comps/libs/jquery-ui-fix.min";
import SvgDom from "@/common/utils/SvgDom" ;
import RightMenu from "@/common/utils/RightMenu" ;

export default class LinkLine {

  constructor(draw,owner,pview,fromObject=null,toObject=null) {//{tableId:"",fieldId:"",data:}
    this.id = NormalUtils.createOID("line") ;
    this.lineCanvas = draw;
    this.owner = owner ;
    this.pview = pview ;
    this.fromObject = fromObject;
    this.toObject = toObject;
    this.initView();
  }

  /**
   * 初始化视图
   */
  initView() {
    this.line = SvgDom.createSvg("path")
      .attr("z-index", 100)
      .attr("fill", "none")
      .attr("stroke-width", 2)       //设定宽度
      .attr("stroke", "#3d6380")
      .attr("opacity", 0)
      .attr("marker-mid", "url(#arrow)")
      .css("cursor", "pointer");
    this.line.bind("mouseup", (ev) => {
      if (ev.which !== 3)
        return;
      RightMenu.showRightMenu(ev, [{label: "删除", value: "delete"}], (item) => {
        if (item.value === "delete") {
          this.owner.removeLine(this, false);
        }
      });
    });
    this.lineCanvas.append(this.line);
    this.refresh() ;
  }


  refresh() {
    if (!this.pview || !this.fromObject || !this.toObject)
      return;

    let div = NormalUtils.getDivGlobalRec(this.fromObject.view) ;
    let div2 = NormalUtils.getDivGlobalRec(this.toObject.view) ;
    let sp = NormalUtils.globalToLocal(div.x ,div.y+div.h/2,this.pview) ;
    let ep = NormalUtils.globalToLocal(div2.x ,div2.y+div2.h/2,this.pview) ;
    if(sp.x+div.w <ep.x)
      sp.x = sp.x + div.w ;
    else if(sp.x>ep.x)
      ep.x = ep.x +div2.w ;

    this.render(sp, ep);
  }

  render(d0, d1 ,w=-1) {
    if (!this.line)
      return;

    let d0x = d0.x ;
    if(w>0){
      if(d1.x>(d0.x+w))
        d0x = d0.x+w ;
    }

    this.line.attr("d", "M" + d0x + "," + d0.y + " L" + (d1.x + d0x) / 2 + "," + (d1.y + d0.y) / 2 + " L" + d1.x + "," + d1.y)
      .css("opacity", 1);
  }

  clear(){
    this.fromObject = null;
    this.toObject = null;
    if (!this.line)
      return;
    this.line.css("opacity", 0).attr("d", "");
  }

}
