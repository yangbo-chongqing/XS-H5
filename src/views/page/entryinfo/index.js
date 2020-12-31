import api from '@/request/xsdt';
import { Icon, Col, Row, Swipe, SwipeItem, NavBar , List } from 'vant';
import fa from "element-ui/src/locale/lang/fa";
export default {
  name: 'Home',
  components: {
    VanIcon: Icon,
    VanCol: Col,
    VanRow: Row,
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    VanNavBar: NavBar,
    VanList:List
  },
  data() {
    return {
      id: this.$route.query.id,
      relicsDataInfo: '',
      playFlag: true,
      videoFlag: true,
      returnIcon: false,
      page: 1,
      page_size: 10,
      reply_id:'',
      commentList:[],
      loading: false,
      finished: false,
      error: false, 		// 是否加载失败
      refreshing: false,
      total:'',
    }
  },
  computed: {

  },
  created() {
    if (window.history.length <= 1) {
      this.returnIcon = true
    }
  },
  mounted() {
    this.relicsInfo();
    this.onLoad();
    // this.getComment()
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
    //重定向到首页
    repHome(){
      this.$router.replace({
        path:'/home',
        query:{
          muse_id:this.relicsDataInfo.muse_id
        }
      })
    },
    relicsInfo() {
      this.relicsDataInfo = '';
      let params = {
        relics_id: this.id,
        preview: 1
      }
      api.postRelicsInfo(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          this.relicsDataInfo = res.data.info;

          console.log(this.relicsDataInfo);
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
    videoPause() { },
    //获取评论详情
    getComment() {
      let data = {
        page: this.page,
        page_size: this.page_size,
        relics_id: this.id,
        reply_id:'',
      }
      api.postComment(this.qs.stringify(data)).then((res) => {
        if (res.status == 200) {
          if(res.data.list.length>0){
            this.total = this.total+=res.data.list.length
            // console.log(res.data.list)
            for(let i = 0 ; i<res.data.list.length; i++){
              this.commentList.push(res.data.list[i]);
            }
            // 加载状态结束
            this.loading = false;
            console.log(this.commentList)
          }else {
            // 数据全部加载完成
            this.finished = true;

          }

        }
      });
    },
    onLoad() {
      console.log(1)
      let data = {
        page: this.page,
        page_size: this.page_size,
        relics_id: this.id,
        reply_id:'',
      }
      api.postComment(this.qs.stringify(data)).then((res) => {
        if (res.status == 200) {
          this.total = this.total+=res.data.list.length
            console.log(res.data.list)
            for(let i = 0 ; i<res.data.list.length; i++){
              this.commentList.push(res.data.list[i]);
            }
          this.page=data.page
    //         console.log(this.commentList)
        }
        // 加载状态结束
        this.loading = false;
    //
        // 数据全部加载完成
        if (res.data.list.length <this.page_size) {
          this.finished = true;
        }else{
          this.page++;
        }
      });
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  }
};
