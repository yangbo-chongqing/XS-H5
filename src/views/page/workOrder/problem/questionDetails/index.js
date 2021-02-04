import api from '@/request/xsdt';
import { Icon, Col, Row , Field , Button ,Uploader } from 'vant';
export default {
  name:'Home',
  components: {
    VanIcon: Icon,
    VanCol: Col,
    VanRow:Row,
    VanField:Field,
    VanButton:Button,
    VanUploader:Uploader,
  },
  data() {
    return {
      muse_id: this.$route.query.muse_id,
      message:'',
      smallShuw:false,
      chat_show:false,
    }
  },
  computed: {
   
  },
  created () {

  },
  mounted() {

  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },


  },
  watch:{
    message:function (){
      if(this.message==''){
        this.smallShuw = false;
      }else {
        this.smallShuw = true;
      }
    }
  }

};
