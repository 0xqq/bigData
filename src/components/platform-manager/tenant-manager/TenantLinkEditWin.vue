<script>

  import TenantLinkPM from "./TenantLinkPM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    components:{ },
    data() {
      this.viewPM = Inject.getClass(TenantLinkPM)  ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        rules:{
          // userID:[{ required: true, message: '用户不能为空，请选择！', trigger: 'blur' } ]
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
    .input-box{
      width:100%;
     /* border:1px solid #fffbfb ;
      border-radius: 3px;*/
      height:30px;
      line-height:30px;
      vertical-align: middle;
      span{
        padding-left: 10px;
      }
    }
    .footer{
      width:100%;
    }
  }
</style>

<template>

  <s-window title="更换管理员"
            @close="()=>{this.viewPM.closeWin()}"
            :visible="viewData.isPopUpdate"
            :width="'450px'"
            :height="'260px'" >
    <div class="container">
      <el-form ref="formViewRef"
               :model="viewData.form"
               :rules="rules"
               :status-icon="true"
               label-width="100px"
               label-position="right"
               size="small">

        <el-form-item  label="租户名称：" >
          <div class="input-box"><span>{{viewData.formView.tenantName}}</span></div>
        </el-form-item>
        <el-form-item  label="部门名称：" >
          <div class="input-box"><span>{{viewData.formView.deptName}}</span></div>
        </el-form-item>

        <el-form-item   label="用户名称："
                        prop="userId" >
          <el-select  style="width:100%"
                      v-model="viewData.form.userId"
                      placeholder="--请选择--" >
            <el-option v-for="item in viewData.userList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" ></el-option>
          </el-select>
        </el-form-item>

        <h-group-iwt :hor="'center'" class="footer"  >
          <el-button type="primary"
                     @click="submit">更换</el-button>
          <el-button type="danger"
                     @click="()=>{this.viewPM.closeWin()}">取消</el-button>
        </h-group-iwt>
      </el-form>

      <!--loading-->
      <s-loading v-show="viewData.isLoading"></s-loading>
    </div>
  </s-window>
</template>


