<template>
  <div style="width:220px;top:0;bottom:0;left:0;position:absolute;">
    <!--tab button-->
    <div style="position:absolute;left:0;top:0;height:40px;right:0;overflow: hidden;border-left:1px solid #dcdfe6;border-right:1px solid #dcdfe6;">
      <div style="width:300px;left:-10px;position:absolute;">
        <el-tabs type="border-card" v-model="viewData.treeState" >
          <el-tab-pane name="data" >
            <span slot="label"><i class="iconfont tj-shujuku"></i> 数据源</span>
          </el-tab-pane>
          <el-tab-pane  name="handler" >
            <span slot="label"><i class="iconfont tj-banshou"></i> 处理组件</span>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!--tab content-->
    <div style="position:absolute;top:40px;left:0;bottom:0;right:0;">
      <div class="tab-content-bor">

        <!--数据源-->
        <div class="content-left" v-show="viewData.treeState==='data'">

          <div style="left:5px;right:5px;position:absolute;height:25px;">
            <el-input size="mini" placeholder="表名、数据库名"></el-input>
          </div>

          <div style="left:0;right:0;bottom:0;top:32px;position:absolute;overflow-y: auto;">
            <el-tree :data="viewData.dataTree"
                     node-key="id"
                     :default-expanded-keys="['old','handler']"
                     :props="viewData.treeOptions" >
                   <span class="custom-tree-node"
                         style="user-select:none;"
                         slot-scope="{ node, data }"
                         @mousedown="viewPM.nodeDownHandler($event,data,'data' )">
                      <i v-if="data.type==='area'" class="iconfont tj-Grouping"></i>
                      <i v-if="data.type==='group'" class="iconfont tj-leimupinleifenleileibie2"></i>
                      <i v-if="data.type==='db'" class="iconfont tj-shujuku"></i>
                     <i v-if="data.type==='table'" class="iconfont tj-biaoge1"></i>
                     <span>{{ node.label }}</span>
                   </span>
            </el-tree>
          </div>
        </div>

        <!--处理-->
        <div class="content-left" v-show="viewData.treeState==='handler'">
          <div style="left:5px;right:5px;position:absolute;height:25px;">
            <h-group-iwt style="width:100%;height:100%;">
              <el-input size="mini" placeholder="名称"></el-input>
              <h-gap-iwt></h-gap-iwt>
              <i class="el-icon-circle-plus"  title="添加自定义算子" style="cursor:pointer;font-size: 20px;color:#909399;"></i>
              <h-gap-iwt></h-gap-iwt>
            </h-group-iwt>
          </div>

          <div style="left:0;right:0;bottom:0;top:32px;position:absolute;overflow-y: auto;">
            <el-tree :data="viewData.controls"
                     :props="viewData.treeOptions" >
                   <span class="custom-tree-node" style="user-select:none;"  slot-scope="{ node, data }"
                         @mousedown="viewPM.nodeDownHandler($event,data,'operator')">
                      <i :class="['iconfont',data.icon]"></i>
                     <span>{{ node.label }}</span>

                      <span  v-if="data.type==='diy'">
                         <i style="font-size:16px;font-weight: bold;" class="el-icon-edit-outline"></i>
                         <i style="font-size:16px;font-weight: bold;" class="el-icon-delete"></i>
                        </span>
                   </span>
            </el-tree>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import TaskCreatePM from "./TaskTreePM" ;
  import Inject from "@/common/model/Inject" ;

  let viewPM = Inject.getClass(TaskCreatePM)  ;
  export default {
    data() {
      return {
        showControl:false,
        viewData:viewPM.data
      }
    },
    mounted() {
      this.viewPM = viewPM ;
    },
    methods: {
    }
  }
</script>
<style scoped>

  .content-left{
    left:0px;
    top:5px;
    right:0px;
    bottom:5px;
    position:absolute;
    font-size:13px;
  }

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

  .tab-content-bor {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    border-left: 1px solid #dcdfe6;
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

</style>
