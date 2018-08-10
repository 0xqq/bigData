<script>
  import NormalUtils from "@/common/utils/NormalUtils" ;
  import EventDispatcher from "@/common/event/EventDispatcher" ;
  import EventList from "@/common/event/EventList" ;
  import PathConst from "@/router/PathConst" ;
  import CommonAPI from "@/common/service/CommonAPI" ;
  import ModelLocator from "@/common/model/ModelLocator" ;
  import AuthManager from "@/common/manager/AuthManager" ;
  import MainViewBase from "@/components/common-comps/MainViewBase" ;
  import SysManagerAPI from "@/common/service/SysManagerAPI";

  export default {
    components: { },
    mixins: [MainViewBase],
    data() {
      this.mainPath = PathConst.ROOT ;
      this.modell =  ModelLocator.getInstance() ;
      return {
        isLoading:false,
        currentView:PathConst.HOME,
        userName:"",
        pwd:"",
        hasLogin:true,
        autoValidView:false,
        user:this.modell.loginUser,
        menuList:[
          {name:"首页",code:"1",path:PathConst.HOME,icon:"iconfont tj-zhuye" ,selImg:"",img:""},
          {name:"数据目录",code:"2",path:PathConst.DATADIRECTORIES,icon:"iconfont tj-wenjianjiafolders3" ,selImg:"",img:""},
          {name:"数据接入",code:"3",path:PathConst.DATAIMPORT,icon:"iconfont tj-daoru" ,selImg:"",img:""},
          {name:"数据管理",code:"4",path:PathConst.DATASTORAGE,icon:"iconfont tj-NoSQLshujukuredis" ,selImg:"",img:""},
          {name:"数据处理",code:"5",path:PathConst.DATAHANDLER,icon:"iconfont tj-dmsshujukuguanli" ,selImg:"",img:""},
          {name:"数据分析",code:"6",path:PathConst.DATAANALYSIS,icon:"iconfont tj-duoweiduyingshoufenxi" ,selImg:"",img:""},
          {name:"数据可视化",code:"7",path:PathConst.DATAVISUALIZATION,icon:"iconfont tj-tubiao" ,selImg:"",img:""},
          {name:"平台管理与监控",code:"8",path:PathConst.PLATFORMMANAGER,icon:"iconfont tj-pingtaizijiankong" ,selImg:"",img:""},
          {name:"系统设置",code:"9",path:PathConst.SYSTEMMANAGER,icon:"iconfont tj-xitongshezhi" ,selImg:"",img:""},
        ]
      }
    },

    created(){
      //如果没有登录页面 初始化所有权限
      // if(!this.hasLogin)
      //   AuthManager.defaultAll() ;

      //刷新用户信息
      ModelLocator.getInstance().refreshUserInfo() ;

      //如果已经登录 刷新
      if(ModelLocator.getInstance().loginUser.logined){
        AuthManager.refreshAuth(true);
        this.initMenuList() ;
      }
    },

    mounted() {
      EventDispatcher.addListener(EventList.CHANGE_MAIN_VIEW_SYS,(view)=>{
        this.changeMainView(view.route) ;
      });
      this.refreshRouter() ;
    },

    watch:{
      "$route":function(){
         this.refreshRouter() ;
      }
    },

    methods: {

      refreshRouter(){
        for(let nav of this.menuList){
          if(this.$route.path.indexOf(nav.path)===0){
            this.currentView = nav.path ;
            break ;
          }
        }
      },

      /**
       * 切换按钮
       */
      navChangeHandler(item){
       this.currentView = item.path ;
       this.changeMainView(item.path) ;
      },
      /**
       * 主模块变化处理
       * @param path
       */
      changeMainView(path ){
        if(!path)
          return ;
        if(typeof path === "string")
          path = {path:path} ;
        this.$router.replace(path);
      },

      login(){
          this.modell.setCurrentUser(this.tesetUser()) ;
          AuthManager.defaultAll();

        this.isLoading = true ;
        CommonAPI.login({user:this.userName,pwd:this.pwd}).then(
          (result)=>{
              if(result.code+"" === "1"){
                this.$message.warning(result.msg ||"登录失败！") ;
                return ;
              }
              this.isLoading = false ;

              // console.log(result.resultdata.userId);

              sessionStorage.setItem('auserID',JSON.stringify(result.resultdata.roleCode));

              //查询用户权限
              this.queryUserAuh(result.resultdata) ;
          },
          (fault)=>{
            this.isLoading = false ;
          }
        );
      },

      /**
       * 测试信息
       */
      tesetUser() {
        return {
            "userId": "1",
            "userName": "test1224",
            "deptId": "1",
            "tenantName": "交管局",
            "tenantId": "1f329718-3e7b-4457-8212-f37a9960bb01",
            "roleCode": "00000"
        };
      },

      testRole(){
        return {
          roleCode:"00000",
          orgName:"跳过接口"
        };
      },

      /**
       * 查询用户权限列表
       * @param user
       */
      queryUserAuh(user) {
        // //查询用户
        this.isLoading = true ;
        SysManagerAPI.getUserRole({id: user.userId,userId:user.userId}).then(
          (result) => {
            this.isLoading = false ;
            let role = result.data ;

        // let role = this.testRole() ;
            //这里补数据
            user.roleCode = role.roleCode ;
            user.orgName = role.orgName ;

            //更新用户信息
            this.modell.setUserRole(role) ;

            //初始化权限
            AuthManager.initRole(role) ;

            //权限获得完后再设置用户信息
            this.modell.setCurrentUser(user) ;

            //登录成功处理
            this.loginSuccess() ;
          },
          () => {
            this.isLoading = false ;
          });
      },

      /**
       * 登录成功
       */
      loginSuccess(){
        if(!AuthManager.isAdmin)
          this.initMenuList() ;

        //切换默认页
        this.changeDefault();
      },

      /**
       * 登录失败
       */
      loginOut(){
        NormalUtils.changeRouter(PathConst.ROOT) ;

        //清空数据
        NormalUtils.clearSession() ;
        //重新加载页面
        window.location.reload() ;
      }
    }
  }

