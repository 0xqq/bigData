<script>
    import AssetsAssignPM from "./AssetsAssignPM" ;
    import Inject from "@/common/model/Inject" ;
    import AssetsAssignForm from "./AssetsAssignForm" ;
    import ContentTitle from "@/common/comps/normal/ContentTitle" ;
    import SubTitle from "@/common/comps/normal/SubTitle";

    export default {
        components:{
          AssetsAssignForm,ContentTitle,SubTitle},
        data() {
          this.viewPM = Inject.getClass(AssetsAssignPM) ;
            return {
              auth:AuthManager.has,
              viewData:this.viewPM.data,
              page:this.viewPM.pagePM.data
            }
        },
        mounted() {
        },
        activated() {
          this.viewPM.initView();
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
                       size="mini"
                       v-if="auth['817']"
                       @click="()=>{this.viewPM.popCreateWin()}"
                       style="float:right;">分配软件</el-button>

              <!--addForm-->
              <assets-assign-form    v-if="auth['817']"></assets-assign-form>
              <v-gap-iwt></v-gap-iwt>

              <!--sub title-->
              <sub-title class="sub-gap"
                         v-if="auth['817']"
                         v-show="viewData.isPopWin"
                         title="查询">
              </sub-title>

              <!--form-->
              <div class="search-form" >
                <el-form ref="form"
                         size="mini"
                         label-width="100px"
                         label-position="right">

                  <tile-group-iwt :column="3" style="width:100%">

                    <tile-item-iwt>
                      <el-form-item label="租户名称:" class="form-item-pad">
                        <el-autocomplete  style="width:100%;height:30px;"
                                          placeholder="租户名称"
                                          v-model="viewData.searchForm.tName"
                                          :fetch-suggestions="(str,cb)=>{this.viewPM.queryTnameKeyInfo(str,cb);}" >
                        </el-autocomplete>
                      </el-form-item>
                    </tile-item-iwt>

                    <tile-item-iwt>
                      <el-form-item label="软件名称:"  class="form-item-pad">
                          <el-autocomplete  style="width:100%;height:30px;"
                                            placeholder="请输入软件名称"
                                            v-model="viewData.searchForm.softName"
                                            :fetch-suggestions="(str,cb)=>{this.viewPM.querySoftKeyInfo(str,cb);}" >
                          </el-autocomplete>
                      </el-form-item>
                    </tile-item-iwt>


                    <tile-item-iwt>
                      <el-form-item label="软件类型:"  class="form-item-pad">
                        <el-select style="width:100%;" v-model="viewData.searchForm.rsType"
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
                      <el-form-item label="所属分区:"  class="form-item-pad">
                        <el-select style="width:100%;" v-model="viewData.searchForm.sourcePartition"
                                   placeholder="--请选择--"    >
                          <el-option label="原始区" value="1"></el-option>
                          <el-option label="处理区" value="2"></el-option>
                          <el-option label="分析区" value="3"></el-option>
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
              <div class="auto-view">
                <el-table
                  border
                  :data="page.sourceList"
                  size="mini"
                  style="width:100%;min-height:200px" >
                  <el-table-column prop="tName"  label="租户名称" min-width="100"
                                   :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column  prop="softName" label="软件名称" min-width="74"
                                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column  prop="rsName"  label="库/目录名称" min-width="120px"
                                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column  prop="rsType"  label="软件类型" min-width="120px"
                                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column  prop="sourcePartitionValue"  label="所属分区" min-width="100px"
                                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column  prop="trDesc"  label="描述"
                                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column label="操作" fixed="right" width="120"
                                   v-if="auth['818'] || auth['819']">
                    <template slot-scope="scope">
                      <el-button type="text" size="mini"
                                 :disabled="true"
                                 v-if="auth['818']"
                                 @click="viewPM.popEditeWin(scope.row)" >编辑</el-button>
                      <el-button  type="danger" size="mini"
                                  :disabled="true"
                                  v-if="auth['819']"
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
    <s-loading v-show="page.isLoading || viewData.isLoading"></s-loading>
  </div>
</template>
