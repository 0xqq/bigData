<script>
  /**
   * 垂直方向纵轴数据类型
   */
  import Draggable from 'vuedraggable'

  export default {
    props: {settingConfig: Object},
    components: {Draggable},
    data() {
      return {
        settings: this.settingConfig,
        yAxisTypeEnum: ['KMB','normal','percent']
      }
    },
    computed: {},
    mounted() {},
    activated() {},
    methods: {}
  }
</script>

<template>
  <el-card header="垂直方向纵轴数据类型" class="el-card">
    <el-row>
      <el-col :span="10">
        <draggable v-model="yAxisTypeEnum" :options="{group: 'yAxisType',draggable: '.draggable-class'}" :move="() => {return this.settings.yAxisType.length < 2}" class="draggable-container">
          <el-button round class="draggable-class" v-for="(item,index) in yAxisTypeEnum" :key="index">{{item}}</el-button>
        </draggable>
      </el-col>
      <el-col :span="4">
        <el-button icon="el-icon-arrow-right" circle></el-button>
      </el-col>
      <el-col :span="10">
        <draggable v-model="settings.yAxisType" :options="{group: 'yAxisType',draggable: '.draggable-class'}" :move="() => {return this.settings.yAxisType.length > 1}" class="draggable-container">
          <el-button round class="draggable-class" v-for="(item,index) in settings.yAxisType" :key="index">{{item}}</el-button>
        </draggable>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped lang="scss">
  .el-card{
    margin-bottom: 15px;

    .draggable-container{
      min-height: 40px;

      .el-button {
        margin-right: 10px;
        margin-left: 0px;
        margin-top: 10px;
      }
    }
  }

</style>
