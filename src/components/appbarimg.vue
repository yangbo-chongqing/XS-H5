<template>
  <div class="appbarimg">
    <van-nav-bar
      :style="{'padding-top':bar_height+'px',color:color,background:rgba}"
      :title="title"
      :right-text="rightText"
      left-arrow
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  name: "appbarimg",
  props: ["title", "rightText", "bar_height", "color"],
  data() {
    return {
      rgba: "rgba(1, 115, 254, 0)",
      ap: 0,
    };
  },
  components: { VanNavBar: NavBar },
  computed: {},
  created() {},
  mounted() {
    window.addEventListener("scroll", this.scrollFun);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollFun, false);
  },
  methods: {
    onClickLeft() {
        this.$attachNative("goBack", "");
    },
    onClickRight() {
      this.$emit("_appbarimgLeft");
    },
    scrollFun(e) {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 40) {
        if (this.ap < 1) {
          this.ap += 0.1;
        }
      } else {
        if (this.ap > 0) {
          this.ap -= 0.1;
        }
      }
      if (scrollTop == 0) {
        this.ap = 0;
      }
      if (scrollTop > 100) {
        this.ap = 1;
      }
      this.rgba = `rgba(1, 115, 254, ${this.ap})`;
    },
  },
};
</script>

<style lang="scss">
.appbarimg {
  position: relative;
  background: rgba(1, 115, 254, 0);
  .van-icon {
    font-size: 33px;
  }
  .van-nav-bar__right {
    &:active,
    :hover,
    :focus {
      background-color: transparent;
    }
  }
  .van-nav-bar__title {
    font-size: 33px;
    color: inherit;
  }
  .van-icon {
    color: inherit;
  }
  .van-nav-bar__text {
    color: inherit;
  }
  .van-nav-bar {
    height: 100px;
    line-height: 100px;
    background: inherit;
  }
  .van-hairline--bottom {
    &::after {
      border-width: 0;
    }
  }
}
</style>

