import Vue from 'vue';
import { Toast } from 'vant';

let loadingCount = 0;
Vue.use(Toast);

const startLoading = () => {
    Toast.loading({
        message: '上传中...',
        forbidClick: true,
        loadingType: 'spinner',
    });
};

const endLoading = () => {
    Toast.clear();
};

export const showLoading = () => {
    if (loadingCount === 0) {
        startLoading();
    }
    loadingCount += 1;
};

export const hideLoading = () => {
    if (loadingCount <= 0) {
        return;
    }
    loadingCount -= 1;
    if (loadingCount === 0) {
        endLoading();
    }
};
export const parseQuery = (url) => {
    let o = {};
    let queryString = url.split("?")[1];
    if (queryString) {
        queryString.split("&").forEach(item => {
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
};