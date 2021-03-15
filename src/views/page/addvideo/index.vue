<template>
  <div class="add-video">
    <!--    <van-uploader icon='video-o'/>-->
    <van-uploader
      :after-read="qiniuyunUpload"
      :max-count="1"
      accept="video/*"
      v-show="!datavideo"
    >
      <div class="icon-video-o">
        <img class="code1" src="@/assets/images/video.png" />
      </div>
      <span style="margin-left: 20px">上传视频</span>
    </van-uploader>
    <div class="add-video-url" v-show="datavideo">
      <video
        :src="datavideo"
        v-show="datavideo"
        controls
        :poster="datavideo + '?vframe/jpg/offset/0/w/325/h200'"
      ></video>
      <van-icon name="cross" @click="datavideo = ''" />
    </div>

    <van-field
      v-model="school"
      label="学校"
      placeholder="请输入学生学校"
      readonly
    />
    <van-field v-model="name" label="名字" placeholder="请输入学生姓名" />
    <van-field
      v-model="desire"
      class="desire"
      rows="6"
      autosize
      label="愿望"
      type="textarea"
      placeholder="请填写你的愿望"
      :border="false"
    />
    <van-button
      type="primary"
      class="submit"
      color="#ff80ab"
      block
      @click="submit"
      >提交</van-button
    >
  </div>
</template>

<script>
import api from "@/request/xsdt";
import axios from "axios";
import { Icon, Uploader, Field, Button } from "vant";
import { uploadToQiniu, getQiniuTk } from "@/utils/utils.js";
export default {
  name: "add-video",
  components: {
    VanIcon: Icon,
    VanUploader: Uploader,
    VanField: Field,
    VanButton: Button,
  },
  data() {
    return {
      datavideo: "",
      school: "巴蜀常春藤(畅雲轩)",
      name: "",
      desire: "",
    };
  },
  mounted() {
    let url = window.location.origin+'/addvideo';
    this.$global.shareToWechat('【雨雲轩】视频上传', url, '', '点击上传')
    this.getUserInfo();
  },
  methods: {
    getUser() {
      if (window.localStorage.getItem("storage") == null) {
        // console.log(1);
        this.$router.push({
          path: "/toke",
        });
      }
    },

    getUserInfo() {
      let value = {
        token: "841a37175336f5455e3a12605e2b2e4f",
        user_id: 399,
      };
      window.localStorage.setItem("storage", JSON.stringify(value));
    },
    // 上传七牛云
    async qiniuyunUpload(file, qiniuyunToken) {
      //获取最后一个.的位置
      var index = file.file.name.lastIndexOf(".");
      //获取后缀
      var suffix = file.file.name.substr(index + 1);
      // 当前VUE中的this 是指向实例，相当于父级，指向指不到子级中。所需需要一个变量 _this 存储this得指向。
      // 获取token
      let { upToken, key } = await getQiniuTk(
        this.member_id,
        this.token,
        suffix
      );
      this.datavideo = await uploadToQiniu(upToken, key, file.file);
      this.$forceUpdate();
    },
    submit() {
      if (this.datavideo === "") {
        this.$toast.fail("请上传视频");
        return;
      }
      if (this.name === "") {
        this.$toast.fail("请输入姓名");
        return;
      }
      let data = {
        user_name: this.name,
        school_name: this.school,
        desire: this.desire,
        file_url: this.datavideo,
      };
      api.postGrowingCreate(this.qs.stringify(data)).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          this.name = "";
          this.school = "";
          this.desire = "";
          this.datavideo = "";
          this.$toast.success(res.message);
        } else if (res.status == 401) {
          this.$router.push({
            path: "/toke",
          });
        }
      });
    },
  },
};
</script>

<style  lang="scss">
.add-video {
  //background-color: red;
  box-sizing: border-box;
  //padding: 20px;
  .van-uploader {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    .van-uploader__input-wrapper {
      width: 162px;
      height: 48px;
      background-color: #ff80ab;
      border-radius: 50px;
      color: #ffffff;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .van-uploader__input-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .icon-video-o {
        width: 26px;
        img {
          width: 100%;
        }
      }
    }
  }
  .van-cell {
    .van-cell__title {
      width: 2rem;
    }
  }
  .add-video-url {
    position: relative;
    video {
      width: 100%;
    }
    .van-icon-cross {
      width: 20px;
      height: 18px;
      text-align: right;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 100;
      background-color: black;
      color: #ffffff;
      font-size: 16px;
      border-radius: 0 0 0 20px;
    }
  }

  .desire {
    display: block;
    .van-cell__value {
      margin-top: 10px;
    }
  }
  .submit {
    height: 60px;
    font-size: 18px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
