<template>
  <div class="padding-side content-wrapper">
    <dashboard-header></dashboard-header>
    <b-row>
      <b-col cols="3" class="side-wrapper" >
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
      <b-col cols="9" class="content">
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
        {name: 'Action Items', link: '/contractor/actions'},
        {name: 'Worker Management', link: '/contractor/workers'},
        {name: 'Hazard Register', link: '/contractor/hazards'},
        {name: 'Hazardous Substances', link: '/contractor/hazardousSubstances'},
        {name: 'Task Analysis', link: '/contractor/taskAnalysis'},
        {name: 'Incident Management', link: '/contractor/incidents'},
        {name: 'Administration', link: '/contractor/admin'},
        {name: 'Support/Feeback', link: '/contractor/support'}
      ]
    }
  }
}
</script>

<style>
  .content-wrapper {
    min-width: 880px;
  }
  .padding-side {
    padding-left: 40px;
    padding-right: 40px;
  }

  .list-group-item {
    border-radius: 0.25rem;
    background-color: rgba(221, 221, 221, 0.2);
    color: white;
    margin-bottom: 10px;
    cursor: pointer;
  }
  
  .router-link-exact-active {
    background-color: #FFC80B;
    color: black;
  }
  
  
  @media only screen and (min-width: 1600px) {
    .padding-side {
      padding-left: 10%;
      padding-right: 10%;
    }
  }
  .row {
    height: 900px;
    margin: 0;
  }
  .side-wrapper { 
    max-width: 250px;
    background-color: #383838;
  }
  

</style>