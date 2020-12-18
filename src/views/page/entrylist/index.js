import api from '@/request/xsdt';
import { Icon, Col, Row, Swipe, SwipeItem, NavBar, List } from 'vant';
export default {
  name: 'Home',
  components: {
    VanIcon: Icon,
    VanCol: Col,
    VanRow: Row,
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    VanNavBar: NavBar,
    VanList: List
  },
  data() {
    return {
      id: this.$route.query.id,
      muse_id:this.$route.query.muse_id,
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  computed: {

  },
  created() {
  },
  mounted() {
    // this.relicsInfo()
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
    back() {
      this.$router.go(-1);
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      let params = {
        type_id: this.id,
        muse_id:this.muse_id,
        page: this.page,
        page_size: 10
      }
      api.postRelicsList(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          this.loading = false;
          this.list = this.list.concat(res.data.list)
          if(res.data.list.length<10){
            this.finished = true;
          }else{
            this.page++;
          }
          document.title = res.data.type_info.type_name
        }
      });
    },
  }
};
