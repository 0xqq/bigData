<script>
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import TaskCreateTree from "./create/TaskCreateTree";
  import TaskCreatePM from "./TaskCreatePM" ;

  import Inject from "@/common/model/Inject" ;
  import TaskCreatWin from "./create/win/TaskCreatWin";
  import OpeatorDiyAttWin from "./create/win/OpeatorDiyAttWin";

  export default {
    components:{
      OpeatorDiyAttWin,
      TaskCreatWin,
      ContentTitle,TaskCreateTree},
    data() {
      this.viewPM = Inject.getClass(TaskCreatePM) ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data
      }
    },
    watch:{
      // "$route":"refreshView"aaa
    },
    computed:{
      showTitle(){
        if(this.viewData.taskName)
          return "创建任务-(当前任务："+this.viewData.taskName+")";
        return "创建任务" ;
      }
    },
    mounted() {
    },
    activated(){
      this.refreshView() ;
    },
    methods: {
      refreshView(){
        let query = NormalUtils.getRouteQuery(this.$route.path);
        this.viewPM.initDrawStage(query) ;
      }
    }
  }
</script>
<style scoped lang="scss">
  .box {
    bottom: 0;
    overflow: hidden;
  }
  .normal-bor{
    border:1px solid #dcdfe6;
  }
  .draw-area {
    user-select: none;
    left: 225px;
    top: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    overflow: hidden;
    border:1px solid #dcdfe6;
  }
  .save-box-btns {
    @include abs-group(0,0,0,false) ;
    height: 25px;
    color: #909399;
    line-height: 25px;
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
  .drag-container {
    top: 25px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    position: absolute;
  }

</style>

<template>
  <div class="tj-content-outer">
    <div class="tj-content-padding box"  >
      <div class="tj-content-body-box">

       <!--left-->
       <task-create-tree ></task-create-tree>

        <!--right-->
       <div class="draw-area">

         <!--head-->
         <div class="save-box-btns">

           <!--title-->
           <div class="task-title" >
             {{viewData.taskName?'当前任务：'+viewData.taskName:'创建任务'}}
           </div>

           <!--控制按钮-->
           <h-group-iwt class="layout">
             <div class="save-box-btn"
                  @click="()=>{this.viewPM.addNewTask()}">
               <i :class="[viewData.isEdit?'':'iconfont',viewData.isEdit?'el-icon-circle-plus':'tj-cleared', 'mini-font']"></i>
               <span>{{viewData.isEdit?'添加':'清空'}}</span>
             </div>
             <h-gap-iwt></h-gap-iwt>

             <div class="save-box-btn" v-show="viewData.isEdit"
                  @click="()=>{this.viewPM.popEditeWin()}">
                 <i class="iconfont tj-edit"></i>
                 <span>编辑</span>
             </div>
             <!--<div class="save-box-btn">-->
               <!--<i  class="iconfont tj-peizhi mini-font"></i>-->
               <!--<span>设置</span>-->
             <!--</div>-->
             <h-gap-iwt></h-gap-iwt>
             <div class="save-box-btn" @click="viewPM.saveData()">
               <i class="iconfont tj-msnui-save-bold mini-font"></i>
               <span>保存</span>
             </div>
           </h-group-iwt>
         </div>

          <!--draw-->
          <div class="drag-container" :id="viewData.drawId" >

          </div>

       </div>
      </div>
    </div>

    <!--loading-->
    <s-loading v-show="viewData.isLoading"></s-loading>

    <!--任务创建窗口-->
    <task-creat-win></task-creat-win>

    <!--算子配置窗口-->
    <opeator-diy-att-win></opeator-diy-att-win>
  </div>
</template>

