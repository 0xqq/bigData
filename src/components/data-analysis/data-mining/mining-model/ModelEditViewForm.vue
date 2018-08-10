<script>
  import ModelEditViewPM from "./ModelEditViewPM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    data() {
      this.viewPM = Inject.getClass(ModelEditViewPM) ;
      return {
        viewData:this.viewPM.data,
        rules:{
          modelExecutorMemory:[{ required: true, message: '请设置Executor内存！(单位是/m或者/g)', trigger: 'blur' } ],
          modelExecutorCores:[{ required: true, message: '请设置Executor内核心！', trigger: 'blur' }],
          modelExecutorNum:[{ required: true, message: '请设置Executor个数！', trigger: 'blur' }],
          modelDriverMemory:[{ required: true, message: '请设置Driver内存！(单位是/m或者/g)', trigger: 'blur' }],
        }
      }
    },
    mounted(){
    },
    methods:{
      submit(){
        this.$refs["ruleForm"].validate((valid) => {
          if (valid)
            this.viewPM.submit() ;
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .container{
    @include abs-group(0,10px,10px,0) ;
    .form{
      @include abs-group(0,0,0,50px) ;
    }
    .footer{
      @include abs-group(0,false,0,0) ;
    }
  }
</style>

<template>

  <s-window @close="()=>{this.viewPM.closeWin()}"
            title="编辑模型"
            :visible="viewData.isPopUpdate"
            :width="'415px'"
            :height="'310px'" >

    <div class="container" >

      <!--search from-->
      <div class="form">
        <el-form ref="ruleForm"
                 size="small"
                 :model="viewData.options"
                 :rules="rules"
                 :status-icon="true"
                 label-width="130px"
                 label-position="right"
                 style="width:100%;"   >

          <el-form-item label="executor内存 :" prop="modelExecutorMemory" class="demo-ruleForm">
            <el-input  v-model="viewData.options.modelExecutorMemory"></el-input>
          </el-form-item>

          <el-form-item label="executor内核心 :" prop="modelExecutorCores" class="demo-ruleForm">
            <el-input-number v-model="viewData.options.modelExecutorCores"
                             controls-position="right"
                             align="left"
                             :min="1"   style="width:100%;text-align: left;" >
            </el-input-number>
          </el-form-item>

          <el-form-item label="executor个数 :" prop="modelExecutorNum" class="demo-ruleForm">
            <el-input-number v-model="viewData.options.modelExecutorNum"
                             align="left"
                             controls-position="right"
                             :min="1"  style="width:100%;text-align: left;">
            </el-input-number>
          </el-form-item>

          <el-form-item label="Driver内存 :" prop="modelDriverMemory" class="demo-ruleForm">
            <el-input v-model="viewData.options.modelDriverMemory"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <h-group-iwt :hor="'center'" class="footer">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button type="warning" @click="()=>{this.viewPM.closeWin()}">取消</el-button>
      </h-group-iwt>

      <!--loading-->
      <s-loading v-show="viewData.isLoading"></s-loading>
    </div>
  </s-window>
</template>


