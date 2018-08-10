<script>
  import FromItemList from "./form-item/FormItemList" ;

  export default {
    components: {FromItemList},
    props: {
      'dataSource': {
        default: []
      }
    },
    data() {
      return {
          title:"",
      }
    },
    methods:{
      /**
       * 验证表单
       */
      validForm(){
         return true ;
      },
      submit(){
        this.$emit("submit",this.dataSource) ;
      },
      close(){
        this.$emit("close") ;
      }
    }
  }
</script>
<style scoped>

  .container{
    width:100%;

  }
  .list {
    width: 100%;
    min-height: 50px;
    max-height: 400px;
    overflow: auto;
  }
  .gap{
    height:10px;
  }

</style>
<template>
    <v-group-iwt class="container">
      <!--form-->
      <div class="list">
        <from-item-list :form-list="dataSource" ></from-item-list>
      </div>
      <div class="gap"></div>
      <h-group-iwt :hor="'center'"  style="width:100%;">
        <el-button type="primary" size="small" @click="submit"> 保存 </el-button>
        <el-button type="warning"  size="small" @click="close"> 关闭 </el-button>
      </h-group-iwt>
    </v-group-iwt>

</template>


