
<script>

  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import SubTitle from "@/common/comps/normal/SubTitle" ;
  import DataSourceMagerPM from "../DataSourceMagerPM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    components:{ContentTitle,SubTitle},
    data() {
      this.viewPM = Inject.getClass(DataSourceMagerPM)  ;
      return {
        viewData:this.viewPM.data
      }
    },
    mounted(){
    }
  }

</script>

<style scoped>

  /*描述文字字体样式*/
  .summary-font{
    width:100%;
    height:100%;
    flex:1 1 auto;
    word-wrap: break-word;
    font-size: 12px;
    color: #333333;
  }

  .text-title-font{
    height:40px;line-height:40px;vertical-align: middle;
  }

  .content-left{
    left:10px;
    top:10px;
    right:277px;
    bottom:10px;
    position:absolute;
  }

  .content-left-poxy{
    width:100%;
    height:100%;
    position:absolute;
  }

  .normal-bor{
    border:1px solid #dcdfe6;
  }

  /*垂线样式*/
  .ver-line {
    height: 100%;
    width: 1px;
    background-color: #cbcbca;
    position:absolute;
    right:265px;
  }

  .text-container {
    width: 265px;
    height: 100%;
    right:0px;
    position: absolute;
  }

  .hor-line {
    height: 1px;
    background-color: #cbcbca;
    width: 100%;
    margin-bottom: 10px;
  }

  .text-layout {
    left: 10px;
    right: 10px;
    top: 10px;
    bottom: 10px;
    position: absolute;
  }

  .tab-head {
    width: 100%;
    height: 40px;
    overflow: hidden;
  }

  .tab-content {
    width: 100%;
    height: 260px;
    position: relative;
  }

  .tab-content-bor {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    border-left: 1px solid #dcdfe6;
  }

  /*小标题样式*/
  .title-mini{
    margin: 4px 0 1px 1px;
    font-size:13px;
    font-weight: bold;
  }

</style>

<template>
    <v-group-iwt style="width:100%;">

      <!--tab button-->
      <div class="tab-head">
        <el-tabs type="border-card" v-model="viewData.currentState" @tab-click="viewPM.changeView()" >
          <el-tab-pane label="即席查询" name="search" >
            <span slot="search"><i class="el-icon-date"></i> 即席查询</span>
          </el-tab-pane>
          <el-tab-pane label="标签云" name="label" >
            <span slot="label"><i class="el-icon-date"></i> 标签云</span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--tab content-->
      <div class="tab-content" >
        <div class="tab-content-bor">

          <!--标签云-->
          <div class="content-left" v-show="viewData.currentState==='label'">
            <div class="abs-inner" :id="viewData.chartDomId"></div>
          </div>

          <!--即席查询-->
          <div class="content-left" v-show="viewData.currentState==='search'">

            <!--tree-->
            <div class="normal-bor" style="border-radius:3px;width:200px;top:0;bottom:0;position:absolute;overflow: auto;">
              <v-group-iwt style="left:5px;right:5px;top:0;bottom:0;position:absolute;" >
                <div class="title-mini">
                  <span>数据源列表</span>
                </div>
                <div class="hor-line" />
                <div style="width:100%;flex:1 1 auto;overflow:auto; ">
                  <el-tree :data="viewData.dataTree"
                           :props="viewData.treeOptions" >
                     <span class="custom-tree-node"
                           style="user-select:none;"
                           slot-scope="{ node, data }" >
                        <i v-if="data.type==='group'" class="iconfont tj-leimupinleifenleileibie2"></i>
                        <i v-if="data.type==='db'" class="iconfont tj-shujuku"></i>
                       <span>{{ node.label }}</span>
                   </span>
                  </el-tree>
                </div>
              </v-group-iwt>
            </div>

            <!--input-->
            <v-group-iwt style="left:210px;top:0;bottom:0;right:0;position:absolute;">
              <el-input type="textarea" :rows="7" v-model="viewData.searchForm.sql" resize="none" style="width:100%;"></el-input>
              <v-gap-iwt></v-gap-iwt>
              <h-group-iwt :hor="'end'" style="width:100%;">
                <el-button type="primary" style="min-width: 64px;" size="small"
                           @click="viewPM.queryList()">执行</el-button>
                <el-button  type="danger"  style="min-width: 64px;" size="small"
                            @click="viewPM.initSearchForm()">清空</el-button>
              </h-group-iwt>
            </v-group-iwt>

          </div>

          <!--split line-->
          <div class="ver-line"></div>

          <!--desc text-->
          <div class="text-container">
            <v-group-iwt class="text-layout">

              <div class="tj-title-font text-title-font"  >
                <span v-show="viewData.currentState==='label'">标签云</span>
                <span v-show="viewData.currentState==='search'">即席查询</span>
              </div>
              <div class="hor-line"></div>

              <div class="summary-font">
                <span v-show="viewData.currentState==='label'">您可以通过资源元数据级别的标签(例如“人口”标签可以查询出所有自然人相关的数据，“法人”标签可以查询所有法人相关的数据)，也可以通过数据级别的标签（例如“高新技术企业”、“高利润企业”、“高收入群体”、“已购公房”，“2017年出境人口”等）查询相关数据。</span>
                <span v-show="viewData.currentState==='search'">如果您对数据结构很了解，可以用自定义SQL或者脚本的方式进行数据的自由查询、关联查询。</span>
              </div>

            </v-group-iwt>
          </div>

        </div>
      </div>
    </v-group-iwt>
</template>

