import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
	redirect: '/appreciation',
    component: Home
  },
  {
    path: '/appreciation',
    name: 'Appreciation',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/appreciation/index.vue')
  },
  {
    path: '/apprecinfo',
    name: 'Apprecinfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/apprecinfo/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router