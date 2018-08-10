<template>
  <div class="tj-combobox-box-trs">
    <h-group-iwt style="width:100%;height:100%;">
      <input type="text"
             class="tj-transparent-input tj-combobox-input-sty"
             v-model="modelValue"
             v-bind:id="autoId"
             @change="inputChangeHandler()"  >
      <div @click="(ev)=>{this.showMenuHandler(ev)}" style="background-color:#ff0000;flex:none;width:22px;height:100%;cursor:pointer;">
        <div class="tj-combobox-caret" ></div>
      </div>
    </h-group-iwt>
  </div>
</template>

<script>
  import NormalUtils from "../../../utils/NormalUtils";
  import RightMenu from "../../../utils/RightMenu" ;

  export default {
    props: {
      'labelField': {default: "label"},
      'valueField':{default:"value"},
      "valueData":{default:""},
      'dataProvider': { }
    },
    data(){
      return {
        modelValue:"",
        selectItem:null,
        selectValue:"",
        autoId:NormalUtils.createOID("inputId")
      }
    },
    computed: {
    },
    methods:{
      //显示下拉框
      showMenuHandler(ev){
        let _input = $("#"+this.autoId);
        let _ofxy = _input.offset() ;
        RightMenu.showRightMenu(ev,this.dataProvider||[],(item)=>{
          this.selectItemChange(item) ;
        },null,{px:_ofxy.left ,py:_ofxy.top+_input.height(),width:_input.width()}) ;
      },

      /*初始化数据*/
      initData(){
        this.selectValue = this.valueData ;
        this.selectItem = this.getSelectedItemByValue(this.selectValue) ;
        this.setShowLabel(this.selectItem) ;
      },

      /**/
      setShowLabel( item ){
        if(!item || !item.hasOwnProperty(this.labelField))
          this.modelValue = "" ;
        this.modelValue = item[this.labelField] ;
      },

      getSelectedItemByValue( value ){
        if(!this.dataProvider)
          return null ;

        for(let item of this.dataProvider){
          if(item && item.hasOwnProperty(this.labelField) && item[this.labelField] === this.modelValue){
            this.selectItem = item ;
            this.valueChangeHandler( item[this.valueField] ) ;
            break;
          }
        }
      },

      /*输入框变化处理*/
      inputChangeHandler(){
        this.selectItem = null ;

        //根据label找到值
        if(this.dataProvider){
          for(let item of this.dataProvider){
            if(item && item.hasOwnProperty(this.labelField) && item[this.labelField] === this.modelValue){
              this.selectItem = item ;
              this.valueChangeHandler( item[this.valueField] ) ;
              break;
            }
          }
        }

        //变化处理
        if(this.selectItem===null)
          this.valueChangeHandler( this.modelValue) ;
      },

      /*选择变化*/
      selectItemChange(item){
        this.selectItem = item ;
        if( this.selectItem.hasOwnProperty("label"))
          this.modelValue = this.selectItem.label ;
        if( this.selectItem.hasOwnProperty("value"))
          this.valueChangeHandler( this.selectItem.value) ;
      },

      /*数据变化处理*/
      valueChangeHandler(value){
        this.selectValue = value ;
        this.$emit("change", this.selectValue ) ;
      }
    }
  };
</script>

<style scoped>
</style>
