<script>
  import DataStorageAPI from "@/common/service/DataStorageAPI" ;
    export default {
        data() {
            return {
              isOpen:false,
              isLoading:false,
              id:"",
              dataSource:{
                name:"",
                interfaceUrl:"",
                attachment:"",
                technicalSupportMobile:"",
                technicalSupportUser:"",
                interfaceDesc:"",
                interfaceName:""
              },
              fields:[
                {name:"",must:"",desc:""},
                {name:"",must:"",desc:""},
                {name:"",must:"",desc:""},
                {name:"",must:"",desc:""}
              ]
            }
        },
        mounted() {

        },
        activated() {

        },
        methods: {
          open( value ){
            this.id = value.id ;
            this.isOpen = true ;
            this.queryInfo() ;
          },

          queryInfo(){
            this.isLoading = true ;
            DataStorageAPI.queryTableInterface({id:this.id}).then(
              (result)=>{
                this.isLoading = false ;
              },
              ()=>{
                this.isLoading = false ;
              }
            );
          },

          closeWin(){
            this.isOpen = false ;
          }
        }

    }
</script>

<style scoped lang="scss">
  $borderColor:#ccc ;
  $weightFont:600;
  $weightColor:#898989;
  $contentColor:#000;

  .container {
    @include abs-group(5px, 5px, 5px, 5px) ;
    font-size: 12px;
    table {
      width: 100%;
      border: 1px solid $borderColor;
      border-collapse: collapse;
      padding: 2px;
      td {
        border: 1px solid $borderColor;
        padding: 0 10px;
        height: 35px;
        text-align: left;
      }
      tr {
        border: 1px solid $borderColor;
      }

      .title-td {
        color: $weightColor;
        font-weight: $weightFont;
        font-size: 13px;
        text-align: left;
        vertical-align: middle;
        width:100px;
      }
      .title-td-add{
        @extend .title-td ;
        height:50px;
      }
      .table-in{
        border:0px;
      }
    }
  }

</style>

<template>
  <s-window @close="closeWin()"
            title="接口信息"
            :visible="isOpen"
            :width="'666px'"
            :height="'420px'" >

    <div class="container">

          <table class="table-out">
            <tr>
              <td class="title-td">接口中文名称</td>
              <td >{{dataSource.interfaceName}}</td>
              <td class="title-td">接口描述</td>
              <td >{{dataSource.interfaceDesc}}</td>
            </tr>
            <tr>
              <td class="title-td">技术联系人</td>
              <td >{{dataSource.technicalSupportUser}}</td>
              <td class="title-td">技术联系人电话</td>
              <td >{{dataSource.technicalSupportMobile}}</td>
            </tr>
            <tr >
              <td class="title-td">附件</td>
              <td colspan="3"><el-button type="text">{{dataSource.attachment}}</el-button> </td>
            </tr>
            <tr>
              <td class="title-td-add">接口地址</td>
              <td colspan="3" >{{dataSource.interfaceUrl}}</td>
            </tr>
            <tr>
              <td class="title-td">参数说明</td>
              <td colspan="3"  style="padding:0;">
                  <div class="table-scroll">
                  <table class="table-in" >
                    <tr >
                      <td  class="title-td">参数名称</td>
                      <td  class="title-td">是否必填</td>
                      <td  class="title-td">参数描述</td>
                    </tr>
                    <tr v-for="(item,index) in fields" :key="index">
                      <td >{{item.name}} </td>
                      <td >{{item.must}} </td>
                      <td >{{item.desc}} </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
    </div>

    <s-loading v-show="isLoading"></s-loading>
  </s-window>
</template>
