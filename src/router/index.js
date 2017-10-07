import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import User from '@/components/User/User.vue'
import Login from '@/components/User/Login.vue'
import SignUp from '@/components/User/SignUp.vue'
import Password from '@/components/User/Password.vue'
import NewCompany from '@/components/User/NewCompany.vue'
import NewUser from '@/components/User/NewUser.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      children: [
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
        },
        {
          path: '/newUser',
          name: 'NewUser',
          component: NewUser
        },
        {
          path: '/newCompany',
          name: 'NewCompany',
          component: NewCompany
        }
      ]
    }
  ],
  mode: 'history'
})
