<script>
  import ContentTitle from "@/common/comps/normal/ContentTitle" ;
  export default {
    components:{ ContentTitle },
    data() {
      return {
      }
    },
    mounted() {
    },
    //方法
    methods: {
    }
  }

</script>

<style scoped>
</style>
<template>
  <div class="tj-abs">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>


