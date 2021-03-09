import api from '@/request/xsdt';
import { Icon,Popup,Field} from 'vant';
import draggable from 'vuedraggable'
export default {
  name: 'Report',
  components: {
    VanIcon: Icon,
    VanPopup:Popup,
    VanField:Field,
    draggable,
  },
  data() {
    return {
      id: this.$route.query.id,
      muse_id:this.$route.query.muse_id,
      enabled: true,
      timeOutEvent:'',
      options: {
        delayOnTouchOnly: true,  //开启触摸延时
        delay: 500,              //延时时长
        touchStartThreshold: 3,  //防止某些手机过于敏感(3~5 效果最好)
      },
      scanRecordListShow:false,
      rows: [],
      popupShow:false,//添加分类显示隐藏
      create:'',//添加分类字段
      start:{
        delShow:false,
        modifyname:'',//修改分类名
        history:'',//历史修改分类名
        rowindex:'',
      },
      popupHeight:'30%',
      defaultPhoneHeight:'',
      nowPhoneHeight:'',
    }
  },
  computed: {

  },
  created() {
  },
  mounted() {
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
    this.defaultPhoneHeight = window.innerHeight
    window.onresize = ()=>{
      this.nowPhoneHeight = window.innerHeight
    }
    // this.getUserInfo();
    this.getUser();
    this.onLoad();
  },
  watch: {
    nowPhoneHeight:function(){
      if(this.defaultPhoneHeight != this.nowPhoneHeight){
        //手机键盘被唤起了。
        this.popupHeight = '50%';
        // document.querySelector('.Upload-video').setAttribute('style','display:none');
        // document.querySelector('.Upload-link').setAttribute('style','display:none');
      }else{
        this.popupHeight = '30%';
        //手机键盘被关闭了。
      }
    },
  },
  methods: {
    //获取数据
    onLoad () {
      let data = {
        // name:'测试'
      }
      api.postLocusList(this.qs.stringify(data)).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          // console.log(res.data)
          this.rows = res.data;
        }else if(res.status == 401){
          this.$router.push({
            path: '/toke',
          });
        }
      });
    },
    //添加分类字段
    scanRecord_complete(){
      let data = {
        name:this.create
      }
      api.postCreate(this.qs.stringify(data)).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          // console.log(res.data)
          this.$toast.success(res.message);
          this.rows.unshift({
            count:0,
            list:[],
            muse_id:localStorage.getItem('storage').user_id,
            tag:this.create,
          })
          this.create='';
          this.popupShow=false;
        }else if(res.status == 401){
          this.$router.push({
            path: '/toke',
          });
        }
      });
    },
    //修改轨迹
    modifyTrack() {
      let data = '';
      if(arguments[0]===0){
        data = {
          id:arguments[1],
          name:arguments[2],
          type:arguments[0],
        }
      }else {
        data = {
          type:arguments[0],
          name:this.start.modifyname,
          history:this.start.history,
        }
      }
      api.postEdit(this.qs.stringify(data)).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          console.log(res)
          if(arguments[0]===1){
            this.rows[this.start.rowindex].tag = this.start.modifyname;
            this.start.delShow = false;
            this.start.modifyname = '';
            this.start.history = '';
            this.start.rowindex = '';
            this.$toast.success(res.message);
          }
        }else if(res.status == 401){
          this.$router.push({
            path: '/toke',
          });
        }
      });
    },
    //删除轨迹
    delEdit(){
      let data = '';
      if(arguments[0]===0){
        data = {
          id:arguments[1],
          type:arguments[0],
        }
      }else {
        data = {
          type:arguments[0],
          history:this.start.history,
        }
      }
      api.postDelEdit(this.qs.stringify(data)).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          // console.log(res);
          if(arguments[0]===0){
            this.rows[arguments[2]].list.splice(arguments[3],1);
          }else  if(arguments[0]===1){
            this.rows.splice(this.start.rowindex,1)
            this.start.delShow = false;
            this.start.modifyname = '';
            this.start.history = '';
            this.start.rowindex = '';
          }
          this.$toast.success(res.message);
        }else if(res.status == 401){
          this.$router.push({
            path: '/toke',
          });
        }
      });
    },
    //点击显示隐藏数据
    show(e){
      let onclick_html = e.currentTarget.nextElementSibling;
      let onclick_htmls = e.currentTarget
      // console.log(onclick_htmls)
      // console.log(e.currentTarget.nextElementSibling)
      // console.log(onclick_htmls.querySelector(".van-icon-play"))
      if(onclick_html.style.display === 'none'){
        onclick_html.style.display = 'block'
        onclick_htmls.querySelector(".van-icon-play").style.transform='rotate(90deg)'
      }else {
        onclick_html.style.display = 'none'
        onclick_htmls.querySelector(".van-icon-play").style.transform='rotate(0deg)'
      }
    },
    gotouchstart(data,rowindex){
      let that = this;
      clearTimeout(this.timeOutEvent);//清除定时器
      this.timeOutEvent = 0;
      this.timeOutEvent = setTimeout(function(){
        //执行长按要执行的内容，
        that.start.modifyname = data;
        that.start.history = data;
        that.start.rowindex = rowindex;
        that.start.delShow = true;
        console.log(data,that.start)
      },600);//这里设置定时
    },
//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gtouchend(){
      clearTimeout(this.timeOutEvent);//清除定时器
      this.timeOutEvent = 0;
    },
    add1(evt) {
      // console.log(evt.item);
      // console.log(evt.to); // 可以知道拖动的目标列表
      // console.log(evt.from); // 可以知道之前的列表
      // console.log(evt.oldIndex); // 可以知道拖动前的位置
      // console.log(evt.newIndex); // 可以知道拖动后的位置
      console.log(evt.item.dataset.id);
      console.log(evt.to.parentElement.previousElementSibling.querySelector('h4').innerHTML); // 可以知道拖动的目标列表
      this.modifyTrack(0,evt.item.dataset.id,evt.to.parentElement.previousElementSibling.querySelector('h4').innerHTML)

    },
    start2(e) {
      // console.log(e);
    },
    getUser() {
      if (window.localStorage.getItem('storage') == null) {
        // console.log(1);
        this.Show = true;
        this.$router.push({
          path: '/toke',
        });
      }
    },
    getUserInfo() {
      let value = {
        token: 'f0e69afcc33e271dc9a981d505e7ba8b',
        user_id: 4,
      };
      window.localStorage.setItem("storage", JSON.stringify(value));

      // let url = parseQuery(window.location.href);
      // let  code = url.code;
      // let params = {
      //   code: code,
      // };
      // if(code != null){
      //   api.postUser(this.qs.stringify(params))
      //       .then((res) => {
      //         let data = res.data;
      //         if (res.status == 200) {
      //           let value = {
      //             token: data.token,
      //             user_id: data.user_id,
      //           };
      //           window.localStorage.setItem("storage", JSON.stringify(value));
      //
      //           // let router_info = JSON.parse(
      //           //   localStorage.getItem("apph5_recirect_url")
      //           // );
      //           // this.$router.replace({
      //           //   path: router_info.path,
      //           //   query: Object.assign(router_info.query, {
      //           //     mid: this.member_id,
      //           //     tk: this.token,
      //           //   }),
      //           //   params: router_info.params,
      //           // });
      //         }
      //       })
      //       .catch((err) => {
      //         // this..toast.show({type: 'text', text: '网络错误'});
      //       });
      // }else {
      //   this.$router.replace({
      //     path: '/111',})
      // }
    },
  }
};
