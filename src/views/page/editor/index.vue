<template>
  <div class="h-container">
    <div class="h-container_content">
      <div class="ed-header">
        <div class="entry-title">
          <input type="text" bindinput="titleInput" v-model="name" placeholder="请输入词条名称" @blur.prevent="changeCount()">
          <div class="send-data-btn" @click="postmodifyEntryDetails">修改</div>
        </div>
      </div>
      <div class="ed-content" ref="us">
        <div id="toolbar" class="toolbar">
          <div class="toolbar-content">
            <div class="toolbar-left">
              <div class="toolbar-withdraw"  @click="execCommands('undo')">
                <span class="iconfont icon-chexiao_huaban"></span>
              </div>
              <div class="toolbar-nextstep" @click="execCommands('redo')">
                <span class="iconfont icon-zhongzuo_huaban"></span>
              </div>
              <div class="toolbar-edit" @click="toolbarShow">
                <img v-show="!edit_show" src="@/assets/images/edit-show.png" alt=" ">
                <img v-show="edit_show" src="@/assets/images/edit.png" alt=" ">
              </div>
            </div>
            <div class="toolbar-right">
              <div class="ql-link ql-tool" title="链接" @click="onlink()"><span class="iconfont icon-lianjie"></span></div>
              <div class="ql-image ql-tool" title="照片" @click="onimage"><span class="iconfont icon-tupian"></span></div>
              <div class="ql-video ql-tool" title="视频" @click="onvideo"><span class="iconfont icon-shipin"></span></div>
              <div class="ql-blockquote ql-tool" title="引用" @click="execCommands('blockquote')"><span class="iconfont icon-yinyong"></span></div>
              <div class="ql-clean ql-tool" title="清除格式" @click="execCommands('removeformat')"><span class="iconfont icon-qingchu"></span></div>
            </div>
          </div>
          <div class="toolbar-show" v-show="edit_show">
            <div>
              <div class="ql-bold ql-tool" title="加粗" :style="{'color':boldcolor ?'#5287fd':''}" @click="justify(4)"><span class="iconfont icon-jiacu"></span></div>
              <div class="ql-italic ql-tool" title="斜体" :style="{'color':italiccolor ?'#5287fd':''}"  @click="justify(5)"><span class="iconfont icon-02xieti"></span></div>
              <div class="ql-underline ql-tool" title="下划线" :style="{'color':underlineccolor ?'#5287fd':''}" @click="justify(6)"><span class="iconfont icon-xiahuaxian" ></span></div>
              <div class="ql-header ql-tool" title="标题1" :style="{'color':h1color ?'#5287fd':''}" @click="ontitle(1)"><span class="iconfont icon-H-"></span></div>
              <div class="ql-header ql-tool"  title="标题2" :style="{'color':h2color ?'#5287fd':''}" @click="ontitle(2)"><span class="iconfont icon-H-1" ></span></div>
            </div>
            <div>
              <div class="ql-strike ql-tool" title="删除线" :style="{'color':strikecolor ?'#5287fd':''}"  @click="justify(7)"><span class="iconfont icon-fuwenbenbianjiqi_zhonghuaxian"></span></div>
              <div class="ql-align ql-tool"  title="对齐"  :style="{'color':leftcolor ?'#5287fd':''}" @click="justify(1)"><span class="iconfont icon-zuoduiqi"></span></div>
              <div class="ql-align ql-tool"  title="对齐" :style="{'color':centercolor ?'#5287fd':''}" @click="justify(2)"><span class="iconfont icon-juzhong"></span></div>
              <div class="ql-align ql-tool" title="对齐" :style="{'color':rightcolor ?'#5287fd':''}" @click="justify(3)"><span class="iconfont icon-youduiqi"></span></div>
              <div class="ql-list ql-tool" title="有序列表" :style="{'color':insertorderedlistcolor ?'#5287fd':''}" @click="execCommands('insertorderedlist')"><span class="iconfont icon-youxuliebiao"></span></div>
              <div class="ql-list ql-tool" title="无序列表" :style="{'color':insertunorderedlistcolor ?'#5287fd':''}" @click="execCommands('insertunorderedlist')"><span class="iconfont icon-liebiao"></span></div>
            </div>
            <!-- Add a bold button -->

            <!--Add list -->
          </div >
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
              <van-uploader :after-read="afterVideo"  accept="video/*" >上传文件</van-uploader>
            </div>
            <!--        </div>-->
          </div>
          <!--      上传图片-->
          <van-uploader class="Upload-image" :after-read="afterRead" style="display: none" accept="image/*" />
          <div class="Upload-link" style="display: none">
            <div class="Upload-link-head">
              <p @click="closelink">取消</p>
              <p>插入链接</p>
              <p @click="addlink">添加</p>
            </div>
