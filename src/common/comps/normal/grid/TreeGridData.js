/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
export default class TreeGridData {

  constructor() {
    this.data = {
      sourceList: []
    }
    this.defOpen = false ;
    this.source = [] ;//原始数据源
    this.treeData = [] ;//树形数据源
  }

  /**
   *
   * @param value[{children:[]}]
   */
  setGridData( value ) {
     let arr = value ;
     if(!Array.isArray(value))
       arr = [value] ;
    this.source = arr?arr:[] ;
    this.initTreeData( ) ;
    this.initGridData() ;
  }

  /**
   * 初始化树数据
   * @param arr
   * @param defOpen
   */
  initTreeData( ){
    let arr = this.source ;
    let list = [] ;
    NormalUtils.travelTree(arr,(item,level,pItem)=> {
      let opt = {
        level: level,
        path:"",
        isLeaf: true,
        isOpen:false
      };
      if (item.children && item.children.length > 0)
        opt.isLeaf = false;
      item.__treeOption = opt;
      list.push(item) ;
    }) ;
    this.treeData = list ;
    NormalUtils.showObjStr(list) ;
  }

  /**
   * 初始化grid数组
   */
  initGridData(){
    if(this.defOpen){
      for(let item of this.treeData){
        item.__treeOption.isOpen = true ;
      }
      this.data.sourceList = [...this.treeData] ;
    }
    else
      this.data.sourceList = [...this.source] ;
  }

  /**
   * 打开所有节点
   */
  openAll(){
    for(let item of this.treeData){
      item.__treeOption.isOpen = true ;
    }
    this.data.sourceList = [...this.treeData] ;
  }

  /**
   * 打开一个节点
   * @param item
   * @param isAll
   */
  open(item , isAll=false){
    if(item.__treeOption.isOpen===true)
      return ;

    let index = this.data.sourceList.indexOf(item) ;
    if(isAll ){
      let arr = [] ;
      NormalUtils.travelTree(item.children,(item)=>{
        arr.push(item) ;
      });
      this.data.sourceList.splice(index+1,0,...arr) ;
    }
    else
      this.data.sourceList.splice(index+1,0,...item.children) ;
    item.__treeOption.isOpen = true ;
  }

  /**
   * 节点是否打开
   * @param item
   * @returns {boolean}
   */
  isOpen(item){
    return item.__treeOption.isOpen ;
  }

  /**
   * 关闭节点
   * @param item
   */
  close(item){
    if(!item.children)
      return ;
    for(let data of item.children){
      let index = this.data.sourceList.indexOf(data) ;
      if(index>-1){
        this.data.sourceList.splice(index,1) ;
        this.close(data) ;
      }
    }
    item.__treeOption.isOpen = false ;
    return ;
  }
}
