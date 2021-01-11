import api from '@/request/xsdt';
import axios from 'axios';
import BigImg from './BigImg/bigImg.vue';
import global from '@/global'
import { Icon, Col, Row, Swipe, SwipeItem, NavBar, List, Toast, Uploader, Button } from 'vant';
import { showLoading, hideLoading } from '@/request/loading'
// import { Loading } from 'element-ui';
import Viewer from "viewerjs";
import {parseQuery} from "@/utils/utils";

export default {
  name: 'Home',
  components: {
    VanIcon: Icon,
    VanCol: Col,
    VanRow: Row,
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    VanNavBar: NavBar,
    VanList: List,
    Toast: Toast,
    VanUploader: Uploader,
    VanButton: Button,
    // Loading:Loading,
    'big-img': BigImg
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
      reply_id: '',
      commentList: [],
      loading: false,
      finished: false,
      error: false, 		// 是否加载失败
      refreshing: false,
      total: '',
      fullscreenLoading: '',
      madalshow: false,
      warnimg: '',
      dataDetail: {},
      showImg: false,
      imgSrc: '',
      placeholder: '请输入评论',
      commentContent: '',   //评论内容
      setData: '',
      // 图片
      files: {
        name: "",
        type: ""
      },
      Show: true,
      headerImage: '',
      picValue: '',
      upImgUrl: '',
      list_arr:[],
      commentList_index:'',
    }
  },
  computed: {

  },
  created() {
    if (window.history.length <= 1) {
      this.returnIcon = true
    };
    this.render = true;
  },
  mounted() {
    this.relicsInfo();
    this.getUser();
    this.onLoad();
    // this.getUserInfo();

  },
  watch: {
    $route(to, from) {
      this.id = this.$route.query.id;
      this.relicsInfo()
      this.delEnlargeImg();
    },
    message: function () {
      // console.log(1);
      this.$nextTick(() => {
        // console.log(1);
        // console.log(document.getElementById('images'))
        let viewer2 = new Viewer(document.getElementById('app-images'), {
          url: 'data-imgurl',
        });
      })
    }
  },
  methods: {
    //页面跳转
    jumpRoute(path, obj) {
      showLoading();
      this.$router.push({
        path: path,
        query: {
          ...obj
        }
      })
      hideLoading();
    },
    //重定向到首页
    repHome() {
      showLoading();
      this.$router.replace({
        path: '/home',
        query: {
          muse_id: this.relicsDataInfo.muse_id
        }
      })
      hideLoading();
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

          // console.log(this.relicsDataInfo);
          this.relicsDataInfo.introduction = this.trim(this.relicsDataInfo.introduction);
          if (res.data.info.history_list.length > 0) {
            res.data.info.history_list.map((item, index) => {
              item.playFlag = true;
            })
          }
          let url = window.location.href;
          this.$global.shareToWechat(res.data.info.share_title, url, res.data.info.share_image, res.data.info.share_content)
          document.title = res.data.info.name;
          this.$nextTick(() => {
            let htmlcont = this.$refs.htmlCont;
            if (htmlcont) {
              let aEl = htmlcont.querySelectorAll("a");
              for (let i = 0; i < aEl.length; i++) {
                let imgEl = aEl[i].querySelectorAll("img");
                if (imgEl.length > 0) {
                  aEl[i].classList.add("aimg")
                }
              }
            }

          })
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
      // console.log(this.relicsDataInfo.history_list[index].playFlag);
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
    videoPause() {},
    getCommentDetails () {
      let arr= [];
      for( let i=1; i<this.page;i++){
        let data = {
          page: i ,
          page_size: this.page_size,
          relics_id: this.id,
          reply_id: '',
        }
        api.postComment(this.qs.stringify(data)).then((res) => {
          if (res.status == 200) {
            this.total = this.total += res.data.list.length
            for (let i = 0; i < res.data.list.length; i++) {
              arr.push(res.data.list[i]);
            }
            // this.commentList =  this.unique(this.list_arr)
          }
        });
      }
      this.commentList = arr;
    },
    //获取评论详情
    onLoad() {
      // console.log(name)
      let data = {
        page: this.page,
        page_size: this.page_size,
        relics_id: this.id,
        reply_id: '',
      }
        api.postComment(this.qs.stringify(data)).then((res) => {
          if (res.status == 200) {
            this.total = this.total += res.data.list.length
            for (let i = 0; i < res.data.list.length; i++) {
              this.list_arr.push(res.data.list[i]);
            }
            this.commentList =  this.unique(this.list_arr)
            // console.log(this.commentList)
            this.page = data.page
          }
          // 加载状态结束
          this.loading = false;
          //
          // 数据全部加载完成
          if (res.data.list.length < this.page_size) {
            this.finished = true;
          } else {
            this.page++;
          }
        });

    },
    //数组去重
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    // 点击a标签出现loading
    enlargeImg(e) {
      let a_html = e.target.parentNode;
      // console.log(e.target.tagName)
      if (e.target.tagName == 'A' || a_html.tagName == 'A' || e.target.tagName == null || e.target.parentElement.parentElement.tagName === 'A') {
        this.fullscreenLoading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      }
    },
    delEnlargeImg() {
      if (this.fullscreenLoading) {
        this.fullscreenLoading.close();
      }
    },
    // 自定义事件
    clickImg(e) {
      console.log(e)
      if (e.target.nodeName == 'IMG') {
        if (e.target.parentElement.parentElement.tagName !== 'A' && e.target.parentElement.tagName !== 'A') {
          if(e.target.className == 'a-href-icon'){
            return false;
          }
          this.showImg = true;
          // 获取当前图片地址
          this.imgSrc = e.target.src;
        }
      }
    },
    viewImg() {
      this.showImg = false;
    },
    //判断有无用户信息
    getUser() {
      // let storage = {
      //   'code':'3ce36580b51083ba3e7e636b4f808d14',
      //   'user_id':399,
      // }
      // window.localStorage.setItem('storage',JSON.stringify(storage))
      if (global().isWeixin()) {
        // console.log(window.localStorage.getItem('storage') == null,'2222')
        if (window.localStorage.getItem('storage') == null) {
          // console.log(1);
          this.Show = true;
          this.$router.push({
            path: '/toke',
          });
        } else {
          let data = {
            'relics_id': this.id,
          }
          api.ScanCode(data).then((res) => {
            if (res.status === 200) {
            } else if (res.status === 401) {
              this.$router.push({
                path: '/toke',
              });
            }
          }).then((err) => {
            // console.log(err)
          })
        }
      } else {
        this.Show = false;
      }


    },
    // 点赞
    linkFn(e) {
      let prams = {
        relics_id: this.id
      }
      api.likeEntry(this.qs.stringify(prams)).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          Toast.success(res.message);
          e.likes = e.is_like+1
          e.is_like = e.is_like+1
        } else if (res.status == 401) {
          this.$router.push({
            path: '/toke',
          });
        }
      }).then((err) => {
        // console.log(err)
      });

    },

    CommentLike(e,datas) {
      let data = {
        comment_id: e.currentTarget.dataset.commentid,
      }
      // this.getUser();
      api.commentLike(this.qs.stringify(data)).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          Toast.success(res.message);
          datas.is_like = datas.is_like+1;
          datas.likes = datas.likes + 1;
        } else if (res.status == 401) {
          this.$router.push({
            path: '/toke',
          });
        }
      }).then((err) => {
        // console.log(err)
      });
    },
    // 回复
    hfSetFocus(e,datas) {
      // this.getUser();
      // console.log(e)
      this.commentList_index = datas;
      document.querySelector('.weui-input').focus();
      let reply_id = e.currentTarget.dataset.reply_id;
      let username = e.currentTarget.dataset.username;
      let index = e.currentTarget.dataset.index;
      // console.log(reply_id,username,index)
      this.placeholder = '回复' + username;
      console.log(datas,reply_id,username)
      this.setData = {
        autoFocus: true,
        reply_id: reply_id,
        hfIndex: index
      }
      // console.log(this.setData)
    },

    // 回复评论
    sendOut() {
      let data = {
        relics_id: this.id,
        reply_id: this.setData.reply_id,
        comment: this.commentContent,
        image: '',
        voice: '',
      }
      if (this.commentContent != null) {
        api.CommentEntry(this.qs.stringify(data)).then((res) => {
          // console.log(res)
          if (res.status == 200) {
            Toast.success(res.message);
            if(this.setData.reply_id != null) {
              this.setData.reply_id = '';
              this.commentList[this.commentList_index].list.push(res.data.info)
            }else {
              this.commentList.unshift(res.data.info)
            }
            this.commentContent = '';
            this.placeholder = '';
          }
        }).then((err) => {
          console.log(err)
        });
      }
    },

    afterRead(file) {
      // console.log(file.file);
      let formData = new window.FormData();
      formData.append("file", file.file);
      axios.post('/api/UploadFile', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((res) => {
        // console.log(res.data.message === '上传成功');
        if (res.data.message === '上传成功') {
          let imgs = res.data.data.file_path;
          let data = {
            relics_id: this.id,
            reply_id: this.setData.reply_id,
            comment: this.commentContent,
            image: imgs,
            voice: '',
          }
          api.CommentEntry(this.qs.stringify(data)).then((res) => {
            // console.log(res)
            if (res.status == 200) {
              Toast.success(res.message);
              if(this.setData.reply_id != null) {
                this.commentList[this.commentList_index].list.push(res.data.info)
              }else {
                this.commentList.unshift(res.data.info)
              }
              this.setData.reply_id = '';
              this.commentContent = '';
            } else if (res.status == 401) {
              this.$router.push({
                path: '/toke',
              });
            }
          }).then((err) => {
            console.log(err)
          });
        }
      });
    },
  }
};
