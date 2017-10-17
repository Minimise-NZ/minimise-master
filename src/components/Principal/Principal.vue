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
        {name: 'Home', link: '/principal'},
        {name: 'New Job', link: '/principal/newJob'},
        {name: 'Action Items', link: '/principal/actions'},
        {name: 'Jobs In Progress', link: '/principal/jobs'},
        {name: 'Contractor Management', link: '/principal/contractors'},
        {name: 'Incident Management', link: '/principal/incidents'},
        {name: 'Master Safety Plan', link: '/principal/master'},
        {name: 'Administration', link: '/principal/admin'},
        {name: 'Support/Feedback', link: '/principal/support'}
      ]
    }
  }
}
</script>

<style scoped>
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
  
  @media only screen and (max-width: 1200px) {
    .padding-side {
      padding-left: 0;
      padding-right: 0;
    }
  }
  
  .row {
    height: 100%;
    margin: 0;
    min-width: 850px;
    border: 1px solid #383838;
  }
  .side-wrapper { 
    max-width: 250px;
    background-color: #383838;
  }
  

</style>