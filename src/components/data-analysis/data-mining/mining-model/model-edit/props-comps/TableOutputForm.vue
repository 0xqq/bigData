<script>
  import PropsFormItem from "./base/PropsFormItem" ;
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;
  import ComboBox from "@/common/comps/normal/form/ComboBox" ;
  import Inject from "@/common/model/Inject" ;
  import FoldTaskPM from "@/components/data-import/platform-import/FoldTaskPM";
  import DirectoriesMgerDataAnalyAgain from "../../../../../common-comps/DirectoriesMgerDataAnalyAgain";

  export default {
    components: {DirectoriesMgerDataAnalyAgain, ComboBox},
    mixins: [PropsFormItem],
    data() {
      this.viewPM = Inject.getClass(FoldTaskPM)  ;
      return {
        viewData:this.viewPM.data,
        isLoading:false,
        tableData:[ ],
        labelCol:"",
        targetPath:''
      }
    },

    methods: {
      resetData() {
        this.tableData = [] ;
        this.isLoading = false ;
      },

      initData(){
        //数据中选择的字段
        this.labelCol = this.data.labelCol ;
      },

      /**
       * 根据输入加载字段
       */
      initInput(){
        //查询字段
        this.queryTableColumns() ;
      },

      queryTableColumns(){
        if(!this.input)
          return ;
        this.isLoading = true ;
        let send = {dataResourceId:this.input.resourceId };
        DataStorageAPI.queryTableFields(send).then(
          (result) => {
            this.isLoading = false ;
            let list = result.data.list ;
            let arr = [] ;
             if( this.input.inputCol) {
               let cols = ","+ this.input.inputCol+"," ;
               for(let item of list){
                 if(cols.indexOf(","+item.columnName+",")===-1)
                   arr.push(item) ;
               }
             }
             else
               arr = list ;
            this.tableData = arr ;
          },
          () => {
            this.isLoading = true ;
          }
        );
      },

      selectChangeHandler(val){
        this.data.labelCol = this.labelCol = val;
        this.$emit("change", this.data) ;
      },
      //文件路径按钮
      targetFileBrows(){
        let filePath = JSON.parse(sessionStorage.getItem('bigD'));
        let dataSource = {
          /*id: this.data.resourceId,*/
          id: this.data.connection,
          dataInstance:filePath
        };
        this.$refs.targetFileBrowsTwo.open(dataSource,0) ;//把数据源传进去
      },
      targetHandler(data){
        this.targetPath =data;
        sessionStorage.setItem('targetPath',JSON.stringify(this.targetPath));
      }
    }
  }
</script>

<style scoped>
  .table-container{
    width:100%;
    min-height: 150px;
    position:relative;
  }

</style>

<template>
  <div class="table-container">

    <div v-if="viewData.modelType === '0'">
      <h-group-iwt style="width:100%;height:30px;">
        <div class="tj-diy-form-item-lb">标准列：</div>
        <combo-box style="width:100%"
                   @change="(value)=>{this.selectChangeHandler(value)}"
                   :edit="false"
                   :labelField="'columnName'"
                   :valueField="'columnName'"
                   :valueData="labelCol"
                   :dataProvider="tableData">
        </combo-box>
      </h-group-iwt>

    </div>

    <div v-if="viewData.modelType === '1'">
      <h-group-iwt style="width:100%;height:30px;margin-top: 10px">
        <label style="width: 25%">targetPath:</label><el-input v-model="targetPath"></el-input>
      </h-group-iwt>
      <!--<h-group-iwt style="width:100%;height:30px;margin-top: 10px">
        <el-button type="primary"  @click="()=>{ targetFileBrows()}">路径选择：</el-button>
      </h-group-iwt>-->

    </div>

    <s-loading v-show="isLoading"></s-loading>

    <!--文件路径-->
    <directories-mger-data-analy-again ref="targetFileBrowsTwo"
                                 @submit="(data)=>this.targetHandler(data)" >
    </directories-mger-data-analy-again>
  </div>
</template>

