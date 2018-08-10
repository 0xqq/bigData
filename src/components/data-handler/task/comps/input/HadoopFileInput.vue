<script>

  import FormItemList from "../form-item/FormItemList";
  import FoldFileBrowe from "../form-item/FoldFileBrowe";
  import CheckBox from "../form-item/CheckBox";
  import TextInput from "../form-item/TextInput";
  import ComboBox from "../form-item/ComboBox";
  import CheckTextInput from "../form-item/CheckTextInput";

  export default {
    components: {
      CheckTextInput,
      ComboBox,
      TextInput,
      CheckBox,
      FoldFileBrowe,
      FormItemList},
    props: {
      'label': {default: ""},
      'data': {}
    },
    data() {
      return {
        tabs:[{label:"文件"},{label:"内容"},{label:"错误处理"},{label:"过滤"},{label:"字段"}],
        currentIndex:0,
        vmodeData:false,
        files:{
          value:"",
          params:{
            col:[
              {name:"source_configuration_name",type:"ComboBox",value:"",label:"Environment",
                params:{list:[
                    {label:"Local",value:"Local"}
                  ]}},
              {name:"name",type:"TextInput",value:"",label:"File/Folder"},
              {name:"filemask",type:"TextInput",value:"",label:"通配符"},
              {name:"file_required",type:"ComboBox",value:"",label:"要求",
                params:{list:[
                    {label:"是",value:"Y"},{label:"否",value:"N"}
                  ]}},
              {name:"include_subfolders",type:"ComboBox",value:"",label:"包含子目录",
                params:{list:[
                    {label:"是",value:"Y"},{label:"否",value:"N"}
                  ]}}
            ]
          }
        },
        file:{
          accept_filenames:{value:""},//	从以前的步骤接受文件名
          passing_through_fields:{value:""},	//从以前的步骤接受字段名
          accept_field:{value:""},	//在输入里的字段被当做文件名
          accept_stepname:{value:""},	//步骤读取的文件名来自
        },

        type:{ value:""},//文件类型
        limit:{ value:""},//记录数量限制
        separator:{ value:""},//分隔符
        enclosure:{ value:""},//文本限定符
        enclosure_breaks:{ value:""},//在文本限定符里允许换行 	N	"是 : Y; e:false
        escapechar:{ value:""},//逃逸字符
        header:{ value:""},//头部 Y	"是 : Y;
        nr_headerlines:{ value:""},//头部行数量
        footer:{ value:""},//尾部 	N	"是 : Y;
        nr_footerlines:{ value:""},//尾部行数量
        line_wrapped:{ value:""},//
        nr_wraps:{ value:""},//
        layout_paged:{ value:""},//分页布局 	N	"是 : Y;
        nr_lines_per_page:{ value:""},//每页记录行数
        nr_lines_doc_header:{ value:""},//文档头部行数
        compression:{value:"",params:{list:[
              {label:"none",value:"none"},
              {label:"Zip",value:"Zip"},
              {label:"GZip",value:"GZip"}
            ]}},//压缩
        noempty:{ value:""},//没有空行  Y	"是 : Y;
        include:{ value:""},//在输出包括字段名
        include_field:{ value:""},//包含文件名的字段名称
        rownum:{ value:""},//输出包含行数  "是 : Y;
        rownumByFile:{ value:""},//按文件取行号  	"是 : Y;
        rownum_field:{ value:""},//行数字段名
        format:{ value:""},//格式
        encoding:{ value:""},//编码方式
        date_format_lenient:{ value:""},//	解析日期时候是否严格要求	Y	"是 : Y;
        date_format_locale:{ value:""},//	本地日期格式
        add_to_result_filenames:{ value:""},//添加文件名	Y	"是 : Y;

        filters:{
          value:"",
          params:{
            col:[
              {name:"filter_string",label:"过滤字符串",type:"TextInput"},
              {name:"filter_position",label:"过滤器位置",type:"TextInput"},
              {name:"filter_is_last_line",label:"停止在过滤器",type:"ComboBox", params:{list:[
                    {label:"是",value:"Y"},{label:"否",value:"N"}
                  ]}},
              {name:"filter_is_positive",label:"积极匹配",type:"ComboBox", params:{list:[
                    {label:"是",value:"Y"},{label:"否",value:"N"}
                  ]}}
            ]
          }
        },
        error:{
          error_ignored:{value:""},//忽略错误 check
          skip_bad_files:{value:""},
          file_error_field:{value:""},
          file_error_message_field:{value:""},
          error_line_skipped:{value:""},//跳过错误行
          error_count_field:{value:""},//错误计数字段
          error_fields_field:{value:""},//	错误字段文件名
          error_text_field:{value:""},//错误文本字段
          bad_line_files_destination_directory:{value:""},//告警文件目录
          bad_line_files_extension:{value:""},//扩展名	warning
          error_line_files_destination_directory:{value:""},//错误文件目录
          error_line_files_extension:{value:""},//扩展名	error
          line_number_files_destination_directory:{value:""},//失败行数文件目录
          line_number_files_extension:{value:""}//扩展名	line
        },
        fields:{
          value:"",
          params:{
            col:[
              {name:"name",label:"名称",type:"TextInput"},
              {name:"type",label:"类型",type:"TextInput"},
              {name:"format",label:"格式",type:"TextInput" },
              {name:"currency",label:"货币类型",type:"TextInput" },
              {name:"decimal",label:"小数",type:"TextInput" },
              {name:"group",label:"分组",type:"TextInput" },

              {name:"nullif",label:"Null if",type:"TextInput" },
              {name:"ifnull",label:"默认",type:"TextInput" },
              {name:"position",label:"位置",type:"TextInput" },
              {name:"length",label:"长度",type:"TextInput" },
              {name:"precision",label:"精度",type:"TextInput" },
              {name:"trim_type",label:"去除空字符串方式",type:"ComboBox", params:{list:[
                    {label:"不去掉空格",value:"none"},
                    {label:"去掉左空格",value:"left"},
                    {label:"去掉右空格",value:"right"},
                    {label:"去掉左右两端空格",value:"both"}
                  ]}},
              {name:"repeat",label:"重复",type:"ComboBox", params:{list:[
                    {label:"是",value:"Y"},{label:"否",value:"N"}
                  ]}}
            ]
          }
        }
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
      <s-tab-content :dataProvider="tabs" @change="(val)=>{this.currentIndex=val;}" style="width:100%;">
        <div   v-show="currentIndex===0" style="width:100%;">

        </div>
        <div v-show="currentIndex===1" style="width:100%;">
           <!--<combo-box label="文件类型" :data="type" ></combo-box>-->
           <!--<text-input label="分隔符" :data="separator"></text-input>-->
          <!--<text-input label="文本限定符" :data="enclosure"></text-input>-->
          <!--<check-box label="在文本限定符里允许换行" :data="enclosure_breaks"></check-box>-->
          <!--<text-input label="逃逸字符" :data="escapechar"></text-input>-->
          <!--<check-box label="头部" :data="header"></check-box>-->
          <!--<h-group-iwt style="width:100%;">-->
            <!--<check-box label="头部" ></check-box>-->
            <!--<text-input label="头部行数量" :data="nr_headerlines"></text-input>-->
          <!--</h-group-iwt>-->
          <!--<h-group-iwt style="width:100%;">-->
            <!--<check-box label="尾部" :data="" ></check-box>-->
            <!--<text-input label="尾部行数量" :data="nr_footerlines"></text-input>-->
          <!--</h-group-iwt>-->
          <!--<h-group-iwt style="width:100%;">-->
            <!--<check-box label="包装行？" :data="line_wrapped"></check-box>-->
            <!--<text-input label="以时间包装的行数" :data="nr_wraps"></text-input>-->
          <!--</h-group-iwt>-->
          <!--<h-group-iwt style="width:100%;">-->
            <!--<check-box label="分页布局" :data="layout_paged"></check-box>-->
            <!--<text-input label="每页记录行数" :data="nr_lines_per_page"></text-input>-->
            <!--<text-input label="文档头部行数" :data="nr_lines_doc_header"></text-input>-->
          <!--</h-group-iwt>-->
          <!--<combo-box label="压缩" :data="compression"></combo-box>-->
          <!--<check-box label="没有空行" :data="noempty"></check-box>-->
          <!--<h-group-iwt style="width:100%;">-->
            <!--<check-box label="在输出包括字段名" :data="include"></check-box>-->
            <!--<text-input label="包含文件名的字段名称" :data="include_field"></text-input>-->
          <!--</h-group-iwt>-->
          <!--<h-group-iwt style="width:100%;">-->
            <!--<check-box label="输出包含行数" :data="rownum"></check-box>-->
            <!--<text-input label="行数字段名" :data="rownum_field"></text-input>-->
            <!--<check-box label="按文件取行号" :data="rownumByFile"></check-box>-->
          <!--</h-group-iwt>-->
          <!--<combo-box label="格式" :data="format"></combo-box>-->
          <!--<combo-box label="编码方式" :data="encoding"></combo-box>-->
          <!--<text-input label="记录数量限制" :data="limit"></text-input>-->
          <!--<check-box label="解析日期时候是否严格要求" :data="date_format_lenient"></check-box>-->
          <!--<text-input label="本地日期格式" :data="date_format_locale"></text-input>-->
          <!--<check-box label="结果文件-添加文件名" :data="add_to_result_filenames"></check-box>-->
        </div>
        <div  v-show="currentIndex===2" style="width:100%;">


          <!--error_ignored:{value:""},//忽略错误 check-->
          <!--skip_bad_files:{value:""},-->
          <!--file_error_field:{value:""},-->
          <!--file_error_message_field:{value:""},-->
          <!--error_line_skipped:{value:""},//跳过错误行-->
          <!--error_count_field:{value:""},//错误计数字段-->
          <!--error_fields_field:{value:""},//	错误字段文件名-->
          <!--error_text_field:{value:""},//错误文本字段-->
          <!--bad_line_files_destination_directory:{value:""},//告警文件目录-->
          <!--bad_line_files_extension:{value:""},//扩展名	warning-->
          <!--error_line_files_destination_directory:{value:""},//错误文件目录-->
          <!--error_line_files_extension:{value:""},//扩展名	error-->
          <!--line_number_files_destination_directory:{value:""},//失败行数文件目录-->
          <!--line_number_files_extension:{value:""}//扩展名	line-->

        </div>
        <div   v-show="currentIndex===3" style="width:100%;">
          过滤

        </div>
        <div  v-show="currentIndex===4" style="width:100%;">
          字段

        </div>
      </s-tab-content>


  </div>
</template>

<style scoped>

</style>
