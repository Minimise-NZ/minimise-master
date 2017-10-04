<template>
  <div id="container">
    <div class="container">
    <!--corner branding-->
      <div class="row brand">
        <div class="logo">
          <img src='../../assets/yellow-mini.png'>
          <span class="my-primary-accent" style="margin-left: 10px">minimise</span>
        </div>
      </div>
    
    <!--form container-->
      <div class="form-container">
        <div class="form-title">
          <h5 class="my-primary-accent">Log In</h5>
        </div>
        <b-form @submit="onSubmit">
          <b-form-group id="login-form">
            <b-form-input
                id="login-email"
                type="email"
                v-model="form.email"
                placeholder="Email Address">
            </b-form-input>
            <b-form-input
                id="login-password"
                type="password"
                v-model="form.password"
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
      
   
      
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
  }
  
</script>

<style scoped>
  #container {
    height: 95vh;
    background-image: url(../../assets/grey-background.jpg);
    background-size: 100% 100%;
  }
  
  .brand {
    padding-left: 6%;
    padding-top: 80px;
    font-size: 2rem;
  }
  
  .form-container {
    max-width: 400px;
    margin: 60px auto;
  }
  
  .form-title {
    background-color: rgba(124, 124, 124,0.8);
    padding: 20px;
  }
  
  .form-control {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  
  form {
    background-color: rgba(124, 124, 124,0.8);
    margin: auto;
    margin-top: 20px;
    padding: 20px;
  }
  
  #login-form {
    margin-bottom: 0;
  }
  
  h5 {
    font-family: 'trebuchet MS';
    margin-bottom: 0;
    font-weight: bold;
  }
  
  button {
    font-family: 'trebuchet MS';
    font-weight: 500;
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
  
  @media only screen and (min-width: 1000px) {
    .brand {
      padding-left: 25%;
    }
  }
</style>