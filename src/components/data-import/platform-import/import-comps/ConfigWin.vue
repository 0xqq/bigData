<script>
  import ConstManager from "@/common/manager/ConstManager" ;
  import DataImportAPI from "@/common/service/DataImportAPI";
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;

  export default {
    props:{
        typeForm:{default:"db"},//类型
      },
    components:{ },
    data() {
      return {
        dataValue:{},
        isLoading:false,
        isOpen:false,
        autoTreeFields:[],//多表情况
        type:"db",
        alSet:false,//如果设置了自增字段 就不让设置了
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
          beginTime:new Date(),
          timeUnit:"月",
          increFields:""
        },
        allWrite:true,
        checkEnabled:true,
        showField:true,
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

        //查询自增字段
        this.queryAutoFields();
      },

      submit(){
        this.$refs["formViewRef"].validate((valid) => {
          if (!valid)
            return ;

          let send = NormalUtils.copyObjectAtt(this.form ,{},true) ;
          if(typeof send.beginTime!=="string")
             send.beginTime = NormalUtils.dateFormat(send.beginTime,"yyyy-MM-dd hh:mm:ss");
          send.increFields = this.getSelectedAuto() ;
          this.isLoading = true ;
          DataImportAPI.saveConfig(send).then(
            (result)=>{
              this.isLoading = false ;
              this.$message.success("保存成功！") ;
              this.$emit("submit") ;
              this.closeWin() ;
            },
            ()=>{
              this.isLoading = false ;
            }
          ) ;
        });
      },

      getSelectedAuto(){
        let arr = [] ;
        for(let table of this.autoTreeFields){
          let incre = {dataResourceId:table.dataResourceId,increField:""} ;
          if(!table.isAll){
            incre.increField = table.increField;
            if(table.fields.length>0){
              for(let field of table.fields){
                if(field.checked)
                  incre.increField = field.columnName ;
              }
            }
          }
          arr.push(incre) ;
        }
        return arr ;
      },

      /**
       * 获取自增字段
       **/
      queryAutoFields() {
        if (this.type !== "db")
          return;

        this.autoTreeFields = [];
        this.isLoading = true;

        //查询一层表列表接口
        DataImportAPI.getJobAutoFields({id: this.dataValue.id}).then(
          (result) => {
            this.isLoading = false;
            let list = result.data.list;

            let map = {};
            let tables = [];

            //做成分级查询
            for (let tb of list) {
                let _table = {
                  isOpen:false,
                  name: tb.tableName,
                  isLoading:false,
                  dataResourceId: tb.dataResourceId,
                  fields: [],
                  isAll:tb.increField?false:true,
                  increField:tb.increField ,
                  disabled: false
                };
              tables.push(_table) ;
            }
            this.autoTreeFields = tables;
          },
          () => {
            this.isLoading = false;
          }
        );
      },

      open(item ,type){
        this.type = type ;
        this.showField = this.type==="db"?true :false ;
        this.initDataValue(item) ;
        this.isOpen = true ;
      },

      /**
       * 配置窗口弹出
       * @param value
       */
      closeWin(){
        this.isOpen = false ;
      },

      /**
       * 多表控制自增字段
       * @param table
       */
      allChange(table){
        if(table.disabled)
          return ;

        if(table.isAll){
          for(let item of table.fields){
            item.checked = false ;
          }
        }
      },
      openTable(table){
        table.isOpen = !table.isOpen ;
        if(table.isOpen)
           this.queryFields(table) ;
      },
      /**
       * 查询所有字段
       */
      queryFields(table){
        if(table.fields && table.fields.length>0)
          return ;

        table.isLoading = true ;
        DataStorageAPI.queryTableFields({dataResourceId:table.dataResourceId}).then(
          (result)=>{
            table.isLoading = false ;
            let list = result.data.list ;
            for(let col of list ){
              col.checked = false ;
              if(col.columnName === table.increField)
                col.checked = true ;
            }
            table.fields = list ;
          },
          ()=>{
            table.isLoading = false ;
            table.fields = [] ;
          },
        ) ;
      },
      radioChange(field,table){
        if(table.disabled)
          return ;

        //选中
        field.checked = !field.checked ;
        if(field.checked){
          table.isAll = false ;
          for(let node of table.fields){
            if(field !== node)
              node.checked = false ;
          }
        }
        else{
          let flag = true ;
          for(let inode of table.fields){
            if(inode.checked){
              flag = false ;
              break ;
            }
          }
          table.isAll = flag ;
        }
      },

      //测试数据
      createTestData(){
        return [
        ] ;
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
    height:360px;
  }
  .check-box{
    flex:none;
    width:60px;
    padding-left: 5px;
  }
  .auto-layout{
    width:100%;
  }

  .form-item-pad{
    margin-bottom: 10px;
  }

  .auto-box{
    width:100%;
    box-sizing: border-box;
    height:150px;
    border:1px solid $form-borderColor ;
    border-radius: 3px;
    overflow: auto;
    position:relative ;
    .box-layout{
      @include abs-group(5px,5px,5px,false) ;
      .auto-box-item{
        width:100%;
        flex:none;

        .auto-box-title {
          flex: none;
          height: 25px;
          width: 100%;
        }

        .open-icon{
          width:25px;
          flex:none;
          color:#555555;
          font-size:15px;
          cursor: pointer;
        }
        .field-inner{
          width:100%;
          flex:none;
          padding:3px 5px 3px 20px;
          box-sizing: border-box;
        }
        .filed-box {
          flex: none;
          width:100%;
          padding:5px 5px ;
          box-sizing: border-box;

          .field-item {
            flex: none;
            margin: 2px 5px;
            line-height:20px;
            cursor: pointer;
            span{
              margin-left: 3px;
            }
          }
        }
      }
    }
  }

  .info-box{
    border:1px solid red ;
    border-radius: 3px;
    box-sizing: border-box;
    width:100%;
    padding: 5px 5px;
    color:red ;
    line-height:20px;
  }
  .radio-icon{
    color:#409eff ;
    cursor:pointer;
  }
  .enabled-box{
    opacity:1;
  }
  .disabled-box{
    opacity: 0.5;
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

                  <el-form-item label="设置周期:" prop="timeUnit" >
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

                  <el-form-item label="开始时间:" prop="beginTime" >
                    <el-date-picker style="width:100%;"
                      v-model="form.beginTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>

                <el-form-item label="自增字段:"
                              class="form-item-pad" >
                   <div class="auto-box">

                      <v-group-iwt class="box-layout">
                        <v-group-iwt class="auto-box-item"
                                     v-for="(table,index) in autoTreeFields"
                                     :key="index">
                          <h-group-iwt class="auto-box-title">
                            <div class="open-icon" @click="openTable(table)">
                              <i :class="['iconfont',table.isOpen?'tj-sanjiaodown':'tj-sanjiaoright']"></i>
                            </div>
                            <i class="iconfont tj-biaoge"></i>
                            <div style="margin-left:10px;margin-right:50px;">{{table.name}}</div>
                            <el-checkbox :disabled="table.disabled"
                                         @change="allChange(table)"
                                         v-model="table.isAll">全量</el-checkbox>
                          </h-group-iwt>
                          <div class="field-inner" v-show="table.isOpen">

                            <i class="el-icon-loading" v-show="table.isLoading"></i>

                            <tile-group-iwt v-show="table.isLoading===false"
                                            style="flex-direction:row;"
                                            :class="['filed-box',table.disabled?'disabled-box':'enabled-box']">

                                <h-group-iwt class="field-item"
                                             v-for="(field,index) in table.fields"
                                             :key="index" >
                                  <i @click="radioChange(field,table)"
                                     :class="['iconfont','radio-icon',field.checked?'tj-danxuanyixuan':'tj-danxuanweixuan']"></i>
                                  <span @click="radioChange(field,table)">{{field.columnName}}</span>
                                </h-group-iwt>

                            </tile-group-iwt>

                          </div>
                        </v-group-iwt>
                      </v-group-iwt>
                   </div>
                </el-form-item>

              <el-form-item label=""
                            class="form-item-pad" >
              <div class="info-box">
                <span>如果没有自增字段或未对自增字段进行任何设置，任务将按照全量数据进行接入处理,自增字段设置后将不可修改！</span>
              </div>
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

