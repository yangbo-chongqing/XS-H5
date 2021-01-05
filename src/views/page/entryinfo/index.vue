<template>
  <div class="h-container" v-if="relicsDataInfo" :style="returnIcon?{'padding-top':'45px'}:''" >

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
    <div class="v-image-box"  v-else  @click="clickImg($event)">
        <img class="v-image"  mode="widthFix" :data-src="relicsDataInfo.image" :src="relicsDataInfo.image"  />
      <div
        class="v-image-audio"
        @click="playAudio"
        v-if="relicsDataInfo.voice_url"
      >
        <img src="@/assets/images/viuplay1.png"  v-if="playFlag" />
        <img src="@/assets/images/viuplay2.png" v-else />
        <audio :src="relicsDataInfo.voice_url" ref="myaudio"></audio>
      </div>
    </div>
    <div class="app-info-box">
      <div class="app-info-title">
        {{ relicsDataInfo.name }}
        <div class="app-info-title-content" @click="linkFn($event)">
          <van-icon size="25" name="good-job-o" />
          <span class="">{{relicsDataInfo.likes}}</span>
        </div>
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
    <div class="app-info-htmlCont" ref="htmlCont" v-if="relicsDataInfo.content" v-html="relicsDataInfo.content" @click="enlargeImg($event);clickImg($event)"></div>
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
<!--    用户评论   s-->
    <div class="app-info-jump" v-if="commentList.length > 0">
      <div class="app-info-title1">
        <div class="app-info-title-img">
          <div class="app-info-title-left">
            <img src="@/assets/images/info-pl.png" />
            <div class="app-info-titles">评论</div>
          </div>
        </div>
      </div>
      <div class="app-info-jump-list">
        <template>
          <div class="infinite-list-wrapper" >
<!--            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">-->
            <van-list class="pl-cont-body"   v-model="loading"  :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="onLoad">
              <div class="app-pl-list-item" v-for="(sitem, index) in commentList" :key="index + 'index'">
    <!--            用户头像-->
                <div class="app-pl-list-item-media" @click="clickImg($event)">
                  <img mode="aspectFill" :src="sitem.user_info.avatar">
                </div>
                <div class="app-pl-list-item-body">
    <!--              用户名字-->
                  <div class="app-pl-list-item-info">
                    <div class="app-pl-list-item-user">
                      <span class="app-pl-user">{{sitem.user_info.nickname}}</span>
                      <span v-if="sitem.official==1" class="app-pl-tip">官方</span>
                    </div>
                  </div>
    <!--              用户评论内容-->
                  <div class="app-pl-list-item-cont">
                    <div v-if="sitem.comment">{{sitem.comment}}</div>
                    <div v-if="sitem.image">
                      <div class="pl-images-box" @click="clickImg($event)">
                        <img class="pl-images" v-for="(imgList, j) in sitem.image" :for-item="imgList" :key="j"
                             :data-index="j" :data-imgs="imgList" :src="imgList" alt="" >
                      </div>
                    </div>
                    <div v-if="sitem.voice">
                      <div class="app-pl-voice" :data-voice="sitem.voice">
                        <img src="@/assets/images/playly-icon.png" mode="aspectFill">
                        <span>{{sitem.duration}}</span>
                      </div>
                    </div>
                  </div>
    <!--              时间、点赞、回复-->
                  <div class="app-pl-list-item-item">
                    <div class="pl-time">{{sitem.create_time}}</div>
                    <div class="pl-tips">
                      <div class="app-pl-item-link" :style="{color:sitem.is_like==0?'':'#5287fd'}"
                            :data-commentid='sitem.id' :data-index="index">
                        <van-icon name="good-job-o" />
                        {{sitem.likes>0?sitem.likes:''}}
                      </div>
                      <div class="pl-hf"  data-reply_id="sitem.id" :data-index="index"
                            :data-username="sitem.user_info.nickname">
                        <van-icon name="chat-o" />
                      </div>
                    </div>
                  </div>
<!--                  回复内容-->
                  <div class="pl-hf-body" v-if="sitem.list.length>0">
                    <div class="app-pl-hf-item" v-for="(replyItem,index_s) in sitem.list"  :key="index_s" >
<!--                      用户头像-->
                      <div class="app-pl-hf-item-media" @click="clickImg($event)">
                        <img mode="aspectFill" :src="replyItem.user_info.avatar">
                      </div>
<!--                      用户回复内容-->
                      <div class="app-pl-hf-item-body">
<!--                        谁给谁回复 用户名-->
                        <div class="app-pl-hf-item-info">
                          <div class="app-pl-list-item-user">
                            <span class="app-pl-user">{{replyItem.user_info.nickname}}</span>回复
                            <span class="app-pl-user">{{replyItem.reply_user_info.nickname}}</span>
                          </div>
                        </div>
<!--                        回复内容-->
                        <div class="app-pl-list-item-cont">
                          <div class="app-pl-list-item-cont">
                            <div v-if="replyItem.comment">{{replyItem.comment}}</div>
                            <div v-if="replyItem.image">
                              <div class="pl-images-box" @click="clickImg($event)">
                                <img class="pl-images" v-for="(imglist, jj) in replyItem.image" :for-item="imglist" :key="jj"
                                     :data-index="jj" :data-imgs="imglist" :src="imglist" alt="">
                              </div>
                            </div>
                            <div v-if="replyItem.voice">
                              <div class="app-pl-voice"  :data-voice="replyItem.voice">
                                <img src="@/assets/images/playly-icon.png" >
                                <span>{{replyItem.duration}}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="app-pl-list-item-item1">
                          <div class="pl-time">{{replyItem.create_time}}</div>
                          <div class="pl-tips">
                            <div class="app-pl-item-link" :style="{color:replyItem.is_like==0?'':'#ea7152'}"
                                   :data-commentid='replyItem.id' :data-index="index_s"
                                  :data-itemindex="index_s">
                              <van-icon name="good-job-o" />
                              {{replyItem.likes>0?replyItem.likes:''}}
                            </div>
                            <div class="pl-hf" :data-reply_id="replyItem.id" :data-index="index_s" :data-username="replyItem.user_info.nickname">
                              <van-icon name="chat-o" />
                            </div>
                          </div>
                        </div>


                      </div>



                    </div>

                  </div>



                </div>

                <div class="pl-input-body">
                  <div class="pl-send-text">
                    <input :placeholder="placeholder" type="text" class="weui-input">
                  </div>
                  <div class="pl-send-img">
                    <img src="@/assets/images/img-icon.png" alt="">
                  </div>
                  <div class="pl-send-ly">
                    <button>回复</button>
                  </div>
                </div>
              </div>
            </van-list>
<!--            </van-pull-refresh>-->
          </div>

        </template>
      </div>
    </div>
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
<!--    用户评论   j-->
  </div>
</template>

<script>
import Logic from "./index";


export default Logic;
</script>
<style lang="scss">
@import "./index-vant.scss";
@import "./../../../../node_modules/viewerjs/dist/viewer.css";
</style>
<style scoped lang="scss">
@import "./index.scss";
</style>