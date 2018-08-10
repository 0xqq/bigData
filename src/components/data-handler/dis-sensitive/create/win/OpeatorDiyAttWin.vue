<script>
  import TaskCreatePM from "../../TaskCreatePM" ;
  import Inject from "@/common/model/Inject" ;
  import HandlerForm from "../../comps/HandlerForm";

  export default {
    components:{HandlerForm},
    data() {
      this.viewPM = Inject.getClass(TaskCreatePM)  ;
      return {
        viewData:this.viewPM.data,
      }
    },
    created(){
    },
    methods:{
      submit(value){
        this.viewPM.saveFormListData(value) ;
        this.close() ;
      },
      close(){
        this.viewData.diyAttWinForm.isPopWin = false ;
      }
    }
  }
</script>

<template>

  <s-window-auto :title="viewData.diyAttWinForm.title"
                 v-show="viewData.diyAttWinForm.isPopWin"
                 @close="()=>{viewData.diyAttWinForm.isPopWin=false;}"
                 :width="'60%'"  >

    <!--单独写 别的地方也要用-->
    <handler-form :data-source="viewData.diyAttWinForm.formItemList"
                   @close="close"
                   @submit="submit">
    </handler-form>

  </s-window-auto>
</template>

<style scoped>
</style>
