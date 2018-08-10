<script>
  import DataTagManagerPM from "./DataTagManagerPM" ;
  import Inject from "@/common/model/Inject" ;
  import ContentTitle from "../../../common/comps/normal/ContentTitle";

  export default {
    components: {ContentTitle},
    data() {
      this.viewPM = Inject.getClass(DataTagManagerPM) ;
      return {
        auth:AuthManager.has,
        viewData:this.viewPM.data
      }
    },
    mounted() {
    },
    methods: {

    }
  }
</script>
<style scoped>
</style>

<template>
  <div class="tj-t-view-inner" >
   数字标签管理
  </div>
</template>
