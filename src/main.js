import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vglobal from './global.js';
// rem h5 适配
import 'amfe-flexible/index.js'
import store from './store/index.js'
import qs from 'qs';
import './request/http';
// H5 debug
// import VConsole from 'vconsole'
// const vConsole = new VConsole()
// Vue.use(vConsole)
//处理移动端点击延迟
// import fastclick from "fastclick";
// fastclick.attach(document.body);
Vue.config.productionTip = false;
import {
  Toast, Dialog, Icon, Uploader,
  Sticky,
  Field,
  Form,
  Picker,
  Popup, NavBar, Tab, Tabs, Grid, GridItem, Image as VanImage
} from 'vant';
Vue.use(Tab);
Vue.use(Grid);
Vue.use(VanImage);
Vue.use(GridItem);
Vue.use(Tabs);
Vue.use(Toast);
Vue.use(Picker);
Vue.use(Icon);
Vue.use(Uploader);
Vue.use(Sticky);
Vue.use(Dialog);
Vue.use(Field);
Vue.use(Form);
Vue.use(Popup);
Vue.use(NavBar);


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
