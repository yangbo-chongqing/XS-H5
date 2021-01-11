import api from '@/request/xsdt';
import { Icon , Col, Row , Search , List , Popup   } from 'vant';
import html2canvas from 'html2canvas';
html2canvas(document.body).then(function(canvas) {
  document.body.appendChild(canvas);
});
export default {
  name:'Home',
  components: {
    VanIcon: Icon ,
    VanCol: Col,
    VanRow:Row,
    VanSearch:Search,
    VanList:List,
    VanPopup:Popup,
  },
  data() {
    return {
      id: this.$route.query.id,
      show: false,
      value:'',
      a:'',
    }
  },
  computed: {

  },
  created () {
    localStorage.setItem('id',this.id)

  },
  mounted() {
    this.getdata();
  },
  methods: {
    showPopup(){
      this.show = true;
    },
    changeCount(){
      if(this.a===''){
        console.log(1)
      }
    },
    getdata(){
        // console.log(1)
        let data = {
          id:this.id,
        }
        api.postEntryDetails(this.qs.stringify(data)).then((res) => {
          console.log(res)
          if (res.status == 200) {
            console.log(res)
          }
        });
    },

  }
};
