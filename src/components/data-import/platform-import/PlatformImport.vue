<script>
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import PathConst from "@/router/PathConst" ;
  import TableTaskPM from "./TableTaskPM" ;
  import FoldTaskPM from "./FoldTaskPM" ;
  import Inject from "@/common/model/Inject" ;
  import SubMenuViewBase from "@/components/common-comps/SubMenuViewBase";

  export default {
    mixins:[SubMenuViewBase],
    components:{   ContentTitle },
    data() {
      //子视图
      this.subViewPath = [
        {code:"311",path:PathConst.DI_IMPORT_TASK_TABLE,view:"table"},
        {code:"320",path:PathConst.DI_IMPORT_TASK_FILE,view:"file"}] ;

      this.tablePM = Inject.getClass(TableTaskPM) ;
      this.foldPM = Inject.getClass(FoldTaskPM) ;
      return {
        auth:AuthManager.has,
        autoId:NormalUtils.createOID("form_id"),
        tableData:this.tablePM.data,
        foldData:this.foldPM.data
      }
    },
    mounted() {
      this.tablePM.formContainerId = this.autoId ;
      this.foldPM.formContainerId = this.autoId ;
    },
    activated(){
    },
    methods: {
      /**
       * 显示创建表单
       */
      showAddView() {
        if (this.currentView === "table")
          this.tablePM.popCreateWin();
        else
          this.foldPM.popCreateWin();
      }
    }
  }

</script>

<style scoped  >
</style>

<template>
  <div class="tj-t-auto-view" >

    <!--scroll-->
    <div class="auto-content" v-bind:id="autoId">
      <div class="auto-content-inner">

        <!--nav-->
        <div class="tj-head-nav">
          <div class="head-nav-btn">
            <el-tabs v-model="currentView" @tab-click="changeView()">
              <el-tab-pane label=" 数据库接入" name="table" v-if="auth['311']" >
                <span slot="label"><i class="iconfont tj-biaoge iconbtn"></i> 数据库接入</span>
              </el-tab-pane>
              <el-tab-pane label=" 文件接入" name="file"  v-if="auth['320']">
                <span slot="label"><i class="iconfont tj-weibiaoti5 iconbtn"></i> 文件接入</span>
              </el-tab-pane>
            </el-tabs>
          </div>
          <h-group-iwt class="head-nav-control">
            <el-button type="primary"
                       size="mini"
                       v-if="auth['313']"
                       v-show="currentView==='table'&&tableData.isPopCreate===false"
                       @click="showAddView()">添加</el-button>
            <el-button type="primary"
                       size="mini"
                       v-if="auth['322']"
                       v-show="currentView==='file'&&foldData.isPopCreate===false"
                       @click="showAddView()">添加</el-button>
          </h-group-iwt>
        </div>

        <!--content-->
        <div class="content-view">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>

      </div>
    </div>
  </div>
</template>


