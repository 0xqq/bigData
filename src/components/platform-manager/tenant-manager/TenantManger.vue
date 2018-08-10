<script>


  export default {
    components:{  },
    data() {
      return {
      }
    },

    mounted(){
    }
  }

</script>

<style scoped>
</style>

<template>
  <div class="tj-abs" >
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

