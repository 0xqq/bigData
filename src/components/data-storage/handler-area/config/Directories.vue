<script>
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import DirectoriesPM from "./DirectoriesPM" ;
  import DirectoriesMger from "@/components/common-comps/DirectoriesMger" ;
  import NormalUtils from "@/common/utils/NormalUtils";
  import ShareView from "../../common-comps/ShareView" ;

  export default {
    mixins:[ShareView],
    components:{  ContentTitle,DirectoriesMger},
    data() {
      this.viewPM = new DirectoriesPM()  ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        page:this.viewPM.pagePM.data
      }
    },
    activated(){
      this.viewPM.refreshView(this.$route) ;//temp 以前的弃用
    },
    methods:{
      /**
       * 目标路径选择
       */
      fileBrows(value){
        this.$refs.targetFileBrows.open(value ,-1,this.auth["4314"]) ;
      }
    }
  }
</script>

<style scoped>
</style>

<template>
  <div class="tj-t-view-inner" >
    <v-group-iwt class="layout">

      <!--form-->
      <div class="search-form">
        <el-form ref="form"
                 size="mini"
                 :model="viewData.searchForm"
                 label-width="90px"
                 label-position="right">

          <tile-group-iwt :column="3" style="width:100%">

            <tile-item-iwt>
              <el-form-item label="部门名称:" prop="orgId" class="form-item-pad">
                <s-org-select v-model="viewData.searchForm.orgId"></s-org-select>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="目录名称:" prop="name" class="form-item-pad">
                <el-input v-model="viewData.searchForm.foldName"   ></el-input>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <h-group-iwt class="search-btn">
                <el-button type="primary" size="mini" class="btn"
                           @click="()=>this.viewPM.queryList()" >查询</el-button>
                <el-button type="warning" size="mini" class="btn"
                           @click="()=>this.viewPM.initSearchForm()">重置</el-button>
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
            :data="page.sourceList"
            max-height="100%"
            height="100%"
            size="mini"
            style="width:100%;height:100%" >

            <el-table-column prop="orgName"  label="部门名称" min-width="180">
            </el-table-column>
            <el-table-column  prop="dataSourceName" label="目录名称" min-width="180">
            </el-table-column>
            <el-table-column  prop="hostAddress"  label="IP地址" min-width="100">
            </el-table-column>
            <el-table-column  prop="createdBy"  label="创建人" min-width="100">
            </el-table-column>
            <el-table-column  prop="createdDate"  label="创建时间" min-width="120">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="85"  v-if="auth['4313']">
              <template slot-scope="scope">
                <el-button type="text" size="mini"
                           v-if="auth['4313']"
                           @click="fileBrows(scope.row)" >管理目录</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <h-group-iwt :hor="'center'" style="width:100%">
        <el-pagination background
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totalIndex"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          @size-change="(val)=>{this.viewPM.pagePM.pageSizeChange(val)}"
          @current-change="(val)=>{this.viewPM.pagePM.currentPageChange(val)}">
        </el-pagination>
      </h-group-iwt>

      <v-gap-iwt :g="5"></v-gap-iwt>
    </v-group-iwt>

    <!--loading-->
    <s-loading v-show="viewData.isLoading||page.isLoading"></s-loading>
    <!--目录管理-->
    <!--文件选择-->
    <directories-mger  ref="targetFileBrows" ></directories-mger>

  </div>
</template>
