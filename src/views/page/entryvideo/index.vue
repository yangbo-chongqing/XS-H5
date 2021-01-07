<template>
  <div class="h-container">
    <!-- <video
      
      class="video-js vjs-big-play-centered vjs-fluid"
      ref="webvideo"
      :poster="videoObj.video_cover_url"
      :src="videoObj.video_url"
      controls
    ></video> -->
    <iframe
      width="100%"
      height="500px"
      frameborder="0"
      :src="ifStr"
    ></iframe>
  </div>
</template>

<script>
import Logic from "./index";

export default Logic;
</script>
<style lang="scss">
@import "./index-vant.scss";
</style>
<style scoped lang="scss">
@import "./index.scss";
</style>