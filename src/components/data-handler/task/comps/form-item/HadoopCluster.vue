<!--<script>
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

      changeHandler(value) {
        console.log(value);
        //建立表一第一个值
        sessionStorage.setItem('clusterVa',JSON.stringify(value));
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
    <div class="tj-diy-form-item-lb">Hadoop Cluster：</div>
    <combo-box style="width:100%"
               @change="changeHandler"
               :labelField="'label'"
               :valueField="'value'"
               :valueData="vmodeData"
               :dataProvider="dataProvider">
    </combo-box>
    <div v-if="desc" class="tj-diy-form-item-desc" :title="desc" > </div>
  </h-group-iwt>
</template>

<style scoped>

</style>
