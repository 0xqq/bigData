<script>
  import ComboBox from "@/common/comps/normal/form/ComboBox" ;
  import FormItemUtils from "@/common/utils/FormItemUtils" ;
  import TableColumnBase from "../base/TableColumnBase" ;

  export default {
    components: { ComboBox },
    mixins:[TableColumnBase],
    props: {
      'label': {default: ""},
      "owner":{},
      'data': {},
      desc:{default: ""}
    },
    data() {
      return {
        dataProvider:[],
        check:false,
        checklb:"",
        vmodeData:"",
        mode:1
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
        this.dataProvider = [] ;
        this.checklb = "" ;
        if(!this.data)
          return ;
        if(this.data.clb)
          this.checklb = this.data.clb ;
        if(this.data.params && this.data.params.list)
          this.dataProvider = this.data.params.list ;

        this.check = false ;
        this.vmodeData = "" ;
        if(this.data && this.data.value){
          let arr = this.data.value.split(",") ;
          if(arr.length>0)
            this.check = FormItemUtils.getBoolean(arr[0]) ;
          if(arr.length>1)
            this.vmodeData = arr[1] ;
        }
        if(this.data.mode)
          this.mode = this.data.mode;

        //自动查询数据
        this.queryFieldList() ;
      },

      changeHandler(){
        if(!this.data )
          return ;
        this.data.value = FormItemUtils.getValueData(this.check,this.mode)+","+this.vmodeData ; ;
      },
      changeHandler2(value){
        if(!this.data )
          return ;
        this.vmodeData = value ;
        this.data.value =  FormItemUtils.getValueData(this.check,this.mode)+","+this.vmodeData ;
      }
    }
  }
</script>

<template>
  <h-group-iwt style="width:100%;height:30px;">
    <div class="tj-diy-form-item-lb">{{label}}：</div>
    <el-checkbox v-model="check" @change="changeHandler"></el-checkbox>
    <div style="width:10px;flex:none;"></div>
    <div :style="{'opacity':check?1:.5,'margin-right':'10px','flex':'none'}"
         v-show="checklb">{{checklb}}</div>
    <!--不封装了实现-->
    <combo-box style="flex:auto;"
               :style="{'opacity':check?1:.5,'margin-right':'10px','pointer-events': check?'auto':'none' }"
               @change="changeHandler2"
               :dataProvider="dataProvider"
               :valueData="vmodeData" >
    </combo-box>
    <div v-if="data.desc" class="tj-diy-form-item-desc" :title="data.desc" > </div>
  </h-group-iwt>
</template>

<style scoped>

</style>
