<script>
  /**
   * 坐标轴最大值与最小值
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
  <el-card header="坐标轴最大值与最小值" class="el-card" v-if="settings.yAxisType.length > 0">
    <el-row>
      <el-col :span="12" v-if="settings.yAxisType.includes('percent')">
        <el-input placeholder="请输入正整数" v-model.trim="settings.digit">
          <template slot="prepend">percent精度</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <form-array-item-input :source="settings.min" :index="0" label="左轴最小值" placeholder="可输入dataMin或整数数字"></form-array-item-input>
      </el-col>
      <el-col :span="12">
        <form-array-item-input :source="settings.max" :index="0" label="左轴最大值" placeholder="可输入dataMin或整数数字"></form-array-item-input>
      </el-col>
      <el-col :span="12" class="el-col" v-if="settings.yAxisType.length == 2">
        <form-array-item-input :source="settings.min" :index="1" label="右轴最小值" placeholder="可输入dataMax或整数数字"></form-array-item-input>
      </el-col>
      <el-col :span="12" class="el-col" v-if="settings.yAxisType.length == 2">
        <form-array-item-input :source="settings.max" :index="1" label="右轴最大值" placeholder="可输入dataMax或整数数字"></form-array-item-input>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped lang="scss">
  .el-card {
    margin-bottom: 15px;

    .el-col {
      margin-top: 15px;
    }
  }
</style>
