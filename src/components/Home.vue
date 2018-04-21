<template>
 <animated-slide-in-down>
  <div id="home">
    <!--navbar-->
    <b-navbar sticky toggleable="lg" type="dark" class="my-primary-bg padding-side">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-navbar-brand>
        <span class="my-primary-accent brand-name" style="margin-left: 10px">minimise</span>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item v-scroll-to="'#home'">Home</b-nav-item>
          <b-nav-item v-scroll-to="'#about'">About</b-nav-item>
          <b-nav-item-dropdown text="Features" right>
            <b-dropdown-item v-scroll-to="'#principal'">Principal Contractors</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item v-scroll-to="'#contractor'">Contractors</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item v-scroll-to="'#workers'">Workers</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-scroll-to="'#contact'">Contact Us</b-nav-item>
          <!--
          <router-link to='signup' tag="button" size="sm" class="login-btn mr-3">
            Sign Up
          </router-link>
          -->
          <router-link to='login' tag="button" size="sm" class="login-btn mr-3" v-if="uid === ''">
            Log In
          </router-link>
          <button @click='dashboard()' size="sm" class="dashboard-btn mr-3 ml-5" v-else>
            My Dashboard
          </button>
        </b-nav>
      </b-collapse>
    </b-navbar>

    <div class="b-container-fluid">
      <!--Hero Section-->
      <b-jumbotron class="padding-side">
        <b-row>
          <b-col class="first-col" lg="6" md="8">
            <h1 class="display-4">Simple Safety on Construction Sites</h1>
            <p class="lead mt-4">A fresh approach to managing health and safety on construction sites.</p>
            <hr class="my-4">
              <p>Minimise takes the burden out of health and safety by eliminating paperwork, is fast, simple, effective and engaging.<br><br>
              We connect all participants involved in site safety planning to produce a digital safety plan that exceeds current health and 
              safety standards and minimises risk to workers and businesses.
              </p>
              <router-link to='/signup' tag="button" size="lg" class="btn signup-btn btn-lg">
                Register your interest
              </router-link>
          </b-col>
          <b-col class="second-col" lg="6">
            <img src="../assets/Hero-1.png" class="hero-img">
          </b-col>
        </b-row>
      </b-jumbotron>
      <!--About Section-->
      <b-navbar class="my-primary-bg padding-side section-nav" id="about">
        <h4 class="my-primary-accent section-title">About minimise</h4>
        <b-nav>
          <b-nav-item href="https://www.facebook.com/MinimiseNZ/" target="_blank"><i class="fa fa-facebook-square fa-3x social-icon" aria-hidden="true"></i></b-nav-item>
          <b-nav-item href="https://twitter.com/MinimiseNZ?lang=en" target="_blank" ><i class="fa fa-twitter-square fa-3x social-icon" aria-hidden="true"></i></b-nav-item>
        </b-nav>
      </b-navbar>
      <b-container fluid class="flex-grid" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="800">
        <b-row class="flex-row" >
          <b-col>
            <h2>Fast</h2>
            <p>Don’t spend hours preparing safety plans. Workers can create site specific safety plans in minutes using our mobile app</p>
          </b-col>
          <b-col>
            <h2>Practical.</h2>
            <p>Safety plans don’t need to be prepared in the office. Our plans allow workers to identify hazards and check controls on site, in real time</p>
          </b-col>
          <b-col>
            <h2>Easy to use</h2>
            <p>Our apps have been designed for ease of use. Intuitive and user friendly... you don’t need any special training. Just sign up and go!</p>
          </b-col>
          <b-col>
            <h2>Relevant</h2>
            <p>Our safety plans are not only site specific, but are personalised to each individual worker</p>
          </b-col>
          <b-col>
            <h2>Dynamic</h2>
            <p>Safety plans can be easily updated as the job site changes</p>
          </b-col>
          <b-col>
            <h2>Collaborative</h2>
            <p>Principal contractors, subcontractors and workers are all connected allowing for improved collaboration and communication</p>
          </b-col>
          <b-col>
            <h2>Paperless</h2>
            <p>No more paperwork. <br>Happy days!</p>
          </b-col>
          <b-col>
            <h2>User driven</h2>
            <p>Development and design is driven by our users.We work closely with our community to ensure that our app is always meeting your needs</p> 
          </b-col>
        </b-row>
      </b-container>
      <!--Principal Section-->
      <b-navbar class="my-primary-bg padding-side section-nav" id="principal">
        <h4 class="my-primary-accent section-title">Principal Contractors</h4>
      </b-navbar>
      <b-container class="flex-grid"></b-container>
      <!--Contractor Section-->
      <b-navbar class="my-primary-bg padding-side section-nav" id="contractor">
        <h4 class="my-primary-accent section-title">Contractors</h4>
      </b-navbar>
      <b-container class="flex-grid"></b-container>
      <!--Worker Section-->
      <b-navbar class="my-primary-bg padding-side section-nav" id="workers">
        <h4 class="my-primary-accent section-title">Workers</h4>
      </b-navbar>
      <b-container class="flex-grid"></b-container>
      <!--Contact Section-->
      <b-navbar class="my-primary-bg padding-side section-nav" id="contact">
        <h4 class="my-primary-accent section-title">Contact Us</h4>
      </b-navbar>
      <b-container class="flex-grid"></b-container>
    </div>
  </div>
  </animated-slide-in-down>
</template>

<script>
export default {
  data () {
    return {
      flexItems: ['Simple', 'Practical', 'Relevant', 'Engaging', 'Collaborative', 'Dynamic']
    }
  },
  computed: {
    uid () {
      return this.$store.getters.userKey
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    dashboard () {
      let companyType = this.user.companyType
      this.$router.push('/' + companyType)
    }
  }
}
</script>

<style scoped>


.padding-side {
  padding-left: 40px;
  padding-right: 40px;
}

.navbar {
  height: 8vh;
}
  
.brand-name {
  font-size: 2rem;
}
  
button {
  cursor: pointer;
}

.flex-grid {
  width: 80%;
  min-height: 600px;
}

.flex-row > .col {
  min-width: 300px;
  margin: 20px;
  padding: 20px;
  background-color: white;
  text-align: center;
}

.flex-row > .col > p {
  line-height: 30px;
  color: #383838;
}

h2 {
  text-align: center;
  padding-top: 20px;
}

.flex-row > .col > h2 {
 margin-bottom: 20px;
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

.dashboard-btn {
  margin-top: 0;
  background-color: #383838;
  border: 0.5px solid #FFC80B;
  width: 150px;
  color: #FFC80B;
  border-radius: 5px;
}

.dashboard-btn:hover {
  background-color: #FFC80B;
  color: #383838;
}

.signup-btn {
  background-color: #FFC80B;
  color: #383838;
  font-weight: bold;
  margin-top: 25px;
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

.navbar-dark .navbar-nav .nav-link:active{
  color:#FFC80B;
}

.jumbotron {
  background-color: #ccc;
  margin-bottom: 0;
  height: 80vh;
}

.hero-img {
  max-width: 100%;
  display: block;
  margin: auto;
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