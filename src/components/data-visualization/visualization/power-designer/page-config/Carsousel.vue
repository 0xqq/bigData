<template>
  <el-form :model="config" :inline="false">
    <!-- 仅仅涉及基本样式 -->
    <el-form-item label="页面类型" :label-width="formLabelWidth">
      <el-radio v-model="config.type" label="">常规走马灯</el-radio>
      <el-radio v-model="config.type" label="card">卡片式走马灯</el-radio>
    </el-form-item>
    <el-form-item label="默认展示屏幕" :label-width="formLabelWidth">
      <el-select v-model="config.initialIndex" placeholder="请选择">
        <el-option
          v-for="(item,index) in pagePM.screens"
          :key="item.value"
          :label="item.name"
          :value="index">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="非定向指示器位置" :label-width="formLabelWidth">
      <el-radio v-model="config.indicatorPosition" label="none">不显示</el-radio>
      <el-radio v-model="config.indicatorPosition" label="outside">外部</el-radio>
      <el-radio v-model="config.indicatorPosition" label="inside">内部</el-radio>
    </el-form-item>
    <el-form-item label="非定向指示器触发方式" :label-width="formLabelWidth">
      <el-radio v-model="config.trigger" label="hover">鼠标移入触发</el-radio>
      <el-radio v-model="config.trigger" label="click">鼠标点击触发</el-radio>
    </el-form-item>
    <el-form-item label="定向指示器显示时机" :label-width="formLabelWidth">
      <el-radio v-model="config.arrow" label="never">不显示</el-radio>
      <el-radio v-model="config.arrow" label="hover">鼠标移入时显示</el-radio>
      <el-radio v-model="config.arrow" label="always">始终显示</el-radio>
    </el-form-item>
    <el-form-item label="是否自动切换" :label-width="formLabelWidth">
      <el-radio v-model="config.autoplay" :label="true">是</el-radio>
      <el-radio v-model="config.autoplay" :label="false">否</el-radio>
    </el-form-item>
    <el-form-item label="切换时间间隔(ms）" :label-width="formLabelWidth">
      <el-input-number v-model="config.interval" :step="500" :min="1000" :max="1000000"></el-input-number>
    </el-form-item>
    <el-form-item label=" " :label-width="formLabelWidth">
      <el-button type="info" icon="iconfont tj-icon-backward" @click="pagePM.show = false">取消</el-button>
      <el-button type="primary" icon="iconfont tj-icon-save" @click="save">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

  import Inject from "@/common/model/Inject";
  import Page from "../../model/Page";

  export default {
    data() {
      this.pagePM = Inject.getClass(Page);
      return {
        //这里存在取消和保存，因此此处使用新对象，点击报错，将新值授予，反之不影响操作的
        config: Object.assign({},this.pagePM.config),
        formLabelWidth: '250px'
      }
    },
    computed: {},
    mounted() {},
    activated() {},
    methods: {
      save(){
        this.pagePM.initConfig(this.config);
        this.pagePM.show = false;
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
