import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [
  {
    // 首页
    path: '/home',
    name: 'Home',
    component: () => import('@/views/page/home/index.vue'),
    meta: {
      title: '寻声地图',
      keepAlive: false,
    },
  },
  {
    // 词条详情
    path: '/entryinfo',
    name: 'Entryinfo',
    component: () => import('@/views/page/entryinfo/index.vue'),
    meta: {
      title: '寻声地图',
      keepAlive: false,
    },
  },
  {
    // 404页面
    path: '*',
    name: 'notfound',
    component: () => import('@/views/notfound/index.vue'),
    meta: {
      title: '该页面放假回家咯',
    },
  }
];
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  document.body.scrollTop = 0;
  next();
});
export default router;
