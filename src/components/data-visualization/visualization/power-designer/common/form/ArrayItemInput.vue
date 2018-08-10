<template>
  <el-input :placeholder="placeholder" v-model.trim="item">
    <template slot="prepend">{{label}}</template>
  </el-input>
</template>

<script>
  export default {
    props:{
      source: Array,
      index: Number,
      label: String,
      placeholder: String
    },
    data(){
      let item = this.source[this.index]
      return {
        item: item
      }
    },
    watch: {
      item(v){
        this.source[this.index] = v
      }
    }
  }
</script>

<style scoped>

</style>
