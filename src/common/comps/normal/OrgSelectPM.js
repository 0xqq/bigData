/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import DataStorageAPI from "@/common/service/DataStorageAPI";


export default class OrgSelectPM {

  constructor() {
    this.orgList = [];
    this.orgListCopy = null ;
    this.orgMap = {} ;
    this.orgTree = [];
    this.orgInited = false;
    this.qureyBack = [] ;
  }

  /**
   * 获得机构树
   * @param key
   */
  queryOrgTreeList(key ,reback) {
    if(!this.orgInited){
      this.qureyBack.push({key:key,func:reback}) ;
      DataStorageAPI.queryOrgList({page:1,pageSize:10000}).then(
        (result)=>{
          this.orgList = result.data.orgs ; //机构列表
          if(! this.orgList)
            this.orgList = [] ;

          //组织成树
          this.initOrgList(result) ;
          this.orgInited = true ;

          //回调
          for(let item of this.qureyBack){
            this.handlerItemQuery(item.key,item.func ) ;
          }
        },
        ()=>{
          for(let item of this.qureyBack){
            this.handlerItemQuery(item.key,item.func ) ;
          }
        }
      ) ;
    }
    else
      this.handlerItemQuery(key,reback) ;
  }

  /**
   * 根据KEY过滤树 并返回
   * @param key
   * @param reabck
   */
  handlerItemQuery(key,reabck){
    let re = [] ;
    let ids = [] ;
    if(!key)
      re = NormalUtils.copyObjectDeep(this.orgTree) ;
    else{
      try{
        let arr = [] ;
        let map = {} ;
        if(!this.orgListCopy || this.orgListCopy.length===0)
          this.orgListCopy = NormalUtils.copyObjectDeep(this.orgList ) ;
        for(let org of this.orgListCopy ){
          if(org.name.indexOf(key)>-1){
            let item =  org  ;
            item.children = [] ;
            arr.push(item) ;
            map[item.id] = item ;
            ids.push(item.id) ;
          }
        }
        for(let orgItem of arr ){
          let path = orgItem.path ;
          let flag = false ;
          for(let i=(path.length -1);i>=0;i--){
            let pid = path[i] ;
            if(map.hasOwnProperty(pid)){
              map[pid].children.push(orgItem) ;
              flag = true ;
              break ;
            }
          }
          if(!flag)
            re.push(orgItem) ;
        }
      }catch (e){}
    }
    if(reabck!==null && reabck!==undefined)
      reabck(re,ids) ;
  }

  /**
   * 组织树
   */
  initOrgList(){
    let map = {} ;
    let tree = [] ;
    for(let item of this.orgList){
      item.children = [] ;
      map[item.id] = item ;
    }
    for(let item of this.orgList){
      let id = item.parentId ;
      if(id && map.hasOwnProperty(id)){
        map[id].children.push(item) ;
      }
      else
        tree.push(item) ;
    }
    NormalUtils.travelTree(tree,(node,level,pItem)=>{
      node.level = level ;
      node.path = [] ;
      if(pItem)
        node.path = pItem.path.concat([pItem.id])  ;
    },"children") ;

    this.orgMap = map ;
    this.orgTree = tree ;
  }

}
