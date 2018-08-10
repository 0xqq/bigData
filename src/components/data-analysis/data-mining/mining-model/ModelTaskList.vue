<script>

  import SubTitle from "@/common/comps/normal/SubTitle" ;
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import ModelTaskListPM from "./ModelTaskListPM" ;
  import Inject from "@/common/model/Inject" ;
  import ModelTaskListTime from "./ModelTaskListTime";
  import ModelTaskListAddForm from "./ModelTaskListAddForm";
  import ModelTaskListViewResult from "./ModelTaskListViewResult";
  import AnalysisAPI from "@/common/service/AnalysisAPI";
  import ModelTaskListOrg from "./ModelTaskListOrg";
  import AuthManager from "@/common/manager/AuthManager" ;

  export default {
    components:{  ModelTaskListTime,  ContentTitle,  SubTitle,ModelTaskListAddForm, ModelTaskListViewResult,ModelTaskListOrg},
    data() {
      this.viewPM = Inject.getClass(ModelTaskListPM);
      this.pagePM = this.viewPM.pagePM ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        page: this.pagePM.data,
        isShow:false,
        modelStatusone:false,
        isDisabled:true
      }
    },
    activated() {
      this.viewPM.initView() ;
    },
    methods: {
      // tab切换
      /*handleClick(tab, event) {
        if(tab.name === 'noPublish'){
            this.viewData.searchForm = {
              modelName:"", //任务名 空查询所有 支持模糊
              modelProject:"",//项目名称 空查询所有 支持模糊
              modelUserId:"",//创建人 空查询所有 支持模糊
              modelUserName:"",//创建人 空查询所有 支持模糊
              modelIsPublish:'0',//未发布
              modelPublishTime:'',//发布时间
            };
            this.viewPM.queryList() ;

        }else if(tab.name === 'Publish'){
          this.viewData.searchForm = {
             modelName:"", //任务名 空查询所有 支持模糊
             modelProject:"",//项目名称 空查询所有 支持模糊
             modelUserId:"",//创建人 空查询所有 支持模糊
             modelUserName:"",//创建人 空查询所有 支持模糊
             modelIsPublish:'1',//已发布
             modelPublishTime:'',//发布时间
          };
          this.viewPM.queryList() ;
        }
      },*/
      //添加任务弹出框显示与隐藏
      addSearchForm(){
        this.isShow = true;
      },
      hiddenShow(){
        this.isShow = false
      },
      // 发布任务
      publishTaskModel(item){
          if(item.modelIsPublish === '0'){  //发布按钮
            this.$refs.pubModel.open(item);
          }
          if(item.modelIsPublish === '1'){
            this.$confirm('是否终止该模型发布？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              AnalysisAPI.stopPublishTaskModel({ //终止按钮
                syncModelId:item.id
              }).then(
                (result)=>{
                  // console.log(result.data);
                  this.viewPM.queryList();
                },
                ()=>{

                }
              );
              this.$message({
                type: 'success',
                message: '终止成功!'

              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消终止'
              });
            });
          }
        },
        //试运行按钮
      pilotRun(item){
        this.modelStatusone = true;
        AnalysisAPI.pilotRunTask({
          id:item
        }).then(
          (result)=>{
            // console.log(result.data);
            this.viewPM.queryList();
            this.modelStatusone =false;
          },
          ()=>{
            this.viewPM.queryList();
            this.modelStatusone = false;
          }
        )
      },
      //查看结果按钮
      viewResult(item){
        this.$refs.viewResult.open(item) ;
      },
      //查看日志
      viewOrg(item){
        this.$refs.seeOrg.open(item);
      }
    }
  }
</script>

<style scoped>
  .control-btn{
    font-size:16px;
    cursor: pointer;
  }
  .tab{
    height: 40px;
    width: 100%;
  }
  #topTitle{
    margin-top: 50px;
  }
  #tab{
    margin-top: -50px;
  }
</style>

