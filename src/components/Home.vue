<script>
  import CommonAPI from "@/common/service/CommonAPI" ;
  import NormalUtils from "@/common/utils/NormalUtils";
  import PathConst from "@/router/PathConst" ;

  export default {
    components:{ },
    data() {
      return {
        isLoading:false,
        viewData:{
          storageNum:"",//存储区数据总条数
          departmentNum:"",//接入部门总条数
          externalNum:"",//外部数据源总条数
          originalInNum:"",//（原始区）从外部数据源共导入数据总条数，
          originalInTimes:"",// （原始区）从外部数据源共导入总次数：
          handlerInNum:"",//（处理区）从原始区导入数据总条数，
          handlerInTimes:"",// 导入总次数；
          analysisInNum0:"",//（分析区）从处理区共导入数据总条数；
          analysisInTimes0:"",// （分析区）从处理区共导入总次数；
          analysisInNum1:"",//（分析区）从原始区导入数据总条数；
          analysisInTimes1:""//（分析区）从原始区导入总次数；
        }
      }
    },
    mounted() {
    },
    //方法
    methods: {

      queryData(){
        // this.isLoading = true ;
        // CommonAPI.homeStatistics({}).then(
        //   (result)=>{
        //     this.isLoading = false ;
        //     Object.assign(this.viewData,result.data) ;
        //   },
        //   ()=>{
        //     this.isLoading = false ;
        //   }
        // ) ;
      },

      itemOverHandler(ev){

        let dom = $(ev.currentTarget) ;
        dom.find(".log-box").animate({top:"45px"},200);
        dom.find(".nav-icon-split").animate({height:0},150) ;
        dom.find(".nav-icon-split").fadeOut(100) ;
        dom.find(".nav-desc").css("top","360px") ;
        dom.find(".nav-desc").show();
        dom.find(".nav-desc").animate({top:"190px"},300 ) ;
      },
      itemOutHandler(ev){
        let dom = $(ev.target) ;
        dom.find(".nav-icon-split").animate({height:"40px"},100) ;
        dom.find(".nav-icon-split").show(200);
        dom.find(".log-box").animate({top:"88px"},200 );
        dom.find(".nav-desc").fadeOut(100) ;
      },
      changeView(falg){
        if(falg===2)
          NormalUtils.changeRouter(PathConst.DATAIMPORT) ;
        else   if(falg===3)
          NormalUtils.changeRouter(PathConst.DATASTORAGE) ;
        else   if(falg===4)
          NormalUtils.changeRouter(PathConst.DATAHANDLER) ;
        else   if(falg===5)
          NormalUtils.changeRouter(PathConst.DATAANALYSIS) ;
        else   if(falg===6)
          NormalUtils.changeRouter(PathConst.DATAVISUALIZATION) ;
        else   if(falg===7)
          NormalUtils.changeRouter(PathConst.PLATFORMMANAGER) ;
      }
    }
  }

</script>

