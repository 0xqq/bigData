<script>
    import ProcessAPI from "@/common/service/ProcessAPI";
    import FormItemUtils from "@/common/utils/FormItemUtils" ;
    import TaskManagerPM from "../../TaskCreatePM" ;
    import Inject from "@/common/model/Inject" ;
    import NormalUtils from "../../../../../common/utils/NormalUtils";

    export default {
      props: {
        'data': {},
        "owner": {}
      },
      data() {
        return {}
      },
      mounted() {
        this.ownerPM = Inject.getClass(TaskManagerPM);//先走功能 后面整理 temp?
      },
      methods: {
        queryList() {
          if (!this.data || !this.data.get)
            return;
          let type = "table";
          if(this.data.get.hasOwnProperty("type"))
            type = this.data.get.type;

          if (type.indexOf("table")>-1 )
            this.queryTableCols();
          if (type.indexOf("col")>-1 )
            this.queryProssCols();
        },

        /**
         * 查询过程的列表
         */
        queryProssCols() {
          let _this = this;
          this.setLoading(true);

          let queryMethod =  ProcessAPI.queryBeforeColumns ;
          if( this.data.get.query === "hdfs")
            queryMethod =  ProcessAPI.getHdfsFields ;

          //组装临时模型数据
          let currentNode = this.ownerPM.getCurrentNode();
          let saveData = this.ownerPM.getSaveData(false);
          if (!saveData) {
            _this.$emit("result",[]);
            return;
          }

          //设置当前步骤名称
          saveData.model["step_name"] = currentNode.data.name;

          //获得字段
          queryMethod(saveData).then(
            (result) => {
              // let result = this.testData() ;
              this.setLoading(false);
              let columns = this.initList(result.data.fields,"name","name") ;
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

        /**
         * 查询表列
         */
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

        /**
         * 将返回的列表组装成 每个节点需要的格式
         * @param arr
         * @returns {*}
         */
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

        testData(){
          return {"code":"1","data":{"fields":[{"name":"v_item_info_areacode","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_areacode"},{"name":"v_item_info_is_netdone","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_is_netdone"},{"name":"v_item_info_commoncode","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_commoncode"},{"name":"v_item_info_commonname","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_commonname"},{"name":"v_item_info_zxbm","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_zxbm"},{"name":"v_item_info_bjsxmc","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_bjsxmc"},{"name":"v_item_info_sqjb","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_sqjb"},{"name":"_version_","type":"Number","length":"-","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","conversion_mask":"####0.0#########;-####0.0#########","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"_version_"},{"name":"v_item_info_ssjg","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_ssjg"},{"name":"v_item_info_delete_flag","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_delete_flag"},{"name":"v_item_info_deptid","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_deptid"},{"name":"systemid","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"systemid"},{"name":"v_item_info_areacode_sheng","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_areacode_sheng"},{"name":"v_item_info_zxsbfw","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_zxsbfw"},{"name":"v_item_info_isold","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_isold"},{"name":"v_item_info_areadetail","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_areadetail"},{"name":"v_item_info_bmfldm","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_bmfldm"},{"name":"v_item_info_sxfldm","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_sxfldm"},{"name":"v_item_info_sxxz","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_sxxz"},{"name":"v_item_info_cnsxdw","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_cnsxdw"},{"name":"v_item_info_xh","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_xh"},{"name":"v_item_info_itemcode","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_itemcode"},{"name":"v_item_info_portal_url","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_portal_url"},{"name":"infotitle","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"infotitle"},{"name":"v_item_info_itemname","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_itemname"},{"name":"infotype","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"infotype"},{"name":"v_item_info_ssjgmc","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_ssjgmc"},{"name":"v_item_info_cj","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_cj"},{"name":"v_item_info_tysxmc","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_tysxmc"},{"name":"sortname","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"sortname"},{"name":"v_item_info_zxsbfwdz","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_zxsbfwdz"},{"name":"v_item_info_sqtj","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_sqtj"},{"name":"v_item_info_update_time","type":"Number","length":"-","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","conversion_mask":"####0.0#########;-####0.0#########","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_update_time"},{"name":"v_item_info_bmfl","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_bmfl"},{"name":"uniquekey","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"uniquekey"},{"name":"v_item_info_cnsx","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_cnsx"},{"name":"v_item_info_areacode_shi","type":"String","length":"21845","precision":"-","origin":"6c6fd768af3d480888541cbcfa25663a@ITEMS_0228","storage_type":"normal","decimal_symbol":".","grouping_symbol":",","trim_type":"不去掉空格","comments":"v_item_info_areacode_shi"}]},"message":"成功获取元数据"}
        }
      }
    }
</script>

<style scoped>
</style>

<template>
    <el-button type="primary"
               size="mini"
               @click="()=>{this.queryList()}">获取字段</el-button>

</template>
