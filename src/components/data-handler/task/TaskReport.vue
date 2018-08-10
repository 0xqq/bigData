<script>
  import TaskReportPM from "./TaskReportPM" ;
  import Inject from "@/common/model/Inject" ;
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import SubTitle from "@/common/comps/normal/SubTitle";
  import TaskReportHisWin from "./TaskReportHisWin";
  import ProcessAPI from "@/common/service/ProcessAPI" ;

  export default {
    components:{ContentTitle,SubTitle,TaskReportHisWin},
    data() {
      this.viewPM = Inject.getClass(TaskReportPM) ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        page:this.viewPM.pagePM.data,
        userRankOne:'',
        userRankTwo:'',
        userRnakThree:'',
        resourceRankOne:'',
        resourceRankTwo:'',
        resourceRankThree:''
      }
    },
    activated() {
      this.viewPM.initView();
    },
    methods: {
      //添加任务弹出框显示与隐藏
      viewDetails(item){
        this.$refs.taskDetail.open(item) ;
      },
      //用户排名前三
      topThreeQualityUsers(){
        ProcessAPI.qualityUser({}).then(
          (result)=>{
            // console.log(result.resultdata[0][0]);
            this.userRankOne = result.resultdata[0][0];
            this.userRankTwo = result.resultdata[1][0];
            this.userRnakThree = result.resultdata[2][0];
          },
          ()=>{

          }
        )
      },
      //资源排名前三名
      topThreeResource(){
        ProcessAPI.resourceRank({}).then(
          (result)=>{
              console.log(result.resultdata);
             this.resourceRankOne = result.resultdata[0][0];
             this.resourceRankTwo = result.resultdata[1][0];
             this.resourceRankThree = result.resultdata[2][0];
          },
          ()=>{

          }
        )
      }
    },
    mounted(){
      this.topThreeQualityUsers();
      this.topThreeResource();
    },
  }
</script>

