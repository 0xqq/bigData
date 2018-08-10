//-----------------------------------------
// title: 很尴尬的一个模式 VUE的绑定太弱了 data 必须是最简化的 对象
// author:zc
// date:
// desc:
//------------------------------------------
import FormPmBase from "@/common/model/FormPmBase" ;
import NormalUtils from "@/common/utils/NormalUtils";
import PlatformAssetsAPI from "@/common/service/PlatformAssetsAPI" ;
import PagePm from "@/common/model/PagePm";
import ConstManager from "../../../common/manager/ConstManager";

export default class AssetsRegisterPM extends FormPmBase{

  constructor( name,id="" ) {
    super(name,id);
    this.createMethod = PlatformAssetsAPI.addAssets ;
    this.updateMethod = PlatformAssetsAPI.editAssets ;
    this.deleteMethod = PlatformAssetsAPI.deleteAssets ;
    this.autoClose = false ;

    //原始区类型ID
    this.oldAreaType = "0" ;

    //分页查询组件
    this.pagePM = new PagePm(PlatformAssetsAPI.queryAssets,1,"softInfo") ;
    // this.pagePM.testHandler = this.testHandler ;

    //初始化绑定数据
    this.initData( {
        autoId:NormalUtils.createOID("container"),
        softTypeList:[],
        areaList:[ ],
        systemList:[  ],
        jiqunList:[],
        searchSoftList:[]
      }
    ) ;

    //初始化查询表单
    this.initSearchForm( ) ;

    //编辑信息
    this.initFormData() ;
  }

  /*初始化查询表单*/
  initSearchForm( query=true ) {
    this.initDataForm({
      ip: "",
      type:""
    },"searchForm") ;

    //查询
    if (query === true)
      this.queryList();
  }

  /**
   * 初始化 增改表单项
   * @isinit 是否完全重新初始化
   */
  initFormData( isinit = true ){
    this.initDataForm({
      id:"",
      softName:"",
      softVersion:"",
      os:"",
      spaceSize:1,
      partition:"",
      isCluster:0,
      adminResourceId:"",
      softType:"",
      ip:"",
      port:"",
      clusterName:""
    },"form") ;
    this.data.nodeName = "" ;
    this.data.ipObject = null ;
    this.data.jiqunList = [] ;
    this.data.formError = {
      name:"",
      ip:""
    };
  }

  /**
   * 第一次进入 初始化数据
   */
  initView(){
    super.initView() ;

    //默认打开创建
    this.popCreateWin() ;

    //默认查询数据
    this.queryList() ;
  }

  /*查询列表*/
  queryList(){
    super.queryList(this.data.searchForm );
  }

  /**
   * 添加窗口
   */
  popCreateWin(){
    super.popCreateWin() ;
    this.initFormData() ;

    //查询码表
    this.queryAddFormList() ;
  }

  /**
   *  弹出修改窗口
   */
  popEditeWin( item ){
    super.popEditeWin(item) ;
    this.initFormData() ;

    //解析数据到表单
    NormalUtils.copySimpleAtt(item,this.data.form) ;
    let num = parseInt(this.data.form.spaceSize) ;
    if(isNaN(num) || num<1)
      num = 1 ;
    this.data.form.spaceSize = num ;

    //查询码表
    this.queryAddFormList() ;
  }

  /**
   * 查询添加需要的码表
   */
  queryAddFormList(){
    if(this.data.systemList.length!==0) //查一次
      return ;

    //查分区
    // this.query({dicType:"source_flag"},(result)=>{
    //   let arr = [] ;
    //   let list = result.resultdata ;
    //   for(let item of list ){
    //     if(item.key !== this.oldAreaType)
    //       arr.push(item) ;
    //   }
      this.data.areaList = ConstManager.areaList2 ;
    // },null,PlatformAssetsAPI.queryDicnation) ;

    //软件类型
    this.query({dicType:"soft_style"},(result)=>{
      this.data.softTypeList = result.resultdata ;
      this.data.searchSoftList = [{value:"全部",key:""}].concat(this.data.softTypeList) ;
    },null,PlatformAssetsAPI.queryDicnation) ;

    //系统列表
    this.query({dicType:"os"},(result)=>{
      this.data.systemList = result.resultdata ;
    },null,PlatformAssetsAPI.queryDicnation) ;
  }