<style scoped lang="scss">

  $titleColor:#34394c;
  $labelColor:#939ca4;
  $numFamily:HelveticaNeueLTPro, 方正姚体, 黑体, Arial;

  .home{
    @include abs-group() ;
    background-color: #edf0f5;
    overflow-x: hidden;
    overflow-y: auto;
    .layout{
      width:100%;
      flex:none;
      padding: 30px 0 0 0;

      /*数值*/
      .num-box{
        flex:none;
        width:1200px;
        height:260px;
        border:1px solid #e4e9ee;
        background-color: #fff;
        overflow: hidden;
        border-top-left-radius: 5px ;
        border-top-right-radius: 5px ;
        box-sizing: border-box;
        >div{
          flex:auto;
          height:100%;
          border-right: 1px solid #e4e9ee;
          box-sizing: border-box;

          >div{
            width:100%;
            flex:none;
          }

          .img-layout{
            margin: 40px 0 20px 0;
            .img-box{
              flex:none;
              width:145px;
              height:145px;
              text-align: center;
              position:relative;
              .num{
                @include abs-group(0,50px,0,false);
                text-align: center;
                font-family:$numFamily;
                font-size: 30px;
                color:$titleColor;
              }
              .pix{
                @include abs-group(0,90px,0,false);
                font-size: 16px;
                color: $labelColor;
              }
            }
          }

          .num-title {
            font-size: 18px;
            color: $titleColor;
            text-align: center;
          }
        }
        >div:last-child{
          border-right:none;
        }
      }

      /*区域数据统计*/
      .area-num{
        flex:none;
        width:1200px;
        height:130px;
        overflow: hidden;
        border-bottom-left-radius: 5px ;
        border-bottom-right-radius: 5px ;
        .img-box-2{
          height:130px;
          width:180px;
        }
        >div{
          flex:auto;
          height:100%;
          color:#fff;
          position:relative;
          .img-box{
            width:218px;
          }
          .info-box{
            @include abs-group(218px,0,0,0);
            .num{
              font-family: Arial;
              font-size:36px;
              margin-bottom:4px;
            }
            .title{
              font-size:18px;
            }
          }
        }
        >div:nth-child(1){
          background-color: #416bd4;
        }
        >div:nth-child(2){
          background-color: #53b757;
        }
        >div:nth-child(3){
          background-color: #fea40c;
        }
      }

      .nav-arrow{
        width:100%;
        flex:none;
        background-color: #fff;
        padding:20px 0 ;
        margin-top: 30px;
      }

      /*导航区*/
      .nav-container{
        background-color: #fff;
        width:100%;
        padding-bottom: 20px;
        box-sizing: border-box;
        color:#fff;
        >div{
          flex:auto;
          height:300px;
          box-sizing: border-box;
          position:relative;
          border-right:1px dashed #d0d2d8;
          cursor:pointer;
          .inner{
            position:absolute;
            @include abs-group();
            overflow: hidden;
            .img-bg{
              position:absolute;
            }
            .log-box {
              position: absolute;
              width: 100%;
              top: 0px;
              .nav-icon-img {
                flex: none;
                width: 70px;
                height: 70px;
              }
              .nav-icon-title {
                font-size: 20px;
                margin-top: 25px;
                text-align: center;
                color: $titleColor;
              }
            }
            .nav-desc{
              @include abs-group(0,137px,0,false) ;
              padding: 0 45px;
              line-height:22px;
              font-size:14px;//95
              color: $labelColor;
            }
          }
        }
        >div:last-child{
          border-right:none;
        }
      }
    }
  }
</style>

