<script>
  import GroupTreePM from "./GroupTreePM" ;
  import Inject from "@/common/model/Inject" ;
  import GroupFormWin from "./GroupFormWin" ;

  export default {
    components:{GroupFormWin},
    data() {
      this.viewPM = Inject.getClass(GroupTreePM)  ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        itemStyle:{
          "border-bottom":"1px solid #e4e6ea"
        },
        subItemStyle:{
          'border-bottom':'none'
        }
      }
    },
    mounted() {
      this.viewPM.initView(this) ;
      this.viewPM.ownerEvent = (type,data)=>{
        this.$emit(type, data);
      }
    },
    methods: {
      //菜单项点击处理
      changeHandler(node){
         this.viewPM.changeGroup(node) ;
      }
    }
  }
</script>

<style lang="scss" >
  .tree-container {
    @include abs-group(0,0,false,0) ;
    width:240px;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    background-color:#fff;
    .title{
      @include abs-group(0,0,0,false) ;
      height:50px;
      line-height:50px;
      background-color: #d1d4dd;
      color:#343e47;
      font-size:15px;
      font-weight: bold;
      padding-left: 15px;
      .control-btn{
        @include abs-group(false,0,0,0) ;
        .tree-btn{
          cursor: pointer;
          margin-right: 10px;
          font-weight: bold;
          font-size:18px;
          &:hover{
            color:#2956c6;
          }
        }
      }
    }
    .menu{
      @include abs-group(0,50px,0,0) ;
      background-color: #fff;
      color:#444d6a;
      .menu-body{
        @include abs-group() ;
        color:#444d6a;
      }
      .iconf{
        color:#444d6a;
      }
      .sel{
        background-color: #d3e6da;
      }
      .nor-sub{
      }
    }
  }

</style>
<template>
  <div class="tree-container">
    <div class="title">
       <span>可视化分组</span>
       <h-group-iwt class="control-btn">
         <i class="el-icon-plus tree-btn"
            :s-enabled="viewData.currentGroup?true:false"
             @click="()=>{this.viewPM.popCreateWin();}"></i>
         <i class="el-icon-edit tree-btn"
            :s-enabled="viewData.currentGroup?true:false"
            @click="()=>{this.viewPM.popEditeWin(viewData.currentGroup);}"></i>
         <i class="el-icon-delete tree-btn"
            :s-enabled="viewData.currentGroup?true:false"
            @click="()=>{this.viewPM.deleteItem(viewData.currentGroup);}"></i>
       </h-group-iwt>
    </div>
    <div class="menu">

      <!--控制三层 避免滚动 简化视图 不分装了-->
      <s-tree :source="viewData.treeSource"
              :level="0"
              :selected-id="viewData.currentGroup.id"
              @change="changeHandler">
      </s-tree>

    </div>

    <!--loading-->
    <s-loading v-show="viewData.isLoading"></s-loading>

    <!--group from-->
    <group-form-win></group-form-win>

  </div>

</template>

