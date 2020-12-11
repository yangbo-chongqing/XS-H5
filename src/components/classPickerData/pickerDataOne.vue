 <template>
  <div>
    <div class="date-picker">
      <div class="picker-top">
        <!-- <span class="picker-arrow" @click="preYear">&lsaquo; &lsaquo;</span> -->
        <span class="date-text"
          >{{ year }}年{{ month > 9 ? month : "0" + month }}月</span
        >
        <span class="picker-arrow marginleft" @click="preMonth">&lsaquo;</span>
        <span class="picker-arrow" @click="nextMonth">&rsaquo;</span>
        <!-- <span class="picker-arrow" @click="nextYear">&rsaquo;&rsaquo;</span> -->
      </div>
      <!--生成对应的月份星期表格 start-->
      <div class="picker-content">
        <table>
          <thead>
            <tr>
              <th v-for="(item, idx) in weekList" :key="'week' + idx">
                {{ getLangText(item) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="idx in weekNum" :key="'weekNum' + idx">
              <td
                v-for="m in 7"
                :key="'monthDay' + idx + '_' + m"
                :class="[
                  new Date(monthList[idx - 1][m - 1]).getMonth() + 1 == month
                    ? ''
                    : 'gray',
                  selectDate == monthList[idx - 1][m - 1] ? 'active' : '',
                ]"
                @click="onSelectDate(monthList[idx - 1][m - 1])"
              >
                <span>
                  {{
                    activeDate == monthList[idx - 1][m - 1]
                      ? "今"
                      : new Date(monthList[idx - 1][m - 1]).getDate()
                  }}
                </span>
                <small
                  class="a1"
                  v-if="
                    timeTips(
                      new Date(monthList[idx - 1][m - 1]).getFullYear(),
                      new Date(monthList[idx - 1][m - 1]).getMonth() + 1,
                      new Date(monthList[idx - 1][m - 1]).getDate()
                    ) == 1
                  "
                  >·</small
                >
                <small
                  class="a0"
                  v-if="
                    timeTips(
                      new Date(monthList[idx - 1][m - 1]).getFullYear(),
                      new Date(monthList[idx - 1][m - 1]).getMonth() + 1,
                      new Date(monthList[idx - 1][m - 1]).getDate()
                    ) == 0
                  "
                  >·</small
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
Date.prototype.format = function (fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
export default {
  name: "DatePicker",
  props: {
    langType: {
      type: String,
      default: window.localStorage.getItem("langType"),
    },
    date: {
      type: String,
      default: new Date().format("yyyy/MM/dd"),
    },
    time: {
      type: Array,
      default: [],
    },
  },
  data: () => ({
    weekList: [
      { zh: "日", en: "Sun" },
      { zh: "一", en: "Mon" },
      { zh: "二", en: "Tue" },
      { zh: "三", en: "Wed" },
      { zh: "四", en: "Thu" },
      { zh: "五", en: "Fir" },
      { zh: "六", en: "Sat" },
    ],
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),

    startDay: 0,
    endDay: 0,
    weekNum: 0,
    selectDate: new Date(new Date().format("yyyy/MM/dd 00:00")).getTime(),
    activeDate: new Date(new Date().format("yyyy/MM/dd 00:00")).getTime(),
    monthList: [],
    pickerTop: 0,
  }),
  computed: {},
  watch: {
    year() {
      this.getMonthDay();
    },
    month() {
      this.getMonthDay();
    },
  },
  methods: {
    timeTips(year, mon, data) {
      let date = "";
      if (data < 10) {
        date = year + "-" + mon + "-" + "0" + data;
      } else {
        date = year + "-" + mon + "-" + data;
      }
      for (let i = 0; i < this.time.length; i++) {
        if (this.time[i].date == date) {
          return this.time[i].status;
        }
      }
    },
    getLangText(item) {
      if (item) {
        if (this.langType == "en") {
          if (item.en && item.en.length > 1) {
            return item.en.substring(0, 1).toUpperCase() + item.en.substring(1);
          } else if (item.en && item.en.length == 1) {
            return item.en.toUpperCase();
          } else {
            return "--";
          }
        } else {
          return item.zh ? item.zh : "--";
        }
      } else {
        return "--";
      }
    },
    preYear() {
      this.year = this.year - 1;
    },
    nextYear() {
      this.year = this.year + 1;
    },
    nextMonth() {
      if (this.month == 12) {
        this.year = this.year + 1;
        this.month = 1;
      } else {
        this.month++;
      }
    },
    preMonth() {
      if (this.month == 1) {
        this.year = this.year - 1;
        this.month = 12;
      } else {
        this.month--;
      }
    },
    onConfirmDate(time) {
      this.onSelectDate(time);
      this.confirmPicker();
    },
    closePicker() {
      this.$emit("update:is-show", false);
    },
    setNow() {
      this.year = new Date().getFullYear();
      this.month = new Date().getMonth() + 1;
      this.day = new Date().getDate();
      this.selectDate = new Date(
        new Date().format("yyyy/MM/dd 00:00")
      ).getTime();
    },
    confirmPicker() {
      this.$emit("update:date", new Date(this.selectDate).format("yyyy/MM/dd"));
      this.$emit(
        "picker-result",
        new Date(this.selectDate + this.selectHour * 3600000).format(
          "yyyy/MM/dd hh:00"
        )
      );
      this.closePicker();
    },
    getMonthDay() {
      var monthFirst = new Date(this.year + "/" + this.month + "/01 00:00");
      var w = monthFirst.getDay();
      this.startDay = monthFirst.getTime() - w * 24 * 3600 * 1000;
      if (this.month == 12) {
        this.endDay = new Date(this.year + 1 + "/01-01 00:00").getTime() - 1000;
      } else {
        this.endDay =
          new Date(this.year + "/" + (this.month + 1) + "/01 00:00").getTime() -
          1000;
      }

      var monthDay = (this.endDay + 1000 - this.startDay) / (24 * 3600 * 1000);
      this.weekNum = Math.ceil(monthDay / 7);
      this.monthList = [];
      for (var i = 0; i < this.weekNum; i++) {
        var item = [];
        for (var j = 0; j < 7; j++) {
          item.push(
            this.startDay + i * 24 * 3600 * 1000 * 7 + j * 24 * 3600 * 1000
          );
        }
        this.monthList.push(item);
      }
    },
    onSelectDate(time) {
      this.year = new Date(time).getFullYear();
      this.month = new Date(time).getMonth() + 1;
      this.day = new Date(time).getDate();
      let date = "";
      if (this.day < 10) {
        date = this.year + "-" + this.month + "-" + "0" + this.day;
      } else {
        date = this.year + "-" + this.month + "-" + this.day;
      }
      for (let i = 0; i < this.time.length; i++) {
        if (this.time[i].date == date) {
          this.selectDate = time;
          this.$emit("getdate", new Date(time).format("yyyy/MM/dd"));
        }
      }
    },
  },
  mounted() {
    this.getMonthDay();
  },
};
</script>
<style scoped lang="scss">
.date-picker-bg {
  width: 100%;
  height: 100%;
}

.date-picker {
  background-color: white;
  display: block;
  padding: 10px 0 15px 0;
  .picker-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    line-height: 40px;
    .picker-arrow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      cursor: pointer;
      color: #666;
      &.marginleft {
        margin-right: 40px;
      }
      //   .iconfont {
      //     color: #8a8a8a;
      //   }
      //   .iconfont:active,
      //   .iconfont:hover {
      //     color: #388dea;
      //   }
    }

    .date-text {
      flex: 1;
      font-weight: bold;
      display: inline-block;
      text-align: left;
      font-size: 16.67px;
      text-indent: 20px;
      color: #666666;
    }
  }

  .picker-content {
    display: block;
    height: auto;
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      font-size: 15px;
      line-height: 50px !important;
      thead > tr {
        // background-color: #cedeee;
        th {
          text-align: center;
          font-weight: normal;
          color: #ccc;
          font-size: 15px;
        }
      }
      tbody {
        tr {
          color: #9a9a9a;
          td {
            cursor: pointer;
            text-align: center;
            padding: 5px 0;
            width: 25px;
            height: 30px;
            position: relative;
            span {
              display: flex;
              justify-content: center;
              align-items: center;
              margin: auto;
              width: 25px;
              height: 25px;
              border-radius: 50%;
              border: 1px solid transparent;
            }
            small {
              display: flex;
              width: 100%;
              height: 5px;
              line-height: normal;
              justify-content: center;
              align-items: center;
              font-size: 40px;
              &.a0 {
                color: #cccccc;
              }
              &.a1 {
                color: #ff80ab;
              }
            }
          }
          td.gray {
            font-weight: normal;
          }
          td.active {
            span {
              border-color: #ff80ab !important;
              background: #ff80ab !important;
              color: #fff !important;
            }
          }
        }
      }
    }
  }

  .picker-content1 {
    @extend .picker-content;
    display: flex;
    flex-direction: row;
    table {
      width: calc(100% - 40px);
    }
    .hour-list {
      display: inline-block;
      list-style: none;
      padding: 0;
      margin: 0;
      height: 100%;
      overflow-x: hidden;
      width: 40px;
      font-size: 12px;

      overflow-y: auto;
      li {
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        padding: 0 4px;
        height: 20px;
        cursor: pointer;
      }
      li:not(:last-child) {
        border-bottom: solid 1px gainsboro;
      }
      li.active {
        color: white;
        background: #388dea;
      }
    }
    .hour-list::-webkit-scrollbar {
      background: transparent;
      height: 8px;
      width: 8px;
      border: none;
    }

    .hour-list::-webkit-scrollbar-thumb {
      background: lightgray;
      border-radius: 5px;
    }
    //设置滚动条 end
  }
}
</style>