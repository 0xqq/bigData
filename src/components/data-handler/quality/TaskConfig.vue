<script>

  import SubTitle from "@/common/comps/normal/SubTitle" ;
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import TaskConfigPM from "./TaskConfigPM" ;
  import Inject from "@/common/model/Inject" ;
  import TaskConfigTime from "./TaskConfigTime";
  import ProcessAPI from "@/common/service/ProcessAPI";
  import PlatformAssetsAPI from "@/common/service/PlatformAssetsAPI";
  import PlatformAPI from "@/common/service/PlatformAPI";


  export default {
    components:{  TaskConfigTime,  ContentTitle,  SubTitle},
    data() {
      this.viewPM = Inject.getClass(TaskConfigPM);
      this.pagePM = this.viewPM.pagePM ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        page: this.pagePM.data,
        dialogVisible: false
      }
    },
    activated() {
      this.viewPM.initView() ;
    },
    methods: {
      deleteItem(item) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ProcessAPI.deleteQuality({
            taskId:item.id
          }).then(
            (result)=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
             this.viewPM.queryList();
            },
            ()=>{
              this.viewPM.queryList();
            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>
  .control-btn{
    font-size:16px;
    cursor: pointer;
  }
</style>

<template>
  <div class="tj-t-view-inner">
    <v-group-iwt class="layout">

     <!-- <content-title :title="'任务配置'"></content-title>
      <v-gap-iwt></v-gap-iwt>-->

      <!--form-->
      <div class="search-form">
        <el-form ref="form"
                 size="mini"
                 :model="viewData.searchForm"
                 label-width="90px"
                 label-position="right">

          <tile-group-iwt :column="4" style="width:100%">

              <tile-item-iwt>
                <el-form-item label="任务名称:"   class="form-item-pad">
                  <el-input v-model="viewData.searchForm.taskName"   ></el-input>
                </el-form-item>
              </tile-item-iwt>

              <tile-item-iwt>
                <el-form-item label="租户:"   class="form-item-pad">
                  <el-input v-model="viewData.searchForm.tenantName" ></el-input>
                  <!--<el-select style="width:100%;"-->
                             <!--v-model="viewData.searchForm.tenant"-->
                              <!--placeholder="&#45;&#45;请选择&#45;&#45;"    >-->
                    <!--<el-option v-for="(item,index) in viewData.tenantList"-->
                               <!--:key="index"-->
                               <!--:label="item.label"-->
                               <!--:value="item.value">-->
                    <!--</el-option>-->
                  <!--</el-select>-->
                </el-form-item>
              </tile-item-iwt>

              <tile-item-iwt>
                <el-form-item label="创建人:"    class="form-item-pad">
                  <el-input v-model="viewData.searchForm.userName"  ></el-input>
                </el-form-item>
              </tile-item-iwt>

              <tile-item-iwt>
                  <h-group-iwt  class="search-btn">
                    <el-button type="primary" size="mini" style="min-width: 64px;"
                               @click="viewPM.queryList()" >查询</el-button>
                    <el-button type="warning" size="mini" style="min-width: 64px;"
                               @click="viewPM.initSearchForm(true)">重置</el-button>
                  </h-group-iwt>
              </tile-item-iwt>
            </tile-group-iwt>
          </el-form>
      </div>

      <!--tabale-->
      <div class="table-view">
        <div class="table-inner">
          <el-table  border
                     stripe
                     size="mini"
                     :data="page.sourceList"
                     max-height="100%;"
                     height="100%"
                     style="width:100%;" >

            <el-table-column prop="name"  label="任务名称" width="180">
            </el-table-column>
            <el-table-column  prop="tenantName" label="租户" >
            </el-table-column>
            <el-table-column  prop="createTime"  label="创建时间" >
            </el-table-column>
            <el-table-column  prop="userName"  label="创建人" >
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="220px"
                             v-if="auth['510']||auth['511']||auth['59']||auth['57']||auth['58']" >
              <template slot-scope="scope">
                <el-button type="text"
                           size="mini"
                           v-if="auth['510'] && scope.row.status!=='1'"
                           :disabled="scope.row.status!=='1'&&scope.row.status!=='0'?true:false"
                           @click="viewPM.changeState(scope.row)" >启动</el-button>
                <el-button type="text"
                           size="mini"
                           v-if="auth['511'] && scope.row.status==='1'"
                           :disabled="scope.row.status!=='1'&&scope.row.status!=='0'?true:false"
                           @click="viewPM.changeState(scope.row)" >停止</el-button>
                <el-button type="text"  size="mini"
                           v-if="auth['59']"
                           @click="viewPM.popEditeWin(scope.row)" >设置周期</el-button>
                <el-button  type="text" size="mini"
                            v-if="auth['57']"
                            @click="viewPM.changeToSourceLink(scope.row)" >编辑</el-button>
                <el-button  type="danger" size="mini"
                            v-if="auth['58']"
                            @click="deleteItem(scope.row)" >删除</el-button>
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

    <!--loading-->
    <s-loading v-show="page.isLoading || viewData.isLoading"></s-loading>

    <!--日期配置窗口-->
    <task-config-time ></task-config-time>

 </div>
</template>


