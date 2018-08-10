<script>
  import ModelEditViewPM from "../ModelEditViewPM" ;
  import Inject from "@/common/model/Inject" ;
  import TextInput from "./props-comps/TextInput" ;
  import ComboBox from "./props-comps/ComboBox" ;
  import CheckBox from "./props-comps/CheckBox" ;
  import NumberInput from "./props-comps/NumberInput" ;
  import TableInputForm from "./props-comps/TableInputForm" ;
  import TableOutputForm from "./props-comps/TableOutputForm"

  let gridMap = {
    "checkbox":CheckBox,
    "textinput":TextInput,
    "combobox":ComboBox,
    "numberinput":NumberInput
  };

  export default {
    components:{TableInputForm,CheckBox,TextInput,NumberInput,ComboBox,TableOutputForm},
    data() {
      this.viewPM = Inject.getClass(ModelEditViewPM)  ;
      return {
        viewData:this.viewPM.data,
      }
    },
    created(){
    },
    methods:{
      getComp(item){
        let type = "textinput" ;
        NormalUtils.showObjStr(item.config) ;
        if(item.config && item.config.type){
          type = (item.config.type+"").toLowerCase() ;
        }

        if(gridMap.hasOwnProperty(type)){
          return gridMap[type] ;
        }
        return TextInput ;
      },

      submit(){
        if(this.viewData.diyAttWinForm.type==='TableInput' || this.viewData.diyAttWinForm.type==='TableOutput')
          this.viewPM.saveFormData(this.viewData.diyAttWinForm.data ,null) ;
        else
          this.viewPM.saveFormData(null , this.viewData.diyAttWinForm.formItemList) ;
        this.close() ;
      },
      close(){
        this.viewData.diyAttWinForm.isPopWin = false ;
      }
    }
  }
</script>

<style scoped lang="scss">

  .container{
    width:100%;

    .list {
      width: 100%;
      min-height: 50px;
      max-height: 400px;
      overflow: auto;
      .item{
        width:100%;
      }
    }
    .gap{
      height:10px;
    }
    .formitem-gap{
      width:100%;
      margin-bottom:10px;
    }
  }

</style>

<template>

  <s-window-auto :title="viewData.diyAttWinForm.title"
                 v-show="viewData.diyAttWinForm.isPopWin"
                 @close="()=>{viewData.diyAttWinForm.isPopWin=false;}"
                 :width="'400px'"  >

    <v-group-iwt class="container">
      <!--form-->
      <div class="list" v-if="viewData.diyAttWinForm.type==='TableInput'">
         <table-input-form :data="viewData.diyAttWinForm.data"></table-input-form>
      </div>
      <!--form-->
      <div class="list" v-if="viewData.diyAttWinForm.type==='TableOutput'">
        <table-output-form :input="viewData.diyAttWinForm.inputMode"
                           :data="viewData.diyAttWinForm.data" ></table-output-form>
      </div>
      <div class="list" v-else>
        <v-group-iwt style="width:100%">
          <!--form-->
          <div v-for="(item,index) in viewData.diyAttWinForm.formItemList"
               :key="index"
               v-if="item.hide?false:true"
               class="formitem-gap">
            <component  :owner="viewData.diyAttWinForm.formItemList"
                        :is="getComp(item)"
                        :data="item"
                        :label="item.label" >
            </component>
          </div>
        </v-group-iwt>
      </div>
      <div class="gap"></div>
      <h-group-iwt :hor="'center'"  style="width:100%;">
        <el-button type="primary" size="small" @click="submit"> 保存 </el-button>
        <el-button type="warning"  size="small" @click="close"> 关闭 </el-button>
      </h-group-iwt>

    </v-group-iwt>
  </s-window-auto>
</template>