<template>
  <h-group-iwt :hor="'center'" :ver="'start'" class="home">
    <v-group-iwt class="layout" :hor="'center'">

      <!--数值-->
      <h-group-iwt class="num-box">
        <v-group-iwt>
          <h-group-iwt :hor="'center'" class="img-layout">
            <div class="img-box">
              <img src="../assets/image/home/num_back_1.png"/>
              <div class="num">210111</div>
              <div class="pix">个</div>
            </div>
          </h-group-iwt>
          <div class="num-title">平台总数据量</div>
        </v-group-iwt>

        <v-group-iwt>
          <h-group-iwt :hor="'center'" class="img-layout">
            <div class="img-box">
              <img src="../assets/image/home/num_back_2.png"/>
              <div class="num">324</div>
              <div class="pix">个</div>
            </div>
          </h-group-iwt>
          <div class="num-title">平台总部门</div>
        </v-group-iwt>

        <v-group-iwt>
          <h-group-iwt :hor="'center'" class="img-layout">
            <div class="img-box">
              <img src="../assets/image/home/num_back_3.png"/>
              <div class="num">564</div>
              <div class="pix">个</div>
            </div>
          </h-group-iwt>
          <div class="num-title">平台总用户数</div>
        </v-group-iwt>

        <v-group-iwt>
          <h-group-iwt :hor="'center'" class="img-layout">
            <div class="img-box">
              <img src="../assets/image/home/num_back_4.png"/>
              <div class="num">32</div>
              <div class="pix">个</div>
            </div>
          </h-group-iwt>
          <div class="num-title">最新接入部门</div>
        </v-group-iwt>

      </h-group-iwt>

      <!--区域统计-->
      <h-group-iwt class="area-num">
        <div>
          <h-group-iwt :hor="'center'"  :ver="'center'" class="img-box-2">
            <img src="../assets/image/home/area_icon_1.png"/>
          </h-group-iwt>
          <v-group-iwt  :ver="'center'" class="info-box">
            <div class="num">568923</div>
            <div class="title">原始区数据量</div>
          </v-group-iwt>
        </div>
        <div>
          <h-group-iwt :hor="'center'"  :ver="'center'" class="img-box-2">
            <img src="../assets/image/home/area_icon_2.png"/>
          </h-group-iwt>
          <v-group-iwt :ver="'center'" class="info-box">
            <div class="num">89756236</div>
            <div class="title">处理区数据量</div>
          </v-group-iwt>
        </div>
        <div>
          <h-group-iwt :hor="'center'"  :ver="'center'" class="img-box-2">
            <img src="../assets/image/home/area_icon_3.png"/>
          </h-group-iwt>
          <v-group-iwt  :ver="'center'" class="info-box">
            <div class="num">98657542</div>
            <div class="title">分析区数据量</div>
          </v-group-iwt>
        </div>
      </h-group-iwt>

      <!--arrow-->
      <h-group-iwt :hor="'center'" class="nav-arrow">
        <img src="../assets/image/home/arrow.png"/>
      </h-group-iwt>

      <!--不封装了 直接粘贴复制-->
      <h-group-iwt class="nav-container">
        <div @click="changeView(2)">
          <div class="inner">
            <v-group-iwt :hor="'center'"  class="log-box">
              <div class="nav-icon-img">
                <img src="../assets/image/home/area_logo_2.png"/>
              </div>
              <div class="nav-icon-title">
                数据接入
              </div>
            </v-group-iwt>

            <div class="nav-desc">
              提供多种方式的数据源接入管理，如平台接入、共享交换接入、业务系统直采等。
            </div>
          </div>
        </div>
        <div  @click="changeView(3)">
          <div class="inner">
            <v-group-iwt :hor="'center'"  class="log-box">
              <div class="nav-icon-img">
                <img src="../assets/image/home/area_logo_1.png"/>
              </div>
              <div class="nav-icon-title">
                存储区管理
              </div>
            </v-group-iwt>

            <div class="nav-desc">
              用户可将自有数据接入平台进行管理，在此可进行数据接入的配置、标引等工作。在平台原始区、处理区、分析区数据存储新建、授权、数据备份、查询等，提供平台数据在各存储区域之间的导入/导出。
            </div>
          </div>
        </div>
        <div  @click="changeView(4)">
          <div class="inner">
            <v-group-iwt :hor="'center'"  class="log-box">
              <div class="nav-icon-img">
                <img src="../assets/image/home/area_logo_3.png"/>
              </div>
              <div class="nav-icon-title">
                数据处理
              </div>
            </v-group-iwt>

            <div class="nav-desc">
              为对数据有处理权的用户提供数据处理、数据清洗、数据整合和数据标签管理。
            </div>
          </div>
        </div>
      </h-group-iwt>

      <h-group-iwt class="nav-container">
        <div   @click="changeView(5)">
          <div class="inner">
            <v-group-iwt :hor="'center'"  class="log-box">
              <div class="nav-icon-img">
                <img src="../assets/image/home/area_logo_1.png"/>
              </div>
              <div class="nav-icon-title">
                数据分析
              </div>
            </v-group-iwt>

            <div class="nav-desc">
              提供多维建模、数据挖掘和可视化服务。
            </div>
          </div>
        </div>
        <div @click="changeView(6)">
          <div class="inner">
            <v-group-iwt :hor="'center'"  class="log-box">
              <div class="nav-icon-img">
                <img src="../assets/image/home/area_logo_3.png"/>
              </div>
              <div class="nav-icon-title">
                数据可视化
              </div>
            </v-group-iwt>

            <div class="nav-desc">
              提供多维建模、数据挖掘和可视化服务。
            </div>
          </div>
        </div>
        <div  @click="changeView(7)">
          <div class="inner">
            <v-group-iwt :hor="'center'"  class="log-box">
              <div class="nav-icon-img">
                <img src="../assets/image/home/area_logo_2.png"/>
              </div>
              <div class="nav-icon-title">
                平台管理与监控
              </div>
            </v-group-iwt>

            <div class="nav-desc">
              实现平台授权管理、租户授权管理以及平台监控
            </div>
          </div>
        </div>
      </h-group-iwt>

    </v-group-iwt>

  </h-group-iwt>
</template>
