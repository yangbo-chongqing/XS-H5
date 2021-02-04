import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    // 旅游导图预览
    path: '/imagepre',
    name: 'ImagePre',
    component: () => import('@/views/page/imagePre/index.vue'),
    meta: {
      title: '寻声扫码',
      keepAlive: false,
    },
  },
  {
    // 首页
    path: '/home',
    name: 'Home',
    component: () => import('@/views/page/home/index.vue'),
    meta: {
      title: '寻声扫码',
      keepAlive: false,
    },
  },
  {
    // 首页
    path: '/entryvideo',
    name: 'EntryVideo',
    component: () => import('@/views/page/entryvideo/index.vue'),
    meta: {
      title: '视频预览',
      keepAlive: false,
    },
  },
  {
    // 词条详情
    path: '/entrylist',
    name: 'EntryList',
    component: () => import('@/views/page/entrylist/index.vue'),
    meta: {
      title: '寻声扫码',
      keepAlive: false,
    },
  },
  {
    // 举报
    path: '/report',
    name: 'Report',
    component: () => import('@/views/page/report/index.vue'),
    meta: {
      title: '寻声扫码',
      keepAlive: false,
    },
  },
  {
    // 词条详情
    path: '/entryinfo',
    name: 'Entryinfo',
    component: () =>  import('@/views/page/entryinfo/index.vue'),
    meta: {
      title: '寻声扫码',
      keepAlive: false,
    },
  },
  {
    // 产品详情
    path: '/product',
    name: 'Product',
    component: () => import('@/views/page/product/index.vue'),
    meta: {
      title: '寻声扫码',
      keepAlive: false,
    },
  },
  {
    // 产品详情
    path: '/demo',
    name: 'demo',
    meta: {
      title: '寻声扫码',
      keepAlive: false,
    },
  },
  {
    // pdf预览
    path: '/pdf',
    name: 'Pdf',
    component: () => import('@/views/page/pdf/index.vue'),
    meta: {
      title: '寻声扫码',
      keepAlive: false,
    },
  },
  {
    // 相关视频
    path: '/video',
    name: 'video',
    component: () => import('@/views/page/video/index.vue'),
    meta: {
      title: '相关视频',
      keepAlive: false,
    },
  },
  {
    // 相关视频
    path: '/productDetails',
    name: 'productDetails',
    component: () => import('@/views/page/productDetails/index.vue'),
    meta: {
      title: '寻声扫码',
      keepAlive: false,
    },
  },
  {
    // 获取toke
    path: '/toke',
    name: 'toke',
    component: () => import('@/views/page/toke/Authorize.vue'),
    meta: {
      title: '寻声扫码',
      keepAlive: false,
    },
  },
  // {
  //   // 获取toke
  //   path: '/111',
  //   name: '111',
  //   component: () => import('@/views/page/toke/111.vue'),
  //   meta: {
  //     title: '寻声扫码',
  //     keepAlive: false,
  //   },
  // },
  {
    // 词条管理
    path: '/dataSearcartEdit',
    name: 'dataSearcartEdit',
    component: () => import('@/views/page/dataSearcartEdit/index.vue'),
    meta: {
      title: '寻声扫码',
      keepAlive: false,
    },
  },
  {
    // 下载二维码
    path: '/editcode',
    name: 'editcode',
    component: () => import('@/views/page/editcode/index.vue'),
    meta: {
      title: '寻声扫码',
      keepAlive: false,
    },
  },
  {
    // 词条编辑
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/page/editor/index.vue'),
    meta: {
      title: '寻声扫码',
      keepAlive: false,
    },
  },
  {
    // 用户行为轨迹
    path: '/behaviorTrack',
    name: 'behaviorTrack',
    component: () => import('@/views/page/behaviorTrack/index.vue'),
    meta: {
      title: '寻声扫码',
      keepAlive: false,
    },
  },
  {
    // 扫描量统计
    path: '/scanStatistics',
    name: 'scanStatistics',
    component: () => import('@/views/page/scanStatistics/index.vue'),
    meta: {
      title: '扫描量统计',
      keepAlive: false,
    },
  },
  {
    // 工单系统
    path: '/workOrder',
    name: 'workOrder',
    component: () => import('@/views/page/workOrder/index.vue'),
    meta: {
      title: '工单系统',
      keepAlive: false,
    },
  },
  {
    // 工单系统问题显示
    path: '/workOrderProblem',
    name: 'problem',
    component: () => import('@/views/page/workOrder/problem/index.vue'),
    meta: {
      title: '工单系统',
      keepAlive: false,
    },
  },
  {
    // 工单系统问题详情
    path: '/questionDetails',
    name: 'questionDetails',
    component: () => import('@/views/page/workOrder/problem/questionDetails/index.vue'),
    meta: {
      title: '工单系统',
      keepAlive: false,
    },
  },

  {
    // 工单问题提交
    path: '/workOrderSubmit',
    name: 'submit',
    component: () => import('@/views/page/workOrder/submit/index.vue'),
    meta: {
      title: '工单系统',
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
  mode: 'history',
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
