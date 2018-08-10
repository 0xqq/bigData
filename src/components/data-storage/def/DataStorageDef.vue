
<script>
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;
  import "@/style/data-task-mode.scss" ;

  export default {
    components:{ContentTitle},
    data() {
      return {
        currentDate: new Date(),
        date:"数据存储数量",
        showData:{
          storageNum:0,//存储区数据总条数
          departmentNum:0,//接入部门总条数
          externalNum:0,//外部数据源总条数
          originalInNum:0,//（原始区）从外部数据源共导入数据总条数，
          originalInTimes:0,// （原始区）从外部数据源共导入总次数：
          handlerInNum:0,//（处理区）从原始区导入数据总条数，
          handlerInTimes:0,// 导入总次数；
          analysisInNum0:0,//（分析区）从处理区共导入数据总条数；
          analysisInTimes0:0,// （分析区）从处理区共导入总次数；
          analysisInNum1:0,//（分析区）从原始区导入数据总条数；
          analysisInTimes1:0//（分析区）从原始区导入总次数；
        }
      }
    },

    activated(){
      DataStorageAPI.getStatisticsData().then(
        (result)=>{
          Object.assign(this.showData,result.data) ;
        }
      );
    },

    //方法
    methods: {}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>

  $titleColor:#34394c;
  $labelColor:#7e8993;
  $numFamily:HelveticaNeueLTPro, 方正姚体, 黑体, Arial;

  .container{
    @include abs-group() ;
    overflow: auto;
    background-color:#edf0f5 ;

    .layout{
      width:100%;
      padding: 12px 12px ;
      box-sizing: border-box;

      .area-top{
        width: 100%;
        .area-data{
          width: 100%;
          height: 50px;
          position: relative;
          .title{
            height: 100%;
            font-size: 17px;
            color: #343e47;
            font-weight: bold;
            padding-left: 25px;
          }
          .title:after{
            content: '';
            position: absolute;
            left: 0;
            top:5px;
            width: 0;
            height: 0;
            border: 8px solid #edf0f5;
            border-left-color: #4caf50;
          }

        }
      }


      /*区域数据统计*/
      .area-num{
        flex:none;
        width:100%;
        height:100px;
        >div{

          flex:auto;
          height:100%;
          color:#fff;
          position:relative;
          .info-box{
            @include abs-group(226px);
            .num{
              flex:auto;
              font-family: Arial;
              font-size:36px;
              text-align: center;
            }
            .title{
              flex:none;
              font-size:20px;
            }
          }
        }
        >div:nth-child(1){
          border-radius: 5px;
          width: 49.5%;
          background-color: #2956c6;
          position: relative;
          >img:nth-child(1){
            position: absolute;
            right: 0;
            bottom: 0;
          }
          >img:nth-child(2){
            position: absolute;
            left: 20px;
            top:0;
          }
          >img:nth-child(3){
            position: absolute;
            left: 130px;
            top:0;
          }
        }
        >div:nth-child(2){
          background-color: #2956c6;
          border-radius: 5px;
          width: 49.5%;
          margin-left: 1%;
          position: relative;
          >img:nth-child(1){
            position: absolute;
            right: 0;
            bottom: 0;
          }
          >img:nth-child(2){
            position: absolute;
            left: 20px;
            top:0;
          }
          >img:nth-child(3){
            position: absolute;
            left: 130px;
            top:0;
          }
        }
      }

      /*数值*/
      .num-box{
        flex:none;
        width:100%;
        height:330px;
        border:1px solid #e4e9ee;
        background-color: #fff;
        box-sizing: border-box;
        margin-top: 10px;
        .layout{
          width:100%;

        }

        .num-img{
          flex:none;
          margin: 10px 0 0 0 ;
        }

        .num-text{
          flex:none;
          width:940px;

          .num-item-text{
            flex:none;
            width:25%;
            height:100%;
            text-align: center;
            font-size:16px;
            .title{
              margin-top: 10px;
              text-align: center;
              line-height:30px;
            }
            .num{
              text-align: center;
              font-family:$numFamily;
              font-size: 25px;
              color:#375cb9;
              min-height:26px;
            }
            .pix{
              margin-left: 3px;
              color: #34394c;
            }
          }

        }
      }

      /*控制区*/
      .nav-layout{
        width:100%;
        margin-top: 12px;
      }
    }
    .auto-layout{
      width:100%;
    }
  }

  /*全布局容器*/
  .nav-box-item{
    flex:auto ;
    min-width:200px;
    height:168px;
    color: #34394c;
    position:relative;
    .title{
      @include abs-group(25px,18px,false,false);
      font-size: 17px;
    }
    .text{
      @include abs-group(25px,51px,16px,39px);
      line-height:24px;
      font-size:14px;
      vertical-align: middle;
      word-break:break-all;
    }

    .nav-bg{
      @include abs-group();
    }
    .nav-mid{
      flex:auto;
      height:100%;
      background-repeat: repeat-x;
    }
    .img-1{
      background-image: url("../../../assets/image/storage/nav_1_mid.png");
    }
    .img-2{
      background-image: url("../../../assets/image/storage/nav_2_mid.png");
    }
    .img-3{
      background-image: url("../../../assets/image/storage/nav_3_mid.png");
    }
    .img-4{
      background-image: url("../../../assets/image/storage/nav_4_mid.png");
    }
  }

  .nav-box-gap{
    flex:none;
    width:20px;
  }

</style>

<template>

  <div  class="container">
    <v-group-iwt class="layout">

      <!--区域统计aa-->
      <h-group-iwt class="area-num">
        <div>
          <img src="../../../assets/image/storage/area_icon_5.png"/>

          <img src="../../../assets/image/storage/area_icon_1.png"/>
          <img src="../../../assets/image/storage/area_icon_3.png"/>
          <h-group-iwt  :ver="'center'" class="info-box">
            <!--<div class="title">存储区数量 </div>-->
            <div class="num" style="padding-left: 30%">{{showData.storageNum}}</div>
          </h-group-iwt>
        </div>
        <div>
          <img src="../../../assets/image/storage/area_icon_5.png"/>
          <img src="../../../assets/image/storage/area_icon_2.png"/>
          <img src="../../../assets/image/storage/area_icon_4.png"/>
          <h-group-iwt :ver="'center'" class="info-box">
            <!--<div class="title">接入部门数 </div>-->
            <div class="num" style="padding-left: 30%">{{showData.departmentNum}}</div>
          </h-group-iwt>
        </div>
      </h-group-iwt>

      <div class="num-box">
        <v-group-iwt :hor="'center'" class="layout">

          <div class="num-img">
            <img src="../../../assets/image/storage/storage2.png"/>
          </div>

          <div class="num-text">
            <h-group-iwt :ver="'start'" class="auto-layout">
              <div class="num-item-text">
                <v-group-iwt :hor="'center'">
                  <div class="title">外部数据源总数</div>
                  <h-group-iwt :ver="'end'" >
                    <span class="num" >{{showData.externalNum}}</span>
                    <span class="pix">条</span>
                  </h-group-iwt>
                </v-group-iwt>
              </div>

              <div class="num-item-text">
                <v-group-iwt :hor="'center'">
                  <div class="title">从外部数据源共导入</div>
                  <h-group-iwt :ver="'end'" >
                    <span class="num" >{{showData.originalInNum}}</span>
                    <span class="pix">条数据</span>
                    <span style="margin: 0 5px"> | </span>
                    <span class="num" >{{showData.originalInTimes}}</span>
                    <span class="pix">次</span>
                  </h-group-iwt>
                </v-group-iwt>
              </div>

              <div class="num-item-text">
                <v-group-iwt :hor="'center'">
                  <div class="title">从原始区共导入</div>
                  <h-group-iwt :ver="'end'" >
                    <span class="num" style="color:#375cb9">{{showData.handlerInNum}}</span>
                    <span class="pix">条数据</span>
                    <span style="margin: 0 5px"> | </span>
                    <span class="num" style="color:#5db561">{{showData.handlerInTimes}}</span>
                    <span class="pix">次</span>
                  </h-group-iwt>
                </v-group-iwt>
              </div>

              <div class="num-item-text">
                <v-group-iwt :hor="'center'">
                  <div class="title">从原始区共导入</div>
                  <h-group-iwt :ver="'end'" >
                    <span class="num" style="color:#375cb9">{{showData.analysisInNum0}}</span>
                    <span class="pix">条数据</span>
                    <span style="margin: 0 5px"> | </span>
                    <span class="num" style="color:#5db561">{{showData.analysisInTimes0}}</span>
                    <span class="pix">次</span>
                  </h-group-iwt>
                  <div class="title">从处理区共导入</div>
                  <h-group-iwt :ver="'end'" >
                    <span class="num" style="color:#375cb9">{{showData.analysisInNum1}}</span>
                    <span class="pix">条数据</span>
                    <span style="margin: 0 5px"> | </span>
                    <span class="num" style="color:#5db561">{{showData.analysisInTimes1}}</span>
                    <span class="pix">次</span>
                  </h-group-iwt>
                </v-group-iwt>
              </div>
            </h-group-iwt>

          </div>
        </v-group-iwt>
      </div>

      <h-group-iwt class="nav-layout">

        <div class="nav-box-item">
          <h-group-iwt class="nav-bg">
            <img src="../../../assets/image/storage/nav_1_left.png"/>
            <div class="nav-mid img-1"></div>
            <img src="../../../assets/image/storage/nav_1_right.png"/>
          </h-group-iwt>
          <div class="title">数据源</div>
          <h-group-iwt :hor="'center'" class="text">
            <div style="flex:none;width:100%;" >
              数据源 提供对存放在原始区数据的管理、查询、标引、导出等服务。
            </div>
          </h-group-iwt>
        </div>

        <div class="nav-box-gap"></div>
        <div class="nav-box-item">
          <h-group-iwt class="nav-bg">
            <img src="../../../assets/image/storage/nav_2_left.png"/>
            <div class="nav-mid img-2"></div>
            <img src="../../../assets/image/storage/nav_2_right.png"/>
          </h-group-iwt>
          <div class="title">原始区</div>
          <h-group-iwt :hor="'center'" class="text">
            <div style="flex:none;width:100%;" >
              提供对存放在原始区数据的管理、查询、标引、导出等服务。
            </div>
          </h-group-iwt>
        </div>

        <div class="nav-box-gap"></div>
        <div class="nav-box-item">
          <h-group-iwt class="nav-bg">
            <img src="../../../assets/image/storage/nav_3_left.png"/>
            <div class="nav-mid img-3"></div>
            <img src="../../../assets/image/storage/nav_3_right.png"/>
          </h-group-iwt>
          <div class="title">处理区</div>
          <h-group-iwt :hor="'center'" class="text">
            <div style="flex:none;width:100%;" >
              提供对存放在处理区数据的管理、查询、标引、导出等服务。
            </div>
          </h-group-iwt>
        </div>

        <div class="nav-box-gap"></div>
        <div class="nav-box-item">
          <h-group-iwt class="nav-bg">
            <img src="../../../assets/image/storage/nav_4_left.png"/>
            <div class="nav-mid img-4"></div>
            <img src="../../../assets/image/storage/nav_4_right.png"/>
          </h-group-iwt>
          <div class="title">分析区</div>
          <h-group-iwt :hor="'center'" class="text">
            <div style="flex:none;width:100%;" >
              提供对存放在分析区数据的管理、查询、标引、导出等服务
            </div>
          </h-group-iwt>
        </div>
      </h-group-iwt>

    </v-group-iwt>
  </div>
</template>
