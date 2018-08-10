<script>


  export default {
    components:{ },
    props: {
      'label': {default: ""},
      'desc':{default:""},
      "owner":{},
      'data': {}
    },
    data() {
      return {
        vmodeData:""
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
        this.vmodeData = "" ;
        this.desc = "" ;
        if(!this.data)
          return ;
        if(this.data.value)
          this.vmodeData =  this.data.value  ;
        if(this.data.desc)
          this.desc = this.data.desc ;
      },

      changeHandler(){
        if(!this.data )
          return ;
        this.data.value = this.vmodeData ;
      }
    }
  }
</script>

<template>
  <h-group-iwt style="width:100%;">
    <div class="tj-diy-form-item-lb">文件夹/文件：</div>
    <el-input  size="mini" v-model="vmodeData" ></el-input>
    <div v-if="desc" class="tj-diy-form-item-desc" :title="data.desc" > </div>
    <h-gap-iwt></h-gap-iwt>
    <el-button type="primary" size="mini">浏览..</el-button>
  </h-group-iwt>
</template>

<style scoped>

</style>
