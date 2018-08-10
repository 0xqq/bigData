<script>
  import FormItemUtils from "@/common/utils/FormItemUtils" ;
  import CheckTextInput from "./CheckTextInput" ;
  import TextInput from "./TextInput" ;
  import CheckBox from "./CheckBox" ;
  import ComboBox from "./ComboBox" ;
  import DataGrid from "./DataGrid" ;
  import CheckComboBox from "./CheckComboBox" ;
  import FormItemMap from "./FormItemMap" ;

  export default {
    components:  {
      TextInput,
      CheckTextInput,
      CheckBox,
      ComboBox,
      DataGrid,
      CheckComboBox
    }  ,
    props: {
      'label': {default: ""},
      "owner":{},
      'data': {},
      desc:{default: ""}
    },
    data() {
      return {
        check:false,
        checklb:"",
        formList:[]
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
        this.check = false ;
        if(!this.data)
          return ;
        this.check = FormItemUtils.getBoolean(this.data.value) ;
        if(this.data.mode)
          this.mode = this.data.mode;
        if(this.data.formList)
          this.formList = this.data.formList ;
      },
      getComp(item){
        return FormItemMap.getItemComp(item) ;
      },
      changeHandler(){
        if(!this.data )
          return ;
        this.data.value =  FormItemUtils.getValueData(this.check,this.mode)  ;
      },
    }
  }
</script>

<template>
  <h-group-iwt style="width:100%;min-height:30px">
    <div class="tj-diy-form-item-lb">{{label}}：</div>
    <el-checkbox  size="mini"  v-model="check" @change="changeHandler()"></el-checkbox>
    <div style="width:10px;"></div>
    <v-group-iwt style="flex:auto;" :style="{opacity:check?1:.5,'pointer-events':check?'auto':'none'}">
      <div v-for="(item,index) in formList"
           :key="index"
           v-if="item.hide?false:true"
           class="tj-formitem-gap">
        <component  :owner="owner"
                    :is="getComp(item)"
                    :data="item"
                    :label="item.label" >
        </component>
      </div>
    </v-group-iwt>
    <div v-if="data.desc" class="tj-diy-form-item-desc" :title="data.desc" > </div>
  </h-group-iwt>
</template>

<style scoped>

</style>
