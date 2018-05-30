<template>
  <div id="home">
    <!--navbar-->
    <b-navbar toggleable="lg" type="dark" class="my-primary-bg main-nav" style="z-index: 9999">
      <b-nav-toggle target="nav_collapse" class="ml-4"></b-nav-toggle>
      <b-navbar-brand class="ml-4">
        <span class="my-primary-accent brand-name" style="margin-left: 10px">minimise</span>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse" type="dark">
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
              <p>Work safer and smarter with our innovative health and safety app designed for construction sites.</p>
              <router-link to='/signup' tag="button" size="lg" class="btn signup-btn btn-lg">
                Register your interest
              </router-link>
          </b-col>
          <b-col class="second-col" lg="6">
            <a href="https://minimisesafetyapp.com/" rel="nofollow">
              <img src="../assets/Minimise.png" class="hero-img" alt="minimise safety app">
            </a>
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
      <b-container fluid class="flex-grid" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-out-sine" data-aos-duration="500">
        <b-row class="flex-row" style="margin-top: 25px; margin-bottom: 50px">
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
        <b-nav>
          <b-nav-item v-scroll-to="'#home'" ><p class="my-primary-accent" style="margin-bottom: 0">Back to Top</p></b-nav-item>
        </b-nav>
      </b-navbar>
      <b-container fluid data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-out-sine" data-aos-duration="500">
        <b-row class="flex-row">
          <b-col lg="7" md="12" sm="12">
            <b-carousel
              controls
              :data-wrap=false
              :interval="5000"
              img-width="1024"
              img-height="480"
            >
            <b-carousel-slide img-src="/static/Principal/Home.PNG" height="985" width="1480" alt="Principal Contractor Homepage">
              <a href="https://minimisesafetyapp.com/" rel="nofollow" title="Principal Contractor Homepage"></a>
            </b-carousel-slide>
            <b-carousel-slide img-src='/static/Principal/NewJob.PNG' alt="Principal Contractor New Job">
              <a href="https://minimisesafetyapp.com/" rel="nofollow" title="Principal Contractor New Job"></a>
            </b-carousel-slide>
            <b-carousel-slide img-src='/static/Principal/JobsInProgress.PNG' alt="Principal Contractor Jobs In Progress">
              <a href="https://minimisesafetyapp.com/" rel="nofollow" title="Principal Contractor Jobs In Progress"></a>
            </b-carousel-slide>
            <b-carousel-slide img-src='/static/Principal/Incident.PNG' alt="Principal Contractor Incident">
              <a href="https://minimisesafetyapp.com/" rel="nofollow" title="Principal Contractor  Incident"></a>
            </b-carousel-slide>
          </b-carousel>
          </b-col>
          <b-col lg="5" md="12" class="list-col">
            <h3>View all key safety information from one easy to use dashboard</h3>
            <ul style="color:rgb(28, 118, 195)" class="feature-list">
              <li>
                <i class="fa fa-check"></i>
                Manage multiple job sites from one view
              </li>
              <li>
                <i class="fa fa-check"></i>
                Request health and safety agreements</li>
              <li>
                <i class="fa fa-check"></i>
                View signed in status on job sites</li>
              <li>
                <i class="fa fa-check"></i>
                Manage incidents</li>
              <li>
                <i class="fa fa-check"></i>
                Manage workers and training register</li>
              <li>
                <i class="fa fa-check"></i>
                View site safety plans remotely</li>
            </ul>
          </b-col>
        </b-row>
      </b-container>

      <!--Contractor Section-->
      <b-navbar class="my-primary-bg padding-side section-nav" id="contractor">
        <h4 class="my-primary-accent section-title">Contractors</h4>
         <b-nav>
          <b-nav-item v-scroll-to="'#home'" ><p class="my-primary-accent" style="margin-bottom: 0">Back to Top</p></b-nav-item>
        </b-nav>
      </b-navbar>
      <b-container fluid data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-out-sine" data-aos-duration="500">
        <b-row class="flex-row">
          <b-col lg="5" md="12" class="list-col-2">
            <h3 style="padding-left: 0; color:rgba(40,26,101,.8)">One master safety plan for all of your job sites</h3>
            <ul style="color:rgb(28, 118, 195); padding-left: 0" class="feature-list">
              <li>
                <i class="fa fa-check"></i>
                Receive job requests from Principal Contractors</li>
              <li>
                <i class="fa fa-check"></i>
                Submit health and safety agreements</li>
              <li>
                <i class="fa fa-check"></i>
                Maintain hazard register</li>
              <li>
                <i class="fa fa-check"></i>
                Prepare task analysis</li>
              <li>
                <i class="fa fa-check"></i>
                Manage workers and training register</li>
              <li>
                <i class="fa fa-check"></i>
                Manage incidents</li>
            </ul>
          </b-col>
           <b-col lg="7" md="12" sm="12">
            <b-carousel
              controls
              wrap=false
              :interval="6000"
              img-width="1024"
              img-height="480"
            >
            <b-carousel-slide img-src='/static/Contractor/Home.PNG' alt="Contractor Homepage">
              <a href="https://minimisesafetyapp.com/" rel="nofollow" title="Contractor Homepage"></a>
            </b-carousel-slide>
            <b-carousel-slide img-src='/static/Contractor/Hazards.PNG' alt="Contractor Hazard Register">
              <a href="https://minimisesafetyapp.com/" rel="nofollow" title="Contractor Hazard Register"></a>
            </b-carousel-slide>
            <b-carousel-slide img-src='/static/Contractor/Task.PNG' alt="Contractor Task Analysis">
              <a href="https://minimisesafetyapp.com/" rel="nofollow" title="Contractor Task Analysis"></a>
            </b-carousel-slide>
            <b-carousel-slide img-src='/static/Contractor/Incident.PNG' alt="Contractor Incident">
              <a href="https://minimisesafetyapp.com/" rel="nofollow" title="Contractor Incident"></a>
            </b-carousel-slide>
          </b-carousel>
          </b-col>

        </b-row>
      </b-container>

      <!--Worker Section-->
      <b-navbar class="my-primary-bg padding-side section-nav" id="workers">
        <h4 class="my-primary-accent section-title">Workers</h4>
         <b-nav>
          <b-nav-item v-scroll-to="'#home'" ><p class="my-primary-accent" style="margin-bottom: 0">Back to Top</p></b-nav-item>
        </b-nav>
      </b-navbar>
      <b-container fluid data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-out-sine" data-aos-duration="500">
        <b-row class="flex-row">
         <b-col lg="7" md="12" sm="12">
           <a href="https://minimisesafetyapp.com/" rel="nofollow">
            <b-img src="/static/Worker/master.png" alt="Minimise worker app" style="max-width: 100%"/>
           </a>
          </b-col>
          <b-col lg="5" md="12" class="list-col">
             <h3>Create site specific safety plans in minutes</h3>
            <ul style="color:rgb(28, 118, 195)" class="feature-list">
              <li>
                <i class="fa fa-check"></i>
                Select site hazards</li>
              <li>
                <i class="fa fa-check"></i>
                Check controls are in place</li>
              <li>
                <i class="fa fa-check"></i>View and sign on to task analysis</li>
              <li>
                <i class="fa fa-check"></i>View emergency contact information</li>
              <li>
                <i class="fa fa-check"></i>
                Report incidents</li>
              <li>
                <i class="fa fa-check"></i>
                Sign in and out of safety plans</li>
            </ul>
          </b-col>
        </b-row>
      </b-container>

      <!--Contact Section-->
      <b-navbar class="my-primary-bg padding-side section-nav" id="contact">
        <h4 class="my-primary-accent section-title">Contact Us</h4>
         <b-nav>
          <b-nav-item v-scroll-to="'#home'" ><p class="my-primary-accent" style="margin-bottom: 0">Back to Top</p></b-nav-item>
        </b-nav>
      </b-navbar>
      <b-container class="flex-grid">
        <b-card 
          class="demo-text" 
          border-variant="secondary">
          <div class="card-header register-header">
            <h5>Get in Touch</h5>
          </div>
          <b-form @submit.prevent="register" autocomplete="on">
            <b-form-checkbox class="ml-2 mb-3" v-model="demo" value="true">Request a demo</b-form-checkbox><br>
            <b-form-checkbox class="ml-2" v-model="notify" value="true">Notify me of Minimise launch</b-form-checkbox>

            <b-form-input
              name="name"
              class="mt-3" 
              placeholder="Name" 
              v-model="name"
              required
              autocomplete="name"
              >
            </b-form-input>

            <b-form-input 
              name="company"
              placeholder="Company Name" 
              autocomplete="company"
              required
              v-model="companyName"
              ></b-form-input>

            <b-form-select 
              name="companyType"
              v-model="companyType">
              <option :value="null">Please select company type</option>
              <option value="principal">Principal</option>
              <option value="contractor">Contractor</option>
              <option value="other">Other</option>
            </b-form-select>

            <b-form-input 
              name="email"
              required
              autocomplete="email"
              placeholder="Email Address"
              v-model="email"
              ></b-form-input>

            <b-form-input 
              name="phone"
              autocomplete="phone"
              placeholder="Phone" 
              v-model="phone"
              ></b-form-input>

            <b-form-textarea id="textarea1"
              class="mt-3"
              v-model="text"
              placeholder="Please enter enquiry details"
              :rows="5">
            </b-form-textarea>

            <button class="btn btn-block mt-4 mb-3 registerBtn" type="submit">Submit</button>
          </b-form>
        </b-card>
      </b-container>
      <b-navbar class="my-primary-bg padding-side section-nav">
        <p class="my-primary-accent section-title" style="margin: auto">&copy; 2018 Minimise Limited </p>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      entered: {
        email: '',
        password: ''
      },
      demo: '',
      notify: '',
      beta: '',
      name: '',
      companyName: '',
      companyType: null,
      email: '',
      phone: '',
      text: ''
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
    },
    register () {
      // register interest
      this.$validator.validateAll().then(async(valid) => {
        window.emailjs.send('my_service', 'register', {
          name: this.name,
          email: this.email,
          demo: this.name,
          notify: this.notify,
          companyName: this.companyName,
          companyType: this.companyType,
          phone: this.phone,
          text: this.text
        })
        .then(
          function (response) {
            alert('Thank you. We will be in touch')
          },
          function (error) {
            alert('Oops. Something went wrong', error)
          }
        )
      })
    }
  }
}
</script>

