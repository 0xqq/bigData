<script>
  export default {
    props: {
      'row': { },
      'column': {},
      "source":{},
      "sourceIndex":{},
      "index":{default:1}
    },
    data() {
      return {
        vmodeData:""
      }
    },

    mounted() {
      this.initData() ;
    },

    watch:{
      row:function(){
        this.initData() ;
      },
      column:function(){
        this.initData() ;
      }
    },

    computed: {
    },

    methods: {

      initData(){
        this.vmodeData = "";
        if(!this.row || !this.column || !this.column.name || !this.row.hasOwnProperty(this.column.name))
          return ;
        this.vmodeData = this.row[this.column.name] ;
      },

      changeHandler(){
        if(!this.row || !this.column || !this.column.name )
          return ;
        this.row[this.column.name] = this.vmodeData;
        this.$emit("change",this.row) ;
      }
    }
  }
</script>

<style scoped>
</style>

<template>
  <input  type="text"  class="tj-transparent-input"  v-model="vmodeData" @change="changeHandler">
</template>

