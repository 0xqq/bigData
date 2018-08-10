<script>
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import TenantEditWin from "./TenantEditWin" ;
  import TenantMangerPM from "./TenantMangerPM" ;
  import Inject from "@/common/model/Inject" ;
  import NormalUtils from "@/common/utils/NormalUtils";
  import PathConst from "@/router/PathConst";
  import TenantListAddWin from "./TenantListAddWin";
  import PlatformAPI from "@/common/service/PlatformAPI" ;

  export default {
    components:{  ContentTitle,  TenantEditWin,TenantListAddWin},
    data() {
      this.viewPM = Inject.getClass(TenantMangerPM);
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
      changeToLink(){
        NormalUtils.changeRouter(PathConst.PM_TENENT_LINK) ;
      },
      assForm(item){
        PlatformAPI.checkGuanLian({
          tenantId:item.tenantID
        }).then(
          (result)=>{
            console.log(result.resultdata.result);
            if(result.resultdata.result == '1'){
              this.$message('该租户已关联');
            }else {
              this.$refs.assWin.open(item);
            }
          },
          ()=>{

          }
        );
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

          <tile-group-iwt :column="2" style="width:100%">

            <tile-item-iwt>
              <el-form-item label="租户名称:" prop="tenant" class="form-item-pad">
                <el-input v-model="viewData.searchForm.tenant"   ></el-input>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <h-group-iwt class="search-btn">
                <el-button type="primary" size="mini"
                           class="btn" @click="viewPM.queryList()" >查询</el-button>
                <el-button type="warning" size="mini"
                           class="btn"  @click="viewPM.initSearchForm()">重置</el-button>
              </h-group-iwt>
            </tile-item-iwt>
          </tile-group-iwt>
        </el-form>
      </div>

      <!--control btn-->
      <h-group-iwt class="control-btn" :hor="'end'">
        <el-button type="primary"
                   size="mini"
                   v-if="auth['824']"
                   @click="()=>{this.viewPM.popCreateWin()}" >添加</el-button>
        <el-button type="primary"
                   size="mini"
                   v-if="auth['827']"
                   @click="()=>{this.changeToLink()}" >关联管理</el-button>
      </h-group-iwt>

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
            <el-table-column prop="tenantName"  label="租户名称" min-width="180">
            </el-table-column>
            <el-table-column prop="typeName"  label="类型" min-width="120">
            </el-table-column>
            <el-table-column prop="levelName"  label="级别" min-width="120">
            </el-table-column>
            <el-table-column  prop="createTime" label="创建时间" min-width="180">
            </el-table-column>
            <el-table-column  prop="creator"  label="创建者" min-width="100">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="160"
                             v-if="auth['825']||auth['826']">
              <template slot-scope="scope">
                <el-button type="text"
                           size="mini"
                           v-if="auth['825']"
                           @click="viewPM.popEditeWin(scope.row)" >编辑</el-button>

                <el-button type="text"
                           size="mini"
                           v-if="auth['827']"
                           @click="assForm(scope.row)">关联</el-button>

               <!-- <el-button type="text"
                           size="mini"
                           @click="viewPM.changeToSourceLink(scope.row)">授权</el-button>-->
                <el-button  type="danger"
                            size="mini"
                            v-if="auth['826']"
                            @click="viewPM.deleteItem(scope.row)" >删除</el-button>
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
    <!--配置信息编辑-->
    <tenant-edit-win></tenant-edit-win>
    <!--关联按钮-->
    <tenant-list-add-win ref="assWin"></tenant-list-add-win>
  </div>
</template>

