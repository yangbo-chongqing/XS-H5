<template>
    <div class="authorize">
        <van-loading size="24px">授权中...</van-loading>
    </div>
</template>

<script>
    import {getURLlist} from '@/utils/utils.js'
    import {cookie} from 'vux'
    import {Loading} from 'vant'

    export default {
        name: "Authorize",
        components: {
            VanLoading: Loading
        },
        data() {
            return {
                code: getURLlist('code'),
                redirect_url: '',
                member_id: '',
                token: ''
            }
        },
        beforeRouteEnter(to, from, next) {
            if (!getURLlist('code') && from.path !== '/') {
                let {path, query, params} = from;
                cookie.set('apph5_recirect_url', JSON.stringify({path: path, query: query, params: params}));
            }
            next();
        },
        mounted() {
            if (this.$isWeixin()) {
                if (window.location.hostname == 'test.xunsheng.org.cn') {
                    this.redirect_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx74558c364d6c4ccf&redirect_uri=' + encodeURIComponent(window.location.href.split("#")[0]) + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
                } else {
                    this.redirect_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx74558c364d6c4ccf&redirect_uri=' + encodeURIComponent(window.location.href.split("#")[0]) + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
                }
                if (!this.code) {
                    window.location.replace(this.redirect_url);
                } else {
                    this.getUserInfo();
                }
            }else {
                this.$router.replace('/LoginAndRegister');
            }
        },
        methods: {
            //根据code获取用户信息
            getUserInfo() {
                let params = {
                    code: this.code
                }
                this.axios.post('/api/fa/Xslogin/wx_get_member', this.qs.stringify(params)).then((res) => {
                    let data = res.data;
                    if (data.code == 200) {
                        if (data.data.success == '1') {
                            this.member_id = data.data.member_id;
                            this.token = data.data.token;
                            let wxinfo = {
                                "openid": data.data.pub_openid,
                                "nickname": data.data.name,
                                "sex": data.data.sex,
                                "headimgurl": data.data.avatar,
                                "unionid": data.data.wechat_open_id
                            }
                            localStorage.setItem('MY_USER_INFO', JSON.stringify(wxinfo));
                            cookie.set('member_id', data.data.member_id, {path: '/'});
                            cookie.set('token', data.data.token, {path: '/'});
                            cookie.set("visit_member_id", data.data.member_id, {path: '/'});
                            cookie.set("login_account", data.data.login_account, {path: '/'});
                            this.$nextTick(() => {
                                let router_info = JSON.parse(cookie.get('apph5_recirect_url'));
                                this.$router.replace({
                                    path: router_info.path,
                                    query: Object.assign(router_info.query, {mid: this.member_id, tk: this.token}),
                                    params: router_info.params
                                });
                            })
                        } else {
                            localStorage.setItem('MY_USER_INFO', JSON.stringify(data.data));
                            this.$router.replace('/Register');
                        }
                    } else {
                        this.$vux.toast.show({type: 'text', text: data.msg});
                    }
                }).catch(err => {
                    this.$vux.toast.show({type: 'text', text: '网络错误'});
                });

            },
        }
    }
</script>

<style scoped lang="less">
    .authorize {
        text-align: center;
        padding-top: 35px;
    }
</style>