<script>
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import SourceGetterPM from "./SourceGetterPM";
  import SourceGetterList from "../common-comps/source-getter/SourceGetterList" ;
  import SourceGetterExWin from "../common-comps/source-getter/SourceGetterExWin" ;
  import SourceGetterInterface from "../common-comps/source-getter/SourceGetterInterface" ;
  import ShareView from "../common-comps/ShareView" ;

  export default {
    mixins:[ShareView],
    components:{
      ContentTitle,SourceGetterList,SourceGetterExWin,SourceGetterInterface},
    data() {
      this.viewPM = new SourceGetterPM() ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        page: this.viewPM.pagePM.data
      }
    },
    activated(){
      this.viewPM.refreshView(this.$route) ;//temp 以前的弃用
    },
    methods:{

      /**
       * 数据查询
       * @param item
       */
      showDataSourceWin(item){
        this.$refs.dataSourceWin.open(item) ;
      },

      /**
       * 数据查询
       * @param item
       */
      showExchangeWin(item){
        this.$refs.exchangeWin.open(item) ;
      },

      showInterfaceWin(item){
        this.$refs.interfaceWin.open(item) ;
      },

      autoSelectHandler(input,cb){
        cb([]) ;
      }
    }
  }
</script>

<template>
  <div class="tj-t-view-inner" >
    <v-group-iwt class="layout">

   <!--   <content-title title="数据获取"></content-title>
      <v-gap-iwt></v-gap-iwt>-->

      <!--form-->
      <div class="search-form">
        <el-form ref="form"
                 size="mini"
                 :model="viewData.searchForm"
                 label-width="90px"
                 label-position="right">

          <tile-group-iwt :column="3" style="width:100%">

            <tile-item-iwt>
              <el-form-item label="资源类型:" prop="resourceStyle" class="form-item-pad">
                <el-select style="width:100%;" v-model="viewData.searchForm.resourceStyle"
                           placeholder="--请选择--"    >
                  <el-option v-for="(item,index) in viewData.resourceStyle"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" >
                  </el-option>
                </el-select>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="主题:" prop="theme" class="form-item-pad">
                <el-select style="width:100%;"
                           v-model="viewData.searchForm.theme"
                           placeholder="--请选择--"    >
                  <el-option v-for="(item,index) in viewData.themeList"
                             :key="index"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="部门名称:" prop="orgId" class="form-item-pad">
                <s-org-select v-model="viewData.searchForm.orgId"></s-org-select>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="共享方式:" prop="shareWay" class="form-item-pad">
                <el-select style="width:100%;" v-model="viewData.searchForm.shareWay"
                           placeholder="--请选择--"    >
                  <el-option v-for="(item,index) in viewData.shareWayList"
                             :key="index"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="更新时间:" prop="partName" class="form-item-pad">
                <el-date-picker
                  type="date"
                  style="width:100%;"
                  v-model="viewData.searchForm.updateTime"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="汇聚方式:" prop="gatheringWay" class="form-item-pad">
                <el-select style="width:100%;" v-model="viewData.searchForm.gatheringWay"
                           placeholder="--请选择--"    >
                  <el-option v-for="(item,index) in viewData.gatheringWayList"
                             :key="index"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </tile-item-iwt>

            <tile-item-iwt>
              <el-form-item label="敏感等级:" prop="sensitiveLevel" class="form-item-pad">
                <el-select style="width:100%;" v-model="viewData.searchForm.sensitiveLevel"
                           placeholder="--请选择--"    >
                  <el-option v-for="(item,index) in viewData.sensitiveLevelList"
                             :key="index"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </tile-item-iwt>

            <!--<tile-item-iwt>-->
              <!--<el-form-item label="资源标签:" prop="sensitiveLevel" class="form-item-pad">-->
              <!--<el-input v-model="viewData.searchForm.tagName"></el-input>-->
                <!--<el-autocomplete  style="width:100%;"-->
                                  <!--v-model="viewData.searchForm.tagName"-->
                                  <!--:fetch-suggestions="(str,cb)=>{this.viewPM.queryKeyInfo(str,cb);}"-->
                                  <!--@select="autoSelectHandler">-->
                <!--</el-autocomplete>-->
              <!--</el-form-item>-->
            <!--</tile-item-iwt>-->

            <tile-item-iwt>
              <h-group-iwt class="search-btn">
                <el-button type="primary" size="mini" class="btn"
                           @click="viewPM.queryList()" >查询</el-button>
                <el-button type="warning" size="mini" class="btn"
                           @click="viewPM.initFoldForm(true)">重置</el-button>
              </h-group-iwt>
            </tile-item-iwt>
          </tile-group-iwt>
        </el-form>
      </div>

      <!--tabale-->
      <div class="table-view">
        <div class="table-inner">
          <el-table
            border
            size="mini"
            @selection-change="(items)=>{this.viewPM.setDeleteItems(items)}"
            :data="page.sourceList"
            style="width:100%;" height="100%" max-height="100%" >

            <el-table-column  label="全选"
                              type="selection"
                              width="55">
            </el-table-column>
            <el-table-column prop="dbName"  label="库名" min-width="150"  :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="tableName"  label="表名" min-width="120" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column  prop="dataResourceName" label="资源名称" min-width="120"  :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column  prop="orgName"  label="部门名称" min-width="120"  :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column  prop="resourceStyleName"  label="资源类型" width="102">
            </el-table-column>
            <el-table-column  prop="theme"  label="主题" width="100">
            </el-table-column>
            <el-table-column  prop="shareWay"  label="共享方式" width="120">
            </el-table-column>
            <el-table-column  prop="sensitiveLevel"  label="敏感等级" width="120">
            </el-table-column>
            <el-table-column  prop="gatheringWay"  label="汇聚方式"  width="130"  >
            </el-table-column>
            <el-table-column  prop="modifiedDate"  label="更新时间" width="150" >
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="200"
                             v-if="auth['4229']||auth['4225']||auth['4224']||auth['4226']||auth['4227']||auth['4228']">
              <template slot-scope="scope">
                <el-button type="text" size="mini"
                           v-if="auth['4229']"
                           v-show="scope.row.resourceStyle==='file'"
                           @click="viewPM.openFile(scope.row)">浏览</el-button>
                <el-button type="text" size="mini"
                           v-if="auth['4225']"
                           v-show="scope.row.resourceStyle==='file'"
                           @click="viewPM.downFile(scope.row)" >下载</el-button>
                <el-button type="text" size="mini"
                           v-if="auth['4224']"
                           v-show="scope.row.resourceStyle==='database'"
                           @click="viewPM.downFile(scope.row)" >下载</el-button>
                <el-button type="text" size="mini"
                           v-if="auth['4226']"
                           v-show="scope.row.resourceStyle==='database'"
                           @click="showDataSourceWin(scope.row)">查询</el-button>
                <el-button type="text" size="mini"
                           v-if="auth['4227']"
                           v-show="scope.row.resourceStyle==='database'"
                           @click="showInterfaceWin(scope.row)" >接口</el-button>
                <el-button type="text" size="mini"
                           v-if="auth['4228']"
                           @click="()=>{showExchangeWin(scope.row)}">交换</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>



      <h-group-iwt :hor="'center'" style="width:100%">
        <el-pagination background
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totalIndex"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          @size-change="(val)=>{this.viewPM.pagePM.pageSizeChange(val)}"
          @current-change="(val)=>{this.viewPM.pagePM.currentPageChange(val)}">
        </el-pagination>
      </h-group-iwt>
    </v-group-iwt>

    <!--loading-->
    <s-loading v-show="viewData.isLoading||page.isLoading"></s-loading>
    <!--数据查询-->
    <source-getter-list ref="dataSourceWin"></source-getter-list>

    <!--数据交换窗口-->
    <source-getter-ex-win ref="exchangeWin"></source-getter-ex-win>

    <!--接口信息-->
    <source-getter-interface ref="interfaceWin"></source-getter-interface>

  </div>
</template>
