import FormItemUtils from "@/common/utils/FormItemUtils" ;
import ProcessAPI from "@/common/service/ProcessAPI";

export default {

  methods: {
    queryFieldList() {
      if (!this.data || !this.data.get)
        return;
      let type = "table";
      if(this.data.get)
        type = this.data.get;

      //先支持表输入
      if (type.indexOf("table")>-1 )
        this.queryTableCols();
      // if (type.indexOf("col")>-1 )
      //   this.queryProssCols();
    },

    /**
     * 查询表列 直接处理不读参数
     */
    queryTableCols() {
      if (!this.data || !this.data.get)
        return;

      let send = {} ;
      let tid = FormItemUtils.getFormData(this.owner, "tableId");
      send = {dataResourceId: tid};

      let _this = this;
      ProcessAPI.queryTableFields(send).then(
        (result) => {
          let _list = this.initList(result.data.list,"columnName","columnName") ;
          this.listResultHandler(_list) ;
        },
        () => {
          this.listResultHandler([]) ;
        }
      );
    },

    /**
     * 初始化列表为本地格式
     */
    initList(list,nameAtt,valueAtt){
      let _arr = [] ;
      for(let item of list ){
        let colItem = {label:item[nameAtt],value:item[valueAtt],data:item} ;
        _arr.push(colItem) ;
      }
      return _arr ;
    },

    /**
     * 列表加载返回处理
     * @param arr
     */
    listResultHandler(arr){
      if(this.dataProvider)
        this.dataProvider = arr ;
    }

  }
};
