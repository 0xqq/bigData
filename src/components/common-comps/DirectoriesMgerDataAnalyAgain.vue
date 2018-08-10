<script>
  import DirectoriesMgerDataAnalyAgainPM from "./DirectoriesMgerDataAnalyAgainPM" ;
  import NormalUtils from "@/common/utils/NormalUtils";

  export default {
    props: {
      title: {default: "选择文件"}
    },
    data() {
      this.viewPM = new DirectoriesMgerDataAnalyAgainPM();
      return {
        viewData: this.viewPM.data
      }
    },
    watch: {
    },
    mounted() {
    },
    methods: {
      /**
       * 关闭窗口
       */
      closeWin() {
        this.$emit("close");
        this.viewPM.closeWin() ;
      },

      /**
       * 打开窗口
       */
      open(data,type=-1,hasAdd=true) {
        this.viewPM.initView(data,type,hasAdd) ;
      },

      /**
       * 选择提交
       */
      selectSubmit(item){
        let result = NormalUtils.copyObjectDeep(item) ;
        result.path = this.viewPM.rootPath + item.path ;
        let one = result.path.split('/');
        let two = one.splice(3,2).join('/');
        let genRoot = JSON.parse(sessionStorage.getItem('analyLuTwo'));
        let three = genRoot +'/'+ two;
        this.$emit("submit",three);//当前选中文件夹
        this.viewPM.closeWin() ;
      }
    }
  }
</script>