  /**
   * 验证用户是否存在
   */
  checkName( backfunc = null ){
    let _this = this ;

    //如果是编辑状态 名称没修改不验证
    if(this.data.isPopUpdate && this.currentItem.softName === this.data.form.softName){
      if(backfunc)
        backfunc() ;
      return ;
    }

    //验证名称
    PlatformAssetsAPI.checkAssetsName({name:this.data.form.softName}).then(
      (result)=>{
        if(result.resultdata.isfalg+"" === "1")
          _this.data.formError.name = "名称已经存在！" ;
        else if(backfunc)
          backfunc() ;
      }
    ) ;
  }

  /**
   * 类型变化 情况
   */
  allTypeChange(){
    this.resetIpAllData() ;
  }

  /**
   * 软件类型辨变化处理
   */
  softTypeChange(){
    this.resetIpAllData() ;
    //集群列表
    this.query({type:this.data.form.softType,ip:''},(result)=>{
      this.data.jiqunList = result.resultdata ;
    },null,PlatformAssetsAPI.queryCluster) ;
  }

  /**
   * 自动查询 ip 端口
   * @param str
   * @param cb
   */
  queryKeyInfo( str , cb){
     if(!str || !this.data.form.softType){
       cb([]) ;
       return ;
     }
     PlatformAssetsAPI.queryIpPortName({ip:str,type:this.data.form.softType}).then(
       (result)=>{
         let _list = result.resultdata ;
         for(let item of _list ){
           item.value = item.ip ;
         }
         cb(_list) ;
       }
     );
  }

  queryKeyInfoJiQun( str , cb){
    if(!str || !this.data.form.softType){
      cb([]) ;
      return ;
    }
    PlatformAssetsAPI.queryIpPortNameJiQun({ip:str,type:this.data.form.softType}).then(
      (result)=>{
        let _list = result.resultdata ;
        for(let item of _list ){
          item.value = item.ip ;
        }
        cb(_list) ;
      }
    );
  }




  /**
   * 选择IP
   * @param str
   * @param cb
   */
  autoSelectHandler(data){
     this.data.ipObject = data ;
     this.data.form.port = data.port ;
     this.data.form.ip = data.ip ;
     this.data.form.adminResourceId = data.id ;
     this.data.formError.ip = "" ;
     this.data.nodeName = data.nodeName;
  }

  /**
   * 这个ip很重要
   */
  resetIpAllData(){
    this.data.ipObject = null ;
    this.data.form.port = "";
    this.data.form.ip = "" ;
    this.data.form.adminResourceId = "" ;
    this.data.nodeName = "" ;
  }

  /**
   * 输入框失去焦点
   */
  inputBlur(pm){
    setTimeout(()=>{
      if(!pm.data.ipObject){
        pm.resetIpAllData() ;
      }
    },200) ;
  }

  /**
   * 提交表单
   */
  submit(){
    if(this.data.form.isCluster===0){
      this.checkName(()=>{
        this.checkIpPortName(()=>{//这一步验证后台验证就好 没必要前端还验证
          super.submit() ;
        }) ;
      });
    }
    else {
      this.checkName(()=>{
        super.submit() ;
      });
    }
  }

  checkIpPortName(cback){
    let send = {ip:this.data.form.ip,port:this.data.form.port,type:this.data.form.softType} ;
    this.query(send,(result)=>{
       if((result.resultdata.isfalg+"") === "1"){
         cback() ;
       }
       else {
         this.popMessage("平台后台未支持的软件资源不予注册！") ;
       }
    },null,PlatformAssetsAPI.checkIpPortName)
  }

  /**
   * 生成创建表单数据
   */
  getCreateParams(){
    if(this.data.form.clusterName){
      let index = NormalUtils.getSelectIndex(this.data.jiqunList,this.data.form.clusterName,"id") ;
      if(index>-1)
        this.data.form.adminResourceId =this.data.jiqunList[index].id ;
    }
    let _send = this.initData(this.data.form,{}) ;
    delete _send.id ;
    return _send ;
  }

  /**
   * 生成更新表单数据
   */
  getUpdateParams(){
    return  this.initData(this.data.form,{}) ;
  }

  /**
   * 删除参数
   * @param param
   */
  getDeleteParams(param,ismore=false,idfield="id"){
    return {id:param.id} ;
  }

  /**
   *
   * @param result
   */
  submitResultHandler(result){
    super.submitResultHandler(result) ;

    //继续添加
    if(this.data.isPopCreate)
        this.popCreateWin() ;
  }

  /*--------------------------------------------------------- test ----------------------------------------*/
  testHandler(){
    return NormalUtils.createTestData({
      name:"dfdfd",
      tenantName:"dfd",
      level:"dfdf",
      type:"dfdfd",
      desc:"dfdfdf"
    },20) ;
  }
}
