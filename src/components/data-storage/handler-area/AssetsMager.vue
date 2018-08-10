<script>
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import AssetsMagerPM from "./AssetsMagerPM" ;
  import FieldMarkWin from "../common-comps/assets/FieldMarkWin";
  import AuthorWin from "../common-comps/assets/AuthorWin" ;
  import TagMarkWin from "../common-comps/assets/TagMarkWin" ;
  import ShareView from "../common-comps/ShareView" ;
  import CodeWin from "../common-comps/assets/CodeWin" ;

  export default {
    mixins:[ShareView],
    components:{   FieldMarkWin,  ContentTitle,TagMarkWin ,AuthorWin,CodeWin},
    data() {
      this.viewPM = new AssetsMagerPM()  ;
      return {
        auth:AuthManager.has,
        viewData: this.viewPM.data,
        page: this.viewPM.pagePM.data
      }
    },
    activated(){
      this.viewPM.refreshView(this.$route) ;//temp 以前的弃用
    },
    methods:{
      changeRowData(row,att){
        this.viewPM.changeRowData(row,att) ;
      },
      popMarkWin(item){
        this.$refs["markWin"].open(item) ;
      },
      popAuthorWin(item){
        this.$refs["authorWin"].open(item) ;
      },
      popTagWin(item){
        this.$refs["tagWin"].open(item) ;
      },
      popCodeWin(item){
        this.$refs["codeWin"].open(item) ;
      }
    }
  }
</script>

