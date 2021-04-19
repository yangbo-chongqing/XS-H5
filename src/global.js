import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
// 全局变量以及方法
const vglobal = function (_this) {
  return {
    //联系客服
    ContactCustomerService() {
      let a = document.createElement('a');
      a.href = 'http://p.qiao.baidu.com/cps/chat?siteId=11886636&userId=25343752&siteToken=d042e7020b074839855ca7d05c7db138';
      a.click();
      a.remove();
    },
    //判断app版本
    compareVersionEle(currVersion, targetVerison) {
      if (!currVersion || !targetVerison) return false;
      const curr = currVersion.split('.');
      const target = targetVerison.split('.');
      for (let i = 0; i < curr.length; i++) {
        if (parseInt(curr[i]) > parseInt(target[i])) {
          return true
        }
        if (parseInt(curr[i]) < parseInt(target[i])) {
          return false
        }
      }
      return true;
    },
    //判断是否安卓APP
    isIosAPP() {
      return /device_model\/iPhone|device_model\/ipad/i.test(navigator.userAgent.toLowerCase());
    },
    //判断是否IOSAPP
    isAndroidAPP() {
      return /device_model\/android/i.test(navigator.userAgent.toLowerCase());
    },
    //判断是否安卓
    isAndroid() {
      return /android/i.test(navigator.userAgent.toLowerCase());
    },
    //判断是否ios
    isIos() {
      return /(iphone|ipad|ipod|ios)/i.test(navigator.userAgent.toLowerCase()) || (/Mac OS/i.test(navigator.userAgent.toLowerCase()) && !/safari/i.test(navigator.userAgent.toLowerCase()));
    },
    //判断是否微信
    isWeixin() {
      return /micromessenger/i.test(navigator.userAgent.toLowerCase());
    },
    //判断是否支付宝
    isAli() {
      return /alipayclient/i.test(navigator.userAgent.toLowerCase());
    },
    //判断是否QQ浏览器
    isQq() {
      if (navigator.userAgent.toLowerCase().indexOf(' QQ/') > -1) {
        return true;
      } else {
        return false;
      }
    },
    //判断是否钉钉
    isDing() {
      return /(aliapp|dingtalk)/i.test(navigator.userAgent.toLowerCase());
    },
    //验证手机号
    checkIsMobile(phone) {
      return /^1[3,4,5,6,7,8,9]\d{9}$/.test(phone);
    },
    //光标错位
    scrollToTop() {
      setTimeout(function () {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100)
    },
    //cnzz事件追踪
    trackEvent(category, action) {
      if (window._czc) {
        window._czc.push(["_trackEvent", category, action]);
      }
    },
    //特殊转化分秒
    formate(endTime) {
      let secondTime = parseInt(endTime); //将传入的秒的值转化为Number
      let min = parseInt(secondTime / 60); //获取分钟，除以60取整数，得到整数分钟
      secondTime = parseInt(secondTime % 60); //获取秒数，秒数取佘，得到整数秒数
      return min + "'" + secondTime + '"';
    },
    //将秒转化为时分秒type=0中文1为：
    formateSeconds(endTime, type) {
      let secondTime = parseInt(endTime); //将传入的秒的值转化为Number
      let min = 0; // 初始化分
      let h = 0; // 初始化小时
      let result = "";
      if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        min = parseInt(secondTime / 60); //获取分钟，除以60取整数，得到整数分钟
        secondTime = parseInt(secondTime % 60); //获取秒数，秒数取佘，得到整数秒数
        if (min > 60) {
          //如果分钟大于60，将分钟转换成小时
          h = parseInt(min / 60); //获取小时，获取分钟除以60，得到整数小时
          min = parseInt(min % 60); //获取小时后取佘的分，获取分钟除以60取佘的分
        }
      }
      if (type == 0) {
        if (h == 0) {
          result = `${min.toString()}分${secondTime.toString()}秒`;
        } else {
          result = `${h.toString()}时${min.toString()}分${secondTime.toString()}秒`;
        }
      } else {
        if (h == 0) {
          result = `${min
            .toString()
            .padStart(2, "0")}:${secondTime.toString().padStart(2, "0")}`;
        } else {
          result = `${h.toString().padStart(2, "0")}:${min
            .toString()
            .padStart(2, "0")}:${secondTime.toString().padStart(2, "0")}`;
        }
      }
      return result;
    },
    //调用原生方法
    attachNative(funName, ...param) {
      try {
        if (this.isWeixin()) {
        } else {
          let [arg] = [...param];
          let isObj = !!arg && Object.prototype.toString.call(arg) === '[object Object]';
          if (this.isAndroid() && window.AndroidWebView) {
            if (isObj) {
              //安卓不能直接传对象，需转字符串
              window['AndroidWebView'][funName](JSON.stringify(...param));
            } else {
              window['AndroidWebView'][funName](...param);
            }
          } else if (this.isIos() && window.webkit) {
            window['webkit']['messageHandlers'][funName]['postMessage'](...param);
          } else {
          }
        }
      } catch (e) {
        //错误
      }
    },
    //调用原生分享功能
    appShare(title, content, url, imgUrl) {
      console.log('唤起分享');
      try {
        let params = { canShare: '1', title: title, content: content, url: url, imageUrl: imgUrl };
        if (this.isAndroid() && window.AndroidWebView) {
          window.AndroidWebView.canShare(JSON.stringify(params));
        } else if (this.isIos() && window.webkit) {
          window.webkit.messageHandlers.canShare.postMessage(params);
        } else {
        }
      } catch (e) {
        //错误
      }
    },
    //隐藏原生分享
    hideAppShare(title, content, url, imgUrl) {
      console.log('隐藏分享');
      try {
        let params = { canShare: '0', title: title, content: content, url: url, imageUrl: imgUrl };
        if (this.isAndroid() && window.AndroidWebView) {
          window.AndroidWebView.canShare(JSON.stringify(params));
        } else if (this.isIos() && window.webkit) {
          window.webkit.messageHandlers.canShare.postMessage(params);
        }
      } catch (e) {
        //错误
      }
    },
    //微信分享
    shareToWechat(shareTitle, shareLink, shareImgUrl, shareDesc) {
      console.log(shareTitle);
      console.log(shareLink);
      console.log(shareImgUrl);
      console.log(shareDesc);
      let params = {
        url: location.href.split('#')[0]
      };
      axios.post("/api/jssdk", qs.stringify(params)).then((data) => {
        if (data.data.status == 200) {
          wx.config({
            debug: false,
            appId: data.data.data.appId,
            timestamp: data.data.data.timestamp,
            nonceStr: data.data.data.nonceStr,
            signature: data.data.data.signature,
            jsApiList: [
              "openLocation",
              "getLocation",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareWeibo",
              "onMenuShareQZone",
              "hideMenuItems"
            ]
          });
          wx.ready(function () {
            wx.hideMenuItems({
              menuList: ["menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:QZone", "menuItem:share:qq", "menuItem:copyUrl", "menuItem:originPage", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:refresh"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
            //分享到朋友圈
            wx.onMenuShareTimeline({
              title: shareTitle,
              link: shareLink,
              imgUrl: shareImgUrl,
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: shareTitle,
              desc: shareDesc,
              link: shareLink,
              imgUrl: shareImgUrl,
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            //分享到QQ
            wx.onMenuShareQQ({
              title: shareTitle,
              desc: shareDesc,
              link: shareLink,
              imgUrl: shareImgUrl,
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            //分享到腾讯微博
            wx.onMenuShareWeibo({
              title: shareTitle,
              desc: shareDesc,
              link: shareLink,
              imgUrl: shareImgUrl,
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            //分享到QQ空间
            wx.onMenuShareQZone({
              title: shareTitle,
              desc: shareDesc,
              link: shareLink,
              imgUrl: shareImgUrl,
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            //隐藏复制链接、在QQ浏览器打开、在safari中打开、原网页功能按钮接口
            //				wx.hideMenuItems({
            //					menuList: ['menuItem:copyUrl', "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:originPage"]
            //				});
          })
        }
      });
    },
    //移动web/h5网页分享到qq，配置标题，内容，图片
    shareWebH5(shareTitle, shareContent, shareUrl, shareImgUrl) {
      window.setShareInfo && window.setShareInfo({
        title: shareTitle || document.title, //必填
        summary: shareContent || '寻声朗读', //必填
        pic: shareImgUrl, //必填
        url: shareUrl,
        WXconfig: {
          swapTitleInWX: true,
          appId: '',
          timestamp: '',
          nonceStr: '',
          signature: ''
        }
      });
    }
  };
};
export default vglobal;
