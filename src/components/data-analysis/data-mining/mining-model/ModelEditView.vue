<script>
  import Inject from "@/common/model/Inject" ;
  import ModelEditViewPM from "./ModelEditViewPM" ;
  import AnalysisAPI from "@/common/service/AnalysisAPI";
  import ModelTree from "./model-edit/ModelTree" ;
  import OperatorPropsWin from "./model-edit/OperatorPropsWin" ;
  import ModelEditViewForm from "./ModelEditViewForm";
  import "@/style/data-task-mode.scss" ;

  export default {
    components:{OperatorPropsWin,ModelTree,ModelEditViewForm },
    data() {
      this.viewPM = Inject.getClass(ModelEditViewPM) ;
      return {
        viewData:this.viewPM.data,
        isShow:false,
        fourExecutor:{}
      }
    },
    watch:{
    },
    computed:{
    },
    activated(){
      this.fourExecutor = {};
      let query = NormalUtils.getRouteQuery(this.$route.path) ;
      this.viewPM.initDrawStage(query) ;
    },
    methods: {
    }
  }
</script>
<style scoped lang="scss">

  .container{
    @include abs-group() ;
    overflow: hidden;
  }

  .box {
    bottom: 0;
    overflow: hidden;
  }
  .normal-bor{
    border:1px solid #dcdfe6;
  }
  .draw-area {
    user-select: none;
    left: 246px;
    top: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    overflow: hidden;
    border:1px solid #dcdfe6;
  }
  .save-box-btns {
    @include abs-group(0,0,0,false) ;
    height: 30px;
    color: #909399;
    line-height: 30px;
    vertical-align: middle;
    background-color: #f5f7fa;
    border-bottom: 1px solid #dcdfe6;
    .layout{
      @include abs-group(10px,0,10px,0) ;
    }
    .task-title{
      @include abs-group() ;
      vertical-align: middle;
      text-align:center;
      font-weight: bold;
      font-size:13px;
    }
  }
  .save-box-btn{
    color: #909399;
    cursor: pointer;
    font-size: 13px;
  }
  .save-box-btn:hover,.save-box-btn:active{
    color:#40aaff;
  }
  .mini-font{
    font-size:16px;
  }
  .mini-font1{
    font-size:16px;
    font-weight: bold;
  }
  .drag-container {
    top: 30px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    position: absolute;
  }

</style>

<template>
  <div class="container">

    <!--left -->
    <model-tree></model-tree>

    <!--right-->
    <div class="draw-area">

      <!--head-->
      <div class="save-box-btns">

        <!--title-->
        <div class="task-title" >
          {{ viewData.taskName }}
        </div>

        <!--控制按钮-->
        <h-group-iwt class="layout">
          <div class="save-box-btn"
               @click="()=>{this.viewPM.resetModel()}">
            <i class="iconfont tj-cleared mini-font"></i>
            <span>清空</span>
          </div>
          <h-gap-iwt></h-gap-iwt>

          <h-gap-iwt></h-gap-iwt>
          <div class="save-box-btn"
               @click="()=>{this.viewPM.popEditeWin();}">
            <i class="el-icon-edit-outline mini-font1"></i>
            <span>模型参数</span>
          </div>
          <h-gap-iwt></h-gap-iwt>

          <h-gap-iwt></h-gap-iwt>
          <div class="save-box-btn" @click="()=>{this.viewPM.saveData()}">
            <i class="iconfont tj-msnui-save-bold mini-font"></i>
            <span>保存</span>
          </div>
          <div style="flex:auto;">

          </div>
          <el-button type="primary" size="mini" @click="viewPM.changeBack()">
            返回
          </el-button>
        </h-group-iwt>
      </div>

      <!--draw-->
      <div class="drag-container" :id="viewData.drawId" >
      </div>

    </div>

    <!--loading-->
    <s-loading v-show="viewData.isLoading"></s-loading>

    <!--算子配置窗口-->
    <operator-props-win></operator-props-win>

    <!--参数配置窗口-->
    <model-edit-view-form ></model-edit-view-form>

  </div>
</template>

