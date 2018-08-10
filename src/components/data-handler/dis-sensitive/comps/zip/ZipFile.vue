<script>
    import SingleFormWin from "../base/SingleFormWin" ;

    export default {
      mixins: [SingleFormWin],
      data() {
        return {
          form:{
            name: "",
            test1:""
          }
        }
      },
      computed: {},
      methods: {

        initData() {
          this.test = "" ;
          if(!this.data)
            return ;
          this.initFormDatas(this.form) ;
        },

        changeHandler(){
          this.refreshDatas(this.form)
        }
      }
    }
</script>

<style scoped>
</style>

<template>
    <div style="width:100%;height:300px;">
       <el-input size="mini"
                 v-model="form.name"
                 @change="changeHandler">
       </el-input>
    </div>
</template>
