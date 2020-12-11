<template>
  <div>
    <div class="openApp2" v-if="type == 'class'">
      <div class="openbtn" v-if="isWeixin">
        {{ text }}
        <wx-open-launch-app
          class="launch-btn"
          appid="wxdfe31637be89ea24"
          :extinfo="paramsStr"
        >
          <script type="text/wxtag-template">
            <style>
                .btnopen1 {
                  width:300px;
                  height: 40px;
                }
            </style>
            <div class="btnopen1"></div>
          </script>
        </wx-open-launch-app>
      </div>
      <div class="openbtn" v-else @click="downLoad">{{ text }}</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { getURLlist } from "@/utils/utils.js";
export default {
  name: "openApp",
  props: ["text", "type", "text1"],
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
    // console.log(this.$isQq());
    // let setstr = 'Mozilla/5.0 (Linux; Android 10; LYA-AL00 Build/HUAWEILYA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.116 Mobile Safari/537.36;device_model/Android;os_ver/9.0;app_ver/7.2.6.96;app_ver_code/199';
    // console.log(setstr.split(';').indexOf('os_ver/9.0'));
    // console.log("android--APP"+'---------'+this.$isAndroidAPP());
    document.addEventListener("visibilitychange", this.handleVisiable);
  },
  methods: {
    handleVisiable(e) {
      // 监听页面离开事件
      this.backPath = true;
      console.log(this.backPath + "离开了页面");
    },
    setInfo() {
      //页面加载完成后执行
      this.path = this.$route;
      this.csStr = "";
      if (this.path.name == "shareTask") {
        this.csStr = `
https://h5.xunsheng.org.cn/app/link?m=webbrowser&d={"url":"${encodeURIComponent(
          window.location.origin +
            "/h5/classtools/#/studentquerypunch?id=" +
            this.path.query.id
        )}"}`;
      } else {
        this.csStr = `
https://h5.xunsheng.org.cn/app/link?m=webbrowser&d={"url":"${encodeURIComponent(
          location.href
        )}"}`;
      }

      if (this.isIos) {
        this.paramsStr = "https://h5.xunsheng.org.cn/app/link" + this.csStr;
      }
      if (this.isAndroid) {
        this.paramsStr = "xunsheng://xunsheng.com" + this.csStr;
      }
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
              var btn = document.querySelector(".launch-btn");
              btn.addEventListener("launch", function (e) {
                console.log("success");
              });
              btn.addEventListener("error", function (e) {
                window.location.href =
                  "http://app2.xunsheng.org.cn/apph5/#/Invitation"; // 下载地址
              });
            });
          }
        });
      this.isopen = true;
      document.body.style.paddingTop = "8vh";
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
.openApp2 {
  display: flex;
  justify-content: center;
  align-items: center;
  .openbtn {
    width: 100%;
    height: 40px;
    background: #25a6ff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 16px;
    line-height: 40px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  .launch-btn {
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
  }
}
</style>