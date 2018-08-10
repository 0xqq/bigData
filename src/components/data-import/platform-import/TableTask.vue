<script>

  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import TableTaskForm from "./TableTaskForm" ;
  import TableTaskPM from "./TableTaskPM" ;
  import Inject from "@/common/model/Inject" ;
  import ConfigWin from "./import-comps/ConfigWin";
  import SubTitle from "@/common/comps/normal/SubTitle";
  import TableTaskDetailWin from "./TableTaskDetailWin" ;

  export default {
    components:{
      SubTitle,
      ConfigWin, ContentTitle,  TableTaskForm,TableTaskDetailWin},
    data() {
      this.viewPM = Inject.getClass( TableTaskPM )  ;
      this.pagePM = this.viewPM.pagePM ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        page:this.pagePM.data,
        detailInfo:""
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
        this.$refs["configWin"].open(item,"db") ;
      }
    }
  }

</script>

<style scoped >
  .search-btn{
    margin-left:110px;
  }
</style>
<template>
  <div class="tj-t-auto-inner" >
    <v-group-iwt class="layout">

      <!--addForm-->
      <table-task-form v-if="auth['313']"></table-task-form>

      <!--sub title-->
      <sub-title class="sub-gap"
                 v-if="auth['313']"
                 v-show="viewData.isPopWin"
                 title="查询">
      </sub-title>

      <!--form-->
      <div class="search-form" >
        <el-form ref="form"
                 size="mini"
                 :model="viewData.searchForm"
                 label-width="110px"
                 label-position="right">

          <tile-group-iwt :column="2" style="width:100%">

            <tile-item-iwt>
              <el-form-item label="任务名称:"  class="form-item-pad">
                <el-input v-model="viewData.searchForm.jobName"    ></el-input>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="部门名称:"   class="form-item-pad">
                <s-org-select v-model="viewData.searchForm.orgId" ></s-org-select>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="主题:"   class="form-item-pad">
                <el-select style="width:100%;" v-model="viewData.searchForm.theme"   placeholder="--请选择--"    >
                  <el-option v-for="(item,index) in viewData.themeList"
                             :key="index"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="资源名称:"  class="form-item-pad">
                <el-input v-model="viewData.searchForm.dataResourceName"    ></el-input>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="创建时间:" prop="createTime"  class="form-item-pad">
                <el-date-picker v-model="viewData.searchForm.createTime"
                                type="datetimerange"
                                style="width:100%;"  value-format="yyyy-MM-dd HH:mm:ss"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label=""  class="form-item-pad">
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
            min-height="300px"
            style="width:100%;height:100%" >

            <el-table-column prop="jobName"
                             label="任务名称"
                             min-width="120"
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
            <el-table-column prop="orgName"  label="部门名称" min-width="120" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="dataResourceName"  label="资源名称" min-width="150" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column  prop="dataStyle" label="数据类型" min-width="74">
            </el-table-column>
            <el-table-column  prop="hostAddress"  label="主机地址" min-width="110">
            </el-table-column>
            <el-table-column  prop="createdBy"  label="创建人" min-width="90" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column  prop="createdDate"  label="创建时间" min-width="150">
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="230"
                             v-if="auth['317'] || auth['318'] ||auth['314']||auth['319']||auth['316']||auth['315']" >
              <template slot-scope="scope">
                <el-button type="text"
                           size="mini"
                           v-if="auth['317'] && (scope.row.startStatus+'')!=='执行中'"
                           :disabled="scope.row.canRun===false"
                           @click="viewPM.changeJobState(scope.row,true)">启动</el-button>

                <el-button type="text"
                           size="mini"
                           v-if="auth['318'] && (scope.row.startStatus+'')==='执行中'"
                           @click="viewPM.changeJobState(scope.row,false)">停止</el-button>

                <el-button type="text"
                           size="mini"
                           v-if="auth['314']"
                           v-show="scope.row.canEdit"
                           @click="viewPM.editClickHandler(scope.row)" >编辑</el-button>
                <el-button type="text"
                           size="mini"
                           v-if="auth['319']"
                           v-show="scope.row.canEdit===false"
                           @click="viewPM.editClickHandler(scope.row)" >查看</el-button>
                <el-button type="text"  size="mini"
                           v-if="auth['316']"
                           :disabled="scope.row.canConfig===false"
                           @click="popConfigWin(scope.row)">设置周期</el-button>
                <el-button  type="danger" size="mini"
                            v-if="auth['315']"
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
    <s-loading :fixed="true" v-show="viewData.isLoading || page.isLoading"></s-loading>

    <!--配置周期-->
    <config-win ref="configWin"
                @submit="()=>{this.viewPM.reQuery();}">
    </config-win>

    <!--详情窗口-->
    <table-task-detail-win></table-task-detail-win>
  </div>
</template>


