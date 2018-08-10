<script>
  import Inject from "@/common/model/Inject" ;
  import DataFileMonitorPM from "../DataFileMonitorPM" ;

    export default {
      data() {
        this.viewPM = Inject.getClass(DataFileMonitorPM) ;
        this.pagePM = this.viewPM.dbPagePM ;
        return {
          viewData:this.viewPM.data,
          page:this.pagePM.data,
          pageList:this.viewPM.listPagePM.data
        }
      },
      computed: {},
      mounted() {
      },
      activated() {

      },
      methods: {
      }
    }
</script>

<style scoped lang="scss">

  .top-nav{
    flex:none;
    width:100%;
    margin-top: 5px;

    .item-box{
      flex:none;
      text-align: center;
      width:130px;
      height:52px;
      padding: 5px 5px;
      border:1px solid #c9c9c9;
      box-sizing: border-box;
      color:#333333 ;
      font-size:12px;
      margin: 5px 10px 5px 0;
      cursor: pointer;
      &:hover{
        border:1px solid #66ccff;
        background-color: #fcfcfc;
      }
      &>div{
        width:100%;
        height:100%;
      }
    }
    .item-box-sel{
      border:1px solid #66ccff;
      background-color: #fcfcfc;
    }

  }

  .sub-title{
    flex:none;
    height:30px;
    line-height:30px;
    vertical-align: middle;
    margin: 10px 0;
    font-size:13px;
    .icon{
      flex:none;
      width:3px;
      height:100%;
      background-color: #66ccff;
      margin-right: 5px;
    }
  }
  .auto-layout{
    flex:none;
    width:100%;
  }

  .panel-header{
    background-color: #f5f5f5;
    font-size:12px;
    font-weight: bold;
    padding-left: 10px;
    line-height:35px;
    vertical-align: middle;
    border-bottom: 1px solid #dddddd;
  }

  .panel-box{
    flex: none;
    width: 423px;
    height: 300px;
    position: relative;
    border-radius: 3px;
    border: 1px solid #dddddd;
    overflow: hidden;
  }

  .panel-chart {
    flex: none;
    width:45%;
    /*width:100%;*/
    height: 300px;
    position: relative;
    border-radius: 3px;
    border: 1px solid #dddddd;
    overflow: hidden;
    .panel-inner {
      position: absolute;
      left: 5px;
      right: 5px;
      top: 45px;
      bottom: 5px;
      overflow: hidden;
    }
  }

  .table-size{
    flex: none;
    width:55%;
    position:relative;
    .table-total{
      position: absolute;
      @include abs-group(20px,0,0,false) ;
      min-height:36px;
      border-radius: 3px;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      .panel-header{
        background-color: #f5f5f5;
        font-size: 12px;
        font-weight: bold;
        padding-left: 10px;
        line-height: 35px;
        vertical-align: middle;
        border-bottom: 1px solid #dddddd;
      }
      .totalCount{
        position: absolute;
        right: 10%;
        top:0;
        line-height: 36px;
        font-size: 12px;
        font-weight: bold;
      }
    }
    .panel-table {
      position: absolute;
      @include abs-group(20px,0,0,false) ;
      min-height:264px;
      border-radius: 3px;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      top: 36px!important;
      .inner{
        @include abs-group(0,45px,0,false) ;
        padding: 0;
        position: absolute;
        top: 36px;
      }
    }
  }


</style>

<template>
  <div class="tj-t-auto-inner" >
    <v-group-iwt class="layout">

      <div class="top-nav">
        <tile-group-iwt class="auto-layout" >

          <div :class="['item-box',viewData.currentType===item.value?'item-box-sel':'']"
               v-for="(item ,index) of viewData.typeList"
               :key="index"
               @click="viewPM.itemTypeClick(item)" >
              <v-group-iwt :ver="'center'" :hor="'center'" >
                <span>{{item.key}}</span>
                <span>{{item.count}}</span>
              </v-group-iwt>
          </div>

        </tile-group-iwt>
      </div>

      <h-group-iwt class="sub-title">
         <div class="icon"></div>
         <span>系统利用率</span>
      </h-group-iwt>

      <div class="auto-layout">
        <el-table
          border
          :data="page.sourceList"
          size="mini"
          min-height="100px"
          @row-click="(row)=>{this.viewPM.itemNodeClick(row)}"
          style="width:100%;height:100%;cursor: pointer;" >
          <el-table-column prop="clusterName"  label="集群名称" min-width="120" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="ip"  label="节点IP" min-width="150" :show-overflow-tooltip="true">

           <!-- <template slot-scope="scope">
              <div style="color:#409EFF;text-decoration:underline;cursor:pointer;" @click="viewPM.codeIp(scope.row)">{{ scope.row.ip}}
              </div>
            </template>-->

          </el-table-column>
          <el-table-column  prop="cpu" label="CUP负载" min-width="74">
          </el-table-column>
          <el-table-column  prop="usedMemory"  label="内存使用" min-width="110">
          </el-table-column>
          <el-table-column  prop="usedDisk"  label="磁盘使用" min-width="90" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
      </div>
      <v-gap-iwt></v-gap-iwt>
      <h-group-iwt :hor="'center'" style="width:100%">
        <el-pagination background
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="page.totalIndex"
                       :page-sizes="page.pageSizes"
                       :page-size="page.pageSize"
                       @size-change="(val)=>{this.pagePM.pageSizeChange(val)}"
                       @current-change="(val)=>{this.pagePM.currentPageChange(val)}">
        </el-pagination>
      </h-group-iwt>

      <h-group-iwt class="sub-title">
        <div class="icon"></div>
        <span>运行情况{{viewData.currentIp?(' ('+viewData.currentIp+')'):''}}</span>
      </h-group-iwt>

      <div class="auto-layout">

        <h-group-iwt class="auto-layout" :ver="'start'">

          <div class="panel-chart">

            <div class="panel-header">
              <span>CPU周趋势图</span>
            </div>

            <div class="panel-inner"
                 v-bind:id="viewData.autoId" >
            </div>

          </div>


          <div class="table-size">

            <div class="table-total">
              <div class="panel-header">
                <span>表总数</span>
              </div>
              <div class="totalCount">
                <span>{{viewData.totalBiao}} 个</span>
              </div>
            </div>

            <div class="panel-table" >
              <div class="panel-header">
                <span>表清单</span>
              </div>
              <div class="inner" >

                <div class="auto-layout">
                  <el-table
                    border
                    :data="pageList.sourceList"
                    size="mini"
                    min-weight="100%"
                    height="180">
                    <el-table-column prop="db"  label="库名">
                    </el-table-column>
                    <el-table-column  prop="tableName" label="表名">
                    </el-table-column>
                  </el-table>
                </div>

                <v-gap-iwt></v-gap-iwt>
                <h-group-iwt :hor="'center'" style="width:100%">
                  <el-pagination background
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="pageList.totalIndex"
                                 :page-sizes="pageList.pageSizes"
                                 :page-size="pageList.pageSize"
                                 @size-change="(val)=>{this.viewPM.listPagePM.pageSizeChange(val)}"
                                 @current-change="(val)=>{this.viewPM.listPagePM.currentPageChange(val)}">
                  </el-pagination>
                </h-group-iwt>

              </div>
            </div>
          </div>

        </h-group-iwt>

      </div>

      <v-gap-iwt></v-gap-iwt>
    </v-group-iwt>

    <s-loading :fixed="true" v-show="viewData.isLoading || page.isLoading "></s-loading>
  </div>
</template>
