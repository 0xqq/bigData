<script>
  import ProcessAPI from "@/common/service/ProcessAPI" ;
  import PagePm from "@/common/model/PagePm";
  import NormalUtils from "../../../common/utils/NormalUtils";
  import OldAssetsMonitorPM from "./OldAssetsMonitorPM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    components:{},
    data() {
      this.viewPM = Inject.getClass(OldAssetsMonitorPM) ;
      return {
        viewData:this.viewPM.data,
        page:this.viewPM.detailPM.data,
        pageSw:this.viewPM.detailPMSwName.data
      }
    },

    mounted(){

    },
    methods:{
      //
      showDetail(item){
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
        width:100%;
        overflow: auto;
        position:relative ;
        .table-inner{
          @include abs-group( ) ;
        }
      }
    }
    .footer{
      width:100%;
    }
  }
  .auto-layout{
    width:100%;
  }
</style>

<template>
  <s-window :title="viewData.ipTitle"
            @close="()=>{this.viewData.isPopDetail=false;}"
            :visible="viewData.isPopDetail"
            :width="'720px'"
            :height="'400px'" >
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
              height="50%"
              style="width:100%;height:100%;" >
              <el-table-column type="index"  label="序号" min-width="150">
              </el-table-column>
              <el-table-column  prop="name" label="部门名称" min-width="150">
              </el-table-column>
            </el-table>
            <el-table
              border
              :data="pageSw.sourceList"
              size="mini"
              max-height="100%"
              height="50%"
              style="width:100%;height:100%;" >
              <el-table-column type="index"  label="序号" min-width="150">
              </el-table-column>
              <el-table-column  prop="name" label="软件名称" min-width="150">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <v-gap-iwt></v-gap-iwt>
        <!--page-->
        <!--<h-group-iwt :hor="'center'" class="auto-layout">
          <s-pagination :page="page"
                        @change="(data)=>{this.viewPM.detailPM.pageChange(data)}" ></s-pagination>
        </h-group-iwt>-->
        <h-group-iwt :hor="'center'" class="footer">
          <!--<el-button type="primary" @click="">保存</el-button>-->
          <el-button type="warning" @click="()=>{this.viewPM.closeWin()}">取消</el-button>
        </h-group-iwt>
      </v-group-iwt>
    </div>
    <!--loadingss-->
    <s-loading v-show="page.isLoading"></s-loading>



  </s-window>
</template>

