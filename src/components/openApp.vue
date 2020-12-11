<template>
  <div class="openApp" v-if="isopen">
    <img src="@/assets/images/app_img_school.jpg" alt />
    <p>随时随地·自信表达</p>
    <div class="openbtn" v-if="isWeixin">
      <wx-open-launch-app
        id="launch-btn1"
        appid="wxdfe31637be89ea24"
        :extinfo="paramsStr"
      >
        打开APP
        <script type="text/wxtag-template">
          <style>
            .btnopen {
              width: 80px;
              height: 30px;
              color: white;
              font-size:12px;
              text-align: center;
              line-height: 30px;
            }
          </style>
          <div class="btnopen">打开APP</div>
        </script>
      </wx-open-launch-app>
    </div>
    <div class="openbtn" v-else @click="downLoad">打开APP</div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { getURLlist } from "@/utils/utils.js";
export default {
  name: "openApp",
  components: {},
  data() {
    return {
      isopen: false,
      isWeixin: this.$global.isWeixin(),
      isApp: this.$global.isAndroidAPP() || this.$global.isIosAPP(),
      isIos: this.$global.isIos(),
      isAndroid: this.$global.isAndroid(),
      path: "",
      paramsStr: "",
      csStr: "",
      backPath: false,
    };
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.$nextTick(function () {
          //页面加载完成后执行
          this.setInfo();
        });
      },
      // 深度观察监听
      deep: true,
    },
  },

  created() {
    this.setInfo();
    if (this.isWeixin) {
      this.openInit();
    }
  },
  destroyed() {
    document.removeEventListener("visibilitychange", this.handleVisiable);
  },
  mounted() {
    document.addEventListener("visibilitychange", this.handleVisiable);
  },
  methods: {
    handleVisiable(e) {
      // 监听页面离开事件
      this.backPath = true;
    },
    setInfo() {
      //页面加载完成后执行
      this.path = this.$route;
      console.log(this.path.name);
      this.csStr = "";
      if (this.path.name == "shareTask") {
        this.csStr = `?m=webbrowser&d={"url":"${encodeURIComponent(
          window.location.origin +
            "/h5/classtools/#/studentquerypunch?id=" +
            this.path.query.id
        )}"}`;
      } else {
        this.csStr = `?m=webbrowser&d={"url":"${encodeURIComponent(
          location.href
        )}"}`;
      }
      if (this.isIos) {
        this.paramsStr = "https://h5.xunsheng.org.cn/app/link" + this.csStr;
      }
      if (this.isAndroid) {
        this.paramsStr = "xunsheng://xunsheng.com" + this.csStr;
      }
      this.isopen = true;
      document.body.style.paddingTop = 55 / 37.5 + "rem";
    },
    openInit() {
      let params = {
        url: location.href.split("#")[0],
      };
      axios
        .post("/api/activity/default/jssdk", qs.stringify(params))
        .then((data) => {
          if (data.data.code == 200) {
            wx.config({
              debug: false,
              appId: data.data.data.appId,
              timestamp: data.data.data.timestamp,
              nonceStr: data.data.data.nonceStr,
              signature: data.data.data.signature,
              jsApiList: [
                "openLocation",
                "getLocation",
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "onMenuShareQQ",
                "onMenuShareWeibo",
                "onMenuShareQZone",
                "hideMenuItems",
              ],
              openTagList: ["wx-open-launch-app"],
            });
            wx.ready(function () {
              var btn = document.getElementById("launch-btn1");
              btn.addEventListener("launch", function (e) {});
              btn.addEventListener("error", function (e) {
                window.location.href =
                  "http://app2.xunsheng.org.cn/apph5/#/Invitation"; // 下载地址
              });
            });
          }
        });
      this.isopen = true;
      document.body.style.paddingTop = 55 / 37.5 + "rem";
    },
    downLoad() {
      if (this.isIos) {
        location.href = this.paramsStr; //ios app协议
        window.setTimeout(function () {
          if (!this.backPath) {
            window.location.href =
              "https://app2.xunsheng.org.cn/apph5/#/Invitation"; // 下载地址
          }
        }, 2000);
      } else if (this.isAndroid) {
        window.location.href = this.paramsStr; //android app协议
        window.setTimeout(function () {
          if (!this.backPath) {
            window.location.href =
              "https://app2.xunsheng.org.cn/apph5/#/Invitation"; // 下载地址
          }
        }, 2000);
      } else {
        window.setTimeout(function () {
          window.location.href =
            "https://app2.xunsheng.org.cn/apph5/#/Invitation"; // 下载地址
        }, 2000);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.openApp {
  width: 100vw;
  height: 55px;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9888;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }
  p {
    font-size: 16px;
    font-weight: 600;
    margin-left: 10px;
    color: white;
  }

  .openbtn {
    margin-left: auto;
    border-radius: 20px;
    width: 80px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3270c;
    color: white;
    font-size: 12px;
    #launch-btn1 {
      width: 80px;
      height: 30px;
      color: white;
      text-align: center;
      font-size: 12px;
      line-height: 30px;
    }
  }
}
</style>