import Vue from 'vue'
import Router from 'vue-router'
import {store} from '../store/store'

import Home from '@/components/Home.vue'

import Login from '@/components/User/Login.vue'
import SignUp from '@/components/User/SignUp.vue'
import Password from '@/components/User/ForgotPassword.vue'
import NewContractor from '@/components/User/NewContractor.vue'
import NewPrincipal from '@/components/User/NewPrincipal.vue'
import NewUser from '@/components/User/NewUser.vue'

import Contractor from '@/components/Contractor/Contractor.vue'
import ContractorHome from '@/components/Contractor/Home.vue'
import JobForm from '@/components/Contractor/JobForm.vue'
import Hazards from '@/components/Contractor/HazardRegister.vue'
import HazardousSubstances from '@/components/Contractor/HazardousSubstances.vue'
import Tasks from '@/components/Contractor/Tasks.vue'
import Task from '@/components/Contractor/Task.vue'

import Billing from '@/components/Shared/AdminBilling.vue'
import AdminUsers from '@/components/Shared/AdminManageUsers.vue'
import IncidentReports from '@/components/Shared/IncidentReports.vue'
import NewIncident from '@/components/Shared/IncidentForm.vue'
import IncidentView from '@/components/Shared/IncidentView.vue'
import Workers from '@/components/Shared/Workers.vue'
import Support from '@/components/Shared/SupportFeedback.vue'

import Principal from '@/components/Principal/Principal.vue'
import PrincipalHome from '@/components/Principal/Home.vue'
import NewJob from '@/components/Principal/NewJob.vue'
import Contractors from '@/components/Principal/ContractorManagement.vue'
import JobDetails from '@/components/Principal/JobDetails.vue'
import JobsInProgress from '@/components/Principal/JobsInProgress.vue'
import SafetyPlan from '@/components/Principal/SafetyPlanView.vue'
import Master from '@/components/Principal/MasterSafetyPlan.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
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
      path: '/newContractor',
      component: NewContractor
    },
    {
      path: '/newPrincipal',
      component: NewPrincipal
    },
    {
      path: '/contractor',
      component: Contractor,
      beforeEnter: (to, from, next) => {
        console.log('auth guard')
        if (store.getters.userKey !== '') {
          if (store.getters.user.companyType === 'contractor') {
            next()
          } else {
            alert('Access not allowed')
            next('/principal')
          }
        } else {
          next('/login')
        }
      },
      children: [
        {
          path: '',
          component: ContractorHome
        },
        {
          path: 'jobs/job/:id',
          component: JobForm,
          props: true
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
          component: Billing,
          beforeEnter: (to, from, next) => {
            if (store.getters.user.admin) {
              next()
            } else {
              alert('Access not allowed')
              next('/contractor')
            }
          }
        },
        {
          path: 'admin',
          component: AdminUsers,
          beforeEnter: (to, from, next) => {
            console.log('auth guard')
            if (store.getters.user.admin) {
              next()
            } else {
              alert('Access not allowed')
              next('/contractor')
            }
          }
        },
        {
          path: 'workers',
          component: Workers
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
        }
      ]
    },
    {
      path: '/principal',
      component: Principal,
      beforeEnter: (to, from, next) => {
        if (store.getters.userKey !== '') {
          if (store.getters.user.companyType === 'principal') {
            next()
          } else {
            alert('Access not allowed')
            next('/contractor')
          }
        } else {
          next('/login')
        }
      },
      children: [
        {
          path: '',
          component: PrincipalHome
        },
        {
          path: 'contractors',
          component: Contractors
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
              next('/principal')
            }
          }
        },
        {
          path: 'newJob',
          component: NewJob
        },
        {
          path: 'billing',
          component: Billing,
          beforeEnter: (to, from, next) => {
            if (store.getters.user.admin) {
              next()
            } else {
              alert('Access not allowed')
              next('/principal')
            }
          }
        },
        {
          path: 'admin',
          component: AdminUsers,
          beforeEnter: (to, from, next) => {
            if (store.getters.user.admin) {
              next()
            } else {
              alert('Access not allowed')
              next('/principal')
            }
          }
        },
        {
          path: 'workers',
          component: Workers,
          beforeEnter: (to, from, next) => {
            if (store.getters.user.admin) {
              next()
            } else {
              alert('Access not allowed')
              next('/principal')
            }
          }
        },
        {
          path: 'incidents',
          component: IncidentReports
        },
        {
          path: 'newIncident',
          component: NewIncident
        },
        {
          path: 'incidents/incident/:id',
          component: IncidentView,
          props: true
        },
        {
          path: 'support',
          component: Support
        }
      ]
    }
  ],
  mode: 'history'
})
