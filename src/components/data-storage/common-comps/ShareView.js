/**
 * 添加类描述
 * @Author: zc
 * @Modifications:
 * @See:
 */
export default {
  props:{
    title:{default:""},
    mainPath:{default:""},
    sourceFlag:{default:1}
  },
  data() {
    return {
    };
  },
  watch: {
    "$route": "refreshView"
  },
  created(){
    // this.path = this.$route.path ;
    // this.initSourceFlag();
  },
  activated(){
    // this.refreshView() ;
  },
  methods: {

    /**
     * 刷新当前视图
     */
    refreshView(){
      // console.log(this.$route.path +"  ::  "+this.path +"<-----------path : path----------") ;
      //
      // if(this.$route.path !==this.path)
      //   return ;
      // if(this.viewPM)
      //   this.viewPM.refreshView(this.$route) ;
    },

    initSourceFlag(){
      // if(this.viewPM){
      //   let _index = this.path.indexOf("_") ;
      //   if(_index>-1)
      //     this.viewPM.sourceFlag = parseInt(this.path.substring(_index+1,_index+2));
      // }
    }

  }
}
