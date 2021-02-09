import api from '@/request/xsdt';
import { Icon , Uploader } from 'vant';
import html2canvas from 'html2canvas';
import axios from "axios";
// html2canvas(document.body).then(function(canvas) {
//   // document.body.appendChild(canvas);
// },);
export default {
  name:'Home',
  components: {
    VanIcon: Icon ,
    // VanCol: Col,
    // VanRow:Row,
    // VanSearch:Search,
    // VanField:Field,
    VanUploader:Uploader,
    html2canvas:html2canvas,

  },
  data() {
    return {
      id: this.$route.query.id,
      keyword:'',
      loading: false,
      finished: false,
      page: 1,
      page_size: 10,
      commentList:'',
      value:'',
      cursorPos:'',
      name:'',
    }
  },
  computed: {

  },
  created () {
    localStorage.setItem('id',this.id)

  },
  mounted() {
    this.museinfo();
  },
  methods: {
    toImage() {
      this.$toast.loading({
        message: '下载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      html2canvas(this.$refs.imageDom, {
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        taintTest: true,
      }).then(canvas => {
        let imgData = canvas.toDataURL("image/jpg");
        // this.fileDownload(imgData);
        // this.savePicture(imgData)
        // window.location.href = imgData;
        // console.log(imgData)
        let file = this.dataURLtoFile(imgData);
        console.log(file)
        this.getpolicy(file);
      })
    },
    dataURLtoFile(dataurl) {
      var arr = dataurl.split(','),
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], this.commentList, {
        type:'image/png'
      })
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

          console.log(img_url,'1111111')
          // console.log(this.fileList,'2222221')
          this.fileDownload(img_url);
        }

      })

    },
    fileDownload(downloadUrl) {
      // console.log(downloadUrl)
      let aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = downloadUrl;
      aLink.download = this.commentList;
      // 触发点击-然后移除
      document.body.appendChild(aLink);
      aLink.click();
      console.log(aLink)
      document.body.removeChild(aLink);
      this.$toast.clear();
    },





    museinfo () {
      // console.log(1)
      let data = {
        id:this.id,
      }
      api.postminicode(this.qs.stringify(data)).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          this.commentList = res.data.code_url
          this.name = res.data.name
          // console.log(this.commentList)
        }
      });
    },


    inputChange(e) {
      this.cursorPos=this.getCursorPosition(e.currentTarget);
      // console.log(this.cursorPos)
      // console.log(e.currentTarget.innerText.length)
      if(e.currentTarget.innerText.length > 30){
        // this.shareTipFn(1,"内容不能超过30字");
        e.currentTarget.innerText=e.currentTarget.innerText.substr(0,30);
        this.setCursorPosition(e.currentTarget,Math.min(this.cursorPos,30));
      }
      this.content=e.currentTarget.innerText;
      this.curTextLen=this.content.length;
    },
    //获取当前光标位置
    getCursorPosition (element) {
      var caretOffset = 0;
      var doc = element.ownerDocument || element.document;
      var win = doc.defaultView || doc.parentWindow;
      var sel = win.getSelection();
      if (sel.rangeCount > 0) {//选中的区域
        var range = win.getSelection().getRangeAt(0);//获取指定的选中区域
        var preCaretRange = range.cloneRange();//克隆一个选中区域
        preCaretRange.selectNodeContents(element);//设置选中区域的节点内容为当前节点
        preCaretRange.setEnd(range.endContainer, range.endOffset);  //重置选中区域的结束位置
        caretOffset = preCaretRange.toString().length;
      }
      // console.log(caretOffset,sel.focusOffset);
      return caretOffset;
    },
    // 设置光标位置
    setCursorPosition(element, pos){
      var range = document.createRange();//创建一个选中区域
      range.selectNodeContents(element);//选中节点的内容
      if(element.innerHTML.length > 0) {
        range.setStart(element.childNodes[0], pos); //设置光标起始为指定位置
      }
      range.collapse(true);       //设置选中区域为一个点
      var selection = window.getSelection();//获取当前选中区域
      selection.removeAllRanges();//移出所有的选中范围
      selection.addRange(range);//添加新建的范围

    },


  }
};
