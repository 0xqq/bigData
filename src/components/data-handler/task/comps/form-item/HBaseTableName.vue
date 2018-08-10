<!--<script>
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
    <el-button type="primary" size="mini" @click="getTableName">Get table name</el-button>
  </h-group-iwt>
</template>

<style scoped>

</style>-->
<script>
  import ComboBox from "@/common/comps/normal/form/ComboBox" ;
  import ProcessAPI from "@/common/service/ProcessAPI" ;

  export default {
    components: {ComboBox},
    props: {
      'label': {default: ""},
      'data': {},
      "owner":{},
      'desc':{default:""}
    },

    data() {
      return {
        dataProvider: [],
        vmodeData: ""
      }
    },

    mounted() {
      this.initData();
    },

    watch: {
      data: function () {
        this.initData();
      }
    },

    computed: {},

    methods: {
      initData() {
        this.dataProvider = [];
        this.vmodeData = "";
        if (!this.data)
          return ;
        if(this.data.desc )
          this.desc = this.data.desc ;
        if (this.data)
          this.vmodeData = this.data.value;
      },

      /**
       * 获取表名字
       */
      getTableName(){
        //获取表一第一个值
        let cluster_name = JSON.parse(sessionStorage.getItem('clusterVa'));
        let models = {
            model:{
              cluster_name:cluster_name,
            }
        };
        ProcessAPI.queryNamedHbaseTable(models).then(
          (result)=>{
            let list = result.data.mappedTables ;
            let arr = [] ;
            for(let item of list ){
              arr.push({label:item.name,value:item.name}) ;
            }
            this.dataProvider = arr ;
          },
          ()=>{
          }
        )
      },
      changeHandler(value) {
        //建立表一第二个值
        console.log(value);
        sessionStorage.setItem('hbaseVa',JSON.stringify(value));
        if (!this.data)
          return;
        this.vmodeData = value ;
        this.data.value = this.vmodeData;
      }
    }
  }
</script>

<template>
  <h-group-iwt style="width:100%;height:30px;">
    <div class="tj-diy-form-item-lb">HBase Table name：</div>
    <combo-box style="width:100%"
               @change="changeHandler"
               :labelField="'label'"
               :valueField="'value'"
               :valueData="vmodeData"
               :dataProvider="dataProvider">
    </combo-box>
    <div v-if="desc" class="tj-diy-form-item-desc" :title="desc" > </div>
    <el-button type="primary" size="mini" @click="getTableName">Get table name</el-button>
  </h-group-iwt>
</template>

<style scoped>

</style>
