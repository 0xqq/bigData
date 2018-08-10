<script>
  import OtherAssetsMonitorManger from "./OtherAssetsMonitorManger";
  import OtherAssetsMonitorAnalyze from "./OtherAssetsMonitorAnalyze";

    export default {
      components:{OtherAssetsMonitorManger,OtherAssetsMonitorAnalyze},
        data() {
          //
          return {
            activeName:'Manger'
          }
        },
        computed: {

        },
        mounted() {

        },
        activated() {

        },
        methods: {
          handleClick(tab,event) {
            this.activeName = tab.name;
          },
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
    <v-group-iwt class="layout" id="topTitle">
      <!--tab也签切换-->
      <div style="margin-top: -50px;width: 100%!important;">
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label=" 处理区" name="Manger" >
              <span slot="label"><i class="iconfont tj-biaoge iconbtn"></i> 处理区</span>
            </el-tab-pane>
            <el-tab-pane label=" 分析区" name="Analyze" >
              <span slot="label"><i class="iconfont tj-weibiaoti5 iconbtn"></i> 分析区</span>
            </el-tab-pane>
          </el-tabs>

      </div>
      <!--<div style="border:1px solid #eaeef4;width: 100%;margin-top: -16px"></div>-->
      <!--处理区-->
      <div v-show="this.activeName === 'Manger'">
          <other-assets-monitor-manger></other-assets-monitor-manger>
      </div>
      <!--分析区-->
      <div v-show="this.activeName === 'Analyze'">
          <other-assets-monitor-analyze></other-assets-monitor-analyze>
      </div>
    </v-group-iwt>
  </div>
</template>
