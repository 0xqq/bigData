export default {
  props: {
    "owner":{},
    'data': {},
    'label': {default: ""},
    'field':{default:""},
    'input':{default:""},
    desc:{default: ""}
  },
  data() {
  },

  watch:{
    "data":function(){
      this.initBaseData() ;
    },
    "input":function(){
      this.initInput();//随便写这了
    }
  },

  mounted(){
    this.initBaseData() ;
    this.initInput();
  },

  methods: {

    /**
     * 初始化基本数据
     */
    initBaseData(){

      //重置数据
      this.resetData() ;

      //如果数据为空不处理
      if(!this.data)
        return ;

      //初始化表单数据
      this.initFormData();

      //初始化其它数据
      this.initData() ;
    },

    initInput(){

    },

    /**
     * 重置视图数据
     */
    resetData(){

    },

    /**
     * 初始化表单数据
     */
    initFormData(){

    },

    /**
     * 初始化数据
     */
    initData(){

    },

    /**
     * 刷新表单项
     */
    changeHandler( value = null ,def=true){
      if(!this.data)
        return ;

      if(def && value===null && this.hasOwnProperty("valueModel"))
        value = this.getChangeValue(this["valueModel"] );

      if(value!==null && this.data){
        this.data.value = value ;
        this.$emit("change", value) ;
      }
    },

    /**
     * 不参合
     */
    getChangeValue(){

    },

    /**
     * 获得配置信息
     * @param name
     * @param def
     */
    initConfigValue( name ){
      if(this.data.config && this.data.config.hasOwnProperty(name))
        this[name] = this.data.config[name] ;
    },

    /**
     * 获得表单项数据
     * @param owner
     * @param name
     * @param def
     * @returns {string}
     */
    getFormData( name,owner=null, def = "") {
      if(!owner)
        owner = this.owner ;
      if(!owner)
        return def;

      for (let item of owner) {
        if (item.name === name) {
          return item.value;
          break;
        }
      }
      return def;
    },

    /**
     * 设置表单某项数据
     * @param owner
     * @param name
     * @param value
     */
    setFormData( name, value ,owner=null) {
      if(!owner)
        owner = this.owner ;
      if(!owner)
        return ;
      for (let item of owner) {
        if (item.name === name) {
          item.value = value;
          break;
        }
      }
    }


  }
};
