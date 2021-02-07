import api from '@/request/xsdt';
import {Icon, Col, Row, Form, Field, Uploader, Picker, Popup, Button, Toast} from 'vant';
import axios from "axios";
import Exif from "exif-js";
export default {
  name:'Home',
  components: {
    VanIcon: Icon,
    VanCol: Col,
    VanRow:Row,
    VanForm:Form,
    VanField:Field,
    VanUploader:Uploader,
    VanPicker:Picker,
    VanPopup:Popup,
    VanButton:Button,
    Toast:Toast,
  },
  data() {
    return {
      muse_id: this.$route.query.muse_id,
      pattern: /^1[3456789]d{9}$/,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false,
      submitData:{
        name:'',   //产品名称
        frame:'', //车架号
        productID:'',  //产品号
        questionType:'',  //问题类型
        problemDescription:'', //问题描述
        problemImg:[],  //问题图片
        phone:'',//手机号码
      },
      files:{
        name:'',
        type:'',
      },
      fileList:[],
      problemType:'',
    }
  },
  computed: {
   
  },
  created () {

  },
  mounted() {
    this.getType();
  },
  methods: {
    onConfirm(value) {
      this.submitData.questionType = value;
      this.showPicker = false;
    },
    afterRead(file) {
      file.message = '上传中...';
      // 此时可以自行将文件上传至服务器
      Toast.loading({
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
          if(file.type.split('/')[0] == 'image' ){
            Toast.clear();
            // console.log(img_url,'1111111')
            // console.log(this.fileList,'2222221')
            this.submitData.problemImg.push(img_url);
            for (let i=0;i<this.submitData.problemImg.length;i++){
              if (this.fileList[i].file.name == this.files.name){
                this.fileList[i].content=img_url;
              }
            }
          }else if(file.type.split('/')[0] == 'video' ){
            Toast.clear();

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
    //数组去重
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    // 点击提交数据
    onSubmit(){
      // console.log(this.fileList)
      let imgarr=[]
      for (let i=0;i<this.fileList.length;i++){
        imgarr.push(this.fileList[i].content);
      }
      // 判断是不是空值
      if(this.submitData.name === ""){
        Toast.fail('请输入产品名称');
        return;
      }
      if(this.submitData.frame === ""){
        Toast.fail('请输入车架号');
        return;
      }
      if(this.submitData.productID === ""){
        Toast.fail('请输入产品号');
        return;
      }
      if(this.submitData.questionType === ""){
        Toast.fail('请选择问题类型');
        return;
      }
      if(this.submitData.problemDescription === ""){
        Toast.fail('请描述问题');
        return;
      }
      if(this.submitData.phone === ""){
        Toast.fail('手机号不能为空');
        return;
      }
      let params = {
        title: this.submitData.name,
        product_name:this.submitData.name,
        frame_number:this.submitData.frame,
        product_number:this.submitData.productID,
        phone:this.submitData.phone,
        problem_type:this.submitData.questionType ,//'问题类型'
        content:this.submitData.problemDescription,
        image:JSON.stringify(imgarr),
        muse_id:this.submitData.productID,
      }
      api.submitCreate(this.qs.stringify(params)).then((res) => {
        if(res.status == 200){
          console.log(res)
          Toast.success(res.message);
          this.submitData.name='';
          this.submitData.frame='';
          this.submitData.productID='';
          this.submitData.questionType='';
          this.submitData.problemDescription='';
          this.submitData.problemImg=[];
          this.submitData.phone='';
          this.fileList='';
        }
      })
    },
    getType(){
      let params= {}
      api.postType(this.qs.stringify(params)).then((res) => {
        this.columns = res;
        // if(res.status == 200){
        //   console.log(res)
        //   // this.columns
        // }
      })
    },

  }
};
