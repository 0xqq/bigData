<script>
  import ModelTaskListPM from "./ModelTaskListPM" ;
  import Inject from "@/common/model/Inject" ;
  import NormalUtils from "@/common/utils/NormalUtils";
  import PathConst from "@/router/PathConst";
  import AnalysisAPI from "@/common/service/AnalysisAPI";

  export default {
    data() {
      this.viewPM = Inject.getClass(ModelTaskListPM) ;
      // console.log(this.viewPM);aa
      return {
        viewData:this.viewPM.data,
        ruleForm:{
          name:'',
          description:'',
          project:'',
          region:''
        },
        rules:{
          name:[{ required: true, message: '请设置模型名称！', trigger: 'blur' } ],
          region:[{ required: true, message: '请设置模型分析类型！', trigger: 'blur' } ],
          description:[{ required: false, message: '请设置模型描述！', trigger: 'blur' }]

        },
        modelTypeValue:''
      }
    },
    mounted(){
    },
    methods:{

      /**
       * 初始化数据
       */
      initDataValue(value){

      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            AnalysisAPI.saveTaskData({
              modelName:this.ruleForm.name,//任务名称
              modelProject:'',//所属项目
              modelDesc:this.ruleForm.description,//描述
              modelDeptId: '',//用户Id
              modelUserName: "",//用户名称
              modelType:this.ruleForm.region //模型类型
            }).then(
              (result)=>{
                // console.log(result);
                //NormalUtils.changeRouter(PathConst.DA_MINING_MODEL,{id:item.id,name:item.name}) ;
                this.$emit('hidden');
                this.viewPM.queryList();
                this.$refs[formName].resetFields();
              },
              ()=>{

              }
            )
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      closeWindow(){
        this.$emit('hidden');
      },

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

  <s-window @close="()=>{this.$emit('hidden')}"
            title="添加模型"
            :visible="viewData.isPopWin"
            :width="'415px'"
            :height="'315px'" >

    <div class="container" >

      <!--search from-->
      <div class="form">
        <el-form ref="ruleForm"
                 size="small"
                 :model="ruleForm"
                 :rules="rules"
                 :status-icon="true"
                 label-width="93px"
                 label-position="right"
                 style="width:100%;"   >

          <el-form-item label="模型名称:" prop="name" class="demo-ruleForm">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="分析类型:" prop="region" class="demo-ruleForm">
            <el-select style="width:100%;"
                       v-model="ruleForm.region"
                       placeholder="--请选择--"    >
              <el-option label="数据库类型" value="0"></el-option>
              <el-option label="文件类型" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="模型描述:" prop="description"  class="demo-ruleForm">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>

          <el-form-item label="所属项目:" prop="project" class="demo-ruleForm">
            <el-select disabled
                       style="width:100%;"
                       v-model="viewData.form.project"
                       placeholder="--请选择--"    >
              <el-option v-for="(item,index) in viewData.timeUnitList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>


        </el-form>
      </div>

      <h-group-iwt :hor="'center'" class="footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button type="warning" @click="closeWindow">取消</el-button>
      </h-group-iwt>

      <!--loading-->
      <s-loading v-show="viewData.isLoading"></s-loading>
    </div>
  </s-window>
</template>

