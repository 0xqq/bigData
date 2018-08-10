<script>
  /**
   * stack与指标之间的关系,以及堆叠关系
   */
  import Draggable from 'vuedraggable'
  import EventDispatcher from '@/common/event/EventDispatcher'
  import EventList from '@/common/event/EventList'

  export default {
    props:{
      settingsConfig: Object,
    },
    components: {Draggable},
    data(){
      this.eventsInit()
      return {
        metrics: [],
        settings: this.settingsConfig
      }
    },
    activated(){
      this.init()
    },
    deactivated(){
      this.metrics = [...this.metrics, ...this.settings.stack.group1, ...this.settings.stack.group2]
      this.settings.stack = undefined
    },
    methods: {
      eventsInit(){
        //开始图表编辑时，添加相关初始化操作
        EventDispatcher.addListener(EventList.CHART_CONFIG_BEGAIN, () => {
          this.init()
        })
      },
      init(){
        alert(2)
        //受限于stack的结构，目前强制设定仅支持两个分组，可定制追加分组，通常，至少两个轴，两个分组足够了
        if(this.settings.stack === undefined || this.settings.stack === null){
          this.settings.stack = {group1: [],group2: []}
        }
        //构建metrics，metrics中部分可能已经存在于static中，因此需要排出重复
        let metrics = this.settings.metrics.concat()
        for(let i=0; i<this.settings.stack.group1.length; i++){
          metrics.splice(metrics.findIndex(column => {
            return this.settings.stack.group1[i] === column
          }), 1)
        }
        for(let i=0; i<this.settings.stack.group2.length; i++){
          metrics.splice(metrics.findIndex(column => {
            return this.settings.stack.group2[i] === column
          }), 1)
        }
        this.metrics = metrics
      },
      getNameFromLabelMap(key){
        return this.settings.labelMap[key]?this.settings.labelMap[key]:key
      }
    },
    watch: {
      'settings.metrics': function(){
        this.init()
      }
    }
  }
</script>

<template>
  <el-row v-if="settings.stack">
    <el-col :span="6">
      <el-card header="堆叠分组1">
        <draggable v-model="settings.stack.group1" :options="{group: 'stack',draggable: '.draggable-class'}" class="draggable-container">
          <el-button round class="draggable-class" v-for="(item,index) in settings.stack.group1" :key="index">{{getNameFromLabelMap(item)}}</el-button>
        </draggable>
      </el-card>
    </el-col>
    <el-col :span="2" :offset="1" style="margin-top: 12px;">
      <el-button icon="el-icon-arrow-left" circle></el-button>
    </el-col>
    <el-col :span="6">
      <el-card header="指标源">
        <draggable v-model="metrics" :options="{group: 'stack',draggable: '.draggable-class'}" class="draggable-container">
          <el-button round class="draggable-class" v-for="(item,index) in metrics" :key="index">{{getNameFromLabelMap(item)}}</el-button>
        </draggable>
      </el-card>
    </el-col>
    <el-col :span="2" :offset="1" style="margin-top: 12px;">
      <el-button icon="el-icon-arrow-right" circle></el-button>
    </el-col>
    <el-col :span="6">
      <el-card header="堆叠分组2">
        <draggable v-model="settings.stack.group2" :options="{group: 'stack',draggable: '.draggable-class'}" class="draggable-container">
          <el-button round class="draggable-class" v-for="(item,index) in settings.stack.group2" :key="index">{{getNameFromLabelMap(item)}}</el-button>
        </draggable>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
  .draggable-container {
    min-height: 300px;

    .el-button {
      margin-right: 10px;
      margin-left: 0px;
      margin-top: 10px;
    }
  }
</style>
