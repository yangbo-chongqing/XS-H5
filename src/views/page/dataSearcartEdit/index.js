import api from '@/request/xsdt';
import { Icon, Col, Row , Search , List } from 'vant';
export default {
  name:'Home',
  components: {
    VanIcon: Icon,
    VanCol: Col,
    VanRow:Row,
    VanSearch:Search,
    VanList:List,

  },
  data() {
    return {
      muse_id: this.$route.query.muse_id,
      keyword:'',
      loading: false,
      finished: false,
      page: 1,
      page_size: 10,
      commentList:[],
    }
  },
  computed: {
   
  },
  created () {
    localStorage.setItem('muse_id',this.muse_id)
  },
  mounted() {
    this.onLoad();
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
    onSearch(){
      console.log(1)
      this.onLoad()
    },
    onChange(){
      console.log(11)
    },
    onLoad () {
      // console.log(1)
      let data = {
        page_size: 10,
        page: 1,
        keyword:this.keyword,
        roles:'1',
      }
      api.postEntry(this.qs.stringify(data)).then((res) => {
        console.log(res)
        if (res.status == 200) {
          this.total = this.total += res.data.list.length
          // console.log(res.data.list)
          for (let i = 0; i < res.data.list.length; i++) {
            this.commentList.push(res.data.list[i]);
          }
          this.keyword = '';
          this.page = data.page
          //         console.log(this.commentList)
        }
        // 加载状态结束
        this.loading = false;
        //
        // 数据全部加载完成
        if (res.data.list.length < this.page_size) {
          this.finished = true;
        } else {
          this.page++;
        }
      });
    },

    museinfo() {
      let params = {
        muse_id:this.muse_id
      }
      api.postMuseIndex(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          this.museDataInfo = res.data;
          let url = window.location.href;
          this.$global.shareToWechat(res.data.info.share_title, url, res.data.info.share_image, res.data.info.share_content)
          document.title = res.data.info.muse_name;
          if(this.museDataInfo.info.Introduction){
            if (this.museDataInfo.info.Introduction.length > 70) {
              this.isShowMore = true;
            }
          }
        }
      });
    },


  }
};
