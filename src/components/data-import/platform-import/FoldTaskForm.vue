<script>
  import FoldTaskPM from "./FoldTaskPM" ;
  import Inject from "@/common/model/Inject" ;
  import FoldSourceSelectWin from "./FoldSourceSelectWin" ;
  import DirectoriesMger from "@/components/common-comps/DirectoriesMger" ;
  import DirectoriesMgerData from "@/components/common-comps/DirectoriesMgerData" ;
  import NormalUtils from "../../../common/utils/NormalUtils";

  export default {
    components:{FoldSourceSelectWin ,DirectoriesMger,DirectoriesMgerData},
    data() {
      this.viewPM = Inject.getClass(FoldTaskPM)  ;
      return {
        viewData:this.viewPM.data,
        rules:{
          jobName:[{ required: true, message: '任务名称不能为空，请重新输入！', trigger: 'blur' } ],
          dataResourceName:[{ required: true, message: '资源名称不能为空，请重新输入！', trigger: 'blur' }],
          dataSourceName:[{ required: true, message: '数据源不能为空，请选择！', trigger: 'blur' }],
          sourcePath:[{ required: true, message: '文件路径不能为空，请选择！', trigger: 'blur' } ]
        },
        rightRules:{
          originalSourceId:[{ required: true, message: '目标地址不能为空，请重新选择！', trigger: 'blur' } ],
          sinkPath:[{ required: true, message: '目标路径不能为空，请重新选择！', trigger: 'blur' }]
        }
      }
    },
    mounted(){
      this.viewPM.initAnayListData() ;
    },
    methods:{

      /**
       * 浏览目录
       */
      fileBrows( data ){
        if(!this.viewData.form.dataSourceName){
          this.$message.warning("请先选择一个数据源！");
          return ;
        }
        this.$refs.fileBrows.open(this.viewPM.getResourceData(),1) ;//把数据源传进去
      },

      fileHandler(data){
        this.viewPM.fileSelectHandler(data);
        this.$refs["formLeft"].validate();
      },

      /**
       * 目标路径选择
       */
      targetFileBrows(){
        if(!this.viewData.form.originalSourceId){
          this.$message.warning("请先选择一个目标地址！");
          return ;
        }
        let dataSource = this.viewPM.getOrgainData();
        if(!dataSource){
          this.$message.warning("根路径获得失败！");
          return ;
        }
        this.$refs.targetFileBrows.open(dataSource,0) ;//把数据源传进去
      },
      targetHandler(data){
        this.viewPM.fileTargetHandler(data);
        this.$refs["formRight"].validate();
      },
      selectResource(){
        this.$refs.sourceSelect.open( ) ;
      },
      sourceHandler(data){
        this.viewPM.sourceSelectHandler(data) ;
        this.$refs["formLeft"].validate();
      },
      submit(){
        this.$refs["formLeft"].validate((valid) => {
          if (valid){
            this.$refs["formRight"].validate((valid) => {
              if (valid){
                this.viewPM.submit();
              }
            });
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">

  .form{
    flex:none;
    width:100%;
    height:320px;
    position:relative;
    border:1px solid $form-borderColor ;
    border-radius: 5px;
    overflow: hidden;
    background-color: #e7e5e2;

    .layout {
      @include abs-group(10px,10px,10px,10px) ;

      .form-left {
        flex: 1 1 65%;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid $form-borderColor ;
        border-radius: 5px;
        padding: 10px ;
        position: relative;
        background-color: #fff;

        .content {
          @include abs-group(10px,45px, 10px, 10px) ;
          .item-gap{
            margin-bottom:15px;
            margin-top: 0;
          }
          .item-gap2{
            margin-bottom:5px;
            margin-top: 0;
          }
          .input-box{
            flex:auto;
          }
          .check-box{
            margin-left: 10px;
            flex:none;
            width:110px;
          }
        }
      }

      .form-mid {
        width: 50px;
        margin-bottom:50px;
        flex: none;
        .icon-btn{
          font-size:50px;
          color:$primary;
        }
      }

      .form-right {
        flex: 1 1 35%;
        height: 100%;
        position: relative;

        .right-form{
          @include abs-group(0, 0, 0, 55px) ;
          box-sizing: border-box;
          border: 1px solid $form-borderColor ;
          border-radius: 5px;
          background-color: #fff;

          .content {
            @include abs-group(10px, 45px, 10px, 10px) ;
            overflow: auto;

            .tree-inner{
              @include abs-group(5px, 5px, 5px, 5px) ;
              overflow: auto;
            }
          }
        }
        .footer{
          @include abs-group(0,false,0, 0) ;
          height:55px;
          .form-btn{
            min-width: 65px;
          }
        }
      }
    }
  }

  .form-title {
    @include abs-group(5px, 0, 5px, false) ;
    height: 30px;
    border-bottom: 1px solid $form-borderColor;
    .label {
      height:25px;
      bottom:0;
      padding: 5px 0 0 3px;
      position:absolute;
      line-height: 25px;
      vertical-align:bottom;
      font-size:14px;
      font-weight: bold;
    }
  }

  .layout-auto{
    width:100%;
  }
  .form-item-layout{
    width:100%;
    &>div{
      flex:none;
      width:100%;
    }
  }

  .red-info{
    border:1px solid #ff0000 ;
    border-radius: 5px;
    padding: 3px 5px;
    vertical-align: middle;
    font-size:12px;
    color:red ;
  }

</style>

<template>

  <div v-show="viewData.isPopWin"
       class="form">

    <h-group-iwt class="layout">

      <!--left tree-->
      <div class="form-left">
        <div class="form-title">
          <div class="label">数据源</div>
        </div>

        <h-group-iwt class="content">

            <el-form ref="formLeft"
                     size="mini"
                     style="width:100%;"
                     :rules="rules"
                     :model="viewData.form"
                     :status-icon="true"
                     label-width="100px"
                     label-position="right">

              <v-group-iwt  class="form-item-layout">

                  <el-form-item label="任务名称:" prop="jobName"  class="item-gap" >
                    <h-group-iwt  class="layout-auto">
                    <el-input v-model="viewData.form.jobName"
                              style="width:100%;"  ></el-input>
                      <div class="check-box"></div>
                    </h-group-iwt>
                  </el-form-item>
                  <!--<div style="width:50%;">-->
                    <!--<el-form-item label="资源名称:" prop="dataResourceName"  class="item-gap"   >-->
                      <!--<el-input v-model="viewData.form.dataResourceName"-->
                                <!--style="width:100%;"  ></el-input>-->
                    <!--</el-form-item>-->
                  <!--</div>-->
                <!--</h-group-iwt>-->

                <!--<h-group-iwt class="layout-auto">-->
                  <!--<div style="width:50%;">-->
                    <!--<el-form-item label="共享方式:" prop="shareWay" class="item-gap" >-->
                      <!--<el-select style="width:100%;"-->
                                 <!--v-model="viewData.form.shareWay"-->
                                 <!--placeholder="&#45;&#45;请选择&#45;&#45;"    >-->
                        <!--<el-option v-for="(item,index) in viewData.shareList"-->
                                   <!--:key="index"-->
                                   <!--:label="item.label"-->
                                   <!--:value="item.value"></el-option>-->
                      <!--</el-select>-->
                    <!--</el-form-item>-->
                  <!--</div>-->

                  <!--<div style="width:50%;">-->
                    <!--<el-form-item label="敏感等级:" prop="sensitiveLevel" class="item-gap" >-->
                      <!--<el-select style="width:100%;"-->
                                 <!--v-model="viewData.form.sensitiveLevel"-->
                                 <!--placeholder="&#45;&#45;请选择&#45;&#45;"    >-->
                        <!--<el-option v-for="(item,index) in viewData.secureLevel"-->
                                   <!--:key="index"-->
                                   <!--:label="item.label"-->
                                   <!--:value="item.value">-->
                        <!--</el-option>-->
                      <!--</el-select>-->
                    <!--</el-form-item>-->
                  <!--</div>-->

                <el-form-item label="数据源:" prop="dataSourceName" class="item-gap" >
                  <h-group-iwt  class="layout-auto">
                    <div class="input-box">
                      <el-input placeholder="请选择数据源"
                                v-model="viewData.form.dataSourceName"
                                readonly>
                        <el-button slot="append" @click="()=>{this.selectResource()}" >请选择</el-button>
                      </el-input>
                    </div>
                    <div class="check-box"></div>
                  </h-group-iwt>
                </el-form-item>

                <el-form-item label="文件路径:" prop="sourcePath" class="item-gap" >
                  <h-group-iwt  class="layout-auto">
                    <div class="input-box">
                      <el-input placeholder="请选择文件路径"
                                v-model="viewData.form.sourcePath"
                                readonly>
                        <el-button slot="append" @click="()=>{this.fileBrows()}" >请选择</el-button>
                      </el-input>
                    </div>
                    <div class="check-box">
                      <el-checkbox v-model="viewData.form.flag">包含子文件夹</el-checkbox>
                    </div>
                  </h-group-iwt>
                </el-form-item>

                <el-form-item label="剔除文件规则:" prop="exceptRule" class="item-gap" >
                  <h-group-iwt  class="layout-auto">
                    <el-input :disabled="viewData.formView.exceptRule===false"
                              placeholder=""
                              v-model="viewData.form.notInRule"></el-input>
                    <div class="check-box">
                      <el-checkbox v-model="viewData.formView.exceptRule"
                                   @change="viewPM.ruleCheckChange('exceptRule','containRule')">
                      </el-checkbox>
                    </div>
                  </h-group-iwt>
                </el-form-item>
                <el-form-item label="包含文件规则:" prop="containRule" class="item-gap2" >
                  <h-group-iwt  class="layout-auto">
                    <el-input :disabled="viewData.formView.containRule===false"
                              placeholder=""
                              v-model="viewData.form.inRule"></el-input>
                    <div class="check-box">
                    <el-checkbox v-model="viewData.formView.containRule"
                                 @change="viewPM.ruleCheckChange('containRule','exceptRule')">
                    </el-checkbox>
                    </div>
                  </h-group-iwt>
                </el-form-item>

                <el-form-item label="" prop="containRule" class="item-gap" >
                    <div class="red-info">
                      剔除文件与包含文件规则都为正则表达式，例如只包含map3文件  .*\.mp3$
                    </div>
                    <div class="check-box"></div>
                </el-form-item>

              </v-group-iwt>
            </el-form>

        </h-group-iwt>

      </div>

      <div class="form-mid">
        <i class="iconfont tj-right-arrow icon-btn"></i>
      </div>

      <div class="form-right">

        <div class="right-form">
            <div class="form-title">
              <div class="label">数据目标</div>
            </div>

            <div class="content">

              <el-form ref="formRight"
                       size="small"
                       :rules="rightRules"
                       :model="viewData.form"
                       :status-icon="false"
                       label-width="85px"
                       label-position="right">

                <el-form-item label="目标地址:" prop="originalSourceId" class="item-gap">
                  <el-select style="width:100%;"
                             v-model="viewData.form.originalSourceId"
                             placeholder="--请选择--"    >
                    <el-option v-for="(item,index) in viewData.fileSystem"
                               :key="index"
                               :label="item.dataSourceName"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="主题:" prop="theme" class="item-gap">
                  <el-select style="width:100%;"
                             v-model="viewData.form.theme"
                             placeholder="--请选择--"    >
                    <el-option v-for="(item,index) in viewData.themeList"
                               :key="index"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="目标路径:" prop="sinkPath" class="item-gap" >
                  <h-group-iwt>
                    <el-input v-model="viewData.form.sinkPath">
                      <el-button slot="append" @click="()=>{ targetFileBrows()}" >选择</el-button>
                    </el-input>
                  </h-group-iwt>
                </el-form-item>
              </el-form>
            </div>
        </div>
        <h-group-iwt :hor="'center'" class="footer">
          <el-button size="small" type="primary" class="form-btn"
                     @click="submit">保存</el-button>
          <el-button size="small" type="warning" class="form-btn"
                     @click="()=>{this.viewPM.closeWin()}">关闭</el-button>
        </h-group-iwt>
      </div>

    </h-group-iwt>

    <!--文件选择-->
    <!--<fold-task-file-brows  ref="fileBrows"-->
                           <!--@submit="(data)=>this.viewPM.fileSelectHandler(data)" >-->
    <!--</fold-task-file-brows>-->
    <!--文件-->
    <directories-mger ref="fileBrows"
                      @submit="(data)=>this.fileHandler(data)" >
    </directories-mger>

    <!--目标选择-->
    <directories-mger-data ref="targetFileBrows"
                      @submit="(data)=>this.targetHandler(data)" >
    </directories-mger-data>

    <!--资源选择-->
    <fold-source-select-win ref="sourceSelect"
                            @select="(data)=>{this.sourceHandler(data)}">
    </fold-source-select-win>

  </div>
</template>

