<template>
  <el-switch
    v-model="item"
    :active-text="activeText"
    :inactive-text="inactiveText">
  </el-switch>
</template>

<script>
  export default {
    props:{
      source: Array,
      index: Number,
      activeText: String,
      inactiveText: String
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
