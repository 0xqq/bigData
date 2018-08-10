<script>
    import GroupTree from "./vis-index/GroupTree" ;
    import VisualizationPM from "./VisualizationPM" ;
    import BoardFormWin from "./vis-index/BoardFormWin" ;
    import Inject from "@/common/model/Inject" ;


    export default {
        components:{GroupTree,BoardFormWin},
        data() {
          this.viewPM = Inject.getClass( VisualizationPM)  ;
            return {
              auth: AuthManager.has,
              viewData: this.viewPM.data
            }
        },
        computed: {},
        mounted() {},
        activated() {},
        methods: {}
    }
</script>

<style scoped lang="scss">
   $treeWidth:245px;

  .container{
    @include abs-group() ;
    background-color: #edf0f5;

    .tree{
      @include abs-group(0,0,false,0) ;
      @include shadow(2px,0,10px) ;
      width:$treeWidth;
    }

    .list{
      @include abs-group($treeWidth);

      .list-header{
        @include abs-group(0,0,0,false);
        @include shadow();
        height:50px;
        box-sizing: border-box;
        line-height:40px;
        vertical-align: middle;
        background-color: #fff;
        color:#343e47;
        font-size:15px;
        box-sizing: border-box;

        .header-layout{
          @include abs-group(25px,0,25px,0);
        }
        .list-icon{
          color:#4caf50 ;
        }
        .title{
          margin-left: 5px;
          font-weight: bold;
        }

        .add-btn{
          cursor: pointer;
          background-color: rgba(0,0,0,0);
          &:hover{
            color:#4caf50 ;
          }
        }
        .add-icon{
          font-size:18px;
          cursor: pointer;
          &+span{
            padding-left: 5px;
            font-size:13px;
            cursor: pointer;
          }
        }
        .gap{
          flex:auto;
        }
      }

      .list-content{
        @include abs-group(0,50px);
        overflow-x: hidden;
        overflow-y: auto;

        .list-item{
          flex:none;
          min-width:280px;
          max-width:320px;
          width:33%;
          height:220px;
          overflow: hidden;
          position:relative;

          .item-inner{
            @include abs-group(20px,0,0,20px);
          }

          .img-up{
            @include abs-group(0,0,0,40px) ;
            background-color: #343e47;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
          /*  border:1px solid #e1e3e6;
            border-bottom:none;*/
            cursor: pointer;
            overflow: hidden;
            >img{
              @include abs-group(-2px,-2px,-2px,-2px) ;
              border:0 none;
            }
          }
          .control-box{
            @include abs-group(0,false,0,0) ;
            background-color: #2956c6;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            color:#fff;
            font-size:15px;
            line-height:40px;
            vertical-align: middle;
            &>span{
              padding-left:10px;
            }
          }
          .control-btns{
            @include abs-group(false,false,95px,90px) ;
            height:36px;

            .round-btn{
              @include round-btn(#2956c6) ;
              margin-left: 10px;
            }
          }
        }

      }
    }
  }

</style>

<template>
    <div class="container">

      <!--list-->
      <div class="list">

        <div class="list-header">
          <h-group-iwt class="header-layout">
            <i class="el-icon-caret-right list-icon"></i>
            <span class="title">{{viewData.boardQueryForm.name}}</span>
            <div class="gap"></div>

            <h-group-iwt class="add-btn">
              <i class="el-icon-menu add-icon"  @click="viewPM.popCreateWin()"></i>
              <span  @click="viewPM.popCreateWin()">添加可视化</span>
            </h-group-iwt>
          </h-group-iwt>
        </div>

        <div class="list-content">
          <tile-group-iwt style="width:100%;">

            <div class="list-item"
                 v-for="(item,index) in viewData.boardList"
                 :key="index"
                 @mouseenter="()=>{item.showControl=true;}"
                 @mouseleave="()=>{item.showControl=false;}">

              <div class="item-inner">

                <div class="img-up"
                     title="点击进入可视化编辑"
                     @click="viewPM.changeToBoard(item)">
                   <img :src="item.url"
                        border="0" >
                </div>

                <div class="control-box">
                    <span>{{item.name}}</span>
                </div>

                <h-group-iwt class="control-btns"
                             v-show="item.showControl">
                    <div class="round-btn"
                         title="编辑基本信息"
                         @click="viewPM.popEditeWin(item)">
                      <i class="el-icon-edit"></i>
                    </div>
                    <div class="round-btn"
                         title="删除"
                         @click="viewPM.deleteItem(item)">
                      <i class="el-icon-delete"></i>
                    </div>
                    <div class="round-btn"
                         title="预览">
                      <i class="el-icon-view"></i>
                    </div>
                </h-group-iwt>

              </div>
            </div>

          </tile-group-iwt>
        </div>

      </div>

      <!--tree-->
      <group-tree class="tree" @selectedGroupChanged="(item)=>{this.viewPM.changeBoardQueryForm(item)}" ></group-tree>

      <s-loading v-show="viewData.isLoading"></s-loading>

      <!--可视化添加-->
      <board-form-win></board-form-win>
    </div>
</template>
