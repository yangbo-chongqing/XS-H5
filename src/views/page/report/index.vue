<template>
  <div class="h-container">
    <van-field
      v-model="message"
      rows="2"
      :autosize=" {minHeight: 300 }"
      type="textarea"
      maxlength="200"
      placeholder="亲爱的寻声扫码用户，请在此填写您的反馈~"
      show-word-limit
    />
    <van-field v-model="contact" label="联系方式:" placeholder="请输入邮箱或手机号码" />
    <div class="btn-body"><van-button :disabled="disable" @click="sumbitReport" type="primary" block :loading='loading'  loading-text="提交中...">提交</van-button></div>
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