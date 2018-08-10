<script>
  /**
   * 垂直方向为纵轴
   */

  export default {
    props: {settingConfig: Object},
    components: {},
    data() {
      return {
        settings: this.settingConfig
      }
    },
    computed: {},
    mounted() {},
    activated() {},
    methods: {}
  }
</script>

<template>
  <el-card header="垂直方向纵轴标题" class="el-card" v-if="settings.yAxisType.length > 0">
    <el-row>
      <el-col :span="12">
        <form-array-item-input :source="settings.yAxisName" :index="0" label="左侧坐标轴" placeholder="请输入坐标轴名称"></form-array-item-input>
      </el-col>
      <el-col :span="12" v-if="settings.yAxisType.length == 2">
        <form-array-item-input :source="settings.yAxisName" :index="1" label="右侧坐标轴" placeholder="请输入坐标轴名称"></form-array-item-input>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped lang="scss">
  .el-card {
    margin-bottom: 15px;
  }
</style>
