<script>
  import DataGridComboBox from "./DataGridComboBox" ;
  import DataGridLabel from "./DataGridLabel" ;
  import DataGridTextInput from "./DataGridTextInput" ;
  import FormItemUtils from "@/common/utils/FormItemUtils" ;
  import ColmnGetter from "./ColmnGetter" ;
  import DataGridClusterComboBox from "./DataGridClusterComboBox" ;

  let gridMap = {
    "label":DataGridLabel,
    "textinput":DataGridTextInput,
    "combobox":DataGridComboBox,
    "clustercombobox":DataGridClusterComboBox
  }

  export default {
    components:{
      DataGridComboBox,
      DataGridLabel,
      DataGridTextInput,
      ColmnGetter,
      DataGridClusterComboBox
    }  ,
    props: {
      'label': {default: ""},
      'data': {},
      desc:{default: ""},
      "owner":{}
    },
    data() {
      return {
        cols:[],
        autoId:NormalUtils.createOID("cccid"),
        tableData:[],
        showCheck:false,
        hasGet:false,
        isLoading:false,
        getType:"table",
        list:{
          "0":[],
          "1":[],
          "2":[],
          "3":[],
          "4":[],
          "5":[]
        }
      }
    },

    mounted() {
       this.initData() ;
    },

    watch:{
      data:function(){
        this.initData() ;
      }
    },

    computed: {
    },

    methods: {
      initData(){
        this.cols = [] ;
        this.tableData = [] ;
        this.showCheck = false ;
        this.hasGet = false ;
        this.valueArr = [] ;
        this.clearCatch() ;

        if(!this.data)
          return ;

        this.showCheck = this.data.check?true:false ;
        this.hasGet = this.data.get?true:false ;

        //解析参数
        if(this.data.params){
          let _cols = this.data.params.col || [];
          let _data = this.data.params.data ;
          _cols.forEach((item)=>{
            if(!item.type)
              item.type = "textinput" ;
            item.type = item.type.toLowerCase() ;
            if(!item.hasOwnProperty("mw"))
              item.mw = 100 ;
          })
          this.cols = _cols ;
          console.log(_cols);
          console.log(this.cols);
        }

        //默认添加一列控制
        let _dataArr = [] ;
        //填充默认数据源
        if(this.data.value){
          let list = FormItemUtils.getPathData(this.data.value,this.data.list,[]) ;
          _dataArr = [].concat(list) ;
          this.valueArr = [].concat(_dataArr) ;
        }
        else if(this.data.showDef && this.data.params && this.data.params.defaultData  ){
          _dataArr = [].concat(this.data.params.defaultData) ;
        }
        _dataArr.push(this.getDefaultData(this.cols)) ;

        this.fillDatas(_dataArr) ;

        if(this.showCheck && this.valueArr){
          var _cid = setTimeout(()=>{
            clearTimeout(_cid) ;
            if(this.showCheck && this.valueArr && this.$refs && this.$refs.gridTable){
              for(let itemv of this.valueArr){
                this.$refs.gridTable.toggleRowSelection(itemv);
              }
            }
          },300);
        }
      },

      fillDatas( datas ){
        let _minlen = 3 - datas.length ;
        if(_minlen>0){
          for(let i=0;i<_minlen;i++){
            datas.push(this.getDefaultData(this.cols)) ;
          }
        }
        this.tableData = datas ;
        this.checkItems( this.tableData) ;
      },

      getDefaultData( cols){
        let _re = {_hasdata:true} ;
        cols.forEach((att,index)=>{
          _re[att.name] = "" ;
        });
        return _re ;
      },

      getComp(item){
        let type = "textinput" ;
        if(item && item.type)
          type = item.type.toLowerCase() ;
        if(gridMap.hasOwnProperty(type))
          return gridMap[type] ;
        return  DataGridTextInput ;
      },

      rowClickHandler(row){
        let _index = this.tableData.indexOf(row) ;
        if(_index===this.tableData.length-1)
          this.tableData.push(this.getDefaultData(this.cols)) ;
      },

      isShowIndexLabel(row){
        if(!row || row._hasdata === false )
          return false ;
        return true ;
      },

      /*
      * 变化处理
      **/
      changHandler(row){
        this.checkItems(this.tableData) ;
      },

      /**
       * 选中变化
       * @param val
       */
      checkItems(val){
        if(!this.data)
          return ;

        let list = NormalUtils.filterData(val,this.cols,"name", true ) ;
        this.data.value = FormItemUtils.setPathData( this.data.list,list) ;
      },

      /**
       * 状态变化
       */
      loadingHandler(flag){
        this.isLoading = flag ;
      },

      /**
       * 列数组返回处理
       */
      colResultHandler(value){
        console.log("-------------------------------------reesult------------------>>>")
        if(!this.hasGet )
          return ;
        console.log("-------------------------------------222222222222222------------------>>>")
        let type = value.type ;
        let cols = value.list ;

        console.log(cols);



        let fill = "fill" ;
        if(this.data.get.fill)
          fill = this.data.get.fill.type ;
        if(fill==="fill"){
          this.fillDatas(cols) ;
          if(!this.showCheck)
            this.changHandler() ;
        }
        else if(fill==="source"){
          let list = this.data.get.fill.list ;
          if(this.data.get.fill.hasTable && type==="table"){
            for(let index of list ){
              index = index+"";
              if( index.indexOf("t:")===0)
                this.list[ index.substring(2,index.length)] = cols ;
              console.log(cols);
            }
          }
          else{
            for(let index of list ){
                this.list[ index+"" ] = cols ;
                console.log(cols)
            }
          }
        }
      },

      /**
       * 清空缓存列表数据
       */
      clearCatch(){
        this.autoId = NormalUtils.createOID("cccid");
        for(let att in  this.list){
          this.list[att] = [] ;
        }
      }
    }
  }
