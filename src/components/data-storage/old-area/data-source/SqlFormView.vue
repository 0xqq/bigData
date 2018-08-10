<script>
  import Inject from "@/common/model/Inject" ;
  import SqlFormViewPM from "./SqlFormViewPM" ;

    export default {
      data() {
        this.viewPM = Inject.getClass(SqlFormViewPM);
        return {
          auth:AuthManager.has,
          viewData: this.viewPM.data
        }
      },
      computed: {},
      mounted() {
        this.viewPM.initView() ;
        if(!AuthManager.has["4233"])
          this.viewPM.data.currentView = "sql" ;
        else if(!AuthManager.has["4232"])
          this.viewPM.data.currentView = "" ;
      },
      activated() {

      },
      methods: {}
    }
</script>

<style scoped lang="scss">

  $bg-color:#f5f7fa;
  $border-color:#dcdfe6;
  $font-color:#96999f ;
  $btn-color:#909399;

  .container{
    @include abs-group(10px,10px,10px,10px) ;
    .c-layout{
      @include abs-group( ) ;
    }

    .box-header{
      @include abs-group(0,0,0,false) ;
      background-color:$bg-color;
      height:25px;
      line-height:25px;
      vertical-align: middle;
      padding-left: 10px;
      font-size:12px;
      color:$font-color;
      box-sizing: border-box;
      border-bottom:1px solid $border-color;
      overflow: hidden;

      .left-h{
        @include abs-group(0,0,40%,0) ;
      }
      .right-h{
        @include abs-group(60%,0,0,0) ;
        border-left:1px solid $border-color;
      }

      .con-lb{
        flex:auto;
        padding-left: 10px;
      }
      .con-btn{
        flex:none;
        cursor: pointer;
        margin-right: 10px;
        color:$btn-color;
        font-weight: bold;
        &:hover{
          color:#5dc33d;
        }
      }

    }

    .box-content{
      @include abs-group(0,25px) ;
      overflow-x: hidden;
      overflow-y: auto;
    }

    .tree-box{
      flex:none;
      height:100%;
      width:250px;
      position:relative;
      border:1px solid $border-color;
      box-sizing: border-box;

      .tree-lb{
        font-size:12px;
      }
    }

    .gap{
      flex:none;
      width:5px;
    }

    .content-box{
      flex:auto;
      height:100%;
      position:relative;
      border:1px solid $border-color;
      box-sizing: border-box;

      .control-gap{
        flex:none;
        width:15px;
      }
      .view-input{
        @include abs-group(0,25px,40%,40px) ;
        overflow-x: hidden;
        overflow-y: auto;

        .field-item{
          background-color: #646a7d;
          border-radius: 3px;
          cursor: pointer;
          color:#fff;
          margin:8px 3px 0 3px ;
          padding: 2px 4px ;
          box-sizing: border-box;
          font-size:12px;
          .icon{
            font-size:12px;
            &:hover{
              color:5dc33d;
            }
          }
        }

        .db-box{
          flex:none;
          width:100%;
          height:50px;
          line-height:50px;
          border-bottom:1px solid $border-color;
          &>div{
            height:100%;
            margin-left: 10px;
          }
        }
        .sql-input{
          flex:auto;
          width:100%;
          overflow: hidden;
          & textarea{
            width:100%;
            height:200px;
            padding: 3px 5px;
            box-sizing: border-box;
            user-focus: none;
            border:none;
            outline:none;
            resize:none;
          }
        }
      }

      .table-view{
        @include abs-group(60%,25px,0,0) ;
        border-left:1px solid $border-color ;
        box-sizing: border-box;
        overflow: hidden;
      }

      .table-view-max{
        z-index:2000;
        position:fixed;
        left:0px;
        top:0px;
        bottom:0px;
        right:0px;
        background-color: #fff;
        overflow: hidden;
        border:1px solid $border-color ;
      }

      .table-view-inner{
        @include abs-group( ) ;
        overflow: hidden;
      }
      .close-btn{
        @include abs-group(0,0,false,false) ;
        width:20px;
        height:20px;
        line-height:20px;
        font-size:20px;
        color:$btn-color;
        cursor: pointer;
        vert-align: middle;
        text-align: center;
        &:hover{
          color:#f17e74;
        }
      }

      .drag-view{
        @include abs-group() ;
        overflow: hidden;
      }

      .control-area{
        @include abs-group(0,false,40%,0) ;
        height:40px;
        border-top:1px solid $border-color ;
        box-sizing: border-box;
        .control-btn{
          @include abs-group(false,0,10px,0) ;
        }
      }

    }
  }
</style>

