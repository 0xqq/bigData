<script>
  import Inject from '@/common/model/Inject'

  import ConfigConstants from '../../../../model/charts/ConfigConstants'
  import ChartEnum from '../../../../model/enums/ChartEnum'

  export default {
    props: {},
    components: {},
    data() {
      //右键选择配置项编辑逻辑处理中获取的与此处获取的属于同一个对象
      this.dynamicChartConfigPM = Inject.getClass(ConfigConstants.chartConfigMap.get(ChartEnum.ECHARTS_LINE.id))
      return {
        config: this.dynamicChartConfigPM,
        data: this.dynamicChartConfigPM.data,
        settings: this.dynamicChartConfigPM.settings,
      }
    },
    computed: {},
    mounted() {},
    activated() {},
    methods: {}
  }
</script>

<template>
  <el-tabs type="border-card">
    <el-tab-pane label="基础配置" class="el-tab-pane">
      <echart-common-config :chartConfig="config"></echart-common-config>
    </el-tab-pane>
    <el-tab-pane label="维度与指标" class="el-tab-pane">
      <echart-dimension-metric :columnsConfig="data.columns" :settingConfig="settings"></echart-dimension-metric>
    </el-tab-pane>
    <el-tab-pane label="坐标轴设置" class="el-tab-pane">
      <!-- 水平方向横轴配置 -->
      <echart-horizontal-x-axis-type :settingConfig="settings"></echart-horizontal-x-axis-type>
      <!-- 垂直方向纵轴数据类型 -->
      <echart-vertical-y-axis-type :settingConfig="settings"></echart-vertical-y-axis-type>
      <!-- 垂直方向纵轴标题 -->
      <echart-vertical-y-axis-name :settingConfig="settings"></echart-vertical-y-axis-name>
      <!-- 坐标轴是否脱离0 -->
      <echart-vertical-scale :settingConfig="settings"></echart-vertical-scale>
      <!-- 坐标轴最大值与最小值 -->
      <echart-vertical-min-max :settingConfig="settings"></echart-vertical-min-max>
      <!-- 左右坐标轴与指标之间的关系 -->
      <echart-horizontal-axis-site :settingsConfig="settings"></echart-horizontal-axis-site>
    </el-tab-pane>
    <el-tab-pane label="面积图选项" class="el-tab-pane">
      <el-card :body-style="{minHeight: '400px'}">
        <div slot="header" class="clearfix">
          <span>堆叠关系构建</span>
          <el-switch style="padding: 3px 0px; float: right;" v-model="settings.area" active-text="开启" inactive-text="关闭"></el-switch>
        </div>
        <keep-alive>
          <echart-stack v-if="settings.area" :settingsConfig="settings"></echart-stack>
        </keep-alive>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="自定义" class="el-tab-pane">
      <echart-json-editor :config="config"></echart-json-editor>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
  .el-tab-pane{
    min-height: 500px;
    .el-row{
      margin-top: 15px;
    }
    .el-col {
      margin-top: 15px;
    }
  }
</style>
