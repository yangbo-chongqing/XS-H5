import axios from 'axios';
import md5 from 'js-md5';
import { Toast } from 'vant';
axios.defaults.timeout = 15000;//超时时间
//线上地址
axios.interceptors.request.use(
    config => {
        let ts = parseInt(new Date().getTime() / 1000);
        if (!config.signature) {
            config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('storage')
            if (config.method === 'post') {
                axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
                let params = config.data ? decodeURIComponent(config.data) : '';
                let cs = md5(params + '&ts=' + ts);
                if (params) {
                    config.data += '&cs=' + cs + '&ts=' + ts;
                } else {
                    config.data = 'cs=' + cs + '&ts=' + ts;
                }
            }
        }
        return config;
    }, function (error) {
        console.log(error);
        return Promise.reject('error')
    }
)
const pictureHttp = function (options) {
    return new Promise((resolve, reject) => {
        Toast.loading({
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0,
        });
        axios(options)
            .then(res => {
                res = res.data;
                Toast.clear();
                if (res.status == 200) {
                    resolve(res);
                } else {
                    Toast(res.message);
                    setTimeout(() => {
                        resolve(res);
                    }, 2000);
                }
            })
            .catch(err => {
                Toast.clear();
                Toast('服务器开小差了，稍后再试吧');
                reject(err.response);
            });
    });
}
export default pictureHttp;