<template>
    <div class="container">
      <h-group-iwt class="c-layout">

        <div class="tree-box">
          <div class="box-header">
            数据源
          </div>
          <div class="box-content">
            <el-tree node-key="idl"
                     @node-expand="(node,data)=>{this.viewPM.loadResultLevel(node,data)}"
                     :data="viewData.treeData"
                     :props="viewData.treeProps">

                    <span class="custom-tree-node"
                          style="user-select:none;"
                          slot-scope="{ node, data }"
                          @mousedown="viewPM.nodeDownHandler($event,data )">
                        <i v-if="data.type==='area'" class="iconfont tj-Grouping"></i>
                        <i v-if="data.type==='org'||data.type==='orgRoot'" class="iconfont tj-leimupinleifenleileibie2"></i>
                        <i v-if="data.type==='source'" class="iconfont tj-shujuku"></i>
                        <i v-if="data.type==='themeFold'||data.type==='orgFold'" class="iconfont tj-wenjianjiafolders4"></i>
                        <i v-if="data.type==='temp'" class="el-icon-loading"></i>
                        <i v-if="data.type==='field'" class="iconfont tj-shuxing1"></i>
                        <i v-if="data.type==='table'" class="iconfont tj-biaoge1"></i>
                       <span class="tree-lb">{{ node.label }}</span>
                     </span>
            </el-tree>
          </div>
        </div>

        <div class="gap"></div>

        <div class="content-box" >
          <div class="box-header">

            <h-group-iwt class="left-h"
                         v-if="auth['4232']"
                         v-show="viewData.currentView==='sql'">
              <div class="con-lb">
                <span >SQL模式(拖曳数据库输入SQL进行查询)</span>
              </div>
              <div class="con-btn"
                   title="切换视图模式，拖曳表或字段查询"
                   @click="viewPM.changeView('view')">&lt;视图选择&gt;</div>
            </h-group-iwt>

            <h-group-iwt class="left-h"
                         v-if="auth['4233']"
                         v-show="viewData.currentView==='view'">
               <div class="con-lb">
                 <span >视图模式(快速拖曳图表或字段进行快速查询)</span>
               </div>
               <div class="con-btn"
                    title="切换SQL模式，直接输入SQL查询"
                    @click="viewPM.changeView('sql')">&lt;输入SQL&gt;</div>
            </h-group-iwt>

            <h-group-iwt :hor="'end'" class="right-h">
              <div class="con-lb">
                 建立表关系(拖拽关联字段建立关系)
              </div>
              <div class="con-btn">
                <i class="iconfont tj-quanpingzuidahua" @click="viewPM.maxShow()"></i>
              </div>
            </h-group-iwt>
          </div>

          <div class="view-input"
               v-bind:id="viewData.autoId">

            <v-group-iwt class="db-sql"  v-show="viewData.currentView==='sql'">

              <div class="db-box">
                <h-group-iwt v-show="viewData.hasDb">
                  <i class="iconfont tj-shujuku"></i>
                  <span>
                    {{viewData.sqlDbName}}
                  </span>
                </h-group-iwt>
              </div>
              <div class="sql-input">
                  <textarea v-model="viewData.inputSql"
                            placeholder="请输入SQL语句" >
              </textarea>
              </div>
            </v-group-iwt>

            <tile-group-iwt style="width:100%"  v-show="viewData.currentView==='view'">
              <div class="field-item"
                   :title="item.showLabel"
                   v-for="(item,index) in viewData.fieldList">
                <h-group-iwt >
                  <span style="margin-right: 5px;">{{item.showLabel}}</span>
                  <i class="iconfont tj-guanbi1 icon" @click="viewPM.removeField(item)"></i>
                </h-group-iwt>
              </div>
            </tile-group-iwt>
          </div>

          <!--简单做-->
          <div :class="[viewData.isMax?'table-view-max':'table-view']" >
            <div class="table-view-inner"
                 v-show="viewData.currentView==='view'"
                 v-bind:id="viewData.autoId+'table'">

            </div>

            <!--以前结构不动单加-->
            <div class="box-header" v-show="viewData.isMax">
              <h-group-iwt style="width:100%;height:100%;">
                <div class="con-lb">
                  建立表关系
                </div>
                <div class="con-btn">
                  <i class="iconfont tj-guanbi1" @click="viewPM.maxShow(false)"></i>
                </div>
              </h-group-iwt>
            </div>
          </div>

          <div class="control-area">

            <h-group-iwt class="control-btn">
              <el-button type="primary" size="mini" @click="viewPM.submit()">执行</el-button>
              <div class="control-gap"></div>
              <el-button type="danger" size="mini" @click="viewPM.reset()">重置</el-button>
            </h-group-iwt>

          </div>

        </div>


      </h-group-iwt>
    </div>
</template>
