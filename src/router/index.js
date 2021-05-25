import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Login from '../views/Login/Login.vue'
import Record from '../views/Record/Record.vue'
import FootBall from '../views/FootBall/FootBall.vue'
import BasketBall from '../views/BasketBall/BasketBall.vue'
import Tennis from '../views/Tennis/Tennis.vue'
import VolleyBall from '../views/VolleyBall/VolleyBall.vue'
import TableTennis from '../views/TableTennis/TableTennis.vue'
import Product from '../views/Product/Product.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      // 判斷登入後跳轉到相揪頁面
      let isAuthenticated = store.state.login_state;
      if(isAuthenticated == true){
        next({
            name: 'Record'
        })
      }else{
        next();
      }
    }
  },
  {
    path: '/record',
    name: 'Record',
    component: Record,
    beforeEnter: (to, from, next) => {
      // 判斷登入後跳轉到相揪頁面
      let isAuthenticated = store.state.login_state;
      if(isAuthenticated == false){
        next({
            name: 'Login'
        })
      }else{
        next();
      }
    }
  },
  {
    path: '/football',
    name: 'FootBall',
    component: FootBall,
  },
  {
    path: '/basketball',
    name: 'BasketBall',
    component: BasketBall,
  },
  {
    path: '/tennis',
    name: 'Tennis',
    component: Tennis,
  },
  {
    path: '/volleyball',
    name: 'VolleyBall',
    component: VolleyBall,
  },
  {
    path: '/tabletennis',
    name: 'TableTennis',
    component: TableTennis,
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
