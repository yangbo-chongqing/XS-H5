<template>
    <div class="authorize">
        <van-loading size="24px">授权中...</van-loading>
    </div>
</template>

<script>
    import {parseQuery} from '@/utils/utils.js'
    // import {cookie} from 'vux'
    import {Loading} from 'vant'
    import api from '@/request/xsdt';

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
    if (!parseQuery().code && from.path !== '/') {
      localStorage.setItem(
        "apph5_recirect_url",
        JSON.stringify({ path: path, query: query, params: params })
      );
    }
    next();
  },
  mounted() {
    let url = parseQuery(window.location.href);
    this.code = url.code;
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
      api.postUser(this.qs.stringify(params))
        .then((res) => {
          let data = res.data;
          if (res.status == 200) {
            let value = {
              token: data.token,
              user_id: data.user_id,
            };
            window.localStorage.setItem("storage", JSON.stringify(value));
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
          }
        })
        .catch((err) => {
          // this..toast.show({type: 'text', text: '网络错误'});
        });
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