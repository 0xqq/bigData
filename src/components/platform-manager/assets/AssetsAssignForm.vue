<script>
  import AssetsAssignPM from "./AssetsAssignPM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    components: { },
    data() {
      this.viewPM = Inject.getClass(AssetsAssignPM) ;
      return {
        viewData: this.viewPM.data,
        page: this.viewPM.pagePM.data,
        rules:{
          tenantId:[{ required: true, message: '租户名称不能为空，请重新输入！', trigger: 'change' } ],
          softId:[{ required: true, message: '软件名称不能为空，请重新输入！', trigger: 'change' }],
          rsName:[{ required: true, message: '数据库名称不能为空，请重新选择！', trigger: 'blur' }]
        },
        itemRules:{
          sourcePartition:[{ required: true, message: '所属分区不能为空，请重新输入！', trigger: 'change' }]
        }
      }
    },
    computed: {},
    mounted() {
      this.viewPM.closeHandler = ()=>{
        this.$refs["formViewRef"].resetFields();
      };
      this.viewPM.popHandler = ()=>{
        this.$refs["formViewRef"].resetFields();
      };
    },
    activated() {

    },
    methods: {
      /**
       * 提交表单
       */
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
  .form{
    flex:none;
    margin-top: 10px;
    width:100%;
    height:130px;
    position:relative;
    overflow: hidden;
    border-radius: 3px;
    background-color: $-layout-bg-color;

    .layout {
      @include abs-group(10px,10px,10px,10px) ;
      padding: 10px;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 5px;
    }
    .footer{
      width:100%;
    }
  }

</style>

<template>
  <div class="form" v-show="viewData.isPopWin">
    <div class="layout">

      <el-form ref="formViewRef"
               :model="viewData.form"
               :rules="rules"
               :status-icon="true"
               label-width="122px"
               label-position="right"
               size="small">

        <tile-group-iwt :column="3">

          <tile-item-iwt>
            <el-form-item   prop="tenantId"
                            label="租户名称：" >
              <el-select  style="width:100%"
                          v-model="viewData.form.tenantId"
                          placeholder="--请选择--" >
                <el-option v-for="item in viewData.nameList"
                           :key="item.tenantID"
                           :label="item.tenantName"
                           :value="item.tenantID" ></el-option>
              </el-select>
            </el-form-item>
          </tile-item-iwt>

          <tile-item-iwt>
            <el-form-item   prop="softId"
                            label="软件名称：" >
              <el-select  style="width:100%"
                          @change="()=>{this.viewPM.changeSoftHandler()}"
                          v-model="viewData.form.softId"
                          placeholder="--请选择--" >
                <el-option v-for="item in viewData.softList"
                           :key="item.id"
                           :label="item.softName"
                           :value="item.id" ></el-option>
              </el-select>
            </el-form-item>
          </tile-item-iwt>

          <tile-item-iwt>
            <el-form-item prop="rsName"
                          label="数据库名/文件根路径"
                          content="Top Left 提示文字"
                          label-width="200px"
                          :error="viewData.formError.rsName"
                          placement="top-start" title="
1.当软件类型为文件系统时，此处应填目录路径；
2.当软件类型为MySQL、KingbaseES等单实例下可建多库的数据库系统时，此处应填数据库名；
3.当软件类型为Oracle这类单实例单库的数据库系统时，此处应填库下一级对象名，如Oracle应填用户名；
4.当软件类型为HBase、MongoDB等非关系型存储引擎时，此处应填其存储单位对象名，如HBase应填表名；" >
              <el-input   placeholder="目录路径/数据库名/用户名/表名"
                          @blur="()=>{this.viewPM.checkSourceName();}"
                          v-model="viewData.form.rsName"></el-input>
            </el-form-item>
          </tile-item-iwt>

          <tile-item-iwt>
            <el-form-item label="所属分区："
                          prop="sourcePartition"
                          :rules="viewData.partitionDis?[]:itemRules.sourcePartition" >
              <el-select  style="width:100%"
                          v-show="viewData.partitionDis?false:true"
                          v-model="viewData.form.sourcePartition"
                          :disabled="viewData.partitionDis"
                          placeholder="--请选择--" >
                <el-option v-for="item in viewData.areaList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" ></el-option>
              </el-select>
              <el-input  :disabled="true"
                         v-show="viewData.partitionDis"
                         :value="'原始区'">
              </el-input>
            </el-form-item>
          </tile-item-iwt>

          <tile-item-iwt>
            <el-form-item prop="desc"
                          label-width="170px"
                          label="数据库/目录描述：" >
              <el-input   placeholder="请输入资源描述"
                          v-model="viewData.form.desc"></el-input>
            </el-form-item>
          </tile-item-iwt>

          <tile-group-iwt >
            <el-form-item>
              <h-group-iwt :hor="'end'" class="footer"  >
                <el-button type="primary"
                           size="mini"
                           @click="submit">保存</el-button>
                <el-button type="warning"
                           size="mini"
                           @click="()=>{this.viewPM.closeWin()}">关闭</el-button>
              </h-group-iwt>
            </el-form-item>
          </tile-group-iwt>

        </tile-group-iwt>
      </el-form>

    </div>
  </div>
</template>
