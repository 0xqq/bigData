<script>
  import TenantMangerPM from "./TenantAuthorizePM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    components:{ },
    data() {
      this.viewPM = Inject.getClass(TenantMangerPM)  ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        rules:{
          type:[{ required: true, message: '类型不能为空，请重新输入！', trigger: 'blur' }],
          objNames:[{ required: true, message: '不能为空，请重新输入选择！', trigger: '' }],
          allAccesses:[{ required: true, message: '权限集合不能空，请重新选择！', trigger: '' }]
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
        this.viewPM.refreshCheck() ;
        if(this.viewData.isPopUpdate){
          if(this.viewData.form.allAccesses)
             this.viewPM.submit() ;
          else
            this.$refs["formViewRef"].validate();
          return ;
        }
        this.$refs["formViewRef"].validate((valid) => {
          if (valid)
            this.viewPM.submit() ;
        });
      },
      autoSelectHandler(item){
         this.viewPM.handleAutoSelect(item) ;
         this.$refs["autoInput"].focus() ;
      }
    }
  }
</script>

<style scoped lang="scss">
  .container{
    @include abs-group(0,10px,15px,0) ;
    .footer{
      width:100%;
    }

    /*不重写了 直接用原有逻辑 需求变化0420*/
    .auto-input{
      border:1px solid $form-borderColor;
      border-radius: 3px;
      width:100%;
      height:32px;
      overflow: hidden;

      .input-layout{
        width:100%;
      }

      .input-box-ly{
        flex:none;
        width:100%;
        .input-item{
          flex:none;
          margin: 5px 5px 0 5px;
          padding: 3px 5px;
          border:1px solid #aaaaaa;
          border-radius: 3px;
          background: -moz-linear-gradient(top, #f7f7f7 0%,#e8e8e8 50%, #f3f3f3 100%);
          background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f7f7f7),color-stop(50%,#e8e8e8), color-stop(100%,#f3f3f3));
          background: -webkit-linear-gradient(top, #f7f7f7 0%, #e8e8e8 50%,#f3f3f3 100%);
          background: -o-linear-gradient(top, #f7f7f7 0%,#e8e8e8 50%,#f3f3f3 100%);
          background: -ms-linear-gradient(top, #f7f7f7 0%,#e8e8e8 50%,#f3f3f3 100%);
          background: linear-gradient(to bottom, #f7f7f7 0%,#e8e8e8 50%,#f3f3f3 100%);
          position:relative;
          line-height:13px;
          >div{
            .close-btn{
              width:15px;
              cursor: pointer;
              color:#888888;
              font-size:12px;
              font-weight: bold;
              &:hover{
                color:#464646;
              }
            }
            .label{
              max-width: 300px;
              word-break: break-all;
              color:#333;
              font-weight: bold;
              font-size:13px;
            }
          }
        }
      }
      .auto-box{
        flex:none;
        width:100%;
        overflow: hidden;
        height:29px;
        position:relative;
        .auto-box-inner{
          @include abs-group(-2px,-2px,-2px,-2px) ;
        }
      }
    }

    .author-list{
      width:100%;
      height:50px;
      overflow: hidden;
      border:1px solid $form-borderColor;
      border-radius: 3px;
      padding-top: 5px;
      align-items:center;
      .item{
        margin: 2px 5px;
        line-height:15px;
        font-size:12px;
        flex:none;
      }
    }
  }
</style>

<template>

  <s-window :title="viewData.isPopCreate?'授权':'修改'"
            @close="()=>{this.viewPM.closeWin()}"
            :visible="viewData.isPopWin"
            :width="'550px'"
            :height="'295px'" >
    <div class="container" >

      <el-form ref="formViewRef"
               :model="viewData.form"
               :rules="rules"
               :status-icon="true"
               label-width="130px"
               label-position="right"
               size="small">
        <el-form-item prop="type"   label="策略类型：" v-show="viewData.isPopCreate" >
          <el-select  style="width:100%"
                      v-model="viewData.form.type"
                      @change="viewPM.changeType()"
                      placeholder="--请选择--" >
            <el-option v-for="item in viewData.typeList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  v-show="viewData.isPopCreate"
                       prop="objNames"
                       label="资源对象："  >
          <div class="auto-input">
            <v-group-iwt class="input-layout">
              <tile-group-iwt class="input-box-ly">
                <div class="input-item"
                     v-for="(item,index) in viewData.form.objList"
                     :key="index">
                  <h-group-iwt>
                    <div class="close-btn"
                         @click="viewPM.removeAutoSelect(item)">X</div>
                    <div class="label">{{item.value}}</div>
                  </h-group-iwt>
                </div>
              </tile-group-iwt>
              <div class="auto-box">
                <div class="auto-box-inner">
                  <el-autocomplete  style="width:100%;height:30px;"
                                    ref="autoInput"
                                    :placeholder="'输入'+viewData.form.objDataName"
                                    @blur="()=>{this.viewData.form.input=''}"
                                    v-model="viewData.form.input"
                                    :fetch-suggestions="(str,cb)=>{this.viewPM.queryKeyInfo(str,cb);}"
                                    @select="autoSelectHandler">
                  </el-autocomplete>
                </div>
              </div>
            </v-group-iwt>

          </div>
        </el-form-item>
        <el-form-item    label="策略类型：" v-show="viewData.isPopUpdate" >
          <span>{{viewData.form.objDataName}}</span>
        </el-form-item>
        <el-form-item    label="资源对象：" v-show="viewData.isPopUpdate" >
          <span>{{viewData.form.resourcesName}}</span>
        </el-form-item>

        <el-form-item  prop="allAccesses" :disabled="true"  label="权限集合："  >
            <tile-group-iwt class="author-list">
              <div class="item"
                   v-for="(item ,index) in viewData.form.accessesList"
                   :key="item.type">
                <el-checkbox v-model="item.isAllowed" >{{item.type}}</el-checkbox>
              </div>
            </tile-group-iwt>
        </el-form-item>

        <h-group-iwt :hor="'center'" class="footer"  >
          <el-button type="primary"
                     @click="submit">保存</el-button>
          <el-button type="danger"
                     @click="()=>{this.viewPM.closeWin()}">取消</el-button>
        </h-group-iwt>
      </el-form>

      <!--loading-->
      <s-loading v-show="viewData.isLoading"></s-loading>
    </div>

  </s-window>
</template>


