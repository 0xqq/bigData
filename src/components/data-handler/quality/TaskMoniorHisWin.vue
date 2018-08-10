<script>
  import ProcessAPI from "@/common/service/ProcessAPI" ;
  import PagePm from "@/common/model/PagePm";
  import TaskMoniorHisDetailWin from "./TaskMoniorHisDetailWin" ;
  import NormalUtils from "../../../common/utils/NormalUtils";
  import TaskMoniorPM from "./TaskMoniorPM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    components:{
      TaskMoniorHisDetailWin},
    data() {
      this.viewPM = Inject.getClass(TaskMoniorPM) ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        page:this.viewPM.detailPM.data
      }
    },

    mounted(){

    },
    methods:{
      showDetail(item){
         this.$refs.detailWin.open(item) ;
      },
      hdstartTime(row,column){
        //JJJJ
        let num = row.startTime;
        return NormalUtils.dateFormat(parseInt(num))
      },
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
            @close="()=>{this.viewData.isPopDetail=false;}"
            :visible="viewData.isPopDetail"
            :width="'720px'"
            :height="'520px'" >
    <div class="container">
      <v-group-iwt class="layout">
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
              <el-table-column
                prop="startTime"
                label="任务开始时间"
                :formatter = "hdstartTime"
                min-width="150">
              </el-table-column>
              <el-table-column  prop="endTime" label="任务结束时间" :formatter = "hdstartTime" min-width="150">
              </el-table-column>
              <el-table-column  prop="status"  label="状态" min-width="180"  v-if="auth['515']">
                <template slot-scope="scope">
                  {{scope.row.status === '1' ?'成功':(scope.row.status === '2'?'失败':'正在运行')}}
                </template>
              </el-table-column>
              <!--<el-table-column label="操作" width="85" >
                <template slot-scope="scope">
                  <el-button  type="text"
                              size="mini"
                              v-if="auth['515']"
                              @click="showDetail(scope.row)" >查看日志</el-button>
                </template>
              </el-table-column>-->
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
                         @size-change="(val)=>{this.viewPM.detailPM.pageSizeChange(val)}"
                         @current-change="(val)=>{this.viewPM.detailPM.currentPageChange(val)}">
          </el-pagination>
        </h-group-iwt>

      </v-group-iwt>
    </div>
    <!--loading-->
    <s-loading v-show="page.isLoading"></s-loading>


    <!--日志-->
    <task-monior-his-detail-win ref="detailWin"></task-monior-his-detail-win>

  </s-window>
</template>

