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
          v-model="company.name"
          placeholder="Name of Company"
          required>
        </b-form-input>
        <b-form-input
          id="companyAddress"
          type="text"
          v-model="company.address"
          placeholder="Company Address"
          required
          >
        </b-form-input>
        <b-form-input
          id="companyCity"
          type="text"
          v-model="company.city"
          placeholder="City"
          required
          >
        </b-form-input>
        <b-form-input
          id="companyPostcode"
          type="number"
          class="no-spinners"
          v-model="company.postcode"
          placeholder="Postcode"
          required
          >
        </b-form-input>
        <b-form-input
          id="companyPhone"
          type="number"
          class="no-spinners"
          v-model="company.phone"
          placeholder="Phone Number"
          required
         >
        </b-form-input>
        
        <h5>User Information</h5>
        <v-select 
            v-model="user.role" 
            :options="userRoles"
            placeholder="Job Role"
            class="mt-3"          
            required
            id="selectBox"></v-select> 
        <b-form-input
          id="firstName"
          v-model="user.firstName"
          type="text"
          placeholder="First Name"
          required
         >
        </b-form-input>
        <b-form-input
          id="lastName"
          type="text"
          v-model="user.lastName"
          placeholder="Last Name"
          required
          >
        </b-form-input>
        <b-form-input
          id="adminPhone"
          type="number"
          v-model="user.phone"
          class="no-spinners"
          placeholder="Phone Number"
          required
          >
        </b-form-input>
        <b-form-input
          id="email"
          type="email"
          v-model="user.email"
          placeholder="Email Address"
          required
          >
        </b-form-input>
        <b-form-input
          id="password"
          type="password"
          v-model="user.password"
          placeholder="Password"
          required
         >
        </b-form-input>
        <!--<b-form-input
          id="repeatPassword"
          type="password"
          v-model="user.confirmPassword"
          placeholder="Confirm Password"
          required
         >
        </b-form-input> -->
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
      userRoles: ['Health and Safety Manager', 'Health and Safety Administrator', 'Business Administrator', 'Project Manager'],
      company: {
        type: 'principal',
        name: '',
        address: '',
        city: '',
        postcode: '',
        phone: '',
        users: [
        ]
      },
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        // confirmPassword: '',
        phone: '',
        admin: true,
        webUser: true,
        role: ''
      }
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
      // validate the form
      // validate the passwords match
      // Sign Up Newuser
      this.$store.dispatch('userSignUp',
        {email: this.user.email, password: this.user.password})
      // Create a company
      this.$store.dispatch('newCompany', {
        type: this.company.type,
        name: this.company.name,
        address: this.company.address,
        city: this.company.city,
        postcode: this.company.postcode,
        phone: this.company.phone
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