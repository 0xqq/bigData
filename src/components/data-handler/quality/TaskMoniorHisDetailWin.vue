<script>
  import ProcessAPI from "@/common/service/ProcessAPI" ;
  export default {
    data() {
      return {
        isLoading:false,
        isOpen:false ,
        jobId:"",
        logData:""
      }
    },
    mounted(){
    },
    methods:{

      /**
       * 打开窗口
       */
      open(item){
        this.jobId = item.id ;
        this.queryList();
        this.isOpen = true;
      },
      closeWin(){
        this.logData = "" ;
        this.isOpen = false;
      },
      queryList(){
        this.isLoading = true ;
        ProcessAPI.queryMoniorLog({id:this.jobId+""}).then(
          (result)=>{
            this.isLoading = false ;
            this.logData = result.data.log+"" ;
          },
          ()=>{
            this.isLoading = false ;
          },
        ) ;
      }
    }
  }

</script>

<style scoped lang="scss">
  .container{
    padding: 10px 10px ;
    box-sizing: border-box;
    overflow-y: auto;
    .log-content{
      width:100%;
      word-break: break-all;
    }
  }

</style>

<template>
  <s-window title="任务监控-查看日志"
            @close="()=>{this.closeWin()}"
            :visible="isOpen"
            :width="'750px'"
            :height="'520px'"  >
    <div class="container">
        <div class="log-content" v-html="logData"  ></div>
    </div>
    <!--loading-->
    <s-loading v-show="isLoading"></s-loading>
  </s-window>
</template>

