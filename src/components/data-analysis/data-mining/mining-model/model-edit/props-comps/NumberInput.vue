<script>
  import PropsFormItem from "./base/PropsFormItem" ;

  export default {
    components: { },
    mixins: [PropsFormItem],
    data() {
      return {
        valueModel:"",
        step:1,
        min:0,
        max:99999999999999
      }
    },

    methods: {
      resetData() {
        this.valueModel = "";
        this.step = 1;
        this.min = 0;
        this.max = 99999999999999;
      },

      initData(){
        if(this.data.value)
          this.valueModel =  this.data.value  ;
        this.initConfigValue("step") ;
        this.initConfigValue("min") ;
        this.initConfigValue("max") ;
      }
    }
  }
</script>

<style scoped>
</style>

<template>
  <h-group-iwt style="width:100%;">
    <div class="tj-diy-form-item-lb">{{label}}：</div>
    <el-input-number style="width:100%;"
                     v-model="valueModel" controls-position="right"
                     @change="changeHandler"
                     size="mini"
                     :min="min"
                     :max="max"
                     :step="step" >
    </el-input-number>
  </h-group-iwt>
</template>

