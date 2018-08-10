
<script>

  import PagePm from "@/common/model/PagePm";
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;
  import ConstManager from "@/common/manager/ConstManager" ;
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import FieldMarkWin from "./assets/FieldMarkWin" ;
  import NormalUtils from "@/common/utils/NormalUtils";
  import TagMarkWin from "./assets/TagMarkWin" ;


  const updateAtts = ["dataResourceName","shareWay","sensitiveLevel"] ;
  export default {
    components:{ContentTitle,FieldMarkWin,TagMarkWin},
    data() {
      this.pagePM = new PagePm(DataStorageAPI.queryExternalMarkerList) ;
      this.autoNameQuery = new PagePm(DataStorageAPI.queryConfigList) ;
      //this.pagePM.testHandler = this.testHandler ; //test
      return {
        auth:AuthManager.has,
        isLoading:false,
        dataSourceId:"",
        page: this.pagePM.data,//分页查询数据
        isManager:true,//当前是否是管理视图
        mainView:"",
        dataSourceName:"",

        //查询表单
        searchForm:{
          dataSourceId:"",//资源ID
          resourceStyle:"",//资源类型
          dataSourceName:"",//数据源名称
          orgId:"", //机构
          dbType:"" //数据类型
        },

        dbTypeList:[],
        sensitiveLevelList:[],
        shareWayList:[]
      }
    },

    mounted() {
      ConstManager.initDataDictionary(()=>{
        this.dbTypeList = ConstManager.dbTypeList ;
        this.sensitiveLevelList = ConstManager.secureLevel ;
        this.shareWayList = ConstManager.shareTyple ;
      });
      this.pagePM.resultListHandler = (result)=>{
        let _list = result.data.list ;
        for(let item of _list){
          item.isEdit = false ;
          NormalUtils.createLocalAtt(item, updateAtts ,(item,att)=>{
            if(item[att])
              item[att+"Flag"] = true ;
          }) ;
        }
        return _list ;
      } ;
    },

    beforeRouteUpdate (to, from, next){
      next() ;
      this.changeViewIn() ;
    },
    activated(){
      this.changeViewIn() ;
    },

    //方法
    methods: {

      changeViewIn(){
        let query = NormalUtils.getRouteQuery(this.$route.path) ;
        if(query && query.hasOwnProperty("id") )
          this.initView(query.id,query.path,query.name) ;
        else
          this.initView() ;
      },

      /**
       * 重置表单
       */
      initSearchForm(query=false){
        this.searchForm.orgId = "" ;
        this.searchForm.dbType = "" ;
        this.searchForm.dataSourceId = "" ;
        this.searchForm.dataSourceName = "" ;
        if(query)
          this.queryList();
      },

      /**
       * 初始化视图
       */
      initView(dataId="", path="" ,name=""){
        this.dataSourceName = name ;
        this.dataSourceId =  dataId  ;
        this.searchForm.dataSourceId = dataId  ;
        this.mainView = path ;
        this.isManager = dataId?false:true ;
        this.pagePM.reset();
        this.queryList() ;
      },
      /**
       * 查询数据
       */
      queryList( ){
        let sendData = {
          orgId:this.searchForm.orgId, //机构
          dbType:this.searchForm.dbType ,//数据类型
          resourceStyle:'',
          dataSourceId:this.searchForm.dataSourceId
        }
        if(this.dataSourceId)
          sendData.dataSourceId = this.dataSourceId ;
        if(this.searchForm.dataSourceName)
          sendData.dataSourceName = this.searchForm.dataSourceName ;
        this.pagePM.queryList(sendData) ;
      },

      reQuery(){
        this.pagePM.reQuery();
      },

      /**
       * 保存成功处理
       */
      editSuccessHandler(){
        this.pagePM.reQuery() ;
      },

      /**
       * 弹出修改窗口
       * @param item
       */
      popEditWin( item ){
        this.$refs["editWin"].open(item) ;
      },

      /**
       * 弹出注释窗口
       */
      popMarkerWin( val ){
        this.$refs["markerWin"].open(val) ;
      },
      //资源标引弹出框
      resourceMarker(item){
        this.$refs['resourceMark'].open(item);
      },

      /**
       * 切换回主视图
       */
      changeBackMain(){
        NormalUtils.changeRouter( this.mainView ) ;
      },

      /**
       * 自动匹配 有空封装下
       **/
      queryKeyInfo(key,cllBack){
        if(!key) {
          cllBack([]) ;
          return ;
        }
        this.searchForm.dataSourceId = "";
        this.autoNameQuery.data.pageSize = 9999999 ;
        let send = {resourceStyle:"",dataSourceName:key} ;
        this.autoNameQuery.queryList(send,null,(datas)=>{
          if(!datas)
            datas = [] ;
          for(let item of datas){
            item.value = item.dataSourceName ;
          }
          cllBack(datas)  ;
        })
      },

      /**
       * 选择
       */
      autoSelectHandler(item){
        // this.searchForm.dataSourceId = item.id ;
        this.searchForm.dataSourceName = item.dataSourceName ;
      },

      /**
       * 清空
       */
      autoFocusOut(){
        // if(!this.searchForm.dataSourceId)
        //     this.searchForm.dataSourceName = "";
      },

      /**
       * 行点击进行编辑
       * @param row
       * @param event
       */
      rowClick(row,event,column){
        if(this.currentItem)
          this.currentItem.isEdit = false ;
         row.isEdit = true ;
         this.currentItem = row ;
      },

      /**
       * 修改资源信息
       * @param item
       * @param att
       */
      changeRowData(item,att){
        if(item[att] === item["_"+att])
          return ;

        let _send = NormalUtils.copyLocalAttObj(item, updateAtts,(item,att)=>{
          if(!item[att])
            item[att] = "" ;
        }) ;
        _send.id = item.id ;
        this.isLoading = true ;
        DataStorageAPI.saveOutSourceMarker(_send).then(
          ()=>{
            this.isLoading = false ;
            item[att] = item["_"+att];
            item[att+"Flag"] = true ;
          },
          ()=>{
            this.isLoading = false ;
            item["_"+att] = item[att];
          },
        );
      },

      /**
       * 更新表结构
       * @param item
       */
      refreshTable(item){
        this.isLoading = true ;
        DataStorageAPI.refreshTableSource({id:item.id}).then(
          ()=>{
            this.isLoading = false ;
            this.$message.success("更新成功！") ;
          },
          ()=>{
            this.isLoading = false ;
          }
        ) ;
      }
    }
  }

