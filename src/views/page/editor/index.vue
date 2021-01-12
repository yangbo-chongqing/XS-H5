<template>
  <div class="h-container">
    <div class="h-container_content">
      <div class="ed-header">
        <div class="entry-title">
          <input type="text" bindinput="titleInput" v-model="a" placeholder="请输入词条名称" @blur.prevent="changeCount()">
          <div class="send-data-btn">修改</div>
        </div>
      </div>
      <div class="ed-content">
        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" style="height:100px;display: inline-block"></quill-editor>
      </div>
<!--      相关添加-->
      <div class="ed-footer">
        <div class="editor-entry-tip-add" @click="showPopup">
          <van-icon name="plus"  color="#5387fd" />相关词条
        </div>
<!--        弹出框-->
        <van-popup v-model="show" position="bottom" :style="{height: '70%'}">
          <div class="entry-popup-title">
            相关词条
            <p class="entry-send-btn">完成</p>
          </div>
          <van-search v-model="value" shape="round" background="#ffffff" placeholder="请输入搜索关键词" />
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
import Logic from "./index";

export default Logic;
</script>
<style lang="scss">
@import "./index-vant.scss";
</style>
<style scoped lang="scss">
@import "./index.scss";
</style>