<template>
 <div>
    <div class="form-title">
      <h5 class="my-primary-accent">Sign Up: New Company</h5>
    </div>
    <b-form @submit="signupCompany">
      <b-form-group id="company">
        <p class="my-primary-accent form-subtitle">Company Information</p>
        <b-form-checkbox-group v-model="company.type" name="companyType">
          <label>Company Type: </label>
          <b-form-checkbox id="principal"
              value="principal">
             Principal
          </b-form-checkbox>
          <b-form-checkbox id="contractor"
              value="contractor">
             Contractor
          </b-form-checkbox>
        </b-form-checkbox-group>
        <b-form-input
            id="companyName"
            type="text"
            v-model="company.name"
            placeholder="Company Name"
            required>
        </b-form-input>
        <b-form-input
            id="address1"
            type="text"
            v-model="company.address1"
            placeholder="Address"
            required>
        </b-form-input>
        <b-form-input
            id="address2"
            type="text"
            v-model="company.address2"
            placeholder="Address Line 2">
        </b-form-input>
        <b-form-input
            id="city"
            type="text"
            v-model="company.city"
            placeholder="City"
            required>
        </b-form-input>
        <b-form-input
            id="postcode"
            type="number"
            v-model="company.postcode"
            placeholder="Postcode"
            class="no-spinners"
            required>
        </b-form-input>
        <b-form-input
            id="phone"
            type="number"
            v-model="company.phone"
            placeholder="Phone"
            class="no-spinners"
            required>
        </b-form-input>
      </b-form-group>
      
      <b-form-group id="admin">
        <p class="my-primary-accent form-subtitle">Account Administrator</p>
        <b-form-input
            id="adminFirstName"
            type="text"
            v-model="company.admin.firstName"
            placeholder="First Name"
            required>
        </b-form-input>
        <b-form-input
            id="adminLastName"
            type="text"
            v-model="company.admin.lastName"
            placeholder="Last Name"
            required>
        </b-form-input>
        <b-form-input
            id="adminPhone"
            type="number"
            v-model="company.admin.phone"
            placeholder="Phone"
            class="no-spinner"
            required>
        </b-form-input>
        <b-form-input
            id="adminEmail"
            type="email"
            v-model="company.admin.email"
            placeholder="Email"
            required>
        </b-form-input>
        <b-form-checkbox-group v-model="company.admin.safetyManager" name="safety Manager" required>
          <label>Are you the Health and Safety Manager?</label>
          <b-form-checkbox id="yes"
              value="true" class="safetyManager">
             Yes
          </b-form-checkbox>
          <b-form-checkbox id="no"
              value="false"
              class="safetyManager">
             No
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      
      <b-form-group id="billing">
        <p class="my-primary-accent form-subtitle">Billing Information</p>
        <b-button class="btn-block" type="submit">Sign Me Up</b-button>
      <div class="row links">
         <router-link to="login">Existing User Login</router-link>
      </div>
      </b-form-group>
      
    </b-form>
    
   
      
  </div>
</template>

<script>
  export default {
    data () {
      return {
        company: {
          type: '',
          name: '',
          address: '',
          address2: '',
          city: '',
          postcode: '',
          phone: '',
          admin: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            safetyManager: ''
          }
        },
        companies: ['Bob the Builder', 'Leaky Pipes']
      }
    },
    methods: {
      signupCompany (evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
        // validate, create user in database and log the user in
      }
    }
  }
  
</script>


<style scoped>
  label {
    margin-left: 3px;
    color: white;
  }
  .custom-checkbox {
    float: right;
  }
  
 
  .form-title {
    background-color: rgba(56, 56, 56, 0.5);
    border-radius: 5px;
    padding: 20px;
  }
  
  .form-subtitle {
    font-weight: 600;
    margin-left: 3px;
  }
  .form-group {
    background-color: rgba(56, 56, 56, 0.6);
    border-radius: 5px;
    margin: auto;
    margin-top: 20px;
    padding: 20px;
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

  .safetyManager {
    float: left;
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