import moment from 'moment';
import axios from 'axios'
import qs from 'qs'
import {Toast} from 'vant'
import * as qiniu from "qiniu-js";
export function getURLlist() {
  let url = window.location.href;
  let o = {};
  let queryString = url.split("?")[1];
  if (queryString) {
    queryString.split("&").forEach((item) => {
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
}
//获取七牛云上传token
export function getQiniuTk(mid, tk,suffix) {
  return new Promise((resolve, reject) => {
      let params = {
          member_id: mid,
          token: tk,
          suffix: suffix,
          device_id: 'sczp',
          bucket: 'resource'
      };
      axios.post("/api/qiniu", qs.stringify(params)).then(res => {
          let data = res.data;
          if (data.status == 200) {
              resolve(data.data.data);
          } else {
              Toast(data.msg);
              reject({upToken: '', key: ''});
          }
      }).catch(err => {
          Toast(err.message);
          reject({upToken: '', key: ''});
      })
  })
}

//上传到七牛云
export function uploadToQiniu(upToken, key, file) {
  return new Promise((resolve, reject) => {
    //上传进度
    let filePercent = 0;
    Toast.loading({
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0,
      icon: require('@/assets/images/jingdong.gif'),
      message:'已上传'+filePercent+'%'
    });
    // 上传时的配置
    var config = {
      useCdnDomain: true,
    };
    //  设置文件的配置
    var putExtra = {
      fname: key,
      params: {},
      mimeType: null
    };
    //实例化七牛云的上传实例
    var observable = qiniu.upload(file, null, upToken, putExtra, config);
    //设置实例的监听对象
    var observer = {
      //接收上传进度信息
      next(res) {
        // 上传进度
        let filePercent = parseInt(res.total.percent)
        Toast.loading({
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0,
          icon: require('@/assets/images/jingdong.gif'),
          message:'已上传'+filePercent+'%'
        });
        if (filePercent == 100) {
          Toast.clear();
        }
      },
      // 接收上传错误信息
      error(err) {
        console.log(err)
      },
      // 接收上传完成后的信息
      complete(res) {
        resolve('https://voice.xunsheng.org.cn/' + res.key);
      }
    };
    // 上传开始
    var subscription = observable.subscribe(observer);
  })
}
export function parseQuery() {
  let url = window.location.href;
  let o = {};
  let queryString = url.split("?")[1];
  if (queryString) {
    queryString.split("&").forEach((item) => {
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
}
// 工具方法
const utils = {
  
  /**
   * 获取url中的参数
   */
  getUrlQuery: function() {
    var qs = location.search.length > 0 ? location.search.substring(1) : '',
      args = {},
      //取得每一项
      items = qs.length ? qs.split('&') : [],
      item = null,
      name = null,
      value = null,
      //在 for 循环中使用
      i = 0,
      len = items.length;
    for (i = 0; i < len; i++) {
      item = items[i].split('=');
      name = decodeURIComponent(item[0]);
      value = decodeURIComponent(item[1]);
      if (name.length) {
        args[name] = value;
      }
    }
    return args;
  },
  /**
   * 返回含有年月日的对象
   * @param time 时间戳
   */
  getDateObj: function(time) {
    var date = new Date(time);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      text: date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日',
    };
  },
  /**
   * 阿拉伯数字转换汉字数字
   * @param num 阿拉伯数字
   */
  arabToCnNumber: function(num) {
    const data = { '0': '零', '1': '一', '2': '二', '3': '三', '4': '四', '5': '五', '6': '六', '7': '七', '8': '八', '9': '九' };
    let result = num
      .toString()
      .split('')
      .map(v => data[v] || v)
      .join('');
    return result;
  },
  /**
   * 分转元
   * @param cent 人民币元
   * @param isFloat 是否保留两位小数
   */
  centToYuan: function(cent, isFloat) {
    if (typeof cent === 'number') {
      if (isFloat === undefined) {
        return (cent / 100).toFixed(2);
      }
      if (isFloat === true) {
        return (cent / 100).toFixed(2);
      } else {
        return (cent / 100).toFixed(0);
      }
    } else {
      return cent;
    }
  },
  /**
   * 元转分
   * @param cent 人民币分
   */
  yuanToCent: function(yuan) {
    return Number(yuan) * 100;
  },
  /**
   * 校验
   */
  verify: {
    // 金额校验
    money: function(str) {
      return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(str);
    },
    // 手机号校验
    phone: function(str) {
      return /^1\d{10}$/.test(str);
    },
    // 身份证号校验
    idCard: function(str) {
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/gi.test(str);
    },
  },
  /**
   * 数字转xxxx.xxk
   * @param n 数字
   */
  numberToK: function(n) {
    if (n >= 1000) {
      var a = Math.floor(n / 1000);
      var b = Math.floor((n % 1000) / 100);
      if (b === 0) {
        return a + 'k';
      } else {
        return a + '.' + b + 'k';
      }
    } else {
      return n + '';
    }
  },
  /**
   * 为MobileSelect插件组装日期数据
   * @param start 开始日期（moment对象）
   * @param end 结束日期（moment对象）
   */
  generateDateDataForMobileSelect: function(start, end) {
    let dateArrayForMobileSelect = [];
    let dateInitObj = {};
    for (let d = 0; d < moment.duration(end.diff(start)).asDays(); d++) {
      let _start = moment(Object.assign({}, start));
      _start.add(d, 'd');
      if (!(_start.year() in dateInitObj)) {
        dateInitObj[_start.year()] = {
          [_start.month() + 1]: {
            [_start.date()]: {},
          },
        };
      } else {
        if (!(_start.month() + 1 in dateInitObj[_start.year()])) {
          dateInitObj[_start.year()][_start.month() + 1] = {
            [_start.date()]: {},
          };
        } else {
          if (!(_start.date() in dateInitObj[_start.year()][_start.month() + 1])) {
            dateInitObj[_start.year()][_start.month() + 1][_start.date()] = {};
          }
        }
      }
    }
    for (let year in dateInitObj) {
      dateArrayForMobileSelect.push({
        id: `${year}`,
        value: `${year}`,
        title: `${year}年`,
        childs: [],
      });
      for (let month in dateInitObj[year]) {
        for (let i = 0; i < dateArrayForMobileSelect.length; i++) {
          if (dateArrayForMobileSelect[i].id === year + '') {
            dateArrayForMobileSelect[i].childs.push({
              id: `${year}${month < 10 ? '0' + month : month}`,
              value: `${year}-${month < 10 ? '0' + month : month}`,
              title: `${month < 10 ? '0' + month : month}月`,
              childs: [],
            });
            break;
          }
        }
        for (let date in dateInitObj[year][month]) {
          for (let i = 0; i < dateArrayForMobileSelect.length; i++) {
            if (dateArrayForMobileSelect[i].id === year + '') {
              for (let j = 0; j < dateArrayForMobileSelect[i].childs.length; j++) {
                if (dateArrayForMobileSelect[i].childs[j].id === `${year}${month < 10 ? '0' + month : month}`) {
                  dateArrayForMobileSelect[i].childs[j].childs.push({
                    id: `${year}${month < 10 ? '0' + month : month}${date < 10 ? '0' + date : date}`,
                    value: `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`,
                    title: `${date < 10 ? '0' + date : date}日`,
                    childs: [],
                  });
                }
              }
              break;
            }
          }
        }
      }
    }
    return dateArrayForMobileSelect;
  },
  /**
   * 根据日期数组为MobileSelect插件组装日期数据
   * @param dateArr 日期数组 如['2020-03-04', '2020-03-05', '2020-04-01', '2021-01-31']
   */
  generateDateDataByDateArrayForMobileSelect: function(dateArr) {
    let dateObj = {};
    let selectData = [];
    for (let i = 0; i < dateArr.length; i++) {
      let momentDate = moment(dateArr[i]);
      let year = momentDate.year();
      let month = momentDate.month() + 1;
      let date = momentDate.date();
      if (!dateObj[year]) {
        dateObj[year] = {};
      }
      for (let j in dateObj) {
        if (parseInt(j) === year && !dateObj[year][month]) {
          dateObj[year][month] = {};
        }
        for (let z in dateObj[year]) {
          if (parseInt(z) === month) {
            dateObj[year][month][date] = {};
          }
        }
      }
    }
    for (let year in dateObj) {
      selectData.push({
        id: `${year}`,
        value: `${year}`,
        title: `${year}年`,
        childs: [],
      });
      for (let month in dateObj[year]) {
        for (let i = 0; i < selectData.length; i++) {
          if (selectData[i].id === `${year}`) {
            selectData[i].childs.push({
              id: `${year}${month < 10 ? '0' + month : month}`,
              value: `${year}${month < 10 ? '0' + month : month}`,
              title: `${month < 10 ? '0' + month : month}月`,
              childs: [],
            });
          }
          for (let date in dateObj[year][month]) {
            for (let j = 0; j < selectData[i].childs.length; j++) {
              if (selectData[i].childs[j].id === `${year}${month < 10 ? '0' + month : month}`) {
                selectData[i].childs[j].childs.push({
                  id: `${year}${month < 10 ? '0' + month : month}${date < 10 ? '0' + date : date}`,
                  value: `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`,
                  title: `${date < 10 ? '0' + date : date}日`,
                  childs: [],
                });
              }
            }
          }
        }
      }
    }
    return selectData;
  },
  /**
   * 根据日期查询该日期在MobileSelect日期数据里对应的索引值
   * @param dateData 日期数据元
   * @param target 时间戳
   */
  getDateDataForMobileSelectIndexByDate: function(dateData, target) {
    let index = [];
    for (let y = 0; y < dateData.length; y++) {
      for (let m = 0; m < dateData[y].childs.length; m++) {
        for (let d = 0; d < dateData[y].childs[m].childs.length; d++) {
          if (dateData[y].childs[m].childs[d].id == moment(Number(target)).format('YYYYMMDD')) {
            index = [y, m, d];
            break;
          }
        }
      }
    }
    return index;
  },
  /**
   * 判断是否为微信浏览器
   */
  isWeiXin: function() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 后端时间戳转前端时间戳
   * @param timestamp 后端时间戳
   */
  backendToFrontendTimestamp: function(timestamp) {
    return timestamp * 1000;
  },
  /**
   * 格式化日期
   */
  formatDate: {
    /**
     * 转为 YYYY-MM-DD hh:mm 格式
     * @param timestamp 时间戳
     */
    toYYYYMMDDhhmm: function(timestamp) {
      return moment(timestamp).format('YYYY-MM-DD HH:mm');
    },
    /**
     * 转为 YYYY-MM-DD 格式
     * @param timestamp 时间戳
     */
    toYYYYMMDD: function(timestamp) {
      return moment(timestamp).format('YYYY-MM-DD');
    },
  },
  /**
   * 时间 转换为分钟
   * @param minutes 分钟数
   */
  formatMinutes: function(minutes) {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes - days * 1440) / 60);
    const mins = minutes % 60;
    let string = '';
    if (days > 0) {
      string += `${days}天`;
    }
    if (hours > 0) {
      string += `${hours}小时`;
    }
    if (mins > 0) {
      string += `${mins}分`;
    }
    return string;
  },
};

export default utils;
