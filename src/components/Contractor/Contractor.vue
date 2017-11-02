<template>
  <div>
    <dashboard-header></dashboard-header>
    
    <b-row>
      <b-col sm="2" class="side-wrapper">
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
        <router-view></router-view>
      </b-col>

    </b-row>
  </div>
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
        {name: 'Home', link: '/contractor'},
        {name: 'Worker Management', link: '/contractor/workers'},
        {name: 'Hazard Register', link: '/contractor/hazards'},
        // {name: 'Hazardous Substances', link: '/contractor/hazardousSubstances'},
        {name: 'Task Analysis', link: '/contractor/taskAnalysis'},
        {name: 'Incident Management', link: '/contractor/incidents'},
        {name: 'Administration', link: '/contractor/admin'},
        {name: 'Support / Feedback', link: '/contractor/support'}
      ]
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