<script>
  import ComboBox from "@/common/comps/normal/form/ComboBox" ;

  export default {
    components:{
      ComboBox},
    props: {
      'label': {default: ""},
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
        if(this.data && this.data.value)
          this.vmodeData =  this.data.value  ;
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
  <h-group-iwt style="width:100%;height:30px;">
    <div class="tj-diy-form-item-lb">Hadoop Cluster：</div>
    <combo-box style="width:200px;"></combo-box>
    <h-gap-iwt></h-gap-iwt>
    <el-button type="primary" size="mini">编辑..</el-button>
    <h-gap-iwt></h-gap-iwt>
    <el-button type="primary" size="mini">新建..</el-button>
  </h-group-iwt>
</template>

<style scoped>

</style>
