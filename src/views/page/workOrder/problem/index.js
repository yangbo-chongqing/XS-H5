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
      problemData:'',
    }
  },
  computed: {
   
  },
  created () {

  },
  mounted() {
    this.getProblemData();
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
    getProblemData(){
      let datas = {
        type: 1,
      }
      api.postWorkorderList(this.qs.stringify(datas)).then((res) => {
        if(res.status == 200){
          // console.log(res)
          this.problemData = res.data.list.data
          // console.log(this.problemData)
        }
      })
    },


  }
};
