import api from '@/request/xsdt';
import { Icon, Col, Row } from 'vant';
export default {
  name:'Home',
  components: {
    VanIcon: Icon,
    VanCol: Col,
    VanRow:Row
  },
  data() {
    return {
      id: this.$route.query.id,
      dataInfo: '',
      pdfUrl:'',
    }
  },
  computed: {
   
  },
  created () {
  },
  mounted() {
    this.museinfo()
  },
  methods: {
    //页面跳转
    jumpRoute(path, obj) {
      this.$router.push({
        path: path,
        query: {
          ...obj
        }
      })  
    },
    museinfo() { 
      let params = {
        id: this.id
      }
      api.postDetails(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          this.dataInfo = res.data.data;
          this.pdfUrl = res.data.data.manual.file
          document.title = res.data.data.name;
        }
      });
    }
  }
};
