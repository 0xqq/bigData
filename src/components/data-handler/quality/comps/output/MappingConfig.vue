<script>
  import HBaseTableNameTwo from "../form-item/HBaseTableNameTwo";
  import TextInput from "../form-item/TextInput";
  import DataGrid from "../form-item/DataGrid";
  import ComboBox from "@/common/comps/normal/form/ComboBox" ;
  import ProcessAPI from "@/common/service/ProcessAPI" ;
  import TaskManagerPM from "../../TaskCreatePM";
  import Inject from "@/common/model/Inject" ;

  export default {
    components: {
      DataGrid,
      TextInput,
      HBaseTableNameTwo,
      ComboBox
    },
    props: {
      'label': {default: ""},
      'data': {},
      "owner":{},
      'desc':{default:""}
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
        },{
          date: '2016-05-02',
          name: '王小虎',
        }, {
          date: '2016-05-04',
          name: '王小虎',
        }],
        "fileNameInField":{value:""},
        "fileNameField":{value:""},
        gridData:{
          value:"",label:"",params:{
             col:[
               {name:"alias",label:"Alias",type:"TextInput"},
               {name:"key",label:"Key",type:"ComboBox",params:{list:[{label:"Y",value:"Y"},{label:"N",value:"N"}]}},
               {name:"column_family",label:"Column family",type:"ComboBox",params:{list:[

                   ]}
               },
               {name:"column_name",label:"Column name",type:"TextInput"},
               {name:"type",label:"Type",type:"ComboBox",params:{list:[
                     {label:"String",value:"String"},
                     {label:"Integer",value:"Integer"},
                     {label:"Double",value:"Double"},
                     {label:"Float",value:"Float"},
                     {label:"Boolean",value:"Boolean"},
                     {label:"Date",value:"Date"},
                     {label:"BigNumber",value:"BigNumber"},
                     {label:"Binary",value:"Binary"}
                   ]}},
               {name:"indexed_values",label:"Indexed values",type:"TextInput"}
             ]
          }
        },
        dataProvider: [],
        vmodeData: "",
        dataProviderTwo:[
          {label:"Y",value:"Y"},{label:"N",value:"N"}
        ],
        vmodeDataTwo:"",
        dataProviderThree:[
        ],
        vmodeDataThree:"",
        dataProviderFour:[
          {label:"String",value:"String"},
          {label:"Integer",value:"Integer"},
          {label:"Double",value:"Double"},
          {label:"Float",value:"Float"},
          {label:"Boolean",value:"Boolean"},
          {label:"Date",value:"Date"},
          {label:"BigNumber",value:"BigNumber"},
          {label:"Binary",value:"Binary"}
        ],
        vmodeDataFour:"",
        tableAllCount:''
      }
    },

    mounted() {
      this.initData();
      this.ownerPM = Inject.getClass(TaskManagerPM);//先走功能 后面整理 temp?
    },

    watch: {
      data: function () {
        this.initData();
      }
    },

    computed: {},

    methods: {
      initData() {
        this.dataProvider = [];
        this.vmodeData = "";
        if (!this.data)
          return ;
        if(this.data.desc )
          this.desc = this.data.desc ;
        if (this.data)
          this.vmodeData = this.data.value;
        /*this.queryCluster() ;*/
      },
      //点击表二第二个值后面按钮
      getMappingName(){
        //获取表一第一个值
        let cluster_name = JSON.parse(sessionStorage.getItem('clusterVa'));
        //获取表二第一个值
        let table_name = JSON.parse(sessionStorage.getItem('hbaseVa'));
        let models = {
          model:{
            cluster_name:cluster_name,
            table_name:table_name
          }
        };
        ProcessAPI.queryNamedMappings(models).then(
          (result)=>{
            let list = result.data.hbaseTableMapping;
            let arr = [] ;
            for(let item of list ){
              arr.push({label:item.name,value:item.name}) ;
            }
            this.dataProvider = arr ;
          },
          ()=>{
          }
        ) ;
      },
      //获取列簇数据
      getQueryCluster(){
        //获取表一第一个值
        let cluster_name = JSON.parse(sessionStorage.getItem('clusterVa'));
        //获取表二第一个值
        let table_name = JSON.parse(sessionStorage.getItem('hbaseVa'));
        let models = {
          model:{
            cluster_name:cluster_name,
            table_name:table_name,
          }
        };
        ProcessAPI.queryClusterData(models).then(
          (result)=>{
            let list = result.data.hbaseCluster;
            let arr = [] ;
            for(let item of list ){
              arr.push({label:item.name,value:item.name}) ;
            }
            this.dataProviderThree = arr;
          },
          ()=>{
          }
        ) ;
      },

      changeHandler(value) {
        //建立表二第二个值
        console.log(value);
        sessionStorage.setItem('biaoTwot',JSON.stringify(value));
        if (!this.data)
          return;
        this.vmodeData = value ;
        this.data.value = this.vmodeData;
        this.getTableCount();

      },
      changeHandlerTwo(){
        let arrTwo = [
          {label:"Y",value:"Y"},
          {label:"N",value:"N"}
        ];
        this.dataProviderTwo = arrTwo;
      },
      //获取列簇Column family
      changeHandlerThree(){

      },
      changeHandlerFour(){

      },

      //获取整个列表的内容
      getTableCount(){
        //获取表一第一个值
        let cluster_name = JSON.parse(sessionStorage.getItem('clusterVa'));
        //获取表二第一个值
        let table_name = JSON.parse(sessionStorage.getItem('hbaseVa'));
        //获取表二第二个值
        let mapping_name =JSON.parse(sessionStorage.getItem('biaoTwot'));
        let models = {
          model:{
            cluster_name:cluster_name,
            table_name:table_name,
            mapping_name:mapping_name
          }
        };
        ProcessAPI.queryNamedHbsaeMapp(models).then(
          (result)=>{
            let list =  result.model.hbaseMapping.mapped_columns;
            this.tableData = list;
            this.tableAllCount = result.model.hbaseMapping;
            /*console.log(this.gridData);*/
            sessionStorage.setItem('arrTable',JSON.stringify(list));
          },
          ()=>{
          }
        ) ;
      },
      //保存按钮！
      saveBtn(){
        let cluster_name = JSON.parse(sessionStorage.getItem('clusterVa'));
        //获取表二第一个值
        let table_name = JSON.parse(sessionStorage.getItem('hbaseVa'));
        //获取表二第二个值
        let mapping_name =JSON.parse(sessionStorage.getItem('biaoTwot'));
        let models = {
          model:{
            cluster_name:cluster_name,
            table_name:table_name,
            mapping_name:mapping_name,
            mapping:this.tableAllCount
          }
        };
        ProcessAPI.querySaveHbase(models).then(
          (result)=>{
            console.log('1')
          },
          ()=>{
          }
        ) ;
      },
      //删除按钮
      deleteBtn(){
        //获取表一第一个值
        let cluster_name = JSON.parse(sessionStorage.getItem('clusterVa'));
        //获取表二第一个值
        let table_name = JSON.parse(sessionStorage.getItem('hbaseVa'));
        //获取表二第二个值
        let mapping_name =JSON.parse(sessionStorage.getItem('biaoTwot'));
        let models = {
          model:{
            cluster_name:cluster_name,
            table_name:table_name,
            mapping_name:mapping_name
          }
        };
        ProcessAPI.queryDeleteHbase(models).then(
          (result)=>{
            console.log('2')
          },
          ()=>{
          }
        ) ;
      },
      //表二最后一个按钮
      queryList() {
          this.queryProssCols();
      },
      queryProssCols() {
        let _this = this;
        this.setLoading(true);

        //组装临时模型数据
        let currentNode = this.ownerPM.getCurrentNode();

        let saveData = this.ownerPM.getSaveData(false);
        if (!saveData) {
          _this.$emit("result",[]);
          return;
        }

        //获取表一第一个值
        let cluster_name = JSON.parse(sessionStorage.getItem('clusterVa'));
        //获取表二第一个值
        let table_name = JSON.parse(sessionStorage.getItem('hbaseVa'));

        //设置当前步骤名称
        saveData.model["step_name"] = currentNode.data.name;
        saveData.model["cluster_name"] = cluster_name;
        saveData.model["table_name"] = table_name;
        let _name = currentNode.data.name;
        Object.assign(saveData,{name:_name});
        //获得字段
        ProcessAPI.queryIncomingFields(saveData).then(
          (result) => {
            // let result = this.testData() ;
            let list = result.model.hbaseMappingMould.mapped_columns;
            this.tableData = list;
            this.setLoading(false);
            let columns = this.initList(result.model.hbaseMappingMould.mapped_columns,"name","name") ;
            // let columns = this.initColData(_list) ;

            NormalUtils.showObjStr(columns) ;

            this.$emit("result", {type:"col",list:columns});
          },
          () => {
            this.setLoading(false);
            this.$emit("result",  {type:"col",list:[]});
          }
        );
      },
      queryTableCols() {
        if (!this.data || !this.data.get)
          return;

        let send = {} ;
        if(this.data.get.param ){
          send = NormalUtils.copyObjectAtt(this.data.get.param,send,true) ;
          for(let att in send){
            if((send[att]+"").indexOf("$")>-1){
              let itemf = send[att].substring(1,send[att].length) ;
              send[att] = FormItemUtils.getFormData(this.owner, itemf );
            }
          }
        }
        else {
          let tid = FormItemUtils.getFormData(this.owner, "tableId");
          send = {dataResourceId: tid};
        }

        this.setLoading(true);
        let _this = this;
        ProcessAPI.queryTableFields(send).then(
          (result) => {
            this.setLoading(false);
            let _list = this.initList(result.data.list,"columnName","columnName") ;
            _list = this.initColData(_list) ;
            _this.$emit("result", {type:"table",list:_list});
          },
          () => {
            this.setLoading(false);
            _this.$emit("result",{type:"table",list:[]});
          }
        );
      },
      initList(list,nameAtt,valueAtt){
        let _arr = [] ;
        for(let item of list ){
          let colItem = {label:item[nameAtt],value:item[valueAtt],data:item} ;
          _arr.push(colItem) ;
        }
        return _arr ;
      },
      initColData(arr){
        if(!arr)
          return [] ;

        let query = this.data.get;
        if(query.hasOwnProperty("nameField") ){
          let nclos = query.nameField ;
          for(let itemData of arr){
            for(let att of nclos){
              if(itemData.hasOwnProperty(att.f))
                itemData[att.t] = itemData[att.f] ;
            }
          }
        }
        return arr ;
      },
      setLoading(loading) {
        this.$emit("loading", loading);
      },
    }
  }
