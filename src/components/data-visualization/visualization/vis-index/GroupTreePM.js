/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import FormPmBase from "@/common/model/FormPmBase";
import VisualizationAPI from "@/common/service/VisualizationAPI" ;
import NormalUtils from "@/common/utils/NormalUtils";
import RightMenu from "@/common/utils/RightMenu";

export default class GroupMenuPM extends FormPmBase {

  constructor() {
    super();
    this.queryMethod = VisualizationAPI.queryGroupTree;
    this.updateMethod = VisualizationAPI.saveTreeGroup;
    this.createMethod = VisualizationAPI.saveTreeGroup;
    this.deleteMethod = VisualizationAPI.deleteTreeGroup;

    this.treeSourceMap = {} ;
    this.initData({
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeSource: [],//分组数据源,
      currentGroup: {id: null}
    });

    this.rightMenuList = [
      {label:"添加子分组",code:"add"},
      {label:"修改分组",code:"edit"},
      {label:"删除分组",code:"delete"}
    ] ;

    //初始化绑定表单
    this.initFormData();
  }

  /**
   * 页面初始化 temp?
   */
  initView( ) {
    //查询分组树
    this.queryList();
  }

  /**
   * 查询分组树
   */
  queryList() {
    //可设置查询参数
    let [params,treeSource,treeSourceMap] = [{},[],{}];
    // if(this.data.currentGroup){
    //   params = this.data.currentGroup;
    //   treeSource = this.data.treeSource;
    //   treeSourceMap = this.treeSourceMap;
    // }
    this.query(params,(result) => {
      let list = this.getResultList(result);
      for(let item of list){
        this.handlerItem(item) ;
        treeSourceMap[item.id] = item ;
      }
      for(let item of list){
        if(item.parentId && treeSourceMap.hasOwnProperty(item.parentId)){
          let pitem = treeSourceMap[item.parentId] ;
          if(!pitem.children)
            pitem.children = [] ;
          pitem.children.push(item) ;
        }else{
          treeSource.push(item) ;
        }
      }
      this.treeSourceMap = treeSourceMap;
      this.data.treeSource = treeSource ;
      if(this.data.currentGroup.id == null){
        this.changeGroup(this.data.treeSource[0]);
      }
    },null,this.queryMethod) ;
  }

  /**
   *
   * @param item
   */
  handlerItem(item){
    item.isOpen = false ;
    item.selected = false ;
    item.children = [] ;
  }

  /**
   * 初始化表单数据
   */
  initFormData() {
    this.initDataForm({
      id: "",
      parentId: "",
      name: "",
      description: ""
    }, "form");
  }

  /**
   * 切换分组
   */
  changeGroup(item) {
    this.data.currentGroup = item;
    if(this.ownerEvent!==null)
      this.ownerEvent("selectedGroupChanged",item) ;
  }

  /**
   * 创建窗口
   */
  popCreateWin(item) {
    super.popCreateWin();
    this.initFormData();
  }

  /**
   * 编辑窗口
   */
  popEditeWin(item) {
    super.popEditeWin(item);
    this.initFormData();
    NormalUtils.copyObjectAtt(item, this.data.form);
  }

  /**
   * 构建新增操作提交时需要的参数封装
   * @returns
   */
  getCreateParams(){
    if(this.data.currentGroup){
      this.data.form.parentId = this.data.currentGroup.id;
    }
    return this.data.form;
  }

  /**
   * 构建新增操作提交时需要的参数封装
   */
  getUpdateParams(){
    return this.data.form;
  }
  /**
   * 删除选中对象
   * @param item
   */
  deleteItem(item){
    if(item.children.length > 0){
      this.popMessage("该分组存在下级分组，无法删除") ;
    }else{
      super.deleteItem(item);
    }
  }
  /**
   * 获取删除时的参数封装
   * @param param
   * @param ismore
   * @param idfield
   * @returns {*}
   */
  getDeleteParams(param,ismore=false,idfield="id"){

    if(ismore){
      if(param.length===0)
        return null;
      let _ids = [] ;
      param.forEach((item)=>{
        if(item  && item.hasOwnProperty(idfield)){//默认组装成单个对象
          let _id = {};
          _id[idfield] = item[idfield] ;
          _ids.push(_id) ;
        }
      }) ;
      return _ids ;
    }else{
      if(param && param.hasOwnProperty(idfield)){
        let _id = {};
        _id[idfield] = param[idfield] ;
        return _id ;
      }
    }
    return null ;
  }
  /**
   * 删除成功处理,需要清除缓存对象
   * @param res
   */
  deleteResultHandler(res ,isMore=false,mess="删除成功！"){
    this.popMessage("删除成功！");
    //删除缓存对象
    if(this.treeSourceMap.hasOwnProperty(this.data.currentGroup.parentId) ){
        //删除panrent中的关系
        let pitem = this.treeSourceMap[this.data.currentGroup.parentId] ;
        let index = NormalUtils.getSelectIndex(pitem.children,this.data.currentGroup.id) ;
        if(index > -1)
            pitem.children.splice(index,1) ;
        //删除自身
        index = NormalUtils.getSelectIndex(this.treeSourceMap,this.data.currentGroup.id) ;
      if(index > -1)
        this.treeSourceMap.splice(index,1) ;
      if(pitem)
          this.changeGroup(pitem) ;
        else
          this.changeGroup(null) ;
    }
  }

  /*----------------------------------------------- test ---------------------------------*/
  testHandler(){
    return [
      {id: "0",pid:"", name: "广东安全项目"  },
      {id: "1",pid:"0", name: "部门统计" },
      {id: "2",pid:"0", name: "安防日志统计" },
      {id: "8",pid:"0", name: "系统运行统计信息" },
      {id: "9",pid:"0", name: "攻防演化模拟" },
      {id: "10", pid:"", name: "山西建设项目"  },
      {id: "11",pid:"10", name: "部门统计2" },
      {id: "12",pid:"10", name: "安防日志统计2" },
      {id: "18",pid:"10", name: "系统运行统计信息2" },
      {id: "19",pid:"10", name: "攻防演化模拟2" },
      {id: "22", pid:"", name: "河北建设项目"  }
      ];
  }
}
