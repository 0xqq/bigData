<script>
  import PathConst from "@/router/PathConst" ;
  import LeftMenu from "@/common/comps/normal/LeftMenu" ;
  import MainViewBase from "@/components/common-comps/MainViewBase" ;

  export default {
    components: {  LeftMenu},
    mixins: [MainViewBase],
    data() {
      this.mainPath = PathConst.DATAVISUALIZATION ;
      return{
        showMenu:true,
        menuList: []
      }
    },
    watch:{
      "$route":function(){
        this.routerChangeHandler() ;
      },
    },
    mounted() {
      this.routerChangeHandler() ;
    },
    activated(){
      this.routerChangeHandler() ;
    },
    methods: {
      /**
       * 路由变化处理
       */
      routerChangeHandler(){
        this.showMenu = true ;
        if(this.$route.path === PathConst.DV_BOARD_EDIT)
          this.showMenu = false ;
      }
    }
  }
</script>

<style scoped lang="scss" >
  .menu-left{
    @include shadow(3px,0,3px) ;
  }
  .max-container{
    @include abs-group() ;
  }
</style>

<template>
  <div class="tj-menu-content" >

    <!--view-->
    <div :class="[showMenu?'tj-menu-content-mini':'max-container']" >
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>

    <!--menu-->
    <left-menu v-show="showMenu"
               :title="'数据可视化管理'"
               :dataProvider="menuList"
               :isCollapse="true"
               class="menu-left"
               @menuHeadClick="changBackDef()"
               @menuItemClick="changeView">
    </left-menu>
  </div>
</template>
