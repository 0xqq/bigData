<script>
  import RoleManagerPM from "./RoleManagerPM" ;
  import Inject from "@/common/model/Inject" ;
  import RoleAddWin from "./RoleAddWin" ;
  import RoleSetWin from "./RoleSetWin" ;
  import RoleUserList from "./RoleUserList" ;
  import AuthManager from "@/common/manager/AuthManager" ;
  import ModelLocator from "@/common/model/ModelLocator" ;

  export default {
    components:{  RoleAddWin,RoleSetWin ,RoleUserList},
    data() {
      this.viewPM = Inject.getClass(RoleManagerPM);
      this.pagePM = this.viewPM.pagePM ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        page:this.viewPM.pagePM.data,
        user:ModelLocator.getInstance().loginUser,
        adminCode:AuthManager.adminCode
      }
    },

    mounted(){
      this.viewPM.initView() ;
    },
    methods:{
    }
  }

</script>

<style scoped>
</style>

<template>
  <div class="tj-t-view-inner" >
    <v-group-iwt class="layout">

      <!--form-->
      <div class="search-form ">

        <!--control btn-->
        <h-group-iwt class="control-btn" :hor="'end'">
          <el-button type="primary"
                     size="mini"
                     v-if="auth['833']"
                     @click="()=>{this.viewPM.popCreateWin()}" >添加</el-button>
        </h-group-iwt>
      </div>

      <!--tabale-->
      <div class="table-view">
        <div class="table-inner">
          <el-table
            border
            :data="page.sourceList"
            size="mini"
            max-height="100%"
            height="100%"
            style="width:100%;height:100%" >
            <el-table-column prop="roleName"  label="角色名称" min-width="180">
            </el-table-column>
            <el-table-column prop="createBy"  label="创建人" min-width="120">
            </el-table-column>
            <el-table-column  prop="createTime" label="创建时间" min-width="180">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="250"
                             v-if="auth['836']||auth['837']||auth['834']||auth['835']" >
              <template slot-scope="scope">
                <el-button type="text"
                           size="mini"
                           v-if="auth['836']"
                           :disabled="scope.row.roleCode===adminCode"
                           @click="viewPM.popAut(scope.row)"
                           >权限集合</el-button>
                <el-button type="text"
                           size="mini"
                           v-if="auth['837']"
                           @click="viewPM.popDetailWin(scope.row)" >用户列表</el-button>
                <el-button type="text"
                           size="mini"
                           v-if="auth['834']"
                           :disabled="scope.row.roleCode===adminCode"
                           @click="viewPM.popEditeWin(scope.row)" >编辑</el-button>
                <el-button  type="danger"
                            size="mini"
                            v-if="auth['835']"
                            :disabled="scope.row.roleCode===adminCode"
                            @click="viewPM.deleteItem(scope.row)" >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--page-->
        <h-group-iwt :hor="'center'" style="width:100%">
          <el-pagination background
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="page.totalIndex"
                         :page-sizes="page.pageSizes"
                         :page-size="page.pageSize"
                         @size-change="(val)=>{this.pagePM.pageSizeChange(val)}"
                         @current-change="(val)=>{this.pagePM.currentPageChange(val)}">
          </el-pagination>
      </h-group-iwt>

    </v-group-iwt>

    <!--loading-->
    <s-loading v-show="page.isLoading || viewData.isLoading"></s-loading>

    <!--角色编辑窗口-->
    <role-add-win></role-add-win>

    <!--设置权限集合-->
    <role-set-win></role-set-win>

    <!--用户列表-->
    <role-user-list></role-user-list>
  </div>
</template>

