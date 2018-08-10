<script>
  import OtherAssetsMonitorAnalyzePM from "./OtherAssetsMonitorAnalyzePM" ;
  import Inject from "@/common/model/Inject" ;
  import PlatformAssetsAPI from "@/common/service/PlatformAssetsAPI" ;

  export default {
    components:{},
    data() {
      //a
      this.viewPM = Inject.getClass(OtherAssetsMonitorAnalyzePM) ;
      return {
        viewData:this.viewPM.data,
        page:this.viewPM.detailPMOrg.data,
        isOpen:false,
        orgDetail:[],
        orgNameDetail:''
      }
    },

    mounted(){

    },
    methods:{
      open(item){
        this.orgNameDetail = item;
        PlatformAssetsAPI.queryClusterOrgdetail({
          orgName:item,
          partition:3
        }).then(
          (result)=>{
            this.orgDetail = result.resultdata.softInfo;
          },
          ()=>{

          }
        );
        this.isOpen = true;
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
  <s-window :title="orgNameDetail"
            @close="()=>{this.closeWin()}"
            :visible="isOpen"
            :width="'720px'"
            :height="'400px'" >
    <div class="container">
      <v-group-iwt class="layout">
        <!--tabale-->
        <div class="table-view">
          <div class="table-inner">
            <el-table
              border
              :data="orgDetail"
              size="mini"
              max-height="100%"
              height="100%"
              style="width:100%;height:100%;" >
              <el-table-column type="index"  label="序号" min-width="150">
              </el-table-column>
              <el-table-column  prop="ip" label="IP" min-width="150">
              </el-table-column>
              <el-table-column  prop="softName" label="软件名称" min-width="150">
              </el-table-column>
              <!--<el-table-column  prop="" label="COL2" min-width="150">
              </el-table-column>-->
            </el-table>
            <!--<el-table
              border
              :data="orgDetail"
              size="mini"
              max-height="100%"
              height="50%"
              style="width:100%;height:100%;" >
              <el-table-column type="index"  label="序号" min-width="150">
              </el-table-column>
              &lt;!&ndash;<el-table-column  prop="clusterName" label="Cluster" min-width="150">
              </el-table-column>&ndash;&gt;
              <el-table-column  prop="softName" label="软件名称" min-width="150">
              </el-table-column>
              &lt;!&ndash;<el-table-column  prop="" label="COL2" min-width="150">
              </el-table-column>&ndash;&gt;
            </el-table>-->
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
          <el-button type="warning" @click="closeWin">取消</el-button>
        </h-group-iwt>
      </v-group-iwt>
    </div>
    <!--loadingss-->
    <s-loading v-show="page.isLoading"></s-loading>



  </s-window>
</template>

