<script>
  import DataFileMonitorPM from "./DataFileMonitorPM" ;
  import Inject from "@/common/model/Inject" ;
  import DataBaseMonitor from "./data-and-file/DataBaseMonitor" ;
  import FileMonitor from "./data-and-file/FileMonitor" ;

  export default {
    components:{   DataBaseMonitor ,FileMonitor},
    data() {
      this.viewPM = Inject.getClass(DataFileMonitorPM) ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data
      }
    },
    mounted() {
      this.viewPM.initView();
    },
    activated(){
    },
    methods: {
    }
  }

</script>

<style scoped  >
</style>

<template>
  <div class="tj-t-auto-view" >

    <!--scroll-->
    <div class="auto-content"  >
      <div class="auto-content-inner">

        <!--nav-->
        <div class="tj-head-nav">
          <div class="head-nav-btn">
            <el-tabs v-model="viewData.currentView" @tab-click="viewPM.changeView()" >
              <el-tab-pane label="数据库监控" name="database"  >
              </el-tab-pane>
              <el-tab-pane label="文件监控" name="file"  >
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <!--content-->
        <div class="content-view">

          <!--数据库监控-->
          <data-base-monitor v-if="viewData.currentView==='database'"></data-base-monitor>

          <!--文件监控-->
          <file-monitor v-if="viewData.currentView==='file'"></file-monitor>

        </div>

      </div>
    </div>
  </div>
</template>


