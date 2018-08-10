<script>
  import HBaseTableName from "../form-item/HBaseTableName";
  import TextInput from "../form-item/TextInput";
  import DataGrid from "../form-item/DataGrid";

  export default {
    components: {
      DataGrid,
      TextInput,
      HBaseTableName
    },
    props: {
      'label': {default: ""},
      'data': {}
    },
    data() {
      return {
        vmodeData:false,
        "fileNameInField":{value:""},
        "fileNameField":{value:""},
        gridData:{value:"",label:"",params:{
             col:[
               {name:"alias",label:"Alias",type:"TextInput"},
               {name:"key",label:"Key",type:"ComboBox",params:{list:[{label:"Y",value:"Y"},{label:"N",value:"N"}]}},
               {name:"column_family",label:"Column family",type:"ComboBox",params:{list:[]}},
               {name:"column_name",label:"Column name",type:"TextInput"},
               {name:"type",label:"Type",type:"ComboBox",params:{list:[
                     {label:"String",value:"String"},
                     {label:"Integer",value:"Integer"},
                     {label:"Double",value:"Double"},
                     {label:"Float",value:"Float"},
                     {label:"Boolean",value:"Boolean"},
                     {label:"Date",value:"Date"},
                     {label:"BigNumber",value:"BigNumber"},
                     {label:"Binary",value:"Binary"}
                   ]}},
               {name:"indexed_values",label:"Indexed values",type:"TextInput"}
             ]
          }},
      }
    },

    mounted() {

    },

    watch:{
      data:function(){

      }
    },

    computed: {
    },

    methods: {
      initData(){

      },

      changeHandler(){

      }
    }
  }
</script>

<template>
  <!--文件-->
  <div width="100%" >

    <v-group-iwt style="width:100%;">
      <h-base-table-name></h-base-table-name>
      <v-gap-iwt></v-gap-iwt>
      <text-input label="Mapping name"></text-input>
      <v-gap-iwt></v-gap-iwt>
      <data-grid :data="gridData"></data-grid>
      <v-gap-iwt></v-gap-iwt>
      <h-group-iwt style="width:100%;">
        <el-button  type="primary" size="mini" >Save mapping</el-button>
        <h-gap-iwt></h-gap-iwt>
        <el-button  type="primary" size="mini" >Delete mapping</el-button>
        <div style="flex:1 1 ;"></div>
        <el-button type="primary" size="mini" >Get incoming fields</el-button>
      </h-group-iwt>

    </v-group-iwt>

  </div>
</template>

<style scoped>

</style>
