import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList.vue'
import Cart from '@/views/Cart.vue'
import Address from '@/views/Address.vue'
import OrderConfirm from '@/views/OrderConfirm.vue'
import OrderSuccess from '@/views/OrderSuccess.vue'

import axios from 'axios';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/OrderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/OrderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    },
  ]
});

// 判断是否需要登录权限以及是否登录
router.beforeEach((to, from, next) => {
  axios.get("http://localhost:3000/users/checkLogin").then(response => {
    var res = response.data;
    if(res.status == '0'){
      next();
    } else {
      if(to.fullPath == '/goods'){
        next()
      } else {
        next({path: '/goods'})
      }
    }
  })
})

export default router;
