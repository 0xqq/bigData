<script>

  import RoleManagerPM from "./RoleManagerPM" ;
  import Inject from "@/common/model/Inject" ;
  import TreeGridName from "@/common/comps/normal/grid/TreeGridName" ;


  export default {
    components:{ TreeGridName},
    data() {
      this.viewPM = Inject.getClass(RoleManagerPM)  ;
      return {
        treeData:this.viewPM.treeGridData.data,
        viewData:this.viewPM.data
      }
    },
    created(){
      this.viewPM.popHandler = ()=>{
        if( this.$refs["formViewRef"])
        this.$refs["formViewRef"].clearValidate();
      };
    },
    methods:{
    }
  }
</script>

<style scoped lang="scss">
  .container{
    @include abs-group(0,10px,15px,0) ;

    .table-box{
      @include abs-group(0,0,0,45px) ;
    }

    .footer{
      @include abs-group(0,false,0,0) ;
      height:40px;
    }
  }
</style>

<template>

  <s-window title="角色授权"
            @close="()=>{this.viewPM.closeAut()}"
            :visible="viewData.isPopAut"
            :width="'750px'"
            :height="'500px'" >
    <div class="container">

      <div class="table-box">
        <el-table
          :data="treeData.sourceList"
          border  stripe
          size="mini"
          style="width:100%;"
          height="100%"
          max-height="100%">

          <el-table-column prop="label" label="菜单名称" width="240">
            <template slot-scope="scope">
              <tree-grid-name :row-data="scope.row"
                              :show-label="scope.row.label"
                              style="margin-bottom: 5px;"
                              @close="viewPM.treeGridData.close(scope.row)"
                              @open="viewPM.treeGridData.open(scope.row)" >
                  <el-checkbox v-model="scope.row.selected"
                               @change="viewPM.itemCheck(scope.row)"></el-checkbox>
                  <div style="width:3px;flex:none;"></div>
                  <span>{{scope.row.label}}</span>
              </tree-grid-name>
            </template>
          </el-table-column>

          <el-table-column  prop="label" label="按钮权限" >
            <template slot-scope="scope">
              <div style="flex:none;height:25px;">
                <h-group-iwt style="height:25px;" v-if="scope.row.btns">
                  <h-group-iwt  v-for="(item,index) in scope.row.btns"
                                :key="index"
                                style="margin-right:5px;flex:none;">
                    <el-checkbox v-model="item.selected"
                                 @change="viewPM.itemCheck(item)"></el-checkbox>
                    <div style="width:3px;flex:none;"></div>
                    <span>{{item.label}}</span>
                  </h-group-iwt>
                </h-group-iwt>
              </div>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <h-group-iwt :hor="'center'" class="footer"  >
        <el-button type="primary"
                   @click="()=>{this.viewPM.submitAut()}">保存</el-button>
        <el-button type="danger"
                   @click="()=>{this.viewPM.closeWin()}">取消</el-button>
      </h-group-iwt>

      <!--loading-->
      <s-loading v-show="viewData.isLoading"></s-loading>
    </div>
  </s-window>
</template>
