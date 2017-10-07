<template>
 <div>
    <div class="form-title">
      <h5 class="my-primary-accent">Sign Up: New User</h5>
    </div>
    <b-form @submit="signupUser" id="user">
      <b-form-group>
        <v-select 
          v-model="user.company" 
          :options="companies"
          placeholder="Company Name"
          required
          id="selectBox"></v-select> 
        <b-form-input
            id="firstName"
            type="text"
            v-model="user.firstName"
            placeholder="First Name"
            required>
        </b-form-input>
        <b-form-input
            id="lastName"
            type="text"
            v-model="user.lastName"
            placeholder="Last Name"
            required>
        </b-form-input>
        <b-form-input
            id="email"
            type="email"
            v-model="user.email"
            placeholder="Email Address"
            required>
        </b-form-input>
        <b-form-input
            id="phone"
            type="number"
            class="no-spinners"
            v-model="user.phone"
            placeholder="Phone Number">
        </b-form-input>
        <b-form-input
            id="password"
            type="password"
            v-model="user.password"
            placeholder="Password"
            required>
        </b-form-input>
        <b-form-input
            id="confirmPassword"
            type="password"
            v-model="user.confirmPassword"
            placeholder="Confirm Password"
            required>
        </b-form-input>
      </b-form-group>
      <b-button class="btn-block" type="submit" @click="signup">Sign Me Up</b-button>
      <div class="row links">
         <router-link to="login">Existing User Login</router-link>
      </div>
    </b-form>
    
   
      
  </div>
</template>

<script>
  export default {
    data () {
      return {
        user: {
          company: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        },
        companies: ['Bob the Builder', 'Leaky Pipes']
      }
    },
    methods: {
      signupUser (evt) {
        evt.preventDefault()
        // validate, create user in database and log the user in
      }
    }
  }
  
</script>


<style scoped>
  #selectBox {
    background-color: #fff;
    border-radius: 5px;
  }
  .form-title {
    background-color: rgba(56, 56, 56, 0.6);
    border-radius: 5px;
    padding: 20px;
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
  
  .form-control {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  h5 {
    font-family: 'trebuchet MS';
    margin-bottom: 0;
    font-weight: bold;
  }
  
  .register {
    height: 80px;
    border-radius: 5px;
    width: 100%;
    font-weight: 500;
    white-space:normal;
  }
  
  button {
    font-weight: 500;
    color: #383838;
    background-color: #FFC80B;
    font-weight: 600;
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
  
  .no-spinners {
    -moz-appearance:textfield;
  }

  .no-spinners::-webkit-outer-spin-button,
  .no-spinners::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
</style>