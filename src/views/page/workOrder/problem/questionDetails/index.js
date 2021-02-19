import api from '@/request/xsdt';
import {Icon, Field, Button, Uploader} from 'vant';
import axios from "axios";
import Exif from "exif-js";
export default {
  name:'Home',
  components: {
    VanIcon: Icon,
    VanField:Field,
    VanButton:Button,
    VanUploader:Uploader,
  },
  data() {
    return {
      workorder_id: this.$route.query.workorder_id,
      message:'',
      image:[],
      smallShuw:false,
      chat_show:false,
      replyData:'',
      files:{
        name:'',
        type:'',
      },
      questionDetails:'',
      questionDetailsimg:'',
    }
  },
  computed: {
   
  },
  created () {

  },
  mounted() {
    this.getquestionDetails();
    this.scrollTop();
    // this.$nextTick(()=>{
    //   let doclass = document.getElementsByClassName("questionDetails");
    //   console.log(doclass[0].scrollHeight);
    //   doclass[0].scrollTop = doclass[0].scrollHeight;
    //   console.log(doclass[0].scrollTop);
    // })
  },

  methods: {
    afterRead(file) {
      file.message = '上传中...';
      // 此时可以自行将文件上传至服务器
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      this.files.name = file.file.name // 获取文件名
      this.files.type = file.file.type // 获取类型
      this.imgPreview(file.file)
    },
// 获取七牛云token
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
          this.image.push(img_url)
          if(file.type.split('/')[0] == 'image' ){
            this.$toast.clear();
            // console.log(img_url,'1111111')
            // console.log(this.fileList,'2222221')
            // console.log(img_url)
            this.onSubmit()
          }else if(file.type.split('/')[0] == 'video' ){
            this.$toast.clear();
          }
        } else {
          // this.$util.message("err", res.message);
        }
      })

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
    async postImg(base64) {
      let file = this.dataURLtoFile(base64)
      let formData = new window.FormData()
      formData.append('file', file);
      // 提交图片
      // Some code
      // this.fileChange(file)
      // console.log(file)
      // console.log(formData,'2')
      this.getpolicy(file);
    },
    // 提交数据
    onSubmit(){
      let datas = {
        workorder_id: this.workorder_id,
        content:this.message,
        image:JSON.stringify(this.image),
      }
      // console.log(datas)
      api.submitReply(this.qs.stringify(datas)).then((res) => {
        if(res.status == 200){
          // console.log(res)
          this.message = '';
          this.image=[];
          // this.$toast.success(res.message);
          let data_res={
            avatar:this.replyData[0].avatar,
            content:res.data.data.content,
            create_time: res.data.data.create_time,
            id: res.data.data.id,
            image: res.data.data.image,
            muse_id: res.data.data.muse_id,
            nickname: '',
            type: 0,
            user_id:res.data.data.user_id,
            workorder_id:res.data.data.workorder_id,
          }
          this.replyData.push(data_res)
        }else if(res.status == 401){
          this.$router.push({
            path: '/toke',
          });
        }
      })
    },
    //获取数据
    getquestionDetails(){
      // console.log(this.workorder_id)
      let datas = {
        workorder_id: this.workorder_id,
        type:1,
      }
      api.postWorkorderdetails(this.qs.stringify(datas)).then((res) => {
        if(res.status == 200){
          // console.log(res)
          this.questionDetails = res.data.info;
          this.questionDetailsimg = JSON.parse(res.data.info.problem_image);
          this.replyData = res.data.list.data
          // console.log(this.questionDetails)
          this.scrollTop();
        }else if(res.status == 401){
          this.$router.push({
            path: '/toke',
          });
        }
      })
    },
    //设置滚动条到底部
    scrollTop(){
      this.$nextTick(()=>{
        document.querySelector('.footer').scrollIntoView()
        // console.log(document.getElementById('scroll'))

      })

    },
    loadImageOne () {
      let that = this
      ++that.loadImage   // 设置的变量名
      console.log(that.loadImage)
      if (that.loadImage === 9) {  // 这个数据为 页面中图片的总个数
        that.scrollTop()  // 这个方法就是前面所说的最后可以去执行的方法
      }
    },
    focus(){
      // console.log(1111)
      this.chat_show = false;
    },

  },
  watch:{
    message:function (){
      if(this.message==''){
        this.smallShuw = false;
        // this.chat_show = false;
      }else {
        this.smallShuw = true;
      }
    }
  }

};
