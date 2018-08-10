<script>
  /**
   * 左右坐标轴与指标之间的关系
   */
  import Draggable from 'vuedraggable'

  export default {
    props:{
      settingsConfig: Object
    },
    components: {Draggable},
    data(){
      //构建metrics，metrics中部分可能已经存在于axisSite.right或left中，因此需要排出重复
      let metrics = this.settingsConfig.metrics.concat()
      for(let i=0; i<this.settingsConfig.axisSite.left.length; i++){
        metrics.splice(metrics.findIndex(column => {
          return this.settingsConfig.axisSite.left[i] === column
        }), 1)
      }
      for(let i=0; i<this.settingsConfig.axisSite.right.length; i++){
        metrics.splice(metrics.findIndex(column => {
          return this.settingsConfig.axisSite.right[i] === column
        }), 1)
      }
      return {
        metrics: metrics,
        settings: this.settingsConfig
      }
    },
    methods: {
      getNameFromLabelMap(key){
        return this.settingsConfig.labelMap[key]?this.settingsConfig.labelMap[key]:key
      },
    }
  }
</script>

<template>
  <el-card header="左右坐标轴与指标">
    <el-row class="el-row">
      <el-col :span="6">
        <el-card header="左侧坐标轴">
          <draggable v-model="settings.axisSite.left" :options="{group: 'metrics',draggable: '.v-chart-data-column'}" class="draggable-container">
            <el-button round class="v-chart-data-column" v-for="(item,index) in settings.axisSite.left" :key="index">{{getNameFromLabelMap(item)}}</el-button>
          </draggable>
        </el-card>
      </el-col>
      <el-col :span="2" :offset="1" style="margin-top: 12px;">
        <el-button icon="el-icon-arrow-left" circle></el-button>
      </el-col>
      <el-col :span="6">
        <el-card header="指标源">
          <draggable v-model="metrics" :options="{group: 'metrics',draggable: '.v-chart-data-column'}" class="draggable-container">
            <el-button round class="v-chart-data-column" v-for="(item,index) in metrics" :key="index">{{getNameFromLabelMap(item)}}</el-button>
          </draggable>
        </el-card>
      </el-col>
      <el-col :span="2" :offset="1" style="margin-top: 12px;">
        <el-button icon="el-icon-arrow-right" circle></el-button>
      </el-col>
      <el-col :span="6">
        <el-card header="右侧坐标轴">
          <draggable v-model="settings.axisSite.right" :options="{group: 'metrics',draggable: '.v-chart-data-column'}" class="draggable-container">
            <el-button round class="v-chart-data-column" v-for="(item,index) in settings.axisSite.right" :key="index">{{getNameFromLabelMap(item)}}</el-button>
          </draggable>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped lang="scss">
  .draggable-container{
    min-height: 200px;

    .el-button {
      margin-right: 10px;
      margin-left: 0px;
      margin-top: 10px;
    }
  }
</style>
