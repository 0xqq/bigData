
<script>
  import PathConst from "@/router/PathConst" ;
  import LeftMenu from "@/common/comps/normal/LeftMenu" ;
  import ConstManager from "@/common/manager/ConstManager" ;
  import MainViewBase from "@/components/common-comps/MainViewBase" ;
  import AuthManager from "@/common/manager/AuthManager" ;

  export default {
    components: {LeftMenu},
    mixins: [MainViewBase],
    data() {
      this.mainPath = PathConst.DATAANALYSIS;
      this.defPath = AuthManager.getMenuItem(PathConst.DA_MINING_LIST) ;
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
    <left-menu :title="'数据接入'"
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

