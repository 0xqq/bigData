<script>
  import ComboBox from "@/common/comps/normal/form/ComboBox" ;
  import TableColumnBase from "../base/TableColumnBase" ;

  export default {
    components: {ComboBox},
    mixins:[TableColumnBase],
    props: {
      'label': {default: ""},
      'data': {},
      "owner":{},
      'desc':{default:""}
    },

    data() {
      return {
        dataProvider: [],
        vmodeData: ""
      }
    },

    mounted() {
      this.initData();
    },

    watch: {
      data: function () {
        this.initData();
      }
    },

    computed: {},

    methods: {
      initData() {
        this.dataProvider = [];
        this.vmodeData = "";
        if (!this.data)
          return ;
        if(this.data.desc )
        this.desc = this.data.desc ;
        if (this.data)
          this.vmodeData = this.data.value;
        if(this.data.params && this.data.params.list)
          this.dataProvider = this.data.params.list;

        //自动查询列表
        this.queryFieldList() ;
      },

      changeHandler(value) {
        if (!this.data)
          return;
        this.vmodeData = value ;
        this.data.value = this.vmodeData;
      }
    }
  }
</script>

<template>
  <h-group-iwt style="width:100%;height:30px;">
    <div class="tj-diy-form-item-lb">{{label}}：</div>
    <combo-box style="width:100%"
               @change="changeHandler"
               :labelField="'label'"
               :valueField="'value'"
               :valueData="vmodeData"
               :dataProvider="dataProvider">
    </combo-box>
    <!--<el-select  style="width:100%"-->
                <!--size="mini"-->
                <!--v-model="vmodeData"-->
                <!--placeholder="&#45;&#45;请选择&#45;&#45;" >-->
      <!--<el-option v-for="item in dataProvider"-->
                 <!--:key="item.value"-->
                 <!--:label="item.label"-->
                 <!--:value="item.value">-->
      <!--</el-option>-->
    <!--</el-select>-->

    <div v-if="desc" class="tj-diy-form-item-desc" :title="desc" > </div>
  </h-group-iwt>
</template>

<style scoped>

</style>
