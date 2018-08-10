<script>
  import PathConst from "@/router/PathConst" ;
  import LeftMenu from "@/common/comps/normal/LeftMenu" ;
  import MainViewBase from "@/components/common-comps/MainViewBase" ;
  import AuthManager from "@/common/manager/AuthManager" ;

  export default {
    components: {LeftMenu},
    mixins: [MainViewBase],
    data() {
      this.mainPath = PathConst.DATASTORAGE;
      this.defPath = AuthManager.getMenuItem(PathConst.DS_DEF) ;
      return {
        menuList: []
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>

<template>
  <div class="tj-menu-content">

    <!--menu-->
    <left-menu :title="'数据存储管理'"
               :dataProvider="menuList"
               @menuHeadClick="changBackDef()"
               @menuItemClick="changeView">
    </left-menu>

    <!--view-->
    <div class="menu-content">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>
