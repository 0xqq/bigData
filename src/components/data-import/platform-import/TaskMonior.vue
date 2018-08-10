<script>
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import PagePm from "@/common/model/PagePm";
  import DataImportAPI from "@/common/service/DataImportAPI";
  import TaskMoniorHisWin from "./TaskMoniorHisWin" ;

  const searchForm = {
    jobName:'',
    startStatus:"",
    lastSyncTime:""
  } ;

  export default {
    components:{  ContentTitle ,TaskMoniorHisWin},
    data() {
      this.viewPM = new PagePm(DataImportAPI.queryJobMonitor);
      this.viewPM.resultListHandler = this.resultHandler ;
      return {
        auth:AuthManager.has,
        page:this.viewPM.data,
        syncStatusList: ConstManager.taskRunTypeList,
        searchForm:Object.assign({},searchForm)
      }
    },
    mounted(){
      this.queryList() ;
    },
    methods:{

      /**
       * 查询列表
       */
      queryList(){
         this.viewPM.queryList(this.searchForm,null,(datas)=>{
           for(let item of datas ){
             item.syncedRate = (parseFloat(item.syncedRate) * 100 )+"%" ;
           }
         }) ;
       },

      /**
       *
       **/
      resultHandler(result){
        let _list = this.viewPM.getResultList(result) ;
        for(let item of _list){
          // if(item.syncState==="同步成功")
          //   item.state = "sucess" ;
          // else if(item.syncState==="同步失败")
          //   item.state = "error" ;
          // else
          if(item.startStatus===ConstManager.started)
            item.state = "run" ;
          else if(item.startStatus===ConstManager.stopped)
            item.state = "stop" ;
          else
            item.state = "" ;
        }
        return _list ;
      },

      /**
       * 重置表单
       */
       reset(){
         this.searchForm =  Object.assign({},searchForm) ;
         this.queryList() ;
       },

      /**
       * 查看历史
       * @param item
       */
      showHistory(item){
        this.$refs.hisDetailWin.open(item) ;
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
    color:#555555;
  }
  .stop-icon{
    font-size:16px;
    color:#e7e7e7;
  }
</style>

<template>
  <div class="tj-t-view-inner" >
    <v-group-iwt class="layout">

      <!--title-->
     <!-- <content-title :title="'任务监控'"></content-title>
      <v-gap-iwt></v-gap-iwt>-->

      <!--form-->
      <div class="search-form">
        <el-form ref="form"
                 size="mini"
                 :model="searchForm"
                 label-width="110px"
                 label-position="right">

          <tile-group-iwt :column="4" style="width:100%">


            <tile-item-iwt>
              <el-form-item label="任务名称:" prop="jobName" class="form-item-pad">
                <el-input v-model="searchForm.jobName"   ></el-input>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="任务状态:" prop="syncStatus"  class="form-item-pad">
                <el-select style="width:100%;" :auto-complete="'on'"
                           v-model="searchForm.startStatus"
                           placeholder="--请选择--"    >
                  <el-option v-for="(item,index) in syncStatusList"
                             :key="index"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </tile-item-iwt>


          <!--  <tile-item-iwt>
              <el-form-item label="已同步数:" prop="totalSynced" class="form-item-pad">
                <el-input v-model="searchForm.totalSynced"   ></el-input>
              </el-form-item>
            </tile-item-iwt>-->

        <tile-item-iwt>
        <el-form-item label="最后执行时间:" prop="lastSyncTime" class="form-item-pad">
        <el-date-picker style="width:100%;"
                      v-model="searchForm.lastSyncTime"
                      type="datetime"   value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期时间">
                    </el-date-picker>
        </el-form-item>
        </tile-item-iwt>

            <tile-item-iwt>
              <h-group-iwt class="search-btn">
                <el-button type="primary" size="mini"
                           class="btn" @click="queryList()" >查询</el-button>
                <el-button type="warning" size="mini"
                           class="btn"  @click="reset()">重置</el-button>
              </h-group-iwt>
            </tile-item-iwt>
          </tile-group-iwt>
        </el-form>
      </div>

      <!--tabale-->
      <div class="table-view">
        <div class="table-inner">
          <el-table
            border  stripe
            :data="page.sourceList"
            size="mini"
            height="100%"
            max-height="100%;"
            style="width:100%;height:100%" >

            <el-table-column prop="jobName"
                             label="任务名称"
                             min-width="150"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column  prop="syncStatus"
                              align="center"
                              label="任务状态"
                              width="72">
              <template slot-scope="scope">
                <span v-show="scope.row.syncStatus===''">{{scope.row.startStatus}}</span>
                <!--<i v-show="scope.row.state==='error'"-->
                   <!--class="iconfont tj-71shibai error-icon"-->
                   <!--:title="scope.row.syncState" ></i>-->
                <!--<i v-show="scope.row.state==='sucess'"-->
                   <!--class="iconfont tj-duigou1 sucess-icon"-->
                   <!--:title="scope.row.syncState" ></i>-->
                <i class="iconfont tj-yitingzhi error-icon"
                   :title="scope.row.startStatus"
                   v-show="scope.row.state==='stop'"></i>
                <i v-show="scope.row.state==='run'"
                   class="iconfont tj-yunxingzhong sucess-icon"
                   :title="scope.row.startStatus" ></i>
                <i v-show="scope.row.state===''"
                   class="iconfont tj-tingzhishangbao stop-icon"
                   :title="scope.row.startStatus" ></i>
              </template>
            </el-table-column>
            <!--<el-table-column  prop="totalSync" label="应同步数" min-width="90">-->
            <!--</el-table-column>-->
            <!--<el-table-column  prop="totalSynced"  label="已同步数" width="90">-->
            <!--</el-table-column>-->
            <el-table-column  prop="syncedRate"  label="成功率"  >
            </el-table-column>
            <el-table-column  prop="lastSyncTime"  label="最后执行时间" min-width="150">
            </el-table-column>
            <el-table-column  prop="syncTimes"  label="执行次数" >
            </el-table-column>
            <el-table-column  prop=""  label="操作" width="90" v-if="auth['331']">
              <template slot-scope="scope">
                <el-button type="text"
                           size="mini"
                           v-show="auth['331']"
                           @click="showHistory(scope.row)" >查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--page-->
      <v-gap-iwt></v-gap-iwt>
      <h-group-iwt :hor="'center'" style="width:100%">
        <el-pagination background
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totalIndex"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          @size-change="(val)=>{this.viewPM.pageSizeChange(val)}"
          @current-change="(val)=>{this.viewPM.currentPageChange(val)}">
        </el-pagination>
      </h-group-iwt>

    </v-group-iwt>

    <!--loading-->
    <s-loading v-show="page.isLoading"></s-loading>

    <!--详情窗口-->
    <task-monior-his-win ref="hisDetailWin"></task-monior-his-win>

  </div>
</template>

