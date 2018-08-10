<script>

  import TenantListAddWinPM from "./TenantListAddWinPM" ;
  import Inject from "@/common/model/Inject" ;
  import PlatformAPI from "@/common/service/PlatformAPI" ;

  export default {
    components:{ },
    data() {
      this.viewPM = Inject.getClass(TenantListAddWinPM)  ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        rules:{
          // tenantId:[{ required: true, message: '租户不能为空，请选择！', trigger: 'blur' } ],
          deptId:[{ required: true, message: '部门不能为空，请选择！', trigger: 'blur' } ]
          // userId:[{ required: true, message: '用户不能为空，请选择！', trigger: 'blur' } ]
        },
        isOpen:false,
        tenantNameAg:'',
        tenantId:''
      }
    },
    created(){
      this.viewPM.closeHandler = ()=>{
        this.$refs["formViewRef"].resetFields();
      };
    },
    methods:{
      open(item){
        this.tenantNameAg = item.tenantName;
        this.tenantId = item.tenantID;

        this.viewPM.initFormData() ;
        //租户关联
        this.viewPM.queryUnLinkTenant() ;
        //部门关联
        this.viewPM.queryUnLinkOrg() ;

        this.isOpen = true;
      },

      submit(){
        this.$refs["formViewRef"].validate((valid) => {
          if (valid){
            //this.viewPM.submit() ;
            PlatformAPI.saveTenantLink({
              deptId: this.viewData.form.deptId,
              tenantId:this.tenantId,
              userId: ""
            }).then(
              (result)=>{
                this.isOpen =false;
                this.$message({
                  message: '关联成功！',
                  type: 'success'
                });
              },
              ()=>{
                this.$message({
                  message: '关联失败！',
                  type: 'warning'
                });
              }
            )
          }
        });
      },
      closeWin(){
        this.isOpen = false;
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
            @close="()=>{this.closeWin()}"
            :visible="isOpen"
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
          <el-input v-model="tenantNameAg" :disabled="true">

          </el-input>
        </el-form-item>

        <el-form-item    label="部门名称："
                         prop="deptId">
          <!--<el-select  style="width:100%"
                      v-model="viewData.form.deptId"
                      @change="viewPM.changeOrgHandler()"
                      placeholder="&#45;&#45;请选择&#45;&#45;" >
            <el-option v-for="item in viewData.orgList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" ></el-option>
          </el-select>-->
          <s-org-select v-model="viewData.form.deptId"
                        :show-all="'--请选择--'">
          </s-org-select>
        </el-form-item>


        <h-group-iwt :hor="'center'" class="footer"  >
          <el-button type="primary"
                     @click="submit">关联</el-button>
          <el-button type="danger"
                     @click="closeWin">取消</el-button>
        </h-group-iwt>

      </el-form>

      <!--loading-->
      <s-loading v-show="viewData.isLoading"></s-loading>
    </div>
  </s-window>
</template>


