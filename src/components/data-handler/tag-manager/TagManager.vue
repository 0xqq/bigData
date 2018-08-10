<script>
  import ContentTitle from "@/common/comps/normal/ContentTitle";
  import proAdd from "./AddTable"
  import proAdds from "./AddTableChild"
  import TagManagerAPI from   "@/common/service/TagManagerAPI"
  import FieldMarkWin from "../../data-import/out-data/assets/FieldMarkWin" ;
  import TreeGridName from "@/common/comps/normal/grid/TreeGridName" ;
  import TreeGridData from "@/common/comps/normal/grid/TreeGridData" ;
  import TagManagerMarker from "./TagManagerMarker" ;
  import ModelLocator from "@/common/model/ModelLocator" ;

  export default  {
    components: {ContentTitle, proAdd, proAdds,TreeGridName,TagManagerMarker},
    data() {
      this.treeGridData = new TreeGridData() ;
      this.modell = ModelLocator.getInstance() ;
      return {
        auth:AuthManager.has,
        isLoading:false,
        treeData:this.treeGridData.data,
        currentView: "",
        dialogVisible: false,
        dialogFormVisible:false,
        typeList:[{label:"公共标签",value:"public"},{label:"用户标签",value:"private"}],
        listData: [],
        tagType:"public",
        user:this.modell.loginUser,
        controlCol:[]
      }
    },
    mounted() {
      if(AuthManager.has['519'])
        this.currentView = "label" ;
      else  if(AuthManager.has['521'])
        this.currentView = "marker" ;

      this.refreshControl() ;
      this.queryList();
    },
    methods: {
      refreshControl(){
        if(this.tagType==="public" && !this.user.isAdmin)
          return this.controlCol=[] ;
        return this.controlCol = [{label:"private"}] ;
      },

      queryList() {
        this.isLoading = true;
        TagManagerAPI.queryDataTagList({tagType: this.tagType})
          .then(res => {
              this.isLoading = false;
              this.listData = res.resultdata;
              var jsonData = this.listData
              console.log(jsonData)

              //解析数据集
              function transData(a, idStr, pidStr, chindrenStr) {
                var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
                for (; i < len; i++) {
                  hash[a[i][id]] = a[i];
                }
                for (; j < len; j++) {
                  var aVal = a[j], hashVP = hash[aVal[pid]];
                  if (hashVP) {
                    !hashVP[children] && (hashVP[children] = []);
                    hashVP[children].push(aVal);
                  } else {
                    r.push(aVal);
                  }
                }
                return r;
              }

              //转换日期格式
              for (let itemData of jsonData) {
                itemData.time = NormalUtils.dateFormat(parseInt(itemData.time));
              }
              var jsonDataTree = transData(jsonData, 'tid', 'parent_id', 'children');
              //交给控制类处理数据
              this.treeGridData.setGridData(jsonDataTree);
            },
            () => {
              this.isLoading = false;
            }
          );
      },

      showParen(){
        this.$refs["ds"].open();
      },
      showParens(){
        this.$refs["markerWin"].dialogFormVisible = true
        },
      addMasge(){
        this.$refs["ds"].submitInfo()
      },
      rowClick(row,event,column){
          console.log(row)
      },
      popMarkerWin( val ){
        this.$refs["markerWin"].open(val) ;

      },
      //删除按钮
      deletMarker(item){
        TagManagerAPI.queryDeleteTag({
          id:item.tid
        }).then(
          (result)=>{
            this.queryList();
          },
          ()=>{

          }
        )
      },
      /*--------------------------------------------------------------zc ----------------*/
      handleClick(){
        this.refreshControl() ;
        this.queryList();
      }
    }
  }
