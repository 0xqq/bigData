<script>
  import PopManager from "@/common/utils/PopManager";
  import NormalUtils from "@/common/utils/NormalUtils";
  import echarts from "echarts" ;
  const colors = ["#990099","#ffcc00", "#ff8000","#330099","#0066b3", "#00cc00"] ;
  export default {
    // mixins: [ChartBase],
    props: [ "query","dataSource", "series", "options", "isLoading","title"],
    data() {
      return {
        chartId: NormalUtils.createOID("chartId"),
        imgSource:null,
        inited:false,
        showDetail:false,
        legendList:[],
        legendHi:23,
        legendH:50
      }
    },
    watch: {
      dataSource: function () {
        if(this.inited)
           this.renderData();
      },
      series:function(){
        if(this.inited)
          this.renderData();
      }
    },
    mounted() {
      this.inited = true ;
      //初始化图表
      this.initChart();
    },
    methods: {
      /**
       * 初始化图表
       */
      initChart() {
        let chartDom = document.getElementById(this.chartId);
        this.chart = echarts.init(chartDom);
        this.option = this.getOptions();
        this.chart.setOption(this.option);
        this.renderData(); //刷新数据
      },

      getOptions() {

        //如果为空不显示 否则显示
        const intervalFunc = (index, value)=>{
          if(value)
            return true;
          return false
        } ;

        return {
          color:colors,
          tooltip: {
            trigger: 'axis'
          },
          legend: {
              show:false
          },
          grid: {
            show:true,
            left: '20',
              right: '20',
              top:"20",
              bottom: '5',
              containLabel: true,
              borderColor:"#fff",
              borderWidth:0
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLine:{
              show:true,
                lineStyle: {
                  color: '#dddddd',
                  width: 1,
                  type: 'solid'
                }
            },
            axisLabel:{
                color:"#000",
                fontSize:12,
                interval:intervalFunc
            },
            splitLine:{
              show:true,
                lineStyle:{
                color: ['#dddddd'],
                  width:0.5,
                  type: 'dashed'
              }
            }
          },
          yAxis: {
            axisLine: {
              show: true,
              lineStyle: {
                color: '#dddddd',
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: {
              color: "#000",
              fontSize: 13,
              fontWeight: "bold",
              showMinLabel:false
            },
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#dddddd'],
                width: 0.5,
                type: 'dashed'
              }
            }
          }
        };
      },

      /**
       * 单独刷新serise  算了每次都设置
       */
      renderSerise( ){
        if(!this.series)
          return ;

        let _arr = [] ;
        let _len = this.series.length ;
        for(let item of this.series){
          let _serise = {
            name:item.name,
            type:'line',
            hoverAnimation:false,
            step:true,
            showSymbol:false,
            markPoint:{
              show:false
            }
          } ;
          _arr.push(_serise) ;
        }
        this.option.series = _arr ;
      },

      /**
       * 单独刷新数据源
       */
      renderData() {
        if (!this.dataSource || this.dataSource.length===0 || !this.series || this.series.length===0)
          return;

        //加个保险
        if(!this.option.series || this.option.series.length!==this.dataSource.length)
          this.renderSerise() ;

        //先简单处理 temp?
        if(this.options && this.options.formatter)
          this.option.yAxis.axisLabel.formatter = this.options.formatter ;

        let _series = this.option.series ;
        let _len = this.dataSource.length ;
        for(let i=0;i<_len;i++){
          _series[i].data = this.dataSource[i] ;
        }
        let _lbs = [] ;
        if(_len>0){
          let _lastData =  this.dataSource[_len-1] ;
          for( let attItem of _lastData ){
              _lbs.push(attItem.showLabel||"" ) ;
          }
        }
        this.option.xAxis.data = _lbs ;
        this.chart.setOption( this.option );

        //创建本地图例
        this.createLegend(_series) ;

        //本地截图
        this.setLoading(true) ;
        setTimeout(()=>{
          this.imgSource = this.chart.getDataURL( ) ;
          this.chart.resize() ;
          this.setLoading(false) ;
        },500)
      },

      setLoading(value){
        if(this.query)
          this.query.isLoading = value ;
      },

      /**
       * 创建图例
       */
      createLegend( series){
        let _len = series.length ;
        let _arr = [] ;
        let _oldLen = this.legendList.length ;
        for(let i=0;i<_len;i++){
          let _serie  = series[i] ;
          let _legend =  {name:_serie.name ,color:colors[i%(colors.length)] , show:true } ;
          this.setMaxMinAvg(_serie.data,_legend) ;
          _arr.push(_legend) ;
        }
        this.legendList = _arr ;
        this.legendH = _arr.length * this.legendHi + 30 ;
      },

      /**
       * 最笨的循环法计算 三个指标
       */
      setMaxMinAvg(datas , legend){
        let count = 0 ;
        let min = NaN ;
        let max = NaN ;
        let value ;
        for(let item of datas ){
          value = parseFloat(item.value) ;
          count += value ;
          if(isNaN(max) || value>max)
            max = value ;
          if(isNaN(min) || value<min)
            min = value ;
        }
        legend.max = max ;
        legend.min = min ;
        legend.avg =  (count/(datas.length)).toFixed(2) ;
        legend.id = NormalUtils.createOID("legendid") ;
      },

      /**
       * 弹出详情窗口
       */
      popDetailWin(){
        let chartDom = $("#body"+this.chartId);
        let win = PopManager.popStaticWin(chartDom,this.title,{width:800,height:560,closeHandler:()=>{
            let _dom = $("#box"+this.chartId);
            _dom.append(chartDom) ;
            this.$emit("detailClose") ;
          }}) ;
        this.$emit("showDetail") ;
      },

      /**
       * 显示隐藏图例
       * @param item
       */
      changeLegend(item){
        if(!this.chart)
          return ;

        //显示隐藏图例
        item.show = !item.show ;
        this.chart.dispatchAction({
          type: 'legendToggleSelect',
          name: item.name
        });
      }
    }
  }
