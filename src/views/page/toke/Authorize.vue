<template>
  <div class="authorize">
    <van-loading size="24px">授权中...</van-loading>
  </div>
</template>

<script>
import { parseQuery } from "@/utils/utils.js";
// import {cookie} from 'vux'
import { Loading } from "vant";
import api from "@/request/xsdt";

export default {
  name: "Authorize",
  components: {
    VanLoading: Loading,
  },
  data() {
    return {
      code: "",
      redirect_url: "",
      member_id: "",
      token: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    let { path, query, params } = from;
    if (!parseQuery().code) {
      localStorage.setItem(
        "apph5_recirect_url",
        JSON.stringify({ path: path, query: query, params: params })
      );
    }
    next();
  },
  mounted() {
    let url = this.parseQuery(window.location.href);
    this.code = url.code;
    // this.redirect_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx74558c364d6c4ccf&redirect_uri=http://xsdth5.xunsheng.org.cn/&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
    // console.log(encodeURIComponent(window.location.href.split("#")[0]))
    this.redirect_url =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx74558c364d6c4ccf&redirect_uri=" +
      encodeURIComponent(window.location.href) +
      "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
    if (!this.code) {
      window.location.replace(this.redirect_url);
    } else {
      this.getUserInfo();
    }
  },
  methods: {
    //根据code获取用户信息
    getUserInfo() {
      let params = {
        code: this.code,
      };
      api
        .postUser(this.qs.stringify(params))
        .then((res) => {
          let data = res.data;
          console.log(data);
          if (data.code == 200) {
            let value = {
              token: data.token,
              user_id: data.user_id,
            };
            window.localStorage.setItem("storage", JSON.stringify(value));
            this.$nextTick(() => {
              let router_info = JSON.parse(
                localStorage.getItem("apph5_recirect_url")
              );
              this.$router.replace({
                path: router_info.path,
                query: Object.assign(router_info.query, {
                  mid: this.member_id,
                  tk: this.token,
                }),
                params: router_info.params,
              });
            });
            //   if (data.data.success == '1') {
            //     console.log(data)
            //     this.member_id = data.data.member_id;
            //     this.token = data.data.token;
            //     let wxinfo = {
            //       "openid": data.data.pub_openid,
            //       "nickname": data.data.name,
            //       "sex": data.data.sex,
            //       "headimgurl": data.data.avatar,
            //       "unionid": data.data.wechat_open_id
            //     }
            //     localStorage.setItem('storage', JSON.stringify(wxinfo));
            //     cookie.set('member_id', data.data.member_id, {path: '/'});
            //     cookie.set('token', data.data.token, {path: '/'});
            //     cookie.set("visit_member_id", data.data.member_id, {path: '/'});
            //     cookie.set("login_account", data.data.login_account, {path: '/'});
            //     this.$nextTick(() => {
            //       let router_info = JSON.parse(cookie.get('apph5_recirect_url'));
            //       this.$router.replace({
            //         path: router_info.path,
            //         query: Object.assign(router_info.query, {mid: this.member_id, tk: this.token}),
            //         params: router_info.params
            //       });
            //     })
            //   } else {
            //     localStorage.setItem('storage', JSON.stringify(data.data));
            //     this.$router.push({path:decodeURIComponent(this.$router.query.redirect)});
            //   }
            // } else {
            // this.$vux.toast.show({type: 'text', text: data.msg});
          }
        })
        .catch((err) => {
          // this..toast.show({type: 'text', text: '网络错误'});
        });
    },
    parseQuery(url) {
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
    },
  },
};
</script>

<style scoped lang="less">
.authorize {
  text-align: center;
  padding-top: 35px;
}
</style>