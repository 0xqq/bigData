<script>

  import RoleManagerPM from "./RoleManagerPM" ;
  import Inject from "@/common/model/Inject" ;
  import TreeGridName from "@/common/comps/normal/grid/TreeGridName" ;

  export default {
    components:{ TreeGridName},
    data() {
      this.viewPM = Inject.getClass(RoleManagerPM)  ;
      this.pagePM = this.viewPM.detailPM ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        page:this.pagePM.data
      }
    },
    activated(){
    },
    methods:{
    }
  }
</script>

<style scoped lang="scss">
  .container{
    @include abs-group(0,0,15px,0) ;
  }
</style>

<template>

  <s-window title="已分配用户列表"
            @close="()=>{this.viewPM.closeWin()}"
            :visible="viewData.isPopDetail"
            :width="'700px'"
            :height="'500px'" >
    <div class="container">

      <v-group-iwt class="layout">
        <div class="table-view">
          <div class="table-inner">
            <el-table
              border
              :data="page.sourceList"
              size="mini"
              max-height="100%"
              height="100%"
              style="width:100%;height:100%" >
              <el-table-column prop="index"  label="序号" width="50">
              </el-table-column>
              <el-table-column prop="userName"  label="用户名" >
              </el-table-column>
              <el-table-column  prop="orgName" label="所属部门" >
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!--page-->
        <h-group-iwt :hor="'center'" style="width:100%">
          <el-pagination background
                         layout="total, sizes, prev, pager, next"
                         :total="page.totalIndex"
                         :page-sizes="page.pageSizes"
                         :page-size="page.pageSize"
                         @size-change="(val)=>{this.pagePM.pageSizeChange(val)}"
                         @current-change="(val)=>{this.pagePM.currentPageChange(val)}">
          </el-pagination>
        </h-group-iwt>

      </v-group-iwt>

      <!--loading-->
      <s-loading v-show="page.isLoading"></s-loading>
    </div>
  </s-window>
</template>
