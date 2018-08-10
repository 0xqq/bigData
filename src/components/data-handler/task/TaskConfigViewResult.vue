<script>
  import PagePm from "@/common/model/PagePm";
  import ProcessAPI from "@/common/service/ProcessAPI";


  export default {
    data() {
      this.pagePM = new PagePm(ProcessAPI.taskViewResult);
      return {
        page:this.pagePM.data,
        isOpen:false,
        fields:[]//表头
      }
    },
    mounted(){
      this.pagePM.resultListHandler = (result)=>{
        return this.resultListHandler(result);
      }  ;
    },
    methods:{

      /**
       * 打开窗口
       */
      open(item){
        this.pagePM.reset() ;
        this.fields = [] ;
        this.isOpen = true ;
        this.table = item ;
        this.queryList() ;
      },

      /**
       * 查询列表
       */
      queryList(){
        this.pagePM.queryList({},{id:this.table.id}) ;
      },

      /**
       * 查询返回
       */
      resultListHandler(result){
        let _list = result.data.tabResults ;

        //解析表头
        if(!this.fields || this.fields.length===0){
          let fields = result.data.columns ;
          let cols = [] ;
          for(let col of fields){
            cols.push({name:col,type:"string",label:col}) ;
          }
          this.fields =  cols ;
        }
        return _list ;
      },

      closeWin(){
        this.isOpen = false ;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container{
    @include abs-group() ;
    .table-container{
      @include abs-group(0,0,0,50px ) ;
    }
    .footer{
      @include abs-group(0,false,0,0) ;
      height:50px;
    }
    .auto-layout{
      width:100%;
    }
  }
</style>

<template>
  <s-window @close="closeWin()"
            title="数据查询"
            :visible="isOpen"
            :width="'90%'"
            :height="'90%'" >

    <!--tabale-->
    <div class="container" >
      <div class="table-container">
        <el-table
          size="mini"
          border
          :data="page.sourceList"
          style="width:100%;height:100%;"
          max-height="100%"
          height="100%" >
          <el-table-column v-for="(item,index) in fields"
                           :key="item.name"
                           :prop="item.name"
                           :label="item.label"
                           min-width="100px" >
          </el-table-column>
        </el-table>
      </div>
      <h-group-iwt :hor="'center'" class="footer">
        <el-pagination background
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="page.totalIndex"
                       :page-sizes="page.pageSizes"
                       :page-size="page.pageSize"
                       @size-change="(val)=>{this.pagePM.pageSizeChange(val)}"
                       @current-change="(val)=>{this.pagePM.currentPageChange(val)}">
        </el-pagination>
      </h-group-iwt>
    </div>

    <s-loading v-show="page.isLoading"></s-loading>
  </s-window>
</template>
