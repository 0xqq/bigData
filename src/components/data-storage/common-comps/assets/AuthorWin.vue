<script>
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;
  import PlatformAPI from "@/common/service/PlatformAPI" ;
  import FormPopWin from "@/common/comps/normal/FormPopWin"

  export default {
    mixins:[FormPopWin],
    data() {
      return {
        authorList:[],
        isPopAuthor:false,
        authorSingleFlag:true,//是否只给一个对象打标签
        authorSource:{},
        authorSourceList:[]
      }
    },
    mounted() {
    },
    activated() {
    },
    methods: {
      /**
       * 初始化授权表单
       */
      initAuthorForm(){
        this.authorAllList = null ;
        this.sourceAuthorList = null ;
        this.initData({
          authorList:[],
          isPopAuthor:false,
          authorSingleFlag:true,//是否只给一个对象打标签
          authorSource:{},
          authorSourceList:[]
        }) ;
      },

      /**
       * 弹出授权窗口
       */
      doOpen(value,options){
        this.initAuthorForm() ;
        if(Array.isArray(value)) {
          this.authorSingleFlag = false ;
          this.authorSourceList = value ;
        }
        else{
          this.authorSource = value ;
          this.querySourceAuthor();
        }
        this.queryAllAuthor() ;
      },

      /**
       * 查询已经授权
       */
      querySourceAuthor(){
        this.query({id:this.authorSource.id}, (result) => {
          let list = result.data ;
          let arr = [] ;
          for(let item of list ){
            arr.push({id:item.tenementId}) ;
          }
          this.sourceAuthorList = arr;
          this.initAuthorSelected() ;
        }, null, DataStorageAPI.queryAuthorOfSource);
      },

      /**
       * 查询所有租户
       */
      queryAllAuthor(){
        this.query({ startIndex:0,page:1,pageSize:999999,tenant:""}, (result) => {
          let list = this.getResultList(result,"tenantInfo","resultdata");
          for(let item of list){
            if(item.hasOwnProperty("tenantID"))
            item.id = item.tenantID ;
            else if(item.hasOwnProperty("tenantId"))
              item.id = item.tenantId ;
            item.name = item.tenantName ;
            item.selected = false ;
          }
          this.authorAllList = list ;
          this.initAuthorSelected() ;
          this.authorList =  this.authorAllList ;
        }, null, PlatformAPI.queryTenantList);//PlatformAPI.queryTenantList
      },

      /**
       * 选中授权
       */
      initAuthorSelected(){
        if(!this.authorSingleFlag || !this.authorAllList || !this.sourceAuthorList)
          return ;
        let map = {};
        if(this.authorSingleFlag && this.sourceAuthorList)
          map =  NormalUtils.array2Map(this.sourceAuthorList,"id") ;
        for(let item of this.authorAllList){
          item.selected = false ;
          if(map.hasOwnProperty(item.id))
            item.selected = true ;
        }
      },

      /**
       * 删除某个资源
       * @param source
       */
      removeAuthorSource(source){
        if(this.authorSourceList.length===1){
          this.popMessage("至少需要保留一个资源！") ;
          return ;
        }
        NormalUtils.getSelectIndex(this.authorSourceList,source.id,"id",true) ;
      },

      /**
       * 提交授权表单
       */
      submitAuthor(){
        if(!this.authorSingleFlag){
          if(this.authorList.length===0){
            this.popMessage("请选择租户！");
            return ;
          }
          if(this.authorSource.length===0){
            this.popMessage("资源不能为空！");
            return ;
          }
        }

        //参数  --- 格式很冗余数据
        let _sourceList = [] ;
        let _tagList = [] ;
        for(let auth of this.authorList){
          if(auth.selected)
            _tagList.push(auth.id) ;
        }
        if(this.authorSingleFlag===true)
          _sourceList = [this.authorSource] ;
        else
          _sourceList = this.authorSourceList  ;

        let send = [] ;
        for(let source of _sourceList){
          send.push({resourceId:source.id,tenementIds:_tagList}) ;
        }

        this.query(send,(result)=>{
          this.popMessage("授权成功！") ;
          this.closeWin();
        },null,DataStorageAPI.saveAuthorOfSource);
      }
    }
  }
</script>

<style scoped lang="scss">
  .autohr-container{
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

        .tag-list{
          @include abs-group() ;
          overflow-y:auto;
          .layout{
            .tag-item{
              flex:none;
              max-width:200px;
              min-width:50px;
              position:relative;
              margin: 5px 10px;
              color:#000;
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
  .title-box{
    @include abs-group(0,5px,false,false) ;
    border:1px solid $form-borderColor;
    width:50px;
    text-align: center;
    padding: 10px;
  }
</style>

<template>
  <s-window @close="closeWin"
            :title="'授权'+(authorSingleFlag?('(资源:'+authorSource.tableName+')'):'')"
            :visible="isPopWin"
            :width="'650px'"
            :height="'500px'" >

    <div class="autohr-container">
      <v-group-iwt class="layout">

        <div class="source" v-show="authorSingleFlag===false">
          <tile-group-iwt class="source-layout">
            <div class="source-item"
                 v-for="(item,index) in  authorSourceList"
                 :key="index">

              <h-group-iwt class="item-inner">
                <i class="iconfont tj-biaoge item-icon"
                   v-if="item.resourceStyle==='database'"></i>
                <i class="iconfont tj-wenjian item-icon"
                   v-if="item.resourceStyle==='file'"></i>
                <div class="item-label"> {{item.tableName}}</div>
                <i class="iconfont tj-guanbi1 item-close"
                   @click="removeAuthorSource(item)"></i>
              </h-group-iwt>
            </div>
          </tile-group-iwt>
        </div>

        <div class="mid-gap"></div>

        <div class="tag">
          <div class="tag-list">
            <tile-group-iwt class="layout">
              <div  v-for="(item,index) in authorList"
                    :key="index"
                    class="tag-item">
                <el-checkbox v-model="item.selected">{{item.name}}</el-checkbox>
              </div>
            </tile-group-iwt>
          </div>
        </div>

        <div class="footer-gap"></div>

        <h-group-iwt :hor="'center'" class="footer">
          <el-button type="primary"
                     @click="()=>{this.submitAuthor()}">保存</el-button>
          <el-button type="warning"
                     @click="()=>{this.closeWin()}">关闭</el-button>
        </h-group-iwt>

      </v-group-iwt>
    </div>

  </s-window>
</template>
