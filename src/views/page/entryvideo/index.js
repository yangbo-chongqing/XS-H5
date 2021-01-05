import api from '@/request/xsdt';
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      url: this.$route.query.url,
      player:'',
      videoObj: {
        title: ' 给老妈买的穿针器，用着很方便，轻松穿针引线',
        video_cover_url: 'https://p29-dy.byteimg.com/tos-cn-p-0015/346fb382b7bf4763832b727e8dcc9623_1608348685~tplv-dy-360p.jpeg?from=2563711402',
        video_url: 'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0200f3b0000bven8212oh4h9qmk4uug&ratio=720p&line=0'
        // video_url: "http://resource.xunsheng.org.cn/poetry/propaganda.mp4"
      }
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {
    this.getvideoCat();
  },
  watch: {

  },
  methods: {
    getvideoCat() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      let params = {
        url:this.url
      }
      api.postDouyin(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          
          this.videoObj = res.data;
          document.title = this.videoObj.title;
          
        }
      });
    },
  }
};
