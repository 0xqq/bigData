/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import FormPmBase from "@/common/model/FormPmBase";
import PagePm from "@/common/model/PagePm";
import SysManagerAPI from "@/common/service/SysManagerAPI" ;

export default class UserManagerPM extends FormPmBase {

  constructor() {
    super();

    this.pagePM = new PagePm(SysManagerAPI.queryUserList);
    // this.pagePM.testHandler = this.testHandler ;

    this.rolePM = new PagePm(SysManagerAPI.queryRoleList);
    this.rolePM.data.pageSize = 9999999 ;//查询所有
    // this.rolePM.testHandler = this.testHandler2 ;

    this.data.roleList = [] ;
    this.selectUsers = [] ;
    this.data.name = ""; //用户名
    this.data.tenant = ""; //租户
    this.data.department =""//部门

  }

  /**
   *
   */
  reset() {
    this.data.name = "";
    this.queryList();
  }

  /**
   * 查询用户列表
   */
  queryList(){
    this.pagePM.queryList({userName:this.data.name,deptName:this.data.department,tenementId:this.data.tenant},null,(list)=>{
      for(let user of list ){
        if(user.role){
          user.roleName = user.role.roleName ;
          user.roleId = user.role.id ;
        }
      }
    }) ;
  }

  /**
   * 初始化视图
   */
  initView(){
    this.queryList();
  }

  /**
   * 弹出编辑窗口
   * @param item
   */
  popEditeWin(item){
    this.selectUsers = item?[item]:this.data.deleteItems ;
    if(!this.selectUsers || this.selectUsers.length===0){
      this.popMessage("请选择用户！");
      return ;
    }
    super.popEditeWin(item) ;

    this.data.roleList = [] ;
    this.data.isLoading = true ;
    this.rolePM.queryList(null,null,(list)=>{
      this.data.isLoading = false ;
      for(let data of list){
        data.selected = false ;
        if(item && data.id === item.roleId)
          data.selected = true ;
      }
      this.data.roleList = list ;
    },null,()=>{
      this.data.isLoading = false ;
    })
  }

  /**
   * 选中角色
   * @param data
   */
  changeItem(data){
    if(data.selected){
      for(let item of this.data.roleList ){
        item.selected = false ;
      }
      data.selected = true ;
    }
  }

  submit(){
    let selData = null ;
    for(let item of this.data.roleList){
      if(item.selected===true){
        selData = item ;
        break ;
      }
    }

    if(selData===null){
      this.popMessage("请选择角色！") ;
      return ;
    }
    let send = {
      roleId: selData.id,
      userIds: NormalUtils.getArrByAtt(this.selectUsers, "userId").join(",")
    } ;
    this.query(send,(result)=>{
       this.popMessage("保存成功！");
       this.closeWin() ;
       this.reQuery() ;
    },null,SysManagerAPI.setRoleToUser) ;
  }


  testHandler(){
    return NormalUtils.createTestData({
      id:"dfd",//用户ID
      userName:"dfdfd",//用户称
      orgName:"dfd",//所属部门
      roleName:"dfdfd"//所属角色
    },10) ;
  }

  testHandler2(){
    return NormalUtils.createTestData({
      id:"dfd",//用户ID
      roleName:"dfdfdfd",//用户称
      roleCode:"dfd",//所属部门
    },10) ;
  }
}
