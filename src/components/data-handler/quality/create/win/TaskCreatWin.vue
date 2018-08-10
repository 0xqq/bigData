<script>
  import TaskCreatePM from "../../TaskCreatePM" ;
  import Inject from "@/common/model/Inject" ;

  let viewPM = Inject.getClass(TaskCreatePM)  ;
  export default {
    components:{ },
    data() {
      return {
        viewData:viewPM.data,
        rules:{
          name:[{ required: true, message: '名称不能为空，请重新输入！', trigger: 'blur' }]
        }
      }
    },
    created(){
      this.viewPM = viewPM;
      this.viewPM.closeHandler = ()=>{
      };
      this.viewPM.resetHandler = ()=>{

      };
    },
    methods:{


      submit(){
        this.$refs["formViewRef"].validate((valid) => {
          if (valid)
            this.viewPM.submit() ;
        });
      },
      close(){
        if(this.$refs["formViewRef"])
          this.$refs["formViewRef"].clearValidate() ;
        this.viewPM.closeWin();
      }
    }
  }
</script>

<template>

  <el-dialog :title="viewData.isPopCreate?'添加任务':'修改任务基本信息'"
             :append-to-body="true"
             :modal-append-to-body="true"
             class="big-dialong-size"
             @close="()=>{this.close()}"
             :visible.sync="viewData.isPopWin"
             :modal='true'
             :close-on-click-modal='true'>

    <div class="rel-inner" style="height:180px;width:100%;" >
      <div class="abs-inner"  >

        <div class="win-body" >
          <el-form ref="formViewRef"
                   :model="viewData.form"
                   :rules="rules"
                   :status-icon="true"
                   label-width="120px"
                   label-position="right"
                   size="small">

            <el-form-item required prop="name" label="任务名称：" style="margin-bottom:15px;">
              <el-input   placeholder="最多输入100字符"
                          v-model="viewData.form.name"  ></el-input>
            </el-form-item>
            <el-form-item prop="description" label="任务描述：" style="margin-bottom:15px;">
              <el-input  type="textarea"
                         :rows="3"
                         v-model="viewData.form.description"
                         resize="none"
                         placeholder="最多输入500字符"   ></el-input>
            </el-form-item>

          </el-form>
        </div>
        <div class="win-footer" >
          <h-group-iwt :hor="'center'"  style="width:100%;bottom:0;position:absolute;">
            <el-button type="primary" @click="submit">保存</el-button>
            <el-button type="warning" @click="()=>{this.close();}">关闭</el-button>
          </h-group-iwt>
        </div>

        <s-loading v-show="viewData.isLoading"></s-loading>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>

  .win-body {
    top: 0px;
    bottom: 10px;
    left: 20px;
    right: 50px;
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
  }

  .win-footer {
    bottom: -10px;
    height: 30px;
    left: 0;
    right: 0;
    position: absolute;
  }


  .rel-inner {
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }

  .abs-inner {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }

</style>