</script>

<style lang="scss" scoped>
  $headHeight:53px;
  .main{
    @include abs-group() ;
    overflow: auto;

    .main-inner{
      min-width: 1200px;
      @include abs-group() ;
    }
    .header{
      @include abs-group(0,0,0,false) ;
      height:$headHeight;
      background-color: #0047ae;
      border-bottom:3px solid #0093f2 ;
      color:#fff;
      font-size:13px;
      box-sizing: border-box;

      .layout{
        @include abs-group() ;
      }

      .head-logo {
        margin: 0 8px ;
        flex:none;
      }

      .head-nav{
        flex:none;
        height:100%;

        .nav-item{
          flex:none;
          overflow: hidden;
          height:100%;
          cursor: pointer;
          box-sizing: border-box;
          margin-left:0px;
          padding:0 6px;
          border: 1px solid rgba(0,0,0,0);
          color:#fff;
          font-size:13px;
          font-weight:normal;
          &:hover{
            background-color:rgba(255,255,255,0.15);
          }
        }

        .nav-item-sel{
          @extend  .nav-item;
          background-color: #0093f2;
          border-left: 1px solid #99b5df;
          border-right: 1px solid #99b5df;
          color:#fff;
          &:hover{
            color:#fff;
            background-color: #0093f2;
            border-left: 1px solid #99b5df;
            border-right: 1px solid #99b5df;
          }
        }

        .nav-layout{
          height:100%;
          min-width:70px;
          padding:3px 0 0 0 ;
          .icon{
            pointer-events: none;
            flex:none;
            text-align: center;
            line-height:15px;
          }
          .icon-btn{
            color:#d9e4f3;
            font-size:20px;
          }
          .icon-sel-btn{
            color:#fff;
            font-size:23px;
          }
          .label{
            pointer-events: none;
            flex:none;
            line-height:20px;
            margin-top: 3px;
          }
          .label-sel{
            @extend .label;
            color:#fff;
          }
        }
      }

      .auto-div{
        flex:auto;
      }

      .user-icon{
        font-size:15px;
        margin-right:3px ;
        opacity:0.95;
      }
      .user-lb{
        flex:0 1 auto;
        min-width:60px;
        max-width: 200px;
        word-break: keep-all;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .out-icon{
        cursor: pointer;
        flex:none;
        font-size: 25px;
        margin:0 10px;
        &:hover{
          color:#d46317;
        }
      }
    }
    .main-content{
      @include abs-group(0,$headHeight ,0,0) ;
    }
  }


</style>

<template>
  <div class="main">

    <div class="main-inner" v-if="user.logined">

    <!--body-->
    <div class="main-content"  >
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>

    <!--head-->
    <div class="header"  >
      <h-group-iwt class="layout" :ver="'center'">
        <img src="../assets/image/main/logo.png" class="head-logo" >
        <h-group-iwt class="head-nav">

          <div :class="[currentView===item.path?'nav-item-sel':'nav-item']"
               v-for="(item,index) in menuList"
               :key="index"
               @click="navChangeHandler(item)" >
            <v-group-iwt class="nav-layout"
                         :ver="'center'"
                         :hor="'center'" >
              <div class="icon" >
                <i :class="[item.icon,currentView===item.path?'icon-sel-btn':'icon-btn']"
                   v-if="item.icon"></i>
                <img v-if="item.img" :src="currentView===item.path?item.selImg:item.img"/>
              </div>
              <div :class="[currentView===item.path?'label-sel':'label']" >
                {{item.name}}
              </div>
            </v-group-iwt>
          </div>
        </h-group-iwt>
        <div class="auto-div" ></div>
        <i class="iconfont tj-yonghu user-icon"></i>
        <div class="user-lb" :title="user.userName+(user.orgName?('('+user.orgName+')'):'')">
          {{user.userName+(user.orgName?('('+user.orgName+')'):'')}}
        </div>
        <i class="iconfont tj-tuichu out-icon" @click="loginOut" title="注销"></i>
      </h-group-iwt>
    </div>

    </div>

    <!--temp-->
    <div style="position:absolute;top:0;left:0;right:0;bottom:0;background-color:#00309c;"
         v-show="hasLogin && !user.logined">

      <h-group-iwt :hor="'center'" :ver="'center'"
                   style="width:100%;height:100%;">

            <div style="width:400px;height:222px;flex:none;position:relative;">
              <img src="../assets/image/login.png"/>

                <input  type="text"
                        placeholder="请输入用户名"
                        style="font-size:12px;color:#000;position:absolute;top:84px;left:126px;width:166px;height:25px;"
                        class="tj-transparent-input"
                        v-model="userName" >
               <input  type="password"
                       placeholder="请输入密码"
                      style="font-size:12px;color:#000;position:absolute;top:124px;left:126px;width:166px;height:25px;"
                      class="tj-transparent-input"
                      v-model="pwd" >

               <div @click="login" style="position:absolute;top:126px;left:300px;width:60px;height:30px;cursor:pointer;" >
               </div>
            </div>

      </h-group-iwt>

      <!--<div style="color:#fff;font-size:14px;position:absolute;left:0;right:0;bottom:10px;text-align:center;">-->
        <!--北京市经济和信息化委员会  版权所有@京ICP备********号-->
      <!--</div>-->
       <s-loading v-show="isLoading"></s-loading>
    </div>

  </div>
</template>

