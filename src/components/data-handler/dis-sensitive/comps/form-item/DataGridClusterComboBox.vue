<script>
  import ComboBox from "@/common/comps/normal/form/ComboBox" ;
  import ProcessAPI from "@/common/service/ProcessAPI" ;

  export default {
    components: { ComboBox },
    props: {
      'row': { },
      'column': {},
      "source":{},
      "sourceIndex":{default:""},
      "index":{default:1},
      'labelField': {default: "label"},
      'valueField':{default:"value"}
    },
    data() {
      return {
        dataProvider:[],
        vmodeData:""
      }
    },

    mounted() {
      this.initData() ;
    },

    watch: {
      row: {
        handler: function () {
          this.initData();
        },
        deep: true
      },
      column:{
        handler: function () {
          this.initData();
        },
        deep: true
      },
      source: {
        handler: function(newVal, oldVal) {
          this.initDataList() ;
        },
        deep: true
      }
    },

    computed: {
    },

    methods: {

      initData(){
        //解析列表
        this.initDataList() ;

        //解析值
        this.initDataValue();
      },

      initDataValue(){
        this.vmodeData = "";
        if(this.row && this.column &&  this.column.name && this.row.hasOwnProperty(this.column.name)){
          this.vmodeData = this.row[this.column.name] ;
        }
      },

      initDataList(){
        this.dataProvider = [] ;
        this.queryCluster() ;
      },

      /**
       * 查询平台处理
       */
      queryCluster(){
        ProcessAPI.queryNamedClusters({}).then(
          (result)=>{
            let list = result.data.fields ;
            let arr = [] ;
            for(let item of list ){
              arr.push({label:item.name,value:item.name}) ;
            }
            this.dataProvider = arr ;
          },
          ()=>{
          }
        ) ;
      },

      changeHandler(value){
        this.vmodeData = value ;
        if(!this.row || !this.column || !this.column.name )
          return ;
        this.row[this.column.name] = value;
        this.$emit("change",this.row) ;
      }
    }
  }
</script>

<template>
  <combo-box style="width:100%"
             @change="changeHandler"
             :trans="true"
             :labelField="labelField"
             :valueField="valueField"
             :dataProvider="dataProvider"
             :valueData="vmodeData" >
  </combo-box>
</template>

<style scoped>

</style>
