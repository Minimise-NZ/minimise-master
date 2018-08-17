<template>
  <animated-pulse>
    <b-container fluid>
      <miniHeader></miniHeader>
       <b-container fluid class="overlay">
        <b-card 
          class="demo-text" 
          border-variant="secondary">
          <div class="card-header register-header">
            <h5>We are currently in testing phase but please register your interest to receive updates or request a demo</h5>
          </div>
          <b-form @submit.prevent="register" autocomplete="on">
            <b-form-checkbox class="ml-2 mb-3" v-model="demo" value="true">Request a demo</b-form-checkbox><br>
            <b-form-checkbox class="ml-2" v-model="notify" value="true">Notify me of Minimise launch</b-form-checkbox>

            <b-form-input
              name="name"
              class="mt-3" 
              placeholder="Name" 
              v-model="name"
              autocomplete="name"
              v-validate="'required|alpha_spaces'"
              :class="{'alert-border': errors.has('name')}">
            </b-form-input>
            <b-alert variant="danger" :show="errors.has('name')">{{ errors.first('name') }}</b-alert>

            <b-form-input 
              name="company"
              placeholder="Company Name" 
              autocomplete="company"
              v-model="companyName"
              v-validate="'required|alpha_spaces'"
              :class="{'alert-border': errors.has('company')}"
              ></b-form-input>
            <b-alert variant="danger" :show="errors.has('company')">{{ errors.first('company') }}</b-alert>

            <b-form-input 
              name="email"
              autocomplete="email"
              placeholder="Email Address"
              v-model="email"
              v-validate="'required|email'"
              :class="{'alert-border': errors.has('email')}"
              ></b-form-input>
            <b-alert variant="danger" :show="errors.has('email')">{{ errors.first('email') }}</b-alert>

            <b-form-input 
              name="phone"
              autocomplete="phone"
              placeholder="Phone" 
              v-model="phone"
              v-validate="'required|numeric'"
              :class="{'alert-border': errors.has('phone')}"
              ></b-form-input>
            <b-alert variant="danger" :show="errors.has('phone')">{{ errors.first('phone') }}</b-alert>

            <button class="btn btn-block mt-4 mb-3 registerBtn" type="submit">Submit</button>
          </b-form>
        </b-card>
      </b-container>
      <b-container class="signup-container">
        <h2>Sign Up</h2>
        <b-card-group deck>
          <b-card>
            <div class="card-header contractor">
              <h3>Contractor / Small Business</h3>
              <p>$49 month<span> + GST</span></p>
            </div>
            <ul class="contractor-li">
                <li>Unlimited Users</li>
                <li>Manage Job Sites</li>
                <li>Remotely View Safety Plans</li>
                <li>Hazard Management</li>
                <li>Hazardous Substance Management</li>
                <li>Training Register</li>
                <li>Maintain Task Analysis</li>
                <li>Incident Reporting and Management</li>
              </ul>
              <b-button class="btn-block signUp contractor" @click="signUp('contractor')">Sign Up</b-button>
          </b-card>
          <b-card>
            <div class="card-header user">
              <h3>User</h3>
              <p>Free forever</p>
            </div>
            <ul class="user-li">
              <li>Project Managers</li>
              <li>Supervisors</li>
              <li>Health and Safety Managers</li>
              <li>Health and Safety Administrators</li>
            </ul>
            <p class="smaller">***Web user registration only.<br>Mobile users (workers) must register via mobile app</p><br>
            <p class="smaller">Contractor/Small Business must be subscribed for <br>individual user sign up </p><br>
            <b-button class="btn-block signUp user" @click="signUp('user')">Sign Up</b-button>
          </b-card>
        </b-card-group>
      </b-container>
    </b-container>
  </animated-pulse>
</template>

<script>
  import MiniHeader from '@/components/Webpage/MiniHeader.vue'
  export default {
    components: {
      miniHeader: MiniHeader
    },
    data () {
      return {
        showModal: false,
        entered: {
          email: '',
          password: ''
        },
        demo: '',
        notify: '',
        beta: '',
        name: '',
        companyName: '',
        email: '',
        phone: '',
        typeError: false
      }
    },
    methods: {
      goHome () {
        this.$router.push('/')
      },
      signUp (type) {
        if (type === 'contractor') {
          this.$router.push('newCompany')
        } else {
          this.$router.push('newUser')
        }
      },
      register () {
        // register interest
        this.$validator.validateAll().then(async(valid) => {
          if (!valid) { return }
          try {
            this.typeError = false
            if (this.companyType === null) {
              this.typeError = true
              return
            } else {
              // submit form and trigger modal
              window.emailjs.send('my_service', 'register', {
                name: this.name,
                email: this.email,
                demo: this.name,
                notify: this.notify,
                companyName: this.companyName,
                phone: this.phone
              })
              .then(
                function (response) {
                  console.log('Email SUCCESS', response)
                },
                function (error) {
                  console.log('Email FAILED', error)
                }
              )
            }
            this.showModal = true
          } catch (err) {
            console.log(err)
          }
        })
      }
    }
  }
  
</script>

<style scoped>  
  .container-fluid {
    height: 980px;
    padding: 0;
  }
  
  .signup-container {
    padding-top: 60px;
  }

  .overlay {
    position: fixed; /* Sit on top of the page content */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0; 
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  }
  .demo-text {
    position: relative;
    top: 25vh;
    width: 600px;
    margin: auto;
    background-color: white;
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
    font-size: 1.2em;
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

  .card-header {
    text-align: center;
    padding: 30px 0 15px 0;
  }
 
  .card-body {
    padding: 0;
    word-wrap: normal;
    min-height: 570px;
  }
  
  span {
    font-size: 0.8em;
  }
  .contractor {
    background-color: rgba(29, 92, 158, 0.75);
    color: white;
    font-family: 'Montserrat', sans-serif;
  }

  .user {
    background-color: rgba(111, 50, 130, 0.75);
    color: white;
    font-family: 'Montserrat', sans-serif;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    padding: 0 10px;
    text-align: center;
    margin-top: 20px;
    font-size: 1.1em;
    font-weight: bold;
  }
  
  .contractor-li {
    color: rgba(29, 92, 158, 1);
  }
  
  .user-li {
    color: rgba(111, 50, 130, 1);
  }
  
  p {
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
  }
  
  .signUp {
    height: 50px;
    position: absolute;
    bottom: 0;
    cursor: pointer;
  }
  
  .smaller {
    width: 100%;
    font-size: 0.9em;
  }
  
  .signUp.contractor:hover{
    background-color: #1a75ff;
    color: white;
  }
  
   .signUp.user:hover{
    background-color: #884dff;
  }

  @media only screen and (min-width: 770px) and (max-width: 1000px) {
    .card{
      height:  600px;
    }
  }
  
  @media only screen and (min-width: 575px) and (max-width: 770px) {
    .card{
      height: 750px;
    }
    h3 {
      font-size: 1.5em;
    }
    .card-header {
      height: 140px;
    }
  }
  
  @media only screen and (max-width: 575px) {
    .card{
      margin-bottom: 20px;
    }
  }
  
</style>