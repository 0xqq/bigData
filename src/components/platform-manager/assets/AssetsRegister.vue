<script>
  import AssetsRegisterPM from "./AssetsRegisterPM" ;
  import Inject from "@/common/model/Inject" ;
  import AssetsRegisterForm from "./AssetsRegisterForm" ;
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import SubTitle from "@/common/comps/normal/SubTitle";

  export default {
    components:{AssetsRegisterForm,SubTitle,ContentTitle},
    data() {
      this.viewPM = Inject.getClass(AssetsRegisterPM) ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        page:this.viewPM.pagePM.data
      }
    },
    mounted() {
      this.viewPM.initView();
    },
    activated() {
    },
    methods: {

    }
  }
</script>

<style scoped>
  .auto-view {
    width: 100%;
    flex: none;
  }
</style>

<template>
  <div class="tj-t-auto-view" >

    <!--scroll-->
    <div class="auto-content" v-bind:id="viewData.autoId">
      <div class="auto-content-inner">
        <div class="tj-t-auto-view">

            <v-group-iwt class="layout">

              <el-button type="primary"
                         size="small"
                         v-if="auth['813']"
                         @click="()=>{this.viewPM.popCreateWin()}"
                         style="float:right;">创建库/文件</el-button>

              <!--addForm-->
              <assets-register-form   v-if="auth['813']"></assets-register-form>
              <v-gap-iwt></v-gap-iwt>

              <!--sub title-->
              <sub-title class="sub-gap"
                         v-if="auth['813']"
                         v-show="viewData.isPopWin"
                         title="查询">
              </sub-title>

              <!--form-->
              <div class="search-form" >
                <el-form ref="form"
                         size="mini"
                         label-width="92px"
                         label-position="right">

                  <tile-group-iwt :column="3" style="width:100%">

                    <tile-item-iwt>
                      <el-form-item label="IP地址:" class="form-item-pad">
                        <el-input v-model="viewData.searchForm.ip"    ></el-input>
                      </el-form-item>
                    </tile-item-iwt>

                    <tile-item-iwt>
                      <el-form-item label="软件类型:"  class="form-item-pad">
                        <el-select style="width:100%;" v-model="viewData.searchForm.type"
                                   placeholder="--请选择--"    >
                          <el-option v-for="(item,index) in viewData.searchSoftList"
                                     :key="item.key"
                                     :label="item.value"
                                     :value="item.key">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </tile-item-iwt>

                    <tile-item-iwt>
                      <el-form-item label="" class="form-item-pad">
                        <h-group-iwt >
                          <el-button type="primary" size="mini"
                                     style="min-width: 64px;"
                                     @click="viewPM.queryList()">查询</el-button>
                          <h-gap-iwt></h-gap-iwt>
                          <el-button type="warning" size="mini"
                                     style="min-width: 64px;"
                                     @click="viewPM.initSearchForm()">重置</el-button>
                        </h-group-iwt>
                      </el-form-item>
                    </tile-item-iwt>

                  </tile-group-iwt>
                </el-form>
              </div>

              <!--tabale-->
              <div class="auto-view" >
                <el-table
                  border
                  :data="page.sourceList"
                  size="mini"
                  style="width:100%;height:100%;" >

                  <el-table-column prop="softName"  label="软件名称" min-width="100"
                                   :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column  prop="softType" label="软件类型" min-width="74"
                                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column  prop="softVersion"  label="软件版本" min-width="120px"
                                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column  prop="ip"  label="IP" min-width="115px"
                                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column  prop="port"  label="端口" min-width="60px">
                  </el-table-column>
                  <el-table-column  prop="os"  label="操作系统" min-width="150px" >
                  </el-table-column>
                  <el-table-column  prop="spaceSize"  label="空间" min-width="80px" >
                  </el-table-column>
                  <el-table-column  prop="partitionVal"  label="所属分区" min-width="113" >
                  </el-table-column>
                  <el-table-column  prop="clusterName"  label="所属集群" min-width="120"
                                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column  prop="createDate"  label="录入时间" min-width="150">
                  </el-table-column>
                  <el-table-column  prop="creator"  label="录入人" min-width="150">
                  </el-table-column>

                  <el-table-column label="操作" fixed="right" width="120"
                                   v-if="auth['814']||auth['815']" >
                    <template slot-scope="scope">
                      <el-button type="text" size="mini"
                                 :disabled="true"
                                 v-if="auth['814']"
                                 @click="viewPM.popEditeWin(scope.row)" >编辑</el-button>
                      <el-button  type="danger" size="mini"
                                  :disabled="true"
                                  v-if="auth['815']"
                                  @click="viewPM.deleteItem(scope.row)" >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <!--page-->
              <v-gap-iwt></v-gap-iwt>
              <h-group-iwt :hor="'center'" style="width:100%">
                <s-pagination :page="page"
                              @change="(data)=>{this.viewPM.pagePM.pageChange(data)}" ></s-pagination>
              </h-group-iwt>

            </v-group-iwt>

        </div>
      </div>
    </div>

    <!--loading-->
    <s-loading :fixed="true" v-show="page.isLoading || viewData.isLoading"></s-loading>
  </div>
</template>
