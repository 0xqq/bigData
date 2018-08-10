<script>
   import PathConst from "@/router/PathConst";
   import Inject from "@/common/model/Inject";
   import EventDispatcher from "@/common/event/EventDispatcher";
   import EventList from "@/common/event/EventList";
   import MenuPageType from './power-designer/menu/MenuPageType';
   import MenuLayout from './power-designer/menu/MenuLayout';
   import MenuChart from './power-designer/menu/MenuChart';
   import EditScreen from './power-designer/screen/EditScreen';
   import EditScreenBaseInfo from './power-designer/screen/EditScreenBaseInfo';
   import EditLayout from './power-designer/layout/EditLayout';
   import EditChartConfig from './power-designer/chart/EditChartConfig';
   import EditContainerBase from './power-designer/container/EditContainerBase';
   import PageTypeEnum from './model/enums/PageTypeEnum';
   import Layout from './model/Layout';
   import Screen from './model/Screen';
   import Container from './model/Container';
   import Chart from './model/Chart';
   import PageBaseConfig from './power-designer/page-config/PageBaseConfig';
   import NormalUtils from "../../../common/utils/NormalUtils";
   import Page from "./model/Page";

   import test from "./TestJson";

    export default {
      components: {MenuChart, MenuLayout, MenuPageType, EditScreen, EditScreenBaseInfo, PageBaseConfig, EditLayout, EditContainerBase, EditChartConfig},
      data() {
        this.pagePM = Inject.getClass(Page);
        //NormalUtils.getRouteQuery(this.$route.path) === this.pagePM //false，因此需要进行封装，确保始终使用的是this.pagePM，而不是和this.pagePM结构一致
        //因此需要将数据库中的配置，逐步赋予给单例this.pagePM
        // this.pagePM.init(NormalUtils.getRouteQuery(this.$route.path));
        this.pagePM.init(test);
        this.layoutPM = Inject.getClass(Layout);
        this.screenPM = Inject.getClass(Screen);
        this.containerPM = Inject.getClass(Container);
        this.chartPM = Inject.getClass(Chart);

        return {
          PageTypeEnum: PageTypeEnum,
          page: this.pagePM,
          currentScreen: this.pagePM.screens[0],
          showGridItemBorder: false
        }
      },
      computed: {},
      mounted() {},
      activated() {},
      methods: {
        /**
         * 返回上一个路由（可视化首页）
         * @param board
         */
        changeToBoardIndex(){
          NormalUtils.changeRouter(PathConst.DV_BOARD_INDEX);
        },
        preview(){
          console.log(JSON.stringify(this.page))
        },

        /**
         * 布局应用到指定的屏幕
         * @param item
         */
        applyScreenLayout(layout){
          if(this.currentScreen === null || this.currentScreen === undefined)return;
          let layoutItems = this.currentScreen.layout.layoutItems;
          for(let i=0; i<layoutItems.length; i++){
            if(layoutItems[i].containers.length > 0){
              NormalUtils.popMessage("该屏幕已开始仪表盘设计，无法重新应用布局","error");
              return;
            }
          }
          this.layoutPM.initLayout(layout,this.currentScreen.layout);
        },

        /**
         * 重新调整当前选择的屏幕布局
         */
        editScreenLayoutDialog(screen){
          if(screen == undefined || screen == null)return;
          this.layoutPM.initLayout(screen.layout);
          //添加编辑完成够调整当前屏幕布局
          EventDispatcher.addListener(EventList.CHANGE_SCREEN_GRID_LAYOUT,(layout) => {
            this.layoutPM.initLayout(layout, screen.layout);
            this.layoutPM.show = false;
            NormalUtils.popMessage("操作成功");
          });
          this.layoutPM.show = true;
        },
        openScreenDialog(screen){
          this.screenPM.initScreenBase(screen);
          //添加编辑完成够调整当前屏幕布局
          EventDispatcher.addListener(EventList.CHANGE_SCREEN_BASE_INFO,(newScreen) => {
            this.screenPM.initScreenBase(newScreen,screen);
            this.screenPM.show = false;
          });
          this.screenPM.show = true;
        }
      },
      watch: {}
    }
</script>

