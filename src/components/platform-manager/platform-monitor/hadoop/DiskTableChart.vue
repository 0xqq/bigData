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
        table-row{
          .icon{
            font-size:13px;
            color:#5ab400 ;
            padding-right: 5px;
          }
        }
      }
    }
  }

  .table-row{
    line-height:30px;
    vertical-align: middle;
    height:30px;
    font-size:14px;
    font-weight:bold;
  }
  .row-left{
    text-align: right;
  }
  .row-right{
    text-align: left;
  }

  .pross{
    flex:none;
    width:70px;
    height:16px;
    margin-right: 5px;
    background-color:#e3e2e0;
    border:1px none #e3e2e0 ;
    border-radius: 3px;
    overflow: hidden;
    position:relative;
    div{
      left:0;
      top:0;
      bottom:0;
      position:absolute;
      background-color:#1ba2bc;
      border-radius:2px;
    }
  }

</style>

<template>
  <div class="container" >
    <h-group-iwt class="layout">
      <v-group-iwt class="left" :hor="'end'" >
        <div  class="table-row row-left" v-for="(item,index) in dataSource" :key="index" >{{ item.name }}</div>
      </v-group-iwt>
      <div class="gap"></div>
      <v-group-iwt class="right" >
        <h-group-iwt class="table-row row-right" v-for="(item,index) in dataSource" :key="index">
          <div class="pross">
            <div :style="{width:(item.pre*70)+'px'}"></div>
          </div>
          <div>{{ item.value }}</div>
        </h-group-iwt>
      </v-group-iwt>
    </h-group-iwt>
  </div>
</template>