<!--            <input class="href"></input>-->
            <van-field v-model="linkContent" label="文本内容" placeholder="文本内容" />
            <van-field v-model="linkhref" label="链接地址" placeholder="链接地址" />
<!--            <input class="href"></input>-->
          </div>
        </div>
<!--        <div @click="execCommand('bold')"  title="链接">13131313</div>-->
        <vue-ueditor-wrap
            @ready="ready"
            v-model="content"
            :config="ueConfig"
        ></vue-ueditor-wrap>
<!--        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" style="min-height: 100px">-->
<!--          &lt;!&ndash; 自定义toolar &ndash;&gt;-->
<!--          <div id="toolbar" slot="toolbar">-->
<!--            <div class="toolbar-content">-->
<!--              <div class="toolbar-left">-->
<!--                <div class="toolbar-withdraw">-->
<!--                  <img src="@/assets/images/withdraw-show.png" alt=" ">-->
<!--                </div>-->
<!--                <div class="toolbar-nextstep">-->
<!--                  <img src="@/assets/images/nextstep-show.png" alt=" ">-->
<!--                </div>-->
<!--                <div class="toolbar-edit" @click="toolbarShow">-->
<!--                  <img v-show="!edit_show" src="@/assets/images/edit-show.png" alt=" ">-->
<!--                  <img v-show="edit_show" src="@/assets/images/edit.png" alt=" ">-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="toolbar-right">-->
<!--                <button class="ql-link" title="链接"></button>-->
<!--                <button class="ql-image" title="照片"></button>-->
<!--                <button class="ql-video" title="视频"></button>-->
<!--                <button class="ql-blockquote" title="引用"></button>-->
<!--                <button class="ql-clean" title="清除字体样式"></button>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="toolbar-show" v-show="edit_show">-->
<!--              <div>-->
<!--                <button class="ql-bold" title="加粗">Bold</button>-->
<!--                <button class="ql-italic" title="斜体">Italic</button>-->
<!--                <button class="ql-underline" title="下划线">underline</button>-->
<!--                <button class="ql-header" value="1" title="标题1"></button>-->
<!--                <button class="ql-header" value="2" title="标题2"></button>-->
<!--              </div>-->
<!--              <div>-->
<!--                <button class="ql-strike" title="删除线">strike</button>-->
<!--                <button class="ql-align" value="center" title="对齐"></button>-->
<!--                <button class="ql-align" value="right" title="对齐"></button>-->
<!--                <button class="ql-list" value="ordered" title="有序列表"></button>-->
<!--                <button class="ql-list" value="bullet" title="无序列表"></button>-->
<!--              </div>-->
<!--              &lt;!&ndash; Add a bold button &ndash;&gt;-->

<!--              &lt;!&ndash;Add list &ndash;&gt;-->
<!--            </div >-->
<!--          </div>-->
<!--        </quill-editor>-->
      </div>

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
@import "./iconfont/iconfont.css";
</style>
<style scoped lang="scss">
@import "./index.scss";
</style>