</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="tj-t-view-inner" >
    <v-group-iwt class="layout">

      <content-title v-show="isManager===false?true:false"
                     :title="isManager?'资源标引':('数据接入-资源标引 (数据源：'+dataSourceName)+')'">
        <el-button  style="float:right;"
                   type="primary" size="small"
                   @click="changeBackMain()">返回</el-button>
      </content-title>

      <!--form-->
       <div class="search-form" v-show="isManager">
          <el-form ref="form"
                   size="mini"
                   :model="searchForm"
                   label-width="93px"
                   label-position="right">

            <tile-group-iwt :column="3" style="width:100%">

              <tile-item-iwt>
                <el-form-item label="部门名称:" prop="orgId" class="form-item-pad">
                  <s-org-select v-model="searchForm.orgId"></s-org-select>
                </el-form-item>
              </tile-item-iwt>

              <tile-item-iwt>
                <el-form-item label="数据源:" prop="dbType" class="form-item-pad">
                  <el-autocomplete  style="width:100%;"
                                    ref="autoInput"
                                    @blur="autoFocusOut"
                                    placeholder="输入数据源名称"
                                    v-model="searchForm.dataSourceName"
                                    :fetch-suggestions="queryKeyInfo"
                                    @select="autoSelectHandler">
                  </el-autocomplete>
                </el-form-item>
              </tile-item-iwt>

              <tile-item-iwt>
                <h-group-iwt class="search-btn">
                  <el-button type="primary" size="mini" style="min-width: 64px;"
                             @click="queryList()" >查询</el-button>
                  <el-button type="warning" size="mini" style="min-width: 64px;"
                             @click="initSearchForm(true)">重置</el-button>
                </h-group-iwt>
              </tile-item-iwt>
            </tile-group-iwt>
          </el-form>
       </div>

      <div class="table-view">
        <div class="table-inner">
          <el-table
            @row-click="rowClick"
            border  stripe
            size="mini"
            :data="page.sourceList"
            style="width:100%;"
            height="100%"
            max-height="100%" >

        <el-table-column prop="tableName"  label="表名" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column  prop="dataResourceName" label="资源名称" >
          <template slot-scope="scope">
            <el-input size="mini"
                      v-if="scope.row.isEdit && !scope.row.dataResourceNameFlag"
                      v-model="scope.row._dataResourceName"
                      @blur="changeRowData(scope.row,'dataResourceName')"></el-input>
            <span v-else>
              {{scope.row.dataResourceName}}
            </span>
          </template>
        </el-table-column>
        <el-table-column  prop="orgName"  label="部门名称" >
        </el-table-column>
        <el-table-column  prop="resourceStyle"  label="数据库类型" >
         <!-- <template slot-scope="scope">
            <span>关系型数据库</span>
          </template>-->
        </el-table-column>
        <el-table-column  prop="shareWay"  label="共享方式" >
          <template slot-scope="scope">
            <el-select  v-if="scope.row.isEdit && !scope.row.shareWayFlag"
                       style="width:100%"
                       size="mini"
                       @change="changeRowData(scope.row,'shareWay')"
                        v-model="scope.row._shareWay"
                        placeholder="--请选择--" >
              <el-option v-for="item in shareWayList "
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
            <span v-else>{{scope.row.shareWay}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="sensitiveLevel"  label="敏感等级" >
          <template slot-scope="scope">
            <el-select  v-if="scope.row.isEdit && !scope.row.sensitiveLevelFlag"
                       style="width:100%"
                       size="mini"
                       @change="changeRowData(scope.row,'sensitiveLevel')"
                       v-model="scope.row._sensitiveLevel"
                       placeholder="--请选择--" >
              <el-option v-for="item in sensitiveLevelList "
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
            <span v-else>{{scope.row.sensitiveLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200" v-if="auth['39']" >

          <template slot-scope="scope">
            <el-button type="text"
                       size="mini"
                       v-show="auth['39']"
                       @click="popMarkerWin(scope.row)" >字段注释</el-button>

            <el-button type="text"
                       size="mini"
                       v-show="auth['39']"
                       @click="resourceMarker(scope.row)">资源标引</el-button>

          </template>

        </el-table-column>
          </el-table>
        </div>
      </div>

      <!--page-->
      <h-group-iwt :hor="'center'" style="width:100%">
        <s-pagination :page="page"
                      @change="(data)=>{this.pagePM.pageChange(data)}" ></s-pagination>
      </h-group-iwt>

    </v-group-iwt>

    <!--loading-->
    <s-loading v-show="isLoading||page.isLoading"></s-loading>
    <!--注释-->
    <field-mark-win ref="markerWin" ></field-mark-win>
    <!--资源标引-->
    <tag-mark-win ref="resourceMark"></tag-mark-win>

  </div>
</template>

