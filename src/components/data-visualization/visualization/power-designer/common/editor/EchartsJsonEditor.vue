<template>
  <el-card header="Echarts原生配置">
    <editor v-model="value" @init="editorInit" lang="json" theme="github" width="100%" height="800"></editor>
  </el-card>
</template>

<script>
  import EventDispatcher from '@/common/event/EventDispatcher'
  import EventList from '@/common/event/EventList'

  export default {
    props:{
      config: Object
    },
    components: {editor: require('vue2-ace-editor')},
    data(){
      this.init()
      this.eventsInit()
      return {
        value: "{}"
      }
    },
    methods: {
      init(){
        this.value = this.config.extend
      },
      eventsInit() {
        //开始图表编辑时，添加相关初始化操作
        EventDispatcher.addListener(EventList.CHART_CONFIG_BEGAIN, () => {
          this.init()
        })
      },
      editorInit() {
        require('brace/ext/language_tools') //language extension prerequsite...
        require('brace/mode/json')    //language
        require('brace/theme/github')
        require('brace/snippets/json') //snippet
      }
    },
    watch: {
      value(v){
        if(v.trim() === ""){
          this.value = "{}"
        }else{
          try {
            JSON.parse(v)
            this.config.extend = v
          } catch(e) {}
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
