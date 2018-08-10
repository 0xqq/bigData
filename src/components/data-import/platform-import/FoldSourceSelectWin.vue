<script>
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;
  import PagePm from "@/common/model/PagePm";

  export default {
    data() {
      this.pagePM = new PagePm(DataStorageAPI.queryConfigList) ;
      return {
        isOpen:false ,
        page:this.pagePM.data,
        //清空查询条件
        searchForm:{
          orgId: "",
          hostAddress: "",
          dbStyle: "",
          resourceStyle:"file"
        }
      }
    },

    mounted(){

    },
    methods:{

      /**
       * 打开窗口
       */
      open(){
        this.initSearchForm() ;
        this.queryList();
        this.isOpen = true;
      },

      closeWin(){
        this.isOpen = false;
      },

      /**
       * 初始化表达
       */
      initSearchForm(query=false){
        this.searchForm={
          orgId: "",
            hostAddress: "",
            dbStyle: "",
            resourceStyle:"file"
        };
        if(query)
          this.queryList() ;
      },

      queryList(){
        this.pagePM.queryList(this.searchForm) ;
      },
      submit(item){
         this.$emit("select",item) ;
         this.closeWin();
      }
    }
  }

</script>

<style scoped lang="scss">
  .container{
    @include abs-group(0,10px,15px,0) ;
    .layout{
      @include abs-group( ) ;
      .search-form{
        width:100%;
        .form-item-pad{
          margin-bottom: 0;
        }
        .search-btn{
          flex:none;
          margin: 0 10px 0 10px;
        }
      }
      .ver-gap{
        flex:none;
        height:5px;
      }
      .table-view{
        flex:auto;
        overflow: auto;
        position:relative ;
        .table-inner{
          @include abs-group( ) ;
        }
      }
    }
  }
  .auto-layout{
    width:100%;
  }
</style>

<template>
  <s-window title="选择数据源"
            @close="()=>{this.closeWin()}"
            :visible="isOpen"
            :width="'650px'"
            :height="'450px'" >
    <div class="container">
    <v-group-iwt class="layout">

      <!--form-->
      <div class="search-form">
        <el-form ref="form"
                 size="mini"
                 :model="searchForm"
                 label-width="90px"
                 label-position="right">

          <h-group-iwt  class="auto-layout">

              <el-form-item label="主机地址:" prop="hostAddress" class="form-item-pad">
                <el-input v-model="searchForm.hostAddress"   ></el-input>
              </el-form-item>

              <el-form-item label="部门名称:" prop="orgId" class="form-item-pad">
                <s-org-select v-model="searchForm.orgId"></s-org-select>
              </el-form-item>
             <div class="search-btn">
               <el-button type="primary" size="mini"
                          class="btn" @click="queryList()" >查询</el-button>
             </div>
          </h-group-iwt>
        </el-form>
      </div>

      <div class="ver-gap"></div>

      <!--tabale-->
      <div class="table-view">
        <div class="table-inner">
          <el-table
            border
            :data="page.sourceList"
            size="mini"
            max-height="100%"
            height="100%"
            style="width:100%;height:100%" >
            <el-table-column prop="orgName"  label="部门名称" min-width="150">
            </el-table-column>
            <el-table-column  prop="dataSourceName" label="资源名称" min-width="120">
            </el-table-column>
            <el-table-column  prop="hostAddress"  label="IP地址" min-width="120">
            </el-table-column>
            <el-table-column label="选择" width="90" >
              <template slot-scope="scope">
                <el-button  type="primary"
                            size="mini"
                            @click="submit(scope.row)" >选择</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--page-->
      <h-group-iwt :hor="'center'" class="auto-layout">
        <s-pagination :page="page"
                      @change="(data)=>{this.pagePM.pageChange(data)}" ></s-pagination>
      </h-group-iwt>

    </v-group-iwt>
    </div>
    <!--loading-->
    <s-loading v-show="page.isLoading"></s-loading>
  </s-window>
</template>

