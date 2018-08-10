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
          tenantId:[{ required: true, message: '租户不能为空，请选择！', trigger: 'blur' } ],
          deptId:[{ required: true, message: '部门不能为空，请选择！', trigger: 'blur' } ]
          // userId:[{ required: true, message: '用户不能为空，请选择！', trigger: 'blur' } ]
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

  <s-window title="添加关联"
            @close="()=>{this.viewPM.closeWin()}"
            :visible="viewData.isPopWin"
            :width="'450px'"
            :height="'230px'" >
    <div class="container">

      <el-form ref="formViewRef"
               :model="viewData.form"
               :rules="rules"
               :status-icon="true"
               label-width="100px"
               label-position="right"
               size="small">

        <el-form-item   prop="tenantId"
                        label="租户名称：">
          <el-select  style="width:100%"
                      v-model="viewData.form.tenantId"
                      placeholder="--请选择--" >
            <el-option v-for="item in viewData.tanentList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item    label="部门名称："
                         prop="deptId">
          <el-select  style="width:100%"
                      v-model="viewData.form.deptId"
                      @change="viewPM.changeOrgHandler()"
                      placeholder="--请选择--" >
            <el-option v-for="item in viewData.orgList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" ></el-option>
          </el-select>
        </el-form-item>

        <!--<el-form-item   label="用户名称："-->
                        <!--prop="userId" >-->
          <!--<el-select  style="width:100%"-->
                      <!--v-model="viewData.form.userId"-->
                      <!--placeholder="&#45;&#45;请选择&#45;&#45;" >-->
            <!--<el-option v-for="item in viewData.userList"-->
                       <!--:key="item.id"-->
                       <!--:label="item.name"-->
                       <!--:value="item.id" ></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->

        <h-group-iwt :hor="'center'" class="footer"  >
          <el-button type="primary"
                     @click="submit">关联</el-button>
          <el-button type="danger"
                     @click="()=>{this.viewPM.closeWin()}">取消</el-button>
        </h-group-iwt>

      </el-form>

      <!--loading-->
      <s-loading v-show="viewData.isLoading"></s-loading>
    </div>
  </s-window>
</template>


