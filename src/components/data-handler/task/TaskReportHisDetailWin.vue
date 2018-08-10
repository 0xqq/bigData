<script>
  import TaskReportPM from "./TaskReportPM" ;
  import Inject from "@/common/model/Inject" ;
  import ProcessAPI from "@/common/service/ProcessAPI" ;

    export default {
        data() {
          this.viewPM = Inject.getClass(TaskReportPM) ;
          return {
            viewData:this.viewPM.data,
            isOpen:false,
            orgDetail:[],
            keys:[],
            title:'',
            hostname:'',
            port:'',
            host:''
          }
        },
        computed: {

        },
        mounted() {
          this.getCurrentServerAddress();
        },
        activated() {

        },
        methods: {
          open(items){
            this.title = items.title;
            ProcessAPI.qualityAnalysisReportListGoHeavy({
              id:items.id,
              type:items.type,
              time:items.insertTIme
            }).then(
              (result)=>{
                // console.log(result.resultdata);
                this.orgDetail = result.resultdata;
              },
              ()=>{

              }
            );
            this.isOpen = true;
          },
          closeWin(){
            this.isOpen = false
          },
          //获取当前服务器地址
          getCurrentServerAddress(){
             return location.hostname+':'+location.port;
            // return window.location.href + document.location + document.location.host;
          },
          //下载
          downLoad(item){
            let URL = this.getCurrentServerAddress();
            //console.log(URL);
             let aUrl = 'http://'+URL+'/app/api/dataGovernance/downLoad?id='+item.id;
             console.log(aUrl);
           /* window.open(url,'_blank');*/
            let url = 'http://192.168.58.105:28080/app/api/dataGovernance/downLoad?id='+item.id;
            window.open(url,'_blank');
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
        overflow: hidden;
        .table-text{

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
  <s-window :title="title"
            @close="()=>{this.closeWin()}"
            :visible="isOpen"
            :width="'730px'"
            :height="'400px'">
    <div class="container">
      <v-group-iwt class="layout">
        <div class="table-view">
          <!--列表内容 table-->
          <div class="table-text">
            <el-table
              border
              :data="orgDetail"
              size="mini"
              min-weight="100%"
              max-height="300">
              <el-table-column type="index"  label="序号">
              </el-table-column>
              <el-table-column  prop="qFields" label="异常列">
              </el-table-column>
              <el-table-column  prop="qValue" label="记录">
              </el-table-column>
              <el-table-column  prop="sumerro" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="downLoad(scope.row)">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <v-gap-iwt></v-gap-iwt>
        <h-group-iwt :hor="'center'" class="footer">
          <el-button type="warning" @click="closeWin">取消</el-button>
        </h-group-iwt>
      </v-group-iwt>
    </div>
  </s-window>
</template>
