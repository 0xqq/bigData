<script>
  import EventDispatcher from "../../event/EventDispatcher" ;
  import EventList from "../../event/EventList" ;
  export default {
    props: ['title','showIcon'],
    data() {
      return {
      }
    },

    mounted() {
    },

    watch:{
    },

    computed: {
      showTitle:function () {
        if(this.title)
          return this.title+"";
        return "" ;
      },
      showIconImg:function(){
        if(this.showIcon===true || this.showIcon === undefined || this.showIcon === null )
          return true ;
        return false ;
      }
    },

    methods: {
      controlMenu( ) {
        this.$emit("change", this.files);
      },
      menueClosClickHandler(){
        EventDispatcher.disEvent(EventList.COLLAPSE_MENU_SYS,{viewName:this.viewName,data:null}) ;
      }
    }
  }
</script>

<template>
  <v-group-iwt class="comp tj-title-font">
    <h-group-iwt style="width:100%;height:100%;">
      <div v-if="showIconImg" @click="menueClosClickHandler"
           class="icon-box">
           <i class="iconfont tj-caidan"    ></i>
      </div>
      <div class="title">
        <span>{{showTitle}}</span>
      </div>
      <div style="flex:1 1 auto;">
        <slot></slot>
      </div>
    </h-group-iwt>
    <div class="line"></div>
  </v-group-iwt>
</template>

<style scoped>
  .title{
    margin-left: 15px;
    font-size: 17px;
    margin-left: 15px;
    line-height: 50px;
    font-weight: bold;
    vertical-align: middle;
  }
  .line {
    flex:1 1 auto;
    width:100%;
    background-color: #c9c9c9;
    height: 2px;
  }
  .comp {
    height: 50px;
    width: 100%;
    flex: 0 0 auto;
    margin-bottom: 10px;
  }
  .icon-box {
    margin-left: 15px;
    width: 22px;
    height: 22px;
    overflow: hidden;

  }
  .icon-box i{
    line-height:22px;vertical-align: middle;font-size:25px;color:#909399;
  }
</style>
