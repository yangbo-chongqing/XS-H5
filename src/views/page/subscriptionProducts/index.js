import api from '@/request/xsdt';
import { List} from 'vant';
import axios from "axios";
export default {
  name: 'Report',
  components: {
    // VanIcon:Icon,
    VanList:List,
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      page_size: 10,
      commentList:[],
    }
  },
  computed: {

  },
  created() {
  },
  mounted() {
    this.getUser();
    this.onLoad();
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
    //数组去重
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    //获取数据
    onLoad () {
      // console.log(1)
      let data = {
        page_size: this.page_size,
        page: this.page,
      }
      api.postSubscriptionProduct(this.qs.stringify(data)).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          this.total = this.total += res.data.list.length
          // console.log(res.data.list)
          for (let i = 0; i < res.data.list.data.length; i++) {
            this.commentList.push(res.data.list.data[i]);
          }
          this.unique(this.commentList);
          this.keyword = '';
          this.page = data.page
          //         console.log(this.commentList)
        }else if (res.status == 400){

        }else if(res.status == 401){
          this.$router.push({
            path: '/toke',
          });
        }
        // 加载状态结束
        this.loading = false;
        //
        // 数据全部加载完成
        if (res.data.list.data.length < this.page_size) {
          this.finished = true;
        } else {
          this.page++;
        }
      });
    },
    getUser() {
      if (window.localStorage.getItem('storage') == null) {
        // console.log(1);
        this.Show = true;
        this.$router.push({
          path: '/toke',
        });
      }
    },

  }
};
