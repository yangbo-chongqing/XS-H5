import api from '@/request/xsdt';
import { Icon , Col, Row , Search , List  } from 'vant';
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

  },
  data() {
    return {
      id: this.$route.query.id,

    }
  },
  computed: {

  },
  created () {
    localStorage.setItem('id',this.id)

  },
  mounted() {

  },
  methods: {



  }
};
