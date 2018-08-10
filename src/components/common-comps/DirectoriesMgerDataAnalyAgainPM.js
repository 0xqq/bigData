/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
import QueryPmBase from "@/common/model/QueryPmBase";
import DataStorageAPI from "@/common/service/DataStorageAPI";
import DataImportAPI from  "@/common/service/DataImportAPI";
import NormalUtils from "@/common/utils/NormalUtils";
import RightMenu from "@/common/utils/RightMenu";

export default class DirectoriesMgerDataAnalyAgainPM extends QueryPmBase {

  constructor() {
    super();
    this.currentData = null ;
    this.rootPath = "" ;
    this.rootName = "" ;
    this.rootNode = [] ;
    this.currentType = 0 ;//几个都写这不单独写了
    this.queryFoldMethod = DataImportAPI.queryFoldList ;

    this.initData({
      isOpen:false,
      isQueryAll:false ,
      hasFile:false,//是否管理文件
      selectMode:false,//是否是选择模式  否则 管理模式
      addEnabled:true,//添加是否可用,
      rootLu:'',
      rootLuTwo:''
    });

    //表单数据
    this.initFormData() ;
  }

  /**
   * 初始化表单数据
   */
  initFormData(){
    this.initData({
      currentPath:"",
      showPath:"",//显示的路径
      leftTreeData: [],
      rightList: [],
      isAddPop:false,
      addFormName:""
    });
    this.data.addDisabled = true ;
  }

  /**
   * 初始化加载左侧第一层
   */
  initView(data , type=-1 ,hasAdd=true) {

    this.currentData = data ;

    console.log(this.currentData);

    this.currentType = type ;

    console.log(this.currentType);

    if(type===0){
      this.data.selectMode = true ;
      this.data.hasFile = false ;
      this.data.addEnabled = true ;
      this.queryFoldMethod = DataStorageAPI.queryResourceDirsData;
    }
    else if(type===1){
      this.data.selectMode = true ;
      this.data.hasFile = true ;
      this.data.addEnabled = false ;
      this.queryFoldMethod = DataImportAPI.queryFoldList ;
    }
    else {
      this.data.selectMode = true ;
      this.data.hasFile = false ;
      this.data.addEnabled = true ;
      this.queryFoldMethod = DataStorageAPI.queryResourceDirsData;
    }

    //添加功能
    if(!hasAdd)
      this.data.addEnabled = false ;

    //重新初始化表单
    this.initFormData() ;
    let path = this.currentData.dataInstance;
    console.log(path);  // '/clq/file'
    let arr = path.split("/") ;
    console.log(arr); // '["", "clq", "file"]'
    this.rootPath = "" ;
    if(arr.length>0){
      this.rootName = arr[arr.length-1] ;
      console.log(this.rootName); // 'file'
      arr.pop() ;
      console.log(arr); // '["", "clq"]'
      this.rootPath = arr.join("/") ;
      console.log(this.rootPath); // '/clq'

    }
    if(path){
      this.rootNode = this.initFoldNode(this.rootName,  "/" + this.rootName, "fold", true) ;
      this.data.leftTreeData = [this.rootNode];
      this.data.rightList = [this.rootNode];
      //查询第一层数据
      // this.queryFoldSubList(this.rootNode) ;
    }
    this.setCurrentPath("") ;
    this.data.isOpen = true ;
  }

  /**
   * 查询子
   * @param node
   */
  queryFoldList(node) {
    //console.log(node);
    if (node.type === "file")
      return;

    this.query(this.getParams(node.path)  ,
      (result) => {

      console.log('少ID');


        let _result = this.getFoldList(result, node.path, true);
        node.children = _result.list;
      },
      () => {
        node.children = [];
      },
      this.queryFoldMethod);
  }

  /**
   * 和树的访问分开
   */
  queryFoldSubList( node ){
    console.log(node);


    if(node.type === "file")
      return ;
    this.changeToFold(node.path) ;
  }

  /**
   * 解析目录列表
   * @param result
   */
  getFoldList(result,ppath ,istree=false){
    console.log('ceshi');
    if(!result || !result.data )
      return {error:"" , list:[]} ;
    //后台不方便处理
    if(typeof result.data === "string" && result.data){
      try{
        result.data = JSON.parse(result.data) ;
      }
      catch(e){
        result.data = {file:[],dir:[]} ;
      }
    }
    if(result.data.hasOwnProperty("errMsg"))
      return {error:result.data.errMsg , list:[]};
    let re = [] ;
    if(result.data.dir){
      console.log(result.data.dir);
      this.data.rootLuTwo ='/' + result.data.dir;
      for(let sub of result.data.dir) {
        re.push(this.initFoldNode(sub, ppath  + "/" + sub, "fold", true));
        console.log(re[0].path);
        let arrLu = re[0].path.split('/');
        let quanLu =  arrLu.join('/');
        console.log(quanLu);
        // this.data.rootLu = re[0].path;
      }
    }
    if(result.data.file){
      for(let sub of result.data.file){
        re.push(this.initFoldNode(sub,ppath+"/"+sub,"file",false)) ;
        console.log(re);
      }
    }
    return  {error:"" , list:re} ;
  }

