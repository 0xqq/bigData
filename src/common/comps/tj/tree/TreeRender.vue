<script>
    export default {
      props: {
        selectedId: {default: ""},
        source: {},
        level: {default: 0},
        labelField: {default: "name"}
      },
      data() {
        return {
          indent: 25,
          padding: 10,
          dataSource:[]
        }
      },
      watch: {
        source: {
          handler() {
            this.initData() ;
          },
          deep: true
        }
      },
      mounted() {
        this.initData() ;
      },
      activated() {

      },
      methods: {
        initData(){
        },
        openItemHandler(node) {
          node.isOpen = !node.isOpen;
        },
        itemClickHandler(node) {
          this.$emit("change", node);
        },
        nodeClick(node) {
          this.$emit("change", node);
        }
      }
    }
</script>

<style scoped lang="scss">
  .container{
    flex:none;
    width:100%;
  }
  .tree-item{
    flex:none;
    height:44px;
    width:100%;
    box-sizing: border-box;
    background-color:#fff ;
    cursor: pointer;
    /*border-bottom: 1px solid #e4e6ea;*/
    color:#444d6a;
    &:hover{
      background-color:#edf0f5 ;
      color:#4caf50;
    }
  }
  .tree-item-sel{
    @extend .tree-item ;
    background-color:#cccccc ;
    color:#4caf50;
    &:hover{
      background-color:#cccccc ;
      color:#4caf50;
    }
  }
  .hgap{
    flex:none;
  }
  .item-label{
    flex:auto;
    height:100%;
    line-height:44px;
    vertical-align:middle;
    font-size:13px;
    word-break: keep-all;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  }
  .icon-show{
    padding-right: 5px;
  }
  .open-box{
    flex:none;
    cursor: pointer;
    width:25px;
  }
  .icon-open{

  }
</style>

<template>
  <v-group-iwt class="container">

      <v-group-iwt class="container"
                   v-for="(node,index) in source"
                   :key="index">
        <h-group-iwt :class="[ node.id===selectedId?'tree-item-sel':'tree-item']">
            <div class="hgap"
                 :style="{'width':padding+(level*indent)+'px'}">
            </div>
            <div class="open-box">
              <i v-if="node.children && node.children.length>0"
                 :class="[node.isOpen?'el-icon-caret-bottom':'el-icon-caret-right','icon-open']"
                 @click.stop="openItemHandler(node)">
              </i>
            </div>
            <i class="iconfont tj-xiangmu icon-show"
               @click="itemClickHandler(node)"></i>
            <div class="item-label"
                 @click="itemClickHandler(node)">{{node.name}}</div>
        </h-group-iwt>

        <s-tree v-show="node.isOpen"
                v-if="node.children && node.children.length>0"
                :source="node.children"
                :selected-id="selectedId"
                :level="level+1"
                @change="nodeClick">
        </s-tree>

      </v-group-iwt>

  </v-group-iwt>
</template>
