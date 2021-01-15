import api from '@/request/xsdt';
import { Icon , Col, Row , Search , List , Popup   } from 'vant';
import html2canvas from 'html2canvas';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
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
    quillEditor:quillEditor,
  },
  data() {
    return {
      id: this.$route.query.id,
      relics_id:this.$route.query.muse_id,
      show: false,
      value:'',
      editor_data:'',
      name:'',
      entrySelectData:[],
      content: "写内容",
      editorOption:{
        modules:{
          toolbar:{
            container: "#toolbar",
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
  },
  methods: {
    showPopup(){
      this.show = true;
    },
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    getUser(){

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
  }
};
