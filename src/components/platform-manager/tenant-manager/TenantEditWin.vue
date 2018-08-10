<script>

  import TenantMangerPM from "./TenantMangerPM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    components:{ },
    data() {
      this.viewPM = Inject.getClass(TenantMangerPM)  ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        rules:{
          tenantName:[{ required: true, message: '租户名称不能为空，请重新输入！', trigger: 'blur' } ],
          typeId:[{ required: true, message: '类型不能为空，请重新输入！', trigger: 'blur' }],
          levelId:[{ required: true, message: '级别不能为空，请重新输入！', trigger: 'blur' }]
        }
      }
    },
    created(){
      this.viewPM.closeHandler = ()=>{
        this.$refs["formViewRef"].resetFields();
      };
    },
    methods:{
      submit(){
        this.$refs["formViewRef"].validate((valid) => {
          if (valid)
            this.viewPM.submit() ;
        });
      }

    }
  }
</script>

<style scoped lang="scss">
  .container{
    @include abs-group(0,10px,15px,0) ;
    .footer{
      width:100%;
    }
  }
</style>

<template>

  <s-window :title="viewData.isPopCreate?'新增租户':'修改租户'"
             @close="()=>{this.viewPM.closeWin()}"
             :visible="viewData.isPopWin"
            :width="'450px'"
            :height="'350px'" >
    <div class="container">

          <el-form ref="formViewRef"
                   :model="viewData.form"
                   :rules="rules"
                   :status-icon="true"
                   label-width="100px"
                   label-position="right"
                   size="small">

            <el-form-item   prop="tenantName"
                            label="租户名称："
                            :error="viewData.formError.tenantName" >
              <el-input   placeholder=""
                          @blur="()=>{this.viewPM.checkUser();}"
                          v-model="viewData.form.tenantName"></el-input>
            </el-form-item>
            <el-form-item    label="类型：" >
              <el-select  style="width:100%"
                          v-model="viewData.form.typeId"
                          placeholder="--请选择--" >
                <el-option v-for="item in viewData.typeList"
                           :key="item.key"
                           :label="item.value"
                           :value="item.key" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  :disabled="true"  label="级别："  >
              <el-select  style="width:100%"
                          v-model="viewData.form.rankId"
                          placeholder="--请选择--" >
                <el-option v-for="item in viewData.levelList"
                           :key="item.key"
                           :label="item.value"
                           :value="item.key" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item   prop="desc"  label="描述：" >
              <el-input  type="textarea"
                         resize="none"
                         :rows="3"
                         :autosize="false"
                         v-model="viewData.form.desc"></el-input>
            </el-form-item>

            <h-group-iwt :hor="'center'" class="footer"  >
              <el-button type="primary"
                         @click="submit">保存</el-button>
              <el-button type="warning"
                         @click="()=>{this.viewPM.closeWin()}">关闭</el-button>
            </h-group-iwt>

          </el-form>

        <!--loading-->
        <s-loading v-show="viewData.isLoading"></s-loading>
    </div>
  </s-window>
</template>


