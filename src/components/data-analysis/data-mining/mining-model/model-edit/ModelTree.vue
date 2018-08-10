<script>
  import ModelTreePM from "./ModelTreePM" ;
  import AnalysisAPI from "@/common/service/AnalysisAPI";

  export default {
    data() {
      this.viewPM = new ModelTreePM()  ;
      return {
        viewData:this.viewPM.data,
        fileType:''
      }
    },
    mounted() {
      this.viewPM.initView() ;//初始化aaz
    },
    methods: {

    },
    activated(){
      let query = NormalUtils.getRouteQuery(this.$route.path) ;
      // console.log(query);
      this.viewPM.initDrawStage(query) ;
    },
  }
</script>
<style scoped lang="scss">
  .tab-head {
    width: 100%;
    height: 40px;
    overflow: hidden;
    position: absolute;
  }
  .tab-content {
    width: 100%;
    top:40px;
    bottom:0;
    position: absolute;
  }


  .nor{
    border:1px solid #dcdfe6 ;
    margin-right: 5px;
    height:40px;
    line-height:40px;
    vertical-align: middle;
  }

  .node-btn{
    cursor:pointer;
    user-select:none;
  }
  .container{
    @include abs-group(0,0,false,0) ;
    width:246px;

    .tab-btn {
      @include abs-group(0,0,0,false) ;
      height: 40px;
      overflow: hidden;
      border-left: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      .inner {
        width: 300px;
        left: -10px;
        position: absolute;
      }
    }

    .content{
      @include abs-group(0,40px,0,0) ;

      .content-bor{
        @include abs-group( ) ;
        border: 1px solid #dcdfe6;
        border-top:none;
      }

      .content-left{
        @include abs-group(0,5px,0,5px) ;
        position:absolute;
        font-size:13px;

        .tree-scroll {
          @include abs-group(0,5px) ;
          overflow-y: auto;
        }
        .content-tree{
          @include abs-group(0,35px) ;
          overflow: auto;
        }
      }

      .right-header {
        @include abs-group(5px,0,5px,false);
        height: 25px;
      }
      .right-body{
        @include abs-group(0,32px);
        overflow-y: auto;
      }

      .diy-icon {
        font-size: 16px;
        font-weight: bold;
      }

    }
  }

</style>

<template>
   <div class="container">

     <!--tab button-->
     <div class="tab-btn">
       <div class="inner">
         <el-tabs type="border-card" v-model="viewData.treeState" >
           <el-tab-pane name="data" >
             <span slot="label"><i class="iconfont tj-shujuku"></i>输入</span>
           </el-tab-pane>
           <el-tab-pane  name="handler" >
             <span slot="label"><i class="iconfont tj-banshou"></i>组件</span>
           </el-tab-pane>
           <el-tab-pane  name="out" >
             <span slot="label"><i class="iconfont tj-banshou"></i>输出</span>
           </el-tab-pane>
         </el-tabs>
       </div>
     </div>

     <!--tab content-->
     <div class="content">
       <div class="content-bor">

         <!--数据源-->
         <div class="content-left" v-show="viewData.treeState==='data'">

           <div style="left:5px;right:5px;position:absolute;height:25px;">
             <el-input size="mini" placeholder="表名" v-model="viewData.inputValu"></el-input>
           </div>

           <div class="content-tree">
             <el-tree node-key="idl"
                      :default-expanded-keys="['old','handler']"
                      @node-expand="(node,data)=>{this.viewPM.loadResultLevel(node,data)}"
                      :data="viewData.treeData"
                      :props="viewData.treeProps">
                 <span class="custom-tree-node"
                       style="user-select:none;"
                       slot-scope="{ node, data }"
                       @mousedown="viewPM.nodeDownHandler($event,data,'data' )">
                    <i v-if="data.type==='area'" class="iconfont tj-Grouping"></i>
                    <i v-if="data.type==='orgRoot'" class="iconfont tj-leimupinleifenleileibie2"></i>
                    <i v-if="data.type==='org'" class="iconfont tj-morenbumen"></i>
                    <i v-if="data.type==='source'" class="iconfont tj-shujuku"></i>
                    <i v-if="data.type==='table'" class="iconfont tj-biaoge1"></i>
                    <i v-if="data.type==='file'" class="el-icon-document"></i>
                    <i v-if="data.type==='themeFold'||data.type==='orgFold'" class="iconfont tj-wenjianjiafolders4"></i>
                    <i v-if="data.type==='temp'" class="el-icon-loading"></i>
                   <span>{{ node.label }}</span>
                 </span>
             </el-tree>
           </div>
         </div>

         <!--处理-->
         <div class="content-left" v-show="viewData.treeState==='handler'">
           <div class="right-header">
             <h-group-iwt style="width:100%;height:100%;">
               <el-input size="mini" placeholder="名称"></el-input>
             </h-group-iwt>
           </div>

           <div class="right-body" v-if="viewData.modelType === '0'">
           <el-tree :data="viewData.controls"
                    :props="viewData.treeOptions"
                    @node-expand="(node,data)=>{this.viewPM.queryOperatorList(node,data)}">
                   <span class="custom-tree-node"
                         style="user-select:none;"
                         slot-scope="{ node, data }"
                          @mousedown="viewPM.nodeDownHandler($event,data,'operator')">
                        <i v-if="data.type==='group'" class="iconfont tj-leimupinleifenleileibie2"></i>
                        <i  v-else class="iconfont tj-msnui-running"></i>
                        <span>{{ node.label }}</span>
                   </span>
           </el-tree>
           </div>

           <div class="right-body" v-if="viewData.modelType === '1'">
             <el-tree :data="viewData.controlsFile"
                      :props="viewData.treeOptions"
                      @node-expand="(node,data)=>{this.viewPM.queryOperatorList(node,data)}">
                   <span class="custom-tree-node"
                         style="user-select:none;"
                         slot-scope="{ node, data }"
                         @mousedown="viewPM.nodeDownHandler($event,data,'operator')">
                        <i v-if="data.type==='group'" class="iconfont tj-leimupinleifenleileibie2"></i>
                        <i  v-else class="iconfont tj-msnui-running"></i>
                        <span>{{ node.label }}</span>
                   </span>
             </el-tree>
           </div>



         </div>

         <!--输出-->
         <div class="content-left" v-show="viewData.treeState==='out'">

           <div style="left:5px;right:5px;position:absolute;height:25px;">
             <el-input size="mini" placeholder="库名"></el-input>
           </div>

           <div class="content-tree">
             <el-tree node-key="idl"
                      @node-expand="(node,data)=>{this.viewPM.loadLevelDb(node,data)}"
                      :data="viewData.dbTreeData"
                      :props="viewData.treeProps">
                 <span class="custom-tree-node"
                       style="user-select:none;"
                       slot-scope="{ node, data }"
                       @mousedown="viewPM.nodeDownHandler($event,data,'data' )">
                    <i v-if="data.type==='area'" class="iconfont tj-Grouping"></i>
                    <i v-if="data.type==='orgRoot'" class="iconfont tj-leimupinleifenleileibie2"></i>
                    <i v-if="data.type==='org'" class="iconfont tj-morenbumen"></i>
                    <i v-if="data.type==='source'" class="iconfont tj-shujuku"></i>
                    <i v-if="data.type==='temp'" class="el-icon-loading"></i>
                   <span>{{ node.label }}</span>
                 </span>
             </el-tree>
           </div>
         </div>
       </div>
     </div>
   </div>
</template>