</script>
<style scoped lang="scss">

  .container{
    @include abs-group(10px,0,10px,0) ;

    .layout{
      @include abs-group() ;
      >div{
        width:100%;
      }

      .head-nav{
        flex:none;
        height:40px;
        .head-nav-btn{
          margin: 0px 5px;
        }
      }

      .content-box{
        flex:auto;
        position:relative;

        .content-layout{
          @extend .tj-t-c-layout;
          @include abs-group(5px,0,5px,0) ;
        }

      }
    }
  }

  .nav-view{
    @include tab-card() ;
    margin-top: 10px;
    position:relative;
    .nav-box{
      @include tab-card-box() ;
      @include abs-group() ;
    }
    .nav-inner{
      @include abs-group(0,0,0,-2px) ;
      overflow: hidden;
    }
    .head-nav-control{
      @include abs-group(false,0,10px,0) ;
    }
  }
</style>

<template>
  <div class="container">
    <v-group-iwt class="layout">

     <!-- <content-title title="资源标签"></content-title>-->
        <!--nav-->
        <div class="head-nav">
          <div class="head-nav-btn">
            <el-tabs v-model="currentView" >
              <el-tab-pane label=" 标签管理" name="label" v-if="auth['519']" >
                <span slot="label"><i class="iconfont tj-biaoqian1 iconbtn"></i> 标签管理</span>
              </el-tab-pane>
              <el-tab-pane label=" 打标签" name="marker" v-if="auth['521']" >
                <span slot="label"><i class="iconfont tj-biaoqian iconbtn"></i> 打标签</span>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      <v-gap-iwt></v-gap-iwt>
      <div class="content-box" v-show="currentView==='label'">
        <v-group-iwt class="content-layout">

          <div class="nav-view">
            <div class="nav-inner">
             <!-- <div class="nav-box"
                   v-if="user.isAdmin===true"></div>-->
              <el-tabs v-model="tagType"
                       type="border-card"
                       @tab-click="handleClick"
                       v-show="user.isAdmin">
                <el-tab-pane label=" 公用标签" name="public" >
                  <span slot="public"><i class="iconfont tj-biaoge iconbtn"></i> 公用标签</span>
                </el-tab-pane>
                <el-tab-pane label=" 用户标签" name="private"  >
                  <span slot="private"><i class="iconfont tj-weibiaoti5 iconbtn"></i> 用户标签</span>
                </el-tab-pane>
              </el-tabs>
             <!-- v-show="(user.isAdmin && tagType==='public')||(!user.isAdmin && tagType==='private')"-->
              <h-group-iwt class="head-nav-control">
                <el-button type="primary"
                           size="mini"
                           v-if="auth['520']"
                           v-show="user.isAdmin && (tagType==='public' || tagType==='private')"
                           @click="showParen">添加</el-button>
              </h-group-iwt>
            </div>
          </div>

          <div class="table-view">
            <div class="table-inner">
              <el-table
                :data="treeData.sourceList"
                border  stripe
                size="mini"
                style="width:100%;"
                height="100%"
                max-height="100%">

                <el-table-column prop="tname" label="标签名称" min-width="250">
                  <template slot-scope="scope">
                    <tree-grid-name style="width:100%" :row-data="scope.row"
                                    :show-label="scope.row.tname"
                                    :icon-node="'iconfont tj-biaoqian1'"
                                    @close="treeGridData.close(scope.row)"
                                    @open="treeGridData.open(scope.row)">
                    </tree-grid-name>
                  </template>
                </el-table-column>

                <el-table-column  prop="tdesc" label="标签描述" width="300">
                </el-table-column>

                <el-table-column prop="time" label="创建时间" width="200">
                </el-table-column>

                <el-table-column v-for="(item,index) in controlCol"
                                 :key="index"
                                 label="操作"
                                 v-if="auth['520']">
                  <template slot-scope="scope">
                    <el-button type="text "
                               size="mini"
                               v-if="auth['520']"
                               @click="popMarkerWin(scope.row)" >添加子标签</el-button>

                    <el-button type="danger"
                               size="mini"
                               v-if="auth['520']"
                               @click="deletMarker(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

        </v-group-iwt>
      </div>

      <!--打标签-->
      <tag-manager-marker v-if="currentView==='marker'">
      </tag-manager-marker>

    </v-group-iwt>

    <s-loading v-show="isLoading"></s-loading>

    <pro-add ref="ds" @click="queryList"></pro-add>
    <pro-adds ref="markerWin" @click="queryList" ></pro-adds>

  </div>
</template>
