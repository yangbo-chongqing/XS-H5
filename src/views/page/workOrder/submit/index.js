import api from '@/request/xsdt';
import { Icon, Col, Row , Form , Field , Uploader , Picker ,Popup , Button} from 'vant';
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
  },
  data() {
    return {
      muse_id: this.$route.query.muse_id,
      value1:'',
      phone:'',
      pattern: /^1[3456789]d{9}$/,
      uploader:'',
      value: '',
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false,
      submitData:{
        name:'',   //产品名称
        frame:'', //车架号
        productID:'',  //产品号
        questionType:'',  //问题类型
        problemDescription:'', //问题描述
        problemImg:[],  //问题图片
        phone:'',
      },
    }
  },
  computed: {
   
  },
  created () {

  },
  mounted() {

  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    afterRead(file) {
      file.message = '上传中...';
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },


  }
};
