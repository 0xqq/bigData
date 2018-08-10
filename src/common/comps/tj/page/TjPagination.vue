<script>
  export default {
    props: ['page'],
    data() {
      let _page ;
      if(this.page)
        _page = this.page ;
      else {
        _page = {
          totalIndex:0,
          pageSizes:[10,20,50,100,200],
          pageSize:10
        }
      }
      return {
        pageData:_page
      };
    },
    computed:{
    },
    methods: {
      sizeHandler(val){
        this.$emit("change",{type:"size",val:val}) ;
      },
      pageHandler(val){
        this.$emit("change",{type:"page",val:val}) ;
      }
    }
  }
</script>

<style>
</style>

<template>
  <el-pagination background
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageData.totalIndex"
    :page-sizes="pageData.pageSizes"
    :page-size="pageData.pageSize"
    @size-change="(val)=>{this.sizeHandler(val)}"
    @current-change="(val)=>{this.pageHandler(val)}">
  </el-pagination>
</template>