<style scoped>
.worker-slide {
  margin: auto;
  height: 600px;
  max-width: 300px;
}

.padding-side {
  padding-left: 40px;
  padding-right: 40px;
}

h3 {
  padding-left: 40px;
  margin-bottom: 30px;
  font-size: 1.6rem;
  color: #12807a;
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

.flex-row {
  margin: 20px;
  padding: 20px;
  margin-bottom: 100px;
  margin-top: 100px;
}

.flex-row > .col {
  min-width: 300px;
  background-color: white;
  text-align: center;
  margin-top: 25px;
  margin-bottom: 50px;
  padding: 20px 30px;
}

.flex-row > .col > p {
  font-size: 16px;
  line-height: 30px;
  color: #383838;
}

li {
  list-style-type: none;
}

h2 {
  text-align: center;
  padding-top: 20px;
}

.flex-row > .col > h2 {
 margin-bottom: 20px;
}

.carousel-row {
  margin-top: 50px;
  margin-bottom: 50px;
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

.slide-img {
  width: 100%;
  max-width: 950px;
  display: block;
  margin: auto;
}

.feature-list > li {
  padding-bottom: 20px;
}

li > i {
  margin-right: 15px;
}

.demo-text {
  margin: auto;
  width: 60vw;
  margin-top: 60px;
}

  form {
    padding: 20px;
  }

  input, select {
    margin-top: 16px;
  }

  .registerBtn {
    background-color: rgba(18, 128, 122, 0.85);
    cursor: pointer;
    height: 50px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
  }

  .registerBtn:hover {
    background-color: #884dff;
  }

  .register-header {
    background-color: rgba(111, 50, 130, 0.75);
    color: white;
    font-family: 'Montserrat', sans-serif;
    padding-top: 20px; 
  }

  h2 {
    text-align: center;
    margin-bottom: 40px;
  }

  .card {
    margin-bottom: 70px;
  }

  .card-header {
    text-align: center;
  }
 
  .card-body {
    padding: 0;
    word-wrap: normal;
    min-height: 500px;
  }

  #nav_collapse > ul{
    background-color: #383838;
  }

/*small screens*/
@media only screen and (max-width: 340px) {
  .navbar-brand {
    display: none;
  }
}

/*medium screens*/
@media only screen and (min-width: 768px) {
  .first-col {
    padding-top: 60px;
    padding-bottom: 50px;
  }   
}

/*less than large screens*/
@media only screen and (max-width: 990px ) {
  .second-col {
    display: none;
  }
  .login-btn {
    margin-top: 10px;
  }
  .flex-row {
    margin: 20px;
  }
  .flex-row > .col {
    text-align: center;
    margin-top: 25px;
    margin-bottom: 0;
  }
  .list-col {
    margin-top: 50px;
  }
  .list-col-2 {
    margin-bottom: 35px;
  }
  h3 {
    padding-left: 0;
  }
  .feature-list {
    padding-left: 0;
    font-size:1.4rem;
  }
  .feature-list > li {
    padding-bottom: 10px;
  }
  li > i {
    font-size:2.5rem;
  }

  .main-nav {
    padding: 0;
  }

  #nav_collapse > ul{
    padding-left: 25px;
    padding-bottom: 25px;
  }
}

/*large screens*/
@media only screen and (min-width: 992px) {
  .feature-list {
    font-size:1.1rem;
  }
  .feature-list > li {
    padding-bottom: 15px;
  }
  li > i {
    font-size:1.6rem;
  }
}

@media only screen and (min-width: 1100px) {
  .feature-list {
    font-size:1.2rem;
  }
}

/*extra large screens*/
@media only screen and (min-width: 1400px) {
  .feature-list {
    font-size:1.4rem;
  }

  li > i {
    font-size:2.5rem;
  }
}

</style>