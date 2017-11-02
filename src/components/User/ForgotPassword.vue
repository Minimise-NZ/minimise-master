<template>
 <animated-slide-in-right>
  <b-container class="login-container">
    <h2>Reset Password</h2>
    <b-form @submit="resetPassword" id="pwdreset">
       <b-input-group>
         <b-input-group-addon>
           <i class="fa fa-envelope" aria-hidden="true"></i>
         </b-input-group-addon>
         <b-form-input
            id="login-email"
            type="email"
            v-model="entered.email"
            placeholder="Email Address">
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
            placeholder="Password">
        </b-form-input> 
      </b-input-group>
      
      <b-button class="btn-block login-btn" type="submit">LOGIN</b-button>
      <b-row class="links">
        <b-col class="leftcol">
          <router-link to="signup">SIGN UP</router-link>
        </b-col>
        <b-col>
          <router-link to="#">PASSWORD</router-link>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
  </animated-slide-in-right>
</template>

<script>
  export default {
    data () {
      return {
        entered: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      resetPassword (evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
  }
  
</script>

<style scoped>
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
    height: 50px;
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
  
  .login-btn {
  background-color: #616161;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.login-btn:hover {
  background-color: #FFC80B;
  color: #383838;
}
</style>