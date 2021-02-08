// import api from '@/request/xsdt';
export default {
  name:'Home',
  components: {

  },
  data() {
    return {
      // muse_id: this.$route.query.muse_id,
    }
  },
  computed: {
   
  },
  created () {

  },
  mounted() {

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


  }
};
