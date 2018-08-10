<script>
  import AssetsRegisterPM from "./AssetsRegisterPM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    components: { },
    data() {
      this.viewPM = Inject.getClass(AssetsRegisterPM) ;
      return {
        viewData: this.viewPM.data,
        page: this.viewPM.pagePM.data,
        rules:{
          softName:[{ required: true, message: '软件名称不能为空，请重新输入！', trigger: 'blur' } ],
          softVersion:[{ required: true, message: '版本号不能为空，请重新输入！', trigger: 'blur' }],
          os:[{ required: true, message: '系统不能为空，请重新选择！', trigger: 'blur' }],
          partition:[{ required: true, message: '所属分区不能为空，请重新选择！', trigger: 'blur' }],
          softType:[{ required: true, message: '软件类型不能为空，请重新选择！', trigger: 'blur' }],
          ip:[{ required: true, message: 'IP不能为空，请重新输入！', trigger: 'blur' }],
          port:[{ required: true, message: '端口号不能为空，请重新输入！', trigger: 'blur' }]
        },
        rules1:{
          softName:[{ required: true, message: '软件名称不能为空，请重新输入！', trigger: 'blur' } ],
          softVersion:[{ required: true, message: '版本号不能为空，请重新输入！', trigger: 'blur' }],
          os:[{ required: true, message: '系统不能为空，请重新选择！', trigger: 'blur' }],
          partition:[{ required: true, message: '所属分区不能为空，请重新选择！', trigger: 'blur' }],
          softType:[{ required: true, message: '软件类型不能为空，请重新选择！', trigger: 'blur' }],
          ip:[{ required: true, message: 'IP不能为空，请重新输入！', trigger: 'blur' }],
          // port:[{ required: true, message: '端口号不能为空，请重新输入！', trigger: 'blur' }],
          clusterName:[{ required: true, message: '集群不能为空，请重选择！', trigger: 'blur' }],
        }
      }
    },
    computed: {

    },
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
          if (valid){
            this.viewPM.submit() ;
          }
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
    height:250px;
    position:relative;
    border:1px solid $form-borderColor ;
    border-radius: 5px;
    overflow: hidden;
    background-color: #e7e5e2;

    .mini-padd{
      margin-bottom: 15px;
      margin-top: 0px;
    }

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
             :rules="viewData.form.isCluster===0?rules:rules1"
             :validate-on-rule-change="false"
             :status-icon="true"
             label-width="100px"
             label-position="right"
             size="mini">
      <tile-group-iwt :column="3">

        <tile-item-iwt>
          <el-form-item   prop="softName"
                          label="软件名称："
                          :error="viewData.formError.name" class="mini-padd">
            <el-input   placeholder="请输入软件名称"
                        @blur="()=>{this.viewPM.checkName();}"
                        v-model="viewData.form.softName"></el-input>
          </el-form-item>
        </tile-item-iwt>

        <tile-item-iwt>
        <el-form-item   prop="softVersion"
                        label="软件版本：" class="mini-padd">
          <el-input  placeholder="请输入软件版本号"
                     v-model="viewData.form.softVersion"></el-input>
        </el-form-item>
        </tile-item-iwt>

        <tile-item-iwt>
        <el-form-item   prop="os"
                        label="操作系统："  class="mini-padd">
          <el-select  style="width:100%"
                      v-model="viewData.form.os"
                      placeholder="--请选择--" >
            <el-option v-for="item in viewData.systemList"
                       :key="item.key"
                       :label="item.value"
                       :value="item.key" ></el-option>
          </el-select>
        </el-form-item>
        </tile-item-iwt>

        <tile-item-iwt>
        <el-form-item   prop="spaceSize"
                        label="空间大小："  class="mini-padd">
          <el-input-number v-model="viewData.form.spaceSize"
                           controls-position="right"
                           style="width:100%;"
                           :step="1"
                           :min="1" >
          </el-input-number>
        </el-form-item>
        </tile-item-iwt>

        <tile-item-iwt>
        <el-form-item prop="partition" label="所属分区："  class="mini-padd">
          <el-select  style="width:100%"
                      v-model="viewData.form.partition"
                      placeholder="--请选择--" >
            <el-option v-for="item in viewData.areaList"
                       :key="item.key"
                       :label="item.value"
                       :value="item.key" ></el-option>
          </el-select>
        </el-form-item>
        </tile-item-iwt>


        <tile-item-iwt  :col="3" >
        <el-form-item  label="" class="mini-padd">
          <el-radio-group v-model="viewData.form.isCluster">
          <el-radio size="medium" :label="0"
                    @change="()=>{this.viewPM.allTypeChange()}">单机软件</el-radio>
          <el-radio size="medium" :label="1"
                    @change="()=>{this.viewPM.allTypeChange()}">集群软件</el-radio>
          </el-radio-group>
        </el-form-item>
        </tile-item-iwt>

        <tile-item-iwt>
        <el-form-item prop="softType"   label="软件类型："  class="mini-padd">
          <el-select  style="width:100%"
                      v-model="viewData.form.softType"
                      @change="()=>{this.viewPM.softTypeChange();}"
                      placeholder="--请选择--" >
            <!--<el-option v-for="item in viewData.softTypeList"
                       :key="item.value"
                       :label="item.key"
                       :value="item.value" ></el-option>-->
            <el-option v-for="item in viewData.searchSoftList"
                       :key="item.key"
                       :label="item.value"
                       :value="item.key" ></el-option>
          </el-select>
        </el-form-item>
        </tile-item-iwt>

        <tile-item-iwt>
        <el-form-item   prop="ip"
                        label="IP："
                        :error="viewData.formError.ip"
                        class="mini-padd">
          <el-autocomplete  style="width:100%;height:30px;"
                            v-show="viewData.form.isCluster===0"
                            placeholder=""
                            @blur="()=>{this.viewPM.inputBlur(this.viewPM);}"
                            v-model="viewData.form.ip"
                            :fetch-suggestions="(str,cb)=>{this.viewPM.queryKeyInfo(str,cb);}"
                            @select="(data)=>{this.viewPM.autoSelectHandler(data)}">
          </el-autocomplete>
          <el-autocomplete  style="width:100%;height:30px;"
                            v-show="viewData.form.isCluster===1"
                            placeholder=""
                            @blur="()=>{this.viewPM.inputBlur(this.viewPM);}"
                            v-model="viewData.form.ip"
                            :fetch-suggestions="(str,cb)=>{this.viewPM.queryKeyInfoJiQun(str,cb);}"
                            @select="(data)=>{this.viewPM.autoSelectHandler(data)}">
          </el-autocomplete>
        </el-form-item>
        </tile-item-iwt>

        <tile-item-iwt>
        <el-form-item   prop="port"
                        label="端口号："   class="mini-padd">
          <el-input v-model="viewData.form.port"
                    :disabled="true"
                    style="width:100%;"
                    :min="1"
                    :max="66666" >
          </el-input>
        </el-form-item>
        </tile-item-iwt>

        <tile-item-iwt  v-show="viewData.form.isCluster===0">
          <el-form-item  label="节点名称："
                          class="mini-padd">
            <el-input   placeholder="节点名称"
                        :disabled="true"
                        v-model="viewData.nodeName"></el-input>
          </el-form-item>
        </tile-item-iwt>

        <tile-item-iwt>
        <el-form-item  prop="clusterName"  label="所属集群："  class="mini-padd">
          <el-select  style="width:100%"
                      :disabled="viewData.form.isCluster===0"
                      v-model="viewData.form.clusterName"
                      placeholder="--请选择--" >
            <el-option v-for="item in viewData.jiqunList"
                       :key="item.id"
                       :label="item.clusterName"
                       :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        </tile-item-iwt>

        <tile-group-iwt :col="2">
          <el-form-item  class="mini-padd">
            <h-group-iwt :hor="'end'" class="footer"  >
              <el-button type="primary"
                         size="small"
                         @click="()=>{this.submit()}">保存</el-button>
              <el-button type="warning"
                         size="small"
                         @click="()=>{this.viewPM.closeWin()}">关闭</el-button>
            </h-group-iwt>
          </el-form-item>
        </tile-group-iwt>

      </tile-group-iwt>
    </el-form>

    </div>
  </div>
</template>
