import api from '@/request/xsdt';
import { Icon , Col, Row , Search  , Field } from 'vant';
export default {
  name:'Home',
  components: {
    VanIcon: Icon ,
    VanCol: Col,
    VanRow:Row,
    VanSearch:Search,
    VanField:Field,

  },
  data() {
    return {
      id: this.$route.query.id,
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
    museinfo(){
    let data = {
      axis:'b2e86158f775b047c663529ae79ccfbd',
      userinfo:399,
    }
   api.postBehaviorTrack(this.qs.stringify(data)).then((res) => {
     // console.log(res)
      if (res.status === 200) {
        console.log(res.data)
    }
  });
    },

  }
};
