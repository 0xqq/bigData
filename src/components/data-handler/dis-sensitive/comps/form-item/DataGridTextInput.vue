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
        vmodeData:"",
        isNum:false
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
        this.isNum = false ;
        if( !this.column || !this.column.name)
          return ;
        this.isNum = this.column.isNum ;
        if(!this.row || !this.row.hasOwnProperty(this.column.name))
          return ;
        this.vmodeData = this.row[this.column.name] ;
      },

      changeHandler(){
        if(!this.row || !this.column || !this.column.name )
          return ;
        if(this.isNum)
        this.vmodeData = this.vmodeData.replace(/[^\d]/g,'');
        this.row[this.column.name] = this.vmodeData;
        this.$emit("change",this.row) ;
      },
      keyupHandler(){
        if(this.isNum)
        this.vmodeData = this.vmodeData.replace(/[^\d]/g,'');
      }
    }
  }
</script>

<style scoped>
</style>

<template>
  <input  type="text"
          class="tj-transparent-input"
          v-model="vmodeData"
          @keyup="keyupHandler"
          @change="changeHandler">
</template>

