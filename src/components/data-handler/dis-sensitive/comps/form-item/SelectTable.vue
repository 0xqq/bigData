<script>
  import FormItemUtils from "@/common/utils/FormItemUtils" ;
    import SelectTablePM from "./SelectTablePM";

    export default {
      props: {
        'label': {default: ""},
        "owner": {},
        'data': {},
        desc: {default: ""}
      },
      components: { },
      data() {
        this.viewPM = new SelectTablePM();
        this.node = null;

        return {
          viewData: this.viewPM.data,
          vmodeData: "",
          showLabel: "",
          isHive:false,//是否是hive表
          showTree: false,
          connection:"",
          tableId:""
        }
      },
      mounted() {
        this.initData();
        this.viewPM.initView();//初始化
      },
      watch: {
        data: function () {
          this.initData();
        }
      },
      methods: {
        initData() {
          this.vmodeData = "";
          this.isHive = false ;
          this.viewPM.isHive = false ;
          this.viewPM.initTreeData() ;
          if (this.data) {
            this.showLabel = this.data.value;
            this.tableId = this.data.tableId || "tableId";
            this.connection = this.data.connection || "connection" ;
            this.vmodeData = FormItemUtils.getFormData(this.owner, this.connection);
            if(this.data.isHive ) {
              this.isHive = true ;
              this.viewPM.isHive = true ;
            }
          }
        },

        /**
         * 显示表选择框
         */
        showSelectTable() {
          this.showTree = true;
        },

        submit(node) {
          if( node.type!=="table")
            return ;

          this.vmodeData = node.dbId;
          this.showLabel = node.label;
          this.data.value = this.showLabel;
          FormItemUtils.setFormData(this.owner,this.connection,this.vmodeData );
          FormItemUtils.setFormData(this.owner,this.tableId,node.id );
          this.showTree = false;
        },

        closeWin() {
          this.showTree = false;
        }
      }
    }
</script>

<style lang="scss" scoped>

  .mask-win {
    z-index: 9999999999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.2) ;
    .layout {
      width: 100%;
      height: 100%;
    }
    .pop-window {
      width: 300px;
      height: 470px;
      flex: none;
      position: relative;
      border: 1px solid #f5eeee;
      border-radius:3px;
      background-color: #ffffff;
      .header {
        top: 0;
        left:0;
        right:0;
        height:40px;
        position: absolute;
        line-height: 40px;
        vertical-align: middle;
        padding: 0 10px;
        .title{
          font-size:15px;
          font-weight: bold;
        }
        .close-btn{
          right:10px;
          top:0px;
          height:40px;
          cursor: pointer;
          position:absolute;
        }
      }
      .body {
        top: 40px;
        bottom: 10px;
        left: 10px;
        right: 10px;
        border:1px solid #f5eeee;
        position: absolute;
        overflow-y: auto;
      }
      .footer {
        bottom: 5px;
        height: 40px;
        position: absolute;
        width: 100%;
      }
    }
  }

  .input-box{
    flex:auto;
    margin-right: 5px;
    height:28px;
    .input-border {
      border: 1px solid #dcdfe6;
      height: 28px;
      line-height:28px;
      vertical-align: middle;
      overflow:hidden;
      border-radius: 3px;
      left:0;
      right:0;
      top:0;
      position:relative;
      padding: 0px 5px ;
      flex:none;
    }
  }

</style>

<template>
  <div style="width:100%;">

    <h-group-iwt style="width:100%;">
      <div class="tj-diy-form-item-lb">{{label}}：</div>
      <div class="input-box">
        <div class="input-border">{{showLabel}}</div>
      </div>
      <el-button type="primary" size="mini"  @click="showSelectTable" >选择表</el-button>
      <div v-if="desc" class="tj-diy-form-item-desc" :title="desc" > </div>
    </h-group-iwt>

    <div class="mask-win" v-show="showTree">
      <h-group-iwt :hor="'center'" class="layout">
        <div class="pop-window"  >
              <div class="header">
                <span class="title" >选择表</span>
                <div class="close-btn">
                  <i class="iconfont tj-guanbi1" @click="closeWin" title="退出"></i>
                </div>
              </div>

              <div class="body" >
                <el-tree node-key="idl"
                         :default-expanded-keys="['old', 'handler']"
                         @node-expand="(node,data)=>{this.viewPM.loadResultLevel(node,data)}"
                         @node-click="(node,data)=>{this.submit(node,data)}"
                         :data="viewData.treeData"
                         :props="viewData.treeProps">
              <span class="custom-tree-node"
                    style="user-select:none;"
                    slot-scope="{ node, data }" >
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

              <!--<h-group-iwt :hor="'center'" class="footer">-->
                <!--<el-button type="primary" size="mini" @click="submit">保存</el-button>-->
                <!--<el-button type="danger" size="mini"  @click="closeWin">关闭</el-button>-->
              <!--</h-group-iwt>-->
          </div>
      </h-group-iwt>

    </div>
  </div>
</template>
