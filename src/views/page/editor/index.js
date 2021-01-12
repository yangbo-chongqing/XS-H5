import api from '@/request/xsdt';
import { Icon , Col, Row , Search , List , Popup   } from 'vant';
import html2canvas from 'html2canvas';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
html2canvas(document.body).then(function(canvas) {
  document.body.appendChild(canvas);
});

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
      a:'',
      content: "测试文章内容",
      editorOption:{
        modules:{
          toolbar:[
            ['image' ,'video' ,'bold', 'italic', 'underline', 'strike' , 'align' ,'direction' ,  ],[{ 'header': [1, 2, 3, 4, 5, 6, false] }],[{ 'size': ['small', false, 'large', 'huge'] }], // toggled buttons
          ]
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
  },
  methods: {
    showPopup(){
      this.show = true;
    },
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    getdata(){
        // console.log(1)
        let data = {
          relics_id:this.relics_id,
        }
        api.postEntryDetails(this.qs.stringify(data)).then((res) => {
          console.log(res)
          if (res.status == 200) {
            console.log(res)
          }
        });
    },

  }
};
