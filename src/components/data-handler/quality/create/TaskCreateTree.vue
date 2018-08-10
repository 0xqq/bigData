<script>
  import TaskTreePM from "./TaskTreePM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    data() {
      this.viewPM = new TaskTreePM()  ;
      return {
        auth:AuthManager.has,
        showControl:false,
        viewData:this.viewPM.data
      }
    },
    mounted() {
      this.viewPM.initView() ;//初始化
    },
    methods: {
      loadNode1(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: 'region' }]);
        }
        if (node.level > 1) return resolve([]);

        setTimeout(() => {
          const data = [{
            name: 'leaf',
            leaf: true
          }, {
            name: 'zone'
          }];

          resolve(data);
        }, 500);
      }
    }
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
    width:220px;

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
             <span slot="label"><i class="iconfont tj-shujuku"></i> 数据源</span>
           </el-tab-pane>
           <el-tab-pane  name="handler" >
             <span slot="label"><i class="iconfont tj-banshou"></i> 处理行为</span>
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
             <el-input size="mini" placeholder="表名、数据库名、文件名" v-model="viewData.inputValu"></el-input>
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
                    <i v-if="data.type==='org'||data.type==='orgRoot'" class="iconfont tj-leimupinleifenleileibie2"></i>
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
               <h-gap-iwt></h-gap-iwt>
               <i class="el-icon-circle-plus"
                  v-if="auth['54']"
                  @click="viewPM.popAddDiy()"
                  title="添加自定义算子"
                  style="cursor:pointer;font-size: 20px;color:#909399;"></i>
               <h-gap-iwt></h-gap-iwt>
             </h-group-iwt>
           </div>

           <div class="right-body">
           <el-tree :data="viewData.controls"
                    :props="viewData.treeOptions" >
                   <span class="custom-tree-node" style="user-select:none;"  slot-scope="{ node, data }"
                         @mousedown="viewPM.nodeDownHandler($event,data,'operator')">
                      <i :class="['iconfont',data.icon]"></i>
                     <span>{{ node.label }}</span>

                      <span  v-if="data.type==='diy'">
                         <i class="el-icon-edit-outline diy-icon"></i>
                         <i class="el-icon-delete diy-icon"></i>
                        </span>
                   </span>
           </el-tree>
           </div>
         </div>

       </div>
     </div>
   </div>
</template>


