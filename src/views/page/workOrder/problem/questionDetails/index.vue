<template>
  <div class="questionDetails" ref="questionDetails">
    <div class="questionDetails-header">
      <h4>{{ questionDetails.title}}</h4>
      <p class="questionDetails-header-problem" v-if="questionDetails.problem_categories">{{questionDetails.problem_categories}} <span v-if="questionDetails.problem_type">-{{questionDetails.problem_type}}</span></p>
      <p v-if="questionDetails.problem_content">{{questionDetails.problem_content}}</p>
      <div class="questionDetails-header-img">
        <div class="questionDetails-img-list" v-if="questionDetailsimg.length>0">
          <img :src="item" alt="" v-for="(item,index) in questionDetailsimg" :index="index">
        </div>
        <div class="questionDetails-header-state" :style="{'padding-top':questionDetailsimg.length>0?'24px':''}">
          <span v-if="questionDetails.state===0">已提交</span>
          <span v-if="questionDetails.state===1">已受理分析中</span>
          <span v-if="questionDetails.state===2">已确认处理中</span>
          <span v-if="questionDetails.state===3">已结束</span>
        </div>
      </div>

    </div>
    <div class="questionDetails-list">
      <div v-for="(item,index) in replyData" :class="item.type===1?'questionDetails-list-left':'questionDetails-list-right'" >
        <span>
          <div v-if="item.type===1"><span class="questionDetails-list-name">{{ item.type===0?'我':item.nickname }}</span><span>{{ item.create_time }}</span></div>
           <div v-if="item.type===0" class="list-right-title"><span>{{ item.create_time }}</span> <span class="questionDetails-list-name">{{ item.type===0?'我':item.nickname }}</span></div>
          <div class="list-content">
            <p v-if="item.content">{{ item.content }}</p>
            <img v-if="item.image.length>0" v-for="i in item.image" :src="i" alt="" @load="scrollTop">
          </div>
        </span>
      </div>
      <div id="scroll"></div>
<!--      <div class="questionDetails-list-right">-->
<!--        <span>-->
<!--          <div class="list-right-title"><span>22323</span> <span class="questionDetails-list-name">wo</span></div>-->
<!--          <div class="list-content">我我我我我我我我哦我我我我我我我我哦我我我我我我我我哦我我我我我我我我哦</div>-->
<!--        </span>-->
<!--      </div>-->
    </div>
    <div class="questionDetails-chat">
      <van-field v-model="message" rows="1" autosize type="textarea" show-word-limit @focus="focus">
        <template #button>
          <van-button v-if="smallShuw" size="small" type="primary" @click="onSubmit($event)" >发送</van-button>
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