  /**
   * 解析成本地数据
   * @param name
   * @param path
   * @param type
   * @param istree
   * @returns {{name: *, showCheck: boolean, type: *, path: *}}
   */
  initFoldNode(name,path,type,istree){
    let item = {name:name,showCheck:false,type:type,path:path} ;
    if(istree)
      item.children = [this.createTempNode()] ;
    return item ;
  }

  /**
   * 右键菜单
   * @param ev
   * @param node
   */
  rightMenu(ev,node){
    if(!this.data.addEnabled || this.data.addDisabled)
      return ;
    RightMenu.showRightMenuEvent(ev,[{label:"新建文件夹",code:"addFold"}],(item,exdata)=>{
      this.popAddFoldWin() ;
    }) ;
  }

  /**
   * 直接切换到某个目录
   */
  changeToFold( path ) {

    this.data.showPath = path;
    //切换到root
    console.log(this.data.showPath);

    if(!path){
      this.data.rightList = [this.rootNode];
      this.setCurrentPath();
      return ;
    }


    this.query(this.getParams(path) ,
      (result) => {
        console.log( result .data + 'wenjian2');
        let _result = this.getFoldList(result,  path );
        if( _result.error){
          this.data.showPath = this.data.currentPath;
          this.popMessage(_result.error) ;
        }
        else{
          this.data.rightList = _result.list ;
          console.log(this.data.rightList + '真是路径');
          this.setCurrentPath(path);
        }
      },
      () => {
        this.data.showPath = this.data.currentPath;
      }, this.queryFoldMethod);
  }

  /**
   * 参数处理
   * @param path
   * @returns {{id, path: *}}
   */
  getParams( path="" ){
    let genRoot = JSON.parse(sessionStorage.getItem('analyLuTwo'));
    return {
      id: this.currentData.id,
      /* path: 'path3996470e'  + this.data.rootLuTwo*/
      path: genRoot  + this.data.rootLuTwo
    };
  }

  /**
   * 访问上一层目录
   */
  backFold(){
    if(!this.data.currentPath )
      return ;
    let _paths = this.data.currentPath.split("/") ;
    if(_paths.length<2)
      return ;
    _paths.pop() ;
    let _path = _paths.join("/") ;
    this.changeToFold(_path) ;
  }

  /**
   * 设置当前路径
   * @param value
   */
  setCurrentPath(value){
    this.data.currentPath = value ;
    this.data.showPath = value ;
    this.data.addDisabled = this.data.currentPath===""?true:false ;
  }

  /**
   * 控制选择
   * @param item
   */
  foldItemOver( item ){
    item.showCheck = true ;
  }

  /**
   * 控制选择
   * @param item
   */
  foldItemLeave( item ){
    item.showCheck = false ;
  }

  /**
   * 添加文件夹
   */
  popAddFoldWin(){
    if(!this.data.currentPath){
      this.popMessage("请在根目录内进行添加操作！") ;
      return ;
    }
    this.data.addFormName = "" ;
    this.data.isAddPop = true ;
  }

  /**
   * 关闭新建文件夹窗口
   */
  closeAddFoldWin(){
    this.data.addFormName = "" ;
    this.data.isAddPop = false ;
  }

  /**
   * 模拟加载状态
   * @returns
   */
  createTempNode() {
    return {
      id: "",
      idl: NormalUtils.createOID("idl"),
      label: "loading...",
      type: "temp",
      children: []
    };
  }

  /**
   *
   */
  sumbitAddFold() {
    if (!this.data.addFormName)
      return;

    let send = {
      id: this.currentData.id,
      foldName: this.data.addFormName,
      parentPath: this.rootPath+this.data.currentPath
    };

    this.query(send,
      (result) => {

        this.changeToFold(this.data.currentPath);

        //关闭窗口
        this.closeAddFoldWin();
      }, null, DataStorageAPI.addSubDir);
  }

  /**
   * 模拟加载状态
   * @returns
   */
  createTempNode() {
    return {
      id: "",
      idl: NormalUtils.createOID("idl"),
      label: "loading...",
      type: "temp",
      children: []
    };
  }

  /**
   * 关闭窗口
   */
  closeWin(){
    this.data.isOpen = false ;
    this.clear() ;
  }

  clear(){
    //表单数据
    this.initFormData() ;
  }

}
