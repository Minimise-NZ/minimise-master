<template>
  <div>
    <b-navbar sticky toggleable="md" type="dark" class="my-primary-bg">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <router-link to="/" style="text-decoration: none">
        <b-navbar-brand>
          <img src='../assets/yellow-mini.png'>
          <span class="my-primary-accent brand-name" style="margin-left: 10px">minimise</span>
        </b-navbar-brand>
      </router-link>
      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar class="ml-auto">
          <b-button class="username mr-3" @click="userDetails">
            <i class="fa fa-user" aria-hidden="true"></i>
            {{username}}</b-button>
          <b-button class="logout mr-3" @click="logout">
          <i class="fa fa-lock" aria-hidden="true"></i>
          Logout</b-button>
        </b-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: 'Shilo Kherington'
    }
  },
  methods: {
    logout () {
    },
    userDetails () {
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

  @media only screen and (max-width: 340px) {
      .navbar-brand {
        display: none;
      }
  }

  .brand-name {
    font-size: 1.6rem;
  }

</style>