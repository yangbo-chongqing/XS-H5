import api from '@/request/xsdt';
import { Icon , Col, Row , Search , List , Popup , Uploader  } from 'vant';
import html2canvas from 'html2canvas';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import axios from "axios";
html2canvas(document.body).then(function(canvas) {
  // document.body.appendChild(canvas);
});
// const toolbarOptions = ['bold', 'italic', 'underline','link' , 'image' ,'video' ,'strike'  , { 'align': 'center'} ,{ 'align': 'right'}  ,{ 'list': 'ordered'}, { 'list': 'bullet' },{ 'header': 1 }, { 'header': 2 } ,'clean'];
export default {
  name:'Home',
  components: {
    VanIcon: Icon ,
    VanCol: Col,
    VanRow:Row,
    VanSearch:Search,
    VanList:List,
    VanPopup:Popup,
    VanUploader:Uploader,
    quillEditor:quillEditor,
  },
  data() {
    return {
      id: this.$route.query.id,
      relics_id:this.$route.query.muse_id,
      show: false,
      value:'',
      editor_data:'',
      A_show:false,
      name:'',
      edit_show:false,
      entrySelectData:[],
      content: "",
      editorOption:{
        placeholder: "写点什么",
        modules:{
          toolbar:{
            container: "#toolbar",
            handlers: {
              'image': function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  // console.log(document.querySelector('.van-uploader input'))
                  document.querySelector('.van-uploader input').click()
                } else {
                  this.quill.format('image', false);
                }
              },
              'video': function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  // console.log(document.querySelector('.van-uploader input'))
                  // document.querySelector('.Upload-video').setAttribute('display','')
                  document.querySelector('.Upload-video').setAttribute('style','display:inline-block')
                } else {
                  this.quill.format('image', false);
                }
              },
            }
          }
        }
      }
    }
  },
  computed: {

  },
  created () {
    localStorage.setItem('id',this.id)
    localStorage.setItem('relics_id',this.relics_id)

  },
  mounted() {
    this.getdata();
    this.getUser();
    // this.getpolicy();
  },
  methods: {
    showPopup(){
      this.show = true;
    },
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    //搜索相关词条
    getSearch(){
      let data = {
        keyword:this.value,
      }
      if(this.value !== undefined){
        api.postrelated(this.qs.stringify(data)).then((res) => {
          // console.log(res)
          if (res.status === 200) {
            console.log(res.data.info)
            this.editor_data = res.data.info;
            if(this.editor_data.content !== ''){
              this.content = this.editor_data.content;
            }
            this.name = this.editor_data.name;
            this.entrySelectData = this.editor_data.related_list;
          }
        });
      }
    },
    getUser(){

    },
    a(){
      document.querySelector('.Upload-video').setAttribute('style','display:none')
    },
    //上传图片
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.getpolicy(file.file);
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
        console.log(res)
        if (res.status == 200) {
         console.log(res)
          let img_url = 'https://voice.xunsheng.org.cn/'+ res.data.key;
         console.log(img_url)
        } else {
          // this.$util.message("err", res.message);
        }
      })

    },
    // 获取数据
    getdata(){
        // console.log(1)
        let data = {
          relics_id:this.id,
        }
        console.log(this.relics_id !== undefined)
        if(this.relics_id !== undefined){
          api.postEntryDetails(this.qs.stringify(data)).then((res) => {
            // console.log(res)
            if (res.status === 200) {
              console.log(res.data.info)
              this.editor_data = res.data.info;
              if(this.editor_data.content !== ''){
                this.content = this.editor_data.content;
              }
              this.name = this.editor_data.name;
              this.entrySelectData = this.editor_data.related_list;
            }
          });
        }
    },
    // 修改提交数据
    modifyEntryDetails(){
      let data = {
        id:this.id,
        name:this.name,
        image:'',
        voice_url:'',
        video_url:'',
        content:this.content,
        related_ids:'',
        type_id:0,
      }
      api.modifyEntryDetails(this.qs.stringify(data)).then((res) => {
        // console.log(res)
        if (res.status === 200) {
          console.log(res)
        }
      });
    },
    toolbarShow(){
      if(this.edit_show){
        this.edit_show = false ;
      }else {
        this.edit_show = true ;
      }
    },
  }
};
