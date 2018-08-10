<script>
  /**
   * 分开写 简单
   */
  export default {
    props: {
      title: {default: ""},
      width:{default:"60%"},
      minHeight:{default:"50px"},
      maxHeight:{default:"60%"},
      visible:{default:false}
    },
    data() {
      return {
        showView:false ,
        winStyle:{},
        bodyStyle:{},
        maxStyle:{},
        headerHeight:40
      }
    },
    watch:{
      visible(){ this.initVisible() ; },
      width(){ this.initSize() ;},
      maxHeight(){ this.initSize() ;},
    },
    mounted() {
      this.initVisible() ;
      this.initSize() ;
    },
    methods: {
      initVisible(){
        if(this.visible===undefined )
          this.showView = false ;
        this.showView = this.visible ;
      },
      initSize(){
        let _style = {height:"auto"} ;
        if(typeof this.width === "number")
          _style.width = this.width+"px";
        else
          _style.width = this.width ;
        this.winStyle = _style ;

        let _maxStyle = {} ;
        if(typeof this.maxHeight === "number")
          _maxStyle["max-height"] = this.maxHeight+"px";
        else
          _maxStyle["max-height"] = this.maxHeight ;
        if(typeof this.maxHeight === "number")
          _maxStyle["min-height"] = this.minHeight+"px";
        else
          _maxStyle["min-height"] = this.minHeight ;
        this.maxStyle = _maxStyle ;
      },
      closeWin(){
        this.showView = false ;
        this.$emit("close") ;
      }
    },
    beforeDestroy() {
    },
  }
</script>

<style scoped lang="scss">
  .mask-win {
    z-index:2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.2);

    .layout {
      width: 100%;
      height: 100%;
    }

    .pop-window {
      width: 500px;
      height: 470px;
      flex: none;
      position: relative;
      border: 1px solid #f5eeee;
      border-radius: 3px;
      background-color: #ffffff;

      .header {
        flex:none;
        width:100%;
        height: 40px;
        position:relative;
        line-height: 40px;
        vertical-align: middle;
        padding: 0 10px;
        box-sizing: border-box;
        .title {
          font-size: 15px;
          font-weight: bold;
        }

        .close-btn {
          right: 10px;
          top: 0px;
          height: 40px;
          cursor: pointer;
          position: absolute;
        }
      }
      .body {
        flex:none;
        width:100%;
        box-sizing: border-box;
        position: relative;
        overflow: auto;
        padding: 0 10px 10px 10px;
        font-size:13px;
        .content{
          width:100%;

        }
        .footer {
          height:40px;
          width:100%;
          flex:none;
        }
      }
    }
  }

</style>

<template>
  <div class="mask-win" v-show="showView">
    <h-group-iwt :hor="'center'" class="layout">

      <div class="pop-window" :style="winStyle" >
        <v-group-iwt>

          <div class="header">
            <slot name="header">

              <span class="title" >{{title}}</span>
              <div class="close-btn">
                <i class="iconfont tj-guanbi1" @click="closeWin" title="退出"></i>
              </div>

            </slot>
          </div>

          <div class="body" :style="maxStyle" >
            <div class="content" >
              <slot >
              </slot>
            </div>
          </div>
        </v-group-iwt>
      </div>
    </h-group-iwt>
  </div>
</template>

