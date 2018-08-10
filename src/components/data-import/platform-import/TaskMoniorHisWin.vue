<script>
  import DataImportAPI from "@/common/service/DataImportAPI" ;
  import PagePm from "@/common/model/PagePm";
  import TaskMoniorHisDetailWin from "./TaskMoniorHisDetailWin" ;

  export default {
    components:{
      TaskMoniorHisDetailWin},
    data() {
      this.pagePM = new PagePm(DataImportAPI.queryTaskMoniorDetail) ;
      return {
        auth:AuthManager.has,
        isOpen:false ,
        page:this.pagePM.data,
        //清空查询条件
        searchForm:{
          syncJobId: ""
        },
        fileStyle:''
      }
    },

    mounted(){

    },
    methods:{

      /**
       * 打开窗口
       */
      open(item){
        this.fileStyle = item.dataStyle;
        console.log(this.fileStyle);
        this.searchForm.syncJobId = item.id ;
        this.queryList();
        this.isOpen = true;
      },

      closeWin(){
        this.isOpen = false;
      },
      queryList(){
        this.pagePM.queryList(this.searchForm) ;
      },
      showDetail(item){
        Object.assign(item,{dataStyle:this.fileStyle});
         this.$refs.detailWin.open(item) ;
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
        <div class="table-view">
          <div class="table-inner">
            <el-table
              border
              :data="page.sourceList"
              size="mini"
              max-height="100%"
              height="100%"
              style="width:100%;height:100%" >
              <el-table-column prop="beginTime"  label="任务开始时间" min-width="150">
              </el-table-column>
              <el-table-column  prop="endTime" label="任务结束时间" min-width="150">
              </el-table-column>
              <el-table-column  prop="syncState"  label="任务状态" min-width="80">
              </el-table-column>

              <el-table-column  prop="times"  :label=" fileStyle === 'mysql'?'表数（张）/条数（条）':'文件数（个）/空间数（字节）'" min-width="180">
                <template slot-scope="scope">
                   <span>{{(scope.row.totalSyncedNum?scope.row.totalSyncedNum:0)+"/"+scope.row.totalSynced}}</span>
                </template>
              </el-table-column>


              <el-table-column label="操作" width="85" >
                <template slot-scope="scope">
                  <el-button  type="text"
                              size="mini"
                              v-show="auth['332']"
                              @click="showDetail(scope.row)" >查看日志</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <v-gap-iwt></v-gap-iwt>
        <!--page-->
        <h-group-iwt :hor="'center'" class="auto-layout">
          <s-pagination :page="page"
                        @change="(data)=>{this.pagePM.pageChange(data)}" ></s-pagination>
        </h-group-iwt>

      </v-group-iwt>
    </div>
    <!--loading-->
    <s-loading v-show="page.isLoading"></s-loading>


    <!--日志-->
    <task-monior-his-detail-win ref="detailWin"></task-monior-his-detail-win>

  </s-window>
</template>

