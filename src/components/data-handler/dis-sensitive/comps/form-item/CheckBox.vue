<script>
  import FormItemUtils from "@/common/utils/FormItemUtils" ;
  export default {
    components: { },
    props: {
      'label': {default: ""},
      'field':{default:""},
      "owner":{},
      'data': {},
      desc:{default: ""}
    },
    data() {
      return {
        vmodeData:false,
        mode:1 //先写死 默认数值大写
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
        this.vmodeData = false ;
        if(!this.data)
          return ;

        console.log(this.data.value+"<-----------------check-------------------------") ;

        this.vmodeData = FormItemUtils.getBoolean(this.data.value) ;
        if(this.data.mode)
          this.mode = this.data.mode;
      },


      changeHandler(){
        if(!this.data )
          return ;
        this.data.value = FormItemUtils.getValueData(this.vmodeData,this.mode) ;
        this.$emit("change",this.vmodeData) ;
      },


    }
  }
</script>

<template>
  <h-group-iwt style="width:100%;">
    <div class="tj-diy-form-item-lb">{{label}}：</div>
    <el-checkbox size="mini" v-model="vmodeData" @change="changeHandler"></el-checkbox>
    <div v-if="desc" class="tj-diy-form-item-desc" :title="desc" > </div>
  </h-group-iwt>
</template>

<style scoped>

</style>
