import api from '@/request/xsdt';
import { Icon, Col } from 'vant';
import LineChart from './components/LineChart';

export default {
  name:'Home',
  components: {
    VanIcon: Icon,
    VanCol: Col,
    LineChart,
  },
  data() {
    return {
      dateTabIndex:'',
      start_time:'',
      end_time:'',
      chartData:[
        {
          date:"01-21",
          frequency:58,
          frequencys:0,
          people:2,
        },
        {
          date:"01-21",
          frequency:1,
          frequencys:1,
          people:2,
        },
        {
          date:"01-21",
          frequency:39,
          frequencys:3,
          people:2,
        },
        {
          date:"01-21",
          frequency:39,
          frequencys:5,
          people:2,
        },
        {
          date:"01-21",
          frequency:39,
          frequencys:2,
          people:2,
        },
        {
          date:"01-21",
          frequency:39,
          frequencys:2,
          people:2,
        },
        {
          date:"01-22",
          frequency:39,
          frequencys:2,
          people:2,
        },
      ]

    }
  },
  computed: {
   
  },
  created () {

  },
  mounted() {
    this.toggleDate(4)
  },
  methods: {
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
    changes(){
      // console.log(1)
      window.document.activeElement.blur();
    },
    toggleDate(index) {
      this.dateTabIndex = index
      if (index == 1) {
        this.start_time =
            new Date().getFullYear() +
            '-' +
            (new Date().getMonth() + 1) +
            '-' +
            (new Date().getDate() - 1)
        this.end_time =
            new Date().getFullYear() +
            '-' +
            (new Date().getMonth() + 1) +
            '-' +
            (new Date().getDate() - 1)
      } else if (index == 2) {
        this.start_time =
            new Date().getFullYear() +
            '-' +
            (new Date().getMonth() + 1) +
            '-' +
            new Date().getDate()
        this.end_time =
            new Date().getFullYear() +
            '-' +
            (new Date().getMonth() + 1) +
            '-' +
            new Date().getDate()
      } else if (index == 3) {
        this.start_time = this.getLastWeek().last;
        this.end_time = this.getLastWeek().now;
      } else if (index == 4) {
        this.start_time = this.getLastMonth().last;
        this.end_time = this.getLastMonth().now;
      } else {

      }
    },
    // 获取近7天
    getLastWeek() {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;//0-11表示1-12月
      let day = now.getDate();
      let dateObj = {};
      dateObj.now = year + '-' + month + '-' + day;
      if(day - 7 <= 0){   //如果在当月7日之前
        let lastMonthDay = new Date(year, (parseInt(month) - 1), 0).getDate();    //1周前所在月的总天数
        if(month - 1 <= 0){ //如果在当年的1月份
          dateObj.last = (year - 1) + '-' + 12 + '-' + (31 - (7 - day));
        }else{
          dateObj.last = year + '-' + (month - 1) + '-' + (lastMonthDay - (7 - day));
        }
      }else{
        dateObj.last = year + '-' + month + '-' + (day -7);
      }
      return dateObj;
    },
    // 获取近一个月
    getLastMonth() {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;//0-11表示1-12月
      let day = now.getDate();
      let dateObj = {};
      dateObj.now = year + '-' + month + '-' + day;
      let nowMonthDay = new Date(year, month, 0).getDate();    //当前月的总天数
      if(month - 1 <= 0){ //如果是1月，年数往前推一年<br>　　　　
        dateObj.last = (year - 1) + '-' + 12 + '-' + day;
      }else{
        let lastMonthDay = new Date(year, (parseInt(month) - 1), 0).getDate();
        if(lastMonthDay < day){    //1个月前所在月的总天数小于现在的天日期
          if(day < nowMonthDay){        //当前天日期小于当前月总天数
            dateObj.last = year + '-' + (month - 1) + '-' + (lastMonthDay - (nowMonthDay - day));
          }else{
            dateObj.last = year + '-' + (month - 1) + '-' + lastMonthDay;
          }
        }else{
          dateObj.last = year + '-' + (month - 1) + '-' + day;
        }
      }
      return dateObj;
    }



  }
};
