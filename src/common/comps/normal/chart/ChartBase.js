;(function() {
     require.config({
         baseUrl: '' ,
         paths:{
             ChartPackage:"static/sys/charts"
         },
         map: {'*': {'css': 'libs/jquery/css.min'}}
     });

     function ChartClass(){
         var _this = {} ;
         _this.class = {} ;
         _this.create = {} ;
         _this.libs = {} ;
         _this.config = {} ;
         _this.loadedLibs = {} ;
         _this.chart = {} ;

         //添加类
         _this.addClass = function( name ,value , libs ){
             if(SChartZC.class.hasOwnProperty(name))
                 return ;
             SChartZC.class[name] = value ;
             SChartZC.libs[name] = libs ;
             SChartZC.create[name] = function(){
                 var _len = arguments.length ;
                 if(_len>0){
                     var _arr = [null] ;
                     for(var i=0;i<_len;i++){
                         _arr.push(arguments[i]) ;
                     }
                     return new (Function.prototype.bind.apply(value,_arr ))();
                 }
                 else
                     return new value( ) ;
             }
         };

         //添加类
         _this.addClassConfig = function( name , config ){
             if(SChartZC.class.hasOwnProperty(name))
                 return ;
             SChartZC.config[name] = config ;
         };

         //获得配置信息
         _this.getClassConfig = function( name ){
             if(SChartZC.config.hasOwnProperty(name))
                 return SChartZC.config[name] ;
             return null ;
         };

         //继承
         _this.extends = function(superclass,child ,pars){
             if(  SChartZC.class.hasOwnProperty(superclass))
                 SChartZC.class[superclass].apply(child,pars) ;

             //添加父类链接
             child.___superClassName = superclass ;
             child.super = function(supername,method,params){
                 return _this.super(supername,method,this,params) ;
             }
         };
         //调用父类方法
         _this.super = function(superclass,method,child,params){
             if( SChartZC.class.hasOwnProperty(superclass))
             {
                 var _prop = SChartZC.class[superclass].prototype ;
                 if(_prop[method])
                     return _prop[method].apply(child,params) ;
             }
         };
         return _this ;
     }

     //注册静态对象
     if(!window.SChartZC)
         window.SChartZC = ChartClass() ;

 })();


