<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="KV图">
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="(item, index) of kv" :key="index">
            <van-image @click="open(kv, index)" :src="item.value" />
          </van-grid-item>
        </van-grid>
      </van-tab>
      <van-tab title="方位图">
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="(item, index) of orientation" :key="index">
            <van-image @click="open(orientation, index)" :src="item.value" />
          </van-grid-item>
        </van-grid>
      </van-tab>
      <van-tab title="细节图">
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="(item, index) of detail" :key="index">
            <van-image @click="open(detail, index)" :src="item.value" />
          </van-grid-item>
        </van-grid>
      </van-tab>
      <van-tab title="场景图">
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="(item, index) of scene" :key="index">
            <van-image @click="open(scene, index)" :src="item.value" />
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Icon, ImagePreview } from "vant";

export default {
  components: {
    VanIcon: Icon,
    ImagePreview: ImagePreview,
  },
  data() {
    return {
      active: 0,
      detail: this.$route.query.detail,
      kv: this.$route.query.kv,
      orientation: this.$route.query.orientation,
      scene: this.$route.query.scene,
    };
  },
  methods: {
    open(pic, index) {
      // 预览图片
      let png = [];
      for (let i = 0; i < pic.length; i++) {
        png = png.concat(pic[i].value);
      }
      ImagePreview({
        images: png,
        "max-zoom": 5,
        "min-zoom": 10,
        startPosition: index,
        background: "#0000000",
        closeable: true,
      });
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
</style>