class SuanziManager{

}

/**
 * 输入类型
 * @type {string}
 */
SuanziManager.GROUP_INPUT = "input" ;
/**
 * 处理类型
 * @type {string}
 */
SuanziManager.GROUP_OPERATOR = "handler" ;
/**
 * 输出类型
 * @type {string}
 */
SuanziManager.GROUP_OUT = "out" ;

/**
 * 算子控件列表  配置信息 简单分开 有可能后台返回列表
 * @type {*[]}
 */
SuanziManager.controls = [
  {
    label: "数据转换",
    name: "datatrans",
    type: "group",
    icon: "tj-leimupinleifenleileibie2",
    children: [
      // { name: "Unique", label: "去除重复记录", icon: "tj-msnui-running", type: "handler"},
      { name: "UniqueRowsByHashSet", label: "去除重复记录", icon: "tj-msnui-running", type: "handler"},
      {name: "NumberRange", label: "数值范围", icon: "tj-msnui-running", type: "handler"},
      {name: "ReplaceString", label: "字符串替换", icon: "tj-msnui-running", type: "handler"},
      { name: "StringOperations", label: "字符串操作", icon: "tj-msnui-running", type: "handler" },
      { name: "FieldSplitter", label: "拆分字段", icon: "tj-msnui-running", type: "handler"  }
    ]
  },
  {
    label: "数据清洗",
    name: "datafilter",
    type: "group",
    icon: "tj-leimupinleifenleileibie2",
    children: [
      { name: "NumberRangeValidator", label: "数值范围判断", icon: "tj-msnui-running", type: "handler"},
      { name: "NullValidator", label: "空值判断", icon: "tj-msnui-running", type: "handler"},
      {name: "UniqueValidator", label: "重复判断", icon: "tj-msnui-running", type: "handler"},
      {name: "UrlValidator", label: "URL检验", icon: "tj-msnui-running", type: "handler"},
      {name: "IdCardValidator", label: "身份证检验", icon: "tj-msnui-running", type: "handler"},

    ]
  },
  {
    label: "输出",
    type: "group",
    icon: "tj-leimupinleifenleileibie2",
    children: [
      {name: "TableOutput", label: "表输出", icon: "tj-msnui-running", type: "out"},
      {name: "HiveOutput", label: "Hive Output", icon: "tj-msnui-running", type: "out"},
      {name: "HBaseOutput", label: "HBase Output", icon: "tj-msnui-running", type: "out"},
      {name: "HadoopFileOutputPlugin", label: "Hadoop File Output", icon: "tj-msnui-running", type: "out"}
    ]
  },
  {
    label: "输入",
    type: "group",
    icon: "tj-leimupinleifenleileibie2",
    children: [
      {name: "HadoopFileInputPlugin", label: "Hadoop File Input", icon: "tj-msnui-running", type: "input"}
    ]
  },
  // {
  //   label: "文件管理",
  //   type: "group",
  //   icon: "tj-leimupinleifenleileibie2",
  //   children: [
  //     {name: "ZipFile", label: "Zip 压缩文件", icon: "tj-msnui-running", type: "input"},
  //     {name: "UnZipFile", label: "解压缩文件", icon: "tj-msnui-running", type: "input"}
  //   ]
  // }
] ;

/**
 * 脱敏算子列表
 * @type {*[]}
 */
SuanziManager.tuominControls = [
  {
    label: "脱敏处理",
    name: "datatrans",
    type: "group",
    icon: "tj-leimupinleifenleileibie2",
    children: [
      { name: "PartMasking", label: "部分遮盖", icon: "tj-msnui-running", type: "handler"},
      { name: "DeleteMasking", label: "删除遮蔽", icon: "tj-msnui-running", type: "handler"},
      {name: "RandomMasking", label: "随机遮盖", icon: "tj-msnui-running", type: "handler"},
      { name: "EncryptionMasking", label: "加密", icon: "tj-msnui-running", type: "handler"},
    ]
  },
  {
    label: "输出",
    type: "group",
    icon: "tj-leimupinleifenleileibie2",
    children: [
      {name: "TableOutput", label: "表输出", icon: "tj-msnui-running", type: "out"},
      {name: "HiveOutput", label: "Hive Output", icon: "tj-msnui-running", type: "out"},
      {name: "HBaseOutput", label: "HBase Output", icon: "tj-msnui-running", type: "out"},
      {name: "HadoopFileOutputPlugin", label: "Hadoop File Output", icon: "tj-msnui-running", type: "out"}
    ]
  },
] ;

/**
 * 数据质量算子列表
 * @type {*[]}
 */
SuanziManager.qualityControls = [
  {
    label: "数据清洗",
    name: "datafilter",
    type: "group",
    icon: "tj-leimupinleifenleileibie2",
    children: [
      { name: "range", label: "数值范围判断", icon: "tj-msnui-running", type: "handler"},
      { name: "empty", label: "空值判断", icon: "tj-msnui-running", type: "handler"},
      {name: "repeat", label: "重复判断", icon: "tj-msnui-running", type: "handler"},
      {name: "url", label: "URL检验", icon: "tj-msnui-running", type: "handler"},
      {name: "identity", label: "身份证检验", icon: "tj-msnui-running", type: "handler"},
    ]
  },
] ;

/**
 * 数据控制对应表单
 * @type {{quchong: {formItems: *[]}, shuzhifanwei: {formItems: *[]}, quchong: {formItems: *[]}, quchong: {formItems: *[]}, quchong: {formItems: *[]}, quchong: {formItems: *[]}, quchong: {formItems: *[]}, quchong: {formItems: *[]}, quchong: {formItems: *[]}, quchong: {formItems: *[]}}}
 */
