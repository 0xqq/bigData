<script>
  import ComboBox from "@/common/comps/normal/form/ComboBox" ;

  export default {
    components: { ComboBox },
    props: {
      'label': {default: ""},
      'desc':{default:""},
      'data': {}
    },
    data() {
      return {
        vmodeData:"",
        dataProvider:[]
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
    <div class="tj-diy-form-item-lb">HBase Table name：</div>
    <combo-box @change="changeHandler"
               :dataProvider="dataProvider"
               :valueData="vmodeData"></combo-box>
    <div v-if="desc" class="tj-diy-form-item-desc" :title="data.desc" > </div>
    <h-gap-iwt></h-gap-iwt>
    <el-button type="primary" size="mini">Get table name</el-button>
  </h-group-iwt>
</template>

<style scoped>

</style>