<template>
    <div class="container">
      <v-group-iwt class="layout">
        <!--(已发布)(未发布)在一起-->
        <v-group-iwt class="layout">
          <!--查询条件-->
          <div class="search-form">
            <el-form ref="form"
                     size="mini"
                     :model="viewData.searchForm"
                     label-width="90px"
                     label-position="right">
              <tile-group-iwt :column="5" style="width:100%">
                <tile-item-iwt>
                  <el-form-item label="模型名称:" prop="name"   class="form-item-pad">
                    <el-input v-model="viewData.searchForm.modelName"   ></el-input>
                  </el-form-item>
                </tile-item-iwt>

                <tile-item-iwt>
                  <el-form-item label="模型状态:" prop="modelIsPublish"   class="form-item-pad">
                    <!--<el-input v-model="viewData.searchForm.project"   ></el-input>-->
                    <el-select style="width:100%;"
                               v-model="viewData.searchForm.modelIsPublish"
                               placeholder="--请选择--"    >
                      <el-option v-for="(item,index) in viewData.isPublish"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </tile-item-iwt>

                <tile-item-iwt>
                  <el-form-item label="项目名称:" prop="project"   class="form-item-pad">
                    <!--<el-input v-model="viewData.searchForm.project"   ></el-input>-->
                    <el-select style="width:100%;"
                               v-model="viewData.searchForm.project"
                               disabled
                               placeholder="--请选择--"    >
                      <el-option v-for="(item,index) in viewData.timeUnitList"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </tile-item-iwt>

                <tile-item-iwt>
                  <el-form-item label="创建人:" prop="creator"   class="form-item-pad">
                    <el-input v-model="viewData.searchForm.modelUserId"  ></el-input>
                  </el-form-item>
                </tile-item-iwt>
                <tile-item-iwt>
                  <h-group-iwt  class="search-btn">
                    <el-button type="primary" size="mini" style="min-width: 64px;"
                               @click="viewPM.queryList()" >查询</el-button>
                    <el-button type="warning" size="mini" style="min-width: 64px;"
                               @click="viewPM.initSearchFormNoPub(true)">重置</el-button>
                  </h-group-iwt>
                </tile-item-iwt>
              </tile-group-iwt>
            </el-form>
          </div>
          <h-group-iwt class="control-btn" :hor="'end'">
            <el-button type="primary" size="mini"
                       @click="addSearchForm">添加</el-button>
          </h-group-iwt>
          <!--table里面1的内容-->
          <div class="table-view">
            <div class="table-inner">
              <el-table  border
                         stripe
                         size="mini"
                         :data="page.sourceList"
                         max-height="100%;"
                         height="100%"
                         style="width:100%;" >

                <el-table-column prop="modelName"  label="名称">
                </el-table-column>
                <el-table-column prop="modelType"  label="分析类型">
                  <template slot-scope="scope">
                    {{scope.row.modelType === '0'?'数据库类型':'文件类型'}}
                  </template>
                </el-table-column>
                <el-table-column  prop="modelStatus" label="运行状态" >

                  <template slot-scope="scope">

                    <i v-if="scope.row.modelStatus==='0'"
                       class="iconfont stop-icon" style="font-size: 12px">未运行</i>

                    <i v-else-if="scope.row.modelStatus==='1'"
                       class="iconfont sucess-icon" style="font-size: 12px">运行中</i>

                    <i v-else-if="scope.row.modelStatus==='2'"
                       class="iconfont error-icon"
                       :title="scope.row.modelStatusName"  style="font-size: 12px">
                      {{scope.row.modelIsPublish ==='1'?'已发布':'成功'}}
                    </i>

                    <i v-else-if="scope.row.modelStatus==='3'"
                       class="iconfont error-icon"
                       :title="scope.row.modelStatusName" style="font-size: 12px">失败</i>

                  </template>

                </el-table-column>
                <el-table-column  prop="modelCreateTime"  label="创建时间" >
                </el-table-column>
                <el-table-column  prop="modelPublishTime"  label="发布时间" >
                </el-table-column>
                <el-table-column  prop="modelUserName"  label="创建人" >
                </el-table-column>

                <el-table-column label="操作"  fixed="right" width="350px" >
                  <template slot-scope="scope">

                    <el-button v-show="auth['620']"
                               type="text"
                               size="mini"
                               v-if="scope.row.modelIsPublish !=='1'"
                               :disabled = "modelStatusone"
                               @click="pilotRun(scope.row.id)">
                      {{scope.row.modelStatus ==='0'?'试运行':(scope.row.modelStatus ==='1'?'':(scope.row.modelStatus ==='2'||scope.row.modelStatus ==='3'?'重试':''))}}
                    </el-button>

                    <el-button type="text"  size="mini"
                               :disabled = "scope.row.modelStatus ==='2'? false: true"
                               v-if="auth['619'] || auth['611']"
                               @click="publishTaskModel(scope.row)" >
                      {{scope.row.modelIsPublish ==='0'?'发布':'终止'}}
                    </el-button>
                    <el-button type="text"  size="mini"
                               :disabled="scope.row.modelStatus ==='2'? false: true"
                               v-if="auth['621']"
                               @click="viewResult(scope.row)" >查看结果</el-button>
                    <el-button type="text"  size="mini"
                               @click="viewOrg(scope.row)" >查看日志</el-button>
                    <el-button  type="text" size="mini"
                                :disabled="scope.row.modelStatus ==='1' || scope.row.modelIsPublish ==='1'? true: false"
                                @click="viewPM.changeToSourceLink(scope.row)" >编辑</el-button>
                    <el-button  type="danger" size="mini"
                                :disabled="scope.row.modelStatus ==='1'|| scope.row.modelIsPublish === '1'? true : false"
                                v-if="auth['613']"
                                @click="viewPM.deleteItem(scope.row)" >删除</el-button>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </div>
          <v-gap-iwt></v-gap-iwt>
          <h-group-iwt :hor="'center'" style="width:100%">
            <el-pagination background
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="page.totalIndex"
                           :page-sizes="page.pageSizes"
                           :page-size="page.pageSize"
                           @size-change="(val)=>{this.pagePM.pageSizeChange(val)}"
                           @current-change="(val)=>{this.pagePM.currentPageChange(val)}">
            </el-pagination>
          </h-group-iwt>
        </v-group-iwt>
      </v-group-iwt>

      <!--loading-->
      <s-loading v-show="page.isLoading || viewData.isLoading"></s-loading>
      <!--添加表单窗口-->
      <model-task-list-add-form v-show="isShow" @hidden="hiddenShow"></model-task-list-add-form>
      <!--发布按钮-->
      <model-task-list-time ref="pubModel"></model-task-list-time>

      <!--查看结果弹出框-->
      <model-task-list-view-result ref="viewResult"></model-task-list-view-result>

      <!--查看日志弹出框-->
      <model-task-list-org ref="seeOrg"></model-task-list-org>

    </div>

</template>


