<script>
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;

  export default {
    components:{ },
    data() {
      return {
        isLoading:false,
        isOpen:false,
        tableName:"", //当前标注的表名
        fieldList:[] //表字段列表
      }
    },
    mounted(){
    },
    methods:{

      /**
       * 关闭窗口
       */
      closeWin(){
        this.isOpen = false ;
      },

      /**
       * 弹出注释窗口
       * @param item
       */
      open( value ){
        this.isOpen = true ;

        //当前操作表名
        this.tableName = value.tableName ;
        this.fieldList = [] ;

        //test
        //this.fieldList = this.testHandler();

        //查询所有的表字段
        this.isLoading = true ;
       /* DataStorageAPI.queryTableFields({dataResourceId:value.id}).then(
          (result)=>{
            this.isLoading = false ;
            this.fieldList = result.data.list ;
          },
          ()=>{
            this.isLoading = false ;
          }
        ) ;*/
        DataStorageAPI.queryTableFieldsNew({id:value.id}).then(
          (result)=>{
            this.isLoading = false ;
            this.fieldList = result.data.list ;
          },
          ()=>{
            this.isLoading = false ;
          }
        )
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
            columnRename: "",//字段别名
            comment: "",//字段描述
            dataResourceId:""//资源表id
          });
          _sendData.push(_item);
        });

        //保存数据
        this.isLoading = true ;
        DataStorageAPI.saveTableMarker(_sendData).then(
          (result)=>{
            this.isLoading = false ;
            this.$message.success("操作成功！") ;
            this.closeWin();
          },
          ()=>{
            this.isLoading = false ;
          }
        ) ;
      },

      /**
       * 测试数据
       */
      testHandler(){
        return NormalUtils.createTestData({
          id: "dfd",
          columnName: "dfdf",//字段名
          columnStyle: "dfd",//字段类型
          columnLength: "dfd",//字段长度
          columnRename: "df",//字段别名
          comment: "df",//字段描述
          dataResourceId:"dfdf"//资源表id
        },2) ;
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
             :visible.sync="isOpen"
             :modal='true'
             :close-on-click-modal='false'>

    <div class="tj-rel-inner tj-popwin-nor win-size"  >
      <div class="tj-abs-inner"  >

        <div class="tj-popwin-body" style="bottom:50px;" >
          <div style="width:100%;height:100%;">
            <el-table border  stripe
                      :data="fieldList"
                      style="width:100%;height:100%;"
                      height="100%"
                      size="mini"
                      max-height="100%" >
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
              <el-button type="primary" @click="()=>{submit()}">保存</el-button>
              <el-button type="warning" @click="()=>{closeWin()}">关闭</el-button>
            </h-group-iwt>
          </div>

        <!--loading-->
        <s-loading v-show="isLoading"></s-loading>
        </div>
      </div>
  </el-dialog>
</template>


