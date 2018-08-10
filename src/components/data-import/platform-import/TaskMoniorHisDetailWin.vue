<script>
  import DataImportAPI from "@/common/service/DataImportAPI" ;
  import PagePm from "@/common/model/PagePm" ;

  export default {
    data() {
      this.pagePM = new PagePm(DataImportAPI.queryTaskHistory) ;
      return {
        isOpen:false ,
        syncJobId:"",
        page:this.pagePM.data,
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
        console.log(item);
        this.fileStyle = item.dataStyle;
        this.syncJobId = item.id ;
        this.queryList();
        this.isOpen = true;
      },
      closeWin(){
        this.isOpen = false;
      },
      queryList(){
        this.pagePM.queryList({syncJobId:this.syncJobId}) ;
      }
    }
  }

</script>

<style scoped lang="scss">
  .container{
    @include abs-group(0,10px,15px,0) ;
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
  <s-window title="任务监控-查看日志"
            @close="()=>{this.closeWin()}"
            :visible="isOpen"
            :width="'750px'"
            :height="'520px'"  >
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
              <el-table-column prop="beginTime"  label="任务开始时间" min-width="150px" >
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true"
                               prop="dataResourceName" label="表名/文件名"  min-width="150px"  >
              </el-table-column>

             <!-- <el-table-column  prop="totalSync"  label="应传送条数(条)/大小（字节）"   min-width="150px" >
              </el-table-column>-->

              <el-table-column  prop="totalSync"  :label="fileStyle === 'file'? '应传送大小（字节）':' 应传送条数(条)'"   min-width="150px" >
              </el-table-column>


              <!--<el-table-column  prop="totalSynced"  label="实际传送条数（条）/大小（字节）"  min-width="150px"  >
              </el-table-column>-->

              <el-table-column  prop="totalSynced"  :label="fileStyle === 'file'? '实际传送大小（字节）':' 实际传送条数(条)'"  min-width="150px"  >
              </el-table-column>

            </el-table>
          </div>
        </div>
        <!--page-->
        <h-group-iwt :hor="'center'" class="auto-layout">
          <s-pagination :page="page"
                        @change="(data)=>{this.pagePM.pageChange(data)}" ></s-pagination>
        </h-group-iwt>
      </v-group-iwt>
    </div>
    <!--loading-->
    <s-loading v-show="page.isLoading"></s-loading>
  </s-window>
</template>

