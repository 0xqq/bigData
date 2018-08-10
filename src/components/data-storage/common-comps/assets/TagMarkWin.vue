<script>
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;
  import TagManagerAPI from "@/common/service/TagManagerAPI" ;
  import FormPopWin from "@/common/comps/normal/FormPopWin";

  export default {
    mixins:[FormPopWin],
        data() {
          this.tagList = null ;//标签数据源
          this.tagMap = {} ;
          this.sourceTagList = null ;
            return {
              tagTreeData:[],//资源标签
              tagAddList:[],//资源标签
              isPopTag:false,
              tagSingleFlag:true,//是否只给一个对象打标签
              tagSourceList:[],
              tagSource:{tableName:""}
            }
        },
        mounted() {

        },
        activated() {

        },
        methods: {
          /**
           * 打标签
           */
          initTagForm(){
            this.tagList = null ;//标签数据源
            this.tagMap = {} ;
            this.sourceTagList = null ;
            this.initData({
              tagTreeData:[],//资源标签
              tagAddList:[],//资源标签
              isPopTag:false,
              tagSingleFlag:true,//是否只给一个对象打标签
              tagSourceList:[],
              tagSource:{}

            }) ;
          },

          /**
           * 打标签
           * @param item
           */
          doOpen(value,options){
            this.initTagForm() ;
            if(Array.isArray(value)) {
              this.tagSourceList = value ;
              this.tagSingleFlag = false ;
            }
            else{
              this.tagSource = value ;
              this.querySourceTag();
            }
            //查询标签库
            this.queryTagTree() ;
          },

          /**
           * 查询标签树
           */
          queryTagTree() {
            this.query({}, (result) => {
              this.tagList = result.resultdata;//tid tname  tdesc parent_id
              NormalUtils.getSelectIndex(this.tagList,"1","tid",true) ;
              this.tagMap = {} ;
              for(let item of  this.tagList){
                item.selected = false ;
                item.id = item.tid ;//转换为本地属性  别的逻辑就不改了
                item.name = item.tname ;
                item.parentId = item.parent_id ;
                this.tagMap[item.id] = item ;
              }

              //初始化选中状态
              if(this.tagSingleFlag)
                this.initTagSelected() ;

              //解析树结构
              let tree = NormalUtils.initListToTree(this.tagList,"id","parentId");

              //添加一个级别标识
              NormalUtils.travelTree(tree,(item,level)=>{
                item.level = level;
                item.levelStyle= level ;
                if(item.level>4)
                  item.levelStyle = "mini" ;
              }) ;
              this.tagTreeData = tree ;
            }, null, TagManagerAPI.queryTagList);
          },

          /**
           * 查询某个资源已经打的标签
           */
          querySourceTag(){
            this.query({id:this.tagSource.id}, (result) => {
              let _list = result.data;
              let _select = [] ;
              for(let item of _list ){
                _select.push({id:item.labelId }) ;
              }
              this.sourceTagList = _select ;
              this.initTagSelected() ;
            }, null, DataStorageAPI.querySourceTag);
          },


          /**
           * 初始化选中状态
           */
          initTagSelected(){
            if(!this.tagSingleFlag || !this.sourceTagList ||  !this.tagList  )
              return ;

            let _arr = [] ;
            for(let tag of this.sourceTagList){
              if(this.tagMap.hasOwnProperty(tag.id)){
                let node = this.tagMap[tag.id] ;
                node.selected = true ;
                _arr.push(node) ;
              }
              else {
                tag.levelStyle = "";
                _arr.push(tag) ;
              }
            }
            this.tagAddList = _arr ;
          },

          /**
           * 删除某个资源
           * @param source
           */
          removeTagSource(source){
            if(this.tagSourceList.length===1){
              this.popMessage("至少需要保留一个资源！") ;
              return ;
            }
            NormalUtils.getSelectIndex(this.tagSourceList,source.id,"id",true) ;
          },

          /**
           * 某个标签选中
           * @param node
           */
          tagItemSelect(node,isToggle=false){
            if(isToggle)
              node.selected = !node.selected ;
            if(node.selected)
              this.addSelectTag(node) ;
            else
              NormalUtils.getSelectIndex(this.tagAddList,node.id,"id",true) ;
          },

          /**
           * 添加标签
           * @param node
           */
          addSelectTag(node){
            let list = this.tagAddList ;
            let len = list.length ;
            let item ;
            let added = false ;
            for(let i=0;i<len;i++){
              item = list[i] ;
              if(node.level<=item.level){
                list.splice(i,0,node) ;
                added = true ;
                break ;
              }
            }
            if(!added)
              list.push(node) ;
          },

          /**
           * 移除选中标签
           * @param item
           */
          tagClose(item){
            NormalUtils.getSelectIndex(this.tagAddList,item.id,"id",true) ;
            if(this.tagMap.hasOwnProperty(item.id))
              this.tagMap[item.id].selected = false ;
          },

          /**
           * 提交标签
           */
          submitTag(){
            if(!this.tagSingleFlag){
              if(this.tagAddList.length===0){
                this.popMessage("请至少选择一个标签！");
                return ;
              }
              if(this.tagSourceList.length===0){
                this.popMessage("资源列表不能为空！");
                return ;
              }
            }

            //参数
            let _sourceList = [] ;
            let _tagList = this.getArrAttList(this.tagAddList) ;
            if(this.tagSingleFlag===true)
              _sourceList = [this.tagSource] ;
            else
              _sourceList =  this.tagSourceList  ;

            let send = [] ;
            for(let source of _sourceList){
              send.push({resourceId:source.id,labelIds:_tagList}) ;
            }

            //保存数据
            this.query(send,(result)=>{
              this.popMessage("添加成功！") ;
              this.closeWin();
            },null,DataStorageAPI.saveTagOfSource);
          },

          /**
           * 获得列表内对象某个属性列表
           * @param arr
           * @param att
           * @returns {Array}
           */
          getArrAttList(arr ,att="id" ){
            let _re = [] ;
            for(let item of arr){
              _re.push(item[att]) ;
            }
            return _re ;
          }
        }
    }
