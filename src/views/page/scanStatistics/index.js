import api from '@/request/xsdt';
import { Icon, Col ,Calendar , Cell} from 'vant';
import LineChart from './components/LineChart';
import global from "@/global";

export default {
  name:'Home',
  components: {
    VanIcon: Icon,
    VanCol: Col,
    LineChart,
    VanCalendar:Calendar,
    VanCell:Cell,
  },
  data() {
    return {
      dateTabIndex:'',
      time_data:'',
      start_time:'',
      end_time:'',
      chartData:[],     //web端扫码统计
      relics_list:[],  //排行榜
      statistics:'',  //web工作台统计
      show: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2200, 0, 31),
    }
  },
  computed: {
   
  },
  created () {

  },
  mounted() {
    // this.getUserInfo()
    this.getUser();
    this.toggleDate(4)
    this.getworkbench()
  },
  methods: {
    museinfo() { 
      let params = {
        start_time:this.start_time,
        end_time:this.end_time,
      }
      api.poststatistics(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          // console.log(res.data.relics_list)
          this.chartData = res.data.date;
          this.relics_list = res.data.relics_list;
        } else if(res.status == 401){
          this.$router.push({
            path: '/toke',
          });
        }
      });
    },
    getworkbench() {
      api.postworkbench(this.qs.stringify()).then((res) => {
        if (res.status == 200) {
          this.statistics = res.data;
          // console.log(this.statistics)
        } else if(res.status == 401){
          this.$router.push({
            path: '/toke',
          });
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
      this.time_data = this.start_time + "-" + this.end_time;
      this.museinfo();
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
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.time_data = `${this.formatDate(start)} - ${this.formatDate(end)}`;
      // console.log(this.time_data.split('-'))
      this.start_time = this.time_data.split('-')[0];
      this.end_time = this.time_data.split('-')[1];
      this.time_data = this.start_time + "-" + this.end_time;
      this.dateTabIndex = 5;
      this.museinfo();
    },
    formatDate(date) {
      return `${date.getFullYear() }/${date.getMonth() + 1}/${date.getDate()}`;
    },
    //判断有无用户信息
    getUser() {
        if (window.localStorage.getItem('storage') == null) {
          // console.log(1);
          this.Show = true;
          this.$router.push({
            path: '/toke',
          });
        }

    },


  }
};
