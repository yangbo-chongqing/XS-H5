import api from '@/request/xsdt';
import { Field,Button  } from 'vant';
export default {
  name: 'Report',
  components: {
    VanField:Field,
    VanButton:Button
  },
  data() {
    return {
      id: this.$route.query.id,
      muse_id:this.$route.query.muse_id,
      message:'',
      contact:'',
      loading:false,
      disable:true
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
    message(val){
      if(val!='' && this.contact!=''){
        this.disable = false;
      }
    },
    contact(val){
      if(val!='' && this.message!=''){
        this.disable = false;
      }
    }
  },
  methods: {
    //提交举报
    sumbitReport(){
      this.loading = true;
      let params = {
        muse_id:this.muse_id,
        phone: this.contact,
        content: this.message,
        service_id:this.id
      }
      api.postReportAdd(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          this.loading = false;
          this.$toast('举报成功');
        }
      });



      this.back();
    },
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
  }
};
