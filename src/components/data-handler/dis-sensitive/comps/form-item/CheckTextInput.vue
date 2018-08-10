<script>
  import FormItemUtils from "@/common/utils/FormItemUtils" ;
  export default {
    components: { },
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
        this.check = false ;
        this.vmodeData = "" ;
        this.checklb = "" ;
        if(!this.data)
          return ;
        if(this.data.clb)
          this.checklb = this.data.clb ;
        if( this.data.value){
          let arr = this.data.value.split(",") ;
          if(arr.length>0)
            this.check = FormItemUtils.getBoolean(arr[0]) ;
          if(arr.length>1)
            this.vmodeData = arr[1] ;
        }
        if(this.data.mode)
          this.mode = this.data.mode;
      },

      changeHandler(){
        if(!this.data )
          return ;
        this.data.value =  FormItemUtils.getValueData(this.check,this.mode) +","+this.vmodeData ;
      },
      changeHandler2(){
        if(!this.data )
          return ;
        this.data.value = FormItemUtils.getValueData(this.check,this.mode) +","+this.vmodeData ;
      }
    }
  }
</script>

<template>
  <h-group-iwt style="width:100%;height:30px;">
    <div class="tj-diy-form-item-lb">{{label}}：</div>
    <el-checkbox  size="mini"  v-model="check" @change="changeHandler()"></el-checkbox>
    <div style="width:10px;"></div>
    <div style="margin-right:10px;flex:none;" v-show="checklb">{{checklb}}</div>
    <el-input size="mini"  :disabled="check===true?false:true" v-model="vmodeData" @change="changeHandler2()" ></el-input>

    <div v-if="data.desc" class="tj-diy-form-item-desc" :title="data.desc" > </div>
  </h-group-iwt>
</template>

<style scoped>

</style>
