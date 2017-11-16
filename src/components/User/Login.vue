<template>
 <animated-roll-in>
  <b-container fluid>
    <miniHeader></miniHeader>
    <b-container class="login-container">
      <h2>Log In</h2>
      <b-form @submit="loginUser" id="login">
         <b-input-group>
           <b-input-group-addon>
             <i class="fa fa-envelope" aria-hidden="true"></i>
           </b-input-group-addon>
           <b-form-input
              id="login-email"
              type="email"
              v-model="entered.email"
              placeholder="Email Address"
              required>
          </b-form-input>
         </b-input-group>

         <b-input-group>
           <b-input-group-addon>
             <i class="fa fa-lock fa-lg" aria-hidden="true"></i>
           </b-input-group-addon>
          <b-form-input
              id="login-password"
              type="password"
              v-model="entered.password"
              placeholder="Password"
              required>
          </b-form-input> 
        </b-input-group>

        <b-button class="btn-block" type="submit">LOGIN</b-button>
        <b-row class="links">
          <b-col class="leftcol">
            <router-link to="signup">SIGN UP</router-link>
          </b-col>
          <b-col>
            <router-link to="password">PASSWORD</router-link>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </b-container>
  </animated-roll-in>
</template>

<script>
  import MiniHeader from '@/components/MiniHeader.vue'
  export default {
    components: {
      miniHeader: MiniHeader
    },
    data () {
      return {
        entered: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      loginUser (evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
  }
  
</script>

<style scoped>
  
  .container-fluid {
    padding: 0;
  }
  
  .login-container {
    padding: 50px 80px;
    margin-top: 150px;
    width: 500px;
    border-radius: 10px;
    border: 1px solid lightgrey;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .input-group {
    height: 50px;
    margin-bottom: 20px;
  }
  
  .input-group-addon {
    width: 40px;
  }
  
  .btn-block {
    background-color: #616161;
    height: 50px;
  }
  
  .btn:hover {
    background-color: #FFC80B;
    color: #383838;
    cursor: pointer;
  }
  
  .row.links {
    margin-top: 20px;
  }
  
  .leftcol {
    text-align: right;
    border-right: 1px solid lightgrey;
  }
  
  a {
    font-size: 0.9rem;
  }
  
  
</style>