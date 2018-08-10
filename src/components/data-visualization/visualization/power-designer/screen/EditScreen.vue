<script>

  import VueGridLayout from 'vue-grid-layout';
  import Draggable from 'vuedraggable';

  import Inject from "@/common/model/Inject";
  import Container from '../../model/Container';
  import Chart from '../../model/Chart';
  import EditContainer from '../container/EditContainer';


  let GridLayout = VueGridLayout.GridLayout;
  let GridItem = VueGridLayout.GridItem;

  export default {
    components: {Draggable,GridLayout,GridItem,EditContainer},
    props: {
      screenConfig: Object,
      showGridItemBorder: Boolean
    },
    data() {
      this.containerPM = Inject.getClass(Container);
      this.chartPM = Inject.getClass(Chart);
      return {
        screen: this.screenConfig
      }
    },
    computed: {},
    mounted() {},
    activated() {},
    methods: {}
  }
</script>

<template>
  <div :style="screen.style">
    <grid-layout
      :layout="screen.layout.layoutItems"
      :col-num="screen.layout.colNum"
      :row-height="screen.layout.rowHeight"
      :max-rows="screen.layout.maxRows"
      :margin="screen.layout.margin"
      :is-draggable="false"
      :is-resizable="false"
      :is-mirrored="screen.layout.isMirrored"
      :auto-size="screen.layout.autoSize"
      :vertical-compact="screen.layout.verticalCompact"
      :use-css-transforms="screen.layout.useCssTransforms">
      <grid-item v-for="layoutItem in screen.layout.layoutItems" :key="layoutItem.i"
                 :i="layoutItem.i"
                 :x="layoutItem.x"
                 :y="layoutItem.y"
                 :w="layoutItem.w"
                 :h="layoutItem.h">
        <draggable v-model="layoutItem.containers" :options="{group: 'container',draggable: '.container'}" :class="['draggable-wrapper',{'draggable-wrapper-border': showGridItemBorder}]">
          <edit-container class="container" v-for="container in layoutItem.containers" :key="container.id" :layoutItemConfig="layoutItem" :containerConfig="container"></edit-container>
        </draggable>
      </grid-item>
    </grid-layout>
  </div>
</template>

<style scoped lang="scss">
  .draggable-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .draggable-wrapper-border{
    border: 1px solid;
  }
  .container{
    overflow: hidden;
    cursor: pointer;
  }


</style>
