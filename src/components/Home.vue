<template>
 <animated-slide-in-down>
  <div>
    <!--navbar-->
    <b-navbar sticky toggleable="lg" type="dark" class="my-primary-bg padding-side">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-navbar-brand>
        <span class="my-primary-accent brand-name" style="margin-left: 10px">minimise</span>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item href="#">Home</b-nav-item>
          <b-nav-item href="#">About</b-nav-item>
          <b-nav-item href="#">Features</b-nav-item>
          <b-nav-item href="#">FAQ</b-nav-item>
          <b-nav-item href="#">Contact</b-nav-item>
          <router-link to='signup' tag="button" size="sm" class="login-btn mr-3">
            Sign Up
          </router-link>
          <router-link to='login' tag="button" size="sm" class="login-btn mr-3">
            Log In
          </router-link>
        </b-nav>
      </b-collapse>
    </b-navbar>

    <div class="b-container-fluid">
    <!--Hero Section-->
      <b-jumbotron class="padding-side">
        <b-row>
          <b-col class="first-col" cols="12" md="8">
            <h1 class="display-4">Simple Safety on Construction Sites</h1>
            <p class="lead">Rum uno minima reipsa ipsius mea solius. Incrementi continuata pla affirmabam res. Meo sperare nam dei animali defectu. 
              Moralis se in aggredi sciamus indutum ingenio re ostendi. Laborio mox ubi aliarum nostras.</p>
            <hr class="my-4">
               <router-link to='signup' tag="button" size="lg" class="btn signup-btn btn-lg">
                Get Started
              </router-link>
          </b-col>
          <b-col class="second-col">
            <img src="../assets/hero_img.png" class="hero-img">
          </b-col>
        </b-row>
      </b-jumbotron>

      <b-navbar class="my-primary-bg padding-side section-nav">
        <h4 class="my-primary-accent section-title">About Us</h4>
        <b-nav>
          <b-nav-item href="#"><i class="fa fa-facebook-square fa-3x social-icon" aria-hidden="true"></i></b-nav-item>
          <b-nav-item href="#"><i class="fa fa-twitter-square fa-3x social-icon" aria-hidden="true"></i></b-nav-item>
        </b-nav>
        
      </b-navbar>
    </div>
  </div>
  </animated-slide-in-down>
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

.padding-side {
  padding-left: 40px;
  padding-right: 40px;
}
  
.brand-name {
  font-size: 1.6rem;
}
  
  button {
    cursor: pointer;
  }

.login-btn {
  margin-top: 0;
  background-color: #383838;
  border: 0.5px solid #FFC80B;
  width: 100px;
  color: #FFC80B;
  border-radius: 5px;
}

.login-btn:hover {
  background-color: #FFC80B;
  color: #383838;
}

.signup-btn {
  background-color: #FFC80B;
  color: #383838;
  font-weight: bold;
  margin-top: 15px;
  text-align: left;
}

.signup-btn:hover {
  background-color:#383838;
  color:#FFC80B;
}
.nav-item {
  margin-right: 15px;
}

.navbar-dark .navbar-nav .nav-link {
  color:#e0e0e0;
}

.navbar-dark .navbar-nav .nav-link:hover {
  color:#FFC80B;
}

.jumbotron {
  background-color: #ccc;
  margin-bottom: 0;
}

.hero-img {
  max-width: 100%;
  max-height: 400px;
  float: right;
}

.section-title {
  margin-bottom: 0;
}

.social-icon {
  color: #FFC80B;
}

.social-icon:hover {
  color: #fc8700;
}

@media only screen and (max-width: 340px) {
  .navbar-brand {
    display: none;
  }
}

@media only screen and (min-width: 710px) {
  .first-col {
    padding-top: 60px;
    padding-bottom: 50px;
  }   
}

@media only screen and (max-width: 990px ) {
  .second-col {
    display: none;
  }
  .login-btn {
    margin-top: 10px;
  }
}

</style>