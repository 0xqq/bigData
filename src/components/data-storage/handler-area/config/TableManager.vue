<script>
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import TableManagerPM from "./TableManagerPM";
  import ConstManager from "@/common/manager/ConstManager" ;

  export default {
    components:{   ContentTitle },
    data() {
      this.viewPM = new TableManagerPM()  ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data,
        page:this.viewPM.pagePM.data,
        treeWidth:200
      }
    },

    created(){
    },

    activated() {
      this.viewPM.clearView() ;
      let query = NormalUtils.getRouteQuery(this.$route.path) ;
      if(query)
        this.viewPM.initView( query.data ,query.path) ;
      this.viewData.isShow = true ;
    },

    deactivated(){
      this.viewData.isShow = false ;
    },

    //方法
    methods: {
      /**
       * 查询类型列表
       * @param str
       * @param cback
       */
      queryCloumnType(str,cback){
        if(this.viewData.source.dbStyle==="hive")
          cback(ConstManager.hiveFieldType ) ;
        else
          cback(ConstManager.dbFieldType ) ;
      }
    }
  }

</script>

<style scoped lang="scss">

  .auto-layout{
    width:100%;
  }

  .container{
    @include abs-group() ;
    overflow: auto;

    .inner{
      @include abs-group(10px,10px,10px,false) ;

      .layout{
        @include abs-group(0,0,0,false) ;

        .header{
          flex:none;
          width:100%;
          height:40px;
          border:1px solid $form-borderColor ;
          border-radius: 3px;
          box-sizing: border-box;
          position:relative;
          .layout{
            @include abs-group() ;
          }

          .flag-icon{
            color:#6363ee;
            font-size:18px;
            margin-right: 5px;
          }

          .form-label{
            flex:none;
            margin-left: 13px;
          }
          .form-input{
            flex:1 0 auto;
            min-width:80px;
            max-width:200px;
            margin-left:5px;
          }
          .form-type{
            flex:none;
            width:100px;
            margin-left: 5px;
          }
          .form-desc{
            flex:1 0 auto;
            margin:0 10px 0 5px;
          }
          .form-btn{
            flex:none;
            margin-right: 10px;
          }
        }

        .field-table{
          flex:none;
          width:100%;
          height:160px;
          position:relative;
          margin: 10px 0 ;
          .table-inner{
            @include abs-group();
            overflow-y: auto;
            overflow-x:hidden;
          }
          .filed-btn{
            cursor: pointer;
            font-size:18px;
            color:#f56c6c;
            &:hover{
              color:red;
            }
          }
        }
        .table-view{
          flex:none;
          width:100%;
          position:relative;
          .table-inner{
            @include abs-group(0,0,0,false);
          }
        }
        .table-page{
          margin: 5px 0;
          width:100%;
          height:40px;
          border:1px solid $form-borderColor ;
          border-radius: 3px;
          box-sizing: border-box;
        }
      }
    }
  }
</style>

