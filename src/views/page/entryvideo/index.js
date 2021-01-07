import api from '@/request/xsdt';
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      url: this.$route.query.url,
      player:'',
      ifStr:'',
      videoObj: {
       
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
          this.ifStr = `javascript:void(function(){document.open();document.write("<!DOCTYPE html><html><head></head><body style='margin:0px'><video style='background: rgba(0,0,0,0.8);z-index: 999;position: absolute;width: 100vw;height: 100vh;' poster='${this.videoObj.video_cover_url}' src='${this.videoObj.video_url}' controls='controls'></video></body></html>");document.close();}())`
          console.log(this.ifStr);
          document.title = this.videoObj.title;
          
        }
      });
    },
  }
};
