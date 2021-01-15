<template>
  <div class="h-container">
    <div class="bt-header">
      <div class="content">
        <div class="portrait">
          <img :src="userdata.avatar" alt="">
        </div>
        <div class="content-information">
          <div class="name">{{userdata.nickname}}</div>
          <div class="account-number">
            <p>{{ userdata.mobile }}</p>
            <p><span>ID:</span>{{ userdata.user_id }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bt-content">
      <div class="bt-navigation">
        <p @click="show($event,1)" :class="{'bt-syle':showaxis}">时间轴 <span></span></p>
        <p @click="show($event,2)" :class="{'bt-syle':showvisit}">最近访问词条 <span></span></p>
      </div>
      <div class="bt-time-axis" v-show="showaxis">
        <div v-if="timeData.length>0">
          <div v-for="(item ,index) in timeData">
            <div v-if="item.list.length>0">
              <h5>{{ item.day }}</h5>
              <div class="bt-time-axis-list" v-for="(sitem,i) in item.list">
                <div class="bt-time">{{ sitem.time }}</div>
                <div class="bt-word">{{ sitem.remarks }} <span class="bt-circular"></span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bt-tips" v-if="timeData.length<=0">
          暂无用户轨迹
        </div>


        <div class="bt-timeline" v-if="timeData.length>0"> </div>
      </div>
      <div class="bt-recent-visit" v-show="showvisit">
        <div class="title">
          <p>词条</p>
          <p>最近访问次数</p>
          <p>时长</p>
        </div>
        <ul class="bt-recent-visit-list" v-for="(item ,index) in recentVisit">
          <li :style="{backgroundColor:index%2===0?'':'#f8f8f8'}">
            <p>{{ item.name }}</p>
            <p>{{ item.count }}</p>
            <p>{{ item.duration }}</p>
          </li>
        </ul>
        <div class="bt-tips" v-if="recentVisit.length<=0">
          暂无用户轨迹
        </div>

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