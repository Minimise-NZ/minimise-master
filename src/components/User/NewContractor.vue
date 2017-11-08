<template>
  <animated-fade-in>
    <b-container fluid> 
      <miniHeader></miniHeader>
      <b-container class="form-container">
         <div class="contractor-header">
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

          <h5>Account Administrator</h5>
          <b-form-input
            id="firstName"
            type="text"
            v-model="company.admin.firstName"
            placeholder="First Name"
            required
           >
          </b-form-input>
          <b-form-input
            id="lastName"
            type="text"
            v-model.lazy="company.admin.lastName"
            placeholder="Last Name"
            required
            >
          </b-form-input>
          <b-form-input
            id="adminPhone"
            type="number"
            class="no-spinners"
            v-model="company.admin.phone"
            placeholder="Phone Number"
            required
            >
          </b-form-input>
          <b-form-input
            id="email"
            type="email"
            v-model="company.admin.email"
            placeholder="Email Address"
            required
            >
          </b-form-input>
          <b-form-input
            id="password"
            type="password"
            v-model="company.admin.password"
            placeholder="Password"
            required
           >
          </b-form-input>
          <b-form-checkbox
            class="mt-4"
            v-model="company.admin.safetyManager"
            value='true'
            description="here is a description">
            <span>I am the Health and Safety Representative for this Company</span>
          </b-form-checkbox>
          <p class="small ml-4"><em>Uncheck if you wish to register another person as Health and Safety Representative</em></p>

          <div v-if="company.admin.safetyManager != 'true'">
            <h5 class="mt-5">Health and Safety Representative</h5>
              <b-form-input
                id="firstName"
                type="text"
                v-model="company.rep.firstName"
                placeholder="First Name"
                required>
              </b-form-input>
              <b-form-input
                id="lastName"
                type="text"
                v-model="company.rep.lastName"
                placeholder="Last Name"
                required>
              </b-form-input>
              <b-form-input
                id="adminPhone"
                type="email"
                v-model="company.rep.email"
                placeholder="Email Address"
                required>
              </b-form-input>
              <p class="small mt-3 ml-1">Health and Safety responsibilities will be transferred when this user completes the user registration process</p>
          </div>
          <button class="btn btn-block mt-4 mb-3" type="submit">Submit</button>
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
      company: {
        type: 'contractor',
        name: '',
        address: '',
        city: '',
        postcode: '',
        phone: '',
        admin: {
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          password: '',
          safetyManager: 'true'
        },
        rep: {
          firstName: '',
          lastName: '',
          email: ''
        }
      }
    }
  },
  methods: {
    onSubmit (evt) {
      console.log(this.company)
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
  
  .contractor-header {
    max-width: 658px;
    border-radius: 5px;
    padding: 15px 0 10px 0;
    margin: auto;
    text-align: center;
    background-color: rgba(29, 92, 158, 0.75);
    color: white;
    font-family: 'Montserrat', sans-serif;
  }
  
  h5 {
    margin-top: 20px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    color: rgba(29, 92, 158, 1);
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
    background-color: rgba(111, 50, 130, 0.75);
    cursor: pointer;
    height: 50px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
  }
  
  .btn:hover {
    background-color: rgba(18, 128, 122, 0.85);
  }
  
   a {
    display: block;
    text-align: center;
    text-decoration: none;
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