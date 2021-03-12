import api from '@/request/xsdt';
import {Field, Button, Icon} from 'vant';
import axios from "axios";
export default {
  name: 'Report',
  components: {
    VanIcon:Icon,
    VanField:Field,
    VanButton:Button
  },
  data() {
    return {
      manual_id:this.$route.query.manual_id,
      data:'',
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {
    this.getData();
  },
  watch: {

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
    //获取数据
    getData(){
      let params = {
        manual_id:this.manual_id,
      }
      api.postMenu(this.qs.stringify(params)).then((res) => {
        if(res.status == 200){
          this.data = res.data.info
        }
      })
    },

  }
};
