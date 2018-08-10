<script>
    import TenantAuthorizePM from "./TenantAuthorizePM";
    import ContentTitle from "@/common/comps/normal/ContentTitle" ;
    import TenantAuthorizeWin from "./TenantAuthorizeWin" ;
    import Inject from "@/common/model/Inject" ;

    export default {
      components:{ContentTitle,TenantAuthorizeWin},
        data() {
          this.viewPM = Inject.getClass(TenantAuthorizePM) ;
            return {
              auth:AuthManager.has,
              viewData:this.viewPM.data ,
              page:this.viewPM.pagePM.data
            }
        },
        mounted() {
        },
        activated() {
          let query = NormalUtils.getRouteQuery(this.$route.path) ;
          this.viewPM.initView(query) ;
        },
        methods: {},
        beforeDestroy() {
        }
    }
</script>

<style scoped lang="scss">
  .container{
    @include abs-group() ;

    .layout{
      @include abs-group(10px,10px,10px,3px) ;
    }

    .info{
      padding:10px 5px;
    }

    .tab-head-l {
      flex:none;
      width:100%;
      height: 40px;
      padding: 0 5px;
      overflow: hidden;
      flex:none ;
      margin-bottom: 5px;
      position:relative;
      .reback-btn{
        @include abs-group(false,false,25px,5px);
      }
    }

    .search{
      flex:none;
      width:100%;
      height:40px;
      margin: 0px 10px 5px 10px;
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

    .table-nav {
      flex:none;
      width: 100%;
      height: 40px;
      overflow: hidden;
      position:relative;
      .control-btns{
        @include abs-group(false,0,10px,0) ;
      }
    }
    .content-layout{
      width:100%;
      flex:auto;
    }
    .table-view{
      border:1px solid #dcdfe6 ;
      border-top:none ;
      width:100%;
      flex:auto;
      overflow: hidden;
      box-sizing: border-box;
      position:relative;
      .table-inner{
        @include abs-group(5px,5px,5px,5px) ;
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
      <content-title :title="'租户管理-授权 ( 租户名称:'+viewData.currentData.name+' )'">
        <el-button type="primary"
                   size="mini"  style="float:right;"
                   @click="()=>{this.viewPM.changeBackMain()}">返回</el-button>
      </content-title>

      <!--tab button-->
      <div class="tab-head-l">
        <el-tabs v-model="viewData.currentView" @tab-click="viewPM.changeView()">
          <el-tab-pane label="Hadoop" name="hadoop" >
          </el-tab-pane>
          <el-tab-pane label="DB" name="db" >
          </el-tab-pane>
          <el-tab-pane label="File" name="file" >
          </el-tab-pane>
        </el-tabs>
      </div>

      <v-group-iwt class="content-layout" v-if="viewData.currentView==='hadoop'">

        <!--搜索条件-->
        <h-group-iwt class="search">
          <div >对象名称：</div>
          <div class="input">
            <el-input  size="small"
                       v-model="viewData.searchForm.objectName" ></el-input>
          </div>
          <div >
            <el-button type="primary" size="small" @click="viewPM.queryList()" >查询</el-button>
          </div>
        </h-group-iwt>

        <!--sub tab-->
        <div class="table-nav">
          <el-tabs type="border-card"
                   v-model="viewData.subView"
                   @tab-click="()=>{viewPM.changeSubView()}" >

            <el-tab-pane label=" HDFS " name="hdfs" >
              <span slot="label"><i class="iconfont tj-biaoqian"></i> HDFS </span>
            </el-tab-pane>
            <el-tab-pane label=" HBASE " name="hbase" >
              <span slot="label"><i class="iconfont tj-biaoqian1"></i> HBASE </span>
            </el-tab-pane>
            <el-tab-pane label=" HIVE " name="hive" >
              <span slot="label"><i class="iconfont tj-biaoqian1"></i> HIVE </span>
            </el-tab-pane>
          </el-tabs>

          <h-group-iwt class="control-btns">
            <el-button type="primary" size="small"
                       @click="viewPM.popCreateWin()">授权</el-button>
          </h-group-iwt>
        </div>

        <!--表格页面-->
        <div class="table-view">
          <div class="table-inner">
            <el-table
              border
              :data="page.sourceList"
              size="mini"
              max-height="100%"
              height="100%"
              style="width:100%;height:100%" >
              <el-table-column  prop="resourcesName" label="数据对象" min-width="180">
              </el-table-column>
              <el-table-column  prop="policyItemsName"  label="权限集合" min-width="100">
              </el-table-column>

              <el-table-column label="操作" fixed="right" width="130" >
                <template slot-scope="scope">
                  <el-button type="text"
                             size="mini"
                             @click="viewPM.popEditeWin(scope.row)" >修改</el-button>
                  <el-button type="danger"
                             size="mini"
                             @click="viewPM.deleteItem(scope.row)">回收</el-button>
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
    </v-group-iwt>

    <!--loading-->
    <s-loading v-show="page.isLoading || viewData.isLoading"></s-loading>
    <!--授权窗口-->
    <tenant-authorize-win></tenant-authorize-win>

  </div>
</template>
