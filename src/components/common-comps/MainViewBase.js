import AuthManager from "@/common/manager/AuthManager" ;
import ConstManager from "@/common/manager/ConstManager" ;
import ModelLocator from "../../common/model/ModelLocator";

export default {
  data() {

    return {
    }
  },
  watch:{
  },
  beforeCreate(){
  },
  created(){
    if(this.autoValidView === false )
      return ;
    this.initMenuList() ;
  },
  mounted(){
  },
  activated(){
    if(this.autoValidView === false )
      return ;
    this.changeDefault() ;
  },
  methods: {

    /*
    * 切换子页面
    * */
    changeView(item){
      NormalUtils.changeRouter(item.path,item.query?item.query:null ,item) ;
    },

    /**
     * 切换默认页
     */
    changeDefault() {
      if (this.$route.path !== this.mainPath)
        return ;

      this.changBackDef() ;
    },

    /*
   * 切换回默认页
   * */
    changBackDef() {
      //默认页手动控制
      if (this.defPath && AuthManager.has[this.defPath.code]) {
        NormalUtils.changeRouter(this.defPath.path);
      }
      //否则跳转菜单第一项
      else if (this.menuList && this.menuList.length > 0) {
        let menu = this.menuList[0] ;
        if(menu.children && menu.children.length>0 )
           NormalUtils.changeRouter(menu.children[0].path);
        else
          NormalUtils.changeRouter(this.menuList[0].path);
      }
    },

    /**
     * 直接初始化菜单
     */
    initMenuList(){
      if(!this.mainPath)
        return ;

      //如果有添加的菜单 验证
      if(this.menuList && this.menuList.length>0){
        NormalUtils.deleteByFunc(this.menuList, (item) => {
          return AuthManager.has[item.code];
        });
      }
      //否则初始化
      else{
        this.menuList = AuthManager.getMainMenuList(this.mainPath) ;
      }
    }

  }
};
