<script>
  import Inject from "@/common/model/Inject";
  import PageTypeEnum from '../../model/enums/PageTypeEnum';
  import Page from "../../model/Page";
  import Carsousel from "./Carsousel";

  export default {
    components:{Carsousel},
    data(){
      this.pagePM = Inject.getClass(Page);
      this.PageTypeEnum = PageTypeEnum;
      return {
        page: this.pagePM,
      }
    },
    computed: {},
    mounted() {},
    activated() {},
    methods: {}
  }
</script>

<template>
  <el-dialog title="页面配置项" center width="60%" :visible.sync="page.show" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
    <!-- 页面配置项，single无需配置 -->
    <!-- 饿了么走马灯模式 -->
    <carsousel v-if="page.pageType === PageTypeEnum.carsousel.id"></carsousel>

  </el-dialog>
</template>

<style scoped lang="scss">

</style>
