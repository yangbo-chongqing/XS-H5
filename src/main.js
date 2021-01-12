import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vglobal from './global.js';
// rem h5 适配
import 'amfe-flexible/index.js'
import store from './store/index.js'
import qs from 'qs';
import './request/http'
import lrz from 'lrz';
//处理移动端点击延迟
import fastclick from "fastclick";
fastclick.attach(document.body);
Vue.config.productionTip = false;
import { Toast, Dialog } from 'vant';
import { Loading , Button , Table} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Loading.directive);
Vue.use(Dialog , Toast , Loading , Button , Table);

Vue.prototype.qs = qs;
Vue.prototype.$loading = Loading.service;
let vueapp = new Vue({
  store,
  router,
  render: h => h(App),
});
Vue.prototype.$global = vglobal();
vueapp.$mount('#app');
export default vueapp;
