/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import NormalUtils from "@/common/utils/NormalUtils";
import NodeVO from "./NodeVO";

export default class TaskVO {

  constructor(data) {
    this.autoId = NormalUtils.createOID("TaskVO") ;
    this.id = "";
    this.name = "模型";
    this.modelName = "" ; //只管几个基本属性
    this.modelProject = "";
    this.modelDesc = "";

    this.nodes = [] ;
    this.lines = [] ;
    if(data)
      this.init(data) ;
  }

  /**
   * 解析数据源
   * @param value
   */
  init(value, props=null){
    if(!value)
      return ;

    let propsMap = {} ;
    if(props){
      for(let pItem of props){
        propsMap[pItem.algorithmId] = NodeVO.initPropsList(pItem.algorithmParams) ;
      }
    }

    //基本信息
    NormalUtils.copySimpleAtt(value,this,["id","modelName","modelProject","modelDesc"]) ;
    this.name = this.modelName ;
    if(!value.modelOriginalParam )
      return ;

    //解析节点
    value.model = value.modelOriginalParam ;
    if(value.model.steps){
      let nodes = value.model.steps ;
      let arr = [] ;
      for(let node of nodes){
        if(node.id && propsMap && propsMap.hasOwnProperty(node.id+""))
           this.joinNodeProps(node,propsMap[node.id+""]) ;
        else
          node.props = [] ;
        arr.push( new NodeVO(node)) ;
      }
      this.nodes = arr ;
    }

    //解析线
    if(value.model.link ){
      let lines = value.model.link ;
      let lineArr = [] ;
      for(let line of lines){
        lineArr.push( line ) ;
      }
      this.lines = lineArr ;
    }
  }

  /**
   * 获得后台需要的格式
   */
  getSaveData(nodes,lineData) {
    let arr = this.getItemSaveArr(nodes);
    let lines = this.getItemSaveArr(lineData);
    let data = this.createSaveData(arr,lines) ;
    return data ;
  }

  /**
   * 保存对象格式
   * @param steps
   * @param lines
   * @returns {{id: string, name: string, tenant: string, description: string, model: {transformation: {info: {}, order: {hop: *}, step: *}}}}
   */
  createSaveData( steps,lines){
    return  {
      "id": this.id, //任务ID如果是创建 为空
      "modelName": this.name, //任务名称
      "modelDesc": this.modelDesc, //描述
      modelOriginalParam:{
          link:lines,
          steps: steps
       }
    }
  }

  /**
   * 获得保存数据数组
   * @param arr
   * @returns {Array}
   */
  getItemSaveArr( arr ){
    let nodeArr = [];
    for (let node of arr) {
      nodeArr.push(node.getSaveData());
    }
    return nodeArr ;
  }

  /**
   * 合并原始的配置信息和保存的数据
   */
  joinNodeProps( node , sourceProps ){//参数名：值
    let props = sourceProps ;
    let values = node.props||{} ;
    for(let item of props ){
      if(values.hasOwnProperty(item.name) )
        item.value = values[item.name] ;
    }
    node.props = props ;
  }

  /**
   * 获得每个步骤的ID集合 拼下数据 尽量不改动后面的流程
   * @param value
   */
  static getStepIds(value){
    if(!value || !value.modelOriginalParam || !value.modelOriginalParam.steps )
      return [] ;
     let steps = value.modelOriginalParam.steps ;
     let ids = [] ;
     for(let item of steps){
       //先按属性判断 没有type 后面再看 乱
       if( item.type && item.type ==="Operator" )
         ids.push({algorithmId:item.id}) ;
     }
     return ids ;
  }

  clear(){
    this.id = "";
    this.name = "模型";
    this.tenant = "";
    this.description = "";
    this.nodes = [] ;
    this.lines = [] ;
  }

}
