<script>
  import PropsFormItem from "./base/PropsFormItem" ;
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;
  import DirectoriesMgerDataAnaly from "@/components/common-comps/DirectoriesMgerDataAnaly";
  import FoldTaskPM from "@/components/data-import/platform-import/FoldTaskPM";
  import Inject from "@/common/model/Inject" ;

  export default {
    components: {DirectoriesMgerDataAnaly },
    mixins: [PropsFormItem],
    data() {
      this.viewPM = Inject.getClass(FoldTaskPM)  ;
      return {
        viewData:this.viewPM.data,
        isLoading:false,
        tableData:[],
        inputCol:"",
        arrDizhi:'',
        sourcePath:'',
        userStopWords:'',
        userWords:'',
        language:''

      }
    },

    methods: {
      resetData() {
        this.tableData = [] ;
        this.isLoading = false ;
      },

      initData(){
        //数据中选择的字段
        this.inputCol = this.data.inputCol ;
        //查询字段
        this.queryTableColumns() ;
        //默认走一次
        this.selectColumns() ;
      },

      queryTableColumns(){
        this.isLoading = true ;
        let send = {dataResourceId:this.data.resourceId };
        DataStorageAPI.queryTableFields(send).then(
          (result) => {
            this.isLoading = false ;
            this.tableData = result.data.list ;
            this.selectColumns() ;
          },
          () => {
            this.isLoading = true ;
          }
        );
      },

      checkItems( items ){
        if(!this.data)
          return ;

        var _arr = [] ;
        for(let item of items){
          _arr.push(item.columnName) ;
        }
        this.data.inputCol = _arr.join(",") ;
      },

      selectColumns(){
        if(! this.inputCol
          || !this.tableData
          || this.tableData.length===0
          || !this.$refs.gridTable  )
          return ;
        let items = [] ;
        if( this.inputCol)
           items =  this.inputCol.split(",") ;
        if(!items || items.length===0)
          return ;
        let map = {} ;
        for(let col of this.tableData){
          map[col.columnName] = col ;
        }

        var _cid = setTimeout(()=>{
          clearTimeout(_cid) ;
          for(let itemv of items ){
            if(map.hasOwnProperty(itemv)){
              this.$refs.gridTable.toggleRowSelection(map[itemv]);
            }
          }
        },200);
      },
      //文件路径按钮
      targetFileBrows(){
        let filePath = JSON.parse(sessionStorage.getItem('bigD'));
        let dataSource = {
          /*id: this.data.resourceId,*/
          id: this.data.connection,
          dataInstance:filePath
        };
        this.$refs.targetFileBrows.open(dataSource,0) ;//把数据源传进去
      },
      targetHandler(data){
        this.sourcePath =data;
        sessionStorage.setItem('sourcePath',JSON.stringify(this.sourcePath));
      }
    },

    watch:{
      userStopWords:function (val) {
        sessionStorage.setItem('userStopWords',JSON.stringify(this.userStopWords));
      },
      userWords:function (val) {
        sessionStorage.setItem('userWords',JSON.stringify(this.userWords));
      },
      language:function (val) {
        sessionStorage.setItem('language',JSON.stringify(this.language));
      }

    },

    activated(){
      let query = NormalUtils.getRouteQuery(this.$route.path) ;
      // console.log(query);
      this.viewPM.initDrawStage(query) ;
    },

    mounted(){
      let query = NormalUtils.getRouteQuery(this.$route.path) ;
      // console.log(query);
      this.viewPM.initDrawStage(query) ;
    }
  }

</script>

<style scoped>
  .table-container{
    width:100%;
    position:relative;
  }

</style>

<template>
  <div class="table-container">

    <v-group-iwt class="table-container">

      <div v-if="viewData.modelType === '1'">
        <h-group-iwt style="margin-top: 20px">
          <el-button type="primary"  @click="()=>{ targetFileBrows()}">路径选择</el-button>
        </h-group-iwt>
        <h-group-iwt style="width: 100%;margin-top: 10px" >
          <label style="width: 25%">源文件路径 :</label><el-input placeholder="必选项" v-model="sourcePath"></el-input>
        </h-group-iwt>
        <h-group-iwt style="width: 100%;margin-top: 10px" >
          <label style="width: 35%">自定义非法词汇（逗号分隔）:</label><el-input v-model="userStopWords"></el-input>
        </h-group-iwt>
        <h-group-iwt style="width: 100%;margin-top: 10px" >
          <label style="width: 35%">自定义词汇（逗号分隔）:</label><el-input v-model="userWords"></el-input>
        </h-group-iwt>
        <h-group-iwt style="width: 100%;margin-top: 10px" >
          <label style="width: 25%">中/英文 :</label>
          <template>
            <el-select v-model="language" placeholder="必选项" style="width: 100%">
              <el-option label="中文" value="zh-cn"></el-option>
              <el-option label="英文" value="en"></el-option>
            </el-select>
          </template>
        </h-group-iwt>
      </div>


      <div v-if="viewData.modelType === '0'">
        <h-group-iwt class="tj-diy-form-item-lb2" >
          <div class="tj-diy-form-item-lb" >选择字段：</div>
        </h-group-iwt>
        <div class="table-container">
          <el-table  :data="tableData"
                     ref="gridTable"
                     size="mini"
                     border
                     @selection-change="checkItems"
                     style="width: 100%" >
            <el-table-column label="#" width="50">
              <template slot-scope="scope">
                <span >{{(scope.$index+1)}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="全选"
                              type="selection"
                              width="45"
                              align="center" >
            </el-table-column>
            <el-table-column label="表字段" prop="columnName" >
            </el-table-column>
            <el-table-column label="字段类型" prop="columnStyle" >
            </el-table-column>
            <el-table-column label="字段描述" prop="comment" >
            </el-table-column>
          </el-table>
        </div>
      </div>

    </v-group-iwt>
    <!--加载按钮-->
    <s-loading v-show="isLoading"></s-loading>


    <!--文件路径-->
    <directories-mger-data-analy ref="targetFileBrows"
                           @submit="(data)=>this.targetHandler(data)" >
    </directories-mger-data-analy>

  </div>
</template>