</script>

<style scoped>
  .chart-content{
    left:0;
    top:0;
    bottom:0;
    right:0;
    position:absolute;
    overflow: hidden;
  }
  .chart-big{
    width:800px;
    height:500px;
    position:absolute;
  }
  .chart-mask{
    background-color: #fff;
  }
  .chart-img-clip{
    top:-1px;
    left:-1px;
    right:-1px;
    bottom:-1px;
    position:absolute;
    cursor: pointer;
    overflow: hidden;
  }
  .chart-img{
    width:100%;
    height:100%;
    position:absolute;
  }
  .chart-body{
    top:0;
    bottom:100px;
    left:10px;
    right:30px;
    position:absolute;
    overflow: hidden;
  }
  .chart-legend{
    padding: 10px 10px ;
    background-color: #999;
    bottom:10px;
    left:20px;
    right:20px;
    position:absolute;
    height:auto;
    border-radius:5px;
  }

  .legend-item{
    width:100%;
    height:20px;
    margin-bottom: 3px;
    color:#ffffff;
    font-weight: bold;
    font-size:12px;
    cursor: pointer;
    pointer-events: auto;
  }

  /*颜色框*/
  .color-box{
    width:12px;
    height:12px;
    flex:none;
    border:1px solid #023b66;
    border-radius: 2px;
  }
  .legend-lb{
    padding-left: 10px;
    flex:auto;
  }
  .split{
    background-color: #fff;
    width:2px;
    height:10px;
    flex:none;
  }
  .title-lb{
    padding:0 15px;
  }
  .value-lb{
    width:100px;
    text-align: center;
  }
</style>

<template>

  <!--图表-->
  <div class="chart-content" >

    <div class="chart-big" v-bind:id="'box'+chartId" >

      <div class="tj-abs"  v-bind:id="'body'+chartId" >

        <div class="chart-body" :style="{bottom:legendH+'px'}" v-bind:id="chartId" ></div>

        <!--图例单写-->
        <div class="chart-legend" >
          <v-group-iwt style="width:100%;">
              <h-group-iwt class="legend-item"
                           v-for="(item,index) in legendList "
                           :key="index"
                           :style="{'opacity':item.show?1:0.6}"
                           @click="changeLegend(item)"
                           :id="item.id">
                <!--color box-->
                <div class="color-box" :style="{'background-color':item.color}"></div>
                <div class="legend-lb">{{item.name}}</div>
                <div class="split"></div>
                <div class="title-lb">最小值</div>
                <div class="value-lb">{{item.min}}</div>
                <div class="title-lb">平均值</div>
                <div class="value-lb">{{item.avg}}</div>
                <div class="title-lb">最大值</div>
                <div class="value-lb">{{item.max}}</div>
              </h-group-iwt>
          </v-group-iwt>
        </div>
      </div>
    </div>
    <div class="chart-content chart-mask"></div>
    <div class="chart-img-clip">
      <img :src="imgSource"  class="chart-img"  @click="popDetailWin">
    </div>
  </div>

</template>
