<script>
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import TableListPM from "./TableListPM" ;
  import ShareView from "../../common-comps/ShareView" ;

  let viewPM = new TableListPM()  ;
  export default {
    mixins:[ShareView],
    components:{
      ContentTitle},
    data() {
      this.viewPM = viewPM  ;
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
      refreshView(){
        this.viewData.showManager = true ;
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

            <tile-group-iwt :column="4" style="width:100%">

              <tile-item-iwt>
                <el-form-item label="主机地址:" prop="hostAddress" class="form-item-pad">
                  <el-input v-model="viewData.searchForm.hostAddress"   ></el-input>
                </el-form-item>
              </tile-item-iwt>

              <tile-item-iwt>
                <el-form-item label="数据库类型:" prop="dbStyle"  class="form-item-pad">
                  <el-select style="width:100%;" :auto-complete="'on'"
                             v-model="viewData.searchForm.dbStyle"
                             placeholder="--请选择--"    >
                    <el-option v-for="(item,index) in viewData.sourceTypeList"
                               :key="index"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </tile-item-iwt>

              <tile-item-iwt>
                <el-form-item label="部门名称:" prop="orgId" class="form-item-pad">
                  <s-org-select v-model="viewData.searchForm.orgId"></s-org-select>
                </el-form-item>
              </tile-item-iwt>

              <tile-item-iwt>
                <h-group-iwt class="search-btn">
                    <el-button type="primary" size="mini" class="btn"
                               @click="()=>this.viewPM.queryList()" >查询</el-button>
                    <el-button type="warning" size="mini" class="btn"
                               @click="()=>this.viewPM.initSearchForm(true)">重置</el-button>
                  <!--temp-->
                  <!--<el-button type="danger" size="small" class="btn"-->
                             <!--@click="()=>this.viewPM.popCreateWin()">临时添加</el-button>-->
                </h-group-iwt>
              </tile-item-iwt>
            </tile-group-iwt>
          </el-form>
        </div>

        <!--tabale-->
      <div class="table-view">
        <div class="table-inner">
          <el-table
            border  stripe
            :data="page.sourceList"
            max-height="100%"
            height="100%"
            size="mini"
            style="width:100%;height:100%" >
            <el-table-column prop="orgName"  label="部门名称" min-width="180">
            </el-table-column>
            <el-table-column  prop="dataSourceName" label="软件名称" min-width="180">
            </el-table-column>
            <el-table-column  prop="dbStyle"  label="库类型" min-width="100">
            </el-table-column>
            <el-table-column  prop="dataInstance"  label="库名" min-width="100">
            </el-table-column>
            <el-table-column  prop="hostAddress"  label="主机地址" min-width="120">
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="170" v-if="auth['436'] || auth['435'] " >
              <template slot-scope="scope">
                <el-button type="text" size="mini"
                           v-if="auth['436']"
                           @click="viewPM.changeToTableView(scope.row)" >表管理</el-button>
                <el-button type="text" size="mini"
                           v-if="auth['435']"
                           @click="viewPM.testLink(scope.row)" >测试连接</el-button>
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
  </div>
</template>
