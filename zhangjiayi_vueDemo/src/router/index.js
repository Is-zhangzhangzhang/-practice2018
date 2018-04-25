import Vue from 'vue'
import Router from 'vue-router'
import  top from '../components/top.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'top',
      component: top
    }
  ]
})
