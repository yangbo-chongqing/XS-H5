<template>
  <div class="h-container">
    <div class="h-container_content">
      <div class="ed-header">
        <div class="entry-title">
          <input type="text" bindinput="titleInput" v-model="name" placeholder="请输入词条名称" @blur.prevent="changeCount()">
          <div class="send-data-btn" @click="modifyEntryDetails">修改</div>
        </div>
      </div>
      <div class="ed-content">
        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" style="min-height: 100px">
          <!-- 自定义toolar -->
          <div id="toolbar" slot="toolbar">
            <!-- Add a bold button -->
            <button class="ql-bold" title="加粗">Bold</button>
            <button class="ql-italic" title="斜体">Italic</button>
            <button class="ql-underline" title="下划线">underline</button>
            <button class="ql-strike" title="删除线">strike</button>
            <button class="ql-blockquote" title="引用"></button>
            <button class="ql-code-block" title="代码"></button>
            <button class="ql-header" value="1" title="标题1"></button>
            <button class="ql-header" value="2" title="标题2"></button>
            <!--Add list -->
            <button class="ql-list" value="ordered" title="有序列表"></button>
            <button class="ql-list" value="bullet" title="无序列表"></button>
            <!-- Add font size dropdown -->
            <select class="ql-header" title="段落格式">
              <option selected>段落</option>
              <option value="1">标题1</option>
              <option value="2">标题2</option>
              <option value="3">标题3</option>
              <option value="4">标题4</option>
              <option value="5">标题5</option>
              <option value="6">标题6</option>
            </select>
            <select class="ql-size" title="字体大小">
              <option value="10px">10px</option>
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px" selected>16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="30px">30px</option>
            </select>
            <!-- Add subscript and superscript buttons -->
            <select class="ql-color" value="color" title="字体颜色"></select>
            <select class="ql-background" value="background" title="背景颜色"></select>
            <select class="ql-align" value="align" title="对齐"></select>
            <button class="ql-clean" title="清除字体样式"></button>
            <button class="ql-image" title="照片"></button>
          </div>
        </quill-editor>
      </div>
<!--      相关添加-->
      <div class="ed-footer">
        <div class="editor-entry-tip-add" @click="showPopup">
          <van-icon name="plus"  color="#5387fd" />相关词条
        </div>
        <div class="editor-entry-tip-box">
          <div class="editor-entry-tip" v-for="(item,index) in entrySelectData" :key="index">
            {{item.name}}
            <van-icon color="#5387fd" bindtap="delEntryData" :data-index='index' name="cross" />
          </div>
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