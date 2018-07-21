<template>
  <b-navbar sticky type="dark" class="my-primary-bg">
    <b-navbar-brand>
       <router-link to="/">
        minimise
       </router-link>
    </b-navbar-brand>
    <b-nav class="ml-auto">
      <router-link to='/' size="lg" class="mr-3 nav-link">
        Home Page
      </router-link>
      <router-link to='signup' size="lg" class="mr-3 nav-link">
        Sign Up
      </router-link>
      <router-link to='login' size="lg" class="mr-3 nav-link">
        Log In
      </router-link>
    </b-nav>
  </b-navbar>   
</template>


<script>
export default {
  data () {
    return {
    }
  }
}
</script>


<style scoped>
  
  .navbar {
    height: 50px;
    padding: 10px 40px;
    background-color: #383838;
  }
  
  .navbar-brand > a {
    color: #FFC80B;
    font-size: 1.6em;
    text-decoration: none;
  }
  
  .nav-link {
    color: #e0e0e0;
  }
  
  .nav-link:hover {
    color: #FFC80B;
  }
  
  @media only screen and (max-width: 570px) {
    .navbar-brand {
      display: none;
    }
}

</style>