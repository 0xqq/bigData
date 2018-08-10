<script>
  import DataSourceMagerPM from "./DataSourceMagerPM" ;
  import Inject from "@/common/model/Inject" ;
  import SqlFormView from "./data-source/SqlFormView" ;
  import DataSourceList from "./data-source/DataSourceList" ;
  import SqlDataSourceList from "./data-source/SqlDataSourceList" ;
  import ShareView from "../common-comps/ShareView" ;
  import MarkerFormView from "./data-source/MarkerFormView" ;

  export default {
    mixins:[ShareView],
    components:{MarkerFormView,SqlFormView,DataSourceList,SqlDataSourceList},
    data() {
        this.viewPM = Inject.getClass(DataSourceMagerPM)  ;
      return {
        auth:AuthManager.has,
        mainView:"",
        viewData:this.viewPM.data
      }
    },
    created(){
      if(!AuthManager.has["4231"]){
        this.viewData.currentState = "label" ;
      }
    },
    methods:{
    }
  }

</script>

<style scoped lang="scss">
  .container{
    @include abs-group( ) ;
    overflow: auto;
    .inner{
      @include abs-group(10px,10px,10px,false ) ;
      .layout{
        width:100%;
      }
      .tab-head {
        flex:none;
        width: 100%;
        height: 40px;
        overflow: hidden;
      }
      .tab-content {
        width: 100%;
        height: 350px;
        position: relative;
        border: 1px solid #dcdfe6;
        border-top:none;
        box-sizing: border-box;
        &>div{
          @include abs-group() ;
        }
      }
    }
  }
</style>

<template>
  <div class="container">
    <div class="inner">

        <v-group-iwt class="layout">

          <!--tab button-->
          <div class="tab-head">
            <el-tabs type="border-card" v-model="viewData.currentState"  >
              <el-tab-pane label="即席查询" name="search" v-if="auth['4431']" >
                <span slot="search"><i class="el-icon-date"></i> 即席查询</span>
              </el-tab-pane>
              <el-tab-pane label="标签云" name="label" v-if="auth['4435']" >
                <span slot="label"><i class="el-icon-date"></i> 标签云</span>
              </el-tab-pane>
            </el-tabs>
          </div>

        <!--tab content-->
        <div class="tab-content" >
          <div >


            <!--即席查询-->
            <sql-form-view v-if="auth['4431']"
                           v-show="viewData.currentState==='search'">
            </sql-form-view>

            <!--标签云-->
            <marker-form-view v-if="auth['4435']"
                              v-show="viewData.currentState==='label'">
            </marker-form-view>

          </div>
        </div>

        <v-gap-iwt ></v-gap-iwt>

          <!--sql查询列表-->
          <sql-data-source-list v-if="auth['4431']"
                                v-show="viewData.currentState==='search'" >
          </sql-data-source-list>

          <!--标签查询列表-->
          <data-source-list  v-if="auth['4435']"
                             v-show="viewData.currentState==='label'" >
          </data-source-list>

        <v-gap-iwt ></v-gap-iwt>
      </v-group-iwt>

    </div>
  </div>
</template>

