<script>
  import PathConst from "@/router/PathConst" ;
  import LeftMenu from "@/common/comps/normal/LeftMenu" ;
  import DataHandlerDef from "./def/DataHandlerDef";
  import MainViewBase from "@/components/common-comps/MainViewBase" ;
  import "@/style/data-handler.scss" ;

  export default {
    components: {  DataHandlerDef, LeftMenu},
    mixins: [MainViewBase],
    data() {
      this.mainPath = PathConst.DATAHANDLER ;
      return {
        mainView:PathConst.DATAHANDLER ,
        showMenu:false,
        menuList: []
      }
    },
    created(){
    },
    methods: {}
  }

</script>

<style scoped>
</style>

<template>
  <div class="tj-menu-content">

    <!--menu-->
    <left-menu :title="'数据处理'"
               :isCollapse="showMenu"
               :viewName="mainView"
               :dataProvider="menuList"
               @menuHeadClick="changBackDef"
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
