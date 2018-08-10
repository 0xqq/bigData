<script>
  import FormItemUtils from "@/common/utils/FormItemUtils" ;
  import PropsFormItem from "./base/PropsFormItem" ;

  export default {
    components: { },
    mixins: [PropsFormItem],
    data() {
      return {
        valueModel:false,
        mode:0 //先写死 默认数值大写
      }
    },

    methods: {
      resetData(){
        this.valueModel = false ;
      },

      initData(){
        this.valueModel = FormItemUtils.getBoolean(this.data.value) ;
      },

      getChangeValue(){
         return  FormItemUtils.getValueData(this.valueModel,this.mode)+"" ;
      }
    }
  }
</script>

<style scoped>
</style>

<template>
  <h-group-iwt style="width:100%;">
    <div class="tj-diy-form-item-lb">{{label}}：</div>
    <el-checkbox size="mini" v-model="valueModel"
                 @change="changeHandler">
    </el-checkbox>
  </h-group-iwt>
</template>
