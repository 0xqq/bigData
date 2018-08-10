<template>
  <div class="sp" v-bind:style="{flex:'0 0 auto', 'height':gapSty }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['gap' ],
    computed: {
      //不支持0
      gapSty: function () {
        if(!this.gap || !parseFloat(this.gap))
          return "10px" ;
        return this.gap+"px";
      }
    }
  };
</script>

