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
  <div class="tj-content-outer">
    <div class="tj-content-padding">
      <v-group-iwt style="width:100%;">

        <ContentTitle :title="'信用目录'"></ContentTitle>
        <v-gap-iwt></v-gap-iwt>

      </v-group-iwt>
    </div>
  </div>
</template>


