<script>
  import TableTaskPM from "./TableTaskPM" ;
  import Inject from "@/common/model/Inject" ;
  import NormalUtils from "../../../common/utils/NormalUtils";

  export default {
    components:{ },
    data() {
      this.viewPM = Inject.getClass(TableTaskPM)  ;
      return {
        viewData:this.viewPM.data,
        rules:{
        },
        rulesAdd:{
          jobName:[{ required: true, message: '任务名称不能为空，请重新输入！', trigger: 'blur' } ]
        }
      }
    },
    mounted(){
      this.viewPM.initAnayListData() ;
    },
    methods:{
      validSelect(node,data){
        this.viewPM.validCheck(node,data);
      },
      submit(){
        this.$refs["addForm"].validate((valid) => {
          if (valid){
            this.viewPM.submit();
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
    height:300px;
    position:relative;
    border-radius: 3px;
    background-color: $-layout-bg-color;
    overflow: hidden;

    .layout {
      @include abs-group(10px,10px,10px,10px) ;

      .form-left {
        flex: 1 1 70%;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid $form-borderColor ;
        border-radius: 5px;
        padding: 10px ;
        position: relative;
        background-color: #fff;

        .add-form{
          @include abs-group(10px,40px, 10px, false) ;
          height:40px;
        }
        .content {
          @include abs-group(10px,85px, 10px, 5px) ;
          border-top: 1px solid  $form-borderColor;
          .search {
            flex: 1 1 58%;
            height: 100%;
            border-right: 1px solid $form-borderColor;
            box-sizing: border-box;
            padding: 5px 10px 0 0;
            .item-gap{
              margin-bottom: 10px;
            }
          }
          .table {
            flex: 1 1 42%;
            height: 100%;
            position:relative;
            overflow: auto;
            .table-inner{
              @include abs-group(5px, 5px, 5px, 5px) ;
              overflow: auto;
            }
          }
        }
      }

      .form-mid {
        width: 50px;
        flex: none;
        .icon-btn{
          font-size:50px;
          color:$primary;
        }
      }

      .form-right {
        flex: 1 1 30%;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid $form-borderColor ;
        border-radius: 5px;
        position: relative;
        background-color: #fff;
        .content {
          @include abs-group(10px, 40px, 10px, 40px) ;
          overflow: auto;
          .tree-inner{
            @include abs-group(5px, 5px, 5px, 5px) ;
            overflow: auto;
          }
        }
        .footer{
          @include abs-group(0,false,0, 0) ;
          height:40px;
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

  @mixin center-block {
    margin-left:auto;
    margin-right:auto;
  }
  .radio-box-sel{
    box-sizing: border-box;
    border:5px solid #409eff ;
    border-radius: 7px;
    width:14px;
    height:14px;
    flex:none;
    position:relative;
  }
  .radio-box-nor{
    @extend .radio-box-sel ;
    border:1px solid #409eff ;
  }
  .radio-icon{
    color:#409eff ;
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

             <div class="add-form">
               <el-form ref="addForm"
                        size="mini"
                        :rules="rulesAdd"
                        :model="viewData.form"
                        :status-icon="true"
                        label-width="85px"
                        label-position="right">
                 <el-form-item label="任务名称:" prop="jobName" class="item-gap">
                   <el-input v-model="viewData.form.jobName"
                             style="width:100%;"  ></el-input>
                 </el-form-item>
               </el-form>
             </div>

          <div class="form-split"></div>

             <h-group-iwt class="content">
               <div class="search">

                 <el-form ref="form"
                          size="small"
                         label-width="85px"
                         label-position="right">

                   <el-form-item label="部门名称:" prop="orgId" class="item-gap">
                     <s-org-select v-model="viewData.addForm.orgId"></s-org-select>
                   </el-form-item>

                       <el-form-item label="主题:" prop="theme" class="item-gap" >
                           <el-select style="width:100%;"
                                     v-model="viewData.addForm.theme"
                                     placeholder="--请选择--"    >
                              <el-option v-for="(item,index) in viewData.themeList"
                                         :key="index"
                                         :label="item.label"
                                         :value="item.value">
                                         </el-option>
                          </el-select>
                       </el-form-item>

                       <el-form-item label="库名:" class="item-gap" >
                           <el-input v-model="viewData.addForm.dataInstance"
                                     style="width:100%;"  ></el-input>
                       </el-form-item>

                       <h-group-iwt :hor="'center'" class="layout-auto">
                         <el-button type="primary" size="mini"
                                     style="min-width: 64px;"
                                     @click="viewPM.addFomQueryList()">查询</el-button>
                         <el-button type="warning" size="mini"
                                    style="min-width: 64px;"
                                    @click="viewPM.initAddSearchForm(true)">重置</el-button>
                       </h-group-iwt>

                 </el-form>
               </div>
               <div class="table">

                 <div class="table-inner">

                   <el-tree :data="viewData.addLeftList"
                            :auto-expand-parent="true"
                            node-key="autoId"
                            :default-expanded-keys="viewData.expends"
                            @node-expand="(node,data)=>{this.viewPM.queryTableList(node,data)}" >
                           <span slot-scope="{ node, data }">
                           <el-checkbox v-show="data.type==='table'"
                                        v-model="data.selected"
                                        @change="validSelect(node,data)">
                           </el-checkbox>
                           <i v-if="data.type==='db'" class="iconfont tj-shujuku"></i>
                           <i v-if="data.type==='table'" class="iconfont tj-biaoge1"></i>
                           <i v-if="data.type==='temp'" class="el-icon-loading"></i>
                           <span >{{node.label}}</span>
                           </span>
                   </el-tree>

                 </div>
               </div>
        </h-group-iwt>

        </div>

        <div class="form-mid">
          <i class="iconfont tj-right-arrow icon-btn"></i>
        </div>

        <div class="form-right">
            <div class="form-title">
               <div class="label">数据目标</div>
            </div>
            <div class="content">
              <div class="tree-inner">
                <el-tree :data="viewData.addRightList"
                          @node-click="(data)=>{this.viewPM.rightTreeClick(data)}"
                          default-expand-all >
                          <span slot-scope="{ node, data }">
                          <i :class="['iconfont','radio-icon',data.selected?'tj-danxuanyixuan':'tj-danxuanweixuan']" ></i>
                          <i v-if="data.type==='db'" class="iconfont tj-shujuku"></i>
                          <i v-if="data.type==='table'" class="iconfont tj-biaoge1"></i>
                          <span  v-show="node.type!=='table'">{{node.label}}</span>
                          </span>
                </el-tree>
              </div>
            </div>

          <h-group-iwt :hor="'center'" class="footer">
              <el-button size="mini" type="primary"
                         @click="()=>{this.viewPM.submit()}">保存</el-button>
              <el-button size="mini" type="warning"
                         @click="()=>{this.viewPM.closeWin()}">关闭</el-button>
          </h-group-iwt>
        </div>

     </h-group-iwt>
  </div>
</template>

