<template>
  <div>
    <div class="form-title">
      <h5 class="my-primary-accent">Log In</h5>
    </div>
    <b-form @submit="loginUser" id="login">
      <b-form-group >
        <b-form-input
            id="login-email"
            type="email"
            v-model="entered.email"
            placeholder="Email Address">
        </b-form-input>
        <b-form-input
            id="login-password"
            type="password"
            v-model="entered.password"
            placeholder="Password">
        </b-form-input> 
      </b-form-group>
      <b-button class="btn-block" type="submit">Log me in</b-button>
      <div class="row links">
         <router-link to="signup">Sign Up</router-link>
         <router-link to="password" class="ml-auto">Forgot Password</router-link>
      </div>
    </b-form>
  </div>
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
      loginUser (evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
  }
  
</script>

<style scoped>
  
  .form-title {
    background-color: rgba(56, 56, 56, 0.6);
    padding: 20px;
    border-radius: 5px;
  }
  
  .form-control {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  
  form {
    background-color: rgba(56, 56, 56, 0.6);
    border-radius: 5px;
    margin: auto;
    margin-top: 20px;
    padding: 20px;
  }
  
  #form {
    margin-bottom: 0;
  }
  
  h5 {
    font-family: 'trebuchet MS';
    margin-bottom: 0;
    font-weight: bold;
  }
  
  button {
    font-weight: 600;
    color: #383838;
    background-color: #FFC80B;
  }
  
  button:hover {
    background-color: #383838;
    cursor: pointer;
  }
  
  .links {
    margin-top: 12px;
    padding: 0 20px;  
  }
  
  a {
    color: white;
    text-decoration-line: underline;
    font-size: .8rem;
  }
  
</style>