//------------------------------------------------------------------------图表基类------------------------------------------------------------------------
;(function(){

    function TChartBase(){
        this.dataInited = false ;//是否已经初始化过数据
        this.view = null ;
        this.pview = null ;
        this.dataArr = null ;
        this.factorArr = null ;
        this.slice = null ;
        this.actions = null ;
        this.setOptions = null ;
        this.confMap = {} ;//图表属性配置信息
        this.paramMap = {} ;//图表参数信息
        this.factorMap = {} ;//图表要素配置信息
        this.actionMap = {} ;//动作配置信息
        this.chart_vs ="";//图表名称
        this.idl = "" ;
        this.xf = "";
        this.yf = "";
        this.zf = "";
        this.kf = "";
        this.lf = "";
        this.mf = "";
        this.nf = "";
    }

    /*初始化视图*/
    TChartBase.prototype.initView = function( pview ){
        this.pview = pview ;
        this.inited = true;
        if($)
        {
            this.view = $("<div style='width:100%;height:100%;position:absolute;'></div>") ;
            this.viewDom = this.view[0] ;
            this.pview.append(this.view) ;
        }
        else
        {
            this.view = document.createElement("div");
            this.view.style.width = "100%" ;
            this.view.style.height = "100%" ;
            this.view.style.position = "absolute" ;
            this.pview.appendChild(this.view) ;
        }
    };

    /*渲染图表*/
    TChartBase.prototype.doRender = function( list, slicev ,actions ,options,idl  ){
        if(!options)
            options = null ;

        this.confMap = {};
        this.factorMap = {};
        this.paramMap = {} ;
        this.dataArr = list ;
        this.slice = slicev ;
        this.actions = actions ;
        this.idl = idl ;
        this.setOptions = options ;
        var _this = this ;

        //解析配置信息
        this.initSlice(slicev) ;

        //解析动作
        this.initActions(actions) ;

        //解析factory
        this.initFactory() ;

        //渲染视图
        this.renderView() ;

        //打标记
        this.dataInited = true;
    };

    /*单独设置数据源*/
    TChartBase.prototype.initSlice = function( slicev ){
        var _this = this ;
        if (slicev) {
            if (slicev.parameterlist) {
                slicev.parameterlist.forEach(function (item) {
                    _this.confMap[item.fieldName] = item;
                });
            }
            if (slicev.factorsList) {
                slicev.factorsList.forEach(function (factor) {
                    _this.factorMap[factor.name] = factor;
                });
            }
            if(slicev.paramList){
                slicev.paramList.forEach(function (param) {
                    _this.paramMap[param.name] = param;
                });
            }
        }
    };

    /*解析动作*/
    TChartBase.prototype.initActions = function(actions){
        this.actionMap = {} ;
        var _this = this ;
        if(this.actions && this.actions.actionAry)
        {
            var _arr = this.actions.actionAry ;
            _arr.forEach(function(actionvo){
                if(actionvo.used===true)
                    _this.actionMap[actionvo.name] = actionvo ;
            })
        }
    };

    /*获得属性值*/
    TChartBase.prototype.getConfigValue = function (name, defvalue ) {
        var _re = defvalue;
        if (this.confMap && this.confMap.hasOwnProperty(name))
            _re = this.confMap[name].value;
        return _re ;
    };

    /*获得要素值*/
    TChartBase.prototype.getFactorValue = function (name) {
        if (this.factorMap && this.factorMap.hasOwnProperty(name))
            return this.factorMap[name].field;
        return null;
    };

    /*获得动作*/
    TChartBase.prototype.getAction = function(type){
        if (this.actionMap && this.actionMap.hasOwnProperty(type))
            return this.actionMap[type] ;
        return null ;
    };

    /*默认解析7个factory*/
    TChartBase.prototype.initFactory = function( ) {
        this.xf = this.getFactorValue("x");
        this.yf = this.getFactorValue("y");
        this.zf = this.getFactorValue("z");
        this.kf = this.getFactorValue("k");
        this.lf = this.getFactorValue("l");
        this.mf = this.getFactorValue("m");
        this.nf = this.getFactorValue("n");
    };

    /*是否有可用动作*/
    TChartBase.prototype.getUsedAction = function(type){
        var _ac = this. getAction(type) ;
        if (_ac &&  (_ac.used===true||_ac.used==="true"))
            return  _ac;
        return null ;
    };

    /*触发动作*/
    TChartBase.prototype.executeAction = function (type, data, item, event, exdata) {
        var _ac = this.getUsedAction(type) ;
        if(!_ac || !this.setOptions || !this.setOptions.action)
            return ;
        this.setOptions.action(this.chart_vs , {
            type: type,
            data: data,
            item: item,
            event: event,
            exdata: exdata
        }, this.idl);
    };


    /*尺寸变化*/
    TChartBase.prototype.resizeView = function( w ,h ){
        this.view.css("width",w+"px")
            .css("height",h+"px");
    };

    /*渲染视图*/
    TChartBase.prototype.renderView = function(){

    };

    /*单独设置数据源*/
    TChartBase.prototype.setDataSource = function( data ){

    };

    /*单独设置配置信息*/
    TChartBase.prototype.setSlice = function( slice ){

    };

    /*单独设置动作*/
    TChartBase.prototype.setActions = function( actions ){

    };

    /*清空*/
    TChartBase.prototype.clear = function(){

    };

    /*销毁*/
    TChartBase.prototype.destroy = function(){

    };

    /*获得图表配置信息 */
    TChartBase.prototype.getChartConfig = function(){
    };

    /*不能直接截图的组件提供需要截图的dom截图dist*/
    TChartBase.prototype.getChartDom = function(){
        return null ;
    };

    /*根目录 测试环境可以使用*/
    TChartBase.prototype.getRootUrl = function(){
        if(trx && trx.config)
            return trx.config.serverUrl ;
        return "";
    };

    SChartZC.addClass("TChartBase",TChartBase);
})();

