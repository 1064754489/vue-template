import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index.vue'
import NotFound from '@/pages/404.vue'
import Layout from '@/pages/layout/index.vue'

Vue.use(Router)

// const routerPush = Router.prototype.push;

// // 重复路由报错问题
// Router.prototype.push = function push(location) {
//   if (typeof location === "string") {
//     let Separator = "&";
//     if (location.indexOf("?") === -1) {
//       Separator = "?";
//     }
//     location = location + Separator + "random=" + Math.random();
//   } else {
//     location.query
//       ? (location.query.random = Math.random())
//       : (location.query = {});
//     location.query.random = Math.random();
//   }
//   return routerPush.call(this, location).catch((err) => err);
// };

const routes = [
  {
    name: 'layout',
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
      },
    ],
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
  },
]

const router = new Router({
  mode: 'hash',
  routes,
})

export default router
