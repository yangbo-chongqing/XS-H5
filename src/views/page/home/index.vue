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
    <div class="m-content-body" v-if="museDataInfo.info">
      <p class="m-content overflow-line" id="J_description">{{museDataInfo.info.introduction}}</p>
      <button type="button" class="btn-more" v-if="isShowMore" id="J_btnmore" @click="showmoreDesc($event)">详情</button>
      <p v-if="museDataInfo.info.address" class="m-content" style="color: #999"><van-icon name="location-o" color ="#999"/>{{ museDataInfo.info.address }}</p>
    </div>
    <div class="app-video-box" v-if="museDataInfo.info.video_url">
      <div class="com-video">
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
          :poster="museDataInfo.info.video_head"
          @click="videoPause"
          loop
        >
          <source :src="museDataInfo.info.video_url" type="video/mp4"></video>
      </div>
    </div>

    <div class="app-part-list" v-if="museDataInfo.info.part_list.length>0">
      <div class="app-part-list-content" >
        <div class="app-list-content" v-for="( item,index) in museDataInfo.info.part_list" :key="index" @click="jumpRoute('/entrylist',{id:item.id,muse_id:item.muse_id})">
          <div class="app-list-content-img" >
              <div>
                <img :src="item.image" alt="">
              </div>
            </div>
          <div class="app-list-content-title">
              {{ item.part_name }}
            </div>
        </div>
      </div>
    </div>


    <div class="app-data-box">
      <div v-for="(item, index) in museDataInfo.list" :key="index + 'item'">
        <div class="find-page-title">
          <div class="find-page-title-text">
            {{ item.type_name }}
          </div>
          <div class="find-page-title-sel">
            <div class="find-page-title-more" @click="jumpRoute('/entrylist',{id:item.id,muse_id:museDataInfo.info.id})">
              <div>更多{{museDataInfo.info.muse_id}}</div>
              <van-icon name="arrow" />
            </div>
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