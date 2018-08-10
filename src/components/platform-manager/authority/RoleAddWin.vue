<script>

  import RoleManagerPM from "./RoleManagerPM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    components:{ },
    data() {
      this.viewPM = Inject.getClass(RoleManagerPM)  ;
      return {
        viewData:this.viewPM.data,
        rules:{
          roleName:[{ required: true, message: '角色名称不能为空，请重新输入！', trigger: 'blur' } ],
        }
      }
    },
    created(){

    },
    methods:{
      submit(){
        this.$refs["formViewRef"].validate((valid) => {
          if (valid)
            this.viewPM.submit() ;
        });
      },
      close(){
        if( this.$refs["formViewRef"])
          this.$refs["formViewRef"].clearValidate();
        this.viewPM.closeWin() ;
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

  <s-window :title="viewData.isPopCreate?'添加角色':'修改角色'"
            @close="()=>{this.close()}"
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

        <el-form-item   prop="roleName"
                        label="角色名称：">
              <el-input placeholder="请输入角色名称"
                        v-model="viewData.form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：">
          <el-input type="textarea"
                    resize="none"
                    placeholder=""
                    v-model="viewData.form.description"></el-input>
        </el-form-item>

        <h-group-iwt :hor="'center'" class="footer"  >
          <el-button type="primary"
                     @click="submit">确定</el-button>
          <el-button type="danger"
                     @click="()=>{this.close()}">取消</el-button>
        </h-group-iwt>

      </el-form>

      <!--loading-->
      <s-loading v-show="viewData.isLoading"></s-loading>
    </div>
  </s-window>
</template>
