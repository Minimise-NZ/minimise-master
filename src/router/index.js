import Vue from 'vue'
import Router from 'vue-router'
import {store} from '../store/store'

import Home from '@/components/Webpage/WebpageHome.vue'

import Login from '@/components/User/Login.vue'
import SignUp from '@/components/User/SignUp.vue'
import Password from '@/components/User/ForgotPassword.vue'
import NewCompany from '@/components/User/NewCompany.vue'
import NewUser from '@/components/User/NewUser.vue'

import Dashboard from '@/components/Dashboard/Contractor.vue'
import DashboardHome from '@/components/Dashboard/Home.vue'
import Hazards from '@/components/Dashboard/HazardRegister.vue'
import HazardousSubstances from '@/components/Dashboard/HazardousSubstances.vue'
import Tasks from '@/components/Dashboard/Tasks.vue'
import Task from '@/components/Dashboard/Task.vue'
import AdminBilling from '@/components/Dashboard/AdminBilling.vue'
import AdminUserManagement from '@/components/Dashboard/AdminUserManagement.vue'
import IncidentReports from '@/components/Dashboard/IncidentReports.vue'
import NewIncident from '@/components/Dashboard/IncidentForm.vue'
import IncidentView from '@/components/Dashboard/IncidentView.vue'
import TrainingRegister from '@/components/Dashboard/TrainingRegister.vue'
import Support from '@/components/Dashboard/SupportFeedback.vue'
import JobsInProgress from '@/components/Dashboard/JobsInProgress.vue'
import JobDetails from '@/components/Dashboard/JobDetails.vue'
import SafetyPlan from '@/components/Dashboard/SafetyPlanView.vue'
import Master from '@/components/Dashboard/MasterSafetyPlan.vue'
import NewJob from '@/components/Dashboard/NewJob.vue'

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
      component: Login
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
          children: [
            {
              path: 'task/:index',
              component: Task,
              props: true
            }
          ]
        },
        {
          path: 'billing',
          component: AdminBilling,
          beforeEnter: (to, from, next) => {
            if (store.getters.user.admin) {
              next()
            } else {
              alert('Access not allowed')
              next('/dashboard')
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
              next('/dashboard')
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
          path: 'jobs/job/:id',
          component: JobDetails,
          props: true
        },
        {
          path: 'jobs/:jobid/:planid',
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
              next('/dashboard')
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
