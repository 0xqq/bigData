<script>

    export default {
      props: {title: {default: ""}, num: {default: 0}},
      data() {
        return {}
      },
      computed: {},
      mounted() {

      },
      activated() {

      },
      methods: {}
    }
</script>

<style scoped lang="scss">
  .container {
    flex:none;
    min-width:163px;
    height:59px;
    background-image: url("../../../../assets/image/platform/data-file/title_1.png");
    background-repeat: repeat-x;
    color:#fff;
    font-size:14px;
    font-weight: bold;
    position:relative;

    .lfet-bg{
      @include abs-group(0,0,false,0)
    }
    .right-bg{
      @include abs-group(false)
    }
    .content{
      @include abs-group(12px,0px,12px,0px) ;
    }

  }
  .bg{

  }
</style>

<template>
    <div class="container">
      <img class="lfet-bg" src="../../../../assets/image/platform/data-file/title_0.png">
      <img class="right-bg" src="../../../../assets/image/platform/data-file/title_3.png">

      <v-group-iwt :ver="'center'" class="content">
        <div class="title">{{title}}</div>
        <div class="num">{{num}}</div>
      </v-group-iwt>

    </div>
</template>
