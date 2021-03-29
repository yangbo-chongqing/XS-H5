<template>
  <div class="wishAll" :style="{ background: `${backgroundColor}` }">
    <div class="wishTit">
      <div class="wishTit-img">
        <img :src="backgroundUrl" alt="" />
      </div>
      <!-- <div class="setting">
        <van-icon color="#fff" style="z-index: 9999" name="setting-o" />
      </div> -->
      <div class="headIcon">
        <div class="circleIcon">
          <img :src="userInfo.avatar" alt="" />
        </div>
        <div class="nameFont">
          <p>{{ userInfo.nickname }}</p>
          <p>{{ userInfo.school_name }}</p>
        </div>
      </div>
      <div class="Titright">
        <div class="circleIcon">
          <img src="@/assets/images/hua.png" alt="" />
        </div>
        <div class="numFont">总数&nbsp;{{ userInfo.activity_flower }}</div>
      </div>
    </div>
    <div class="bodyCl">
      <!-- <div class="bodyTab">
        <span
          v-for="(item, index) of tags"
          :key="index"
          :class="{ activeClass: activeNum == index }"
          @click="select(index)"
        >
          {{ item }}</span
        >
      </div> -->
      <div
        class="content"
        :style="dataList == '' ? 'border:none' : ''"
        ref="container"
      >
        <!-- 悬浮上传按钮 -->
        <!-- <div
          class="rightUpload"
          @click="
            $router.push({
              path: '/addvideo',
              query: { type: 1 },
            })
          "
        >
          <img src="@/assets/images/upVideo.png" alt="" />
          <div style="line-height: 5px">继续上传</div>
        </div> -->
        <template v-if="dataList">
          <div
            @click.stop="
              $router.push({
                path: '/wishVideo/wishDetail',
                query: { id: item.id, user_id: user },
              })
            "
            class="steps"
            v-for="(item, index) of dataList"
            :key="index"
          >
            <!-- <span
              class="dotClass"
              v-if="
                item.time != dataList[index > 0 ? index - 1 : 0].time ||
                index == 0
              "
            ></span> -->
            <div class="contentbody">
              <!-- <div class="timeFont">{{ item.time }} {{ item.date }}</div>
              <div class="contentFont">
                {{ item.desire }}
              </div> -->
              <div class="videoClass">
                <div
                  class="video-img-body"
                  @click.stop="videoPlay(item.file_url)"
                >
                  <div class="imgDiv">
                    <img
                      :src="`${item.file_url}` + '?vframe/jpg/offset/0'"
                      alt=""
                      srcset=""
                    />
                  </div>

                  <div class="video-play-body">
                    <van-icon color="#fff" name="play-circle-o" />
                  </div>
                  <div class="video-time">
                    {{ $global.formateSeconds(item.duration, 1) }}
                  </div>
                </div>
              </div>
              <div class="video-tips">
                <div class="video-tips-item" @click.stop="upTo(item)">
                  <img src="@/assets/images/share.png" alt="" />
                </div>
                <div
                  v-if="item.is_like"
                  class="video-tips-item"
                  @click.stop="giveLike(item)"
                >
                  <img src="@/assets/images/flower12.png" alt="" />
                  <!-- <van-icon style="vertical-align: unset" name="good-job-o" /> -->
                  <span>{{ item.flower }}</span>
                </div>
                <div
                  class="video-tips-item"
                  v-else
                  @click.stop="giveLike(item)"
                >
                  <img src="@/assets/images/flower11.png" alt="" />
                  <span style="color: #d2d2d2">{{ item.flower }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <van-empty
          v-else
          class="custom-image"
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无视频"
        />
      </div>
    </div>

    <!-- 分享提示 -->
    <van-overlay :show="shareShow" @click="shareShow = false">
      <div class="wrapper">
        <div class="block">
          <img src="@/assets/images/share-tip.png" alt="" srcset="" />
        </div>
      </div>
    </van-overlay>
    <div class="bottomJpg">
      <img src="@/assets/images/bottom.png" alt="" />
    </div>
  </div>
</template>
<script>
import api from "@/request/xsdt.js";
import { uploadToQiniu, getQiniuTk } from "@/utils/utils.js";
import { Icon, Overlay, Empty } from "vant";
export default {
  name: "wishVideo",
  components: {
    VanIcon: Icon,
    VanOverlay: Overlay,
    VanEmpty: Empty,
  },
  data() {
    return {
      activeNum: 0,
      datavideo: "",
      backgroundUrl: "11",
      backgroundColor: "",
      tags: [],
      tag: "",
      container: "",
      pageNo: 1,
      showPicker: false,
      show: true,
      shareShow: false,
      form: {},
      dataList: [],
      userInfo: {},
      isLikeFlag: true,
      // user: localStorage.getItem("storage").user_id,
      user: this.$route.query.user_id,
    };
  },
  methods: {
    //视频播放
    videoPlay(videoUrl) {
      let video = document.createElement("video");
      video.src = videoUrl;
      video.play();
    },
    getList() {
      let params = {
        user_id: this.user,
        page: 1,
        // tag: this.tag,
        page_size: 50,
      };
      api.growList(this.qs.stringify(params)).then((res) => {
        this.backgroundUrl = res.data.user.activity_background.url;
        this.backgroundColor = res.data.user.activity_background.color;
        this.dataList = res.data.list.data;
        if (this.dataList.length == 0) {
          this.dataList = "";
        }
        this.userInfo = res.data.user;
        document.title = `${this.userInfo.nickname}小朋友的心愿视频`;
        let url = `${window.location.origin}/wishVideo?user_id=${this.user}`;
        this.$global.shareToWechat(
          `${this.userInfo.nickname}小朋友的心愿视频`,
          url,
          this.userInfo.avatar,
          "欢迎大家送花！"
        );
      });
    },
    select(index) {
      this.activeNum = index;
      this.tag = this.tags[index];
      this.getList();
    },
    onConfirm(value) {
      this.form.tag = value;
      this.showPicker = false;
    },
    getBackground() {
      api.settingGrow().then((res) => {
        this.tags = res.data.tag;
        this.tag = JSON.parse(JSON.stringify(res.data.tag[0]));
        this.getList();
      });
    },
    goUpload() {},
    upTo(item) {
      this.shareShow = true;
    },
    giveLike(item) {
      if (this.isLikeFlag) {
        this.isLikeFlag = false;
        api
          .likeGrowing(this.qs.stringify({ id: item.id }))
          .then((res) => {
            this.isLikeFlag = true;
            // this.getList();
            if (res.status == 200) {
              item.flower += 1;
              this.userInfo.activity_flower += 1;
              item.is_like = true;
            }
            if (res.status == 401) {
              localStorage.removeItem("storage");
              this.$router.push({
                path: "/toke",
              });
            }
          })
          .catch(() => {
            this.isLikeFlag = true;
          });
      }
    },
  },
  created() {
    if (window.localStorage.getItem("storage") == null) {
      this.$router.push({
        path: "/toke",
      });
    }
    this.getBackground();
  },
  mounted() {
    this.container = this.$refs.container;

    // let value = {
    //   token: "d99b797e4baa5489574f2114ce178b97",
    //   user_id: 399,
    // };
    // window.localStorage.setItem("storage", JSON.stringify(value));
    // this.user = JSON.parse(localStorage.getItem("storage")).user_id;
  },
};
</script>
<style lang="scss" scoped>
.wishAll {
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
    img {
      position: absolute;
      right: 20px;
      width: 50%;
    }
  }
  .wishTit {
    width: 100%;
    height: 287.5px;
    background: #3f3f3f;
    position: relative;
    .wishTit-img {
      width: 100%;
      height: 287.5px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 287.5px;
        bottom: 0;
        left: 0;
        background: linear-gradient(rgba(0, 0, 0, 0) 80%, rgba(1, 23, 44, 0.8));
      }
      img {
        width: 100%;
      }
    }
    .setting {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .headIcon {
      position: absolute;
      bottom: 5px;
      left: 20px;
      color: #fff;
      display: flex;
      .circleIcon {
        width: 50px;
        height: 50px;
        flex-shrink: 0;
        border: 2px solid #fff;
        box-sizing: border-box;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .nameFont {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        font-size: 14px;
        font-weight: 600;
        margin-left: 10px;
        p {
          width: 100%;
          &:nth-of-type(1) {
            font-size: 16px;
          }
        }
      }
    }
    .Titright {
      position: absolute;
      right: 20px;
      bottom: 15px;
      color: #fff;
      display: flex;
      .circleIcon {
        flex-shrink: 0;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 23px;
          height: 23px;
        }
      }
      .numFont {
        width: 100%;
        font-size: 12.5px;
        display: flex;
        align-items: center;
        margin-left: 10px;
      }
    }
  }
  .bodyCl {
    // padding: 1rem 0 0 0;
    .bodyTab {
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      padding: 0px 10px;
      color: #04529c;
      span {
        border-radius: 15px;
        width: 75px;
        padding: 5px 8px;
        box-sizing: border-box;
        background: #b7e3fc;
        text-align: center;
      }
      .activeClass {
        background: #fdff06;
      }
    }
    .content {
      // border-left: 1px solid #fff;
      // margin-left: 0.5rem;
      box-sizing: border-box;
      margin-top: 20px;
      padding-bottom: 1px;
      .rightUpload {
        text-align: center;
        font-size: 12px;
        color: #fff;
        position: fixed;
        bottom: 60px;
        right: 10px;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        background: #277bff;
        z-index: 999;
        img {
          width: 30px;
          vertical-align: bottom;
          margin-top: 5px;
        }
      }
      .steps {
        margin: 0px 0.5rem 15px 0;
        position: relative;
        .dotClass {
          left: -6px;
          //   outline: #fff solid 2px;
          position: absolute;
          width: 12px;
          border: 2px solid #fff;
          box-sizing: border-box;
          height: 12px;
          border-radius: 50%;
          background: #0057de;
        }
        .contentbody {
          margin-left: 0.5rem;
          //   margin-right: 1rem;
          //   width: 100%;
          //   box-sizing: border-box;
          //   height: 260px;
          // background: #fff;
          background-image: url(http://voice.xunsheng.org.cn/sydt/muse_12/1616657760011.png);
          background-size: cover;
          margin-bottom: 15px;
          border-radius: 12px;
          padding: 10px;
          .timeFont {
            font-size: 12px;
            color: #c0c0c0;
          }
          .contentFont {
            font-size: 15.5px;
            color: #333;
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
              width: 97%;
              padding: 0px 5px;
              height: 166px;
              position: relative;
              .imgDiv {
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 1);
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  // border-radius: 10px;
                }
              }

              .video-play-body {
                position: absolute;
                font-size: 45px !important;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
            .video-time {
              background: rgba(0, 0, 0, 0.5);
              position: absolute;
              right: 10px;
              bottom: 10px;
              color: #fff;
              font-size: 12px;
              border-radius: 999px;
              padding: 1px 5px;
            }
          }
          .video-tips {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 15px;
            box-sizing: border-box;
            margin-top: 10px;
            .video-tips-item {
              display: flex;
              align-content: center;
              img {
                width: 21px;
                height: 21px;
              }
              span {
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
    }
  }
  .bottomJpg {
    width: 100%;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
<style lang="scss">
.wishAll {
  .custom-image {
    .van-empty__image {
      width: 90px;
      height: 90px;
    }
  }
}
</style>