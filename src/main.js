// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Vuex from 'vuex'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from  'vue-infinite-scroll'

import {currency} from './util/currency'
Vue.filter("currency",currency);

Vue.use(infiniteScroll);
Vue.use(Vuex);
Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: 'static/loading-svg/loading-bars.svg',
  attempt: 3, // default 1
})

const store = new Vuex.Store({
  state: {
    nickName: ''
  },
  mutations: {
    // 更新用户信息
    updateUserInfo(state, nickName){
      state.nickName = nickName;
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
