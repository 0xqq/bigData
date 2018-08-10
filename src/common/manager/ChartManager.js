class ChartManager{
}

/**
 * 所有的图表先写这里
 * @type {Array}
 */
ChartManager.charts = [
  {name:"2d",label:"2D图表",type:"group",children:[
      {name:"base",label:"基础图表",type:"group",children:[
          {name:"TableChart",label:"表格",type:"chart",vs:"1.0",path:"tj",desc:"",
            fields:[
              {label:"显示字段",name:"x",value:"*",req:true}
            ],
            props:[
              {name:"pSize",value:"50",label:"单次加载数量",type:"NumberInput"},
              {name:"columnWidth",value:"0",label:"列宽",type:"NumberInput"},
              {name:"rowHeight",value:"30",label:"行高",min:"0",type:"NumberInput"},
              {name:"border",value:"2,#242a30",label:"外边框",type:"Border",min:"0",max:"100"},
              {name:"headHeight",value:"45",label:"表头高度",type:"NumberInput",max:"500"},
              {name:"headBgColors",value:"true,#242a30,#242a30",label:"表头背景",type:"MoreColorShow"},
              {name:"headFont",value:"#ffffff,15,true",label:"表头文字",type:"Font"},
              {name:"align",value:"1,1",label:"表头对齐",type:"ComboBoxList",list:[['水平左对齐','水平居中','水平右对齐'],['垂直顶部','垂直居中','垂直底部']]},
              {name:"headSplit",value:"1,#242a30",label:"表头分割线",type:"Border",min:0,max:100},
              {name:"headBLine",value:"1,#242a30",label:"表头底线",type:"Border",min:0,max:10},
              {name:"cBgColors",value:"false,#f7f3f7,#fffbff",label:"背景色",type:"ShowDbColors"},
              {name:"vLine",value:"false,#242a30,1",label:"垂线样式",type:"BorderShow"},
              {name:"hLine",value:"true,#242a30,1",label:"横线样式",type:"BorderShow"},
              {name:"cFont",value:"#313031,12,false",label:"内容字体样式",type:"Font"},
              {name:"align",value:"1",label:"文字对齐",type:"ComboBoxList",list:[['水平左对齐','水平居中','水平右对齐'],['垂直顶部','垂直居中','垂直底部']]},
              {name:"wbrk",value:"false",label:"自动换行",type:"CheckBox"},
              {name:"pbFont",value:"#000000,13,false",label:"加载按钮样式",type:"Font"}
            ],
            action:[
              {name:"click",label:"鼠标单击",type:"data"}
            ]
          },

          {name:"PieChart",label:"饼图",type:"chart",vs:"1.0",path:"e4",desc:"",
            fields:[
              {label:"数值字段",name:"x",type:"number",value:"",req:true},
              {label:"字段名称",name:"y",value:""}
            ],
            props:[
              {name:"colors",label:"扇区颜色",value:"#c23531,#314656,#61a0a8,#dd8668,#91c7ae,#6e7074,#61a0a8,#bda29a,#44525d,#c4ccd3",type:"MoreColor"},
              {name:"showLb",value:"true",label:"是否显示文字",type:"CheckBox"},
              {name:"lbFont",value:"#000000,12,false",label:"字体样式",type:"Font"},
              {name:"showLine",value:"true",label:"显示指示线",type:"CheckBox"},
              {name:"lg",value:"true",label:"图例样式",type:"Legend"}
            ],
            action:[
              {name:"click",label:"扇区单击",type:"data"}
            ]
          },

          {name:"RPieChart",label:"环形饼图",type:"chart",vs:"1.0",path:"e4",desc:"",
            fields:[
              {label:"数值字段",name:"x",type:"number",value:"",req:true},
              {label:"字段名称",name:"y",value:""}
            ],
            props:[
              {name:"colors",label:"扇区颜色",value:"#c23531,#314656,#61a0a8,#dd8668,#91c7ae,#6e7074,#61a0a8,#bda29a,#44525d,#c4ccd3",type:"MoreColor"},
              {name:"sAngle",label:"内半径百分比",value:40,min:0,max:60,type:"number" },
              {name:"eAngle",label:"外半径百分比",value:60,min:60,max:100,type:"number" },
              {name:"showLb",value:"true",label:"是否显示文字",type:"CheckBox"},
              {name:"lbFont",value:"#000000,12,false",label:"字体样式",type:"Font"},
              {name:"showLine",value:"true",label:"显示指示线",type:"CheckBox"},
              {name:"lg",value:"true",label:"图例样式",type:"Legend"}
            ],
            action:[
              {name:"click",label:"扇区单击",type:"data"}
            ]
          },

          {name:"ColumnChart",label:"柱图",type:"chart",vs:"1.0",path:"e4",desc:"",
            fields:[
              {label:"横轴字段",name:"x",value:"",more:true,req:true},
              {label:"数值字段",name:"y",value:"",type:"number",more:true,req:true},
              {label:"字段别名",name:"z",value:"",more:true}
            ],
            props:[
              {name:"colors",label:"柱体颜色",type:"MoreColor",value:"#c23531,#314656,#61a0a8,#dd8668,#91c7ae,#6e7074,#61a0a8,#bda29a,#44525d,#c4ccd3"},
              {name:"colBorStyle",value:"#333333,0,0",label:"柱体边框",type:"border" },
              {name:"colRadius",value:"0",label:"柱体圆角半径",type:"numericStepper",max:50 },
              {name:"clbFont",value:"true,#ffffff",label:"柱体字体样式",type:"FontShow"},
              {name:"clbpos",label:"柱体标签位置",type:"ComboBox",value:"0",list:['内部','外部']},

              {name:"grid",value:"",label:"背景样式", type:"Grid"},
              {name:"xax",value:"",label:"横轴样式",type:"Xax"},
              {name:"yax",value:"",label:"竖轴样式",type:"Yax"},
              {name:"lg",value:"",label:"图例样式",type:"Legend"}
            ],
            action:[
              {name:"click",label:"鼠标单击",type:"data"}
            ]
          },

          {name:"LineChart",label:"折线",type:"chart",vs:"1.0",path:"e4",desc:"",
            fields:[
              {label:"横轴字段",name:"x",value:"",more:true,req:true},
              {label:"数值字段",name:"y",value:"",type:"number",more:true,req:true},
              {label:"字段别名",name:"z",value:"",more:true}
            ],
            props:[
              {name:"colors", label:"线颜色",type:"MoreColor",value:"#c23531,#314656,#61a0a8,#dd8668,#91c7ae,#6e7074,#61a0a8,#bda29a,#44525d,#c4ccd3"},
              {name:"l_weight",value:"2",label:"线粗度", type:"NumberInput",max:50 },
              {name:"lsmooth",value:"false",label:"平滑为曲线", type:"checkbox"},
              {name:"clbFont",value:"true,#4cd10f",label:"标签样式", type:"FontShow"},

              {name:"grid",value:"",label:"背景样式", type:"Grid"},
              {name:"xax",value:"",label:"横轴样式",type:"Xax"},
              {name:"yax",value:"",label:"竖轴样式",type:"Yax"},
              {name:"lg",value:"",label:"图例样式",type:"Legend"}
            ],
            action:[
              {name:"click",label:"鼠标单击",type:"data"}
            ]
          },
        ]},
      {name:"map",label:"地图",type:"group",children:[

        ]},
      {name:"relation",label:"关系型图表",type:"group",children:[

        ]},
      {name:"other",label:"其它",type:"group",children:[

        ]}
    ]},
  {name:"3d",label:"3D图表",type:"group",children:[

    ]}
] ;


/**
 * 系统默认的布局
 * @type {Array}
 */
ChartManager.layout = [

  //基本自由布局 + 浮动
  {id:"Layout_Float",name:"Layout_Float",label:"拖曳约束布局",config:{
  }},

  //纯浮动布局
  {id:"Float",name:"Float",label:"自由浮动布局",config:{
    }}
] ;

export default ChartManager ;
