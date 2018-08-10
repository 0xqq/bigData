<script>
  import ProcessAPI from "@/common/service/ProcessAPI"
  import AnalysisAPI from "@/common/service/AnalysisAPI";

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
        this.isLoading = true ;
        this.isOpen = true;
        AnalysisAPI.queryMonitorLogg({
          id:item.id
        }).then(
          (result)=>{
            this.isLoading = false ;
            //获取的是json字符串对象，需要用JSON.parse转为json对象,这样才能拿到相应的键值
            let obj =result.data.publishLog;
            let str = JSON.parse(obj);
            let  log = str.log.join(',');
            this.logData =log+"" ;
          },
          ()=>{
            this.isLoading = false ;
          },
        );
      },
      closeWin(){
        this.logData = "" ;
        this.isOpen = false;
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

