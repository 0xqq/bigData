<script>
  export default {
    components:  {
    }  ,
    props: {
      'dataProvider': {default:[] },
      "selectIndex":{default:0}
    },
    data() {
      return {
        currentIndex:0
      }
    },

    mounted() {
      this.initData() ;
    },

    watch:{
      data:function(){
        this.initData() ;
      }
    },

    computed: {
    },

    methods: {
      initData(){
        this.currentIndex = this.selectIndex ;
      },
      changeTab(index){
        this.currentIndex = index ;
        this.$emit("change",this.currentIndex) ;
      }
    }
  }
</script>

<template>

  <v-group-iwt style="width:100%">
    <v-gap-iwt></v-gap-iwt>
    <div class="tj-tab-header">
      <div class="tj-tab-back"></div>
      <h-group-iwt class="tj-tab-btn-con" >
        <div :class="['tj-tab-btn',currentIndex===index?(index===0?'tj-tab-btn_sel_f':'tj-tab-btn_sel_mid'):'']"
             v-for="(item,index) in dataProvider" @click="changeTab(index)">
          {{item.label}}
        </div>
      </h-group-iwt>
    </div>
    <!--form-->
    <div  style="width:100%;">
      <div class="tj-tab-content-bor">
        <slot  :index="currentIndex"></slot>
      </div>
    </div>
  </v-group-iwt>

</template>

<style scoped>

</style>
