

<script>
  import Inject from "@/common/model/Inject";
  import EventDispatcher from "@/common/event/EventDispatcher";
  import EventList from "@/common/event/EventList";
  import ModelLocator from "@/common/model/ModelLocator" ;
  import VisualizationAPI from "@/common/service/VisualizationAPI";
  import Layout from '../../model/Layout';

  export default {
    props: {
      screen: Object
    },
    data() {
      this.layoutPM = Inject.getClass(Layout);
      this.modell =  ModelLocator.getInstance() ;
      let layouts = [];
      return {
        userId: this.modell.loginUser.userId,
        layouts: layouts
      }
    },
    computed: {
      currentScreenLayout(){
        return this.layouts[this.layouts.findIndex(item => {
          if(this.screen === null)return false;
          if(this.screen.layout === null)return false;
          return item.id === this.screen.layout.id;
        })];
      }
    },
    mounted() {
      this.query();
    },
    activated() {},
    methods: {
      query(){
        VisualizationAPI.findLayoutByIsPubAndUserId(this.modell.loginUser.userId,(result) => {
          //处理数据库结构与前端结构的差异
          for(let i=0; i<result.data.list.length; i++){
            let item = result.data.list[i];
            item.margin = JSON.parse(item.margin);
            item.layoutItems = JSON.parse(item.config);
            delete item.config;
          }
          this.layouts = result.data.list;
        },(rej) => {this.layouts = [];});
      },
      deleteLayout(layoutId){
        VisualizationAPI.deleteLayoutById(layoutId,(result) => {
          NormalUtils.popMessage("操作成功");
          this.query();
        },(rej) => {this.layouts = [];});
      },
      /**
       * 此处new Layout，仅仅是利用其构造函数，避免再次进行默认值写入出现在多处位置，造成后续维护的不一致性
       * @param isPublic 根据ES6的语法规则，必传参数
       * @param item 传递为null，视为新增操作，根据ES6的语法规则，必传参数
       */
      openLayoutDialog(isPublic=true,item){
        if(item === null){
          item = new Layout();
          item.isPublic = isPublic;
          if(!isPublic){ //添加一个userId
            item.userId = this.userId;
          }
        }
        this.layoutPM.initLayout(item);
        //添加新增或修改操作事件
        EventDispatcher.addListener(EventList.GRID_LAYOUT_SAVE_OR_UPDATE,(layout) => {
          VisualizationAPI.saveOrUpdateLayout(layout,(result) => {
            this.layoutPM.show = false;
            NormalUtils.popMessage("操作成功");
            this.query();
          },(rej) => {});
        });
        this.layoutPM.show = true;
      },
      createServerUrl(url){
        return VisualizationAPI.createServerUrl(url);
      }
    }
  }
</script>

<template>
  <el-submenu popper-class="visualization-sub-menu" index="menu-layout">
    <template slot="title">
      <i class="iconfont tj-icon-layout"></i>
      <span slot="title">模板布局</span>
    </template>
    <el-menu-item-group v-if="currentScreenLayout">
      <el-container>
        <el-header style="height: 10px;">当前模板布局</el-header>
        <el-main style="width: 300px;">
        <el-card shadow="hover">
          <img :src="createServerUrl(currentScreenLayout.imgUrl)" class="image">
          <div class="clearfix">
            <span>{{currentScreenLayout.name}}</span>
          </div>
        </el-card>
      </el-main>
      </el-container>
    </el-menu-item-group>
    <el-menu-item-group>
      <el-container>
        <el-header style="height: 10px;">
          <div class="clearfix">
            <span>公共模板</span>
            <el-button class="lauout-option" type="text" @click="openLayoutDialog(true,null)"><i class="iconfont tj-icon-add"></i></el-button>
          </div>
        </el-header>
        <el-main style="width: 300px;">
          <el-card v-for="(item, index) in layouts" v-if="item.isPublic" :key="index" shadow="hover">
            <img :src="createServerUrl(item.imgUrl)" class="image">
            <div class="clearfix">
              <span>{{item.name}}</span>
              <el-button class="lauout-option" type="text" @click="$emit('applyLayout',item)"><i v-if="screen" class="iconfont tj-icon-apply"></i></el-button>
              <el-button class="lauout-option" type="text" @click="openLayoutDialog(true,item)"><i class="iconfont tj-icon-edit"></i></el-button>
              <el-button class="lauout-option" type="text" @click="deleteLayout(item.id)"><i class="iconfont tj-icon-delete"></i></el-button>
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-menu-item-group>
    <el-menu-item-group>
      <el-container>
        <el-header style="height: 10px;">
          <div class="clearfix">
            <span>我的模板</span>
            <el-button class="lauout-option" type="text" @click="openLayoutDialog(false,null)"><i class="iconfont tj-icon-add"></i></el-button>
          </div>
        </el-header>
        <el-main style="width: 300px;">
          <el-card v-for="(item, index) in layouts" v-if="!item.isPublic" :key="index" shadow="hover">
            <img :src="createServerUrl(item.imgUrl)" class="image">
            <div class="clearfix">
              <span>{{item.name}}</span>
              <el-button class="lauout-option" type="text" @click="$emit('applyLayout',item)"><i v-if="screen" class="iconfont tj-icon-apply"></i></el-button>
              <el-button class="lauout-option" type="text" @click="openLayoutDialog(false,item)"><i class="iconfont tj-icon-edit"></i></el-button>
              <el-button class="lauout-option" type="text" @click="deleteLayout(item.id)"><i class="iconfont tj-icon-delete"></i></el-button>
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-menu-item-group>
  </el-submenu>
</template>

<style scoped lang="scss">
  .visualization-sub-menu ul img{
    height: 80px;
  }
  .lauout-option {
    float: right;
    padding: 3px 0;
    margin-left: 3px;
  }
</style>
