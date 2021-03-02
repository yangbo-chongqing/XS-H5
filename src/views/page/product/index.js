import api from '@/request/xsdt';
import { Icon ,ImagePreview} from 'vant';
import global from '@/global';
export default {
  name:'Home',
  components: {
    VanIcon: Icon,
    ImagePreview:ImagePreview,
  },
  data() {
    return {
      id: this.$route.query.id,
      dataInfo: '',
      pdfUrl:'',
      showVideo:false,
      url:this.parseQuery(window.location.href),
      muse_id:this.parseQuery(window.location.href).muse_id,
      product_id:this.parseQuery(window.location.href).product_id,
      expand_manual:'',
      expand_details:'',
      water_info:'',
      attention:'',    //订阅词条码(获取二维码)
      buttom:'',//底部菜单
      service:'', //售后服务
      activity_list:[], //活动集锦 3个
      activity:[], //活动集锦 全部
      evaluation_list:[],//产品评测 3个
      evaluation:[],//产品评测 全部
      problem_list:[],//常见问题 3个
      problem:[],//常见问题 全部
      shopping_list:[],//网络商城 3个
      shopping:[],//网络商城 全部
      examplevideo_list:[],//改装范例 3个
      examplevideo:[],//改装范例 3个
      activeItem:[],
      activeIndex: 0,
      extendshow:false,
      product_extend:'', //扩展字段
      productExtend:false,
      workorder:'',//判断是否开启工单
    }
  },
  computed: {
   
  },
  created () {
  },
  mounted() {
    this.museinfo();
    this.postAttention();
  },
  // watch:{
  //   $route(to,from){
  //     // this.museinfo();
  //   }
  // },
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
    museinfo() {
      let url = this.parseQuery(window.location.href);
      let muse_id = url.muse_id;
      let product_id = url.product_id;
      let params = {
        muse_id: muse_id,
        product_id:product_id,
      }
      api.postDetails(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          // console.log(res.data)
          this.dataInfo = res.data.product;
          // this.pdfUrl = res.data.product.manual.file
          if(this.dataInfo.image){
            this.dataInfo.picture.unshift(this.dataInfo.image)
          }
          document.title = res.data.product.name;
           let url = window.location.href;
          this.$global.shareToWechat(res.data.product.name, url, res.data.product.image, res.data.product.name);
          this.product_extend = res.data.product.expand.manual.length;;//扩展字段
          this.expand_manual = res.data.product.expand.manual.length;
          this.expand_details = res.data.product.expand_list.data;
          for (let i=0;i<this.expand_details.length;i++){
            if(this.expand_details[i].value){
              this.productExtend=true;
            }
          }
          this.buttom = res.data.buttom;  //底部菜单
          this.water_info = res.data.water_info;
          this.service =  res.data.service; //售后服务
          this.activity = res.data.activity_list; //活动集锦
          this.evaluation = res.data.evaluation_list;//产品评测 全部
          this.problem = res.data.problem_list;//常见问题 全部
          this.shopping = res.data.shopping_list;//网络商城 全部
          this.examplevideo = res.data.product.video;
          for (let i= 0 ;i<3 && i< res.data.activity_list.length;i++){
            this.activity_list.push(res.data.activity_list[i]); //活动集锦 3
          }
          for (let i= 0 ;i<3 && i< res.data.evaluation_list.length;i++){
            this.evaluation_list.push(res.data.evaluation_list[i]); //产品评测 3个
          }
          for (let i= 0 ;i<3 && i< res.data.problem_list.length;i++){
            this.problem_list.push(res.data.problem_list[i]); //常见问题 3个
          }
          for (let i= 0 ;i<3 && i< res.data.shopping_list.length;i++){
            this.shopping_list.push(res.data.shopping_list[i]); //网络商城 3个
          }
          for (let i= 0 ;i<3 && i< res.data.product.video.length;i++){
            this.examplevideo_list.push(res.data.product.video[i]); //网络商城 3个
          }
          // if(this.examplevideo.length>0){
          //   this.activeItem.push({'title':"改装范例"});
          // }
          // if(this.activity.length>0){
          //   this.activeItem.push({'title':"活动集锦"});
          // }
          // if(this.evaluation.length>0){
          //   this.activeItem.push({'title':"产品评测"});
          // }
          // if(this.service){
          //   this.activeItem.push({'title':"售后服务"});
          // }
          // if(this.problem.length>0){
          //   this.activeItem.push({'title':"常见问题"});
          // }
          // if(this.shopping.length>0){
          //   this.activeItem.push({'title':"网络商城"});
          // }
          // console.log(this.activeItem)
          // 判断是否开启工单
          this.workorder = res.data.workorder;
        }
      });
    },
    postAttention() {
      let url = this.parseQuery(window.location.href);
      let muse_id = url.muse_id;
      let params = {
        relics_id: muse_id,
        type:1,
      }
      api.postattention(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          // console.log(res)
          this.attention = res.data.img
          // console.log(this.attention)
        }
      });
    },
    parseQuery(url) {
      let o = {};
      let queryString = url.split("?")[1];
      if (queryString) {
        queryString.split("&").forEach(item => {
          let [key, val] = item.split("=");
          val = val ? decodeURI(val) : true;
          //          转码         无值赋值true
          if (o.hasOwnProperty(key)) {
            //   已有属性转为数组
            o[key] = [].concat(o[key], val);
          } else {
            o[key] = val;
          }
        });
      }
      return o;
    },
    onactivity(index){
      if(index==1){
        this.activity_list = this.activity;
      }else if(index==2){
        let arr = [];
        for (let i= 0 ;i<3 && i< this.activity.length;i++){
          arr.push(this.activity[i]); //网络商城 3个
        }
        this.activity_list = arr;
      }
    },
    onexample(index){
      if(index==1){
        this.examplevideo_list = this.examplevideo;
      }else if(index==2){
        let arr = [];
        for (let i= 0 ;i<3 && i< this.examplevideo.length;i++){
          arr.push(this.examplevideo[i]); //网络商城 3个
        }
        this.examplevideo_list = arr;
      }
    },
    onevaluation(index){
      if(index==1){
        this.evaluation_list = this.evaluation;
      }else if(index==2){
        let arr = [];
        for (let i= 0 ;i<3 && i< this.evaluation.length;i++){
          arr.push(this.evaluation[i]); //网络商城 3个
        }
        this.evaluation_list = arr;
      }
    },
    onproblem(index){
      if(index==1){
        this.problem_list = this.problem;
      }else if(index==2){
        let arr = [];
        for (let i= 0 ;i<3 && i< this.problem.length;i++){
          arr.push(this.problem[i]); //网络商城 3个
        }
        this.problem_list = arr;
      }
    },
    onshopping(index){
      if(index==1){
        this.shopping_list = this.shopping;
      }else if(index==2){
        let arr = [];
        for (let i= 0 ;i<3 && i< this.shopping.length;i++){
          arr.push(this.shopping[i]); //网络商城 3个
        }
        this.shopping_list = arr;
      }
    },

    setContent(e){
      e.target.parentNode.parentNode.classList.add('title-set')
      let arr=this.sibling(e.target.parentNode.parentNode)
      for(let i =0 ;i<arr.length;i++){
        arr[i].classList.remove("title-set");
      }
    },
    sibling( elem ) {
      let r = [];
      let n = elem.parentNode.firstChild;
      for ( ; n; n = n.nextSibling ) {
        if ( n.nodeType === 1 && n !== elem ) {
          r.push( n );
        }
    }

  return r;
  },
    //展开图集
    expandatlas(){
      if(this.dataInfo.picture.length>0){
        ImagePreview({
          images:this.dataInfo.picture,
          'max-zoom': 5,
          'min-zoom': 10,
          background: '#0000000',
          closeable: true,
        });
      }
    },



  }
};
