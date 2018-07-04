import Vue from 'vue'
import Router from 'vue-router'
import {store} from '../store/store'

import Home from '@/components/Webpage/WebpageHome.vue'

import Login from '@/components/User/Login.vue'
import SignUp from '@/components/User/SignUp.vue'
import Password from '@/components/User/ForgotPassword.vue'
import NewCompany from '@/components/User/NewCompany.vue'
import NewUser from '@/components/User/NewUser.vue'

import Dashboard from '@/components/Pages/Dashboard.vue'
import DashboardHome from '@/components/Pages/Home.vue'
import Hazards from '@/components/Pages/HazardRegister.vue'
import HazardousSubstances from '@/components/Pages/HazardousSubstances.vue'
import Tasks from '@/components/Pages/Tasks.vue'
import AccountAdmin from '@/components/Pages/AccountAdmin.vue'
import AdminUserManagement from '@/components/Pages/AdminUserManagement.vue'
import IncidentReports from '@/components/Pages/IncidentReports.vue'
import NewIncident from '@/components/Pages/IncidentForm.vue'
import IncidentView from '@/components/Components/IncidentView.vue'
import TrainingRegister from '@/components/Pages/TrainingRegister.vue'
import Support from '@/components/Pages/SupportFeedback.vue'
import JobsInProgress from '@/components/Pages/JobsInProgress.vue'
import SafetyPlan from '@/components/Components/SafetyPlanView.vue'
import Master from '@/components/Pages/MasterSafetyPlan.vue'
import NewJob from '@/components/Pages/NewJob.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/password',
      component: Password
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/newUser',
      component: NewUser
    },
    {
      path: '/newCompany',
      component: NewCompany
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        console.log('auth guard')
        if (store.getters.userKey !== '') {
          next()
        } else {
          alert('Access not allowed')
          next('/login')
        }
      },
      children: [
        {
          path: '',
          component: DashboardHome
        },
        {
          path: 'hazards',
          component: Hazards
        },
        {
          path: 'hazardousSubstances',
          component: HazardousSubstances
        },
        {
          path: 'taskAnalysis',
          component: Tasks,
          beforeLeave: (to, from, next) => {
            if (store.getters.taskChanged === '') {
              next()
            } else {
              alert('You have unsaved changes' + store.getters.taskChanged)
              next(false)
            }
          }
        },
        {
          path: 'admin',
          component: AccountAdmin,
          beforeEnter: (to, from, next) => {
            if (store.getters.user.admin) {
              next()
            } else {
              alert('Access not allowed')
              next('/Pages')
            }
          }
        },
        {
          path: 'userManagement',
          component: AdminUserManagement,
          beforeEnter: (to, from, next) => {
            console.log('auth guard')
            if (store.getters.user.admin) {
              next()
            } else {
              alert('Access not allowed')
              next('/Pages')
            }
          }
        },
        {
          path: 'trainingRegister',
          component: TrainingRegister
        },
        {
          path: 'incidents',
          component: IncidentReports
        },
        {
          path: 'incidents/incident/:id',
          component: IncidentView,
          props: true
        },
        {
          path: 'newIncident',
          component: NewIncident
        },
        {
          path: 'support',
          component: Support
        },
        {
          path: 'jobs',
          component: JobsInProgress
        },
        {
          path: 'jobs/safetyplan/:id',
          name: 'safetyplan',
          component: SafetyPlan,
          props: true
        },
        {
          path: 'master',
          component: Master,
          beforeEnter: (to, from, next) => {
            if (store.getters.user.admin) {
              next()
            } else {
              alert('Access not allowed')
              next('/Pages')
            }
          }
        },
        {
          path: 'newJob',
          component: NewJob
        }
      ]
    }
  ],
  mode: 'history'
})
