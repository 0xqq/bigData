<script>
  import TaskConfigPM from "./TaskConfigPM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    data() {
      this.viewPM = Inject.getClass(TaskConfigPM) ;
      return {
        viewData:this.viewPM.data,
        rules:{
          timeUnit:[{ required: true, message: '请设置周期！', trigger: 'blur' } ],
          beginTime:[{ required: true, message: '请设置开始时间！', trigger: 'blur' }]
        }
      }
    },
    mounted(){
    },
    methods:{

      /**
       * 初始化数据
       */
      initDataValue(value){

      },



      submit(){
        this.$refs["formViewRef"].validate((valid) => {
          if (!valid)
            return ;
          this.viewPM.submit() ;
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .container{
    @include abs-group(0,10px,10px,0) ;
    .form{
      @include abs-group(0,0,0,50px) ;
    }
    .footer{
      @include abs-group(0,false,0,0) ;
    }
  }
  .form-item-pad2{
    margin-bottom:5px;
  }
</style>

<template>

  <s-window @close="()=>{this.viewPM.closeWin()}"
            title="设置周期"
            :visible="viewData.isPopWin"
            :width="'415px'"
            :height="'230px'" >

    <div class="container" >

          <!--search from-->
       <div class="form">
       <el-form ref="formViewRef"
                   size="small"
                   :rules="rules"
                   :status-icon="true"
                   :model="viewData.form"
                   label-width="93px"
                   label-position="right"
                   style="width:100%;"   >

            <el-form-item label="设置周期:" prop="timeUnit" class="form-item-pad">
              <el-select style="width:100%;"
                         v-model="viewData.form.timeUnit"
                         placeholder="--请选择--"    >
                <el-option v-for="(item,index) in viewData.timeUnitList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="开始时间:" prop="startTime" class="form-item-pad2">
              <el-date-picker style="width:100%;"
                              v-model="viewData.form.startTime"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>

           <!--<el-form-item label=""  class="form-item-pad">-->
              <!--<el-checkbox>立即执行</el-checkbox>-->
           <!--</el-form-item>-->

          </el-form>
       </div>

      <h-group-iwt :hor="'center'" class="footer">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button type="warning" @click="()=>{this.viewPM.closeWin()}">关闭</el-button>
      </h-group-iwt>

        <!--loading-->
        <s-loading v-show="viewData.isLoading"></s-loading>
    </div>
  </s-window>
</template>

