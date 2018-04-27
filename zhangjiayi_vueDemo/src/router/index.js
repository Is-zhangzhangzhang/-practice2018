import Vue from 'vue'
import Router from 'vue-router'
import  login from '../components/login.vue'
import main from '../components/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
        path:'/main',
        name:'main',
        component:main
   }
  ]
})
