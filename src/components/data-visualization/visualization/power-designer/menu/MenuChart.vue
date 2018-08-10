<script>
  import Draggable from 'vuedraggable';
  import ChartContainerEnum from '../../model/enums/ChartContainerEnum';

  export default {
    components: {Draggable},
    data() {
      return {
        chartContainerEnum: ChartContainerEnum
      }
    },
    computed: {},
    mounted() {},
    activated() {},
    methods: {
      clone(original){
        //赋予新的ID，防止ID重复
        let container = JSON.parse(JSON.stringify(original));
        container.id = NormalUtils.createUUid("container-",32);
        return container;
      }
    }
  }
</script>

<template>
  <el-submenu popper-class="visualization-sub-menu" index="menu-chart">
    <template slot="title">
      <i class="iconfont tj-icon-dashboard"></i>
      <span slot="title">图表库</span>
    </template>
    <el-menu-item-group>
      <el-container>
        <el-header style="height: 10px;">图表库</el-header>
        <el-main style="width: 300px;">
          <el-card v-for="(item, index) in chartContainerEnum.list" :key="item.id" shadow="hover">
            <div class="clearfix">
              <span>{{item.name}}</span>
            </div>
            <draggable v-model="item.containers" :options="{group: { name:'container', pull:'clone',put:false},draggable: '.container'}" :clone="clone">
              <img :src="item.icon" v-for="container in item.containers" :key="container.id" class="container"/>
            </draggable>
          </el-card>
        </el-main>
      </el-container>
    </el-menu-item-group>
  </el-submenu>
</template>

<style scoped lang="scss">
  .visualization-sub-menu ul img{
    height: 80px;
  }
</style>
