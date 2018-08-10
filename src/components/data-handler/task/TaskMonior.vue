<script>
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import TaskMoniorPM from "./TaskMoniorPM" ;
  import Inject from "@/common/model/Inject" ;
  import TaskMoniorHisWin from "./TaskMoniorHisWin" ;

  export default {
    components:{ContentTitle,TaskMoniorHisWin},
    data() {
      this.viewPM = Inject.getClass(TaskMoniorPM)  ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        page:this.viewPM.pagePM.data
      }
    },

    activated() {
      this.viewPM.initView() ;
    },

    filters: {},

    //方法
    methods: {
    }
  }

</script>

<style scoped>
  .sucess-icon{
    font-size:16px;
    color:green;
  }
  .error-icon{
    font-size:18px;
    color:red;
  }
  .stop-icon{
    font-size:16px;
    color:#e7e7e7;
  }
</style>

<template>
  <div class="tj-t-view-inner" >
    <v-group-iwt class="layout">

     <!-- <content-title title="任务监控"></content-title>
      <v-gap-iwt></v-gap-iwt>-->

      <!--form-->
      <div class="search-form">
          <el-form ref="form"
                   size="mini"
                   label-width="110px"
                   label-position="right">

            <h-group-iwt  style="width:100%;">

              <div>
                <el-form-item label="任务名称:" label-width="80px" >
                  <el-input v-model="viewData.searchForm.taskName"  ></el-input>
                </el-form-item>
              </div>

              <!--<tile-item-iwt>-->
                <!--<el-form-item label="执行类型:" -->
                              <!--prop="sourceType" -->
                              <!--style="margin-right: 30px;margin-bottom:5px;">-->
                  <!--<el-select style="width:100%;" -->
                             <!--:disabled="true"-->
                             <!--v-model="viewData.searchForm.sourceType"  -->
                             <!--size="small" placeholder="&#45;&#45;请选择&#45;&#45;"    >-->
                    <!--<el-option v-for="(item,index) in viewData.runType" -->
                               <!--:key="index"-->
                               <!--:label="item.label"-->
                               <!--:value="item.value">-->
                    <!--</el-option>-->
                  <!--</el-select>-->
                <!--</el-form-item>-->
              <!--</tile-item-iwt>-->

              <div>
                <el-form-item label="执行状态:"   label-width="80px">
                  <el-select style="width:100%;"
                             v-model="viewData.searchForm.status"
                             placeholder="--请选择--"    >
                    <el-option v-for="(item,index) in viewData.stateList"
                               :key="index" :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>

              <!--<tile-item-iwt>-->
                <!--<el-form-item label="执行方式:" -->
                              <!--style="margin-right: 30px;margin-bottom:5px;">-->
                  <!--<el-select style="width:100%;"-->
                             <!--:disabled="true"-->
                             <!--v-model="viewData.searchForm.sourceType" -->
                             <!--size="small" placeholder="&#45;&#45;请选择&#45;&#45;"    >-->
                    <!--<el-option v-for="(item,index) in viewData.runType2" :key="index" :label="item.label" :value="item.value">-->
                    <!--</el-option>-->
                  <!--</el-select>-->
                <!--</el-form-item>-->
              <!--</tile-item-iwt>-->

              <div>
                <el-form-item label="最后执行时间:" >
                  <el-date-picker
                    style="width:100%;"
                    v-model="viewData.searchForm.runTime"
                    type="datetimerange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="" label-width="10px">
                  <h-group-iwt style="flex:none;">
                    <el-button type="primary" size="mini" style="min-width: 64px;"
                               @click="viewPM.queryList()" >查询</el-button>
                    <el-button type="warning" size="mini" style="min-width: 64px;"
                               @click="viewPM.initSearchForm(true)" >重置</el-button>
                  </h-group-iwt>
                </el-form-item>
              </div>
            </h-group-iwt>
          </el-form>
      </div>

      <!--tabale-->
      <div class="table-view">
        <div class="table-inner">
          <el-table  border  stripe
                     size="mini"
                     :data="page.sourceList"
                     max-height="100%;"
                     height="100%"
                     style="width:100%;height:100%;" >

            <el-table-column prop="taskName"  label="任务名称" min-width="150"
                             :show-overflow-text="true">
            </el-table-column>
           <!-- <el-table-column  prop="dbName"  label="脚本" width="180">
            </el-table-column>-->
           <!-- <el-table-column  prop="dbName"  label="执行方式" width="180">
            </el-table-column>-->
            <el-table-column  prop="statusName" align="center"  label="状态" width="60">
              <template slot-scope="scope">

                <i v-if="scope.row.status==='0'"
                   class="iconfont tj-tingzhishangbao stop-icon"
                   :title="scope.row.statusName" ></i>

                <i v-else-if="scope.row.status==='1'"
                   class="iconfont tj-duigou1 sucess-icon"
                   :title="scope.row.statusName" ></i>

                <i v-else-if="scope.row.status==='2'"
                      class="iconfont tj-71shibai error-icon"
                      :title="scope.row.statusName" ></i>

                <i v-else-if="scope.row.status==='3'"
                   class="iconfont tj-yunxingzhong sucess-icon"
                   :title="scope.row.statusName" ></i>

                <span v-else>{{scope.row.status}}</span>
              </template>
            </el-table-column>
            <el-table-column  prop="sourceName" label="执行类型" min-width="100" >
            </el-table-column>
            <el-table-column  prop="sourceType"  label="项目名称" min-width="120"
                              :show-overflow-text="true">
            </el-table-column>
            <el-table-column  prop="triggerTime"  label="最后开始时间" width="150">
            </el-table-column>
            <el-table-column  prop="handlerTime"  label="最后结束时间" width="150">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="100"  v-if="auth['514']">
              <template slot-scope="scope">
                <el-button type="text" size="mini"
                           v-if="auth['514']"
                           @click="viewPM.popDetailWin(scope.row)"   >查看详情</el-button>
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

    </v-group-iwt>

    <!--loading-->
    <s-loading v-show="page.isLoading || viewData.isLoading"></s-loading>
    <!--监控详情历史-->
    <task-monior-his-win ></task-monior-his-win>

  </div>
</template>
