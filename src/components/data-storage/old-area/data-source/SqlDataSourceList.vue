<script>

  import SqlFormViewPM from "./SqlFormViewPM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    data() {
      this.viewPM = Inject.getClass(SqlFormViewPM)  ;
      this.pagePM = this.viewPM.pagePM ;
      return {
        auth:AuthManager.has,
        autoId:NormalUtils.createOID("dgc"),
        viewData:this.viewPM.data,
        page:this.pagePM.data
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>
</style>

<template>
  <div style="width:100%">
      <v-group-iwt style="width:100%;">
        <!--control btn-->
        <div style="width:100%;">
          <h-group-iwt style="width:100%;" :hor="'end'">
            <!---->
            <el-button type="primary"
                       size="mini"
                       :disabled="true"
                       v-if="auth['4234']" >下载资源</el-button>
          </h-group-iwt>
        </div>
        <v-gap-iwt></v-gap-iwt>
        <!--tabale-->
        <div style="flex:none;width:100%;">
          <el-table
            size="mini"
            border  stripe
            style="width:100%;"
            :data="page.sourceList">
            <el-table-column v-for="(col,index) in viewData.showCols"
                             :key="index+autoId"
                             :label="col.label"
                             :prop="col.name">
            </el-table-column>
          </el-table>
        </div>

        <div style="height:10px;"></div>
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

        <v-gap-iwt :g="5"></v-gap-iwt>
      </v-group-iwt>

    <s-loading v-show="page.isLoading" :fixed="true"></s-loading>

  </div>
</template>
