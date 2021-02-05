<template>
  <div class="questionDetails">
    <div class="questionDetails-header">问题详情 <span>状态</span></div>
    <div class="questionDetails-list">
      <div class="questionDetails-list-left">
        <span>
          <div><span class="questionDetails-list-name">销售</span><span>2021/2/2</span></div>
          <div class="list-content">我我我我我我我我哦</div>
        </span>
      </div>
      <div class="questionDetails-list-right">
        <span>
          <div class="list-right-title"><span>2021/2/2</span> <span class="questionDetails-list-name">我</span></div>
          <div class="list-content">我我我我我我我我哦我我我我我我我我哦我我我我我我我我哦我我我我我我我我哦</div>
        </span>
      </div>
    </div>
    <div class="questionDetails-chat">
      <van-field v-model="message" rows="1" autosize type="textarea" show-word-limit >
        <template #button>
          <van-button v-if="smallShuw" size="small" type="primary" @click="onSubmit">发送</van-button>
          <van-icon  v-if="!smallShuw" name="add-o" @click="chat_show = !chat_show;" />
        </template>
      </van-field>
      <div class="questionDetails-chat-show" v-show="chat_show">
        <van-uploader :after-read="afterRead" accept="image/*"/>
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