<style scoped lang="scss">
  .auto-view {
    width: 100%;
    flex: none;
  }
  .search-form{
    width: 100%;
    flex: none;
  }
  .quality-hd{
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: space-around;
    .user{
      &:nth-child(1){
        margin-left: 3%;
      }
      &:nth-child(2){
        margin-right: 3%;
      }
      width: 40%;
      height: 160px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border: 1px solid #d7d7d7;
      overflow: hidden;
      .title{
        width: 100%;
        height: 30px;
        background: #d7d7d7;
        line-height: 30px;
        padding-left: 10px;
      }
      .depart{
        width: 100%;
        height: 130px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .item{
          display: flex;
          flex-direction:column;
          align-items: center;
          .ment{
            margin-top: 10px;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="tj-t-auto-view" >
    <!--scroll-->
    <div class="auto-content" v-bind:id="viewData.autoId">
      <div class="auto-content-inner">
        <div class="tj-t-auto-view">
          <v-group-iwt class="layout">

            <content-title>质量分析报告</content-title>
            <!--前三名排名-->
            <div class="quality-hd">
              <div class="user">
                <div class="title">
                  最近使用质量分析用户排名（前三名）
                </div>
                <div class="depart">
                  <div class="item">
                    <div class="depart-img">
                      <img src="../../../assets/image/handler/quality_ user.png"/>
                    </div>
                    <div class="ment">{{userRankOne}}</div>
                  </div>
                  <div class="item">
                    <div>
                      <img src="../../../assets/image/handler/quality_ user.png"/>
                    </div>
                    <div class="ment">{{userRankTwo}}</div>
                  </div>
                  <div class="item">
                    <div>
                      <img src="../../../assets/image/handler/quality_ user.png"/>
                    </div>
                    <div class="ment">{{userRnakThree}}</div>
                  </div>
                </div>
              </div>
              <div class="user">
                <div class="title">
                  最近质量分析资源排名（前三名）
                </div>
                <div class="depart">
                  <div class="item">
                    <div class="depart-img">
                      <img src="../../../assets/image/handler/quality_resources.png"/>
                    </div>
                    <div class="ment">{{resourceRankOne}}</div>
                  </div>
                  <div class="item">
                    <div>
                      <img src="../../../assets/image/handler/quality_resources.png"/>
                    </div>
                    <div class="ment">{{resourceRankTwo}}</div>
                  </div>
                  <div class="item">
                    <div>
                      <img src="../../../assets/image/handler/quality_resources.png"/>
                    </div>
                    <div class="ment">{{resourceRankThree}}</div>
                  </div>
                </div>
              </div>
            </div>
            <!--查询条件-->
            <sub-title class="sub-gap"
                       v-if="auth['817']"
                       v-show="viewData.isPopWin"
                       title="查询条件">
            </sub-title>
            <!--查询form-->
            <div class="search-form" >
              <el-form ref="form"
                       size="mini"
                       label-width="100px"
                       label-position="right">

                <tile-group-iwt :column="2" style="width:100%">

                  <tile-item-iwt>
                    <el-form-item label="任务名称:" class="form-item-pad">
                      <el-input  style="width:90%;height:30px;"
                                        placeholder="请输入关键字"
                                        v-model="viewData.searchForm.taskName">
                      </el-input>
                    </el-form-item>
                  </tile-item-iwt>

                  <tile-item-iwt>
                    <el-form-item label="资源名称:"  class="form-item-pad">
                      <el-input  style="width:90%;height:30px;"
                                        placeholder="请输入关键字"
                                        v-model="viewData.searchForm.resouceName">
                      </el-input>
                    </el-form-item>
                  </tile-item-iwt>

                  <tile-item-iwt>
                    <el-form-item label="检查规则:" class="form-item-pad">
                      <el-input  style="width:90%;height:30px;"
                                        placeholder="请输入关键字"
                                        v-model="viewData.searchForm.rule">
                      </el-input>
                    </el-form-item>
                  </tile-item-iwt>

                  <tile-item-iwt>
                    <el-form-item label="最后执行时间:" >
                      <el-date-picker
                        style="width:90%;"
                        v-model="viewData.searchForm.runTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </tile-item-iwt>

                  <tile-item-iwt>

                  </tile-item-iwt>

                  <tile-item-iwt>
                    <el-form-item label="" class="form-item-pad" style="padding-left: 30%">
                      <h-group-iwt >
                        <el-button type="primary" size="mini"
                                   style="min-width: 64px;"
                                   @click="viewPM.queryList()">查询</el-button>
                        <h-gap-iwt></h-gap-iwt>
                        <el-button type="warning" size="mini"
                                   style="min-width: 64px;"
                                   @click="viewPM.initSearchForm()">重置</el-button>
                      </h-group-iwt>
                    </el-form-item>
                  </tile-item-iwt>

                </tile-group-iwt>
              </el-form>
            </div>
            <!--列表内容tabale-->
            <div class="auto-view">
              <el-table
                border
                :data="page.sourceList"
                size="mini"
                style="width:100%"
                height="295">
                <el-table-column prop="taskInfoName"  label="任务名称" min-width="100"
                                 :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column  prop="resouceName" label="资源名称" min-width="74"
                                  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column  prop="taskDesc"  label="任务描述" min-width="120px"
                                  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column  prop="rule"  label="检查规则" min-width="100px"
                                  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column  prop="creator"  label="创建人" min-width="100px"
                                  :show-overflow-tooltip="true">
                </el-table-column>

                <!--<el-table-column  prop="sourcePartitionValue"  label="开始时间" min-width="100px"-->
                                  <!--:show-overflow-tooltip="true">-->
                <!--</el-table-column>-->

                <el-table-column  prop="lastTime"  label="最后执行时间" min-width="100px"
                                  :show-overflow-tooltip="true">
                </el-table-column>

                <el-table-column  prop="qualifiedRate"  label="合格率" min-width="100px"
                                  :show-overflow-tooltip="true">
                </el-table-column>


                <el-table-column label="操作" fixed="right" width="170" >
                  <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="viewDetails(scope.row)">查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!--分页-->
            <v-gap-iwt></v-gap-iwt>
            <h-group-iwt :hor="'center'" style="width:100%">
              <s-pagination :page="page"
                            @change="(data)=>{this.viewPM.pagePM.pageChange(data)}" ></s-pagination>
            </h-group-iwt>
          </v-group-iwt>
        </div>
      </div>
    </div>

    <!--loading-->
    <s-loading v-show="page.isLoading || viewData.isLoading"></s-loading>

    <!--查看详情-->
    <task-report-his-win ref="taskDetail"></task-report-his-win>

  </div>
</template>