<template>
  <div class="container" v-bind:id="viewData.formContainerId">
    <div class="inner" >
      <v-group-iwt class="layout">

        <div class="header">
          <h-group-iwt class="layout">

            <div class="form-label">
              <i :class="['flag-icon',viewData.isPopUpdate?'el-icon-edit':'el-icon-circle-plus-outline']" ></i>
              表名：
            </div>
            <div class="form-input">
              <el-input size="mini"
                        class="auto-layout"
                        placeholder="请输入表名称"
                        v-model="viewData.tableName">
              </el-input>
            </div>
            <div class="form-type" v-show="viewData.source.dbStyle==='hive'">
              <el-select  style="width:100%"
                          v-model="viewData.tbl_type"
                          placeholder="内部表"
                          size="mini">
                <el-option v-for="item in viewData.tbTypeList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" ></el-option>
              </el-select>
            </div>
            <div class="form-label">注释：</div>
            <div class="form-desc">
              <el-input placeholder="请输入表注释内容"
                        size="mini"
                        class="auto-layout"
                        v-model="viewData.annotation"></el-input>
            </div>
            <div class="form-btn">
              <el-button type="primary"
                         size="mini"
                         title="添加字段"
                         v-show="auth['439']"
                         @click="viewPM.addField()">添加字段</el-button>
            </div>
            <div class="form-btn">
              <el-button type="primary"
                         size="mini"
                         v-if="viewData.isPopUpdate"
                         v-show="auth['438']"
                         title="保存信息"
                         @click="viewPM.submit()">保存</el-button>

              <el-button type="primary"
                         size="mini"
                         v-else
                         v-show="auth['437']"
                         title="保存信息"
                         @click="viewPM.submit()">保存</el-button>
            </div>
            <div class="form-btn"   v-show="viewData.isPopUpdate">
              <el-button size="mini"
                         type="danger"
                         v-show="auth['437']"
                         title="取消修改，进行添加"
                         @click="viewPM.cancleAdd()" >取消</el-button>
            </div>
            <div style="flex:auto;"></div>
            <div style="margin-right:10px;">
              <el-button type="warning"
                         size="mini"
                         @click="viewPM.changeBackMain()">返回</el-button>
            </div>
          </h-group-iwt>
        </div>

        <div class="field-table">
          <el-table border  stripe
                    size="mini"
                    :stripe="true"
                    :data="viewData.tableFields"
                    max-height="100%"
                    height="100%" >
            <el-table-column prop="columnName"  label="名称" min-width="80px" >
              <template slot-scope="scope">
                <input  type="text"  class="tj-transparent-input"
                        v-model="scope.row.columnName"
                        @change="viewPM.fieldAttChange(scope.row,'columnName')">
              </template>
            </el-table-column>

            <el-table-column  prop="columnStyle" label="类型" min-width="120px" >
              <template slot-scope="scope">
                <div style="width:100%;height:30px;overflow: hidden;position:relative;border-radius:3px;">
                  <div style="left:-3px;right:-3px;top:-1px;bottom:-3px;position:absolute;">
                    <el-autocomplete  v-model="scope.row.columnStyle"
                                      style="width:100%;height:100%;"
                                      size="small"
                                      :fetch-suggestions="queryCloumnType"
                                      @change="viewPM.fieldAttChange(scope.row,'columnStyle')" >
                    </el-autocomplete>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column  prop="columnLength"  label="长度"  min-width="80px" >
              <template slot-scope="scope">
                <div style="width:100%;height:28px;position:relative;overflow: hidden;">
                  <div style="left:-2px;right:-2px;top:-1px;bottom:-2px;position:absolute;overflow: hidden;">
                    <el-input-number size="small" controls-position="right"
                                     :min="1"
                                     @change="viewPM.fieldAttChange(scope.row,'columnLength')"
                                     v-model="scope.row.columnLength"
                                     style="width:100%;">
                    </el-input-number>
                  </div>
                </div>
                <!---->
                <!--<input  type="text"-->
                        <!--class="tj-transparent-input"-->
                        <!--v-model="scope.row.columnLength"-->
                        <!--@change="viewPM.fieldAttChange(scope.row,'columnLength')">-->
              </template>
            </el-table-column>
            <el-table-column prop="columnRename"  label="中文别名"  min-width="80px" >
              <template slot-scope="scope">
                <input  type="text"  class="tj-transparent-input"
                        v-model="scope.row.columnRename"
                        @change="viewPM.fieldAttChange(scope.row,'columnRename')">
              </template>
            </el-table-column>
            <el-table-column  prop="comment"  label="注释"  min-width="80px" >
              <template slot-scope="scope">
                <input  type="text"
                        class="tj-transparent-input"
                        v-model="scope.row.comment"
                        @change="viewPM.fieldAttChange(scope.row,'comment')">
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="80"  v-if="auth['4310']">
              <template slot-scope="scope">

                <i class="el-icon-error filed-btn"
                   title="删除"
                   v-if="auth['4310']"
                   @click="viewPM.removeField(scope.row)"></i>

              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="field-page">
        </div>

        <div class="table-view">
          <el-table border  stripe
                    size="mini"
                    :stripe="true"
                    :data="page.sourceList"
                    style="width:100%;min-height:150px;">
            <el-table-column prop="tableName"  label="表名" ></el-table-column>
            <el-table-column  prop="annotation" label="描述" ></el-table-column>
            <el-table-column  prop="createdDate"  label="创建时间"  width="145px"></el-table-column>
            <el-table-column  prop="modifiedDate"  label="修改时间" width="145px"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="65" >
              <template slot-scope="scope">
                <el-button type="text" size="mini"
                           @click="viewPM.nodeItemClick(scope.row)" >编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="table-page" v-show="page.totalIndex>10?true:false">
          <h-group-iwt :hor="'center'"
                       class="auto-layout">
            <el-pagination background
                           layout="sizes,prev, pager,next"
                           :total="page.totalIndex"
                           :page-sizes="page.pageSizes"
                           :page-size="page.pageSize"
                           @size-change="(val)=>{this.viewPM.pagePM.pageSizeChange(val)}"
                           @current-change="(val)=>{this.viewPM.pagePM.currentPageChange(val)}">
            </el-pagination>
          </h-group-iwt>
        </div>

      </v-group-iwt>
    </div>

    <!--loading-->
    <s-loading v-show="viewData.isLoading"></s-loading>
  </div>
</template>

