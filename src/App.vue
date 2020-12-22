<template>
  <div class="xsdt">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <open-app v-if="isApp"></open-app> -->
    <xsdtfooter />
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
import xsdtfooter from '@/components/xsdtfooter'
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
    openApp,
    xsdtfooter
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
    },
  },
  mounted() {
    let CNZZ_ID = "1278811724";
    // 创建cnzz统计js
    const script = document.createElement("script");
    script.src = `https://s95.cnzz.com/z_stat.php?id=${CNZZ_ID}&web_id=${CNZZ_ID}`;
    script.language = "JavaScript";
    document.body.appendChild(script);
  },
  methods: {},
  watch: {},
  computed: {},
};
</script>

<style lang="scss">
@import "@/styles/reset.scss";
.xsdt{
  position: relative;
  padding-bottom:50px;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
