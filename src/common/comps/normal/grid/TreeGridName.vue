<script>
    export default {
        props:{
          rowData:{},
          showLabel:{default:""},
          iconOpen:{default:"iconfont tj-jianhao"},
          iconClose:{default:"iconfont tj-jiahao"},
          iconNode:{default:""}
        },
        data() {
            return {
              treeOption:{
                levelGap:20,
                level:0,
                isLeaf:false,
                isOpen:false
              }
            }
        },
      computed:{
        openIcon:function(){
          if(this.iconOpen)
            return this.iconOpen ;
          return "iconfont tj-jianhao" ;
        },
        closeIcon:function(){
          if(this.iconClose)
            return this.iconClose ;
          return "iconfont tj-jiahao" ;
        },
        icon:function(){
          if(this.iconNode)
            return this.iconNode ;
          return "" ;
        },
      },
        mounted() {
          this.initData() ;
        },
        activated() {

        },
      watch:{
        rowData:{
          handler: function (value) {
            this.initData() ;
          },
          deep:true
        }
      },
        methods: {

          initData(){
            if(this.rowData && this.rowData.__treeOption)
              Object.assign(this.treeOption,this.rowData.__treeOption) ;
          },

          closeItem(){
             this.treeOption.isOpen = false;
             this.$emit("close",this.rowData) ;
          },

          openItem(){
            this.treeOption.isOpen = true ;
            this.$emit("open",this.rowData) ;
          }
        }
    }
</script>

<style scoped lang="scss">
  .container{
    vertical-align: middle;
    flex:none;
  }
  .control-btn{
    cursor:pointer;
    color:#409eff;
    font-size:15px;
  }
</style>

<template>
    <h-group-iwt :hor="'start'" class="container">
        <div :style="{flex:'none',width:(treeOption.level*treeOption.levelGap+5)+'px'}"></div>
        <div style="flex:none;width:15px;margin-right:3px;" >
          <i :class="[closeIcon,'control-btn']"
             style="flex:none;"
             v-if="treeOption.isLeaf===false && treeOption.isOpen===false"
             @click="openItem"></i>
          <i :class="[openIcon,'control-btn']"
             style="flex:none;"
             v-if="treeOption.isLeaf===false && treeOption.isOpen"
             @click="closeItem"></i>
        </div>

        <slot :node="rowData">
          <i  style="flex:none;" :class="[icon]" v-if="icon"></i>
          <div style=" flex:none;word-break:keep-all;
                        text-align:left;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        margin-left: 5px;">{{showLabel}}</div>
        </slot>
    </h-group-iwt>
</template>
