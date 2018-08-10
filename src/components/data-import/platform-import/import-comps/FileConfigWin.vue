<script>
  import DataImportAPI from "@/common/service/DataImportAPI";
  import NormalUtils from "@/common/utils/NormalUtils";

  export default {
    data() {
      return {
        dataValue:{},
        isLoading:false,
        isOpen:false,
        timeUnitList:[
          {label:"每月",value:"月"},
          {label:"每周",value:"周"},
          {label:"每日",value:"日"},
          {label:"小时",value:"小时"},
          {label:"30分钟",value:"分钟"},
          {label:"一次性",value:"一次性"}
        ],
        form:{
          id:"",
          beginTime:"",
          timeUnit:"月",
          increFields:[]
        },
        rules:{
          timeUnit:[{ required: true, message: '请设置周期！', trigger: 'blur' } ],
          beginTime:[{ required: true, message: '请设置开始时间！', trigger: 'blur' }]
        }
      }
    },
    mounted(){
    },
    methods: {

      /**
       * 初始化数据
       */
      initDataValue(value) {
        if (value)
          this.dataValue = value;

        Object.assign(this.form, {
          id: "",
          beginTime: "",
          timeUnit: "月",
          increFields: []
        });
        if (this.dataValue)
          NormalUtils.copyObjectAtt(this.dataValue, this.form);
      },

      submit() {
        this.$refs["formViewRef"].validate((valid) => {
          if (!valid)
            return;

          let send = NormalUtils.copyObjectAtt(this.form, {}, true);
          if (typeof send.beginTime !== "string")
            send.beginTime = NormalUtils.dateFormat(send.beginTime, "yyyy-MM-dd hh:mm:ss");

          this.isLoading = true;
          DataImportAPI.saveConfig(send).then(
            (result) => {
              this.isLoading = false;
              this.$message.success("保存成功！");
              this.$emit("submit");
              this.closeWin();
            },
            () => {
              this.isLoading = false;
            }
          );
        });
      },

       open(item) {
        this.initDataValue(item);
        this.isOpen = true;
      },

      /**
       * 配置窗口弹出
       * @param value
       */
      closeWin() {
        this.isOpen = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .control-test{
    position:absolute;
    right:0;
    bottom: 0;
  }
  .control-box {
    width: 100%;
    bottom: 0;
    position: absolute;
  }
  .size{
    height:150px;
  }
  .auto-layout{
    width:100%;
  }

</style>

<template>

  <el-dialog title="配置任务周期"
             :append-to-body="true"
             :modal-append-to-body="true"
             class="big-dialong-size"
             @close="closeWin"
             :visible.sync="isOpen"
             :modal='true'
             :close-on-click-modal='false'>

    <div class="tj-rel-inner tj-popwin-nor size" >
      <div class="tj-abs-inner"  >
        <div class="tj-popwin-body" >

          <!--search from-->
          <el-form ref="formViewRef"
                   size="small"
                   :rules="rules"
                   :status-icon="true"
                   :model="form"
                   label-width="93px"
                   label-position="right">

            <el-form-item label="设置周期:" prop="timeUnit" class="form-item-pad">
              <el-select style="width:100%;"
                         v-model="form.timeUnit"
                         placeholder="--请选择--"    >
                <el-option v-for="(item,index) in timeUnitList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="开始时间:" prop="beginTime" class="form-item-pad">
              <el-date-picker style="width:100%;"
                              v-model="form.beginTime"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>

        <div class="tj-popwin-footer" >
          <h-group-iwt :hor="'center'" class="control-box">
            <el-button type="primary" @click="submit">保存</el-button>
            <el-button type="warning" @click="closeWin">关闭</el-button>
          </h-group-iwt>
        </div>

        <!--loading-->
        <s-loading v-show="isLoading"></s-loading>
      </div>
    </div>
  </el-dialog>
</template>

