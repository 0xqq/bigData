<script>
  import PropsFormItem from "./base/PropsFormItem" ;

  export default {
    components: { },
    mixins: [PropsFormItem],
    data() {
      return {
        valueModel:""
      }
    },

    methods: {
      resetData(){
        this.valueModel = "" ;
      },
      initData(){
        this.valueModel = this.data.value+"" ;
      }
    }
  }
</script>

<style scoped>
</style>

<template>
   <h-group-iwt style="width:100%;">
     <div class="tj-diy-form-item-lb">{{label}}：</div>
     <el-input size="mini"
               v-model="valueModel"
               @change="changeHandler" >
     </el-input>
   </h-group-iwt>
</template>

