<script>
  import NormalUtils from "@/common/utils/NormalUtils";
  import echarts from "echarts" ;
  export default {
    props: ["dataSource", "series", "options", "isLoading"],
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
    },
    computed:{
      showDatas(){
        if(this.dataSource)
          return this.dataSource;
        return [] ;
      },
      showCol1(){
        if(this.options && this.options.col1)
            return this.options.col1;
        return "导出次数"
      }
    },
  }
</script>

<style scoped lang="scss">
  .chart-content{
    @include abs-group() ;
    .table-border{
      border-collapse: collapse;
      width:100%;
      & tr th, & tr td {
        border: 1px solid #d7d7d7;
        text-align: center;
        vertical-align: middle;
        color:#333333;
        font-size:13px;
        height:30px;
      }
      & tr:nth-child(1){
        td{
          font-weight: bold;
        }
      }
      & tr td:nth-child(1){
        width:70%;
      }
      & tr td:nth-child(2){
        width:30%;
      }
    }
  }
</style>

<template>
  <div class="chart-content" >

    <table class="table-border" >
      <tr><td>单位名称</td><td>{{showCol1}}</td></tr>
      <tr v-for="(item,index) in showDatas" :key="index">
        <td>{{item.key}}</td>
        <td>{{item.val}}</td>
      </tr>
    </table>
  </div>

</template>
