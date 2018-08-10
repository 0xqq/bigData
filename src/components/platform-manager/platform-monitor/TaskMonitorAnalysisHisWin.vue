<script>
  import TaskMonitorAnalysisDetailWin from "./TaskMonitorAnalysisDetailWin" ;
  import TaskMonitorPM from "./TaskMonitorPM" ;
  import Inject from "@/common/model/Inject" ;
  import AnalysisAPI from "@/common/service/AnalysisAPI";

  export default {
    components:{TaskMonitorAnalysisDetailWin},
    data() {
      this.viewPM = Inject.getClass(TaskMonitorPM) ;
      return {
        viewData:this.viewPM.data,
        page:this.viewPM.detailPMAN.data,
        isOpen:false
      }
    },
    mounted(){

    },
    activated() {
      this.viewPM.initData();
    },
    methods:{
      open(item){
       this.viewPM.queryDetailListAN(item);
        this.isOpen =true;
      },
      showDetail(item){
         this.$refs.detailWin.open(item) ;
      },
      closeWin(){
        this.isOpen = false;
      }
    }
  }

</script>

<style scoped lang="scss">
  .container{
    @include abs-group(10px,10px,10px,10px) ;
    .layout{
      @include abs-group( ) ;
      .table-view{
        flex:auto;
        overflow: auto;
        position:relative ;
        .table-inner{
          @include abs-group( ) ;
        }
      }
    }
  }
  .auto-layout{
    width:100%;
  }
</style>

<template>
  <s-window title="任务监控-查看详情"
            @close="()=>{this.closeWin()}"
            :visible="isOpen"
            :width="'720px'"
            :height="'520px'" >
    <div class="container">
      <v-group-iwt class="layout">
        <!--tabale-->
        <div class="table-view" style="width: 100%">
          <div class="table-inner">
            <el-table
              border
              :data="page.sourceList"
              size="mini"
              max-height="100%"
              height="100%"
              style="width:100%;height:100%" >
              <el-table-column prop="publishStartTime"  label="任务开始时间" min-width="150">
              </el-table-column>
              <el-table-column  prop="publishEndTime" label="任务结束时间" min-width="150">
              </el-table-column>
              <el-table-column  prop="publishSyncStatus"  label="状态" min-width="180">
                <template slot-scope="scope">
                  <i v-if="scope.row.publishSyncStatus==='0'"
                     class="iconfont tj-tingzhishangbao stop-icon"
                     :title="scope.row.statusName" >未运行</i>
                  <i v-else-if="scope.row.publishSyncStatus==='1'"
                     class="iconfont tj-duigou1 sucess-icon"
                     :title="scope.row.statusName" >运行中</i>
                  <i v-else-if="scope.row.publishSyncStatus==='2'"
                     class="iconfont tj-71shibai error-icon"
                     :title="scope.row.statusName" >成功停止</i>
                  <i v-else-if="scope.row.publishSyncStatus==='3'"
                     class="iconfont tj-yunxingzhong sucess-icon"
                     :title="scope.row.publishSyncStatus" >报错停止</i>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="85" >
                <template slot-scope="scope">
                  <el-button  type="text"
                              size="mini"
                              @click="showDetail(scope.row)" >查看日志</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <v-gap-iwt></v-gap-iwt>
        <!--page-->

        <h-group-iwt :hor="'center'" style="width:100%">
          <el-pagination background
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="page.totalIndex"
                         :page-sizes="page.pageSizes"
                         :page-size="page.pageSize"
                         @size-change="(val)=>{this.viewPM.detailPMAN.pageSizeChange(val)}"
                         @current-change="(val)=>{this.viewPM.detailPMAN.currentPageChange(val)}">
          </el-pagination>
        </h-group-iwt>

      </v-group-iwt>
    </div>
    <!--loading-->
    <s-loading v-show="page.isLoading"></s-loading>


    <!--日志-->
   <task-monitor-analysis-detail-win ref="detailWin"></task-monitor-analysis-detail-win>

  </s-window>
</template>

