<template>
  <div class="h-container">
    <div class="h-container_content">
      <div class="ed-header">
        <div class="entry-title">
          <input type="text" bindinput="titleInput" v-model="name" placeholder="请输入词条名称" @blur.prevent="changeCount()">
          <div class="send-data-btn" @click="postmodifyEntryDetails">修改</div>
        </div>
      </div>
      <div class="ed-content">
        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" style="min-height: 100px">
          <!-- 自定义toolar -->
          <div id="toolbar" slot="toolbar">
            <div class="toolbar-content">
              <div class="toolbar-left">
                <div class="toolbar-withdraw">
                  <img src="@/assets/images/withdraw-show.png" alt=" ">
                </div>
                <div class="toolbar-nextstep">
                  <img src="@/assets/images/nextstep-show.png" alt=" ">
                </div>
                <div class="toolbar-edit" @click="toolbarShow">
                  <img v-show="!edit_show" src="@/assets/images/edit-show.png" alt=" ">
                  <img v-show="edit_show" src="@/assets/images/edit.png" alt=" ">
                </div>
              </div>
              <div class="toolbar-right">
                <button class="ql-link" title="链接"></button>
                <button class="ql-image" title="照片"></button>
                <button class="ql-video" title="视频"></button>
                <button class="ql-blockquote" title="引用"></button>
                <button class="ql-clean" title="清除字体样式"></button>
              </div>
            </div>
            <div class="toolbar-show" v-show="edit_show">
              <div>
                <button class="ql-bold" title="加粗">Bold</button>
                <button class="ql-italic" title="斜体">Italic</button>
                <button class="ql-underline" title="下划线">underline</button>
                <button class="ql-header" value="1" title="标题1"></button>
                <button class="ql-header" value="2" title="标题2"></button>
              </div>
              <div>
                <button class="ql-strike" title="删除线">strike</button>
                <button class="ql-align" value="center" title="对齐"></button>
                <button class="ql-align" value="right" title="对齐"></button>
                <button class="ql-list" value="ordered" title="有序列表"></button>
                <button class="ql-list" value="bullet" title="无序列表"></button>
              </div>
              <!-- Add a bold button -->

              <!--Add list -->
            </div >
          </div>
        </quill-editor>
      </div>
<!--      上传视频-->
      <div class="Upload-video" style="display:none;">
<!--        <div style="width: 100%;">-->
          <div class="Upload-video-head">
            <p @click="closeVideo">取消</p>
            <p>嵌入视频</p>
            <p @click="addVideo">添加</p>
          </div>
        <div class="Upload-video-content">
          <input type="text" v-model="videoUrl" >
          <van-uploader :after-read="afterRead"  accept="video/*" >上传文件</van-uploader>
        </div>
<!--        </div>-->
      </div>
<!--      上传图片-->
      <van-uploader :after-read="afterRead" style="display: none" accept="image/*" />

<!--      相关添加-->
      <div class="ed-footer">
        <div class="editor-entry-tip-add" @click="showPopup">
          <van-icon name="plus"  color="#5387fd" />相关词条
        </div>
        <div class="editor-entry-tip-box">
          <div class="editor-entry-tip" v-for="(item,index) in entrySelectData" :key="index">
            {{item.name}}
            <van-icon color="#5387fd" bindtap="delEntryData" :data-index='index' name="cross" @click="delrelevant($event)"/>
          </div>
        </div>
<!--        弹出框-->
        <van-popup v-model="show" position="bottom" :style="{height: '70%'}">
          <div class="entry-popup-title">
            相关词条
            <p class="entry-send-btn" @click="addarr">完成</p>
          </div>
          <van-search v-model="value" shape="round" @search="getSearch"  background="#ffffff" placeholder="请输入搜索关键词" />
          <div class="entry-popup-list">
            <van-checkbox-group v-model="result">
              <van-cell-group>
                <van-cell
                    v-for="(item, index) in list"
                    clickable
                    :key="index"
                    :title="`${item.name}`"
                    @click="toggle(index)">
                  <template #right-icon>
                    <van-checkbox :name="item" ref="checkboxes" />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
          </div>
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