import api from '@/request/xsdt';
import { Icon, Col, Row, Swipe, SwipeItem,NavBar  } from 'vant';
export default {
  name:'Home',
  components: {
    VanIcon: Icon,
    VanCol: Col,
    VanRow: Row,
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    VanNavBar:NavBar
  },
  data() {
    return {
      id: this.$route.query.id,
      relicsDataInfo: '',
      playFlag: true,
      videoFlag: true,
    }
  },
  computed: {
   
  },
  created () {
  },
  mounted() {
    this.relicsInfo()
  },
  watch: {
    $route(to, from) {
      this.id = this.$route.query.id;
      this.relicsInfo()
    }
  },
  methods: {
    //页面跳转
    jumpRoute(path, obj) {
      this.$router.push({
        path: path,
        query: {
          ...obj
        }
      })  
    },
    back(){
      this.$router.go(-1);
    },
    relicsInfo() { 
      this.relicsDataInfo = '';
      let params = {
        relics_id: this.id,
        preview:1
      }
      api.postRelicsInfo(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          this.relicsDataInfo = res.data.info;
          this.relicsDataInfo.introduction = this.trim(this.relicsDataInfo.introduction);
          if (res.data.info.history_list.length > 0) {
            res.data.info.history_list.map((item, index) => {
              item.playFlag = true;
            })
          }
          let url = window.location.href;
          this.$global.shareToWechat(res.data.info.share_title, url, res.data.info.share_image, res.data.info.share_content)
          document.title = res.data.info.name
        }
      });
    },
    trim(s) {
      return s.replace(/(^\s*)|(\s*$)/g, "");
    },
    playVideo() {
      let myVideo = this.$refs.myVideo;
      if (this.videoFlag) {
        myVideo.play()
      } else {
        myVideo.pause()
      }
      this.videoFlag = !this.videoFlag
    },
    playAudioList(index) {
      let voicelist = this.$refs.voicelist;
      this.relicsDataInfo.history_list.map((item, i) => {
        if (index != i) {
          voicelist[i].pause();
          item.playFlag = true;
        }
      })
      if (this.relicsDataInfo.history_list[index].playFlag) {
        voicelist[index].play();
      } else { 
        voicelist[index].pause();
      }
      this.relicsDataInfo.history_list[index].playFlag = !this.relicsDataInfo.history_list[index].playFlag;
      this.relicsDataInfo = Object.assign({}, this.relicsDataInfo)
      console.log(this.relicsDataInfo.history_list[index].playFlag);
    },
    playStatic() { 
      let myaudio = this.$refs.myaudio;
      this.playFlag = true;
      myaudio.pause()
    },
    playAudio() {
      let myaudio = this.$refs.myaudio;
      let myVideo = this.$refs.myVideo;
      if (myVideo) { 
        this.videoFlag = true;
        myVideo.pause();
      }
      if (this.playFlag) {
        myaudio.play()
      } else {
        myaudio.pause()
      }
      this.playFlag = !this.playFlag
    },
    videoPause() { }
  }
};
