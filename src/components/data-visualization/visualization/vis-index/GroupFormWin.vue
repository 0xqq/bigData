<script>
  import GroupTreePM from "./GroupTreePM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    data() {
      this.viewPM = Inject.getClass(GroupTreePM);
      return {
        viewData: this.viewPM.data,
        rules:{
          name:[{ required: true, message: '分组名称不能为空，请输入！', trigger: 'blur' }]
        }
      }
    },
    computed: {},
    mounted() {
      this.viewPM.closeHandler = ()=>{
        this.$refs["formViewRef"].resetFields();
      };
    },
    methods: {
      submit(){
        this.$refs["formViewRef"].validate((valid) => {
          if (valid)
            this.viewPM.submit() ;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container{
    @include abs-group();
    .footer{
      width:100%;
    }
  }
</style>

<template>

  <s-window :title="viewData.isPopCreate?'添加分组':'修改分组'"
            @close="()=>{this.viewPM.closeWin()}"
            :visible="viewData.isPopWin"
            :width="'450px'"
            :height="'210px'" >
    <div class="container">
      <el-form ref="formViewRef"
               :model="viewData.form"
               :rules="rules"
               :status-icon="true"
               label-width="100px"
               label-position="right"
               size="small">

        <el-form-item prop="name" label="分组名称：" >
          <el-input   placeholder="请输入名称"
                      v-model="viewData.form.name"></el-input>
        </el-form-item>
        <el-form-item  label="分组描述：" >
          <el-input   placeholder="请输入描述信息"
                      v-model="viewData.form.description"></el-input>
        </el-form-item>

        <h-group-iwt :hor="'center'" class="footer"  >
          <el-button type="primary"
                     @click="submit">确定</el-button>
          <el-button type="danger"
                     @click="()=>{this.viewPM.closeWin()}">取消</el-button>
        </h-group-iwt>
      </el-form>

      <!--loading-->
      <s-loading v-show="viewData.isLoading"></s-loading>
    </div>
  </s-window>
</template>
