

<script>
  import PageTypeEnum from '../../model/enums/PageTypeEnum';
  import Inject from "@/common/model/Inject";
  import Page from "../../model/Page";

  export default {
    data() {
      this.pagePM = Inject.getClass(Page);
      this.PageType = PageTypeEnum;
      return {
        pageConfig: this.pagePM
      }
    },
    computed: {
      currentPageType(){
        return this.PageType.map.get(this.pageConfig.pageType);
      }
    },
    mounted() {},
    activated() {},
    methods: {
      changePageType(item){
        if(item.id !== this.PageType.single.id){
          this.pagePM.changePageType(item);
          return;
        }
        window.vm.$confirm('页面类型由多屏切换至单屏时，将默认只保留第一块屏幕的配置', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.pagePM.changePageType(item);
        });
      }
    }
  }
</script>

<template>
  <el-submenu popper-class="visualization-sub-menu" index="menu-page-config">
    <template slot="title">
      <i class="iconfont tj-icon-setup"></i>
      <span slot="title">页面设置</span>
    </template>
    <el-menu-item-group v-if="currentPageType">
      <el-container>
        <el-header style="height: 10px;">当前页面类型</el-header>
        <el-main style="width: 300px;">
          <el-card shadow="hover">
            <time class="time">{{currentPageType.name}}</time>
            <img :src="currentPageType.url" class="image">
          </el-card>
        </el-main>
      </el-container>
    </el-menu-item-group>
    <el-menu-item-group>
      <el-container>
        <el-header style="height: 10px;">页面类型库</el-header>
        <el-main style="width: 300px;">
          <el-card v-for="(item, index) in PageType.types" v-if="currentPageType.id !== item.id" :key="index" shadow="hover">
            <div class="clearfix">
              <span>{{item.name}}</span>
              <el-button class="page-type-option" @click="changePageType(item)" type="text">应用</el-button>
            </div>
            <img :src="item.url" class="image">
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
  .page-type-option {
    float: right;
    padding: 3px 0
  }
</style>
