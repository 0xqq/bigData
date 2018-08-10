<script>
  export default {
    props: ['title'],
    data() {
      return {
      }
    },
    computed: {
      showTitle:function () {
        if(this.title)
          return this.title+"";
        return "" ;
      }
    }
  }
</script>

<style scoped>
  .title {
    font-family: '微软雅黑 Bold', '微软雅黑';
    font-size: 13px;
    color:#6699ff;
  }
  .line {
    background-color: #6699ff;
    height: 2px;
    flex:1 1 auto;
    margin-left: 5px;
  }
</style>

<template>
    <h-group-iwt style="width: 100%;flex:none;">
      <div class="title">
        <span>{{showTitle}}</span>
      </div>
      <div class="line"></div>
    </h-group-iwt>
</template>
