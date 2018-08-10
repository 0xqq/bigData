<script>

    export default {
      props: ["dataSource", "series", "options", "isLoading","title"],
        data() {
            return {}
        },
        watch: {
        dataSource: function () {
        }
       },
        beforeDestroy() {

        },
    }
</script>

<style scoped lang="scss">
  .container{
    width:100%;
    top:0px;
    bottom:0;
    position:absolute;
    text-align: center;
    vertical-align: middle;
    color:#5ab400 ;
    font-size:40px;
    font-weight: bold;
    div{
      flex:none;
    }
  }
</style>

<template>
    <h-group-iwt :hor="'center'" class="container">
        <div>{{dataSource}}</div>
    </h-group-iwt>
</template>
