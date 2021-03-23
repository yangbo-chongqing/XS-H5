<template>
  <div class="steps">
    <van-nav-bar
      title="视频详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
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
    <div class="contentbody">
      <div class="timeFont">{{ dataList.time }} {{ dataList.date }}</div>
      <div class="contentFont">
        {{ dataList.desire }}
      </div>
      <div class="videoClass">
        <video
          :poster="`${dataList.file_url}` + '?vframe/jpg/offset/0/w/325/h200'"
          height="166"
          width="297"
          style="display: inline-block; border-radius: 12px； max-width：100%"
          controls
          :src="dataList.file_url"
        ></video>
      </div>
      <div style="display: flex; justify-content: space-around">
        <div style="display: inline-block">
          <img
            style="
              display: inline-block;
              width: 22px;
              height: 22px;
              vertical-align: super;
            "
            src="@/assets/images/share.png"
            @click.stop="upTo(dataList)"
            alt=""
          />
        </div>
        <div
          v-if="dataList.is_like"
          style="display: inline-block"
          @click="giveLike(dataList)"
        >
          <img
            style="
              display: inline-block;
              width: 22px;
              height: 22px;
              vertical-align: text-top;
            "
            src="@/assets/images/flower12.png"
            alt=""
          />
          <!-- <van-icon style="vertical-align: unset" name="good-job-o" /> -->
          <span
            style="
              font-size: 22px;
              color: #fcbb2e;
              vertical-align: text-top;
              margin-left: 5px;
            "
            >{{ dataList.flower }}</span
          >
        </div>
        <div v-else style="display: inline-block" @click="giveLike(item)">
          <img
            style="
              display: inline-block;
              width: 22px;
              height: 22px;
              vertical-align: text-top;
            "
            src="@/assets/images/flower11.png"
            alt=""
          />
          <span
            style="
              color: #fcbb2e;
              font-size: 22px;
              color: #999999;
              vertical-align: text-top;
              margin-left: 5px;
              vertical-align: super;
            "
            >{{ dataList.flower }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/request/xsdt.js";

export default {
  data() {
    return {
      dataList: {},
      userInfo: {},
      user: this.$route.query.user_id,
    };
  },
  methods: {
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
      //   console.log(window.location.href);
      let title = "心愿视频分享";
      let url = `${window.location.href}?id=${item.id}`;
      this.$global.shareToWechat(
        title,
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
    this.getDetail();
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.steps {
  margin: 0rem 0.5rem 1rem 0;
  position: relative;
  .headIcon {
    position: relative;
    margin-left: 1rem;
    border-bottom: 1px solid #f5f5f5;
    padding-top: 5px;
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
      left: 80px;
      top: 20px;
      position: absolute;
      font-size: 20px;
      display: inline-block;
      font-weight: 500;
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
    margin-left: 0.5rem;
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
</style>