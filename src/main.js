// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Vuex from 'vuex'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from  'vue-infinite-scroll'

axios.defaults.withCredentials = true;

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
    nickName: '',
    cartCount: 0
  },
  mutations: {
    // 更新用户信息
    updateUserInfo(state, nickName){
      state.nickName = nickName;
    },
    updateCartCount(state, cartCount){
      state.cartCount += cartCount;
    },
    clearCartCount(state){
      state.cartCount = 0;
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  mounted(){
    this.checkLogin();
    this.getCartCount();
  },
  methods:{
    checkLogin(){
      axios.get("http://localhost:3000/users/checkLogin").then(res=> {
        var res = res.data;
        if (res.status == "0") {
          this.$store.commit("updateUserInfo", res.result);
        }else{
          if(this.$route.path!="/goods"){
            this.$router.push("/goods");
          }
        }
      });
    },
    getCartCount(){
      axios.get("http://localhost:3000/users/getCartCount").then(res=>{
        var res = res.data;
        if(res.status=="0"){
          this.$store.commit("updateCartCount",res.result);
        }
      });
    }
  }
})
