<script>
    import TagManagerMarkerPM from "../TagManagerMarkerPM" ;
    import Inject from "@/common/model/Inject" ;

    export default {
        data() {
          this.viewPM = Inject.getClass(TagManagerMarkerPM) ;
            return {
              viewData:this.viewPM.data
            }
        },
        mounted() {

        },
        activated() {

        },
        methods: {}
    }
</script>

<style scoped lang="scss">
  .container{
    @include abs-group();

    .layout{
      @include abs-group(5px,5px,5px,0) ;

      .source {
        flex:none;
        width:100%;
        max-height: 135px;
        height:auto;
        overflow-y: auto;
        position: relative;
        border:1px solid $form-borderColor;
        border-radius: 3px;
        padding:5px 0px;

        .source-layout {
          .source-item{
            flex:none;
            box-sizing: border-box;
            border:1px solid $form-borderColor;
            border-radius:2px;
            position:relative;
            padding: 3px 5px ;
            overflow: hidden;
            margin: 3px;
            .item-inner{
              .item-icon{
                 font-size:13px;
                 color:#555;
              }
              .item-label{
                flex:none;
                max-width:100px;
                min-width:50px;
                font-size:12px;
                color:#000;
                word-break: break-all;
                white-space:nowrap;
                overflow:hidden;
                text-overflow: ellipsis;
                margin: 0 5px 0 5px;
              }
              .item-close{
                font-size:13px;
                color:#555;
                cursor: pointer;
                &:hover{
                  color:#6060c4;
                }
              }
            }

          }


        }
      }
      .mid-gap{
        height:10px;
      }
      .tag{
        flex: auto;
        width:100%;
        position: relative;
        border:1px solid $form-borderColor;
        border-radius: 3px;

        .left-tree {
          @include abs-group(0, 0, false, 0) ;
          width:217px;
          overflow:hidden;
          border-right: 1px solid $form-borderColor;
          box-sizing: border-box;

          .tree-header{
            width:217px;
            height:30px;
            background-color:#e5e9f2;
            border-bottom: 1px solid $form-borderColor;
            .title{
              font-size:14px;
              color:#000 ;
              line-height:30px;
              vertical-align: middle;
              padding-left: 10px;
            }
          }

          .tree-content{
            @include abs-group(0,30px,0,0) ;
            overflow: auto;
            .tree-inner {
              @include abs-group(5px,5px,0px,5px) ;
              overflow: auto;
            }
          }

        }
        .tag-list{
          @include abs-group(217px, 0, 0, 0) ;
          overflow-y:auto;
          .layout{
            .tag-item{
              flex:none;
              max-width:200px;
              min-width:50px;
              box-sizing: border-box;
              border-radius:3px;
              position:relative;
              background-color: #6060c4;
              padding: 3px 5px 3px 10px;
              margin: 5px;
              color:#fff;
              font-size:16px;
              .item-inner{
                .item-label{
                  flex:auto;
                  word-break: break-all;
                  white-space:nowrap;
                  overflow:hidden;
                  text-overflow: ellipsis;
                  margin: 0 5px 0 0;
                }
                .item-close{
                  font-size:13px;
                  cursor: pointer;
                  &:hover{
                    color:#6060c4;
                  }
                }
              }
            }

            .level-{
              background-color: #d72a27;
              font-size:13px;
            }
            .level-0{
              background-color: #d72a27;
              font-size:18px;
            }
            .level-1{
              background-color: #7da73f;
              font-size:16px;
            }
            .level-2{
              background-color: #25a3cb;
              font-size:14px;
            }
            .level-3{
              background-color: #f27521;
              font-size:13px;
            }
            .level-4{
              background-color: #d0147e;
              font-size:12px;
            }
            .level-mini{
              background-color: #e49f7d;
              font-size:12px;
            }
          }
        }
      }
      .footer-gap{
        height:10px;
      }
      .footer{
        width:100%;
      }
    }
  }

</style>

<template>
  <s-window @close="viewPM.closeTagWin()"
            :title="'打标签'+(viewData.tagSingleFlag?('(资源:'+viewData.tagSource.tableName+')'):'')"
            :visible="viewData.isPopTag"
            :width="'660px'"
            :height="'500px'" >

     <div class="container">
        <v-group-iwt class="layout">

          <div class="source" v-show="viewData.tagSingleFlag===false">
            <tile-group-iwt class="source-layout">
              <div class="source-item"
                   v-for="(item,index) in viewData.tagSourceList"
                   :key="index">

                <h-group-iwt class="item-inner">

                  <i class="iconfont tj-biaoge item-icon"
                     v-if="item.resourceStyle==='database'"></i>
                  <i class="iconfont tj-wenjian item-icon"
                     v-if="item.resourceStyle==='file'"></i>
                  <div class="item-label">{{item.tableName}}</div>
                  <i class="iconfont tj-guanbi1 item-close"
                     @click="viewPM.removeTagSource(item)"></i>
                </h-group-iwt>
              </div>
            </tile-group-iwt>
          </div>

          <div class="mid-gap"></div>

          <div class="tag">

            <div class="left-tree">

              <div class="tree-header">
                <div class="title">资源标签</div>
              </div>
              <div class="tree-content">
                <div class="tree-inner">

                <el-tree :data="viewData.tagTreeData"
                         :default-expand-all="true"
                         :expand-on-click-node="false">
                     <span slot-scope="{ node, data }">
                        <el-checkbox v-model="data.selected"
                                     @change="viewPM.tagItemSelect(data)">
                        </el-checkbox>
                        <i class="iconfont tj-biaoqian"></i>
                        <span @click="viewPM.tagItemSelect(data,true)">{{data.tname}}</span>
                     </span>
                </el-tree>

              </div>
              </div>
            </div>

            <div class="tag-list">
              <tile-group-iwt class="layout">

                <div  v-for="(item,index) in viewData.tagAddList"
                     :key="index"
                     :class="['tag-item','level-'+item.levelStyle]">
                  <h-group-iwt class="item-inner">
                    <div class="item-label"> {{item.tname}} </div>
                    <i class="iconfont tj-guanbi1 item-close"
                       @click="viewPM.tagClose(item)"></i>
                  </h-group-iwt>

                </div>

              </tile-group-iwt>
            </div>

          </div>

          <div class="footer-gap"></div>

          <h-group-iwt :hor="'center'" class="footer">
            <el-button type="primary"
                       @click="()=>{this.viewPM.submitTag()}">保存</el-button>
            <el-button type="warning"
                       @click="()=>{this.viewPM.closeTagWin()}">关闭</el-button>
          </h-group-iwt>

        </v-group-iwt>
     </div>

   </s-window>
</template>