SuanziManager.controlOptionForm = {
  "TableInput":{
    vs:"1.0",
    icon: "tj-biaoge1",
    group: "input",
    formItems: [
      {name:"name",type: "TextInput", value:"表输入", label: "步骤名称",dis:true },
      {name:"type",type: "",value:"TableInput", hide:true},
      {name:"description",type: "TextInput", value:"", label: "步骤描述"},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"connection",type: "",value:"", hide:true},
      {name:"schema",type: "",value:"", hide:true},
      {name:"table",type: "",value:"", hide:true},
      {name:"tableId",type: "",value:"", hide:true},
      {name:"limit",type: "TextInput", value:"0", label: "记录数量限制"},
      {name:"lazy_conversion_active",type: "CheckBox", value:"N", label: "允许简易转换"},
      {name:"increment,increment_field_name",type:"CheckComboBox",get:"table", value: "N",mode:1, label: "增量获取数据", clb: "增量字段"},
      {name:"fields.field",type:"DataGrid",def:[], value:"",list:"", label: "选择处理字段",//field
        check:true,
        get:{
          type:"table",
          param:{dataResourceId:"$tableId"},
          nameField:[{t:"name",f:"value"}],
          fill:{type:"fill"}
        },
        params: {
          col: [
            {name: "name", label: "字段名称", type: "TextInput"},
            {name: "columnStyle", label: "类型", type: "TextInput"},
            {name: "columnLength", label: "长度", type: "TextInput"},
            {name: "comment", label: "注释", type: "TextInput"}
          ]
        }
      }
    ]
  },

  "TableOutput":{
    vs:"1.0",
    icon: "tj-biaoge1",
    group: "out",
    formItems: [
      {name:"name",type: "TextInput", value:"表输出", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"TableOutput", hide:true},
      {name:"description",type: "TextInput", value:"", label: "步骤描述"},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"connection",type: "TextInput",value:"",hide:true },
      {name:"table",type: "SelectTable",value:"", label: "输出表"},
      {name:"tableId",type: "",value:"", hide:true},
      {name:"schema",type: "TextInput",value:"",label: "模式", hide:true},
      {name:"commit",type: "TextInput", value:"1000", hide:true},
      {name:"specify_fields",type: "CheckBox",label: "指定数据库字段", value:"Y",mode:1},
      {name:"fields.field",type:"DataGrid",def:[], value:"",list:"", label: "输出字段",//
        get:{
          type:"col,table",
          param:{dataResourceId:"$tableId"},
          fill:{type:"source",hasTable:true,list:[0,"t:1"]}
        },
        params: {
          col: [
            /*{name: "column_name", label: "字段名称",type: "ComboBox",isFiled:true,list:"0"},
            {name: "stream_name", label: "输出字段名称",type: "ComboBox",isFiled:true,list:"1"}*/
            {name: "stream_name", label: "字段名称0",type: "ComboBox",isFiled:true,list:"0"},
            {name: "column_name", label: "输出字段名称",type: "ComboBox",isFiled:true,list:"1"}
          ]
        }
      }
    ]
  },

  "Unique":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"去除重复记录", label: "步骤名称",dis:true},
      {name:"description",type: "TextInput", value:"", label: "步骤描述"},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"copies",type: "",value:"1", hide:true},
      {name:"type",type: "",value:"Unique", hide:true},
      {name:"count_rows,count_field",type:"checkTextInput", value: "N,''",mode:1, label: "增加计数器到输出？", clb: "计数器字段"},
      {name:"reject_duplicate_row,error_description",type: "checkTextInput",mode:1, value: "N,''", label: "重定向重复记录", clb: "错误描述"},
      {name:"fields.field",type: "dataGrid",def:[],list:"", value: "", label: "用来比较的字段(没有条目意味着：比较现在完成了)",
        get:{
          type:"col",
          nameField:[{t:"in_stream_name",f:"columnName"}],
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "name", label: "字段名称",type: "ComboBox",isFiled:true,list:0},
            {
              name: "case_insensitive",
              label: "忽略大小写",
              type: "ComboBox",
              params: {list: [{label: "Y", value: "Y"}, {label: "N", value: "N"}]}
            }
          ]
        }
      }
    ]
  },

  "UniqueRowsByHashSet":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"去除重复记录", label: "步骤名称",dis:true},
      {name:"description",type: "TextInput", value:"", label: "步骤描述"},
      {name:"type",type: "",value:"UniqueRowsByHashSet", hide:true},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"copies",type: "",value:"1", hide:true},
      {name:"store_values",type: "CheckBox",value:"N",label:"使用存储的记录值进行比较?"},
      {name:"count_rows,count_field",type:"checkTextInput", value: "N,''",mode:1, label: "增加计数器到输出？", clb: "计数器字段", hide:true},
      {name:"reject_duplicate_row,error_description",type: "checkTextInput",mode:1, value: "N,''", label: "重定向重复记录", clb: "错误描述" },
      {name:"fields.field",type: "dataGrid",def:[],list:"", value: "", label: "用来比较的字段(没有条目意味着：比较现在完成了)",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "name", label: "字段名称",type: "ComboBox",isFiled:true,list:0},
          ]
        }
      }
    ]
  },

  "range":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"id",type: "fieldcombox", value:"", label: "增量字段"},
      {name:"age",type: "fieldcombox",value:"", label: "查询字段" },
      {name:"col",type: "fieldcombox", value:"", label: "查询条件"},
      {name:"typeVa",type: "fieldcombox",value:"", label: "查询" },

      {
        name: "where", type: "dataGrid",def:[], value: "",list:"", showDef:"true",label: "需要检验的字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "column", label: "字段", type: "ComboBox",isFiled:true,list:0},
            {name: "exp", label: "值", type: "TextInput"},
            {name: "and_or", label: "类型", type: "TextInput"}
          ],
          defaultData:[
            {column:"",exp:"='1'",and_or:"and"},
            {column:"",exp:"='1'",and_or:""}
          ]
        }
      }
    ]
  },

  "empty":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"id",type: "fieldcombox", value:"", label: "增量字段"},
      {name:"age",type: "fieldcombox",value:"", label: "查询字段" },
      {name:"col",type: "fieldcombox", value:"", label: "查询条件"},
      {name:"typeVa",type: "fieldcombox",value:"", label: "查询" },
      {
        name: "where", type: "dataGrid",def:[], value: "",list:"", showDef:"true",label: "需要检验的字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "column", label: "字段", type: "ComboBox",isFiled:true,list:0},
            {name: "exp", label: "值", type: "TextInput"},
            {name: "and_or", label: "类型", type: "TextInput"}
          ],
          defaultData:[
            {column:"",exp:"='1'",and_or:"and"},
            {column:"",exp:"='1'",and_or:""}
          ]
        }
      }
    ]
  },

  "repeat":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"id",type: "fieldcombox", value:"", label: "增量字段"},
      {name:"age",type: "fieldcombox",value:"", label: "查询字段" },
      {name:"col",type: "fieldcombox", value:"", label: "查询条件"},
      {name:"typeVa",type: "fieldcombox",value:"", label: "查询" },
      {
        name: "where", type: "dataGrid",def:[], value: "",list:"", showDef:"true",label: "需要检验的字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "column", label: "字段", type: "ComboBox",isFiled:true,list:0},
            {name: "exp", label: "值", type: "TextInput"},
            {name: "and_or", label: "类型", type: "TextInput"}
          ],
          defaultData:[
            {column:"",exp:"='1'",and_or:"and"},
            {column:"",exp:"='1'",and_or:""}
          ]
        }
      }
    ]
  },

  "url":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"id",type: "fieldcombox", value:"", label: "增量字段"},
      {name:"age",type: "fieldcombox",value:"", label: "查询字段" },
      {name:"col",type: "fieldcombox", value:"", label: "查询条件"},
      {name:"typeVa",type: "fieldcombox",value:"", label: "查询" },
      {
        name: "where", type: "dataGrid",def:[], value: "",list:"", showDef:"true",label: "需要检验的字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "column", label: "字段", type: "ComboBox",isFiled:true,list:0},
            {name: "exp", label: "值", type: "TextInput"},
            {name: "and_or", label: "类型", type: "TextInput"}
          ],
          defaultData:[
            {column:"",exp:"='1'",and_or:"and"},
            {column:"",exp:"='1'",and_or:""}
          ]
        }
      }
    ]
  },

  "identity":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"id",type: "fieldcombox", value:"", label: "增量字段"},
      {name:"age",type: "fieldcombox",value:"", label: "查询字段" },
      {name:"col",type: "fieldcombox", value:"", label: "查询条件"},
      {name:"typeVa",type: "fieldcombox",value:"", label: "查询" },
      {
        name: "where", type: "dataGrid",def:[], value: "",list:"", showDef:"true",label: "需要检验的字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "column", label: "字段", type: "ComboBox",isFiled:true,list:0},
            {name: "exp", label: "值", type: "TextInput"},
            {name: "and_or", label: "类型", type: "TextInput"}
          ],
          defaultData:[
            {column:"",exp:"='1'",and_or:"and"},
            {column:"",exp:"='1'",and_or:""}
          ]
        }
      }
    ]
  },



  "NumberRange":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"数值范围", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"NumberRange", hide:true},
      {name:"description",type: "TextInput", value:"", label: "步骤描述"},
      {name:"copies",type: "TextInput",value:"1", label: "改变开始复制的数量" },
      {name:"inputField",type: "fieldcombox", value: "", label: "输入字段" },
      {name:"outputField",type: "TextInput",value: "", label: "输出字段"},
      {name:"fallBackValue",type: "TextInput", value: "unknown", label: "缺省值（如果没有匹配到范围）"},
      {name:"rules.rule",type: "dataGrid",def:[],list:"", label: "范围（最小<=x<最大）", showDef:"true", value:"",//rule
        params: {
          col: [
            {name: "lower_bound", label: "下限", type: "TextInput"},
            {name: "upper_bound", label: "上限", type: "TextInput"},
            {name: "value", label: "值", type: "TextInput"}
          ],
          defaultData:[
            {lower_bound:"-1.7976931348623157E308",upper_bound:"5.0",value:"小于5"},
            {lower_bound:"5.0",upper_bound:"10.0",value:"5-10"},
            {lower_bound:"10.0",upper_bound:"1.7976931348623157E308",value:"大于等于10"}
          ]
        }
      }
    ]
  },

  "ReplaceString":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"字符串替换", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"ReplaceString", hide:true},
      {name:"fields.field",type: "dataGrid",def:[], label: "字段",list:"", showDef:"true", value:"",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "in_stream_name", label: "输入流字段", type: "ComboBox",isFiled:true,list:0 },
            {name: "out_stream_name", label: "输出流字段", type: "TextInput"},
            {name: "use_regex", label: "使用正则表达式", type: "ComboBox",mw:"120",def:"Y",params:{
              list:[{label:"是",value:"Y"},{label:"否",value:"N"}]}
            },
            {name: "replace_string", label: "搜索",mw:"80", type: "TextInput"  },
            {name: "replace_by_string", label: "使用...替换", type: "TextInput"  },
            {name: "set_empty_string", label: "设置为空串", type: "ComboBox",def:"N",params:{
                list:[{label:"是",value:"Y"},{label:"否",value:"N"}]}
            },
            {name: "replace_field_by_string", label: "使用字段值替换",mw:"120",
              type: "ComboBox",isFiled:true },
            {name: "whole_word", label: "整个单词匹配", type: "ComboBox",def:"Y",params:{
                list:[{label:"是",value:"Y"},{label:"否",value:"N"}]}
            },
            {name: "case_sensitive", label: "大小写敏感", type: "ComboBox",def:"Y",params:{
                list:[{label:"是",value:"Y"},{label:"否",value:"N"}]}
            },
            {name: "is_unicode", label: "Is Unicode", type: "ComboBox",def:"N",params:{
                list:[{label:"是",value:"Y"},{label:"否",value:"N"}]}
            }
          ],
          defaultData:[   ]
        }
      }
    ],
    btn:["获取字段"]
  },

  "StringOperations":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"字符操作", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"StringOperations", hide:true},
      {name:"copies",type: "TextInput", value:"1", hide:true, label: "改变开始复制的数量"},
      {name:"description",type: "",value:"", hide:true},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"custom_distribution",type: "",value:"Y", hide:true},
      {name:"fields.field",type: "dataGrid",def:[], value: "",list:"", label: "操作字段",
        get:{
          type:"col",
          nameField:[{t:"in_stream_name",f:"columnName"}],
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "in_stream_name", label: "输入流字段", type: "ComboBox",isFiled:true,list:0},
            {name: "out_stream_name", label: "输出流字段", type: "TextInput" },
            {name: "trim_type", label: "Trim type",value:"both", type: "ComboBox",params:{
              list:[{label:"none",value:"none"},{label:"left",value:"left"},
                {label:"right",value:"right"},{label:"both",value:"both"}]}
            },
            {name: "lower_upper", label: "Lower/Upper",mw:"120", type: "ComboBox",params:{
                list:[{label:"none",value:"none"},{label:"lower",value:"lower"},
                  {label:"upper",value:"upper"} ]}
            },
            {name: "padding_type", label: "Padding type", mw:"120",type: "TextInput",params:{
                list:[{label:"none",value:"none"},{label:"left",value:"left"},
                  {label:"right",value:"right"} ]}
            },
            {name: "pad_char", label: "Pad char", type: "TextInput"},
            {name: "pad_len", label: "Pad len", type: "TextInput"},
            {name: "init_cap", label: "InitCap", type: "ComboBox",params:{
                list:[{label:"是",value:"yes"},{label:"否",value:"no"} ]}
            },
            {name: "mask_xml", label: "Mask xml",  type: "ComboBox",params:{
                list:[{label:"none",value:"none"},{label:"escapexml",value:"escapexml"} ,
                  {label:"cdata",value:"cdata"},{label:"unescapexml",value:"unescapexml"},
                  {label:"escapesql",value:"escapesql"},{label:"escapehtml",value:"escapehtml"},
                  {label:"unescapehtml",value:"unescapehtml"}]}
            },
            {name: "digits", label: "Digits", type: "TextInput",type: "ComboBox",params:{
                list:[{label:"none",value:"none"},{label:"digits_only",value:"digits_only"} ,
                  {label:"remove_digits",value:"remove_digits"} ]}
            },
            {name: "remove_special_characters", label: "Remove special characters", mw:"200",type: "ComboBox",params:{
                list:[{label:"none",value:"none"},{label:"cr",value:"cr"} ,
                  {label:"lf",value:"lf"} ,{label:"crlf",value:"crlf"},{label:"tab",value:"tab"},{label:"espace",value:"espace"} ]}
            }
          ]
        }
      }
    ]
  },

  "UniqueValidator":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"重复判断", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"UniqueValidator", hide:true},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"copies",type: "",value:"1", hide:true},
      {
        name: "fields.field", type: "dataGrid",def:[], value: "",list:"", label: "用来比较的字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "name", label: "字段名称",  type: "ComboBox",isFiled:true,list:0}
          ]
        }
      }
    ]
  },

  "UrlValidator":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"URL检验", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"UrlValidator", hide:true},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"copies",type: "",value:"1", hide:true},
      {
        name: "fields.field", type: "dataGrid",def:[], value: "",list:"", label: "需要检验的字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "name", label: "字段名称",  type: "ComboBox",isFiled:true,list:0}
          ]
        }
      }
    ]
  },
  "IdCardValidator":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"身份证检验", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"IdCardValidator", hide:true},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"copies",type: "",value:"1", hide:true},
      {
        name: "fields.field", type: "dataGrid",def:[], value: "",list:"", label: "需要检验的字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "name", label: "字段名称",  type: "ComboBox",isFiled:true,list:0}
          ]
        }
      }
    ]
  },

  "NullValidator":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"空值判断", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"NullValidator", hide:true},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"copies",type: "",value:"1", hide:true},
      {
        name: "fields.field", type: "dataGrid",def:[], value: "",list:"", label: "需要检验的字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "name", label: "字段名称",  type: "ComboBox",isFiled:true,list:0}
          ]
        }
      }
    ]
  },

  "NumberRangeValidator":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"数值范围判断", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"NumberRangeValidator", hide:true},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"copies",type: "",value:"1", hide:true},
      {
        name: "fields.field", type: "dataGrid",def:[], value: "",list:"", label: "用来检验的字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "name", label: "字段名称",  type: "ComboBox",isFiled:true,list:0},
            {name: "min_value", label: "最小值",  type: "TextInput" },
            {name: "max_value", label: "最大值",  type: "TextInput" }
          ]
        }
      }
    ]
  },

  "FieldSplitter":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"拆分字段", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"FieldSplitter", hide:true},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"copies",type: "TextInput",value: "1", label: "改变开始复制的数量" },
      {name:"splitfield",type: "fieldcombox",isFiled:true, value: "", label: "要拆分的字段" },
      {name:"delimiter",type: "TextInput", value: "", label: "分隔符"},
      {
        name: "fields.field", type: "dataGrid",def:[], value: "",list:"", label: "字段",
        params: {
          col: [
            {name: "name", label: "新的字段", type: "TextInput"},
            {name: "id", label: "ID", type: "TextInput"},
            {name: "idrem", label: "移除ID",value:"N", type: "ComboBox", params: {
                list: [
                  {label: "是", value: "Y"}, {label: "否", value: "N"}]
              }
            },
            {name: "type", label: "类型",value:"String", type: "ComboBox", params: {
                list: [
                  {label: "String", value: "String"},
                  {label: "Date", value: "Date"},
                  {label: "Boolean", value: "Boolean"},
                  {label: "Integer", value: "Integer"},
                  {label: "Number", value: "Number"},
                  {label: "Boolean", value: "Boolean"},
                  {label: "BigNumber", value: "BigNumber"},
                  {label: "Binary", value: "Binary"},
                  {label: "Timestamp", value: "Timestamp"},
                  {label: "Internet Address", value: "Internet Address"}
                ]
              }
            },
            {name: "length", label: "长度", type: "TextInput"},
            {name: "precision", label: "精度", type: "TextInput"},
            {name: "ifnull", label: "Nullif", type: "TextInput"},
            {name: "format", label: "格式", type: "TextInput"},
            {name: "group", label: "分组符号", type: "TextInput"},
            {name: "decimal", label: "小数点符号", type: "TextInput"},
            {name: "currency", label: "货币符号", type: "TextInput"},
            {name: "trimtype", label: "去除空格类型",value:"both", type: "ComboBox", params: {
                list: [
                  {label: "不去掉空格", value: "none"},
                  {label: "去掉左空格", value: "left"},
                  {label: "去掉右空格", value: "right"},
                  {label: "去掉左右两端空格", value: "both"}
                ]
              }
            }
          ]
        }
      }
    ]
  },

  //no
  "HadoopFileInputPlugin":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"Hadoop File Input", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"HadoopFileInputPlugin", hide:true},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"copies",type: "",value:"1", hide:true},
      {name:"accept_filenames",type: "",value:"N", hide:true},
      {name:"passing_through_fields",type: "",value:"N", hide:true},

      { name: "", type: "group", value: [
          { name: "file", type: "content", label: "文件", value: [
              {
                name: "files.file", type: "dataGrid",def:[], value: "",list:"", label: "",
                params: {
                  col: [
                    {name: "source_configuration_name",label: "集群",value:"",type:"ClusterComboBox"},
                    {name: "name", label: "文件名/路径", type: "TextInput"},
                    {name: "filemask", label: "通配符", type: "TextInput"},
                    {name: "file_required", label: "要求",value:"",hide:true, type: "TextInput" },
                    {name: "include_subfolders", label: "包含子目录",value:"N", type: "ComboBox", params: {
                        list: [
                          {label: "是", value: "Y"}, {label: "否", value: "N"}
                        ]
                      }
                    }
                  ]
                }
              },
            ]},

          { name: "content", type: "content", label: "内容", value:[
              {name: "files.type",type:"",value:"CSV",label:"文件类型", hide:true,
                // params: {
                //   list: [
                //     {label: "CSV", value: "CSV"},
                //     {label: "Fixed", value: "Fixed"}
                //   ]
                // }
              },
              {name: "separator",type:"TextInput",value:";",label:"分隔符"},
              {name: "enclosure",type:"TextInput",value:"\\",label:"文本限定"},
              {name: "enclosure_breaks",type:"CheckBox",value:"N",label:"在文本限定符里允许换行？"},
              // {name: "taoyizifu",type:"TextInput",value:"",label:"逃逸字符"},
              {name: "header,nr_headerlines",type:"checkTextInput",mode:1,value:"Y,1",label:"头部",clb:"头部行数量"},
              {name: "footer,nr_footerlines",type:"checkTextInput",mode:1,value:"N,1",label:"尾部",clb:"尾部行数量"},
              {name: "line_wrapped,nr_wraps",type:"checkTextInput",value:"N,1",label:"包装行",clb:"以时间包装的行数"},
              {name: "layout_paged",type:"checkList",value:"N",label:"分页布局",
                formList:[
                  {name: "nr_lines_per_page",type:"TextInput",value:"80",label:"每页记录行数"},
                  {name: "nr_lines_doc_header",type:"TextInput",value:"0",label:"文档头部行"}
                ]
              },
              { name: "files.compression", type: "ComboBox", value: "None", label: "压缩",
                params: {
                  list: [
                    {label: "None", value: "None"},
                    {label: "Zip", value: "Zip"},
                    {label: "GZip", value: "GZip"},
                    {label: "Hadoop-snappy", value: "Hadoop-snappy"},
                    {label: "Snappy", value: "Snappy"}
                  ]
                }
              },
              {name: "noempty",type:"CheckBox",value:"N",label:"没有空行"},
              {name: "include",type:"CheckBox",value:"N",label:"输出包括字段名"},
              {name: "rownum",type:"CheckBox",value:"N",label:"输出包含行数"},
              {name: "rownumByFile",type:"CheckBox",value:"N",label:"按文件取行号"},
              {name: "format",type:"ComboBox",value:"Unix",label:"格式",
                params: {
                  list: [
                    {label: "DOS", value: "DOS"},
                    {label: "mixed", value: "mixed"},
                    {label: "Unix", value: "Unix"}
                  ]
                }
              },
              {name: "encoding",type:"ComboBox",value:"UTF-8",label:"编码方式",
                params: {
                  list: [
                    {label: "UTF-8", value: "UTF-8"},
                    {label: "UTF-16", value: "UTF-16"},
                    {label: "UTF-32", value: "UTF-32"},
                    {label: "US-ASCII", value: "US-ASCII"},
                    {label: "GBK", value: "GBK"},
                    {label: "GB2312", value: "GB2312"},
                    {label: "GB18030", value: "GB18030"},
                    {label: "Big5", value: "Big5"},
                    {label: "Big5-HKSCS", value: "Big5-HKSCS"}
                  ]
                }
              },
              {name: "limit",type:"TextInput",value:"0",label:"记录数量限制"},
              {name: "date_format_lenient",type:"CheckBox",value:"N",label:"解析旧期格式是否严格要求"},
              {name: "date_format_locale",type:"ComboBox",value:"",label:"本地日期格式",
                params: {
                  list: [
                    {label: "ar_AE", value: "ar_AE"},
                    {label: "ar_JO", value: "ar_JO"},
                    {label: "ar_SY", value: "ar_SY"},
                    {label: "hr_HR", value: "hr_HR"},
                    {label: "fr_BE", value: "fr_BE"},
                    {label: "es_PA", value: "es_PA"},
                    {label: "mt_MT", value: "mt_MT"},
                    {label: "es_VE", value: "es_VE"},
                    {label: "bg", value: "bg"},
                    {label: "zh_TW", value: "zh_TW"},
                    {label: "it", value: "it"},
                    {label: "ko", value: "ko"},
                    {label: "uk", value: "uk"},
                    {label: "lv", value: "lv"}
                  ]//
                }
              },
          ]},

          { name: "ziduan", type: "content", label: "字段", value:[
              {
                name: "fields.field", type: "dataGrid",def:[], value: "",list:"", label: "",
                get:{
                  type:"col",
                  query:"hdfs",
                  fill:{type:"source",list:[0]}
                },
                params: {
                  col: [
                    {name: "name", label: "名称", type: "ComboBox",isFiled:true,list:"0"},
                    {name: "type", label: "类型",value:"String", type: "ComboBox", params: {
                        list: [
                          {label: "String", value: "String"},
                          {label: "Date", value: "Date"},
                          {label: "Boolean", value: "Boolean"},
                          {label: "Integer", value: "Integer"},
                          {label: "Number", value: "Number"},
                          {label: "Boolean", value: "Boolean"},
                          {label: "BigNumber", value: "BigNumber"},
                          {label: "Binary", value: "Binary"},
                          {label: "Timestamp", value: "Timestamp"},
                          {label: "Internet Address", value: "Internet Address"}
                        ]
                      }
                    },
                    {name: "position", label: "位置", type: "TextInput"},
                    {name: "length", label: "长度", type: "TextInput"},
                    {name: "precision", label: "精度", type: "TextInput"},
                    // {name: "ifnull", label: "Nullif", type: "TextInput"},
                    // {name: "format", label: "格式", type: "TextInput"},
                    // {name: "decimal", label: "小数点符号", type: "TextInput"},
                    // {name: "currency", label: "货币符号", type: "TextInput"},
                    {name: "trim_type", label: "去除空格类型",value:"both", type: "ComboBox", params: {
                        list: [
                          {label: "不去掉空格", value: "none"},
                          {label: "去掉左空格", value: "left"},
                          {label: "去掉右空格", value: "right"},
                          {label: "去掉左右两端空格", value: "both"}
                        ]
                      }
                    },
                    {name: "repeat", label: "重复",value:"", type: "ComboBox", params: {
                        list: [
                          {label: "Y", value: "Y"},
                          {label: "N", value: "N"}
                        ]
                      }
                    }
                  ]
                }
              },
          ]}
      ]}
    ]
  },

  //ok
  "HBaseOutput": {
    vs: "1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name: "name", type: "TextInput", value: "HBaseOutput", label: "步骤名称",dis:true},
      { name: "", type: "group", value: [
          { name: "ConfigureConnection", type: "content", label: "Configure connection", value: [
              {name: "cluster_name",label:"Hadoop cluster", type: "hadoopcluster", value: ""},
             /* {name: "zookeeper_hosts",label:"zookeeper_hosts", type: "TextInput", value: ""},
              {name: "zookeeper_port",label:"zookeeper_port", type: "TextInput", value: ""},
              {name: "core_config_url",label:"Url to hbase-site.xml", type: "localfilebrowse", value: ""},
              {name: "default_config_url",label:"Url to hbase-default.xml", type: "localfilebrowse", value: ""},*/
              {name: "target_table_name",label:"HBase table name", type: "hbasetablename", value: ""},
              {name: "target_mapping_name",label:"Mapping name", type: "getmappingname", value: ""},
              /*{name: "store_mapping_info",label:"Store mapping info in step meta data", type: "CheckBox", value: ""},
              {name: "disable_wal",label:"Disable write to WAL", type: "CheckBox", value: ""},
              {name: "write_buffer_size",label:"Size of write buffer (bytes)", type: "TextInput", value: ""}*/
          ]},
          {
            name: "", type: "content", label: "Create/Edit mappings", value: [
              {name: "",label:"", type: "mappingconfig", value: ""}
            ]
          }
        ]
      }
    ]
  },

  //ok
  "HadoopFileOutputPlugin": {
    vs: "1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name: "name", type: "TextInput", value: "HadoopFileOutput", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"HadoopFileOutputPlugin", hide:true},
      {name: "description", type: "TextInput", value: "", label: "步骤描述" },
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"custom_distribution",type: "",value:"", hide:true},
      {name:"copies",type: "",value:"1", hide:true},
      { name: "", type: "group", value: [
          { name: "", type: "file", label: "文件", value: [
              {name: "file.source_configuration_name", label: "集群", type: "ClusterComboBox", value: ""},
              {name: "file.name", label: "文件路径/目录路径", type: "TextInput", value: ""},
              { name: "file.is_command", label: "结果输送至命令行或脚本", value: "N", type: "CheckBox"  },
              { name: "file.servlet_output", label: "输出传递到servlet", value: "N", type: "CheckBox"   },
              { name: "file.do_not_open_new_file_init", label: "启动时不创建文件", value: "N", type: "CheckBox"  },
             /* {name: "extention", type: "TextInput", value: "txt", label: "扩展名" },*/
              {name: "file.extention", type: "TextInput", value: "txt", label: "扩展名" },
              { name: "file.split", label: "文件名里包含步骤数？", value: "N", type: "CheckBox" },
              { name: "file.haspartno", label: "文件名里包含数据分区号？", value: "N", type: "CheckBox" },
              { name: "file.add_date", label: "文件名里包含日期？", value: "N", type: "CheckBox" },
              { name: "file.add_time", label: "文件名里包含时间？", value: "N", type: "CheckBox" },
              { name: "file.SpecifyFormat", label: "指定日期时间格式？", value: "N", type: "CheckList",list:[
                  {name: "file.date_time_format", label: "日期时间格式？", value: "N", type: "TextInput"}
                ] },
              { name: "file.add_to_result_filenames", label: "结果中添加文件名？", value: "Y", type: "CheckBox" }
            ]
          },
          { name: "", type: "content", label: "内容", value: [
              { name: "file.append", label: "追加方式", value: "N", type: "CheckBox" },
              {name: "separator", label: "分隔符", type: "TextInput", value: ";"},
              {name: "enclosure", label: "封闭符", type: "TextInput", value: "\""},
              {name: "enclosure_forced", label: "强制在字段周围加封闭符？", type: "CheckBox", value: "N"},
              {name: "enclosure_fix_disabled", label: "禁用封闭符修复", type: "CheckBox", value: "N"},
              {name: "header", label: "头部", type: "CheckBox", value: "Y"},
              {name: "footer", label: "尾部", type: "CheckBox", value: "N"},
              {
                name: "format", label: "格式", type: "ComboBox", value: "UNIX", params: {
                  list: [
                    {label: "CR+LF terminated(Windows,DOS)", value: "DOS"},
                    {label: "LF terminated (Unix)", value: "UNIX"},
                    {label: "CR terminated", value: "CR"},
                    {label: "No new-line terminated", value: "None"}
                  ]
                }
              },
              { name: "compression", type: "ComboBox", value: "None", label: "压缩",
                params: {
                  list: [
                    {label: "None", value: "None"},
                    {label: "Zip", value: "Zip"},
                    {label: "GZip", value: "GZip"},
                    {label: "Hadoop-snappy", value: "Hadoop-snappy"},
                    {label: "Snappy", value: "Snappy"}
                  ]
                }
              },
              {name: "encoding",type:"ComboBox",value:"UTF-8",label:"编码方式",
                params: {
                  list: [
                    {label: "UTF-8", value: "UTF-8"},
                    {label: "UTF-16", value: "UTF-16"},
                    {label: "UTF-32", value: "UTF-32"},
                    {label: "US-ASCII", value: "US-ASCII"},
                    {label: "GBK", value: "GBK"},
                    {label: "GB2312", value: "GB2312"},
                    {label: "GB18030", value: "GB18030"},
                    {label: "Big5", value: "Big5"},
                    {label: "Big5-HKSCS", value: "Big5-HKSCS"}
                  ]
                }
              },
              { name: "file.fast_dump", label: "快速数据存储", value: "N", type: "CheckBox" ,hide:true},
              { name: "file.pad", label: "", value: "N", type: "" ,hide:true},
              {name: "file.splitevery", label: "分拆...每一行", value: "0", type: "TextInput" }
              // {name: "endedLine", label: "添加文件结束行", type: "TextInput", value: ""},
            ]
          },
          {
            name: "", type: "content", label: "字段", value: [
              {
                name: "fields.field", type: "dataGrid",def:[], label: "", value: "",
                get:{
                  type:"col",
                  fill:{type:"source",list:[0]}
                },
                params: {
                  col: [
                    {name: "name", label: "名称", type: "ComboBox",isFiled:true,list:"0"},
                    {name: "type", label: "类型",value:"String", type: "ComboBox", params: {
                        list: [
                          {label: "String", value: "String"},
                          {label: "Date", value: "Date"},
                          {label: "Boolean", value: "Boolean"},
                          {label: "Integer", value: "Integer"},
                          {label: "Number", value: "Number"},
                          {label: "Boolean", value: "Boolean"},
                          {label: "BigNumber", value: "BigNumber"},
                          {label: "Binary", value: "Binary"},
                          {label: "Timestamp", value: "Timestamp"},
                          {label: "Internet Address", value: "Internet Address"}
                        ]
                      }
                    },
                    {name: "length", label: "长度", type: "TextInput"},
                    {name: "precision", label: "精度", type: "TextInput"},
                    {name: "decimal", label: "小数点符号", type: "TextInput"},
                    {name: "currency", label: "货币符号", type: "TextInput"},
                    {name: "trim_type", label: "去除空格类型",value:"both", type: "ComboBox", params: {
                        list: [
                          {label: "不去掉空格", value: "none"},
                          {label: "去掉左空格", value: "left"},
                          {label: "去掉右空格", value: "right"},
                          {label: "去掉左右两端空格", value: "both"}
                        ]
                      }
                    },
                    {name: "ifnull", label: "NULL", type: "TextInput"}
                  ]
                }
              }
            ]
          },
        ]
      }
    ]
  },

  HiveOutput:{
    vs: "1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name: "name", type: "TextInput", value: "Hive Output", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"HiveOutput", hide:true},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"copies",type: "",value:"1", hide:true},
      {name:"file.tableId",type: "",value:"", hide:true},
      {name:"file.table",type: "SelectTable",isHive:true, connection:"file.connection" ,tableId:"file.tableId" ,value:"",label: "输出表"},
      {name:"file.connection",type: "",value:"", hide:true},
      {name:"file.source_configuration_name",label: "Hadoop集群",value:"",type:"ClusterComboBox"},
      {name:"fields.field",type:"DataGrid",def:[], value:"", label: "输出字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "name", label: "字段名称",type: "ComboBox",isFiled:true,list:"0"},
          ]
        }
      }

    ]
  },

  ZipFile:{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "ZipFile", value:"Zip文件压缩" },
      {name:"test1",type: "", value:"测试0001", hide:true},
      {name:"test2",type: "", value:"测试0002", hide:true},
      {name:"test3",type: "", value:"测试0003", hide:true},
    ]
  },

  UnZipFile:{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"解压缩文件", label: "步骤名称",dis:true}
    ]
  },
  //部分遮盖
  "PartMasking":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"部分遮盖", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"PartMasking", hide:true},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"copies",type: "",value:"1", hide:true},
      {
        name: "fields.field", type: "dataGrid",def:[], value: "",list:"", label: "部分遮盖的字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "name", label: "字段名称",  type: "ComboBox",isFiled:true,list:0},
            {name: "begin_index", label: "遮盖开始位置",value:"", type: "TextInput",isNum:true },
            {name: "end_index", label: "遮盖结束位置",value:"", type: "TextInput",isNum:true }
          ]
        }
      }
    ]
  },
  //加密遮盖
  'EncryptionMasking':{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"加密", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"EncryptionMasking", hide:true},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"copies",type: "",value:"1", hide:true},
      {
        name: "fields.field", type: "dataGrid",def:[], value: "",list:"", label: "加密的字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "name", label: "字段名称",type: "ComboBox",isFiled:true,list:0},
            {name: "encrypt", label: "加密、解密",value:"both",isFiled:true,type:"ComboBox",params: {
                list: [
                  {label: "加密",value:'Y'},
                  {label: "解密",value:'N'}
                ]
              }
            },
          ]
        }
      }
    ]
  },
  //删除遮盖
  "DeleteMasking":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"删除遮盖", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"DeleteMasking", hide:true},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"copies",type: "",value:"1", hide:true},
      {
        name: "fields.field", type: "dataGrid",def:[], value: "",list:"", label: "删除遮盖的字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "name", label: "字段名称",  type: "ComboBox",isFiled:true,list:0},
          ]
        }
      }
    ]
  },
  //随机遮盖
  "RandomMasking":{
    vs:"1.0",
    icon: "tj-msnui-running",
    group: "handler",
    formItems: [
      {name:"name",type: "TextInput", value:"随机遮盖", label: "步骤名称",dis:true},
      {name:"type",type: "",value:"RandomMasking", hide:true},
      {name:"distribute",type: "",value:"Y", hide:true},
      {name:"copies",type: "",value:"1", hide:true},
      {
        name: "fields.field", type: "dataGrid",def:[], value: "",list:"", label: "随机遮盖的字段",
        get:{
          type:"col",
          fill:{type:"source",list:[0]}
        },
        params: {
          col: [
            {name: "name", label: "字段名称",  type: "ComboBox",isFiled:true,list:0},
          ]
        }
      }
    ]
  }
} ;

