<script>
  import PathConst from "@/router/PathConst" ;
  import ContentTitle from "@/common/comps/normal/ContentTitle";
  import SubMenuViewBase from "@/components/common-comps/SubMenuViewBase";

  export default {
    mixins:[SubMenuViewBase],
    components:{ContentTitle},
    data() {
      this.subViewPath = [
        {code:"443",path:PathConst.DS_ANALYSIS_CONFIG_TABLE_LIST,view:"table"},
        {code:"4411",path:PathConst.DS_ANALYSIS_CONFIG_FOLD,view:"fold"}] ;
      return {
        auth:AuthManager.has
      }
    },
    methods:{
      changeBackMain(){
        NormalUtils.changeRouter(PathConst.DS_ANALYSIS_CONFIG_TABLE_LIST) ;
      }
    }
  }
</script>
<style scoped lang="scss">

  .container{
    @include abs-group();
    .tab-head-l {
      @include abs-group(10px,10px,10px,0);
      height: 40px;
      overflow: hidden;
      .reback-btn{
        @include abs-group(false,false,25px,5px);
      }
    }
    .iconbtn{
      padding-left: 10px;
      cursor: pointer;
      font-size: 16px;
    }
    .table-view{
      @include abs-group(0,50px);
    }
  }
</style>
<template>
  <div class="container" >

    <!--tab button-->
    <div class="tab-head-l">
      <el-tabs v-model="currentView" @tab-click="changeView()">
        <el-tab-pane label=" 表管理" name="table" v-if="auth['443']" >
          <span slot="label"><i class="iconfont tj-biaoge iconbtn"></i> 表管理</span>
        </el-tab-pane>
        <el-tab-pane label=" 目录管理" name="fold"  v-if="auth['4411']">
          <span slot="label"><i class="iconfont tj-weibiaoti5 iconbtn"></i> 目录管理</span>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="table-view">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>


