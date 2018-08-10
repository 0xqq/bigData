<script>
  import UserManagerPM from "./UserManagerPM" ;
  import Inject from "@/common/model/Inject" ;
  import UserSetRole from "./UserSetRole" ;

  export default {
    components:{ UserSetRole   },
    data() {
      this.viewPM = Inject.getClass(UserManagerPM);
      this.pagePM = this.viewPM.pagePM ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        page:this.viewPM.pagePM.data
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
  .lb{
    font-size:13px;
    width:90px;
    text-align: right;
    color:#909399;
  }
  .input-box {
    flex: none;
    width: 250px;
    margin-right: 15px;
    margin-left: 15px;
  }
  .single{
    height:50px;
    margin: 0;
    padding: 0;
  }
</style>

<template>
  <div class="tj-t-view-inner" >
    <v-group-iwt class="layout">

      <!--form-->
      <!--<div class="search-form single">

           <h-group-iwt style="width:100%;height:100%;">

             <div class="lb">用户名：</div>

             <div class="input-box">
               <el-input size="mini" v-model="viewData.name"   ></el-input>
             </div>

             <el-button type="primary" size="mini"
                        class="btn" @click="viewPM.queryList()" >查询</el-button>

             &lt;!&ndash;control btn&ndash;&gt;
             <h-group-iwt class="control-btn" :hor="'end'">
               <el-button type="primary"
                          size="mini"
                          v-if="auth['839']"
                          :disabled="viewData.deleteItems.length===0?true:false"
                          @click="()=>{this.viewPM.popEditeWin()}" >批量分配</el-button>
             </h-group-iwt>
           </h-group-iwt>

      </div>-->


      <div class="search-form">
        <el-form ref="form"
                 size="mini"
                 label-width="90px"
                 label-position="right">

          <tile-group-iwt :column="5" style="width:100%">

            <tile-item-iwt>
              <el-form-item label="用户名:" prop="name"   class="form-item-pad">
                <el-input v-model="viewData.name"  ></el-input>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="租户:" prop="tenant"   class="form-item-pad">
                <el-input v-model="viewData.tenant" ></el-input>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="所属部门:" prop="department"   class="form-item-pad">
                <el-input v-model="viewData.department"  ></el-input>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <h-group-iwt  class="search-btn">
                <el-button type="primary" size="mini"
                           class="btn" @click="viewPM.queryList()" >查询</el-button>
              </h-group-iwt>
            </tile-item-iwt>

            <tile-item-iwt>
              <h-group-iwt style="position: absolute;right: 0">
                <el-button type="primary"
                           size="mini"
                           v-if="auth['839']"
                           :disabled="viewData.deleteItems.length===0?true:false"
                           @click="()=>{this.viewPM.popEditeWin()}" >批量分配</el-button>
              </h-group-iwt>
            </tile-item-iwt>


          </tile-group-iwt>
        </el-form>
      </div>



      <!--tabale-->
      <div class="table-view">
        <div class="table-inner">
          <el-table
            border
            @selection-change="(items)=>{this.viewPM.setDeleteItems(items)}"
            :data="page.sourceList"
            size="mini"
            max-height="100%"
            height="100%"
            style="width:100%;height:100%" >
            <el-table-column  label="全选"
                              type="selection"
                              width="55">
            </el-table-column>
            <el-table-column prop="userName"  label="用户名"  >
            </el-table-column>
            <el-table-column prop="userAccount"  label="账号"  >
            </el-table-column>
            <el-table-column prop="orgName"  label="所属部门"  >
            </el-table-column>
            <el-table-column prop="roleName"  label="所属角色"  >
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="90"  v-if="auth['839']">
              <template slot-scope="scope">
                <el-button type="text"
                           size="mini"
                           v-if="auth['839']"
                           @click="viewPM.popEditeWin(scope.row)" >分配角色</el-button>
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

    <!--分配角色-->
    <user-set-role></user-set-role>
  </div>
</template>

