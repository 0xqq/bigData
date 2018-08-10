
<script>
  import PathConst from "@/router/PathConst" ;
  import LeftMenu from "@/common/comps/normal/LeftMenu" ;
  import MainViewBase from "@/components/common-comps/MainViewBase" ;

  export default {
    components: {LeftMenu},
    mixins: [MainViewBase],
    data() {
      this.mainPath = PathConst.DATAIMPORT ;
      return {
        menuList: []
      }
    },
    mounted() {
    },
    //方法
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

