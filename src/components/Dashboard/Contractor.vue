<template>
  <animated-fade-in>
    <div>
      <dashboard-header></dashboard-header> 
      <b-row>
        <b-col sm="1" lg="2" class="side-wrapper">
          <b-list-group>
            <router-link to='/dashboard' tag="li" class="list-group-item" exact>
              <p>Home</p>
            </router-link>
            <router-link v-for="item in sideNavItems" :to='item.link' tag="li" class="list-group-item" :key = "item.name">
              <p>{{item.name}}</p>
            </router-link>
            <router-link v-if="user.admin" v-for="item in adminNav" :to='item.link' tag="li" class="list-group-item" :key = "item.name">
              <p>{{item.name}}</p>
            </router-link>
            <router-link to='/dashboard/support' tag="li" class="list-group-item">
              <p>Support/ Feedback</p>
            </router-link>
          </b-list-group>
        </b-col>
        <b-col>
          <animated-fade-in>
            <router-view></router-view>
          </animated-fade-in>
        </b-col>

      </b-row>
    </div>
  </animated-fade-in>
</template>

<script>
import DashboardHeader from '@/components/Dashboard/Header.vue'
export default {
  components: {
    'dashboard-header': DashboardHeader
  },
  data () {
    return {
      sideNavItems: [
        {name: 'New Job', link: '/dashboard/newJob'},
        {name: 'Jobs In Progress', link: '/dashboard/jobs'},
        {name: 'Hazard Register', link: '/dashboard/hazards'},
        {name: 'Hazardous Substances', link: '/dashboard/hazardousSubstances'},
        {name: 'Task Analysis', link: '/dashboard/taskAnalysis'},
        {name: 'Training Register', link: '/dashboard/TrainingRegister'},
        {name: 'Master Safety Plan', link: '/dashboard/master'},
        {name: 'New Incident', link: '/dashboard/newIncident'},
        {name: 'Incident Reports', link: '/dashboard/incidents'}
      ],
      adminNav: [
        {name: 'User Management', link: '/dashboard/userManagement'},
        {name: 'Payments/ Billing', link: '/dashboard/billing'}
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  beforeCreate () {
    this.$store.dispatch('getCompany')
    this.$store.dispatch('getAllHazards')
    this.$store.dispatch('getTaskAnalysis')
  },
  beforeMount () {
    this.$store.dispatch('getWorkers')
    if (this.user.admin === true) {
      this.$store.dispatch('getAllJobs')
      this.$store.dispatch('getAllIncidents')
    } else {
      this.$store.dispatch('getMyJobs')
      this.$store.dispatch('getMyIncidents')
    }
  }
}
</script>

<style scoped>

  .list-group-item {
    border-radius: 0.25rem;
    background-color: rgba(221, 221, 221, 0.2);
    color: white;
    margin-bottom: 10px;
    cursor: pointer;
  }
  
  p {
    font-size: 1rem;
    margin: 0;
  }
  
  .router-link-active {
    background-color: #FFC80B;
    color: black;
  }
  
  .row {
    min-height: 900px;
    margin: 0;
  }
  
 .side-wrapper {
    background-color: #383838;
    padding: 0 20px 10px 20px;
    min-width: 200px;
  }

  @media only screen and (orientation: portrait) {
    .row {
      height: 94vh;
    }
  }
  
</style>