</script>

<style scoped lang="scss">
  .container{
    @include abs-group();

    .layout{
      @include abs-group(5px,5px,5px,0) ;

      .source {
        flex:none;
        width:100%;
        max-height: 135px;
        height:auto;
        overflow-y: auto;
        position: relative;
        border:1px solid $form-borderColor;
        border-radius: 3px;
        padding:5px 0px;

        .source-layout {
          .source-item{
            flex:none;
            box-sizing: border-box;
            border:1px solid $form-borderColor;
            border-radius:2px;
            position:relative;
            padding: 3px 5px ;
            overflow: hidden;
            margin: 3px;
            .item-inner{
              .item-icon{
                 font-size:13px;
                 color:#555;
              }
              .item-label{
                flex:none;
                max-width:100px;
                min-width:50px;
                font-size:12px;
                color:#000;
                word-break: break-all;
                white-space:nowrap;
                overflow:hidden;
                text-overflow: ellipsis;
                margin: 0 5px 0 5px;
              }
              .item-close{
                font-size:13px;
                color:#555;
                cursor: pointer;
                &:hover{
                  color:#6060c4;
                }
              }
            }

          }


        }
      }
      .mid-gap{
        height:10px;
      }
      .tag{
        flex: auto;
        width:100%;
        position: relative;
        border:1px solid $form-borderColor;
        border-radius: 3px;

        .left-tree {
          @include abs-group(0, 0, false, 0) ;
          width:217px;
          overflow:hidden;
          border-right: 1px solid $form-borderColor;
          box-sizing: border-box;

          .tree-header{
            width:217px;
            height:30px;
            background-color:#e5e9f2;
            border-bottom: 1px solid $form-borderColor;
            .title{
              font-size:14px;
              color:#000 ;
              line-height:30px;
              vertical-align: middle;
              padding-left: 10px;
            }
          }

          .tree-content{
            @include abs-group(0,30px,0,0) ;
            overflow: auto;
            .tree-inner {
              @include abs-group(5px,5px,0px,5px) ;
              overflow: auto;
            }
          }

        }
        .tag-list{
          @include abs-group(217px, 0, 0, 0) ;
          overflow-y:auto;
          .layout{
            .tag-item{
              flex:none;
              max-width:200px;
              min-width:50px;
              box-sizing: border-box;
              border-radius:3px;
              position:relative;
              background-color: #6060c4;
              padding: 3px 5px 3px 10px;
              margin: 5px;
              color:#fff;
              font-size:16px;
              .item-inner{
                .item-label{
                  flex:auto;
                  word-break: break-all;
                  white-space:nowrap;
                  overflow:hidden;
                  text-overflow: ellipsis;
                  margin: 0 5px 0 0;
                }
                .item-close{
                  font-size:13px;
                  cursor: pointer;
                  &:hover{
                    color:#6060c4;
                  }
                }
              }
            }

            .level-{
              background-color: #d72a27;
              font-size:13px;
            }
            .level-0{
              background-color: #d72a27;
              font-size:18px;
            }
            .level-1{
              background-color: #7da73f;
              font-size:16px;
            }
            .level-2{
              background-color: #25a3cb;
              font-size:14px;
            }
            .level-3{
              background-color: #f27521;
              font-size:13px;
            }
            .level-4{
              background-color: #d0147e;
              font-size:12px;
            }
            .level-mini{
              background-color: #e49f7d;
              font-size:12px;
            }
          }
        }
      }
      .footer-gap{
        height:10px;
      }
      .footer{
        width:100%;
      }
    }
  }

