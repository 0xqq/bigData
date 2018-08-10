<script>
  import Vue from 'vue'
  import Contentmenu from 'v-contextmenu'
  import 'v-contextmenu/dist/index.css'

  import Inject from "@/common/model/Inject"
  import EventDispatcher from "@/common/event/EventDispatcher"
  import EventList from "@/common/event/EventList"

  import Container from '../../model/Container'
  import Chart from '../../model/Chart'
  import ViewChart from '../chart/ViewChart'
  import NormalUtils from "../../../../../common/utils/NormalUtils"
  import ConfigConstants from "../../model/charts/ConfigConstants"

  Vue.use(Contentmenu)

  export default {
    props:{
      layoutItemConfig: Object,
      containerConfig: Object
    },
    components:{ViewChart},
    data() {
      this.containerPM = Inject.getClass(Container)
      this.chartPM = Inject.getClass(Chart)
      return {
        layoutItem: this.layoutItemConfig,
        container: this.containerConfig
      }
    },
    computed: {},
    mounted() {},
    activated() {},
    methods: {
      containerRemove(vm,event){
        this.layoutItem.containers.splice(this.layoutItem.containers.findIndex((item) => {return item.id === this.container.id}),1)
      },
      containerRemoveAll(vm,event){
        this.layoutItem.containers = []
      },
      containerBaseEdit(vm,event){
        this.containerPM.initContainerBase(this.container)
        EventDispatcher.addListener(EventList.EDIT_CONTAINER_BASE_INFO,() => {
          this.containerPM.initContainerBase(this.containerPM,this.container)
          this.containerPM.show = false
        })
        this.containerPM.show = true
      },
      chartConfigEdit(){
        /**
         * 根据图表类型type，动态回去PM单例管理器dynamicChartConfigPM
         * 并将type动态传递给this.chartPM单例type，使得图表配置项编辑组件可以实时获得最新的type，以及动态管理器dynamicChartConfigPM
         * 动态管理器中，具有很多相同的方法
         */
        this.chartPM.type = this.container.chart.type
        let dynamicChartConfigPM = Inject.getClass(ConfigConstants.chartConfigMap.get(this.container.chart.type))
        dynamicChartConfigPM.init(this.container.chart.config)
        //添加完成图表处理的事件处理
        EventDispatcher.addListener(EventList.CHART_CONFIG_COMPLETE, () => {
          dynamicChartConfigPM.init(dynamicChartConfigPM, this.container.chart.config)
          this.chartPM.showConfigEdit = false
        })
        this.chartPM.showConfigEdit = true
        //通知子组件，已经开始图表配置了
        EventDispatcher.disEvent(EventList.CHART_CONFIG_BEGAIN)
        EventDispatcher.disEvent(EventList.CHART_CONFIG_BEGAIN)
      },
      chartDatasourceEdit(){
        // EventList.CHART_DATASOURCE_CONFIG
        NormalUtils.popMessage("建设中，请稍后...")
      }
    }
  }
</script>

<template>
  <div :style="container.style">
    <view-chart :containerConfig="container" v-contextmenu:containerMenu></view-chart>
    <v-contextmenu ref="containerMenu">
      <v-contextmenu-item @click="chartDatasourceEdit">数据构建</v-contextmenu-item>
      <v-contextmenu-item divider></v-contextmenu-item>
      <v-contextmenu-item @click="chartConfigEdit">图表配置项</v-contextmenu-item>
      <v-contextmenu-item divider></v-contextmenu-item>
      <v-contextmenu-item @click="containerBaseEdit">基础编辑</v-contextmenu-item>
      <v-contextmenu-item divider></v-contextmenu-item>
      <v-contextmenu-item @click="containerRemove">删除图表</v-contextmenu-item>
      <v-contextmenu-item @click="containerRemoveAll" v-if="layoutItem.containers.length > 1">全部删除</v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>

<style scoped lang="scss">

</style>
