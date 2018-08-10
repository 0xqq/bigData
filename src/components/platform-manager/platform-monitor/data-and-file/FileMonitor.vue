<script>
  import Inject from "@/common/model/Inject" ;
  import DataFileMonitorPM from "../DataFileMonitorPM" ;

  export default {
    data() {
      this.viewPM = Inject.getClass(DataFileMonitorPM) ;
      this.pagePM = this.viewPM.filePagePM ;
      return {
        viewData:this.viewPM.data,
        page:this.pagePM.data
      }
    },
    computed: {},
    mounted() {
    },
    activated() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .container{
    @include abs-group();

    .table-view{
      @include abs-group(0,0,0,50px);
    }
    .page-view{
      @include abs-group(0,false,0,0);
      height:50px;
    }
  }
</style>

<template>
  <div class="container" >
    <div class="table-view">
      <el-table
        border
        :data="page.sourceList"
        size="mini"
        min-height="100%"
        @row-click="(row)=>{this.viewPM.itemNodeClick(row)}"
        style="width:100%;height:100%" >
        <el-table-column prop="clusterName"  label="集群名称" min-width="120" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="ip"  label="节点IP" min-width="150" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column  prop="cpu" label="CUP负载" min-width="74">
        </el-table-column>
        <el-table-column  prop="usedMemory"  label="内存使用" min-width="110">
        </el-table-column>
        <el-table-column  prop="usedDisk"  label="磁盘使用" min-width="90" :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
    </div>

    <h-group-iwt :hor="'center'" class="page-view">
      <el-pagination background
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="page.totalIndex"
                     :page-sizes="page.pageSizes"
                     :page-size="page.pageSize"
                     @size-change="(val)=>{this.pagePM.pageSizeChange(val)}"
                     @current-change="(val)=>{this.pagePM.currentPageChange(val)}">
      </el-pagination>
    </h-group-iwt>

    <s-loading v-show="page.isLoading "></s-loading>
  </div>
</template>
