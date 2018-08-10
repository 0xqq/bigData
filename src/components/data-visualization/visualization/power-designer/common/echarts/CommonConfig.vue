<script>
  import EChartsThemeEnum from '../../../model/enums/echarts/ThemeEnum'

  export default {
    props: {chartConfig: Object},
    components: {},
    data() {
      return {
        config: this.chartConfig,
        EChartsThemeEnum: EChartsThemeEnum
      }
    },
    computed: {},
    mounted() {},
    activated() {},
    methods: {}
  }
</script>
<template>
  <el-card header="通用配置" :body-style="{minHeight: '400px'}">
    <el-form :model="config" label-position="right" label-width="200px">
      <el-form-item>
        <strong slot="label" class="form-item-label">主题：</strong>
        <el-radio-group v-model="config.themeName">
          <el-radio v-for="(item,index) in EChartsThemeEnum.themeEnumList" :key="index" :label="item.id">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <strong slot="label" class="form-item-label">渲染方式：</strong>
        <el-radio-group v-model="config.initOptions.renderer">
          <el-radio label="canvas">Canvas画布</el-radio>
          <el-radio label="svg">SVG矢量图</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <strong slot="label" class="form-item-label">提示框可见性：</strong>
        <el-radio-group v-model="config.tooltipVisible">
          <el-radio :label="true">显示</el-radio>
          <el-radio :label="false">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <strong slot="label" class="form-item-label">图例可见性：</strong>
        <el-radio-group v-model="config.legendVisible">
          <el-radio :label="true">显示</el-radio>
          <el-radio :label="false">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <strong slot="label" class="form-item-label">延时适应容器空间：</strong>
        <el-input-number v-model="config.resizeDelay" :step="100" :min="50"></el-input-number>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
  .form-item-label{font-weight: bold}
</style>
