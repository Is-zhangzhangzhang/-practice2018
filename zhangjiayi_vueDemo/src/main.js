import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import iView from 'iview'
import 'iview/dist/styles/iview.css'    // 使用 CSS

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(Vuex)

let store = new Vuex.Store({
    state:{
        loginStatus:'登录'
    },
    mutations:{
        changeLoginStatus(state,name){
            state.loginStatus=name;
        }
    }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})