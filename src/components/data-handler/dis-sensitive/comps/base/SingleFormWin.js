import NormalUtils from "../../../../../common/utils/NormalUtils";

export default {
  props: {
    "owner":{},
    'data': {}
  },
  data() {
    return {
    };
  },

  watch:{
    "data":function(){
      this.initData() ;
    }
  },

  mounted(){
    this.initData() ;
  },

  methods: {

    /**
     * 初始化数据
     */
    initData(){

    },

    /**
     * 初始化所有表单项
     * @param form
     * @param owner
     */
    initFormDatas(form,owner=null){
      if(!owner)
        owner = this.owner ;
      if(!owner)
        return ;

      let map = NormalUtils.array2Map(owner,"name") ;
      for(let att in form){
        if(map.hasOwnProperty(att))
          form[att] = map[att].value ;
      }
    },

    /**
     * 刷新所有表单项
     */
    refreshDatas(form,owner=null){
      if(!owner)
        owner = this.owner ;
      if(!owner)
        return ;

      let map = NormalUtils.array2Map(owner,"name") ;
      for(let att in form){
        if(map.hasOwnProperty(att))
          map[att].value = form[att] ;
      }
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
