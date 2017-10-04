import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/User/Login.vue'
import SignUp from '@/components/User/SignUp.vue'
import Password from '@/components/User/Password.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignUp
    },
    {
      path: '/password',
      name: 'Password',
      component: Password
    }
  ],
  mode: 'history'
})
