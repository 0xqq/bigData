<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
</style>

<template>
  <div class="tj-t-view-inner" >
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
