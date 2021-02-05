<template>
  <div class="questionDetails">
    <div class="questionDetails-header">问题详情 <span>{{ questionDetails.state===0?'待回复':'已回复' }}</span></div>
    <div class="questionDetails-list">
      <div v-for="(item,index) in replyData" :class="item.type===1?'questionDetails-list-left':'questionDetails-list-right'" >
        <span>
          <div v-if="item.type===1"><span class="questionDetails-list-name">{{ item.type===0?'我':item.nickname }}</span><span>{{ item.create_time }}</span></div>
           <div v-if="item.type===0" class="list-right-title"><span>{{ item.create_time }}</span> <span class="questionDetails-list-name">{{ item.type===0?'我':item.nickname }}</span></div>
          <div class="list-content">
            <p v-if="item.content">{{ item.content }}</p>
            <img v-if="item.image.length>0" v-for="i in item.image" :src="i" alt="">
          </div>
        </span>
      </div>
<!--      <div class="questionDetails-list-right">-->
<!--        <span>-->
<!--          <div class="list-right-title"><span>22323</span> <span class="questionDetails-list-name">wo</span></div>-->
<!--          <div class="list-content">我我我我我我我我哦我我我我我我我我哦我我我我我我我我哦我我我我我我我我哦</div>-->
<!--        </span>-->
<!--      </div>-->
    </div>
    <div class="questionDetails-chat">
      <van-field v-model="message" rows="1" autosize type="textarea" show-word-limit >
        <template #button>
          <van-button v-if="smallShuw" size="small" type="primary" @click="onSubmit($event)">发送</van-button>
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