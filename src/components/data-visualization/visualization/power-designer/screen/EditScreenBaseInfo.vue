
<script>
  import Inject from "@/common/model/Inject";
  import EventDispatcher from "@/common/event/EventDispatcher";
  import EventList from "@/common/event/EventList";
  import VisualizationAPI from "@/common/service/VisualizationAPI";
  import Screen from '../../model/Screen';

  export default {

    data() {
      this.screenPM = Inject.getClass(Screen);
      return {
        screen: Inject.getClass(Screen),
        formLabelWidth: '150px',
        img: {
          upload: VisualizationAPI.getUploadBackgroundImgUrl(),
          fileList: []
        }
      }
    },
    computed: {},
    mounted() {},
    activated() {},
    methods: {
      save(){
        EventDispatcher.disEvent(EventList.CHANGE_SCREEN_BASE_INFO,this.screen);
      },
      openDialog(){
        let length = this.img.fileList.length;
        for(let i=0; i<length; i++){
          this.img.fileList.pop();
        }
        if(this.screen.style.backgroundImage != null){
          this.img.fileList.push({name: 'history', url:this.screen.style.backgroundImage});
        }
      },
      uploadSuccess(result, file, fileList){
        if(result.code !== 1){
          fileList.pop();
          this.$message.warning('文件上传失败');
        }else{
          this.screen.style.backgroundImage = "url("+VisualizationAPI.createServerUrl(result.data.imgUrl)+")";
        }
      },
      uploadExceed(files, fileList) {
        this.$message.warning('已上传一个背景图片，重新上传前，请删除该文件');
      },
      /**
       * 关闭后移除事件
       */
      removeListeners(){
        EventDispatcher.removeListener(EventList.CHANGE_SCREEN_BASE_INFO);
      }
    }
  }
</script>
<template>
  <el-dialog @open="openDialog" title="屏幕属性编辑" @close="removeListeners" center width="40%" :visible.sync="screen.show" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="screen" :inline="true">
      <!-- 仅仅涉及基本属性 -->
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="screen.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <!-- 仅仅涉及基本样式 -->
      <el-form-item label="屏幕高度(px)" :label-width="formLabelWidth">
        <el-input v-model="screen.style.height" placeholder="请输入屏幕高度(px)"></el-input>
      </el-form-item>
      <el-form-item label="屏幕宽度(px)" :label-width="formLabelWidth">
        <el-input v-model="screen.style.width" placeholder="请输入屏幕宽度(px)"></el-input>
      </el-form-item>
      <el-form-item label="左内边距(px)" :label-width="formLabelWidth">
        <el-input v-model="screen.style.paddingLeft" placeholder="请输入左内边距(px)"></el-input>
      </el-form-item>
      <el-form-item label="右内边距(px)" :label-width="formLabelWidth">
        <el-input v-model="screen.style.paddingRight" placeholder="请输入右内边距(px)"></el-input>
      </el-form-item>
      <el-form-item label="上内边距(px)" :label-width="formLabelWidth">
        <el-input v-model="screen.style.paddingTop" placeholder="请输入上内边距(px)"></el-input>
      </el-form-item>
      <el-form-item label="下内边距(px)" :label-width="formLabelWidth">
        <el-input v-model="screen.style.paddingBottom" placeholder="请输入下内边距(px)"></el-input>
      </el-form-item>
      <el-form-item label="背景图片(jpg/png)" :label-width="formLabelWidth">
        <el-upload
          class="upload-demo"
          :action="img.upload"
          name="imgFile"
          :on-success="uploadSuccess"
          :on-exceed="uploadExceed"
          :limit="1"
          :file-list="img.fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label=" " :label-width="formLabelWidth">
        <el-button type="info" icon="iconfont tj-icon-backward" @click="screen.show = false">取消</el-button>
        <el-button type="primary" icon="iconfont tj-icon-save" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="scss">
</style>
