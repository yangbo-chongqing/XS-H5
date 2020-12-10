import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import { post } from './utils/http.js'

// 引入动态适配rem
import './utils/rem'

Vue.use(Vant);

// 定义$http
Vue.prototype.$http = post
Vue.prototype.$code = '200'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
