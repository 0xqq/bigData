// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import ElementUI from 'element-ui';
import tj from './common/comps/tj';
import NormalComps from './common/comps/normal';
import App from './App';
import router from './router';
import 'babel-polyfill';

import './style/common.css';
import './style/comm.scss';
import './style/icon/iconfont.css';

import "../static/libs/element/index.css";
import * as ElementUI from "../static/libs/element/index" ;
import PathConst from "./router/PathConst";
import ModelLocator from "@/common/model/ModelLocator" ;

Vue.use(ElementUI);
Vue.use(tj);
Vue.use(NormalComps) ;

Vue.config.productionTip = false;

// 路由跳转
router.beforeEach((to, from, next) => {

  //加一个简单用户验证 如果当前没等来 查下是否已经登录过
  if(!AuthManager.initList)
    ModelLocator.getInstance().refreshUserAll() ;
  if(to.path===PathConst.ROOT || AuthManager.validPath(to.path))
    next();
  else if(from.path==="/")
    router.replace(PathConst.ROOT);

});

window.vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
