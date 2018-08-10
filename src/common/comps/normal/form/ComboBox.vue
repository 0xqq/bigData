<template>
  <div :class="[trans?'container-trans':'container']">
    <h-group-iwt style="width:100%;height:100%;">
      <input type="text"
             :style="{width:'100%','pointer-events': edit?'auto':'none' }"
             class="tj-transparent-input tj-combobox-input-sty"
             v-model="modelValue"
             v-bind:id="autoId"
             @change="inputChangeHandler()"  >
     <div @click="(ev)=>{this.showMenuHandler(ev)}" style="flex:none;width:22px;height:100%;cursor:pointer;">
        <div class="tj-combobox-caret" ></div>
      </div>
    </h-group-iwt><!--脱敏产品-->
  </div>
</template>

<style scoped lang="scss">
  .container {
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    width: 100%;
    min-height: 25px;
    flex: 1 1 auto;
  }
</style>
<script>
  import NormalUtils from "../../../utils/NormalUtils";
  import RightMenu from "../../../utils/RightMenu" ;

  export default {
    props: {
      trans:{default:false},
      edit:{default:true},
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
    watch:{
      valueData:function(newVal, oldVal){
        if(this.modelValue!==newVal){
          this.modelValue = newVal;
          this.inputChangeHandler() ;
        }
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
        },null,{px:_ofxy.left ,py:_ofxy.top+_input.height(),width:_input.width(),labelField:this.labelField}) ;
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
        if( this.selectItem.hasOwnProperty(this.labelField))
             this.modelValue = this.selectItem[this.labelField] ;
        if( this.selectItem.hasOwnProperty(this.valueField))
          this.valueChangeHandler( this.selectItem[this.valueField]) ;
      },

      /*数据变化处理*/
      valueChangeHandler(value){
        this.selectValue = value ;
        this.$emit("change", this.selectValue ) ;
      }
    }
  };
</script>

