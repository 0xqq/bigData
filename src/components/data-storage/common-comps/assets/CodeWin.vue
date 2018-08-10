<script>
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;
  import PlatformAPI from "@/common/service/PlatformAPI" ;
  import FormPopWin from "@/common/comps/normal/FormPopWin"
  import NormalUtils from "../../../../common/utils/NormalUtils";

  export default {
    mixins:[FormPopWin],
    data() {
      return {
        form:{
          id:"",
          resourceCode:""
        },
        rules:{
          resourceCode:[{ required: true, message: '编码不能为空，请重新输入！', trigger: 'blur' }],
        }

      }
    },
    mounted() {
    },
    activated() {
    },
    methods: {
      /**
       * 初始化授权表单
       */
      initAuthorForm(){
        this.form.id = "" ;
        this.form.resourceCode = "" ;
      },

      /**
       * 弹出授权窗口
       */
      doOpen(value,options){
        this.initAuthorForm() ;
        this.form.id = value.id ;
        this.queryCodeData() ;
        this.$refs["formViewRef"].clearValidate();
      },

      /**
       * 查询已经授权
       */
      queryCodeData(){
        this.query({id:this.form.id}, (result) => {
          this.form.resourceCode = result.data.resourceCode;
        }, null, DataStorageAPI.queryCodeData);
      },

      /**
       * 提交授权表单
       */
      submit() {
        this.$refs["formViewRef"].validate((valid) => {
          if (!valid)
            return ;

          this.query(this.form, (result) => {
             this.popMessage("保存成功！") ;
              this.closeWin() ;
          }, null, DataStorageAPI.saveCodeData);
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .autohr-container {
    @include abs-group();

    .layout {
      @include abs-group(5px, 5px, 5px, 0) ;
    }
    .form-container{
      width:100%;
      flex:none;
    }
    .footer{
      width:100%;
    }
  }
</style>

<template>
  <s-window @close="closeWin"
            title="设置资源编码"
            :visible="isPopWin"
            :width="'420px'"
            :height="'160px'" >

    <div class="autohr-container">
      <v-group-iwt class="layout">

        <div class="form-container">
          <el-form ref="formViewRef"
                   :model="form"
                   :rules="rules"
                   :status-icon="true"
                   label-width="120px"
                   label-position="right"
                   size="mini">

            <el-form-item   prop="resourceCode"  label="资源编码：" style="margin-bottom:15px;">
              <el-input   placeholder="请输入编码"  v-model="form.resourceCode"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <h-group-iwt :hor="'center'" class="footer">
          <el-button type="primary"
                     @click="()=>{this.submit()}">保存</el-button>
          <el-button type="warning"
                     @click="()=>{this.closeWin()}">关闭</el-button>
        </h-group-iwt>

      </v-group-iwt>
    </div>
     <s-loading v-show="isLoading"></s-loading>
  </s-window>
</template>
