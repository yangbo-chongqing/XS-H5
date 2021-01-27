import api from '@/request/xsdt';
import axios from 'axios';
import BigImg from './BigImg/bigImg.vue';
import global from '@/global';
import { Icon, Col, Row, Swipe, SwipeItem, NavBar, List, Toast, Uploader, Button , ImagePreview , Overlay } from 'vant';
import { showLoading, hideLoading } from '@/request/loading';
import Viewer from "viewerjs";
import {parseQuery} from "@/utils/utils";
import Exif from 'exif-js'

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
    VanOverlay: Overlay,
    ImagePreview:ImagePreview,
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
      wrapper_show:false,   //订阅显示与隐藏
      subscribe:'',     //订阅二维码
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
    this.getadvertising();
    this.getsubscribe();
    document.addEventListener('visibilitychange', this.handleVisiable)

  },
  destroyed() {
    document.removeEventListener('visibilitychange', this.handleVisiable)
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
                aEl[i].setAttribute("target", "_blank")
                if (/^https:\/\/v\.douyin\.com\/\w+\/?$/.test(aEl[i].href)) {
                  aEl[i].href = `http://xsdth5.xunsheng.org.cn/#/entryvideo?url=${aEl[i].href}`
                }
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
    getCommentDetails() {
      let arr = [];
      for (let i = 1; i < this.page; i++) {
        let data = {
          page: i,
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
          this.commentList = this.unique(this.list_arr)
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
    //获取广告弹窗数据
    getadvertising(){
      let data = {
        muse_id: this.id,
        position: 1,
      }
      api.postadvertising(this.qs.stringify(data)).then((res) => {
        console.log(res)
        if (res.status == 200) {
          this.imgSrc = res.data.info
          if(res.data.info){
            if(this.imgSrc.method==1){
              this.showImg = true;
            }else if(this.imgSrc.method==2){
              let time=  window.localStorage.getItem('time')
              if(time<this.dealWithTime(new Date())){
              }else {
                let day3 = new Date();
                day3.setTime(day3.getTime()+24*60*60*1000);
                let s3 = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate()+ "-" + day3.getHours()+ ':' + day3.getMinutes() + ':' + day3.getSeconds();
                window.localStorage.setItem('time',JSON.stringify(s3))
                this.showImg = true;
              }
            }else {

            }
          }
        }
      });
    },
    // 时间格式转换
    dealWithTime(date) {
      let Y = date.getFullYear()
      let M = date.getMonth() + 1 - 0 >= 10 ? Number(date.getMonth()) + 1 : '0' + (Number(date.getMonth()) + 1)
      let D = date.getDate()
      let h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
      let m = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
      let s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
      return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
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
      // let a_html = e.target.parentNode;
      // // console.log(e.target.tagName)
      // if (e.target.tagName == 'A' || a_html.tagName == 'A' || e.target.tagName == null || e.target.parentElement.parentElement.tagName === 'A') {
      //   this.fullscreenLoading = this.$loading({
      //     lock: true,
      //     text: 'Loading',
      //     spinner: 'el-icon-loading',
      //     background: 'rgba(0, 0, 0, 0.7)'
      //   });
      // }
    },
    delEnlargeImg() {
      if (this.fullscreenLoading) {
        this.fullscreenLoading.close();
      }
    },
    // 自定义事件
    clickImg(e) {
      // console.log(e)
      if (e.target.nodeName == 'IMG') {
        if (e.target.parentElement.parentElement.tagName !== 'A' && e.target.parentElement.tagName !== 'A') {
          if (e.target.className == 'a-href-icon') {
            return false;
          }
          // this.showImg = true;
          // 获取当前图片地址
          // this.imgSrc = e.target.src;
          ImagePreview({
            images: [
              e.target.src
            ],
            'max-zoom': 5,
            'min-zoom': 10,
            background: '#0000000'
          });
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
          e.likes = e.is_like + 1
          e.is_like = e.is_like + 1
        } else if (res.status == 401) {
          this.$router.push({
            path: '/toke',
          });
        }
      }).then((err) => {
        // console.log(err)
      });

    },

    CommentLike(e, datas) {
      let data = {
        comment_id: e.currentTarget.dataset.commentid,
      }
      // this.getUser();
      api.commentLike(this.qs.stringify(data)).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          Toast.success(res.message);
          datas.is_like = datas.is_like + 1;
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
    hfSetFocus(e, datas) {
      // this.getUser();
      // console.log(e)
      this.commentList_index = datas;
      document.querySelector('.weui-input').focus();
      let reply_id = e.currentTarget.dataset.reply_id;
      let username = e.currentTarget.dataset.username;
      let index = e.currentTarget.dataset.index;
      // console.log(reply_id,username,index)
      this.placeholder = '回复' + username;
      this.setData = {
        autoFocus: true,
        reply_id: reply_id,
        hfIndex: index
      }
      // console.log(this.setData)
    },
    changeCount() {
      if (this.commentContent === '') {
        this.placeholder = '请输入评论';
        this.setData.reply_id = '';
      }
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
            console.log(this.setData.reply_id === '')
            if (this.setData.reply_id === '' || this.setData.reply_id == null) {
              this.commentList.unshift(res.data.info)
            } else {
              console.log(222)
              this.setData.reply_id = '';
              this.commentList[this.commentList_index].list.push(res.data.info)
            }
            this.commentContent = '';
            this.placeholder = '请输入评论';
          }
        }).then((err) => {
          console.log(err)
        });
      }
    },

    fileChange(el) {
      // console.log(el)
      Toast.loading({
        duration: 0,
        message: '上传中...',
        forbidClick: true,
      });
      // console.log(el)
      let _this = this;
      if (this.limit !== undefined) this.limit--;
      if (this.limit !== undefined && this.limit < 0) return;
      lrz(el, {quality: 0.3})
          .then(function (rst) {
            //成功时执行
            // console.log(rst)
            const fd = rst.formData;
            axios.post('/api/UploadFile', fd, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }).then((res) => {
              // console.log(res.data.message === '上传成功');
              if (res.data.message === '上传成功') {
                let imgs = res.data.data.file_path;
                let data = {
                  relics_id: _this.id,
                  reply_id: _this.setData.reply_id,
                  comment: _this.commentContent,
                  image: imgs,
                  voice: '',
                }
                // Toast.success(res.data.message);
                api.CommentEntry(_this.qs.stringify(data)).then((res) => {
                  // console.log(res)
                  if (res.status == 200) {
                    Toast.clear();
                    Toast.success(res.message);
                    if (_this.setData.reply_id === '' || _this.setData.reply_id == null) {
                      _this.commentList.unshift(res.data.info)
                    } else {
                      console.log(222)
                      _this.setData.reply_id = '';
                      _this.commentList[_this.commentList_index].list.push(res.data.info)
                    }
                    _this.setData.reply_id = '';
                    _this.commentContent = '';
                    _this.placeholder = '请输入评论';
                  } else if (res.status == 401) {
                    _this.$router.push({
                      path: '/toke',
                    });
                  }
                }).then((err) => {
                  Toast.clear();
                  console.log(err)
                });
              }
            }).then((err) => {
              // file.status="failed";
              // file.message="上传失败";
              Toast.clear();
              // Toast.fail('上传失败');
            });
          }).catch(function (error) {
        //失败时执行
        // Toast.fail('上传失败');
      }).always(function () {
        Toast.clear();
      })
    },


    afterRead(file) {
      this.files.name = file.file.name // 获取文件名
      this.files.type = file.file.type // 获取类型
      this.imgPreview(file.file)
    },
    imgPreview(file) {
      let self = this
      let Orientation
      //去获取拍照时的信息，解决拍出来的照片旋转问题   npm install exif-js --save   这里需要安装一下包
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, 'Orientation')
      })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          //判断图片是否大于500K,是就直接上传，反之压缩图片
          if (this.result.length <= 500 * 1024) {
            // 上传图片
            self.postImg(this.result);
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              // 上传图片
              self.postImg(data);
            }
          }
        }
      }
    },
    // 压缩图片
    compress(img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      //瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      // let initSize = img.src.length;
      let width = img.width
      let height = img.height
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = (width * height) / 4000000) > 1) {
        // console.log("大于400万像素");
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      //    铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      //如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = (width * height) / 1000000) > 1) {
        // console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1) //计算要分成多少块瓦片
        //      计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != '' && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3: //需要180度旋转
            this.rotateImg(img, 'right', canvas) //转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1)
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      console.log(ndata)
      return ndata
    },
    // 旋转图片
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0
      const max_step = 3
      if (img == null) return
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step == null) {
        step = min_step
      }
      if (direction == 'right') {
        step++
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step)
      } else {
        step--
        step < min_step && (step = max_step)
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    },
    //将base64转换为文件
    dataURLtoFile(dataurl) {
      var arr = dataurl.split(','),
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], this.files.name, {
        type: this.files.type
      })
    },
    // 提交图片到后端
    postImg(base64) {
      let file = this.dataURLtoFile(base64)
      let formData = new window.FormData()
      formData.append('file', file);
      console.log(file)
      // 提交图片
      // Some code
      this.fileChange(file)
    },


    //图片预览
    getImg(e) {
      // console.log(e.target.src)
      // console.log(images)
      ImagePreview({
        images: [
          e.target.src
        ],
        closeable: true,
      });
    },

    //获取订阅二维码
    getsubscribe() {
      let data = {
        relics_id: this.id,
      }
      api.postsubscribe(this.qs.stringify(data)).then((res) => {
        if (res.status == 200) {
          this.subscribe = res.data
        }
      });
    },
    //取消订阅
    unsubscribe() {
      let data = {
        relics_id: this.id,
      }
      api.postunsubscribe(this.qs.stringify(data)).then((res) => {
        if (res.status == 200) {
          // console.log(res)
          Toast.success('取消订阅成功');
          this.relicsDataInfo.subscribe = 0;
          this.relicsDataInfo.subscribe_count = this.relicsDataInfo.subscribe_count - 1;
        }
      });
    },
    handleVisiable(e) {
      if (e.target.visibilityState === 'visible') {
        // 要执行的方法
        this.relicsInfo();
        this.getsubscribe();
        this.wrapper_show =false;
      }
    }
  }
};
