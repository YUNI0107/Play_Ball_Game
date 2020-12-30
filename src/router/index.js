import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Login from '../views/Login/Login.vue'
import Record from '../views/Record/Record.vue'
import FootBall from '../views/FootBall/FootBall.vue'
import BasketBall from '../views/BasketBall/BasketBall.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
