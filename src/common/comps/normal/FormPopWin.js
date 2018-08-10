export default {
  props: {

  },

  data() {
    return {
      isPopWin: false,
      isLoading: false
    };
  },

  methods: {

    /**
     * 弹出窗口
     * @param datas
     * @param options
     */
    open(datas,options) {
      this.isPopWin = true ;
      this.doOpen(datas,options) ;
    },

    /**
     * 执行打开  子类 覆盖
     * @param datas
     * @param options
     */
    doOpen(datas,options){

    },

    /**
     * 查询
     * @param param
     * @param successfunc
     * @param errorfunc
     * @param qmethod
     */
    query(param,successfunc=null,errorfunc=null,qmethod=null){
      this.sendQueryParams(qmethod,param,successfunc,errorfunc) ;
    },

    /**
     * 弹出信息
     * @param message
     * @param type
     */
    popMessage(message,type){
      this.$message.info(message) ;
    },

    /**
     * 独立一个查询
     */
    sendQueryParams(qmethod,param,successfunc=null,errorfunc=null){
      if(!qmethod)
        return ;
      this.isLoading = true ;
      qmethod(param).then(
        (result)=>{
          this.isLoading = false ;
          if(!successfunc)
            this.sendQueryParamsHandler(result) ;
          else
            successfunc(result) ;
        },
        (info)=>{
          this.isLoading = false ;
          if(errorfunc)
            errorfunc(info) ;
          else
            this.faultHandler(info) ;
        }
      );
    },

    /**
     * 补充数据
     */
    initData(value,toobj){
      if(!toobj)
        toobj = this ;
      if(value)
        Object.assign(toobj, value);
      return toobj ;
    },

    /**
     * 补充数据
     */
    initDataForm(value, att , toObj=null){
      if(!toObj)
        toObj = this  ;
      if(!toObj.hasOwnProperty(att) || !toObj[att])
        toObj[att] = {} ;
      this.initData(value,toObj[att]) ;
      return toObj[att] ;
    },

    /**
     * 工具方法 获得列表
     * @param result
     * @returns {Array}
     */
    getResultList(result,att="list" ,datt="data"){
      if(result && result.hasOwnProperty(datt) && result[datt] && result[datt].hasOwnProperty(att)){
        let re = result[datt][att] ;
        if(Array.isArray(re))
          return re ;
        else if(re)
          return [ re ] ;
      }
      return [] ;
    },

    /**
     * 通信失败
     * @param info
     */
    faultHandler(info){
      this.isLoading = false ;
    },

    /**
     * 关闭窗口
     * @param props
     */
    closeWin(props) {
      this.isPopWin = false ;
    }
  }
};
