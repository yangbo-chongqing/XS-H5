<template>
  <div class="wishAll">
    <div class="wishTit">
      <img width="100%" :src="backgroundUrl" alt="" />
      <!-- <div class="setting">
        <van-icon color="#fff" style="z-index: 9999" name="setting-o" />
      </div> -->
      <div class="headIcon">
        <div class="circleIcon">
          <img
            style="width: 90%; border-radius: 50%; vertical-align: middle"
            :src="userInfo.avatar"
            alt=""
          />
        </div>
        <div class="nameFont">{{ userInfo.nickname }}</div>
      </div>
      <div class="Titright">
        <div class="circleIcon">
          <img
            style="width: 80%; vertical-align: sub"
            src="@/assets/images/flower2.png"
            alt=""
          />
        </div>
        <div class="numFont">鲜花总量&nbsp;{{ userInfo.activity_flower }}</div>
      </div>
    </div>
    <div class="bodyCl" :style="{ background: `${backgroundColor}` }">
      <div class="bodyTab">
        <span
          v-for="(item, index) of tags"
          :key="index"
          :class="{ activeClass: activeNum == index }"
          @click="select(index)"
        >
          {{ item }}</span
        >
      </div>
      <div class="content" ref="container">
        <!-- 悬浮上传按钮 -->
        <div
          class="rightUpload"
          @click="$router.push({ path: '/addvideo', query: { type: 1 } })"
        >
          <van-icon
            name="video-o"
            style="padding-top: 3px"
            color="#fff"
            size="30"
          />
          <div>继续上传</div>
        </div>
        <div
          @click.stop="
            $router.push({
              path: '/wishVideo/wishDetail',
              query: { id: item.id },
            })
          "
          class="steps"
          v-for="(item, index) of dataList"
          :key="index"
        >
          <span class="dotClass"></span>
          <div class="contentbody">
            <div class="timeFont">{{ item.time }} {{ item.date }}</div>
            <div class="contentFont">
              {{ item.desire }}
            </div>
            <div class="videoClass">
              <video
                :poster="`${item.file_url}` + '?vframe/jpg/offset/0/w/325/h200'"
                height="166"
                width="297"
                style="display: inline-block; border-radius: 12px"
                controls
                :src="item.file_url"
              ></video>
            </div>
            <div style="display: flex; justify-content: space-around">
              <van-icon
                style="display: inline-block"
                @click.stop="upTo(item)"
                name="replay"
              />
              <div
                v-if="!item.is_like"
                style="display: inline-block"
                @click="giveLike(item)"
              >
                <van-icon style="vertical-align: unset" name="good-job-o" />
                <span style="font-size: 20px; vertical-align: text-top">{{
                  item.flower
                }}</span>
              </div>
              <div
                v-if="item.is_like"
                style="display: inline-block"
                @click="giveLike(item)"
              >
                <van-icon
                  style="vertical-align: unset"
                  color="#3484FE"
                  name="good-job-o"
                />
                <span
                  style="color: #3484fe; font-size: 20px;vertical-align: text-top;
}"
                  >{{ item.flower }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/request/xsdt.js";
import { uploadToQiniu, getQiniuTk } from "@/utils/utils.js";
export default {
  name: "wishVideo",
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
      form: {},
      dataList: [],
      userInfo: {},
    };
  },
  methods: {
    getList() {
      let params = {
        user_id: 399,
        page: 1,
        tag: this.tag,
        page_size: 50,
      };
      api.growList(this.qs.stringify(params)).then((res) => {
        this.backgroundUrl = res.data.user.activity_background.url;
        this.backgroundColor = res.data.user.activity_background.color;
        this.dataList = res.data.list.data;
        this.userInfo = res.data.user;
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
      //   console.log(window.location.href);
      let url = `${window.location.href}/wishDetail?id=${item.id}`;

      this.$global.shareToWechat(
        "心愿视频分享",
        url,
        item.file_url + "?vframe/jpg/offset/0/w/325/h200",
        item.desire
      );
    },
    giveLike(item) {
      api.likeGrowing(this.qs.stringify({ id: item.id })).then((res) => {
        this.getList();
      });
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
  },
};
</script>
<style lang="scss" scoped>
.wishAll {
  .wishTit {
    width: 100%;
    height: 287.5px;
    background: #3f3f3f;
    position: relative;
    .setting {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .headIcon {
      position: absolute;
      bottom: 10px;
      left: 30px;
      color: #fff;
      .circleIcon {
        border-radius: 50%;
        width: 60px;
        text-align: center;
        // line-height: 60px;
        display: table-cell;
        vertical-align: middle;
        height: 60px;
        background: #fff;
      }
      .nameFont {
        text-align: center;
        font-size: 18px;
        font-weight: 500;
      }
    }
    .Titright {
      position: absolute;
      right: 20px;
      bottom: 24px;
      color: #fff;
      .circleIcon {
        border-radius: 50%;
        width: 32px;
        height: 32px;
        background: #fff;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
      }
      .numFont {
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }
  .bodyCl {
    padding: 1rem 0 0 0;
    // background: #02519c;
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
      border-left: 1px solid #fff;
      margin-left: 0.5rem;
      box-sizing: border-box;
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
      }
      .steps {
        margin: 1rem 0.5rem 1rem 0;
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
          height: 260px;
          background: #fff;
          margin-bottom: 1rem;
          border-radius: 12px;
          padding: 10px;
          .timeFont {
            font-size: 12px;
            color: #c0c0c0;
          }
          .contentFont {
            font-size: 14px;
            color: #000;
            min-height: 34px;
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
          }
        }
      }
    }
  }
}
</style>