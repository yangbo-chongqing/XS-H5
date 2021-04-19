<template>
  <div class="app-video">
    <div
      class="app-video-list"
      v-for="(itme, index) in datavideo.video"
      :key="index"
    >
      <!--      <embed :src="itme.video_url" type=""  >-->
      <video
        :src="itme.video_url"
        controls
        :poster="itme.video_url + '?vframe/jpg/offset/0/w/325/h200'"
      ></video>
      <p>{{ itme.video_name }}</p>
    </div>
  </div>
</template>

<script>
import api from "@/request/xsdt";

export default {
  name: "index",
  data() {
    return {
      datavideo: "",
      muse_id: this.parseQuery(window.location.href).muse_id,
      pkid: this.parseQuery(window.location.href).pkid,
    };
  },
  mounted() {
    this.museinfo();
  },
  methods: {
    museinfo() {
      let url = this.parseQuery(window.location.href);
      let muse_id = url.muse_id;
      let pkid = url.pkid;
      let params = {
        muse_id: muse_id,
        pkid: pkid,
      };
      api.postDetails(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          this.datavideo = res.data.product;
        }
      });
    },
    parseQuery(url) {
      let o = {};
      let queryString = url.split("?")[1];
      if (queryString) {
        queryString.split("&").forEach((item) => {
          let [key, val] = item.split("=");
          val = val ? decodeURI(val) : true;
          //          转码         无值赋值true
          if (o.hasOwnProperty(key)) {
            //   已有属性转为数组
            o[key] = [].concat(o[key], val);
          } else {
            o[key] = val;
          }
        });
      }
      return o;
    },
  },
};
</script>

<style scoped lang="scss">
.app-video {
  //background-color: red;
  box-sizing: border-box;
  padding: 20px;
  .app-video-list {
    margin-top: 10px;
    width: 100%;
    p {
      font-weight: 500;
      font-size: 16px;
      //width: 100%;
      padding-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    embed {
      width: 100%;
      height: 200px;
    }
    video {
      width: 100%;
      height: 200px;
    }
  }
}
</style>