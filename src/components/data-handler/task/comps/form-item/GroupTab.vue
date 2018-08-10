<script>
  import FormItemMap from "./FormItemMap" ;
  import CheckTextInput from "./CheckTextInput" ;
  import TextInput from "./TextInput" ;
  import CheckBox from "./CheckBox" ;
  import ComboBox from "./ComboBox" ;
  import DataGrid from "./DataGrid" ;
  import GroupTab from "./GroupTab" ;
  import   ClusterComboBox from "./ClusterComboBox" ;

  export default {
    components:  {
      TextInput,
      CheckTextInput,
      CheckBox,
      ComboBox,
      DataGrid,
      GroupTab,
      ClusterComboBox,
    }  ,
    props: {
      'label': {default: ""},
      "owner":{},
      'data': {}
    },
    data() {
      return {
        tabs:[],
        currentIndex:0
      }
    },

    mounted() {
      this.initData() ;
    },

    watch:{
      data:function(){
        this.initData() ;
      }
    },

    computed: {
    },

    methods: {
      initData(){
        this.currentIndex = 0 ;
        this.tabs = [] ;
        if(!this.data || !this.data.value )
          return ;
         let _list = this.data.value ;
         _list.forEach((tab)=>{
           if(!tab.value)
             tab.value = [] ;
         }) ;
        this.tabs = _list ;
      },

      changeTab(index){
        this.currentIndex = index ;
      },

      getItemComps(item){
        return FormItemMap.getItemComp(item) ;
      }
    }
  }
</script>

<template>

  <v-group-iwt style="width:100%">
    <v-gap-iwt></v-gap-iwt>
    <div class="tj-tab-header">
      <div class="tj-tab-back"></div>
      <h-group-iwt class="tj-tab-btn-con" >
        <div :class="['tj-tab-btn',currentIndex===index?(index===0?'tj-tab-btn_sel_f':'tj-tab-btn_sel_mid'):'']" v-for="(item,index) in tabs" @click="changeTab(index)">
          {{item.label}}
        </div>
      </h-group-iwt>
    </div>
    <!--form-->
    <div  style="width:100%;">
      <div class="tj-tab-content-bor">
        <div v-for="(tab,index) in tabs" v-show="currentIndex===index" style="width:100%;">
          <v-group-iwt style="width:100%">
            <div  v-for="(item,index) in tab.value"
                  :key="index"
                  class="tj-formitem-gap"
                  v-if="item.hide?false:true">
              <component  :is="getItemComps(item)"
                          :owner="owner"
                          :data="item"
                          :label="item.label"
                          style="width:100%;">
              </component>
            </div>
          </v-group-iwt>
        </div>
    </div>
    </div>
  </v-group-iwt>

</template>

<style scoped>


</style>
