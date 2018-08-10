<script>
    import VGap from "@/common/comps/tj/container/VGap";

    export default {
      props: ["dataSource", "series", "options", "isLoading"],
      components: {VGap},
      data() {
            return {}
        },
        mounted() {

        },
        activated() {

        },
        methods: {},
        beforeDestroy() {

        },
    }
</script>

<style scoped lang="scss">
  .container{
    width:100%;
    top:-5px;
    bottom:-2px;
    overflow-x: hidden;
    overflow-y: auto;
    position:absolute;
    font-size:13px;
    font-weight: bold;
    .layout{
      width:100%;
      .left{
        min-width:100px;
      }
      .gap{
        width:20px;
        flex:none;
      }
      .right{
      }
    }
  }

  .icon{
    font-size:13px;
    color:#5ab400 ;
    padding-right: 5px;
    font-weight:normal;
  }

  .icon-error{
    @extend .icon;
    color:#ff0000;
  }

  .table-row{
    line-height:20px;
    vertical-align: middle;
    height:20px;
    font-size:13px;
    font-weight:bold;
  }
  .row-left{
    text-align: right;
  }
  .row-right{
    text-align: left;
    font-size:12px;
  }
</style>

<template>
    <div class="container" >
      <h-group-iwt class="layout" :hor="'center'">
        <v-group-iwt class="left" :hor="'end'" >
          <div class="table-row row-left" v-for="(item,index) in dataSource" :key="index" >{{ item.name }}</div>
        </v-group-iwt>
        <div class="gap"></div>
        <v-group-iwt class="right" >
          <h-group-iwt class="table-row row-right"
                       v-for="(item,index) in dataSource"
                       :key="index">
            <div v-show="item.state===1"><i class="iconfont tj-duigou1 icon"></i></div>
            <div  v-show="item.state===0"><i class="iconfont tj-tingzhishangbao icon-error"></i></div>
            <div>{{ item.value }}</div>
          </h-group-iwt>
        </v-group-iwt>
      </h-group-iwt>
    </div>
</template>
