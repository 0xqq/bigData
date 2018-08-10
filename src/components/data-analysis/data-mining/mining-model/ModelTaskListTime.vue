<script>
  import AnalysisAPI from "@/common/service/AnalysisAPI";
  import NormalUtils from "@/common/utils/NormalUtils";
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;
  import ModelTaskListPM from "./ModelTaskListPM" ;
  import Inject from "@/common/model/Inject" ;
  import AuthManager from "@/common/manager/AuthManager" ;

  export default {
    data() {
      this.viewPM = Inject.getClass(ModelTaskListPM);
      return {
        auth:AuthManager.has,
        dataValue:{},
        isLoading:false,
        isOpen:false,
        timeUnitList:[
          {label:"每月",value:"月"},
          {label:"每周",value:"周"},
          {label:"每日",value:"日"},
          {label:"小时",value:"小时"},
          {label:"30分钟",value:"分钟"},
          {label:"一次性",value:"一次性"},
          /*{label:"持续执行",value:"持续执行"}*/
        ],
        addField:[
          {label:"age",value:"age"},
          {label:"id",value:"id"},
          {label:"words",value:"words"},
          {label:"name",value:"name"},
          {label:"height",value:"height"}
        ],
        form:{
          id: '',    //传的ID
          syncModelId:"",  //modelId
          syncPeriod:"1",    //时间间隔
          syncTimeUnit:"月",  //时间单位
          syncBeginTime:"",   //开始时间
          syncIncreField:""   //增量字段
        },
        rules:{
          syncTimeUnit:[{ required: true, message: '请设置周期！', trigger: 'blur' } ],
          syncBeginTime:[{ required: true, message: '请设置开始时间！', trigger: 'blur' }],
          syncIncreField:[{ required: true, message: '请设置增量字段！', trigger: 'blur' }],
        },
        publicId:''
      }
    },
    mounted(){

    },
    methods: {
      open(item) {
        this.initDataValue(item);
        this.forField(item);
        this.isOpen = true;
        AnalysisAPI.publishModelId({
          syncModelId:item.id
        }).then(
          (result) => {
            // console.log(result.data.id);
            let pubId = result.data.id;
            this.publicId = pubId;
          },
          () => {
            this.isLoading = false;
          }
        );
      },
      //获得  增量字段
      forField(item){
        DataStorageAPI.queryTableFields({
          dataResourceId:item.id
        }).then(
          (result)=>{
            console.log(result.data.list);
            // this.addField = result.data.list;
            let list = result.data.list ;
            let arr = [] ;
            for (var i=0;i<list.length;i++){
              arr.push(list[i].columnName);
            }
          },
          ()=>{

          }
        )
      },
      /**
       * 初始化数据
       */
      initDataValue(value) {
        if (value)
          this.dataValue = value;

        Object.assign(this.form, {
          id:this.publicId,
          syncModelId:value.id,  //modelId
          syncPeriod:"",    //时间间隔
          syncTimeUnit:"",  //时间单位
          syncBeginTime:"",   //开始时间
          syncIncreField:""   //增量字段
        });
       /*if (this.dataValue)
          NormalUtils.copyObjectAtt(this.dataValue, this.form);*/
      },
      //保存按钮
      submit() {
        this.$refs["formViewRef"].validate((valid) => {
          if (!valid)
            return;

          let send = NormalUtils.copyObjectAtt(this.form, {}, true);
          if (typeof send.syncBeginTime !== "string")
            send.syncBeginTime = NormalUtils.dateFormat(send.syncBeginTime, "yyyy-MM-dd hh:mm:ss");

          this.isLoading = true;
          AnalysisAPI.publishTaskModel({
            id:this.publicId,
            syncModelId:this.form.syncModelId,
            syncPeriod:'1',
            syncTimeUnit:this.form.syncTimeUnit,
            syncBeginTime:send.syncBeginTime,
            syncIncreField:this.form.syncIncreField
          }).then(
            (result) => {

              this.isLoading = false;
              this.$message.success("保存成功！");
              this.$emit("submit");
              this.closeWin();
              this.viewPM.queryList() ;

            },
            () => {
              this.isLoading = false;
            }
          );
        });
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
    height:200px;
  }
  .auto-layout{
    width:100%;
  }

</style>

<template>

  <el-dialog title="发布模型"
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

            <el-form-item label="设置周期:" prop="syncTimeUnit" class="form-item-pad">
              <el-select style="width:100%;"
                         v-model="form.syncTimeUnit"
                         placeholder="--请选择--"    >
                <el-option v-for="(item,index) in timeUnitList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="开始时间:" prop="syncBeginTime" class="form-item-pad">
              <el-date-picker style="width:100%;"
                              v-model="form.syncBeginTime"
                              type="datetime"
                              placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="增量字段:" prop="syncIncreField" class="form-item-pad">
              <el-select style="width:100%;"
                         v-model="form.syncIncreField"
                         placeholder="--请选择--"    >
                <el-option v-for="(item,index) in addField"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div class="tj-popwin-footer" >
          <h-group-iwt :hor="'center'" class="control-box">
            <el-button type="primary" @click="submit" v-if="auth['610']">确认发布</el-button>
            <el-button type="warning" @click="closeWin">关闭</el-button>
          </h-group-iwt>
        </div>

        <!--loading-->
        <s-loading v-show="isLoading"></s-loading>
      </div>
    </div>
  </el-dialog>
</template>

