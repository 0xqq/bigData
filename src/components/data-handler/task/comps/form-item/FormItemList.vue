<script>
  import FormItemMap from "./FormItemMap" ;

  export default {
    components:  FormItemMap.comps,
    props: {
      'formList': {
      }
    },
    methods:{
      getComp(item){
        return FormItemMap.getItemComp(item) ;
      }
    }
  }
</script>
<style scoped lang="scss">
  .list {
    width: 100%;
    min-height: 50px;
    max-height: 400px;
    overflow: auto;
    .item{
      width:100%;
    }
  }
</style>
<template>
  <v-group-iwt style="width:100%">
    <!--form-->
      <div v-for="(item,index) in formList"
           :key="index"
            v-if="item.hide?false:true"
           class="tj-formitem-gap">
        <component  :owner="formList"
                   :is="getComp(item)"
                   :data="item"
                   :label="item.label" >
        </component>
    </div>
  </v-group-iwt>
</template>


