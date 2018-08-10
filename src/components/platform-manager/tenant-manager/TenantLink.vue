<script>
  import TenantLinkPM from "./TenantLinkPM";
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import TenantLinkAddWin from "./TenantLinkAddWin" ;
  import Inject from "@/common/model/Inject" ;
  import TenantLinkEditWin from "./TenantLinkEditWin" ;

  export default {
    components:{ContentTitle,TenantLinkAddWin,TenantLinkEditWin},
    data() {
      this.viewPM = Inject.getClass(TenantLinkPM) ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data ,
        page:this.viewPM.pagePM.data
      }
    },
    mounted() {
      this.viewPM.initView( ) ;
    },
    activated() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .container{
    @include abs-group() ;

    .layout{
      @include abs-group(10px,0px,10px,3px) ;
    }

    .search{
      flex:none;
      margin: 10px 0 0 10px;
      width:100%;
      font-size:13px;
      div{
        flex:none;
      }
      .gap{
        width:10px;
      }
      .input{
        margin:0 5px;
        width:150px;
        input{
          width:150px;
        }
      }
    }

    .control-btn{
      width:100%;
      margin-bottom: 10px;
    }

    .table-view{
      width:100%;
      flex:auto;
      overflow: hidden;
      box-sizing: border-box;
      position:relative;
      .table-inner{
        @include abs-group() ;
      }
    }
  }

  .auto-layout{
    width:100%;
  }

</style>

<template>
  <div class="container" >
    <v-group-iwt class="layout">

      <!--title-->
      <content-title title="租户管理-关联管理">
        <el-button type="primary"
                   size="mini"
                   style="float:right;"
                   @click="()=>{this.viewPM.changeBackMain()}">返回</el-button>
      </content-title>

        <!--搜索条件-->
        <h-group-iwt class="search">
          <div >租户名称：</div>
          <div class="input">
            <el-input  size="small"  v-model="viewData.searchForm.tenant" ></el-input>
          </div>
          <div class="gap"></div>
            <div >部门名称：</div>
          <div class="input">
            <el-input  size="small"
                       v-model="viewData.searchForm.dept" ></el-input>
          </div>
          <div >
            <el-button type="primary"
                       size="small"
                       @click="viewPM.queryList()" >查询</el-button>
          </div>
        </h-group-iwt>

      <!--control btn-->
      <h-group-iwt class="control-btn" :hor="'end'">
        <el-button type="primary"
                   size="mini"
                   v-if="auth['828']"
                   @click="()=>{this.viewPM.popCreateWin()}" >添加关联</el-button>
      </h-group-iwt>

        <!--表格页面-->
        <div class="table-view">
          <div class="table-inner">
            <el-table border
                      :data="page.sourceList"
                      size="mini"
                      max-height="100%"
                      height="100%"
                      style="width:100%;height:100%" >
              <el-table-column prop="tenantName"  label="租户名称" min-width="180">
              </el-table-column>
              <el-table-column  prop="deptName" label="部门" min-width="180">
              </el-table-column>
              <el-table-column  prop="userName"  label="管理员" min-width="100">
              </el-table-column>

              <el-table-column label="操作" fixed="right" width="100" v-if="auth['829']">
                <template slot-scope="scope">
                  <!--<el-button type="text"-->
                             <!--size="mini"-->
                             <!--@click="viewPM.popEditeWin(scope.row)" >更换管理员</el-button>-->
                  <el-button type="danger"
                             size="mini"
                             v-if="auth['829']"
                             @click="viewPM.deleteItem(scope.row)">取消关联</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!--page-->
        <h-group-iwt :hor="'center'" style="width:100%">
          <s-pagination :page="page"
                        @change="(data)=>{this.viewPM.pagePM.pageChange(data)}" ></s-pagination>
        </h-group-iwt>

    </v-group-iwt>

    <!--loading-->
    <s-loading v-show="page.isLoading || viewData.isLoading"></s-loading>

    <!--关联窗口-->
    <tenant-link-add-win></tenant-link-add-win>

    <!--关联编辑-->
    <tenant-link-edit-win></tenant-link-edit-win>
  </div>
</template>
