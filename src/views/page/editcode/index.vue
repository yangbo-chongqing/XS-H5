<template>
  <div class="h-container">

    <canvas width="80%" height="380" ></canvas>
    <div class="code-box" ref="imageDom">
      <img class="code1" src="@/assets/images/code1.png" />
      <img class="code2" src="@/assets/images/code2.png" />
      <div class="code-image">
        <img :src="commentList" alt="">
      </div>
      <div class="canvas-input" >
          <div class="editBox" contenteditable="true"  @input="inputChange" placeholder="请输入文字"></div>
      </div>
    </div>
    <div class="code-btn" @click="toImage">
      <div class="canvasImgFun">
        <div style="display: flex;justify-content: center">
          <div class="code-icon">
            <van-icon name="down" />
          </div>
        </div>
        <div class="code-text">保存二维码</div>
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