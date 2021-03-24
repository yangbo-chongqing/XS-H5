<template>
  <div class="steps" v-if="dataList">
    <!-- <van-nav-bar
      title="视频详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    /> -->
    <div class="headIcon">
      <div class="circleIcon">
        <img
          :src="userInfo.avatar"
          alt=""
        />
      </div>
      <div class="nameFont">{{ userInfo.nickname }}</div>
    </div>
    <div class="contentbody">
      <div class="timeFont">{{ dataList.time }} {{ dataList.date }}</div>
      <div class="contentFont">
        {{ dataList.desire }}
      </div>
      <div class="videoClass">
        <div class="video-img-body" @click.stop="videoPlay(dataList.file_url)">
          <img
            :src="`${dataList.file_url}` + '?vframe/jpg/offset/0/w/325/h200'"
            alt=""
            srcset=""
          />
          <div class="video-play-body">
            <van-icon size="45" color="#fff" name="play-circle-o" />
          </div>
          <div class="video-time">{{$global.formateSeconds(dataList.duration,1)}}</div>
        </div>
      </div>
      <div class="video-tips">
              <div class="video-tips-item" @click.stop="upTo(dataList)">
                <img src="@/assets/images/share.png" alt="" />
              </div>
              <div
                v-if="dataList.is_like"
                class="video-tips-item"
                @click.stop="giveLike(dataList)"
              >
                <img src="@/assets/images/flower12.png" alt="" />
                <!-- <van-icon style="vertical-align: unset" name="good-job-o" /> -->
                <span>{{ dataList.flower }}</span>
              </div>
              <div
                class="video-tips-item"
                v-else
                
                @click.stop="giveLike(dataList)"
              >
                <img src="@/assets/images/flower11.png" alt="" />
                <span style="color:#d2d2d2">{{ dataList.flower }}</span>
              </div>
            </div>
      
    </div>
    <!-- 分享提示 -->
    <van-overlay :show="shareShow" @click="shareShow = false">
    <div class="wrapper">
      <div class="block">
        <img src="@/assets/images/share-tip.png" alt="" srcset="">
      </div>
    </div>
  </van-overlay>
  </div>
</template>
<script>
import api from "@/request/xsdt.js";
import { Icon,Overlay } from "vant";
export default {
  components: {
    VanIcon: Icon,
    VanOverlay:Overlay
  },
  data() {
    return {
      dataList: null,
      userInfo: {},
      user: this.$route.query.user_id,
      shareShow:false,
    };
  },
  methods: {
    //视频播放
    videoPlay(videoUrl) {
      let video = document.createElement("video");
      video.src = videoUrl;
      video.play();
    },
    getDetail() {
      api
        .getDetail(this.qs.stringify({ id: this.$route.query.id }))
        .then((res) => {
          this.dataList = res.data.info;
        });
    },
    getList() {
      let params = {
        user_id: this.user,
        // user_id: 399,
        page: 1,
        tag: this.tag,
        page_size: 50,
      };
      api.growList(this.qs.stringify(params)).then((res) => {
        console.log(this.userInfo);
        this.userInfo = res.data.user;
      });
    },
    onClickLeft() {
      this.$router.push({
        path: "/wishVideo",
        query: { type: 1, user_id: this.user },
      });
    },
    upTo(item) {
      let title = "心愿视频分享";
      let url = `${window.location.origin}/wishVideo/wishDetail?id=${item.id}&user_id=${this.user}`;
      console.log(url);
      this.$global.shareToWechat(
        title,
        url,
        item.file_url + "?vframe/jpg/offset/0/w/325/h200",
        item.desire
      );
      this.shareShow = true;
    },
    giveLike(item) {
      api.likeGrowing(this.qs.stringify({ id: item.id })).then((res) => {
        if(res.status == 200){
          item.flower+=1;
          item.is_like = true;
        }
        if (res.status == 401) {
          localStorage.removeItem("storage");
          this.$router.push({
            path: "/toke",
          });
        }
      });
    },
  },
  created() {
    this.getDetail();
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.steps {
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .block {
    width: 100%;
    height: 100%;
    position: relative;
    img{
      position: absolute;
      right: 20px;
      width: 50%;
    }
  }
  position: relative;
  .headIcon {
    width: 335px;
    margin: auto;
    position: relative;
    border-bottom: 1px solid #f5f5f5;
    padding: 5px 0px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .circleIcon {
      width: 50px;
      text-align: center;
      height: 50px;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2.5px solid #fff;
        box-sizing: border-box;
      }
    }
    .nameFont {
      text-align: center;
      font-size: 16.67px;
      font-weight: 600;
      margin-left: 10px;
    }
  }
  .dotClass {
    left: -6px;
    position: absolute;
    width: 12px;
    border: 2px solid #fff;
    box-sizing: border-box;
    height: 12px;
    border-radius: 50%;
    background: #0057de;
  }
  .contentbody {
    height: 260px;
    background: #fff;
    margin-bottom: 1rem;
    border-radius: 12px;
    padding:10px 20px;
    .timeFont {
      font-size: 12px;
      color: #c0c0c0;
    }
    .contentFont {
      font-size: 15.5px;
      color: #000;
      padding-top: 5px;
      overflow: hidden;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      box-orient: vertical;
      display: -webkit-box;
      display: box;
    }
    .videoClass {
            text-align: center;
            border-radius: 5px;
            width: 100%;
            height: auto;
            padding-top: 10px;
            box-sizing: border-box;
            position: relative;
            .video-img-body {
              width: 100%;
              height: 166px;
              position: relative;
              img {
                width: 100%;
                height: 100%;
                border-radius: 10px;
              }
              .video-play-body {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
            .video-time{
              background: rgba(0,0,0,0.5);
              position: absolute;
              right: 10px;
              bottom: 10px;
              color: #fff;
              font-size: 12px;
              border-radius: 999px;
              padding:1px 5px;
            }
          }
          .video-tips {
            width: 100%;
            display: flex;
            justify-content:space-between;
            padding: 0 15px;
            box-sizing: border-box;
            margin-top: 10px;
            .video-tips-item{
              display: flex;
              align-content: center;
              img{
                width: 21px;
                height: 21px;
              }
              span{
                color: #fdcc5d;
                margin-left: 3px;
                font-size: 16.67px;
                display: flex;
                align-content: center;
                justify-content: center;
              }
            }
          }
  }
}
</style>