/**
 * temp
 * @param node
 * @returns {*}
 */
SuanziManager.getNodeOptionForm = function(node) {
  let option = node.options;
  if (SuanziManager.controlOptionForm.hasOwnProperty(node.name)) {
    let config = SuanziManager.controlOptionForm[node.name];
    config = NormalUtils.copyObjectDeep(config) ;//拷贝一份
    if (option)
      SuanziManager.jionNodeOption(option, config);
    return config;
  }
  return option;
}

/**
 * temp
 * @param node
 * @returns {*}
 */
SuanziManager.getNodeOption = function(type) {
  if (!SuanziManager.controlOptionForm.hasOwnProperty(type))
    return {} ;
  let config = SuanziManager.controlOptionForm[type];
  config = NormalUtils.copyObjectDeep(config) ;//拷贝一份
  return config;
}

/**
 * 合并用户设置的信息 以及当前最新的配置项
 * @param fromData
 * @param toData
 * @returns {*[]|*}
 */
SuanziManager.jionNodeOption = function( fromData, toData ){
  let _list = toData.formItems ;
  let _flist = fromData.formItems ;
  let _map = {} ;
  _flist.forEach((item)=>{
    _map[item.name] = item ;
  }) ;
  _list.forEach((item)=>{
    if(_map.hasOwnProperty(item.name)){
      let _data = _map[item.name] ;
      item.value = _data.value ;

      //如果设置过此值会修改
      if(_data.hasOwnProperty("showDef"))
        item.showDef = _data.showDef ;
    }
  })
  return _list ;
}


export default SuanziManager ;
