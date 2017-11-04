<template>
  <animated-fade-in>
    <b-container fluid>
      <miniHeader></miniHeader>
      <b-container class="form-container">
        <div class="user-header">
          <h3>Sign Up: New User</h3>
        </div>
        <b-form @submit.prevent="onSubmit" id="form">
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
          <b-button class="btn btn-block mt-4" type="submit">Sign Me Up</b-button>
          <b-row class="links">
            <b-col class="leftcol">
              <router-link to="login">LOGIN</router-link>
            </b-col>
            <b-col>
              <router-link to="/">CANCEL</router-link>
            </b-col>
          </b-row>
        </b-form>
      </b-container>
    </b-container>
  </animated-fade-in>
</template>

<script>
  import MiniHeader from '@/components/MiniHeader.vue'
  export default {
    components: {
      miniHeader: MiniHeader
    },
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
  
  .container-fluid {
    padding: 0;
  }
  
  .form-container {
    padding: 0;
    margin-top: 80px;
    margin-bottom: 100px;
  }
  
  .user-header {
    max-width: 658px;
    border-radius: 5px;
    padding: 15px 0 10px 0;
    margin: auto;
    text-align: center;
    background-color: rgba(111, 50, 130, 0.75);
    color: white;
    font-family: 'Montserrat', sans-serif;
  }
  
  form {
    max-width: 658px;
    margin: auto;
  }
  
  #selectBox {
    margin-top: 30px;
    background-color: #fff;
    border-radius: 5px;
  }
  .row.links {
    margin-top: 20px;
  }
  
  .leftcol {
    text-align: right;
    border-right: 1px solid lightgrey;
  }
  
  .form-control {
    margin-top: 15px;
  }
  
  .btn {
    background-color: rgba(18, 128, 122, 0.85);
    cursor: pointer;
    height: 50px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
  }
  
  .btn:hover {
    background-color: rgba(29, 92, 158, 0.75);
  }
  
  a {
    font-size: 0.9rem;
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