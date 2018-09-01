<template>
  <animated-fade-in>
    <div>
      <b-navbar sticky toggleable="md" type="dark" class="my-primary-bg">
        <div class="toggle">
          <span style="font-size:25px;cursor:pointer;color:#FFC80B" @click="toggleNav()" class="menubtn" v-if="menu === 'menu'">&#9776; Menu</span>
          <span style="font-size:25px;cursor:pointer;color:#FFC80B" @click="toggleNav()" class="menubtn" v-if="menu === 'close'">&times; Close</span>
        </div>
        <b-navbar-brand id="brand" >
          <img src='../../assets/yellow-mini.png'>
          <span class="my-primary-accent brand-name" style="margin-left: 5px">minimise</span>
        </b-navbar-brand>
        <b-nav is-nav-bar class="ml-auto">
          <b-button class="username mr-3" @click="userDetails">
            <i class="fa fa-user" aria-hidden="true"></i>
            {{user.name}}</b-button>
          <b-button class="logout mr-3" @click="logout">
          <i class="fa fa-lock" aria-hidden="true"></i>
          Logout</b-button>
        </b-nav>
      </b-navbar>
      <b-row class="master-row">
        <b-col xl="2" id="fixedSidenav" class="sidenav">
          <b-list-group>
            <router-link to='/dashboard' exact id="sideNavItem" tag="li" class="list-group-item"><p>Home</p></router-link>
            <router-link v-for="item in sideNavItems" :to='item.link' :key = "item.name" tag="li" class="list-group-item">
              <p>{{item.name}}</p>
            </router-link>
            <router-link v-if="user.admin" v-for="item in adminNav" :to='item.link' :key = "item.name" tag="li" class="list-group-item">
              <p>{{item.name}}</p>
            </router-link>
            <router-link to='/dashboard/support' tag="li" class="list-group-item">
              <p>Support/ Feedback</p>
            </router-link>
          </b-list-group>
        </b-col>
        <b-col id="mySidenav" class="sidenav" xl="2">
          <b-list-group>
            <router-link to='/dashboard' exact id="sideNavItem" tag="li" class="list-group-item"><p>Home</p></router-link>
            <router-link v-for="item in sideNavItems" :to='item.link' :key = "item.name" tag="li" class="list-group-item">
              <p>{{item.name}}</p>
            </router-link>
            <router-link v-if="user.admin" v-for="item in adminNav" :to='item.link' :key = "item.name" tag="li" class="list-group-item">
              <p>{{item.name}}</p>
            </router-link>
            <router-link to='/dashboard/support' tag="li" class="list-group-item">
              <p>Support/ Feedback</p>
            </router-link>
          </b-list-group>
        </b-col>
        <b-col id="main" sm="12" xl="10">
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
      menu: 'menu',
      sideNavItems: [
        {name: 'New Job', link: '/dashboard/newJob'},
        {name: 'Jobs In Progress', link: '/dashboard/jobs'},
        {name: 'Hazard Register', link: '/dashboard/hazards'},
        {name: 'Hazardous Substances', link: '/dashboard/hazardousSubstances'},
        /* {name: 'Task Analysis/SWMS', link: '/dashboard/taskAnalysis'}, */
        {name: 'Training Register', link: '/dashboard/TrainingRegister'},
        {name: 'New Incident', link: '/dashboard/newIncident'},
        {name: 'Incident Reports', link: '/dashboard/incidents'}
      ],
      adminNav: [
        // {name: 'User Management', link: '/dashboard/userManagement'}
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
    },
    toggleNav () {
      if (this.menu === 'menu') {
        document.getElementById('mySidenav').style.width = '250px'
        document.getElementById('main').style.marginLeft = '250px'
        this.menu = 'close'
      } else {
        document.getElementById('mySidenav').style.width = '0'
        document.getElementById('main').style.marginLeft = '0px'
        this.menu = 'menu'
      }
    }
  },
  beforeCreate () {
    this.$store.dispatch('getCompany')
    this.$store.dispatch('getAllHazards')
    this.$store.dispatch('getTaskAnalysis')
    this.$store.dispatch('getHazSubs')
  },
  created () {
    this.$store.dispatch('getWorkers')
    this.$store.dispatch('getAllJobs')
    this.$store.dispatch('getAllIncidents')
    this.$store.dispatch('getMyHazards')
  }
}
</script>

<style scoped>
  p {
    font-size: 1em;
    margin: 0;
  }

  .list-group {
    padding: 5px 15px;
  }

  .list-group-item {
    border-radius: 0.25em;
    background-color: rgba(221, 221, 221, 0.2);
    color: white;
    margin-bottom: 10px;
    cursor: pointer;
  }
  
  .router-link-active {
    background-color: #FFC80B;
    color: black;
  }
  
  .master-row {
    margin: 0;
  }

  .navbar {
    padding-left: 15px;
  }

  .btn {
    background-color: #383838;
    border: 1px solid #FFC80B;
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
    font-size: 1.8em;
  }

  #main {
    position: fixed;
    right: 0;
  }

  .sidenav {
    height: 100%;
    padding-left: 0;
    padding-right: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #383838;
    overflow-x: hidden;
    transition: 0.5s;
}

  .sidenav a {
    padding: 15px 20px;;
    text-decoration: none;
    font-size: 1.4em;
    color: #a59d9d;
    display: block;
    transition: 0.3s;
  }

  .sidenav a:hover {
    color: #f1f1f1;
  }

  .sidenav a.router-link-active {
    color: #383838;
  }

  #mySidenav {
    margin-top: 50px;
  }
  @media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
  }

  @media only screen and (max-width: 768px) {
    .btn{
      margin-top: 10px;
    }
    .master-row {
      height: -moz-calc(100vh - 112px);
      height: -webkit-calc(100vh - 112px);
      height: calc(100vh - 112px);
    }
    .sidenav {
      padding-top: 112px;
    }
  }

  @media (max-width: 768px) {
    .list-group {
      margin-top: 55px;
    }
  }
  @media (min-width: 768px) {
    .master-row {
      height: -moz-calc(100vh - 83px);
      height: -webkit-calc(100vh - 83px);
      height: calc(100vh - 83px);
    }
    .sidenav{
      padding-top: 80px;
    }
  }

  @media (min-width: 1200px) {
    .menubtn {
      display: none;
    }
    #mySidenav {
      display: none;
    }
  }

  @media (max-width: 1200px) {
    .row {
      margin: 0;
    }
    .sidenav {
      width: 0;
      padding: 0;
    }
    #brand {
      display: none;
    }
    #fixedSidenav {
      display: none;
    }
  }

</style>