<template>
  <animated-fade-in>
    <div>
      <div>
        <b-navbar sticky toggleable="md" type="dark" class="my-primary-bg">
          <router-link to="/" style="text-decoration: none" exact>
            <b-navbar-brand>
              <img src='../../assets/yellow-mini.png'>
              <span class="my-primary-accent brand-name" style="margin-left: 5px">minimise</span>
            </b-navbar-brand>
          </router-link>
            <b-nav is-nav-bar class="ml-auto">
              <b-button class="username mr-3" @click="userDetails">
                <i class="fa fa-user" aria-hidden="true"></i>
                {{user.name}}</b-button>
              <b-button class="logout mr-3" @click="logout">
              <i class="fa fa-lock" aria-hidden="true"></i>
              Logout</b-button>
            </b-nav>
        </b-navbar>
      </div>
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
import * as firebase from 'firebase'
export default {
  data () {
    return {
      sideNavItems: [
        {name: 'New Job', link: '/dashboard/newJob'},
        {name: 'Jobs In Progress', link: '/dashboard/jobs'},
        {name: 'Hazard Register', link: '/dashboard/hazards'},
        {name: 'Hazardous Substances', link: '/dashboard/hazardousSubstances'},
        {name: 'Task Analysis/SWMS', link: '/dashboard/taskAnalysis'},
        {name: 'Training Register', link: '/dashboard/TrainingRegister'},
        {name: 'Master Safety Plan', link: '/dashboard/master'},
        {name: 'New Incident', link: '/dashboard/newIncident'},
        {name: 'Incident Reports', link: '/dashboard/incidents'}
      ],
      adminNav: [
        {name: 'User Management', link: '/dashboard/userManagement'}
        // {name: 'Account Administration', link: '/dashboard/admin'}
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      firebase.auth().signOut().then(function () {
        console.log('user signed out')
      }).catch(function (error) {
        console.log('use sign out error', error)
      })
      this.$router.push('/')
    },
    userDetails () {
    }
  },
  beforeCreate () {
    this.$store.dispatch('getCompany')
    this.$store.dispatch('getAllHazards')
    this.$store.dispatch('getTaskAnalysis')
    this.$store.dispatch('getHazSubs')
  },
  beforeMount () {
    this.$store.dispatch('getWorkers')
    this.$store.dispatch('getAllJobs')
    this.$store.dispatch('getAllIncidents')
    this.$store.dispatch('getMyHazards')
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
    height: -moz-calc(100vh - 86px); /* Firefox */
    height: -webkit-calc(100vh - 86px); /* Chrome, Safari */
    height: calc(100vh - 86px);
    margin: 0;
  }
  
 .side-wrapper {
    background-color: #383838;
    padding: 0 20px 10px 20px;
    min-width: 200px;
  }

  .navbar {
    padding-left: 30px;
    padding-top: 10px;
    padding-bottom: 8px;
  }

  .btn {
    background-color: #383838;
    border: 0.5px solid #FFC80B;
    color: #FFC80B;
    cursor: pointer;
    border-radius: 5px;
  }

  .btn:hover {
    background-color: #FFC80B;
    color: #383838;
  }

  .username {
    cursor: default
  }

  .username:hover {
    background-color: #383838;
    border: 0.5px solid #FFC80B;
    color: #FFC80B;
  }

  .brand-name {
    font-size: 2rem;
  }

  @media only screen and (max-width: 440px) {
    .navbar-brand {
      display: none;
    }
  }
  
  @media only screen and (max-width: 768px) {
    .btn{
      margin-top: 10px;
    }
  }

  @media only screen and (orientation: portrait) {
  }
  
</style>