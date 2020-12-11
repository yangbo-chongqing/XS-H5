<template>
  <div class="appbar" :style="{ background: bgcolor }">
    <div v-if="type == 'tm'" class="tm">
      <van-nav-bar
        :style="{ 'padding-top': bar_height + 'px', background: bgcolor }"
        :title="title"
        :right-text="rightText"
        left-arrow
        fixed
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div v-else>
      <van-nav-bar
        :style="{ 'padding-top': bar_height + 'px', background: bgcolor }"
        :title="title"
        :right-text="rightText"
        left-arrow
        fixed
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
  </div>
</template>
<script>
import { NavBar } from "vant";
export default {
  name: "appbar",
  props: ["title", "rightText", "bar_height", "bgcolor", "type"],
  data() {
    return {};
  },
  components: { VanNavBar: NavBar },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$global.attachNative("goBack", "");
    },
    onClickRight() {
      this.$emit("_appBarLeft");
    },
  },
};
</script>

<style lang="scss">
.tm{
  .van-nav-bar__left {
    left: 13px;
    i {
      font-size: 25px;
      color: #ffffff !important;
    }
  }
  .van-nav-bar__title {
    color: #ffffff !important;
    font-size: 16.67px;
  }
  .van-nav-bar__text{
      font-size: 16.67px;
      font-weight: bold;
  }
  .van-icon {
    color: #ffffff !important;
  }
  .van-nav-bar__text {
    color: #ffffff !important;
  }
}
.appbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: white;
  .van-hairline--bottom {
    &::after {
      border-width: 0;
    }
  }
  .van-nav-bar {
    height: 50px;
    line-height: 50px;
  }
  .van-nav-bar__left {
    left: 13px;
    i {
      font-size: 22px;
      color: #969696;
    }
  }
  .van-nav-bar__right {
    .van-nav-bar__right {
      &:active,
      :hover,
      :focus {
        background-color: transparent;
      }
    }
  }
  .van-nav-bar__title {
    color: #333333;
    font-size: 16.67px;
  }
  .van-icon {
    color: #333333;
  }
  .van-nav-bar__text {
    color: #333333;
  }
  .van-nav-bar__text{
    &:hover,&:active,&:focus{
      text-decoration: none;
      outline:none;
      background: transparent;
    }
  }
  .van-nav-bar {
    background: white;
  }
}
</style>

