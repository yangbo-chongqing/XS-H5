import api from '@/request/xsdt';
import { Step, Steps ,List} from 'vant';
export default {
  name:'Home',
  components: {
    VanStep:Step,
    VanSteps:Steps,
    VanList:List,
  },
  data() {
    return {
      muse_id: this.$route.query.muse_id,
      problemData:[],
      page: 1,
      page_size: 10,
      loading: false,
      finished: false,
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
    // getProblemData(){
    //   let datas = {
    //     page_size: 10,
    //     page: this.page,
    //     type: 1,
    //   }
    //   api.postWorkorderList(this.qs.stringify(datas)).then((res) => {
    //     if(res.status == 200){
    //       // console.log(res)
    //       this.problemData = res.data.list.data
    //       // console.log(this.problemData)
    //     }
    //     // 加载状态结束
    //     this.loading = false;
    //     //
    //     // 数据全部加载完成
    //     if (res.data.list.length < this.page_size) {
    //       this.finished = true;
    //     } else {
    //       this.page++;
    //     }
    //   })
    // },
    getProblemData () {
      // console.log(1)
      let datas = {
        page_size: 10,
        page: this.page,
        type: 1,
      }
      api.postWorkorderList(this.qs.stringify(datas)).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          this.total = this.total += res.data.list.length
          // console.log(res.data.list.data[1])
          for (let i = 0; i < res.data.list.data.length; i++) {
            console.log(res.data.list.data[i])
            this.problemData.push(res.data.list.data[i]);
          }
          // this.keyword = '';
          this.page = datas.page
          //         console.log(this.commentList)
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


  }
};
