<script>
  import ConfigEditeWin from "./config/ConfigEditeWin" ;
  import ConfigMagerPM from "./ConfigMagerPM" ;
  import Inject from "@/common/model/Inject" ;
  import AuthManager from "@/common/manager/AuthManager" ;

  export default {
    components:{  ConfigEditeWin },
    data() {
      this.viewPM = Inject.getClass(ConfigMagerPM);
      return {
        viewData:this.viewPM.data,
        page:this.viewPM.pagePM.data,
        auth:AuthManager.has
      }
    },

    mounted(){
      //d
      this.viewPM.initView() ;
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
                 label-width="100px"
                 label-position="right">

          <tile-group-iwt :column="3" style="width:100%">

            <tile-item-iwt>
              <el-form-item label="主机地址:" prop="hostAddress" class="form-item-pad">
                <el-input v-model="viewData.searchForm.hostAddress"   ></el-input>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="资源类型:" prop="resourceStyle"  class="form-item-pad">
                <el-select style="width:100%;" :auto-complete="'on'"
                           v-model="viewData.searchForm.resourceStyle"
                           placeholder="--请选择--"    >
                  <el-option v-for="(item,index) in viewData.sourceFenList"
                             :key="index"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="数据库类型:" prop="dbStyle"  class="form-item-pad">
                <el-select style="width:100%;" :auto-complete="'on'"
                           :disabled="viewData.searchForm.resourceStyle==='file'"
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
                <s-org-select v-model="viewData.searchForm.orgId"
                              :show-all="'--请选择--'">
                </s-org-select>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <h-group-iwt class="search-btn"  >
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
                   v-show="auth['33']"
                   @click="()=>{this.viewPM.popCreateWin()}" >添加</el-button>
        <el-button type="danger"
                   size="mini"
                   v-show="auth['36']"
                   :disabled="viewData.deleteItems.length===0?true:false"
                   @click="()=>{this.viewPM.deleteSelectItems()}">删除</el-button>
      </h-group-iwt>

      <!--tabale-->
      <div class="table-view">
        <div class="table-inner">
          <el-table
            border
            stripe
            @selection-change="(items)=>{this.viewPM.setDeleteItems(items)}"
            :data="page.sourceList"
            size="mini"
            max-height="100%"
            height="100%"
            style="width:100%;height:100%" >
            <el-table-column  label="全选"
                              type="selection"
                              width="55"
                              v-if="auth['36']">
            </el-table-column>
            <el-table-column prop="orgName"  label="部门名称" min-width="150"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column  prop="dataSourceName" label="数据源名称" min-width="150"
                              :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column  prop="resourceStyleName"  label="资源类型" min-width="100">
            </el-table-column>
            <el-table-column  prop="dbStyleName"  label="数据库类型" width="100">
            </el-table-column>
            <el-table-column  prop="dataInstance"  label="库名" width="100"
                              :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column  prop="hostAddress"  label="IP地址" min-width="120">
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="190"
                             v-if="auth['34'] || auth['35'] || auth['36']">
              <template slot-scope="scope">
                <el-button type="text"
                           size="mini"
                           v-show="auth['34']"
                           @click="viewPM.popEditeWin(scope.row)" >编辑</el-button>

                <el-button type="text"
                           size="mini"
                           v-show="auth['35']"
                           :disabled="!scope.row.resourceStyle || scope.row.resourceStyle!=='database'"
                           @click="viewPM.changeToSourceLink(scope.row)">资源标引</el-button>

                <el-button  type="danger"
                            size="mini"
                            v-show="auth['36']"
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
    <config-edite-win ></config-edite-win>

  </div>
</template>

