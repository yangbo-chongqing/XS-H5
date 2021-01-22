import api from '@/request/xsdt';
import { Icon, Col, Row } from 'vant';
import global from '@/global';
export default {
  name:'Home',
  components: {
    VanIcon: Icon,
    VanCol: Col,
    VanRow:Row,
  },
  data() {
    return {
      id: this.$route.query.id,
      dataInfo: '',
      pdfUrl:'',
      showVideo:false,
      url:this.parseQuery(window.location.href),
      muse_id:this.parseQuery(window.location.href).muse_id,
      pkid:this.parseQuery(window.location.href).pkid,
      expand_manual:'',
      expand_details:'',
      attention:'',    //订阅词条码(获取二维码)
    }
  },
  computed: {
   
  },
  created () {
  },
  mounted() {
    this.museinfo();
    this.postAttention();
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
      let url = this.parseQuery(window.location.href);
      let muse_id = url.muse_id;
      let pkid = url.pkid;
      let params = {
        muse_id: muse_id,
        pkid:pkid,
      }
      api.postDetails(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          this.dataInfo = res.data.product;
          // this.pdfUrl = res.data.product.manual.file
          document.title = res.data.product.name;
           let url = window.location.href;
          this.$global.shareToWechat(res.data.product.name, url, res.data.product.image, res.data.product.name)

          this.expand_manual = (res.data.product.expand.manual.length)
          this.expand_details = (res.data.product.expand.details.length)
        }
      });
    },
    postAttention() {
      let url = this.parseQuery(window.location.href);
      let muse_id = url.muse_id;
      let params = {
        relics_id: muse_id,
        type:1,
      }
      api.postattention(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          console.log(res)
          this.attention = res.data.img
          console.log(this.attention)
        }
      });
    },
    parseQuery(url) {
      let o = {};
      let queryString = url.split("?")[1];
      if (queryString) {
        queryString.split("&").forEach(item => {
          let [key, val] = item.split("=");
          val = val ? decodeURI(val) : true;
          //          转码         无值赋值true
          if (o.hasOwnProperty(key)) {
            //   已有属性转为数组
            o[key] = [].concat(o[key], val);
          } else {
            o[key] = val;
          }
        });
      }
      return o;
    }
  }
};
