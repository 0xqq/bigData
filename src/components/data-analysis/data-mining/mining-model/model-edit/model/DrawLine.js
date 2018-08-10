//------------------------------------------------------------------
//title: 节点基类
//author: zc
//date:
//desc:
//------------------------------------------------------------------
import DrawBase from "./DrawBase" ;
import SvgDom from "@/common/utils/SvgDom" ;
import RightMenu from "@/common/utils/RightMenu";

export default class DrawLine extends DrawBase {

  constructor(view, fromnode = null, tonode = null, data = null) {
    super(view);
    this.lineCanvas = view.lineCanvas;
    this.fromNode = fromnode;
    this.toNode = tonode;
    this.data = data;
    this.idl = "" ;

    this.setFromNode(fromnode);
    this.setToNode(tonode);
    this.initView();
  }

  refreshIdl(){
    if(this.toNode && this.fromNode)
      this.idl = this.fromNode.id +"_"+this.toNode.id;
  }

  getIdl(){
    this.refreshIdl() ;
    return this.idl ;
  }

  setFromNode(node) {
    this.fromNode = node;
    if (node)
      node.addLine(this);
    this.refreshIdl() ;
  }

  setToNode(node) {
    this.toNode = node;
    if (node)
      node.addLine(this);
    this.refreshIdl() ;
  }

  initView(canvs) {
    if (canvs)
      this.lineCanvas = canvs;
    if (!this.lineCanvas)
      return;
    this.line = SvgDom.createSvg("path")
      .attr("z-index",100)
      .attr("fill", "none")
      .attr("stroke-width", 2)       //设定宽度
      .attr("stroke", "#3d6380")
      .attr("opacity", 0)
      .attr("marker-mid", "url(#arrow)")
      .css("cursor","pointer");
    this.lineCanvas.append(this.line);

    this.line.bind("mouseup",(ev)=>{
      if (ev.which !== 3)
        return;

      if(!DrawLine.rightMenuList)
        DrawLine.rightMenuList = [
          {label:"删除",value:"delete"}
        ] ;

      RightMenu.showRightMenu(ev,DrawLine.rightMenuList,(item)=>{
        if(item.value === "delete"){
          this.owner.removeLine(this,false) ;
        }
      }) ;
    }) ;

    this.refresh();
  }

  refresh() {
    if (!this.fromNode || !this.toNode)
      return;
    this.render(this.fromNode.getCenterPostion(), this.toNode.getCenterPostion());
  }

  render(d0, d1) {
    if (!this.line)
      return;
    this.line.attr("d", "M" + d0.x + "," + d0.y + " L" + (d1.x + d0.x) / 2 + "," + (d1.y + d0.y) / 2 + " L" + d1.x + "," + d1.y)
      .css("opacity", 1);
  }

  /**
   * 获得保存数据
   * @returns {{from, to, enabled: string}}
   */
  getSaveData(){
    return {
      "from": this.fromNode.data.idl ,
      "to": this.toNode.data.idl ,
      "enabled": "Y"
    };
  }

  clear() {
    this.fromNode = null;
    this.toNode = null;
    if (!this.line)
      return;
    this.line.css("opacity", 0).attr("d", "");
  }
}
