import HGroup from './container/HGroup.vue';
import VGroup from './container/VGroup.vue';
import TileGroup from './container/TileGroup.vue';
import HGap from './container/HGap.vue';
import VGap from './container/VGap.vue';
import AbsGroup from './container/AbsGroup.vue';
import RelGroup from './container/RelGroup.vue';
import NormalDirective from "./directive/NormalDirective" ;
import TileItem from "./container/TileItem" ;
import TabContent from "./container/TabContent" ;
import Loading from "./loading/Loading" ;
import TjPagination from "./page/TjPagination" ;
import TitleWindow from "./container/TitleWindow" ;
import TileWindowAuto from "./container/TitleWindowAuto" ;
import TreeRender from "./tree/TreeRender" ;

const install = {
  install:function(Vue){

    //----------------------------------------- comps -------------------------------

    Vue.component('h-group-iwt',HGroup);
    Vue.component('v-group-iwt',VGroup);
    Vue.component('tile-group-iwt',TileGroup);
    Vue.component('tile-item-iwt',TileItem);
    Vue.component('h-gap-iwt',HGap);
    Vue.component('v-gap-iwt',VGap);
    Vue.component('group-iwt',AbsGroup);
    Vue.component('group-rel-iwt',RelGroup);
    Vue.component('s-tab-content',TabContent) ;
    Vue.component('s-loading',Loading) ;
    Vue.component('s-pagination',TjPagination) ;
    Vue.component('s-window',TitleWindow) ;
    Vue.component('s-window-auto',TileWindowAuto) ;
    Vue.component('s-tree',TreeRender) ;

    //----------------------------------------- directive -------------------------------
    Vue.use(NormalDirective) ;
  }
}
export default install  ;
