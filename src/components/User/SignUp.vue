<template>
  <animated-pulse>
    <b-container fluid>
      <miniHeader></miniHeader>
      <b-container class="signup-container">
        <h2>Sign Up</h2>
        <b-card-group deck>
          <b-card>
            <div class="card-header contractor">
              <h3>Contractor</h3>
              <p>$49 month<span> + GST</span></p>
            </div>
            <ul class="contractor-li">
                <li>Unlimited Users</li>
                <li>Manage Job Sites</li>
                <li>Manage Hazards</li>
                <li>Manage Workers</li>
                <li>View live site information</li>
                <li>Maintain Safety Plans</li>
                <li>Manage incidents</li>
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
        this.$router.push('newContractor')
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
  }
 
  .card-body {
    padding: 0;
    word-wrap: normal;
    min-height: 500px;
  }
  
  span {
    font-size: 0.8rem;
  }
  .contractor {
    background-color: rgba(29, 92, 158, 0.75);
    color: white;
    font-family: 'Montserrat', sans-serif;
  }

  .card-header.contractor {
    padding: 30px 0 15px 0;
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
  
  .smaller {
    font-size: 0.9rem;
  }
  
  .signUp {
    height: 50px;
    position: absolute;
    bottom: 0;
    cursor: pointer;
  }
  
  .smaller {
    font-size: 0.9rem;
    position: absolute;
    bottom: 50px;;
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
      height: 550px;
    }
  }
  
  @media only screen and (min-width: 575px) and (max-width: 770px) {
    .card{
      height: 700px;
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