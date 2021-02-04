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
      muse_id: this.$route.query.muse_id,

    }
  },
  computed: {
   
  },
  created () {

  },
  mounted() {

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


  }
};
