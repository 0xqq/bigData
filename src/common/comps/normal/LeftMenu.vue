<script>
  import EventDispatcher from "../../event/EventDispatcher" ;
  import EventList from "../../event/EventList" ;
  import NormalUtils from "../../utils/NormalUtils";

  export default {
    props: {
      'title':{},
      'dataProvider':{},
      'labelFiled':{},
      "active":{default:""},
      "iconClass":{ default:"normal-icon" },
      "isCollapse":{default:false},
      "viewName":{default:""}
      },
    data() {
      return {
        currentView:"",
        defaultActive:"",
        dataSource:[],
        allList:[]
      }
    },

    mounted() {
      EventDispatcher.addListener(EventList.COLLAPSE_MENU_SYS,(data)=>{
        if(!data.name || data.viewName !== this.viewName)
          return ;
        if(data.data===null || data.data===undefined)
             this.isCollapse = !this.isCollapse ;
        else if(typeof data.data === "boolean")
             this.isCollapse = data.data ;
      }) ;
      this.initDataSource() ;
      this.refreshRouter() ;
    },

    watch:{
      "$route":function(){
        this.refreshRouter() ;
      },
      "dataProvider":function(){
        this.initDataSource() ;
      }
    },

    computed: {
      showTitle:function () {
        if(this.title)
          return this.title+"";
        return "" ;
      },
      iconClassName:function(){
        if(this.iconClassName)
          return this.iconClassName ;
        return "";
      }
    },

    methods: {

      /**
       * 刷新路由
       */
      refreshRouter(){
        if(!this.allList)
          this.initDataSource();
        this.currentView = "";
        this.path ="";
        for(let menu of this.allList){
          if(menu && menu.hasOwnProperty("path") && this.$route.path.indexOf(menu.path)===0){
            this.currentView = menu.id ;
            this.path = menu.path ;
          }
        }
      },

      /**
       * 初始化数据源
       */
      initDataSource(){
        let list = [] ;
        this.dataSource = [];
        if(this.dataProvider){
          for(let item of this.dataProvider){
            item.id = NormalUtils.createOID("menu_id") ;
            list.push(item) ;
            if(item.children){
              for(let sub of item.children){
                sub.id = NormalUtils.createOID("menu_id") ;
                list.push(sub) ;
              }
            }

          }
          this.dataSource = this.dataProvider ;
        }
        this.allList = list ;
      },

      /**
       * 显示标签
       * @param item
       * @returns {*}
       */
      getShowLabel(item){
        if(!item)
          return "";
        if(this.labelFiled){
          if(item.hasOwnProperty(this.labelFiled))
            return item[this.labelFiled+""];
        }
        else  if(item.hasOwnProperty("label"))
          return item.label+"";
        else  if(item.hasOwnProperty("title"))
          return item.title+"";
        return "label" ;
      },

      //菜单项点击处理
      itemClickHandler(item){
        this.$emit("menuItemClick", item);
      },

      //头点击处理
      headClickHandler(){
        this.$emit("menuHeadClick");
      },
      menueClosClickHandler(){
        EventDispatcher.disEvent(EventList.COLLAPSE_MENU_SYS,{name:this.viewName,data:null}) ;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu-container {
    @include abs-group(0,0,false,0) ;
    width:$tj-menu-width;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    background-color: $-theme-color;
    .menu{
      width:100%;
      .sub-lb{
        margin-left:12px ;
      }
    }
    .sel{
      background-color: $-theme-color-light;
    }
  }
  .menu-container-mini{
    @extend .menu-container ;
    width:$tj-menu-width-mini;
  }
</style>
<template>
  <div :class="[ isCollapse?'menu-container-mini':'menu-container']" >
      <el-menu class="menu"
               :collapse="isCollapse"
               :unique-opened="true"
               :default-active="currentView" >

        <template  v-for="(item,index) in dataSource">
          <el-submenu  :index="item.id"
                       :key="index"
                       :class="[currentView===item.id?'sel':'']"
                       @click="itemClickHandler(item)"
                       v-if='item.children && item.children.length>0' >
            <template slot="title" v-if="isCollapse===false">
              <i :class="[item.icon?item.icon:'el-icon-menu']"></i>
              <span >{{getShowLabel(item)}}</span>
            </template>
            <template  v-else >
              <i :class="[item.icon?item.icon:'el-icon-menu']"></i>
              <span slot="title">{{getShowLabel(item)}}</span>
            </template>

            <template v-for="(subItem,subIndex) in item.children">
              <el-menu-item :index="subItem.id"
                            :class="[currentView===subItem.id?'sel':'']"
                            @click="itemClickHandler(subItem)">
                <template slot="title" >
                  <span class="sub-lb">{{getShowLabel(subItem)}}</span>
                </template>
              </el-menu-item>
            </template>
          </el-submenu>

          <el-menu-item v-else
                        :index="item.id"
                        :class="[currentView===item.id?'sel':'']"
                        @click="itemClickHandler(item)">
            <template slot="title" v-if="isCollapse===false">
              <i :class="[item.icon?item.icon:'el-icon-menu']"></i>
              <span >{{getShowLabel(item)}}</span>
            </template>
            <template v-else >
              <i :class="[item.icon?item.icon:'el-icon-menu']"></i>
              <span slot="title">{{getShowLabel(item)}}</span>
            </template>
          </el-menu-item>
        </template>

      </el-menu>
  </div>

</template>

