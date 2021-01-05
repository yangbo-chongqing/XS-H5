<template>
  <div class="h-container" v-if="relicsDataInfo" :style="returnIcon?{'padding-top':'45px'}:''">
    <div class="return-head" v-if="returnIcon">
      <div class="return-head-home" @click="repHome"><van-icon name="wap-home-o" /></div>
      <div class="return-head-text"><div class="retrun-head-logo"><img :src="relicsDataInfo.muse_info.logo" alt=""></div><p>{{relicsDataInfo.muse_info.muse_name}}</p></div>
    </div>
    <div class="app-video-box" v-if="relicsDataInfo.video_url">
      <div class="com-video">
        <div
          class="v-image-audio"
          @click="playAudio"
          v-if="relicsDataInfo.voice_url"
        >
          <img src="@/assets/images/viuplay1.png" v-if="playFlag" />
          <img src="@/assets/images/viuplay2.png" v-else />
          <audio :src="relicsDataInfo.voice_url" ref="myaudio"></audio>
        </div>
        <!-- <div class="video-play-btn" v-if="videoFlag" @click="playVideo">
          <van-icon name="play-circle-o" size="80" />
        </div> -->
        <video
          id="myVideo"
          class="my-video"
          ref="myVideo"
          x5-playsinline
          playsinline
          controls
          webkit-playsinline
          :poster="relicsDataInfo.video_head"
          :src="relicsDataInfo.video_url"
          @click="playVideo"
          @play="playStatic"
          loop
        ></video>
      </div>
    </div>
    <div class="v-image-box" v-else>
      <img class="v-image" mode="widthFix" :src="relicsDataInfo.image" />
      <div
        class="v-image-audio"
        @click="playAudio"
        v-if="relicsDataInfo.voice_url"
      >
        <img src="@/assets/images/viuplay1.png" v-if="playFlag" />
        <img src="@/assets/images/viuplay2.png" v-else />
        <audio :src="relicsDataInfo.voice_url" ref="myaudio"></audio>
      </div>
    </div>
    <div class="app-info-box">
      <div class="app-info-title">
        {{ relicsDataInfo.name }}
        
        <!-- <div
          class="app-info-link"
          v-if="relicsDataInfo.is_like == 0"
          bindtap="linkFn"
        >
          <van-icon size="16" name="good-job-o" />{{
            relicsDataInfo.likes > 0 ? relicsDataInfo.likes : ""
          }}
        </div>
        <div class="app-info-link active" v-else bindtap="linkFn">
          <van-icon size="25" name="good-job-o" />{{ relicsDataInfo.likes }}
        </div> -->
      </div>
      <div
        class="app-info-text"
        v-if="relicsDataInfo.introduction"
        v-html="relicsDataInfo.introduction"
      ></div>
      <div
        class="app-info-tips"
        v-for="(item, index) in relicsDataInfo.property"
        :key="index + 'item'"
      >
        <div class="app-info-tips-item">
          <div class="app-info-tips-item-lab">{{ item.title }}</div>
          <div class="app-info-tips-item-title">{{ item.content }}</div>
        </div>
      </div>
    </div>
    <div
      class="app-info-htmlCont"
      v-if="relicsDataInfo.content"
      ref="htmlCont"
      v-html="relicsDataInfo.content"
    ></div>
    <div class="author-box">
      <p>本文仅代表作者个人观点，不代表寻声地图立场</p>
      <p>本文经授权发布，未经许可，请勿转载</p>
      <div class="author-body">
        <span v-if="relicsDataInfo.author"
          >最近更新：{{ relicsDataInfo.author }} ({{relicsDataInfo.create_time}})</span
        >
        <span @click="jumpRoute('/report',{id:id,muse_id:relicsDataInfo.muse_id})"><van-icon name="warn-o" />举报</span>
      </div>
      

    </div>



    <div class="app-info-jump" v-if="relicsDataInfo.related_list.length > 0">
      <div class="app-info-title1">
        <div class="app-info-title-img">
          <div class="app-info-title-left">
            <img src="@/assets/images/info-jump.png" />
            <div class="app-info-titles">连接相关</div>
            <div class="app-info-texts">探索万物之间的联系</div>
          </div>
        </div>
      </div>
      <div class="app-info-jump-list">
        <div class="find-swiper">
          <van-swipe class="my-swipe" :show-indicators="false" :width="100">
            <van-swipe-item
              v-for="(sitem, sindex) in relicsDataInfo.related_list"
              :key="sindex + 'sitem'"
            >
              <div
                class="swiper-item"
                @click="jumpRoute('/entryinfo', { id: sitem.id })"
              >
                <div class="images">
                  <img class="images-img" :src="sitem.image" />
                </div>
                <div class="swiper-text">{{ sitem.name }}</div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </div>
    <div class="app-info-jump" v-if="relicsDataInfo.history_list.length > 0">
      <div class="app-info-title1">
        <div class="app-info-title-img">
          <div class="app-info-title-left">
            <img src="@/assets/images/info-ta.png" />
            <div class="app-info-titles">我与</div>
            <div class="app-info-texts">发现背后的故事</div>
          </div>
        </div>
      </div>
      <div class="app-info-ta-list">
        <div
          class="app-info-ta-item"
          v-for="(hitem, hindex) in relicsDataInfo.history_list"
          :key="hindex"
          @click="jumpRoute('/entryinfo', { id: hitem.id })"
        >
          <div class="app-info-ta-title">
            <div class="app-info-ta-title-left">
              <div class="app-info-jump-item-text">{{ hitem.name }}</div>
            </div>
            <div class="app-div-head-muic" v-show="hitem.voice_url">
              <div class="app-audio-box" @click.stop="playAudioList(hindex)">
                <van-icon
                  name="play-circle-o"
                  v-if="hitem.playFlag"
                  size="20"
                />
                <van-icon name="pause-circle-o" v-else size="20" />
                语言简介
              </div>
              <audio ref="voicelist" :src="hitem.voice_url"></audio>
            </div>
          </div>
          <div class="app-info-ta-body">
            <div class="app-info-ta-body-info">
              <div class="app-info-ta-body-text">{{ hitem.introduction }}</div>
              <div class="app-info-ta-body-tips">
                <div>{{ hitem.create_time }}</div>
              </div>
            </div>
            <div class="app-info-ta-body-image">
              <img :src="hitem.image" />
            </div>
          </div>
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