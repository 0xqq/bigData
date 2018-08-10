<script>

  import TableTaskPM from "./TableTaskPM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    components:{ },
    data() {
      this.viewPM = Inject.getClass(TableTaskPM)  ;
      return {
        viewData:this.viewPM.data,
      }
    },
    created(){
    },
    methods:{
    }
  }
</script>

<style scoped lang="scss">
  .container{
    @include abs-group() ;
    line-height:30px;
    vertical-align: middle;
    .form-bottom{
      margin-bottom: 5px;
    }
    .input-box{
      width:100%;
      height:30px;
    }
    .from-box{
      width:100%;
      >div{
        width:100%;
      }
      .db-box{
        height:30px;
      }
      .table-box{
        height:100px;
        overflow-y: auto;
        overflow-x: hidden;
        border:1px solid $form-borderColor;
        box-sizing: border-box;
        .table{
          flex:none;
          line-height:20px;
          margin:5px 0 0 5px;
          font-size:12px;
        }
      }
    }
  }

</style>

<template>

  <s-window title="任务详情"
            @close="()=>{this.viewData.isPopDetail=false;}"
            :visible="viewData.isPopDetail"
            :width="'450px'"
            :height="'280px'" >
    <div class="container">

      <el-form label-width="100px"
               label-position="right"
               size="small">

        <el-form-item label="任务名称：" class="form-bottom" >
           <div class="input-box"><span>{{viewData.detailForm.jobName}}</span></div>
        </el-form-item>
        <el-form-item    label="数据源："  class="form-bottom" >
          <v-group-iwt class="from-box">
            <div class="db-box">
              <span><i class="iconfont tj-shujuku"></i>{{viewData.detailForm.fromDb}}</span>
            </div>
            <div class="table-box">
              <tile-group-iwt style="width:100%;">
                <div class="table"  v-for="(item,index) in viewData.detailForm.tables">
                  <span><i class="iconfont tj-biaoge1"></i>{{item.tableName}}</span>
                </div>
              </tile-group-iwt>
            </div>
          </v-group-iwt>
        </el-form-item>
        <el-form-item   label="目标库："  class="form-bottom"  >
          <div class="input-box"><span>{{viewData.detailForm.targetDb}}</span></div>
        </el-form-item>

      </el-form>

    </div>
  </s-window>
</template>


