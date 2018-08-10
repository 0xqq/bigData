<script>
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;
  import OrgSelectPM from "./OrgSelectPM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    props: {
      'orgId': {default: ""},
      'orgName': {default: ""},
      size: {default: 'mini'},
      showAll:{default:""}
    },
    model: {
      prop: 'orgId',
      event: 'change'
    },
    data() {
      this.orgQuery = Inject.getClass(OrgSelectPM) ;
      return {
        isLoading:false,
        orgNameV: "",
        orgIdV: "",
        searchKey:"",
        openItems:[],
        isOpen: false,
        autoId: NormalUtils.createOID("org_sel"),
        treeOption: {
          children: 'children',
          label: 'name'
        },
        orgList: [ ]
      }
    },

    watch: {
      orgName() {
        this.orgNameV = this.orgName;
      },
      orgId() {
        this.orgIdV = this.orgId;
        if(!this.orgIdV && !this.orgName){
          this.orgNameV = "";
        }
      }
    },
    mounted() {
      this.orgNameV = this.orgName;
      this.orgIdV = this.orgId;
    },
    computed: {},
    methods: {

      /**
       * 打开机构
       */
      openOrgWin() {
        this.searchKey = "" ;
        this.openItems = [] ;
        this.openWin();
        this.queryOrgTree() ;
      },

      /**
       * 输入变化处理
       */
      changeQuery(){
        this.queryOrgTree(this.searchKey) ;
      },

      /**
       * 根据关键字查询机构树
       */
      queryOrgTree(key=""){
        this.openItems = [] ;
        this.orgList = [] ;
        this.isLoading = true ;
        this.orgQuery.queryOrgTreeList(key,(list,keys)=>{
          this.isLoading = false ;
          this.openItems = keys ;
          this.orgList = list ;
        }) ;
      },

      /**
       * 查询数据
       */
      // queryOrgList(item = null,state=false) {
      //   if(state)
      //     this.isLoading = true ;
      //   DataStorageAPI.queryOrgListLevel({id: item ? item.id : ""}).then(
      //     (result) => {
      //       this.isLoading = false ;
      //       let list = result.data;
      //       let arr = [];
      //       if (list) {
      //         for (let item of list) {
      //           let org = {
      //             id: item.id,
      //             name: item.name,
      //             pid: item.parentId,
      //             type: "org",
      //             children:[]
      //           };
      //           //防止没加好
      //           if(!item.hasOwnProperty("hasSon") || item.hasSon === true || item.hasSon === "true")
      //             org.children = [{id: "", name: "loading..", type: "temp"}] ;
      //           arr.push(org);
      //         }
      //       }
      //       if(item)
      //          item.children = arr;
      //       else
      //         this.orgList = this.orgList.concat(arr) ;
      //     },
      //     () => {
      //       this.isLoading = false ;
      //       if(item)
      //       item.children = [];
      //     }
      //   );
      // },

      /**
       * 打开下拉框
       */
      openWin() {
        let formItem = $("#" + this.autoId);
        let formWin = $("#" + this.autoId + "_win");

        let offxy = formItem.offset();
        formWin.css("width", Math.max(200, formItem.width()));
        formWin.css("top", (offxy.top + formItem.height()) + "px").css("left", offxy.left + "px");
        this.isOpen = true;

        this.outDownHandler = (e) => {
          let fwin = $("#" + this.autoId + "_win");
          if (!this.isOpen || NormalUtils.hitTestGlobal(e.pageX, e.pageY, fwin, false, 25))
            return;
          this.hiddenWin();
        };
        $(window).bind("mousedown", this.outDownHandler);
      },

      /**
       * 隐藏下拉框
       */
      hiddenWin() {
        if (this.outDownHandler)
          $(window).unbind("mousedown", this.outDownHandler);
        this.isOpen = false;
        this.isLoading = false ;
      },

      /**
       * 机构选择处理
       * @param data
       */
      orgSelectHandler(data) {
        this.orgNameV = data.name;
        this.orgIdV = data.id;
        this.$emit("change", data.id);
        this.hiddenWin() ;
      }
    },
    beforeDestroy() {
      this.hiddenWin();
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }
  }
</script>

<style scoped lang="scss">
  .mouseMask {
    @include abs-group() ;
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
    min-height: 25px;
  }

  .org-list {
    z-index:99999;
    height: 200px;
    min-width: 200px;
    overflow: auto;
    position: fixed;
    background-color: #fff;
    @include shadow(3px,3px,10px) ;
  }

  .org-input{
    @include abs-group(5px,5px,5px,false) ;
    overflow: hidden;
    box-sizing: border-box;
    border:1px solid $form-borderColor;
    border-radius: 3px;
    height:25px;
    padding: 0 3px;
    line-height:25px;
    vertical-align: middle;
    &>input{
      @include abs-group(3px,0,3px,0) ;
    }
  }

  .org-tree{
    @include abs-group(0,30px,0,0) ;
  }

</style>

<template>
  <div style="width:100%;">
    <el-select style="width:100%;"
               :size="size"
               v-model="orgNameV">
    </el-select>
    <div class="mouseMask"
         @click="openOrgWin"
         v-bind:id="autoId"></div>

    <div class="org-list"
         v-bind:id="autoId+'_win'"
         v-show="isOpen">

      <div class="org-input">
        <input  style="width:100%;"
                class="tj-transparent-input"
               @keyup="changeQuery"
               placeholder="机构名称"
               v-model="searchKey" >
      </div>
      <div class="org-tree">
        <el-tree style="width:100%;height:100%;"
                 node-key="id"
                 :default-expanded-keys="openItems"
                 @node-click="orgSelectHandler"
                 :props="treeOption"
                 :data="orgList">

          <span  slot-scope="{ node, data }" >
              <i v-if="data.type==='temp'" class="el-icon-loading"></i>
              <span>{{ data.name }}</span>
          </span>
        </el-tree>
      </div>
      <s-loading v-show="isLoading"></s-loading>
    </div>
  </div>
</template>
