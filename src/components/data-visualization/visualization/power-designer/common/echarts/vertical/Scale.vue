<script>
  /**
   * 坐标轴是否脱离0
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
  <el-card header="坐标轴是否脱离0" class="el-card" v-if="settings.yAxisType.length > 0">
    <el-row>
      <el-col :span="12">
        <form-array-item-switch :source="settings.scale" :index="0" active-text="(左/上)轴脱离" inactive-text="(左/上)轴不脱离"></form-array-item-switch>
      </el-col>
      <el-col :span="12" v-if="settings.yAxisType.length == 2">
        <form-array-item-switch :source="settings.scale" :index="1" active-text="(右/上)轴脱离" inactive-text="(右/上)轴不脱离"></form-array-item-switch>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped lang="scss">
  .el-card {
    margin-bottom: 15px;
  }
</style>
