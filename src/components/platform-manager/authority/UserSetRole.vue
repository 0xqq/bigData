<script>
  import UserManagerPM from "./UserManagerPM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    data() {
      this.viewPM = Inject.getClass(UserManagerPM);
      return {
        viewData: this.viewPM.data
      }
    },
    computed: {},
    mounted() {

    },
    activated() {

    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .container{
    @include abs-group(10px,10px,15px,0) ;

    .table-box{
      @include abs-group(0,0,0,50px) ;
      border:1px solid $form-borderColor;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .footer{
      @include abs-group(0,false,0,0) ;
      height:40px;
    }

    .check-item{
      flex:none;
      padding:3px 10px;
      box-sizing: border-box;
    }
  }
</style>

<template>

  <s-window title="分配角色"
            @close="()=>{this.viewPM.closeWin()}"
            :visible="viewData.isPopWin"
            :width="'500px'"
            :height="'400px'" >
    <div class="container">

      <div class="table-box">

        <tile-group-iwt style="width:100%;">
          <div class="check-item" v-for="(item,index) in viewData.roleList">
            <el-checkbox v-model="item.selected"
                         @change="viewPM.changeItem(item)">
              {{item.roleName}}
            </el-checkbox>
          </div>
        </tile-group-iwt>
      </div>
      <h-group-iwt :hor="'center'" class="footer"  >
        <el-button type="primary"
                   @click="()=>{this.viewPM.submit()}">保存</el-button>
        <el-button type="danger"
                   @click="()=>{this.viewPM.closeWin()}">取消</el-button>
      </h-group-iwt>

      <!--loading-->
      <s-loading v-show="viewData.isLoading"></s-loading>
    </div>
  </s-window>
</template>
