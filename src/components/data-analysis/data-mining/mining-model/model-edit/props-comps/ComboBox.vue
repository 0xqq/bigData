<script>
  import ComboBox from "@/common/comps/normal/form/ComboBox" ;
  import PropsFormItem from "./base/PropsFormItem" ;

  export default {
    mixins: [PropsFormItem],
    components: {ComboBox},
    data() {
      return {
        list: [],
        valueModel: "",
        canEdit:false
      }
    },
    methods: {

      resetData(){
        this.list = [];
        this.canEdit = false ;
      },

      initData() {
        this.valueModel = this.data.value;
        this.initConfigValue("list") ;
      },

      selectChangeHandler(value) {
        this.valueModel = value ;
        this.changeHandler( value ,false ) ;
      }
    }
  }
</script>

<style scoped>
</style>

<template>
  <h-group-iwt style="width:100%;height:30px;">
    <div class="tj-diy-form-item-lb">{{label}}：</div>
    <combo-box  v-if="canEdit"
                style="width:100%"
               @change="selectChangeHandler"
               :labelField="'label'"
               :valueField="'value'"
               :valueData="valueModel"
               :dataProvider="list">
    </combo-box>
    <el-select  v-else
                style="width:100%"
                size="mini"
                v-model="valueModel"
                @change="selectChangeHandler" >
      <el-option v-for="item in list"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
  </h-group-iwt>
</template>

