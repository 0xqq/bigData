<script>
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;
  import FormPopWin from "@/common/comps/normal/FormPopWin";

  export default {
    mixins:[FormPopWin],
    components:{ },
    data() {
      return {
        tableName:"", //当前标注的表名
        fieldList:[] //表字段列表
      }
    },
    created(){
    },
    methods:{

      initMarkForm(){
        this.initData({
          tableName:"", //当前标注的表名
          fieldList:[] //表字段列表
        }) ;
      },

      /**
       * 弹出注释窗口
       * @param item
       */
      doOpen( item ,options ){

        this.initMarkForm() ;

        //当前操作表名
        this.tableName = item.tableName ;
        this.fieldList = [] ;

        //查询所有的表字段
        this.query({dataResourceId:item.id},
          (result)=>{
            let _list = this.getResultList(result) ;
            if(_list)
              this.fieldList = _list ;
          },
          null,DataStorageAPI.queryTableFields) ;
      },


      /**
       * 保存注释
       */
      submit() {
        if (!this.fieldList || this.fieldList.length === 0)
          return;

        let _sendData = [];
        this.fieldList.forEach((item) => {
          let _item = NormalUtils.copySimpleAtt(item, {
            id: "",
            columnName: "",//字段名
            columnStyle: "",//字段类型
            columnLength: "",//字段长度
            columnRename: "",//字段别名
            comment: "",//字段描述
            dataResourceId:""//资源表id
          });
          _sendData.push(_item);
        });

        this.query(_sendData, (result) => {
          this.popMessage("操作成功！") ;
          this.closeWin();
        }, null, DataStorageAPI.saveTableMarker);
      }
    }
  }
</script>

<style scoped>
  .win-size{
    height:300px;
  }
</style>

<template>

  <el-dialog :title="'表名：'+tableName"
             :append-to-body="true"
             :modal-append-to-body="true"
             class="big-dialong-size"
             @close="()=>{this.closeWin()}"
             :visible.sync="isPopWin"
             :modal='true'
             :close-on-click-modal='false'>

    <div class="tj-rel-inner tj-popwin-nor win-size"  >
      <div class="tj-abs-inner"  >

        <div class="tj-popwin-body" style="bottom:50px;" >
          <div style="width:100%;height:100%;">
            <el-table border
                      :data="fieldList"
                      size="mini"
                      height="100%"
                      max-height="100%"
                      style="width:100%;height:100%;">
              <el-table-column prop="columnName"  label="字段名" >
              </el-table-column>
              <el-table-column  prop="columnLength" label="字段类型(长度)" >
                <template slot-scope="scope">
                  <span>{{scope.row.columnStyle +'('+scope.row.columnLength+')'}}</span>
                </template>
              </el-table-column>
              <el-table-column  prop="columnRename"  label="字段别名" >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.columnRename"></el-input>
                </template>
              </el-table-column>
              <el-table-column  prop="description"  label="字段描述" >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.comment"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
          </div>

          <div class="tj-popwin-footer" >
            <h-group-iwt :hor="'center'"  style="width:100%;bottom:0;position:absolute;">
              <el-button type="primary" @click="()=>{this.submit()}">保存</el-button>
              <el-button type="warning" @click="()=>{this.closeWin()}">关闭</el-button>
            </h-group-iwt>
          </div>

        <!--loading-->
        <s-loading v-show="isLoading"></s-loading>
        </div>
      </div>
  </el-dialog>
</template>

