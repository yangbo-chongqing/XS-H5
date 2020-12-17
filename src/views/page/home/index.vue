<template>
  <div class="h-container" v-if="museDataInfo">
    <div class="muse-head">
      <img :src="museDataInfo.info.head" />
    </div>
    <div class="muse-name">
      <div class="muse-name-body">
        <div class="muse-name-body-logo">
          <img :src="museDataInfo.info.logo" alt="" />
        </div>
        <div class="muse-name-body-info">
          <div class="app-view-head-title">
            {{ museDataInfo.info.muse_name }}
          </div>
          <div class="app-view-head-muic" v-if="museDataInfo.info.voice_url">
            <div class="app-audio-box" @click="playAudio">
              <van-icon name="play-circle-o" v-if="playFlag" size="20" />
              <van-icon name="pause-circle-o" v-else size="20" />
              语言简介
              <audio ref="myaudio" :src="museDataInfo.info.voice_url"></audio>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-content-body" v-if="museDataInfo.info.Introduction">
      <p class="m-content overflow-line" id="J_description">{{museDataInfo.info.Introduction}}</p>
      <button type="button" class="btn-more" v-if="isShowMore" id="J_btnmore" @click="showmoreDesc($event)">...详情</button>
    </div>


    <div class="app-video-box">
      <div class="com-video" v-if="museDataInfo.info.video_url">
        <div class="video-play-btn" v-if="videoFlag" @click="videoPause">
          <van-icon name="play-circle-o" size="80" />
        </div>
        <video
          v-if="museDataInfo.info.video_url"
          ref="myVideo"
          class="my-video"
          x5-playsinline
          controls
          playsinline
          webkit-playsinline
          :src="museDataInfo.info.video_url"
          poster="museDataInfo.info.video_head"
          @click="videoPause"
          loop
        ></video>
      </div>
    </div>
    <div class="app-data-box">
      <div v-for="(item, index) in museDataInfo.list" :key="index + 'item'">
        <div class="find-page-title">
          <div class="find-page-title-text">
            {{ item.type_name }}
          </div>
          <div class="find-page-title-sel">
            <!-- <div class="find-page-title-more">
              <div>更多</div>
              <van-icon name="arrow" />
            </div> -->
          </div>
        </div>

        <div class="find-page-tj">
          <van-row>
            <van-col
              span="24"
              v-for="(citem, cindex) in item.list"
              :key="cindex + 'citem'"
              @click="jumpRoute('/entryinfo', { id: citem.id })"
            >
              <div class="fint-tj-list">
                <div class="find-tj-img">
                  <img class="find-tj-imgs" :src="citem.image" />
                </div>
                <div class="find-tj-text">
                  <div class="find-tj-title">{{ citem.show_name }}</div>
                  <div class="find-tj-midas">{{ citem.introduction }}</div>
                </div>
              </div>
            </van-col>
          </van-row>
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