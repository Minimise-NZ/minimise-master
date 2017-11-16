<template>
  <animated-fade-in>
   <b-container fluid>
    <miniHeader></miniHeader>
    <b-container class="form-container">
       <div class="principal-header">
         <h3>Sign Up: New Company</h3>
       </div>
       <b-form @submit.prevent="onSubmit" id="form">
        <h5>Company Information</h5>
          <b-form-input
              id="companyName"
              type="text"
              autofocus="autofocus"
              v-model="companyName"
              placeholder="Name of Company"
              >
          </b-form-input>
          <p>Please enter the name of your Company</p>
          <b-form-input
              id="address"
              type="text"
              v-model="address"
              placeholder="Company Address"
              >
          </b-form-input>
          <p>Please enter a valid address</p>
          <b-form-input
              id="city"
              type="text"
              v-model="city"
              placeholder="City"
              >
          </b-form-input>
          <p>Please enter a valid city</p>
          <b-form-input
              id="postcode"
              type="number"
              class="no-spinners"
              v-model="postcode"
              placeholder="Postcode"
              >
          </b-form-input>
          <p>Please enter a valid postcode</p>
          <b-form-input
              id="companyPhone"
              type="number"
              class="no-spinners"
              v-model="companyPhone"
              placeholder="Phone Number"
              >
          </b-form-input>
          <p>Please enter a valid phone number</p>
        
        <h5>User Information</h5>
        <v-select 
            v-model="userRole" 
            :options="userRoles"
            placeholder="Job Role"
            class="mt-3"          
            id="selectBox"
            >
        </v-select>
         <p >Please select your Job Role</p>
        <b-form-input
            id="name"
            v-model="userName"
            type="text"
            placeholder="Name">
        </b-form-input>
        <b-form-input
            id="userPhone"
            type="number"
            v-model="userPhone"
            class="no-spinners"
            placeholder="Phone Number">
        </b-form-input>
        <b-form-input
            id="email"
            type="email"
            v-model="userEmail"
            placeholder="Email Address">
        </b-form-input>
        <b-form-input
            id="password"
            type="password"
            v-model="password"
            placeholder="Password">
        </b-form-input>
        <b-form-input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm Password">
        </b-form-input>
        <button class="btn btn-block mt-4" type="submit">Sign up</button>
        <router-link to="/">Cancel</router-link>
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
      userRoles: ['Health and Safety Manager', 'Health and Safety Administrator', 'Business Administrator', 'Project Manager', 'Supervisor'],
      principal: true,
      companyName: '',
      address: '',
      city: '',
      postcode: '',
      companyPhone: '',
      users: [],
      userName: '',
      userEmail: '',
      password: '',
      confirmPassword: '',
      userPhone: '',
      admin: true,
      webUser: true,
      userRole: ''
    }
  },
  computed: {
    userKey () {
      return this.$store.getters.user.key
    },
    companyKey () {
      return this.$store.getters.company.key
    }
  },
  methods: {
    onSubmit () {
      // Sign Up Newuser
      this.$store.dispatch('userSignUp',
        {
        })
      // Create a company
      this.$store.dispatch('newCompany', {
      })
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
    margin-top: 30px;
    margin-bottom: 100px;
  }
  
  .principal-header {
    max-width: 658px;
    border-radius: 5px;
    padding: 10px 0 10px 0;
    margin: auto;
    text-align: center;
    background-color: rgba(18, 128, 122, 0.85);
    color: white;
    font-family: 'Montserrat', sans-serif;
  }
  
  h5 {
    margin-top: 20px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    color: rgba(18, 128, 122, 1);
  }
  
  form {
    max-width: 658px;
    margin: auto;
  }
  
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem;
  }
  
  .form-control {
    margin-top: 15px;
  }
  
  .btn {
    background-color: rgba(29, 92, 158, 0.75);
    cursor: pointer;
    height: 50px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
  }
  
  .btn:hover {
    background-color: rgba(111, 50, 130, 0.75);
  }

  .btn:hover:disabled {
    cursor: not-allowed;
  }
  
  a {
    display: block;
    text-align: center;
    margin-top: 15px;
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