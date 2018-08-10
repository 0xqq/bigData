import Core from "./Core";
/**
 * 参数说明详见v-charts bmap
 */
export default class BMap extends Core{
  constructor(){
    super()
    this.data = {
      /**
       * 构建SQL过程中，形成了columns的具体取值
       * 除此之外，其他位置无需进行编辑
       */
      columns: [],
      /**
       *
       */
      rows: []
    }
    this.settings = {
      /**
       * 百度/高德地图 access_key
       */
      key: "",
      /**
       * 百度/高德地图版本,默认2.0(百度)/1.4.3(高德)
       */
      v: "",
      /**
       * 	百度地图配置项
       */
      bmap: {center:[],zoom:[],roam:[],mapStyle:[]},
      /**
       * 高德地图配置项
       */
      amap: {},
      /**
       * 使用全局的地图依赖,布尔型
       */
      useOuterMap: undefined
    }
  }

  /**
   * 覆盖父类方法
   * 仅设计子类自身属性值设置
   * @param source
   * @param target
   */
  init(source,target=this){
    this.copyAttribute(source.data, target.data, 'columns')
    this.copyAttribute(source.data, target.data, 'rows')

    this.copyAttribute(source.settings, target.settings, 'key')
    this.copyAttribute(source.settings, target.settings, 'v')
    this.copyAttribute(source.settings, target.settings, 'bmap')
    this.copyAttribute(source.settings, target.settings, 'amap')
    this.copyAttribute(source.settings, target.settings, 'useOuterMap')

    this.initCore(source,target)
  }
}

