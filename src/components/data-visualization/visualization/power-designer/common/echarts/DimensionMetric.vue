<script>
  /**
   *
   */
  import Draggable from 'vuedraggable'
  import EventDispatcher from '@/common/event/EventDispatcher'
  import EventList from '@/common/event/EventList'

  export default {
    props: {
      columnsConfig: Array,
      settingConfig: Object
    },
    components: {Draggable},
    data() {
      return {
        columns: [],
        settings: this.settingConfig
      }
    },
    computed: {},
    mounted() {
      this.init()
    },
    activated() {},
    updated(){},
    methods: {
      init(){
        alert(1)
        //构建独立的columns数据，且不影响外部结构，仅在此处使用，外部不需要
        //columnsConfig中排出掉已经存在于settingConfig.dimensions和settingConfig.metrics中的值
        let columns = this.columnsConfig.concat()
        for(let i=0; i<this.settingConfig.dimensions.length; i++){
          columns.splice(columns.findIndex(column => {
            return this.settingConfig.dimensions[i] === column
          }), 1)
        }
        for(let i=0; i<this.settingConfig.metrics.length; i++){
          columns.splice(columns.findIndex(column => {
            return this.settingConfig.metrics[i] === column
          }), 1)
        }
        this.columns = columns
      },
      eventsInit(){
        //开始图表编辑时，添加相关初始化操作
        EventDispatcher.addListener(EventList.CHART_CONFIG_BEGAIN, () => {
          this.init()
        })
      },
      getNameFromLabelMap(key){
        return this.settings.labelMap[key]?this.settings.labelMap[key]:key
      },
      dimensionMove(evt, originalEvent){
        return this.settings.dimensions.length > 1
      },
      metricMove(evt, originalEvent){
        return this.settings.metrics.length > 1
      },
      columnMove(evt, originalEvent){
        let column = evt.draggedContext.element
        return !(this.settings.dimensions.includes(column) || this.settings.metrics.includes(column))
      }
    },
    watch: {}
  }
</script>

<template>
  <el-row>
    <el-col :span="6">
      <el-card header="维度(至少一项)">
        <draggable v-model="settings.dimensions" :options="{group: 'columns',draggable: '.v-chart-data-column'}" :move="dimensionMove" class="draggable-container">
          <el-button round class="v-chart-data-column" v-for="(item,index) in settings.dimensions" :key="index">{{getNameFromLabelMap(item)}}</el-button>
        </draggable>
      </el-card>
    </el-col>
    <el-col :span="2" :offset="1" style="margin-top: 12px;">
      <el-button icon="el-icon-arrow-left" circle></el-button>
    </el-col>
    <el-col :span="6">
      <el-card header="数据源构建列表">
        <draggable v-model="columns" :options="{group: 'columns',draggable: '.v-chart-data-column'}" :move="columnMove" class="draggable-container">
          <el-button round class="v-chart-data-column" v-for="(item,index) in columns" :key="index">{{getNameFromLabelMap(item)}}</el-button>
        </draggable>
      </el-card>
    </el-col>
    <el-col :span="2" :offset="1" style="margin-top: 12px;">
      <el-button icon="el-icon-arrow-right" circle></el-button>
    </el-col>
    <el-col :span="6">
      <el-card header="指标(至少一项)">
        <draggable v-model="settings.metrics" :options="{group: 'columns',draggable: '.v-chart-data-column'}" :move="metricMove" class="draggable-container">
          <el-button round class="v-chart-data-column" v-for="(item,index) in settings.metrics" :key="index">{{getNameFromLabelMap(item)}}</el-button>
        </draggable>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
  .draggable-container{
    min-height: 400px;

    .el-button {
      margin-right: 10px;
      margin-left: 0px;
      margin-top: 10px;
    }
  }
</style>
