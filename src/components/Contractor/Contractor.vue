<template>
  <div class="content-wrapper">
    <dashboard-header></dashboard-header>
    
    <b-row>
      <b-col cols="3" class="side-wrapper">
       <b-list-group>
          <router-link v-for="item in sideNavItems"
           :to='item.link' 
           tag="li"
           class="list-group-item"
           :key = "item.name">
            {{item.name}}
          </router-link>
        </b-list-group>

      </b-col>
       

      <b-col class="content">
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
        {name: 'Support/Feeback', link: '/contractor/support'}
      ]
    }
  }
}
</script>

<style scoped>
   .content-wrapper {
    min-width: 900px;
  }
  
  .list-group-item {
    border-radius: 0.25rem;
    background-color: rgba(221, 221, 221, 0.2);
    color: white;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 1.2rem;
  }
  
  .router-link-exact-active {
    background-color: #FFC80B;
    color: black;
  }
  
  .row {
    min-height: 900px;
    height: 100%;
    margin: 0;
    min-width: 1050px;
    border: 1px solid #383838;
  }
  .side-wrapper { 
    max-width: 300px;
    background-color: #383838;
    padding: 0 20px;
  }
  

</style>