</script>

<template>
  <!--文件-->
  <div width="100%" >

    <v-group-iwt style="width:100%;">
      <!--调用组件1-->
      <h-base-table-name-two></h-base-table-name-two>
      <v-gap-iwt></v-gap-iwt>
      <!--<text-input label="Mapping name"></text-input>-->
      <h-group-iwt style="width:100%;height:30px;">
        <div class="tj-diy-form-item-lb">Mapping name：</div>
        <combo-box style="width:100%"
                   @change="changeHandler"
                   :labelField="'label'"
                   :valueField="'value'"
                   :valueData="vmodeData"
                   :dataProvider="dataProvider">
        </combo-box>
        <div v-if="desc" class="tj-diy-form-item-desc" :title="desc" > </div>
        <el-button type="primary" size="mini" @click="getMappingName">Get Mapping name</el-button>
      </h-group-iwt>

      <v-gap-iwt></v-gap-iwt>
      <!--调用组件2 table列表内容-->
      <!--<data-grid :data="gridData"></data-grid>-->

      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>

        <el-table-column align="center" label="Alias">
          <template scope="scope">
            <el-input size="small" v-model="scope.row.alias"></el-input>
          </template>
        </el-table-column>

        <el-table-column align="center" label="key">
          <template scope="scope">
            <combo-box style="width:100%"
                       @change="changeHandlerTwo"
                       :labelField="'label'"
                       :valueField="'value'"
                       :valueData="vmodeDataTwo"
                       :dataProvider="dataProviderTwo">
            </combo-box>
            <div v-if="desc" class="tj-diy-form-item-desc" :title="desc" > </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Column family">
          <template scope="scope">
            <combo-box style="width:100%"
                       @change="changeHandlerThree"
                       :labelField="'label'"
                       :valueField="'value'"
                       :valueData="vmodeDataTwo"
                       :dataProvider="dataProviderThree">
            </combo-box>
            <div v-if="desc" class="tj-diy-form-item-desc" :title="desc" > </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Column name">
          <template scope="scope">
            <el-input size="small" v-model="scope.row.column"></el-input>
          </template>
        </el-table-column>

        <el-table-column align="center" label="type">
          <template scope="scope">
            <combo-box style="width:100%"
                       @change="changeHandlerFour"
                       :labelField="'label'"
                       :valueField="'value'"
                       :valueData="vmodeDataTwo"
                       :dataProvider="dataProviderFour">
            </combo-box>
            <div v-if="desc" class="tj-diy-form-item-desc" :title="desc" > </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Indexed values">
          <template scope="scope">
            <el-input size="small" v-model="scope.row.index"></el-input>
          </template>
        </el-table-column>

      </el-table>

      <v-gap-iwt></v-gap-iwt>
      <!--三个按钮选项-->
      <h-group-iwt style="width:100%;">
        <el-button  type="primary" size="mini" @click="saveBtn">Save mapping</el-button>
        <h-gap-iwt></h-gap-iwt>
        <el-button  type="primary" size="mini" @click="deleteBtn">Delete mapping</el-button>
        <div style="flex:1 1 ;"></div>
        <el-button  type="primary" size="mini" @click="getQueryCluster">Get Column family</el-button>
        <h-gap-iwt></h-gap-iwt>
        <el-button type="primary" size="mini" @click="queryList">Get incoming fields</el-button>
      </h-group-iwt>

    </v-group-iwt>

  </div>
</template>

<style scoped>

</style>
