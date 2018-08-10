<script>
  import Inject from "@/common/model/Inject";
  import EventDispatcher from "@/common/event/EventDispatcher";
  import EventList from "@/common/event/EventList";

  import Container from '../../model/Container';

  export default {
    data() {
      this.containerPM = Inject.getClass(Container);
      return {
        container: this.containerPM,
        formLabelWidth: '120px'
      }
    },
    computed: {},
    mounted() {},
    activated() {},
    methods: {
      save(){
        EventDispatcher.disEvent(EventList.EDIT_CONTAINER_BASE_INFO);
      },
      removeListeners(){
        EventDispatcher.removeListener(EventList.EDIT_CONTAINER_BASE_INFO);
      }
    }
  }
</script>

<template>
  <el-dialog @close="removeListeners" title="容器基本属性编辑" center width="40%" :visible.sync="container.show" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
     <el-form :model="container" :inline="false">
      <!-- 仅仅涉及基本样式 -->
      <el-form-item label="高度(px)" :label-width="formLabelWidth">
        <el-input v-model="container.style.height" placeholder="请输入高度(px)"></el-input>
      </el-form-item>
      <el-form-item label="宽度(px)" :label-width="formLabelWidth">
        <el-input v-model="container.style.width" placeholder="请输入宽度(px)"></el-input>
      </el-form-item>
      <el-form-item label="左内边距(px)" :label-width="formLabelWidth">
        <el-input v-model="container.style.paddingLeft" placeholder="请输入左内边距(px)"></el-input>
      </el-form-item>
      <el-form-item label="右内边距(px)" :label-width="formLabelWidth">
        <el-input v-model="container.style.paddingRight" placeholder="请输入右内边距(px)"></el-input>
      </el-form-item>
      <el-form-item label="上内边距(px)" :label-width="formLabelWidth">
        <el-input v-model="container.style.paddingTop" placeholder="请输入上内边距(px)"></el-input>
      </el-form-item>
      <el-form-item label="下内边距(px)" :label-width="formLabelWidth">
        <el-input v-model="container.style.paddingBottom" placeholder="请输入下内边距(px)"></el-input>
      </el-form-item>
      <el-form-item label="水平方向浮动" :label-width="formLabelWidth">
        <el-radio v-model="container.style.float" label="">不浮动</el-radio>
        <el-radio v-model="container.style.float" label="left">向左浮动</el-radio>
        <el-radio v-model="container.style.float" label="right">向右浮动</el-radio>
      </el-form-item>
      <el-form-item label=" " :label-width="formLabelWidth">
        <el-button type="info" icon="iconfont tj-icon-backward" @click="container.show = false">取消</el-button>
        <el-button type="primary" icon="iconfont tj-icon-save" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
