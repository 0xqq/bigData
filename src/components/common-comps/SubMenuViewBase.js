import AuthManager from "@/common/manager/AuthManager" ;
import NormalUtils from "../../common/utils/NormalUtils";
export default {
  data() {
    this.viewList = [];
    this.isLocal = false ;
    return {
      currentView: ""
    }
  },
  watch:{
    "$route":function(){
      this.refreshRouterView() ;
    },
  },
  beforeCreate() {
  },
  created() {
    this.initViewList() ;
  },
  mounted() {
  },
  activated() {
    this.changeDefault();
    this.refreshRouterView() ;
  },
  methods: {

    /**
     * 初始化权限菜单
     */
    initViewList(){
      let arr = [];
      if (this.subViewPath) {
        this.isLocal = false ;
        for (let view of this.subViewPath) {
          // let view = AuthManager.getValidMenuItem(item.path);
          // if (view){
          //   if(item.view)
          //     view.view = item.view ;
          if(AuthManager.has[view.code])
            arr.push(view);
          // }
        }
      }
      else if (this.subView) {
        this.isLocal = true ;
        for(let view of this.subView){
          if(AuthManager.has[view.code])
            arr.push(view) ;
        }
      }
      this.viewList = arr;
    },

    /**
     * 切换默认页
     */
    changeDefault() {
      if (!this.viewList || this.viewList.length === 0)
        return;
      let view = this.viewList[0];
      if(view.path)
         NormalUtils.changeRouter(view.path, view.query ? view.query : undefined);
      if(view.view)
        this.currentView = view.path;
    },

    /**
     * 刷新路由对应视图
     */
    refreshRouterView(){
      if(this.isLocal)
        return ;
      for(let item of this.viewList){
        if(item.path === this.$route.path){
          this.currentView = item.view ;
          break ;
        }
      }
    },

    /**
     * 切换视图
     */
    changeView(){
      for(let item of this.viewList){
        if(item.path && item.view === this.currentView ){
          NormalUtils.changeRouter(  item.path ) ;
          break ;
        }
      }
    },
  }
};
