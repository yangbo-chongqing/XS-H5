<template>
  <div>
    <div class="xsdt" v-if="!$route.meta.bottomShow">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- <open-app v-if="isApp"></open-app> -->
      <xsdtfooter />
    </div>
    <div class="xsdtt" v-if="$route.meta.bottomShow">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import utils from "@/utils/utils.js";
import axios from "axios";
import qs from "qs";
import { mapGetters } from "vuex";
import { getURLlist } from "@/utils/utils";
import { Toast } from "vant";
import openApp from "@/components/openApp";
import xsdtfooter from "@/components/xsdtfooter";
import Viewer from "viewerjs";
export default {
  data() {
    return {
      code: getURLlist("code"),
      redirect_url: "",
      member_id: "",
      token: "",
      isApp: !this.$global.isIosAPP() && !this.$global.isAndroidAPP(),
    };
  },
  components: {
    Toast: Toast,
    openApp,
    xsdtfooter,
  },
  created() {
    document.body.removeChild(document.getElementById("Loading"));
  },
  watch: {
    $route: {
      handler(to, from) {
        setTimeout(() => {
          //避免首次获取不到window._czc
          if (window._czc) {
            let location = window.location;
            let contentUrl = location.pathname + location.hash;
            let refererUrl = "/";
            // 用于发送某个URL的PV统计请求，
            window._czc.push(["_trackPageview", contentUrl, refererUrl]);
          }
        }, 300);
      },
      immediate: true, // 首次进入页面即执行
      message: function () {
        // console.log(1);
        this.$nextTick(() => {});
      },
    },
  },
  mounted() {
    // this.showLoading();
    let CNZZ_ID = "1278811724";
    // 创建cnzz统计js
    const script = document.createElement("script");
    script.src = `https://s95.cnzz.com/z_stat.php?id=${CNZZ_ID}&web_id=${CNZZ_ID}`;
    script.language = "JavaScript";
    document.body.appendChild(script);
    // window.addEventListener("load", function () {  Toast.clear(); });
  },
  methods: {
    showLoading() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
    },
  },
  // watch: {},
  computed: {},
};
</script>

<style lang="scss">
@import "@/styles/reset.scss";
.xsdt {
  position: relative;
  padding-bottom: 50px;
  min-height: 100vh;
  box-sizing: border-box;
}
.xsdtt {
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