<template>
  <div class="tj-t-view-inner" >
    <v-group-iwt class="layout">

      <!--表单内容-->
      <v-group-iwt style="width:100%;flex:none;" >

        <!--form-->
        <div class="search-form">
          <el-form ref="form"
                   size="mini"
                   :model="viewData.searchForm"
                   label-width="90px"
                   label-position="right">

            <tile-group-iwt :column="3" style="width:100%">

              <tile-item-iwt>
                <el-form-item label="资源类型:" prop="resourceType" class="form-item-pad">
                  <el-select style="width:100%;" v-model="viewData.searchForm.resourceStyle"
                             placeholder="--请选择--"    >
                    <el-option v-for="(item,index) in viewData.resourceStyle"
                               :key="index"
                               :label="item.label"
                               :value="item.value"
                               :disabled="item.disabled"  >
                    </el-option>
                  </el-select>
                </el-form-item>
              </tile-item-iwt>

              <tile-item-iwt>
                <el-form-item label="资源名称:" prop="resourceStyle" class="form-item-pad">
                  <el-input v-model="viewData.searchForm.resourceName"></el-input>
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
                  <s-org-select  v-model="viewData.searchForm.orgId"></s-org-select>
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

              <tile-item-iwt>
                <h-group-iwt class="search-btn">
                  <el-button type="primary" size="mini" class="btn"
                             @click="viewPM.queryList()" >查询</el-button>
                  <el-button type="warning" size="mini" class="btn"
                             @click="viewPM.initSearchForm()">重置</el-button>
                </h-group-iwt>
              </tile-item-iwt>
            </tile-group-iwt>
          </el-form>
        </div>

        <!--control btn-->
        <h-group-iwt class="control-btn" :hor="'end'">
          <el-button type="primary"
                     size="mini"
                     v-if="auth['4319']"
                     :disabled="viewData.deleteItems.length===0?true:false"
                     @click="popAuthorWin(viewData.deleteItems)">授权</el-button>
          <h-gap-iwt></h-gap-iwt>
          <el-button type="primary"
                     v-if="auth['4318']"
                     size="mini"
                     :disabled="viewData.deleteItems.length===0?true:false"
                     @click="popTagWin(viewData.deleteItems)" >打标签</el-button>
        </h-group-iwt>
      </v-group-iwt>

      <!--tabale-->
      <div class="table-view">
        <div class="table-inner">
          <el-table
            border  stripe
            size="mini"
            @row-click="(row)=>{if(this.auth['4317'])this.viewPM.rowClick(row);}"
            @selection-change="(items)=>{this.viewPM.setDeleteItems(items)}"
            :data="page.sourceList"
            style="width:100%;" height="100%" max-height="100%" >

            <el-table-column  label="全选"
                              type="selection"
                              v-if="auth['4319']||auth['4318']"
                              width="55">
            </el-table-column>
            <el-table-column prop="dbName"  label="库名" min-width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="tableName"
                             :label="viewData.searchForm.resourceStyle==='database'?'表名':'文件名'"
                             min-width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column  prop="dataResourceName" label="资源名称" min-width="120">
              <template slot-scope="scope">
                <el-input size="mini"
                          v-if="scope.row.isEdit && !scope.row.dataResourceNameFlag"
                          v-model="scope.row._dataResourceName"
                          @blur="changeRowData(scope.row,'dataResourceName')"></el-input>
                <span v-else >{{scope.row.dataResourceName}}</span>
              </template>
            </el-table-column>
            <el-table-column  prop="orgName"  label="部门名称" min-width="120">
            </el-table-column>
            <el-table-column  prop="resourceStyleName"  label="资源类型" width="102">
            </el-table-column>
            <el-table-column  prop="theme"  label="主题" width="100">
              <template slot-scope="scope">
                <el-select  v-if="scope.row.isEdit && !scope.row.themeFlag"
                            style="width:100%"
                            size="mini"
                            @change="changeRowData(scope.row,'theme')"
                            v-model="scope.row._theme"
                            placeholder="--请选择--" >
                  <el-option v-for="item in viewData.themeList "
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <span v-else >{{scope.row.theme}}</span>
              </template>
            </el-table-column>
            <el-table-column  prop="shareWay"  label="共享方式" width="120">
              <template slot-scope="scope">
                <el-select  v-if="scope.row.isEdit && !scope.row.shareWayFlag"
                            style="width:100%"
                            size="mini"
                            @change="changeRowData(scope.row,'shareWay')"
                            v-model="scope.row._shareWay"
                            placeholder="--请选择--" >
                  <el-option v-for="item in viewData.shareWayList "
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <span v-else >{{scope.row.shareWay}}</span>
              </template>
            </el-table-column>
            <el-table-column  prop="sensitiveLevel"  label="敏感等级" width="120">
              <template slot-scope="scope">
                <el-select  v-if="scope.row.isEdit && !scope.row.sensitiveLevelFlag"
                            style="width:100%"
                            size="mini"
                            @change="changeRowData(scope.row,'sensitiveLevel')"
                            v-model="scope.row._sensitiveLevel"
                            placeholder="--请选择--" >
                  <el-option v-for="item in viewData.sensitiveLevelList "
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <span v-else >{{scope.row.sensitiveLevel}}</span>
              </template>
            </el-table-column>
            <el-table-column  prop="gatheringWay"  label="汇聚方式"  width="130"  >
              <template slot-scope="scope">
                <el-select  v-if="scope.row.isEdit && !scope.row.gatheringWayFlag"
                            style="width:100%"
                            size="mini"
                            @change="changeRowData(scope.row,'gatheringWay')"
                            v-model="scope.row._gatheringWay"
                            placeholder="--请选择--" >
                  <el-option v-for="item in viewData.gatheringWayList "
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <span v-else>{{scope.row.gatheringWay}}</span>
              </template>
            </el-table-column>
            <el-table-column  prop="modifiedDate"  label="更新时间" width="150" >
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="170"
                             v-if="auth['4318']||auth['4320']||auth['4319']" >
              <template slot-scope="scope">
                <el-button type="text" size="mini"
                           v-if="auth['4318']"
                           @click="popTagWin(scope.row)" >打标签</el-button>
                <el-button type="text" size="mini"
                           v-if="auth['4320']"
                           v-show="scope.row.resourceStyle==='nosql'||!scope.row.resourceStyle"
                           @click="popMarkWin(scope.row)" >字段注释</el-button>
                <el-button type="text" size="mini"
                           v-if="auth['4319']"
                           @click="popAuthorWin(scope.row)" >授权</el-button>
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
    <!--注释窗口-->
    <field-mark-win ref="markWin"></field-mark-win>

    <!--授权窗口-->
    <author-win ref="authorWin"></author-win>

    <!--标签窗口-->
    <tag-mark-win ref="tagWin"></tag-mark-win>

    <!--编码窗口-->
    <code-win ref="codeWin"></code-win>
  </div>
</template>
