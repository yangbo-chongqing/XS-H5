<template>
  <div class="add-video">
<!--    <van-uploader icon='video-o'/>-->
    <van-uploader :after-read="afterRead" :max-count="1" accept="video/*" v-show="!datavideo" after-read>
      <div class="icon-video-o">
        <img class="code1" src="@/assets/images/video.png" />
      </div>
      <span style="margin-left: 20px;">上传视频</span>
    </van-uploader>
    <div class="add-video-url" v-show="datavideo">
      <video :src="datavideo" v-show="datavideo" controls :poster="datavideo+'?vframe/jpg/offset/0/w/325/h200'"> </video>
      <van-icon name="cross" @click="datavideo=''"/>
    </div>

    <van-field v-model="school" label="学校" placeholder="请输入学生学校" readonly />
    <van-field v-model="name" label="名字" placeholder="请输入学生姓名" />
    <van-field v-model="desire" class="desire" rows="6" autosize label="愿望" type="textarea" placeholder="请填写你的愿望" :border="false"/>
    <van-button type="primary" class="submit" color="#ff80ab" block @click="submit">提交</van-button>
  </div>
</template>

<script>
import api from "@/request/xsdt";
import axios from "axios";
import {Icon,Uploader,Field,Button} from 'vant';

export default {
name: "add-video",
  components: {
    VanIcon: Icon ,
    VanUploader:Uploader,
    VanField:Field,
    VanButton:Button,
  },
  data() {
    return {
      datavideo: '',
      school:'巴蜀常春藤(畅雲轩)',
      name:'',
      desire:'',
    }
  },
  mounted() {
this.getUserInfo()
  },
  methods: {
    getUser() {
      if (window.localStorage.getItem('storage') == null) {
        // console.log(1);
        this.$router.push({
          path: '/toke',
        });
      }
    },

    getUserInfo() {
      let value = {
        token: '841a37175336f5455e3a12605e2b2e4f',
        user_id: 399,
      };
      window.localStorage.setItem("storage", JSON.stringify(value));
    },
    afterRead(file) {
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      this.getpolicy(file.file)
    },
    getpolicy(file) {
      let data ={
        suffix:file.type.split('/')[1],
      };
      api.postqiniu(data).then((res) => {
        if (res.status == "200") {
          // console.log(res)
          this.qiniuyunUpload(file,res.data.data)
        }
      });
    },
    // 上传七牛云
    qiniuyunUpload(file, qiniuyunToken) {
      let formData = new FormData();
      //注意formData里append添加的键的大小写
      formData.append('key', qiniuyunToken.key)
      formData.append('token', qiniuyunToken.upToken)
      //如果是base64文件，那么直接把base64字符串转成blob对象进行上传就可以了
      formData.append("file", file);
      axios.post('http://upload.qiniup.com', formData, {
        'Content-Type': 'multipart/form-data'
      }).then(res => {
        if (res.status == 200) {
          let img_url = 'https://voice.xunsheng.org.cn/'+ res.data.key;
          if(file.type.split('/')[0] == 'video' ){
            this.$toast.clear();
            this.datavideo = img_url;
            console.log(this.datavideo)
          }
          // console.log(img_url)
        } else {
          // this.$util.message("err", res.message);
        }
      })
    },
    submit(){
      if(this.datavideo ===''){
        this.$toast.fail('请上传视频');
        return;
      }
      if(this.name === ''){
        this.$toast.fail('请输入姓名');
        return;
      }
      let data ={
        user_name:this.name,
        school_name:this.school,
        desire:this.desire,
        file_url:this.datavideo,
      }
      api.postGrowingCreate(this.qs.stringify(data)).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          this.name = '';
          this.school = '';
          this.desire = '';
          this.datavideo = '';
          this.$toast.success(res.message);
        }else if(res.status == 401){
          this.$router.push({
            path: '/toke',
          });
        }
      })
    },
  }

}

</script>

<style  lang="scss">
.add-video{
  //background-color: red;
  box-sizing: border-box;
  //padding: 20px;
  .van-uploader{
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    .van-uploader__input-wrapper{
      width: 162px;
      height: 48px;
      background-color: #ff80ab;
      border-radius: 50px;
      color: #ffffff;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .van-uploader__input-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .icon-video-o{
        width: 26px;
        img{
          width: 100%;
        }
      }
    }
  }
  .van-cell{
    .van-cell__title{
      width: 2rem;
    }
  }
  .add-video-url{
    position: relative;
    video{
      width: 100%;
    }
    .van-icon-cross{
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

  .desire{
    display: block;
    .van-cell__value{
      margin-top: 10px;
    }
  }
  .submit{
    height: 60px;
    font-size: 18px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
}

</style>
