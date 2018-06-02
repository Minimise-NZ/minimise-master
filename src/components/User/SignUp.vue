<template>
  <animated-pulse>
    <b-container fluid>
      <miniHeader></miniHeader>
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
    font-size: 0.8rem;
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
    font-size: 1.1rem;
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
    font-size: 0.9rem;
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
      font-size: 1.5rem;
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