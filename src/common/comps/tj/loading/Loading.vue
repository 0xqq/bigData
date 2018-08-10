<script>
  export default {
    props: {
      'fixed': {
        default: false
      }
    },
    data(){
      return {
      };
    },
    computed: {
      position(){
        if(this.fixed)
          return "fixed" ;
        else
          return "absolute" ;
      }
    }
  };
</script>

<style scoped lang="scss">

  /*加载状态*/
  .loading-mask{
    z-index:2001;
    background-color: rgba(0,0,0,0);
    left:0;
    right:0;
    top:0;
    bottom:0;
    width:100%;
    height:100%;
    position:absolute;
    font-size:35px;
    color:#4582d5 ;
  }
</style>

<template>
  <h-group-iwt class="loading-mask" :style="{position:position,'z-index':fixed?2001:'auto'}" hor="center" >
    <i class="el-icon-loading"></i>
  </h-group-iwt>
</template>


