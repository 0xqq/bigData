<script>
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;

  export default {
    data() {
      return {
        isOpen: false,
        isLoading:false,
        dataSource: {
          resourceId: "",
          resourceName: "",
          orgName: "",
          provider: "",//联系人
          providerMobile: "",//联系电话
          applicant: "",//对接人
          applicantMobile: ""//对接电话
        }
      }
    },
    mounted(){
    },
    methods:{

      reset(){
        Object.assign(this.dataSource,{
          id:"",
          resourceId: "",
          resourceName: "",
          orgName: "",
          provider: "",//联系人
          providerMobile: "",//联系电话
          applicant: "",//对接人
          applicantMobile: "",//对接电话
          sendStatus: "",
          jobNumber: "",
          token: ""
        })
      },

      /**
       * 打开窗口
       */
      open(item){
        this.reset() ;
        this.isOpen = true ;
        this.dataSource.resourceId = item.id ;
        this.queryInfo() ;
      },

      /**
       * 查询详情
       */
      queryInfo(){
        this.isLoading = true ;
        DataStorageAPI.queryTableExchange({id:this.dataSource.resourceId}).then(
          (result)=>{
            this.isLoading = false ;
            if(result.resourceExchangeInfoDto){
              for(let att in  result.resourceExchangeInfoDto){
                  let data = result.resourceExchangeInfoDto[att] ;
                  if(!data)
                    data = "" ;
                  this.dataSource[att]  =  data;
              }
            }
          },
          ()=>{
            this.isLoading = false ;
          }
        ) ;
      },

      closeWin(){
        this.isOpen = false ;
      },
      submit(){
        if(!this.dataSource.applicant){
          this.$message.warning("技术对接人员姓名不能为空！") ;
          return ;
        }
        if(!this.dataSource.applicantMobile){
          this.$message.warning("技术对接人员电话不能为空！") ;
          return ;
        }
        this.isLoading = true ;
        DataStorageAPI.saveTableExchange( this.dataSource).then(
          (result)=>{
            this.isLoading = false ;
            this.closeWin() ;
          },
          ()=>{
            this.isLoading = false ;
          }
        ) ;

      }
    }

  }
</script>

<style lang="scss" scoped>
  .container{
    @include abs-group() ;
    .table-container{
      @include abs-group(0,5px,0,55px ) ;
      border:1px solid $form-borderColor;
      background-color: #eeeeee ;

      .table-inner{
        @include abs-group(20px,20px,20px,false) ;
        background-color: #fff;
        .t-exchange {
          width:100%;
          border:1px solid #dadfe1;
          border-collapse: collapse;
          padding:2px;
          td:nth-child(1){
            text-align :left;
            color:#898989;
            font-size:15px;
            font-weight:600;
          }
          td:nth-child(2){
            text-align :left;
            color:#000;
            font-size:15px;
          }
          td{
            border:1px solid #dadfe1;
            padding:0 5px 0 5px;
            height:33px;
            text-align :left;
          }
          tr{
            border:1px solid #dadfe1;
          }
          input{
            width:100%;
            height:90%;
          }
        }
      }
    }
    .footer{
      @include abs-group(0,false,0,0) ;
      height:40px;
    }
    .auto-layout{
      width:100%;
    }
  }
</style>

<template>
  <s-window @close="closeWin()"
            title="交换申请单"
            :visible="isOpen"
            :width="'560px'"
            :height="'360px'" >

    <!--tabale-->
    <div class="container" >
      <div class="table-container">
        <div class="table-inner">
          <table class="t-exchange" >
            <tr><td>资源名称</td><td >{{dataSource.resourceName}}</td></tr>
            <tr><td>资源提供单位</td><td  >{{dataSource.orgName}}</td></tr>
            <tr><td>提供单位联系人</td><td  >{{dataSource.provider}}</td></tr>
            <tr><td>提供单位联系电话</td><td >{{dataSource.providerMobile}}</td></tr>
            <tr><td >技术对接人员姓名</td><td>
              <input class="tj-transparent-input"
                     v-model="dataSource.applicant"
                     placeholder="请输入技术对接人员姓名" >
            </td></tr>
            <tr><td>技术对接人员电话</td><td>
              <input class="tj-transparent-input"
                     v-model="dataSource.applicantMobile"
                     placeholder="请输入手机号" >
            </td></tr>
          </table>

        </div>
      </div>
      <h-group-iwt :hor="'center'" class="footer">
        <el-button type="primary"
                   @click="submit">保存</el-button>
        <el-button type="warning"
                   @click="closeWin">关闭</el-button>
      </h-group-iwt>
    </div>


  </s-window>
</template>
