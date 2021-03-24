<template>
  <div>
    <div class="add-video" v-if="!type">
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
          playsinline="true"
          webkit-playsinline="true"
          x5-video-player-type="h5"
          x5-video-orientation="portraint"
          :poster="datavideo + '?vframe/jpg/offset/0/w/325/h200'"
        ></video>
        <van-icon name="cross" @click="datavideo = ''" />
      </div>

      <van-field
        v-model="school"
        label="学校"
        placeholder="请输入学校"
        readonly
      />
      <van-field v-model="name" label="名字" placeholder="请输入您的姓名" />
      <van-field
        v-model="desire"
        class="desire"
        rows="6"
        autosize
        label="愿望"
        type="textarea"
        placeholder="请填写您的愿望"
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
    <div class="add-video" v-if="type">
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
          playsinline="true"
          webkit-playsinline="true"
          x5-video-player-type="h5"
          x5-video-orientation="portraint"
          :poster="datavideo + '?vframe/jpg/offset/0/w/325/h200'"
        ></video>
        <van-icon name="cross" @click="datavideo = ''" />
      </div>
      <van-field v-model="schoolName" label="班级名称" placeholder="请输入您所在的班级" />
      <van-field v-model="name" label="名字" placeholder="请输入您的姓名" />
      <van-field
        readonly
        clickable
        name="picker"
        :value="Videotype"
        label="视频分类"
        placeholder="点击选择分类"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        v-model="desire"
        class="desire"
        rows="6"
        autosize
        label="简介"
        type="textarea"
        placeholder="请填写简介"
        :border="false"
      />

      <van-button
        type="primary"
        class="submit"
        color="#ff80ab"
        block
        @click="submit(1)"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import api from "@/request/xsdt";
import {
  Icon,
  Uploader,
  Field,
  Button,
  Dialog,
  Form,
  Picker,
  Popup,
} from "vant";
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Field);

import { uploadToQiniu, getQiniuTk } from "@/utils/utils.js";
export default {
  name: "add-video",
  components: {
    VanIcon: Icon,
    VanUploader: Uploader,
    VanField: Field,
    VanButton: Button,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      datavideo: "",
      school: "巴蜀常春藤(畅雲轩)",
      name: "",
      schoolName:"",
      desire: "",
      type: this.$route.query.type,
      showPicker: false,
      Videotype: "",
      columns: [],
    };
  },
  mounted() {
    let url = window.location.origin + "/addvideo";
    this.$global.shareToWechat(
      "【畅雲轩】视频上传",
      url,
      "https://resource.xunsheng.org.cn/file/upload.jpg",
      "点击上传"
    );
    this.getUser();
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
    getList() {
      api.settingGrow().then((res) => {
        this.columns = res.data.tag;
        this.name = res.data.user.user_name;
        this.schoolName = res.data.user.school_name;
      });
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
    submit(n) {
      if (n == 1) {
        if (!this.Videotype && !this.datavideo && !this.schoolName) {
          this.$toast.fail("请完善数据");
          return;
        }
        let parasm = {
          user_name: this.name,
          tags: this.Videotype,
          file_url: this.datavideo,
          desire: this.desire,
          school_name:this.schoolName
        };
        api.publish(this.qs.stringify(parasm)).then((res) => {
          if (res.status == 200) {
            this.$router.go(-1);
          }
        });
      } else {
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
            // this.name = "";
            // this.desire = "";
            // this.datavideo = "";
            // this.$toast.success();
            Dialog.alert({
              message: res.message,
            }).then(() => {
              // on close
            });
          } else if (res.status == 401) {
            this.$router.push({
              path: "/toke",
            });
          }
        });
      }
    },
    onConfirm(value) {
      this.Videotype = value;
      this.showPicker = false;
    },
  },
  created() {
    this.getList();
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
      height: 260px;
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
    z-index: 100;
  }
}
</style>
