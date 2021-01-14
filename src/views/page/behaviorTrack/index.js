import api from '@/request/xsdt';
import {parseQuery} from '@/utils/utils.js'
import { Icon , Col, Row , Search  , Field } from 'vant';
export default {
  name:'Home',
  components: {
    VanIcon: Icon ,
    VanCol: Col,
    VanRow:Row,
    VanSearch:Search,
    VanField:Field,

  },
  data() {
    return {
      id: this.$route.query.id,
      showaxis:true,
      showvisit:false,
      userdata:'',
      timeData:[],
      recentVisit:[],
      user_id:'',
      muse_id:'',
    }
  },
  computed: {

  },
  created () {
    localStorage.setItem('id',this.id)

  },
  mounted() {
    this.museinfo();
  },
  methods: {
    museinfo(){
      let storage = window.localStorage.getItem('storage')
      this.user_id = JSON.parse(storage).user_id;
      let url = parseQuery(window.location.href);
      this.muse_id = url.muse_id;
      let data = {
        muse_id:this.muse_id,
        user_id:this.user_id,
      }
     api.postBehaviorTrack(this.qs.stringify(data)).then((res) => {
       // console.log(res)
        if (res.status === 200) {
          for( let i=0;i<res.data.data.length;i++){
            if(res.data.data[i].list.length >0){
              this.timeData.push(res.data.data[i]);
            }
          }
          this.userdata = res.data.user_info;
          this.recentVisit = res.data.statistics
       }else if(res.status === 401){
          this.$router.push({
            path: '/toke',
          });
        }
      });
    },
    show(e,index){
      if(index === 1){
        this.showaxis = true;
        this.showvisit = false;
      }else if(index === 2){
        this.showaxis = false;
        this.showvisit = true;
      }
    },
    getUser() {
      // let storage = {
      //   'code':'3ce36580b51083ba3e7e636b4f808d14',
      //   'user_id':399,
      // }
      // window.localStorage.setItem('storage',JSON.stringify(storage))
      if (window.localStorage.getItem('storage') == null) {
        // console.log(1);
        // this.Show = true;
        this.$router.push({
          path: '/toke',
        });
      }
    },

  }
};
