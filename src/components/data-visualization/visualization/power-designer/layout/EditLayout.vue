<script>
  import VueGridLayout from 'vue-grid-layout';
  import Inject from "@/common/model/Inject";
  import EventDispatcher from "@/common/event/EventDispatcher";
  import EventList from "@/common/event/EventList";
  import VisualizationAPI from "@/common/service/VisualizationAPI";
  import Layout from '../../model/Layout';
  import LayoutItem from '../../model/LayoutItem';

  import html2canvas from 'html2canvas';

  let GridLayout = VueGridLayout.GridLayout;
  let GridItem = VueGridLayout.GridItem;

  export default {
    components: {GridLayout,GridItem},
    data() {
      this.layoutPM = Inject.getClass(Layout);
      return {
        layout: this.layoutPM,   //将layoutPM与data绑定,既满足了data结构的清晰结果，也保证了this.layoutPM中函数执行与data值保持一致
        currentGridItem: null,
        formLabelWidth: '100px'
      }
    },

    computed: {},
    mounted() {},
    activated() {},
    methods: {
      remove(){
        this.layout.layoutItems.splice(this.layout.layoutItems.findIndex(item => item === this.currentGridItem), 1);
      },
      add(){
        this.layout.layoutItems.push(new LayoutItem(this.layout.id,NormalUtils.createUUid("layout-item-",32)));
      },
      save(){
        html2canvas(this.$refs['grid-layout'].$el,{
          allowTaint: true,
          //width: this.$refs['grid-layout'].$el.style.width.replace('px','')+10,
          height: this.$refs['grid-layout'].$el.style.height.replace('px','')+10
        }).then(canvas => {
          VisualizationAPI.uploadLayoutImg(canvas,'imgFile',(result) => {
            this.layout.imgUrl = "/"+result.data.imgUrl;
            /**
             * 由于新增或修改事件与重新编辑屏幕布局事件，两者同一时刻始终至多存在一个，因此此处出发两项，避免了判断事件类型
             * Object.assign({},this.layout)构建新对象传递，防止对象地址被直接引用
             */
            EventDispatcher.disEvent(EventList.GRID_LAYOUT_SAVE_OR_UPDATE, JSON.parse(JSON.stringify(this.layout)));
            EventDispatcher.disEvent(EventList.CHANGE_SCREEN_GRID_LAYOUT, JSON.parse(JSON.stringify(this.layout)));
          },(rej) => {NormalUtils.popMessage("缩略图上传失败");});
        });
      },
      /**
       * 关闭后移除事件
       * 确保新增或修改事件与重新编辑屏幕布局事件，两者同一时刻始终至多存在一个
       */
      removeListeners(){
        EventDispatcher.removeListener(EventList.GRID_LAYOUT_SAVE_OR_UPDATE);
        EventDispatcher.removeListener(EventList.CHANGE_SCREEN_GRID_LAYOUT);
      }
    }
  }
</script>

<template>
  <el-dialog @close="removeListeners" :visible.sync="layout.show" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" :fullscreen="true">
    <div slot="title">
      <span>可视化布局编辑</span>
      <el-button type="primary" icon="iconfont tj-icon-save" @click="save" class="layout-edit-btn">保存</el-button>
      <el-button type="info" icon="iconfont tj-icon-backward" @click="layout.show = false" class="layout-edit-btn">取消</el-button>
      <el-button type="text" icon="iconfont tj-icon-split" class="layout-edit-btn"></el-button>
      <el-button type="warning" icon="iconfont tj-icon-remove" v-if="currentGridItem && layout.layoutItems.length > 1" @click="remove()" class="layout-edit-btn">删除</el-button>
      <el-button type="warning" icon="iconfont tj-icon-add" @click="add()" class="layout-edit-btn">添加</el-button>
    </div>
    <div>
      <el-form :inline="true" :model="layout">
        <!-- 目前仅Layout属性中仅以下提供配置项，其他暂时不予提供 -->
        <el-form-item label="布局名称" :label-width="formLabelWidth">
          <el-input v-model="layout.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="每行列数" :label-width="formLabelWidth">
          <el-input-number v-model="layout.colNum" :min="1" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="最多行数" :label-width="formLabelWidth">
          <el-input-number v-model="layout.maxRows" :min="1" :max="50"></el-input-number>
        </el-form-item>
        <el-form-item label="行高(px)" :label-width="formLabelWidth">
          <el-input-number v-model="layout.rowHeight" :min="1" :max="500"></el-input-number>
        </el-form-item>
      </el-form>
      <el-form v-if="currentGridItem" :inline="true" :model="currentGridItem">
        <!-- 目前仅Layout属性中仅以下提供配置项，其他暂时不予提供 -->
        <el-form-item label="宽度(列)" :label-width="formLabelWidth">
          <el-input-number v-model="currentGridItem.w" :min="0.1" :max="layout.colNum"></el-input-number>
        </el-form-item>
        <el-form-item label="高度(行)" :label-width="formLabelWidth">
          <el-input-number v-model="currentGridItem.h" :min="0.1" :max="layout.maxRows"></el-input-number>
        </el-form-item>
      </el-form>
      <grid-layout
        ref="grid-layout"
        :layout="layout.layoutItems"
        :col-num="layout.colNum"
        :row-height="layout.rowHeight"
        :max-rows="layout.maxRows"
        :margin="layout.margin"
        :is-draggable="layout.isDraggable"
        :is-resizable="layout.isResizable"
        :is-mirrored="layout.isMirrored"
        :auto-size="layout.autoSize"
        :vertical-compact="layout.verticalCompact"
        :use-css-transforms="layout.useCssTransforms">
        <grid-item v-for="(item,index) in layout.layoutItems"
                   :key="index"
                   :i="item.i"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :is-draggable="item.isDraggable"
                   :is-resizable="item.isResizable"
                   :drag-ignore-from="item.dragIgnoreFrom"
                   :drag-allow-from="item.dragAllowFrom"
                   :resize-ignore-from="item.resizeIgnoreFrom">
          <div class="vue-draggable-item" @click="currentGridItem = item">
            <i v-if="currentGridItem === item" class="vue-draggable-class iconfont tj-icon-move"></i>
            <div class="layout-item-index">{{index+1}}</div>
          </div>
        </grid-item>
      </grid-layout>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
  .vue-draggable-item {
    border: 1px solid;
    width: 100%;
    height: 100%;
  }
  .layout-item-index{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .layout-edit-btn{
    float: right;
    margin-left: 10px;
  }
</style>
