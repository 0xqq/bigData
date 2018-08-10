<script>
  import qs from "qs"
  import TagManagerAPI from "@/common/service/TagManagerAPI"
  export default {
    data() {
      return {
          panelShow:{
              type:Boolean
          },
//        上传
        dialogVisible: false,

        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          tname:"",tdesc:"",parent_id:"1"
        },
        formLabelWidth: '120px',
        rules:{
          tname:[{ required: true, message: '名称不能为空，请重新输入！', trigger: 'blur' } ],
        }
      }
    },
    methods: {

      open(){
        this.dialogFormVisible = true;
      },

//      上传
      submitInfo() {
        this.dialogFormVisible = false //让弹出隐藏
        console.log(this.form)//要上传的标签信息
        var params = this.form
        console.log(params)
        console.log(999999)
        //提交到后端
        TagManagerAPI.saveDataTag(params).then(
          res => {
            this.$emit("click");
            this.closeWin() ;
          }
        )

      },
      submit(){
        this.$refs["formViewRef"].validate((valid) => {
          if (valid)
            this.submitInfo() ;
        });
      },

      closeWin() {
        this.$refs["formViewRef"].clearValidate();
        this.form.tname = "";
        this.form.tdesc = "";
        this.dialogFormVisible = false ;
      }
    },

  }
</script >

<style scoped lang="scss">
  .container {
    @include abs-group(0, 10px, 15px, 0) ;
    .footer {
      width: 100%;
    }
  }
</style>
<template>
  <s-window @close="closeWin"
            title="添加一级标签"
            :visible="dialogFormVisible"
            :width="'450px'"
            :height="'210px'" >
    <div class="container">

    <el-form :model="form"
             size="small"
             label-width="100px"
             :rules="rules"
             ref="formViewRef">

      <el-form-item prop="tname" label="标签名称" >
        <el-input v-model="form.tname" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述"  >
        <el-input v-model="form.tdesc" auto-complete="off"></el-input>
      </el-form-item>
      <h-group-iwt :hor="'center'" class="footer">
        <el-button type="primary" @click="submit"  >确 定</el-button>
        <el-button type="danger" @click="dialogFormVisible = false">取 消</el-button>
      </h-group-iwt>
    </el-form>
    </div>
  </s-window>
</template>
