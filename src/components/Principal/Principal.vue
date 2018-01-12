<template>
  <animated-fade-in>
    <div>
      <dashboard-header></dashboard-header>
      <b-row>
        <b-col sm="2" class="side-wrapper" >
          <b-list-group>
            <router-link v-for="item in sideNavItems"
            :to='item.link' 
            tag="li"
            class="list-group-item"
            :key = "item.name">
              <p>{{item.name}}</p>
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
import DashboardHeader from '@/components/Header.vue'
export default {
  components: {
    'dashboard-header': DashboardHeader
  },
  data () {
    return {
      sideNavItems: [
        {name: 'Home', link: '/principal'},
        {name: 'New Job', link: '/principal/newJob'},
        {name: 'Jobs In Progress', link: '/principal/jobs'},
        // {name: 'Contractor Management', link: '/principal/contractors'},
        {name: 'Incident Reports', link: '/principal/incidents'},
        {name: 'New Incident', link: '/principal/newIncident'},
        // {name: 'Master Safety Plan', link: '/principal/master'},
        {name: 'Administration', link: '/principal/admin'},
        {name: 'Worker Management', link: '/principal/workers'},
        {name: 'Support / Feedback', link: '/principal/support'}
      ]
    }
  },
  beforeCreate () {
    this.$store.dispatch('getCompany', {key: this.$store.getters.companyKey})
  },
  mounted () {
    this.$store.dispatch('getCompanyIndex')
    // this.$store.dispatch('getProjectManagers') *will add this functionallity later. Need to check if change ofproject managers is required
    this.$store.dispatch('getJobs')
    this.$store.dispatch('getIncidents')
    this.$store.dispatch('getWorkers')
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
    font-size: 1.2rem;
  }
  
  p {
    font-size: 1.1rem;
    margin: 0;
  }
  
  .router-link-exact-active {
    background-color: #FFC80B;
    color: black;
  }
  
  .row {
    min-height: 900px;
    height: 100%;
    margin: 0;
    border: 1px solid #383838;
  }
  
  .side-wrapper { 
    background-color: #383838;
    padding: 0 20px;
  }
  
  @media (max-width: 1040px) {
    .side-wrapper {
        display: none;
    }
  }

</style>