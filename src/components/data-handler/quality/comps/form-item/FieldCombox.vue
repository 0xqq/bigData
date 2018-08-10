<script>
  import ComboBox from "@/common/comps/normal/form/ComboBox" ;
  import ProcessAPI from "@/common/service/ProcessAPI" ;
  import TaskManagerPM from "../../TaskCreatePM" ;
  import Inject from "@/common/model/Inject" ;

  export default {
    components: {ComboBox},
    props: {
      'label': {default: ""},
      'data': {},
      "owner":{},
      'desc':{default:""}
    },

    data() {
      this.ownerPM = Inject.getClass(TaskManagerPM);//先走功能 后面整理 temp?
      return {
        dataProvider: [],
        vmodeData: "",
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value5: [],
        value11: []
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

    computed: {

    },

    methods: {
      initData() {
        this.dataProvider = [];
        this.vmodeData = "";
        if (!this.data)
          return;
        if (this.data.desc)
          this.desc = this.data.desc;
        if (this.data)
          this.vmodeData = this.data.value;
        // this.queryCluster();
      },

      /**
       * 查询平台处理
       */
      queryCluster() {
        let _this = this;

        //组装临时模型数据
        let currentNode = this.ownerPM.getCurrentNode();
        let saveData = this.ownerPM.getSaveData(false);
        if (!saveData) {
          _this.$emit("result", []);
          return;
        }

        //设置当前步骤名称
        saveData.model["step_name"] = currentNode.data.name;


        console.log(saveData.model.transformation.step[0].tableId);

        let send={
          dataResourceId:saveData.model.transformation.step[0].tableId
        };

        //获得字段
        ProcessAPI.queryTableFields(send).then(
          (result) => {
            let columns = this.initList(result.data.list, "columnName", "columnName");
            this.dataProvider = columns;
          },
          () => {
            this.dataProvider = [];
          }
        );
      },


    initList(list,nameAtt,valueAtt){
      let _arr = [] ;
      for(let item of list ){
        let colItem = {label:item.columnName,value:item.columnName,data:item} ;
        _arr.push(colItem) ;
      }
      return _arr ;
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

    <div style="flex:none;margin-left:5px;">
      <el-button type="primary"
                 size="mini"
                 @click="()=>{this.queryCluster()}">获取字段</el-button>
    </div>

    <div v-if="desc" class="tj-diy-form-item-desc" :title="desc" > </div>
  </h-group-iwt>



</template>

<style scoped>

</style>
