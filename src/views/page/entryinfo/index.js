import api from '@/request/xsdt';
import axios from 'axios';
import BigImg from './BigImg/bigImg.vue';
import { Icon, Col, Row, Swipe, SwipeItem, NavBar, List , Toast } from 'vant';
import { showLoading, hideLoading } from '@/request/loading'
// import { Loading } from 'element-ui';
import Viewer from "viewerjs";

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
    Toast:Toast,
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
      commentContent:'',   //评论内容
      setData:'',
      // 图片
      files: {
        name: "",
        type: ""
      },
      headerImage: '',
      picValue: '',
      upImgUrl:'',
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
    this.onLoad();
    // this.getComment()
    // const ViewerDom = document.getElementById('app-images');
    // const viewer = new Viewer(ViewerDom, {
    //   // 配置
    // })

  },
  watch: {
    $route(to, from) {
      this.id = this.$route.query.id;
      this.relicsInfo()
      this.delEnlargeImg();
    },
    message: function () {
      console.log(1);
      this.$nextTick(() => {
        console.log(1);
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
            let aEl = htmlcont.querySelectorAll("a");
            for (let i = 0; i < aEl.length; i++) {
              let imgEl = aEl[i].querySelectorAll("img");
              if (imgEl.length > 0) {
                aEl[i].classList.add("aimg")
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
    videoPause() { },
    //获取评论详情
    getComment() {
      let data = {
        page: this.page,
        page_size: this.page_size,
        relics_id: this.id,
        reply_id: '',
      }
      api.postComment(this.qs.stringify(data)).then((res) => {
        if (res.status == 200) {
          if (res.data.list.length > 0) {
            this.total = this.total += res.data.list.length
            // console.log(res.data.list)
            for (let i = 0; i < res.data.list.length; i++) {
              this.commentList.push(res.data.list[i]);
            }
            // 加载状态结束
            this.loading = false;
            // console.log(this.commentList)
          } else {
            // 数据全部加载完成
            this.finished = true;

          }

        }
      });
    },
    onLoad() {
      // console.log(1)
      let data = {
        page: this.page,
        page_size: this.page_size,
        relics_id: this.id,
        reply_id: '',
      }
      api.postComment(this.qs.stringify(data)).then((res) => {
        if (res.status == 200) {
          this.total = this.total += res.data.list.length
          // console.log(res.data.list)
          for (let i = 0; i < res.data.list.length; i++) {
            this.commentList.push(res.data.list[i]);
          }
          this.page = data.page
          //         console.log(this.commentList)
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
    delEnlargeImg(){
      if(this.fullscreenLoading){
        this.fullscreenLoading.close();
      }
    },
    // 自定义事件
    clickImg(e) {
      // console.log(e)
      if (e.target.nodeName == 'IMG') {
        if(e.target.parentElement.parentElement.tagName !== 'A' && e.target.parentElement.tagName !=='A'){
          this.showImg = true;
          // 获取当前图片地址
          this.imgSrc = e.target.src;
         }
      }
    },
    viewImg() {
      this.showImg = false;
    },
    // 点赞
    linkFn() {
      let  prams = {
        relics_id: this.id
      }
      // this.$router.push({
      //   path: '/toke',
      // })
      // console.log(localStorage.getItem('token'),'22222')

      // let value = {
      //   "token":"3ce36580b51083ba3e7e636b4f808d14",
      //   "user_id":399,
      // }
      // window.localStorage.setItem('storage',JSON.stringify(value))
      if(window.localStorage.getItem('storage')){
        console.log(1);
        this.$router.push({
          path: '/toke',
        });
      };
      // console.log(window.localStorage.getItem('storage'),'2222222')
      api.likeEntry(this.qs.stringify(prams)).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          Toast.success(res.message);
        }else if(res.status == 401){
          this.$router.push({
            path: '/toke',
          });
        }
      }).then((err)=>{
        // console.log(err)
      });

    },

    CommentLike(e) {
      if(window.localStorage.getItem('storage')){
        // console.log(1);
        this.$router.push({
          path: '/toke',
        });
      };
      let data ={
        comment_id:e.currentTarget.dataset.commentid,
      }
      api.commentLike(this.qs.stringify(data)).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          Toast.success(res.message);
        }
      }).then((err)=>{
        // console.log(err)
      });
    },
    // 回复
    hfSetFocus(e){
      if(window.localStorage.getItem('storage')){
        // console.log(1);
        this.$router.push({
          path: '/toke',
        });
      };
      console.log(e)
      let reply_id = e.currentTarget.dataset.reply_id;
      let username = e.currentTarget.dataset.username;
      let index = e.currentTarget.dataset.index;
      // console.log(reply_id,username,index)
      this.placeholder = '回复' + username;
      this.setData={
        autoFocus: true,
        reply_id: reply_id,
        hfIndex: index
      }
      console.log(this.setData)
    },

    // 回复评论
    sendOut(){
      if(window.localStorage.getItem('storage')){
        console.log(1);
        this.$router.push({
          path: '/toke',
        });
      };
      console.log(this.placeholder)
      let data = {
        relics_id:this.id,
        reply_id:this.setData.reply_id,
        comment:this.commentContent,
        image:[],
        voice:'',
      }
      if(this.commentContent ){
        api.CommentEntry(this.qs.stringify(data)).then((res) => {
          // console.log(res)
          if (res.status == 200) {
            Toast.success(res.message);
          }
        }).then((err)=>{
          console.log(err)
        });
      }
    },

    async afterRead(file) {
      this.files.name = file.file.name; // 获取文件名
      this.files.type = file.file.type; // 获取类型
      this.picValue = file.file; // 文件流
      this.imgPreview(this.picValue);
    },
    imgPreview(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      // Exif.getData(file, function () {
      //   Orientation = Exif.getTag(this, "Orientation");
      // });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function () {
          // console.log(this.result);
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于500K,是就直接上传，反之压缩图片
          if (this.result.length <= 500 * 1024) {
            self.headerImage = this.result;
            self.postImg();
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation);
              self.headerImage = data;
              self.postImg();
            };
          }
        };
      }
    },
    // 压缩图片
    compress(img, Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      // let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        // console.log("大于400万像素");
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //    铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        // console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //      计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != "" && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, "left", canvas);
            break;
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, "right", canvas);
            break;
          case 3: //需要180度旋转
            this.rotateImg(img, "right", canvas); //转两次
            this.rotateImg(img, "right", canvas);
            break;
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    },
    dataURLtoFile(dataurl) {
      let arr = dataurl.split(","),
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], this.files.name, {
        type: this.files.type
      });
    },
    async postImg() {
      let file = this.dataURLtoFile(this.headerImage);
      let formData = new window.FormData();
      formData.append("file", file);
      Toast(this, "图片上传中···");
      console.log(JSON.stringify(file))
      let a = file
      console.log(a,'aaaa')
      console.log(formData)
      try {
        let res = await api.UploadFile( a
        );
      } catch (e) {
        console.log(e);
      }

    }
  }
};
