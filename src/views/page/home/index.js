import api from '@/request/xsdt';
import { Icon, Col, Row } from 'vant';
export default {
  name:'Home',
  components: {
    VanIcon: Icon,
    VanCol: Col,
    VanRow:Row
  },
  data() {
    return {
      muse_id: this.$route.query.muse_id,
      museDataInfo: '',
      playFlag: true,
      videoFlag: false,
      isShowMore: false,
      isDescStatus: true,
    }
  },
  computed: {
   
  },
  created () {
    localStorage.setItem('muse_id',this.muse_id)
  },
  mounted() {
    this.museinfo()
  },
  methods: {
    showmoreDesc(e) {
      let el = e.currentTarget;
      el.previousElementSibling.classList[!this.isDescStatus ? 'add' : 'remove']('overflow-line');
      el.classList[this.isDescStatus ? 'add' : 'remove']('more-collapse');
      el.innerHTML = !this.isDescStatus ? '详情' : '收起';
      this.isDescStatus = !this.isDescStatus;
      this.isShowMore = true;
    },
    //页面跳转
    jumpRoute(path, obj) {
      this.$router.push({
        path: path,
        query: {
          ...obj
        }
      })  
    },
    museinfo() { 
      let params = {
        muse_id:this.muse_id
      }
      api.postMuseIndex(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          this.museDataInfo = res.data;
          let url = window.location.href;
          this.$global.shareToWechat(res.data.info.share_title, url, res.data.info.share_image, res.data.info.share_content)
          document.title = res.data.info.muse_name;
          if(this.museDataInfo.info.Introduction){
            if (this.museDataInfo.info.Introduction.length > 70) {
              this.isShowMore = true;
            }
          }
        }
      });
    },
    playAudio() {
      let myaudio = this.$refs.myaudio;
      let myVideo = this.$refs.myVideo;
      this.videoFlag = true;
      myVideo.pause();
      if (this.playFlag) {
        myaudio.play()
      } else { 
        myaudio.pause()
      }
      this.playFlag = !this.playFlag
    },
    videoPause() {
      let myaudio = this.$refs.myaudio;
      let myVideo = this.$refs.myVideo;
      this.playFlag = true;
      myaudio.pause()
      if (this.videoFlag) {
        myVideo.play()
      } else {
        myVideo.pause()
      }
      this.videoFlag = !this.videoFlag



    }
  }
};
