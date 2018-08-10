/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import FormPmBase from "@/common/model/FormPmBase";
import PagePm from "@/common/model/PagePm";
import SysManagerAPI from "@/common/service/SysManagerAPI" ;
import TreeGridData from "@/common/comps/normal/grid/TreeGridData" ;
import AuthManager from "@/common/manager/AuthManager" ;

export default class RoleManagerPM extends FormPmBase {

  constructor() {
    super();

    this.createMethod = SysManagerAPI.saveRole ;
    this.updateMethod = SysManagerAPI.saveRole ;
    this.deleteMethod = SysManagerAPI.deleteRole ;

    this.pagePM = new PagePm(SysManagerAPI.queryRoleList);
    // this.pagePM.testHandler = this.testHandler ;

    this.detailPM = new PagePm(SysManagerAPI.queryRoleUserList ) ;
    // this.detailPM.testHandler = this.testHandler2 ;

    this.treeGridData = new TreeGridData() ;
    this.allTreeData = [] ;
    this.treeItemMap = {} ;

    this.initData({
      isPopAut:false
    }) ;

    this.initFormData() ;
  }

  initView() {
     this.queryList() ;
  }

  initFormData(){
    this.initDataForm(
      {
        id:"",//
        description:"",//当前页，默认是1
        roleName:""//角色名称
      },"form"  ) ;
  }

  /**
   * 创建
   */
  popCreateWin(){
    super.popCreateWin() ;
    this.initFormData();
  }

  /**
   * 编辑
   * @param item
   */
  popEditeWin(item){
    super.popEditeWin(item) ;
    NormalUtils.copySimpleAtt(item,this.data.form) ;
  }

  getCreateParams(){
    return  this.data.form ;
  }

  getUpdateParams(){
    return this.data.form ;
  }

  /**
   *
   */
  getDeleteParams(param,ismore=false,idfield="id"){
    return {id:param.id} ;
  }

  /**
   * 弹出权限集合窗口
   * @param item
   */
  popAut(item){
    this.currentItem = item ;
    this.allTreeData = NormalUtils.copyObjectDeep( AuthManager.treeList) ;
    this.treeGridData.setGridData( this.allTreeData ) ;
    let _map = {} ;
    NormalUtils.travelTree(this.allTreeData,(node,level,pItem)=>{
       node.path = "" ;
       if(pItem)
         node.path = pItem.path +","+pItem.code ;
       if(node.btns){
         for(let btn of node.btns){
           btn.path = node.path +","+node.code ;
           _map[btn.code] = btn;
         }
       }
      _map[node.code] = node;
    });
    this.treeItemMap = _map ;

    //选中已有
    if(item.menuIds){
      for(let id of item.menuIds){
        if(this.treeItemMap.hasOwnProperty(id))
          this.treeItemMap[id].selected = true ;
      }
    }
    this.data.isPopAut = true ;
  }

  /**
   * 选中或取消某个值
   * @param item
   */
  itemCheck(item) {

    //选中子
    this.selectedChild(item, item.selected);

    //选中父
    if (item.selected === true) {
      let ppps = item.path.split(",");
      for (let code of ppps) {
        if (this.treeItemMap.hasOwnProperty(code))
          this.treeItemMap[code].selected = true;
      }
      this.treeGridData.open(item,true) ;
    }

    //如果子都取消 取消父节点
    else{
      let pp = item.path.split(",") ;
      for(let i=pp.length-1;i>=0;i--){
        let code = pp[i] ;
        if(code && this.selectedParent(code))
          break ;
      }
    }
  }

  /**
   * 层级处理父
   * @param code
   * @returns {*}
   */
  selectedParent(code){
    if (this.treeItemMap.hasOwnProperty(code)){
      let pp = this.treeItemMap[code] ;
      if(pp.children){
        let flag = false ;
        for(let item of pp.children ){
          if(item.selected === true ){
            flag = true ;
            break ;
          }
        }
        pp.selected = flag ;
        return pp.selected ;
      }
    }
    return false ;
  }

  /**
   * 选中子
   * @param chils
   */
  selectedChild(item ,flag){
    item.selected = flag ;
    if (item.children){
      for(let chl of item.children){
        this.selectedChild(chl,flag) ;
      }
    }
    if (item.btns){
      for(let btn of item.btns){
        btn.selected = flag ;
      }
    }
  }

  /**
   * 提交权限
   */
  submitAut(){
    let arr = [] ;
    NormalUtils.travelTree(this.allTreeData,(item)=>{
      if(item.selected===true)
        arr.push(item.code) ;
      if(item.btns){
        for(let btn of item.btns ){
          if(btn.selected === true )
            arr.push(btn.code) ;
        }
      }
    }) ;

    let send = {id:this.currentItem.id,menuIds:arr.join(",")} ;
    this.query(send,(result)=>{
       this.popMessage("保存成功！") ;
       this.data.isPopAut = false ;
       this.queryList();
    },null,SysManagerAPI.saveRoleAuthor) ;
  }

  /**
   * 弹出用户列表窗口
   * @param item
   */
  popDetailWin(item){
    super.popDetailWin(item) ;
    this.detailPM.queryList(null,{id:item.id},(list)=>{
      for(let i=0;i<list.length;i++ ){
        list[i].index = (i+1)+"" ;
      }
    }) ;
  }

  /**
   * 关闭权限集合窗口
   */
  closeAut(){
    this.data.isPopAut = false ;
  }

  testHandler(){
    return NormalUtils.createTestData({
      id:"dfdf",//角色ID
      roleName:"dfdf",//角色名称
      roleCode:"dfdf",//角色编码
      createTime:"dfdfdfdfd",//创建时间
      createBy:"dfdfdfdf"//创建人
    },20) ;
  }
  testHandler2(){
    return NormalUtils.createTestData({
      id:"",//用户ID
      userName:"sssssssss",//用户称
      orgName:"dfdfdfdf",//所属部门
    },20) ;
  }



}
