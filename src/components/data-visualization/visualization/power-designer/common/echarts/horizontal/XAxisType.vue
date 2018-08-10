<script>
  /**
   * 水平方向作为横轴
   */
  export default {
    props: {settingConfig: Object},
    components: {},
    data() {
      return {
        settings: this.settingConfig,
        xAxisTypeEnum: ['category','value','time','log']
      }
    },
    computed: {},
    mounted() {},
    activated() {},
    methods: {}
  }
</script>

<template>
  <el-card header="水平方向横坐标数据类型" class="el-card">
    <el-row>
      <el-col :span="24">
        <el-radio-group v-model="settings.xAxisType">
          <el-radio v-for="(item,index) in xAxisTypeEnum" :key="index" :label="item">{{item}}</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped lang="scss">
  .el-card {
    margin-bottom: 15px;
  }
</style>