</style>

<template>
  <s-window @close="closeWin"
            :title="'打标签'+(tagSingleFlag?('(资源:'+tagSource.tableName+')'):'')"
            :visible="isPopWin"
            :width="'660px'"
            :height="'500px'" >

     <div class="container">
        <v-group-iwt class="layout">

          <div class="source" v-show="tagSingleFlag===false">
            <tile-group-iwt class="source-layout">
              <div class="source-item"
                   v-for="(item,index) in tagSourceList"
                   :key="index">

                <h-group-iwt class="item-inner">

                  <i class="iconfont tj-biaoge item-icon"
                     v-if="item.resourceStyle==='database'"></i>
                  <i class="iconfont tj-wenjian item-icon"
                     v-if="item.resourceStyle==='file'"></i>
                  <div class="item-label">{{item.tableName}}</div>
                  <i class="iconfont tj-guanbi1 item-close"
                     @click="removeTagSource(item)"></i>
                </h-group-iwt>
              </div>
            </tile-group-iwt>
          </div>

          <div class="mid-gap"></div>

          <div class="tag">

            <div class="left-tree">

              <div class="tree-header">
                <div class="title">资源标签</div>
              </div>
              <div class="tree-content">
                <div class="tree-inner">

                <el-tree :data="tagTreeData"
                         :default-expand-all="true"
                         :expand-on-click-node="false">
                     <span slot-scope="{ node, data }">
                        <el-checkbox v-model="data.selected"
                                     @change="tagItemSelect(data)">
                        </el-checkbox>
                        <i class="iconfont tj-biaoqian"></i>
                        <span @click="tagItemSelect(data,true)">{{data.tname}}</span>
                     </span>
                </el-tree>

              </div>
              </div>
            </div>

            <div class="tag-list">
              <tile-group-iwt class="layout">

                <div  v-for="(item,index) in tagAddList"
                     :key="index"
                     :class="['tag-item','level-'+item.levelStyle]">
                  <h-group-iwt class="item-inner">
                    <div class="item-label"> {{item.tname}} </div>
                    <i class="iconfont tj-guanbi1 item-close"
                       @click="tagClose(item)"></i>
                  </h-group-iwt>

                </div>

              </tile-group-iwt>
            </div>

          </div>

          <div class="footer-gap"></div>

          <h-group-iwt :hor="'center'" class="footer">
            <el-button type="primary"
                       @click="()=>{this.submitTag()}">保存</el-button>
            <el-button type="warning"
                       @click="()=>{this.closeWin()}">关闭</el-button>
          </h-group-iwt>

        </v-group-iwt>
     </div>

   </s-window>
</template>
