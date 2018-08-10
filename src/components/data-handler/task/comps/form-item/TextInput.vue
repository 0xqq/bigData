<script>
  export default {
    props: {
      'label': {default: ""},
      "owner":{},
      'data': {},
      desc:{default: ""}
    },
    data() {
      return {
        vmodeData:"",
        dis:false
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
        this.dis = false ;
        if(this.data){
          if(this.data.value)
            this.vmodeData =  this.data.value  ;
          if(this.data.dis === true)
            this.dis = true ;
        }
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
     <div class="tj-diy-form-item-lb">{{label}}：</div>
     <el-input :disabled="dis"
               size="mini"
               v-model="vmodeData"
               @change="changeHandler" >
     </el-input>
     <div v-if="desc"
          class="tj-diy-form-item-desc"
          :title="desc" > </div>
   </h-group-iwt>
</template>

<style scoped>

</style>
