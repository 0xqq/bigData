<script>

  export default {
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
</style>

<template>
     <v-group-iwt style="width:100%;">
        <!--control btn-->
        <div style="width:100%;">
          <h-group-iwt style="width:100%;" :hor="'end'">
            <el-button type="primary" size="mini" :disbaled="true" >下载资源</el-button>
          </h-group-iwt>
        </div>
        <v-gap-iwt></v-gap-iwt>

        <!--tabale-->
        <div style="width:100%;" >
          <el-table
            size="mini"
            border  stripe
            style="width:100%;" >
            <el-table-column  label="全选" type="selection"  width="55">
            </el-table-column>
            <el-table-column prop="dbName"  label="库名" width="100">
            </el-table-column>
            <el-table-column prop="tableName"  label="表名" width="100">
            </el-table-column>
            <el-table-column  prop="dataResourceName" label="资源名称" width="120">
            </el-table-column>
            <el-table-column  prop="orgName"  label="部门名称" width="120">
            </el-table-column>
            <el-table-column  prop="resourceStyle"  label="资源类型" width="80">
            </el-table-column>
            <el-table-column  prop="theme"  label="主题" width="100">
            </el-table-column>
            <el-table-column  prop="shareWay"  label="共享方式" width="120">
            </el-table-column>
            <el-table-column  prop="sensitiveLevel"  label="敏感等级" width="120">
            </el-table-column>
            <el-table-column  prop="gatheringWay"  label="汇聚方式"  width="130"  >
            </el-table-column>
            <el-table-column  prop="modifiedDate"  label="更新时间" width="130" >
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="200" >
              <template slot-scope="scope">
                <el-button type="text" size="mini"  >下载</el-button>
                <el-button type="text" size="mini"  >预览</el-button>
                <el-button type="text" size="mini"  >交换</el-button>
                <el-button type="text" size="mini"  >接口查询</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div style="height:10px;"></div>
       <div style="height:10px;"></div>
       <h-group-iwt :hor="'center'" style="width:100%">
         <el-pagination background
           layout="total, sizes, prev, pager, next, jumper" >
         </el-pagination>
       </h-group-iwt>

        <v-gap-iwt :g="5"></v-gap-iwt>
     </v-group-iwt>
</template>
