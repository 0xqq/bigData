
import NormalUtils from "@/common/utils/NormalUtils";
export default {
  props:["dataSource","series","options","isLoading" ],
  data() {
    return {
      chartId:NormalUtils.createOID("chartId")
    }
  },
  watch:{
    dataSource:function(){
      this.renderData() ;
    }
  },
  mounted() {
    //初始化图表
    this.initChart() ;
  },
  methods: {
    /**
     * 初始化图表
     */
    initChart(){
      let chartDom = document.getElementById(this.chartId) ;
      this.chart =  echarts.init(chartDom);
      this.option = this.getOptions() ;
      this.chart.setOption(this.option) ;
      this.refreshSeries() ;
      this.renderData();
    },

    /**
     * 渲染图表
     */
    renderData(){

      //单个数据的
      if(this.dataSource){
        let _datas = this.dataSource.map((item)=>{
          return {data:item} ;
        }) ;
        this.chart.setOption({
              series: _datas
            });
      }

      NormalUtils.showObjStr(this.option) ;
    },

    /**
     * 获得分层配置
     */
    refreshSeries(){
       if(this.series){
         this.chart.setOption({
           series: this.series
         });
       }
    },

    /**
     * 获得基本配置
     */
    getOptions(){
    }

  }
};
