import api from '@/request/xsdt';
import { Icon , Col, Row , Search  , Field } from 'vant';
import { Input } from 'element-ui';
import html2canvas from 'html2canvas';
html2canvas(document.body).then(function(canvas) {
  document.body.appendChild(canvas);
},);
export default {
  name:'Home',
  components: {
    VanIcon: Icon ,
    VanCol: Col,
    VanRow:Row,
    VanSearch:Search,
    VanField:Field,
    ElInput:Input,

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
      }).then(canvas => {
        let imgData = canvas.toDataURL("image/jpeg");
        this.fileDownload(imgData);
        console.log(imgData)
      })
    },
    fileDownload(downloadUrl) {
      let aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = downloadUrl;
      aLink.download = this.commentList + ".png";
      // 触发点击-然后移除
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
    },
    museinfo () {
      // console.log(1)
      let data = {
        id:this.id,
      }
      api.postminicode(this.qs.stringify(data)).then((res) => {
        console.log(res)
        if (res.status == 200) {
          this.commentList = res.data.code_url
          console.log(this.commentList)
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
