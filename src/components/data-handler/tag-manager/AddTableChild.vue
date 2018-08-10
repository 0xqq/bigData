<script>
  import qs from "qs"
  import TagManagerAPI from "@/common/service/TagManagerAPI"
  export default {
    data() {
      return {
        panelShow: {
          type: Boolean
        },
//        上传
        dialogVisible: false,
        tit: "",
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          tname: "",
          tdesc: "",
          parent_id: ""
        },
        formLabelWidth: '120px',
        rules: {
          tit: [{required: true, message: '', trigger: 'blur'}],
          tname: [{required: true, message: '名称不能为空，请重新输入！', trigger: 'blur'}],
        }
      }
    },
    methods: {
      submit() {
        this.$refs["formViewRef"].validate((valid) => {
          if (valid)
            this.submitInfo();
        });
      },
      submitInfo() {
        this.dialogFormVisible = false;//让弹出隐藏
        var params = this.form;
        //提交到后端
        TagManagerAPI.saveDataTag(params).then(
          res => {
            this.$emit("click")
            this.form.tname = ""
            this.form.tdesc = ""
          }
        )

      },
      open(val) {
        this.dialogFormVisible = true;
        this.form.parent_id = val.tid;
        this.tit = val.tname
      },

      closeWin() {
        this.$refs["formViewRef"].clearValidate();
        this.dialogFormVisible = false ;
      }
    }
  }
</script>

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
                      title="添加标签"
                      :visible="dialogFormVisible"
                      :width="'450px'"
                      :height="'260px'" >
  <div class="container">
      <el-form :model="form"
               size="small"
               :rules="rules"
               label-width="100px"
               ref="formViewRef">
        <el-form-item prop="tit" label="上级标签" >
          <el-input v-model="tit" :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item prop="tname" label="标签名称"  >
          <el-input v-model="form.tname" auto-complete="off"  ></el-input>
        </el-form-item>
        <el-form-item label="描述" >
          <el-input v-model="form.tdesc" auto-complete="off"  ></el-input>
        </el-form-item>

        <h-group-iwt :hor="'center'" class="footer">
          <el-button type="primary" @click="submitInfo">确 定</el-button>
          <el-button type="danger" @click="closeWin">取 消</el-button>
        </h-group-iwt>
      </el-form>
  </div>
</s-window>
</template>
