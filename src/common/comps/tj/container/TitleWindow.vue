<script>
    export default {
      props: {
        title: {default: ""},
        width:{default:700},
        height:{default:500},
        visible:{default:false}
      },
      data() {
        return {
          showView:false ,
          winStyle:{}
        }
      },
      watch:{
        visible(){ this.initVisible() ; },
        width(){ this.initSize() ;},
        height(){ this.initSize() ;},
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
          let _style = {} ;
          if(typeof this.width === "number")
            _style.width = this.width+"px";
          else
            _style.width = this.width ;
          if(typeof this.height === "number")
            _style.height = this.height+"px";
          else
            _style.height = this.height ;
          this.winStyle = _style ;
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
    z-index:999;
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
      background-color: #fff;

      .sw-header {
        top: 0;
        left: 0;
        right: 0;
        height: 50px;
        position: absolute;
        line-height: 50px;
        vertical-align: middle;
        padding: 0 10px;
        box-sizing: border-box;
        background-color: #fff;
        overflow: hidden;
        .sw-title {
          font-size: 15px;
          font-weight: bold;
        }

        .close-btn {
          right: 10px;
          top: 0px;
          height: 50px;
          cursor: pointer;
          position: absolute;
        }
      }
      .body {
        top: 50px;
        bottom: 10px;
        left: 10px;
        right: 10px;
        position: absolute;
        overflow: auto;

        .content{
          bottom: 40px;
          position: absolute;
          top:0;
          left:0;
          right:0;
          box-sizing: border-box;
          overflow: auto;
        }
        .footer {
          bottom: 0px;
          height: 40px;
          position: absolute;
          left:0;
          right:0;
        }
      }
    }
  }

</style>

<template>
  <div class="mask-win" v-show="showView">
    <h-group-iwt :hor="'center'" class="layout">
      <div class="pop-window" :style="winStyle" >
        <div class="sw-header">
          <slot name="header">

            <span class="sw-title" >{{title}}</span>
            <div class="close-btn">
              <i class="iconfont tj-guanbi1" @click="closeWin" title="退出"></i>
            </div>

          </slot>
        </div>

        <div class="body"  >
          <slot >
          </slot>
        </div>

      </div>
    </h-group-iwt>
  </div>
</template>
