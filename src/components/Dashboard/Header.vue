<template>
  <div>
    <b-navbar sticky toggleable="md" type="dark" class="my-primary-bg">
      <router-link to="/" style="text-decoration: none">
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
</template>

<script>
import * as firebase from 'firebase'
export default {
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
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>
  .navbar {
    padding-left: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
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

  .brand-name {
    font-size: 2rem;
  }

</style>