<style scoped lang="scss">
  .container{
    @include abs-group() ;

    .list{
      @include abs-group(65px,0,0,0) ;

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
          margin-left: 10px;
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

      .list-content {
        @include abs-group(0, 50px);
        overflow-x: hidden;
        overflow-y: auto;
        padding: 10px 10px;

        .header-icon {
          margin-right: 20px;
          cursor:pointer;
        }

        .el-switch{
          margin-left: 30px;
        }
      }
    }
  }
</style>

<template>
    <div class="container">
      <el-menu :collapse="true">
        <el-menu-item index="1" @click="changeToBoardIndex()">
          <i class="iconfont tj-icon-backward"></i>
          <span slot="title">返回</span>
        </el-menu-item>
        <!-- 以下以不同的通信方式编写 -->
        <menu-page-type></menu-page-type>
        <menu-layout @applyLayout="applyScreenLayout" :screen="currentScreen"></menu-layout>
        <menu-chart></menu-chart>
      </el-menu>
      <!--主视图容器-->
      <div class="list">
        <div class="list-header">
          <h-group-iwt class="header-layout">
            <i class="el-icon-caret-right list-icon"></i>
            <span class="title">{{page.name}}</span>
            <div class="gap"></div>
            <h-group-iwt v-if="page.pageType != PageTypeEnum.single.id" class="add-btn" title="页面配置">
              <i class="iconfont tj-icon-edit" @click="page.show = true"></i>
            </h-group-iwt>
            <h-group-iwt class="add-btn" title="预览">
              <i class="iconfont tj-icon-dashboard-preview" @click="preview()"></i>
            </h-group-iwt>
          </h-group-iwt>
        </div>

        <div class="list-content">
          <!-- 屏幕配置区域 item.id作为key值，切勿使用index，防止edit-screen不刷新 -->
          <el-card v-for="(item,index) in page.screens" :key="item.id" body-style="{ padding: '20px'; overflow-x: scroll; }">
            <div slot="header" class="clearfix">
              <i class="header-icon iconfont tj-icon-radio-checked" style="color: #409EFF" v-if="item === currentScreen"
                 @click.stop="currentScreen = null"></i>
              <i class="header-icon iconfont tj-icon-radio-unchecked" v-if="item !== currentScreen"
                 @click.stop="currentScreen = item"></i>
              <span>{{item.name}}</span>
              <el-switch v-if="item === currentScreen" v-model="showGridItemBorder" active-text="边框" style="float: right;"></el-switch>
              <div style="float: right;">
                <!-- 屏幕布局编辑 -->
                <i class="header-icon iconfont tj-icon-layout"
                   @click.stop="editScreenLayoutDialog(item)"></i>
                <!-- 下方新增屏幕，单屏不涉及 -->
                <i class="header-icon iconfont tj-icon-add" v-if="page.pageType != PageTypeEnum.single.id"
                   @click.stop="pagePM.addScreen(index+1)"></i>
                <!-- 屏幕基本属性编辑 -->
                <i class="header-icon iconfont tj-icon-edit"
                   @click.stop="openScreenDialog(item)"></i>
                <!-- 删除屏幕，单屏不涉及 -->
                <i class="header-icon iconfont tj-icon-delete" v-if="page.screens.length > 1"
                   @click.stop="pagePM.removeScreen(index)"></i>
                <!-- 屏幕向下移动，单屏不涉及 -->
                <i class="header-icon iconfont tj-icon-sort-down" v-if="index < page.screens.length-1 && page.pageType != PageTypeEnum.single.id"
                   @click.stop="pagePM.exchangeScreen(index,index+1)"></i>
                <!-- 屏幕向上移动，单屏不涉及 -->
                <i class="header-icon iconfont tj-icon-sort-up" v-if="index > 0 && page.pageType != PageTypeEnum.single.id"
                   @click.stop="pagePM.exchangeScreen(index,index - 1)"></i>
              </div>
            </div>
            <edit-screen :screen-config="item" :showGridItemBorder="(item === currentScreen)?showGridItemBorder:false"></edit-screen>
          </el-card>
        </div>
      </div>
      <!-- 页面基础配置项编辑 -->
      <page-base-config></page-base-config>
      <!-- 布局配置的dialog -->
      <edit-layout></edit-layout>
      <!-- 屏幕基本属性编辑 -->
      <edit-screen-base-info></edit-screen-base-info>
      <!-- 容器属性编辑 -->
      <edit-container-base></edit-container-base>
      <!-- 图表配置项可视化编辑 -->
      <edit-chart-config></edit-chart-config>
    </div>
</template>
