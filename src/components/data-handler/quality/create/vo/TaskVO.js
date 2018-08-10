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
    this.tenant = "";
    this.description = "";
    this.nodes = [] ;
    this.lines = [] ;
    if(data)
      this.init(data) ;
  }

  /**
   * 解析数据源
   * @param value
   */
  init(value){
    if(!value)
      return ;

    //基本信息
    NormalUtils.copySimpleAtt(value,this,["id","name","tenant","description"]) ;

    if(!value.model || !value.model.transformation)
      return ;

    //解析节点
    if(value.model.transformation.step){
      let nodes = value.model.transformation.step ;
      let arr = [] ;
      for(let node of nodes){
        arr.push( new NodeVO(node)) ;
      }
      this.nodes = arr ;
      console.log(arr);
    }

    //解析线
    if(value.model.transformation.order && value.model.transformation.order.hop){
      let lines = value.model.transformation.order.hop ;
      let lineArr = [] ;
      for(let line of lines){
        lineArr.push( line ) ;
      }
      this.lines = lineArr ;
    }
  }

  /**
   * 获得基本信息表单项
   * @returns {{name: string, tenant: string, description: string}}
   */
  getBaseForm() {
    return {
      name: "",
      tenant: "",
      description: ""
    };
  }

  /**
   * 保存基本信息
   * @param form
   */
  saveBase( form ){
    for(let att in form){
      if(this.hasOwnProperty(att))
        this[att] = form[att] ;
    }
  }

  /**
   * 获得后台需要的格式
   */
  getSaveData(nodes,lineData) {
    //arr这是rlue里面的东西
    let arr = this.getItemSaveArr(nodes);

    delete arr[1].GUI;
    delete arr[1].group;
    delete arr[1].icon;
    delete arr[1].name;

    let columns ={
      columns:[]
    };

    let msgQuality ={
      taskName: "",
      taskType: "",
      taskCreator: "",
      tableName:'',
      taskTenant: "",
      dataResourceId: "",
      increment: {
        col: "",
        type: ""
      }
    };

    Object.assign(arr[1],columns,msgQuality);

    let lines = this.getItemSaveArr(lineData);

    console.log(lines);

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
      "name": this.name, //任务名称
      "tenant": this.tenant, //租户
      "description": this.description, //描述
       model:{
        transformation: {
          info: {},
          order: {hop: lines},
          step: [steps[0],steps[1]]
        }}
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

  clear(){
    this.id = "";
    this.name = "模型";
    this.tenant = "";
    this.description = "";
    this.nodes = [] ;
    this.lines = [] ;
  }

}