</script>
<style scoped>
   .size{
     width:100%;
     position:relative;
   }
  .table-container{
    width:100%;position:relative;
  }
  .mouse-box {
    width: 100%;
    bottom: 0px;
    height: 40px;
    position: absolute;
    cursor: pointer;
  }
</style>
<template>
  <div class="size">
    <v-group-iwt class="size">
      <h-group-iwt class="tj-diy-form-item-lb2" v-if="label||hasGet" >
        <div v-if="label" class="tj-diy-form-item-lb" >{{label}}：</div>
        <div v-if="hasGet">
          <colmn-getter :owner="owner"
                        :data="data"
                         @loading="loadingHandler"
                         @result="colResultHandler">
          </colmn-getter>
        </div>
      </h-group-iwt>
      <div v-if="data.desc" class="tj-diy-form-item-desc" :title="data.desc" > </div>
      <div class="table-container">
        <el-table  :data="tableData"
                   ref="gridTable"
                   size="mini"
                   border
                   @row-click="rowClickHandler"
                   @selection-change="checkItems"
                   style="width: 100%" >
          <!--序号-->
          <el-table-column label="#" width="50">
            <template slot-scope="scope">
              <span v-show="isShowIndexLabel(scope.row)">{{(scope.$index+1)}}</span>
            </template>
          </el-table-column>

          <el-table-column  label="全选"
                            type="selection"
                            width="45"
                            align="center"
                            v-if="showCheck">
          </el-table-column>
          <el-table-column v-for="(col,index) in cols"
                           :key="index+autoId"
                           :label="col.label"
                           :min-width="col.mw+'px'" >
            <template slot-scope="scope">
              <!--table列表里面的东西-->
              <component :is="getComp(col)"
                         @change="changHandler"
                         :index="scope.$index"
                         :row="scope.row"
                         :column="col"
                         :source="list"
                         :sourceIndex="col.list"
                         style="width:100%;">
              </component>

            </template>
          </el-table-column>
        </el-table>
        <!--<div class="mouse-box"  @mousedown="addTempRow"> </div>-->
      </div>
    </v-group-iwt>
    <s-loading v-show="isLoading"></s-loading>
  </div>
</template>


