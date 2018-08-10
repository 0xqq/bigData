<script>

  import ConfigMagerPM from "../ConfigMagerPM" ;
  import Inject from "@/common/model/Inject" ;
  import ModelLocator from "@/common/model/ModelLocator" ;

  export default {
    components:{ },
    data() {
      this.viewPM = Inject.getClass(ConfigMagerPM)  ;
      return {
        viewData:this.viewPM.data,
        user:ModelLocator.getInstance().loginUser,
        rules:{
          dataSourceName:[{ required: true, message: '数据源名称不能为空，请重新输入！', trigger: 'blur' } ],
          orgId:[{ required: true, message: '部门名称不能为空，请重新输入！', trigger: 'blur' }],
          resourceStyle:[{ required: true, message: '数据源类别不能为空，请重新输入！', trigger: 'blur' } ],
          hostAddress:[{ required: true, message: '主机地址不能为空，请重新输入！', trigger: 'blur' }  ]
        },
        itemRules:{
          foldPath:[{ required: true, message: '文件目录不能为空，请重新输入！', trigger: 'blur' }],
          // fileStyle:[{ required: true, message: '类型不能为空，请重新输入！', trigger: 'blur' } ],
          dbStyle:[{ required: true, message: '类型不能为空，请重新输入！', trigger: 'blur' }  ],
          hostPort:[{ required: true, message: '主机端口不能为空，请重新输入！', trigger: 'blur' }  ],
          dbUsername:[{ required: true, message: '用户名不能为空，请重新输入！', trigger: 'blur' } ],//
          dbPassword:[{ required: true, message: '密码不能为空，请重新输入！', trigger: 'blur' } ],//
          dataInstance:[{ required: true, message: '数据库实例不能为空，请重新输入！', trigger: 'blur' } ]
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
      },
      testConnection(){
        this.$refs["formViewRef"].validate((valid) => {
          if (valid)
            this.viewPM.testConnection() ;
        });
      },
      changeType(){
        this.viewData.form.dbStyle = "" ;
        this.$refs["formViewRef"].clearValidate();
      }

    }
  }
</script>

<style scoped lang="scss">
  .container {
    @include abs-group(0, 0, 10px, 0) ;
    .form-content {
      @include abs-group(0, 0, 0, 50px) ;
    }
    .footer {
      @include abs-group(0, false, 0, 0) ;
      height: 50px;

      .control-box{
        @include abs-group() ;
      }
      .control-test{
        @include abs-group(false) ;
      }
    }
  }
</style>

<template>

  <s-window :title="'数据源管理-'+viewData.isPopCreate?'新增':'修改'"
             @close="()=>{this.viewPM.closeWin()}"
             :visible="viewData.isPopWin"
            :width="'640px'"
            :height="user.isAdmin?'520px':'490px'">

  <div class="container" >

      <div class="form-content" >
          <el-form ref="formViewRef"
                   :model="viewData.form"
                   :rules="rules"
                   :status-icon="true"
                   label-width="120px"
                   label-position="right"
                   size="mini">

            <el-form-item   prop="dataSourceName"  label="数据源名称：" style="margin-bottom:15px;">
                <el-input   placeholder=""  v-model="viewData.form.dataSourceName"></el-input>
            </el-form-item>

            <el-form-item   prop="orgId" label="部门名称："
                            v-if="user.isAdmin"  >
              <s-org-select v-model="viewData.form.orgId"
                            :org-name="viewData.form.orgName">
              </s-org-select>
            </el-form-item>

            <el-form-item  prop="resourceStyle" label="数据源类别："style="margin-bottom:15px;">
                <el-select  style="width:100%"
                            @change="changeType"
                            v-model="viewData.form.resourceStyle"
                            placeholder="--请选择--" >
                  <el-option v-for="item in viewData.sourceFenList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>

            <!--文件类型表单-->
            <!--<el-form-item v-show="viewData.form.resourceStyle==='file'"-->
                          <!--:rules="viewData.form.resourceStyle==='file'?itemRules.fileStyle:[]"-->
                          <!--prop="fileStyle"-->
                          <!--label="文件类型："-->
                          <!--style="margin-bottom:15px;">-->
              <!--<el-select style="width:100%"  v-model="viewData.form.fileStyle"-->
                         <!--placeholder="&#45;&#45;请选择&#45;&#45;" >-->
                <!--<el-option v-for="item in viewData.fileTypeList"-->
                           <!--:key="item.value"-->
                           <!--:label="item.label"-->
                           <!--:disabled="item.disabled"-->
                           <!--:value="item.value"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->

            <!--数据库类型表单-->
            <el-form-item  v-show="viewData.form.resourceStyle==='database'"
                           :rules="viewData.form.resourceStyle==='database'?itemRules.dbStyle:[]"
                          prop="dbStyle"
                          label="数据库类型："
                           style="margin-bottom:15px;">
              <el-select style="width:100%"
                         v-model="viewData.form.dbStyle"
                         placeholder="--请选择--" >
                <el-option v-for="item in viewData.sourceTypeList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <!--NoSql类型-->
            <el-form-item  v-show="viewData.form.resourceStyle==='nosql'"
                           :rules="viewData.form.resourceStyle==='nosql'?itemRules.dbStyle:[]"
                           prop="dbStyle"
                           label="数据库类型："
                           style="margin-bottom:15px;">
              <el-select style="width:100%"
                         v-model="viewData.form.dbStyle"
                         placeholder="--请选择--" >
                <el-option v-for="item in viewData.nosqlTypeList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item  prop="hostAddress"
                           label="主机地址："
                           style="margin-bottom:15px;">
              <el-input placeholder=""
                        v-model="viewData.form.hostAddress"></el-input>
            </el-form-item>

            <el-form-item  v-show="viewData.form.resourceStyle==='file'"
                           :rules="viewData.form.resourceStyle==='file'?itemRules.foldPath:[]"
                           prop="foldPath"
                           label="文件目录："
                           style="margin-bottom:15px;">
              <el-input placeholder=""
                        v-model="viewData.form.foldPath"></el-input>
            </el-form-item>

            <el-form-item prop="hostPort"
                          label="主机端口："
                          :rules="viewData.form.resourceStyle!=='file'?itemRules.hostPort:[]"
                          style="margin-bottom:15px;">
              <el-input placeholder=""
                        :disabled="viewData.form.resourceStyle==='file' "
                        v-model="viewData.form.hostPort"></el-input>
            </el-form-item>


            <el-form-item :rules="viewData.form.resourceStyle!=='file'?itemRules.dbUsername:[]"
                           label="用户名："
                           prop="dbUsername"
                           style="margin-bottom:15px;">
              <el-input :disabled="viewData.form.resourceStyle==='file'"  placeholder="最多输入255字符"
                        v-model="viewData.form.dbUsername"></el-input>
            </el-form-item>

            <el-form-item label="密码："
                          :rules="viewData.form.resourceStyle!=='file'?itemRules.dbPassword:[]"
                          prop="dbPassword"
                          style="margin-bottom:15px;">
              <el-input  :disabled="viewData.form.resourceStyle==='file'"
                         placeholder=""
                          v-model="viewData.form.dbPassword"></el-input>
            </el-form-item>

            <el-form-item  :rules="viewData.form.resourceStyle!=='file'?itemRules.dataInstance:[]"
                           prop="dataInstance"
                           label="数据库实例："
                           style="margin-bottom:15px;">
              <el-input  :disabled="viewData.form.resourceStyle==='file'"
                         v-model="viewData.form.dataInstance"></el-input>
            </el-form-item>

          </el-form>
      </div>

      <div class="footer" >
        <h-group-iwt :hor="'center'" class="control-box">
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="warning" @click="()=>{this.viewPM.closeWin()}">关闭</el-button>
        </h-group-iwt>
        <div class="control-test">
          <el-button type="primary"
                     :disabled="viewData.form.resourceStyle ==='file'"
                     @click="testConnection">测试连接</el-button>
          <!--:disabled="viewData.form.resourceStyle!=='database'"-->
        </div>
      </div>

      <!--loading-->
      <s-loading v-show="viewData.isLoading"></s-loading>
  </div>
    </s-window>
</template>


