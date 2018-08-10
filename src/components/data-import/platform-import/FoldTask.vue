<script>

  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import FoldTaskPM from "./FoldTaskPM" ;
  import FileConfigWin from "./import-comps/FileConfigWin";
  import Inject from "@/common/model/Inject" ;
  import FoldTaskForm from "./FoldTaskForm";
  import SubTitle from "@/common/comps/normal/SubTitle";
  import ConstManager from "@/common/manager/ConstManager" ;

  export default {
    components:{ FoldTaskForm,  FileConfigWin, ContentTitle,SubTitle},
    data() {
      this.viewPM = Inject.getClass( FoldTaskPM )   ;
      this.pagePM = this.viewPM.pagePM ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        page:this.pagePM.data
      }
    },
    mounted() {
      this.viewPM.initView() ;
    },
    methods: {

      /**
       * 弹出设置周期窗口
       * @param item
       */
      popConfigWin(item){
        this.$refs["configWin"].open(item,"file") ;
      }
    }
  }

</script>
<style scoped>
</style>
<template>
  <div class="tj-t-auto-inner" >
    <v-group-iwt class="layout">

      <!--addForm-->
      <fold-task-form v-if="auth['322']"></fold-task-form>

      <!--sub title-->
      <sub-title class="sub-gap"
                 v-if="auth['322']"
                 v-show="viewData.isPopWin"
                 title="查询">
      </sub-title>

      <!--form-->
      <div class="search-form" >
        <el-form ref="form"
                 size="mini"
                 label-width="80px"
                 label-position="right">

          <tile-group-iwt :column="2" style="width:100%">

            <tile-item-iwt>
              <el-form-item label="任务名称:" class="form-item-pad">
                <el-input v-model="viewData.searchForm.jobName"    ></el-input>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="部门名称:"  class="form-item-pad">
                <s-org-select v-model="viewData.searchForm.orgId"></s-org-select>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="资源名称:" prop="dataResourceName"  class="form-item-pad">
                <el-input v-model="viewData.searchForm.dataResourceName"   ></el-input>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="主题:" prop="sensitiveLevel" class="form-item-pad">
                <el-select style="width:100%;" v-model="viewData.searchForm.theme"   placeholder="--请选择--"    >
                  <el-option v-for="(item,index) in viewData.themeList" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="创建时间:" prop="startTime"  class="form-item-pad">
                <el-date-picker v-model="viewData.searchForm.createTime"
                                type="datetimerange"
                                style="width:100%"   value-format="yyyy-MM-dd HH:mm:ss"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                </el-date-picker>
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
                             @click="viewPM.initSearchForm(true)">重置</el-button>
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

            <el-table-column prop="jobName"  label="任务名称" min-width="100"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  title=""
                  width="200"
                  trigger="hover"
                  :disabled="scope.row.description?false:true"
                  :content="scope.row.description">
                  <span slot="reference" >
                    {{scope.row.jobName}}
                  </span>
                </el-popover>
              </template>

            </el-table-column>
            <el-table-column  prop="orgName" label="部门名称" min-width="74"
                              :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column  prop="dataResourceName"  label="资源名称" min-width="120px"
                              :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column  prop="sourceIp"  label="文件源地址" min-width="150px"
                              :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column  prop="resourceId"  label="文件源路径" min-width="150px">
            </el-table-column>
            <el-table-column  prop="hostAddress"  label="目标地址" min-width="150px" >
            </el-table-column>
            <el-table-column  prop="sinkResourceId"  label="目标路径" min-width="150px" >
            </el-table-column>
            <el-table-column  prop="createdBy"  label="创建人" min-width="100" >
            </el-table-column>
            <el-table-column  prop="createdDate"  label="创建时间" min-width="150">
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="230"
                             v-if="auth['326'] || auth['327'] ||auth['323']||auth['325']||auth['324']" >
                <template slot-scope="scope">
                  <el-button type="text"
                             size="mini"
                             v-if="auth['326'] && (scope.row.startStatus+'')!=='执行中'"
                             :disabled="scope.row.canRun===false"
                             @click="viewPM.changeJobState(scope.row,true)">启动</el-button>
                  <el-button type="text"
                             size="mini"
                             v-if="auth['327'] && (scope.row.startStatus+'')==='执行中'"
                             @click="viewPM.changeJobState(scope.row,false)">停止</el-button>
                  <el-button type="text" size="mini"
                             v-if="auth['323']"
                             :disabled="scope.row.canEdit===false"
                             @click="viewPM.popEditeWin(scope.row)" >编辑</el-button>
                  <el-button type="text"  size="mini"
                             v-if="auth['325']"
                             :disabled="scope.row.canConfig===false"
                             @click="popConfigWin(scope.row)">设置周期</el-button>
                  <el-button  type="danger" size="mini"
                              v-if="auth['324']"
                              :disabled="scope.row.canDel===false"
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

    <!--loading-->
    <s-loading :fixed="true" v-show="page.isLoading || viewData.isLoading"></s-loading>
    <!--配置周期-->
    <file-config-win  ref="configWin"
                @submit="()=>{this.viewPM.reQuery();}">
    </file-config-win>

  </div>
</template>


