<script>
  import OtherAssetsMonitorAnalyzePM from "./OtherAssetsMonitorAnalyzePM" ;
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import Inject from "@/common/model/Inject" ;
  import OtherAssetsMonitorAnalyzeIpDetail from "./OtherAssetsMonitorAnalyzeIpDetail";
  import OtherAssetsMonitorAnalyzeOrgDetail from "./OtherAssetsMonitorAnalyzeOrgDetail";


  export default {
    components:{ ContentTitle,OtherAssetsMonitorAnalyzeIpDetail,OtherAssetsMonitorAnalyzeOrgDetail},
    data() {
      this.viewPM = Inject.getClass(OtherAssetsMonitorAnalyzePM);
      // console.log(this.viewPM.pagePM.data);
      return {
        viewData:this.viewPM.data,
        page:this.viewPM.pagePM.data,
        pageSW:this.viewPM.pagePMSW.data,
        pageDM:this.viewPM.pagePMDM.data,
        activeName:'ip',
        isShow:false,
        pageDmDetail:[]
      }
    },
    computed: {

    },
    mounted() {
      this.viewPM.initView();

    },
    activated() {

    },
    methods: {
      handleClick(tab,event) {
        this.activeName = tab.name;
        if(tab.name === 'ip'){
          this.viewData.searchForm.ip = '';
          this.viewData.searchForm.softName = '';
          this.viewData.searchForm.orgName = '';
          this.viewPM.pagePM.queryList(this.viewData.searchForm);

        }else if(tab.name=== 'software'){
          this.viewData.searchForm.ip = '';
          this.viewData.searchForm.softName = '';
          this.viewData.searchForm.orgName = '';
          this.viewPM.pagePMSW.queryList(this.viewData.searchForm);
        }else if(tab.name=== 'department'){
          this.viewData.searchForm.ip = '';
          this.viewData.searchForm.softName = '';
          this.viewData.searchForm.orgName = '';
          this.viewPM.pagePMDM.queryList(this.viewData.searchForm);
        }
      },
      //添加任务弹出框显示与隐藏a
      addSearchForm(item){
        this.$refs.orgDetail.open(item) ;
      }
    }
  }
</script>

<style scoped lang="scss">
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

  .container{
    @include abs-group();

    .layout{
      @include abs-group(10px,10px,10px,10px) ;
    }

    .chart-view {
      width:100%;
      flex:none;
      height:220px;
      background-color: #fff;
      .task-echart{
        margin: 0;
        padding: 0;
        background: #fff;
        width: 100%;
        height: 220px;
        display: flex;
        justify-content: space-between;
        div{
          width: 33%;
          height: 100%;
          border:1px solid #d3d3d3;
        }
      }
    }

    .nav-view{
      @include tab-card() ;
      margin-top: 10px;
      position:relative;
      .nav-inner{
        @include abs-group(0,0,0,-2px) ;
        overflow: hidden;
      }
      .head-nav-control{
        @include abs-group(false,0,10px,0) ;
      }
    }

    .nav-content{
      @include tab-content() ;
      flex:auto;
      width:100%;
      box-sizing:border-box;
      position:relative;

      .table-view{
        @include abs-group(0,0,0,30px) ;
      }
      .page-view{
        @include abs-group(0,false,0,0) ;
        height:30px;
      }
    }
  }
</style>