<style scoped lang="scss">

  .container {
    @include abs-group(0, 0, 0, 0);
    border: 1px solid $form-borderColor;
    .left-container {
      @include abs-group(0, 0, false, 0);
      width: 220px;
      border-right: 1px solid $form-borderColor;
      box-sizing: border-box;

      .tree-inner{//多加一层
        @include abs-group(5px,5px, 5px, 5px);
        overflow: auto;
        .table-scroll{
          @include abs-group();
          overflow: auto;
        }
      }
    }
    .right-container {
      @include abs-group(220px, 0, 0, 0);

      .top-control {
        @include abs-group(0,0, 0, false);
        height:32px;
        background-color: #edf5fd;
        border-bottom: 1px solid #a0afc3;
        color:#000 ;
        font-size:12px;
        .layout{
          @include abs-group(10px,0, 10px, 0);
          .control-btn{
            cursor:pointer;
            margin: 0 10px;
            flex:none;
            color:#5a5a5a ;
          }
          .input-box{
            margin:0 10px 0 0 ;
            flex:1 0 auto;
            height:25px;
            padding:0 5px 0 5px;
            background-color: #ffffff;
            border:1px solid $form-borderColor ;
            border-radius: 3px;
            position:relative;
            input{
              width:100%;
            }
            .enter-btn{
              @include abs-group(false,0,0,0) ;
              height:25px;
              line-height:27px;
              vertical-align: middle;
              cursor: pointer;
              padding-right: 5px;
              .enter-icon{
                font-size:15px;
                font-weight: bold;
                color:#aea5a5 ;
                &:hover{
                  color:#6363ee ;
                }
              }
            }
          }
          .add-btn{
            width:30px;
            height:30px;
            cursor:pointer;
            position:relative;
            .icon-box {
              text-align: center;
              line-height: 30px;
              vertical-align: middle;
              width: 30px;
              height: 30px;
              position: absolute;
              .icon-bg{
                font-size:30px;color:#e4cd66
              }
              .icon-add{
                font-size:15px;
                color:#5a5a5a;
                margin-top:2px;
              }
            }
          }
          .icon-dis{
            color:#0165b7 ;
            font-size:25px;
            opacity:0.5;
            cursor: none;
          }
          .page-btn{
            margin:0 10px 0 0 ;
            color:#0165b7 ;
            font-size:25px;
            cursor: pointer;
            &:hover{
              color:#6363ee ;
            }
          }
        }
      }

      .fold-list{
        @include abs-group(0,32px, 0, 0);
        overflow-y: auto;
        overflow-x: hidden;
        .layout{
          @include abs-group(10px,10px, 10px, false);
          .list-item-box{
            flex:none;
            width:90px;
            height:88px;
            position:relative;
            border:1px solid rgba(125,162,206,0) ;
            border-radius:3px;
            box-sizing: border-box;
            &:hover{
              background-color: #f8fafd;
              border:1px solid rgba(125,162,206,1) ;
            }

            .fold-icon{
              @include abs-group(10px,15px,10px,10px);
              text-align: center;
              .list-icon{
                font-size:40px;
                color:#e4cd66;
                text-shadow: 2px 2px 2px rgba(0,0,0,.3);
              }
              .file-icon{
                font-size:36px;
                color:#a4a4a4;
              }
            }
            .fold-label{
              @include abs-group(5px,false,5px,10px);
              text-align: center;
              line-height: 20px;
              font-size:12px;
              color:#000;
              width:90px;
              overflow: hidden;
              word-break: break-all;
              text-overflow:ellipsis;
              white-space:nowrap;
            }
            .mouse-mask{
              @include abs-group( );
              cursor: pointer;
            }
            .pointer-div{
              @include abs-group( );
            }
            .check-box{
              @include abs-group(false,3px,3px,false);
              .check-btn{
                color:#7da2ce;
                background-color: #fff;
                cursor: pointer;
                font-size:18px;
                &:hover{
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
  }
  .tree-fold-icon{
    font-size:18px;
    color:#e4cd66;
  }

  .tree-label{
    color:#000;
    font-size:12px;
  }
  .layout-auto{
    width:100%;
  }

  .add-form-inner{
    @include abs-group(10px,10px,10px,10px );
  }

</style>

<template>
  <s-window @close="closeWin"
            :title="title"
            :visible="viewData.isOpen"
            :width="'70%'"
            :height="'80%'" >

    <div class="container" >
      <div class="left-container">
        <div class="tree-inner">

          <div class="table-scroll">
            <el-tree :data="viewData.leftTreeData"
                     :expand-on-click-node="false"
                     @node-click="(node)=>{this.viewPM.queryFoldSubList(node)}"
                     @node-expand="(node,data)=>{this.viewPM.queryFoldList(node,data)}"  >
                       <span slot-scope="{ node, data }">
                           <i v-if="data.type==='temp'" class="el-icon-loading"></i>
                           <i v-if="data.type==='fold'" class="iconfont tj-wenjian1 tree-fold-icon"></i>
                           <span class="tree-label" >{{data.name}}</span>
                      </span>
            </el-tree>

          </div>
        </div>
      </div>

      <div class="right-container">

        <div class="top-control">
          <h-group-iwt class="layout">
            <i class="iconfont tj-shangyiyehoutuifanhui-yuankuang page-btn"
               @click="viewPM.backFold()"></i>
            <div class="input-box">
              <input  type="text"
                      v-model="viewData.showPath"
                      class="tj-transparent-input"
                      @keyup.enter="viewPM.changeToFold(viewData.showPath)">
              <div class="enter-btn">
                <i class="iconfont tj-youjiantou enter-icon"></i>
              </div>
            </div>
            <div class="add-btn"
                 title="添加目录"
                 v-show="viewData.addEnabled"
                 @click="()=>{this.viewPM.popAddFoldWin()}">
              <div class="icon-box">
                <i class="iconfont tj-weibiaoti5 icon-bg" ></i>
              </div>
              <div class="icon-box">
                <i class="iconfont tj-jiahao icon-add" ></i>
              </div>
            </div>
          </h-group-iwt>
        </div>

        <div class="fold-list"
             @mousedown="viewPM.rightMenu($event)">
          <tile-group-iwt class="layout">

            <div class="list-item-box"
                 v-for="(item,index) in viewData.rightList"
                 :key="index" >

              <div class="fold-icon">
                <i class="iconfont tj-weibiaoti5 list-icon" v-if="item.type==='fold'"></i>
                <i class="iconfont tj-wenjian file-icon" v-if="item.type==='file'"></i>
              </div>

              <div class="fold-label">{{item.name}}</div>

              <div class="mouse-mask"
                   v-on:mouseenter="viewPM.foldItemOver(item)"
                   v-on:mouseleave="viewPM.foldItemLeave(item)" >

                <!--pointer-->
                <div class="pointer-div"
                     :title="item.name"
                     @click="viewPM.queryFoldSubList(item)">
                </div>

                <!--如果是选择模式显示-->
                <div v-show="viewData.selectMode && item.showCheck===true"
                     class="check-box" @click="selectSubmit(item)"
                     title="选择">
                  <i class="iconfont tj-xuanzekuang check-btn"></i>
                </div>
              </div>

            </div>

          </tile-group-iwt>
        </div>
      </div>
    </div>
    <!--loading-->
    <s-loading v-show="viewData.isLoading"></s-loading>

    <!--添加文件夹窗口-->
    <s-window @close="()=>{this.viewPM.closeAddFoldWin();}"
              title="添加目录"
              :visible="viewData.isAddPop"
              :width="'355px'"
              :height="'150px'">

      <div class="add-form-inner">
        <el-form ref="form"
                 size="small"
                 label-width="80px"
                 label-position="left">
          <el-form-item label="目录名称:" class="item-gap" >
            <el-input v-model="viewData.addFormName"
                      style="width:100%;"  ></el-input>
          </el-form-item>

          <h-group-iwt :hor="'center'" class="layout-auto">
            <el-button type="primary"   size="small"
                       style="min-width: 64px;"
                       @click="viewPM.sumbitAddFold()">确定</el-button>
            <el-button type="danger"  size="small"
                       style="min-width: 64px;"
                       @click="viewPM.closeAddFoldWin()">取消</el-button>
          </h-group-iwt>
        </el-form>

        <!--loading-->
        <s-loading v-show="viewData.isLoading"></s-loading>
      </div>
    </s-window>


  </s-window>
</template>
