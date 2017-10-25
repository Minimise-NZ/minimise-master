import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home.vue'
import User from '@/components/User/User.vue'
import Login from '@/components/User/Login.vue'

import SignUp from '@/components/User/SignUp.vue'
import Password from '@/components/User/Password.vue'
import NewCompany from '@/components/User/NewCompany.vue'
import NewUser from '@/components/User/NewUser.vue'

import Contractor from '@/components/Contractor/Contractor.vue'
import ContractorHome from '@/components/Contractor/Home.vue'
import JobForm from '@/components/Contractor/JobForm.vue'
import Hazards from '@/components/Contractor/HazardRegister.vue'
import HazardDatabase from '@/components/Contractor/HazardDatabase.vue'
import HazardousSubstances from '@/components/Contractor/HazardousSubstances.vue'
import TaskAnalysis from '@/components/Contractor/TaskAnalysis.vue'
import Workers from '@/components/Contractor/WorkerManagement.vue'

import Billing from '@/components/Shared/AdminBilling.vue'
import AdminUsers from '@/components/Shared/AdminManageUsers.vue'
import Incidents from '@/components/Shared/IncidentManagement.vue'
import NewIncident from '@/components/Shared/NewIncident.vue'
import Support from '@/components/Shared/SupportFeedback.vue'

import Principal from '@/components/Principal/Principal.vue'
import PrincipalHome from '@/components/Principal/Home.vue'
import NewJob from '@/components/Principal/NewJob.vue'
import Contractors from '@/components/Principal/ContractorManagement.vue'
import JobDetails from '@/components/Principal/JobDetails.vue'
import JobsInProgress from '@/components/Principal/JobsInProgress.vue'
import Master from '@/components/Principal/MasterSafetyPlan.vue'

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
      component: User,
      children: [
        {
          path: '/login',
          component: Login
        },
        {
          path: '/signup',
          component: SignUp
        },
        {
          path: '/password',
          component: Password
        },
        {
          path: '/newUser',
          component: NewUser
        },
        {
          path: '/newCompany',
          component: NewCompany
        }
      ]
    },
    {
      path: '/contractor',
      component: Contractor,
      children: [
        {
          path: '',
          component: ContractorHome
        },
        {
          path: 'job',
          component: JobForm
        },
        {
          path: 'hazards',
          component: Hazards
        },
        {
          path: 'hazardDatabase',
          component: HazardDatabase
        },
        {
          path: 'hazardousSubstances',
          component: HazardousSubstances
        },
        {
          path: 'taskAnalysis',
          component: TaskAnalysis
        },
        {
          path: 'workers',
          component: Workers
        },
        {
          path: 'billing',
          component: Billing
        },
        {
          path: 'admin',
          component: AdminUsers
        },
        {
          path: 'incidents',
          component: Incidents
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
          path: 'jobDetails',
          component: JobDetails
        },
        {
          path: 'jobs',
          component: JobsInProgress
        },
        {
          path: 'master',
          component: Master
        },
        {
          path: 'newJob',
          component: NewJob
        },
        {
          path: 'billing',
          component: Billing
        },
        {
          path: 'admin',
          component: AdminUsers
        },
        {
          path: 'incidents',
          component: Incidents
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
    }
  ],
  mode: 'history'
})
