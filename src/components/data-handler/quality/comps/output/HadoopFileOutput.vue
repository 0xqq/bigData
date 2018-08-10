<script>

  import FormItemList from "../form-item/FormItemList";
  import HadoopCluster from "../form-item/HadoopCluster";
  import FoldFileBrowe from "../form-item/FoldFileBrowe";
  import CheckBox from "../form-item/CheckBox";
  import TextInput from "../form-item/TextInput";

  export default {
    components: {
      TextInput,
      CheckBox,
      FoldFileBrowe,
      HadoopCluster,
      FormItemList},
    props: {
      'label': {default: ""},
      'data': {}
    },
    data() {
      return {
        vmodeData:false,
        "fileNameInField":{value:""},
        "fileNameField":{value:""},
        "create_parent_folder":{value:""},
        "do_not_open_new_file_init":{value:""},
        "extention":{value:""},
        "split":{value:""},
        "haspartno":{value:""},
        "add_date":{value:""},
        "add_time":{value:""},
        "SpecifyFormat":{value:""},
        "date_time_format":{value:""},
        "add_to_result_filenames":{value:""}
      }
    },

    mounted() {

    },

    watch:{
      data:function(){

      }
    },

    computed: {
    },

    methods: {
      initData(){

      },

      changeHandler(){

      }
    }
  }
</script>

<template>
    <!--文件-->
    <div width="100%" >

      <v-group-iwt style="width:100%;">
        <hadoop-cluster></hadoop-cluster>
        <fold-file-browe></fold-file-browe>
        <check-box label="创建父目录" :data="create_parent_folder"></check-box>
        <check-box label="从字段中获取文件名" :data="fileNameInField"></check-box>
        <text-input label="文件名字段" :data="fileNameField"></text-input>
        <check-box label="启动时不创建文件" :data="do_not_open_new_file_init"></check-box>
        <text-input label="扩展名" :data="extention"></text-input>
        <check-box label="文件名里包含步骤数?" :data="split"></check-box>
        <check-box label="文件名里包含数据分区号?" :data="haspartno"></check-box>
        <check-box label="文件名里包含日期?" :data="add_date"></check-box>
        <check-box label="文件名里包含时间?" :data="add_time"></check-box>
        <check-box label="指定日期时间格式" :data="SpecifyFormat"></check-box>
        <text-input label="日期时间格式" :data="date_time_format"></text-input>
        <check-box label="结果中添加文件名" :data="add_to_result_filenames"></check-box>
      </v-group-iwt>

    </div>
</template>

<style scoped>

</style>