<template>
  <div class="container" style="margin-top: 40px">

    <v-group-iwt class="layout">
      <!--tab也签切换-->
      <div class="nav-view">
        <div class="nav-inner">
          <el-tabs v-model="viewData.currentView"
                   type="border-card"
                   @tab-click="handleClick">
            <el-tab-pane label=" IP" name="ip" >
              <span slot="label"><i class="iconfont tj-biaoge iconbtn"></i> IP</span>
            </el-tab-pane>
            <el-tab-pane label=" 软件" name="software" >
              <span slot="label"><i class="iconfont tj-weibiaoti5 iconbtn"></i> 软件</span>
            </el-tab-pane>
            <el-tab-pane label=" 部门" name="department" >
              <span slot="label"><i class="iconfont tj-weibiaoti5 iconbtn"></i> 部门</span>
            </el-tab-pane>
          </el-tabs>
          <!--IP查询与重置-->
          <h-group-iwt class="head-nav-control" v-show="this.activeName === 'ip'">
            <el-input v-model="viewData.searchForm.ip"
                      size="mini"
                      placeholder="请输入关键字" style="margin-right: 5px;width: 250px">
              <template slot="prepend">IP</template>
            </el-input>
            <el-button type="primary"
                       size="mini" @click="viewPM.queryList()">查询</el-button>

            <el-button type="primary"
                       size="mini" @click="viewPM.initSearchForm(true)">重置</el-button>
          </h-group-iwt>
          <!--软件查询与重置-->
          <h-group-iwt class="head-nav-control" v-show="this.activeName === 'software'">
            <el-input v-model="viewData.searchForm.softName"
                      size="mini"
                      placeholder="请输入关键字" style="margin-right: 5px;width: 250px">
              <template slot="prepend"> 软件名称 </template>
            </el-input>
            <el-button type="primary"
                       size="mini" @click="viewPM.queryListSW()">查询</el-button>

            <el-button type="primary"
                       size="mini" @click="viewPM.initSearchFormSW(true)">重置</el-button>
          </h-group-iwt>
          <!--部门查询与重置-->
          <h-group-iwt class="head-nav-control" v-show="this.activeName === 'department'">
            <el-input v-model="viewData.searchForm.orgName"
                      size="mini"
                      placeholder="请输入关键字" style="margin-right: 5px;width: 250px">
              <template slot="prepend"> 部门名称 </template>
            </el-input>
            <el-button type="primary"
                       size="mini" @click="viewPM.queryListDM()">查询</el-button>

            <el-button type="primary"
                       size="mini" @click="viewPM.initSearchFormDM(true)">重置</el-button>
          </h-group-iwt>
        </div>
      </div>
      <!--IP-->
      <div v-show="viewData.currentView === 'ip'" class="nav-content">
        <div class="table-view">
          <el-table
            border
            :data="page.sourceList"
            size="mini"
            style="width:100%"
            height="100%"
            max-height="100%">
            <el-table-column prop="softIP"  label="IP"
                             min-width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="nodeName"
                             label="节点名称"
                             min-width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="orgNum"
                             label="部门数"
                             min-width="90"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="softNum"
                             label="技术软件数"
                             min-width="80"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="useSpace"
                             label="已用空间"
                             min-width="80"
                             show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="surpluSpace"
                             label="剩余空间"
                             min-width="90"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="softOs"
                             label="操作系统"
                             min-width="90"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="170" >
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="viewPM.popDetailWin(scope.row.softIP)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <h-group-iwt :hor="'center'"
                     class="page-view">
          <el-pagination background
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="page.totalIndex"
                         :page-sizes="page.pageSizes"
                         :page-size="page.pageSize"
                         @size-change="(val)=>{this.viewPM.pagePM.pageSizeChange(val)}"
                         @current-change="(val)=>{this.viewPM.pagePM.currentPageChange(val)}">
          </el-pagination>
        </h-group-iwt>
      </div>
      <!--软件-->
      <div v-show="viewData.currentView === 'software'" class="nav-content">
        <div class="table-view">
          <el-table
            border
            stripe
            size="mini"
            :data="pageSW.sourceList"
            style="width:100%;"
            height="100%"
            max-height="100%" >
            <el-table-column prop="softName"  label="软件名称"
                             min-width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="softIP"
                             label="IP"
                             min-width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="orgNum"
                             label="部门数"
                             min-width="90" >
            </el-table-column>
            <el-table-column prop="softVersion"
                             label="版本"
                             min-width="80"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="softPath"
                             label="路径"
                             min-width="80"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="softPort"
                             label="端口"
                             min-width="80"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="useSpace"
                             label="已用空间"
                             min-width="80"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="surpluSpace"
                             label="剩余空间"
                             min-width="80"
                             show-overflow-tooltip>
            </el-table-column>
            <!--<el-table-column label="操作" fixed="right" width="170" >
              <template slot-scope="scope">
                <el-button type="text"
                           disabled
                           size="mini"
                           @click="">查看详情</el-button>
              </template>
            </el-table-column>-->
          </el-table>

        </div>

        <h-group-iwt :hor="'center'"
                     class="page-view">
          <el-pagination background
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="pageSW.totalIndex"
                         :page-sizes="pageSW.pageSizes"
                         :page-size="pageSW.pageSize"
                         @size-change="(val)=>{this.viewPM.pagePMSW.pageSizeChange(val)}"
                         @current-change="(val)=>{this.viewPM.pagePMSW.currentPageChange(val)}">
          </el-pagination>
        </h-group-iwt>

      </div>
      <!--部门-->
      <div v-show="viewData.currentView === 'department'" class="nav-content">
        <div class="table-view">
          <el-table
            border
            stripe
            size="mini"
            :data="pageDM.sourceList"
            style="width:100%;"
            height="100%"
            max-height="100%" >
            <el-table-column prop="orgName"  label="部门名称"
                             min-width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="softIP"
                             label="IP"
                             min-width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="softNum"
                             label="软件数"
                             min-width="90" >
            </el-table-column>
            <!--<el-table-column prop="runTime"
                             label="数据库存储空间"
                             min-width="80"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="runTime"
                             label="文件存储空间"
                             min-width="80"
                             show-overflow-tooltip>
            </el-table-column>-->
            <el-table-column label="操作" fixed="right" width="170" >
              <template slot-scope="scope">
                <el-button type="text" size="mini"  @click="addSearchForm(scope.row.orgName)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>

        <h-group-iwt :hor="'center'"
                     class="page-view">
          <el-pagination background
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="pageDM.totalIndex"
                         :page-sizes="pageDM.pageSizes"
                         :page-size="pageDM.pageSize"
                         @size-change="(val)=>{this.viewPM.pagePMDM.pageSizeChange(val)}"
                         @current-change="(val)=>{this.viewPM.pagePMDM.currentPageChange(val)}">
          </el-pagination>
        </h-group-iwt>

      </div>
    </v-group-iwt>

    <!--IP查看详情-->
    <other-assets-monitor-analyze-ip-detail></other-assets-monitor-analyze-ip-detail>

    <!--部门查看详情-->
    <other-assets-monitor-analyze-org-detail ref="orgDetail"></other-assets-monitor-analyze-org-detail>

  </div>
</template>
