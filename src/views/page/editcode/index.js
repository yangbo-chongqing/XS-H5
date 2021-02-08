import api from '@/request/xsdt';
import { Icon  } from 'vant';
import html2canvas from 'html2canvas';
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
      html2canvas(this.$refs.imageDom, {
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
      }).then(canvas => {
        let imgData = canvas.toDataURL("image/jpg");
        this.savePic(imgData);
        // window.location.href = imgData;
        // console.log(imgData)
      })
    },
    savePic(Url){
      // Url = this.dialogImgUrl //图片路径，也可以传值进来
      let triggerEvent = "touchstart"; //指定下载方式
      let blob=new Blob([''], {type:'application/octet-stream'}); //二进制大型对象blob
      let url = URL.createObjectURL(blob); //创建一个字符串路径空位
      let a = document.createElement('a'); //创建一个 a 标签
      a.href = Url;  //把路径赋到a标签的href上
      //正则表达式，这里是把图片文件名分离出来。拿到文件名赋到a.download,作为文件名来使用文本
      a.download = Url.replace(/(.*\/)*([^.]+.*)/ig,"$2").split("?")[0];
      /* var e = document.createEvent('MouseEvents');  //创建事件（MouseEvents鼠标事件）
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); //初始化鼠标事件（initMouseEvent已弃用）*/

      //代替方法。创建鼠标事件并初始化（后面这些参数我也不清楚，参考文档吧 https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent）
      let e = new MouseEvent('click', ( true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null));
      //派遣后，它将不再执行任何操作。执行保存到本地
      a.dispatchEvent(e);
      //释放一个已经存在的路径（有创建createObjectURL就要释放revokeObjectURL）
      URL.revokeObjectURL(url);
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
      // console.log(aLink)
      document.body.removeChild(aLink);
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
