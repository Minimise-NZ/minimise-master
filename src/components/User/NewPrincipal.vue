<template>
  <animated-fade-in>
    <b-container fluid>
      <miniHeader></miniHeader>
      <b-container class="form-container">
        <div class="principal-header">
          <h3>Sign Up: New Company</h3>
        </div>
        <b-form @submit.prevent="onSubmit" id="form">

          <div class="company">
          <h5>Company Information</h5>
            <b-form-input name="companyName"
                v-validate="'required|alpha_spaces'"
                autofocus="autofocus"
                v-model="companyName"
                placeholder="Name of Company"
                :class="{'alert-border': errors.has('companyName')}">
            </b-form-input>
            <div class="alert alert-danger" v-show="errors.has('companyName')">Please enter company name</div>

            <b-form-input name="address"
                v-validate="'required'"
                v-model="address"
                placeholder="Company Address"
                :class="{'alert-border': errors.has('address')}">
            </b-form-input>
            <div class="alert alert-danger" v-show="errors.has('address')">Please enter address</div>

            <b-form-input name="city"
                v-validate="'required|alpha_spaces'"
                v-model="city"
                placeholder="City"
                :class="{'alert-border': errors.has('city')}">
            </b-form-input>
            <div class="alert alert-danger" v-show="errors.has('city')">Please enter city</div>

            <b-form-input name="postcode"
                v-validate="'required|numeric'"
                type="number"
                class="no-spinners"
                v-model="postcode"
                placeholder="Postcode"
                :class="{'alert-border': errors.has('postcode')}">
            </b-form-input>
            <div class="alert alert-danger" v-show="errors.has('postcode')">Please enter postcode</div>

            <b-form-input name="Company Phone"
                v-validate="'required|numeric'"
                class="no-spinners"
                v-model="companyPhone"
                placeholder="Phone Number"
                :class="{'alert-border': errors.has('Company Phone')}">
            </b-form-input>
            <div class="alert alert-danger" v-show="errors.has('Company Phone')">Please enter company phone number</div>
          </div>
          
          <div class="user">
          <h5>User Information</h5>
            <v-select name="userRole"
                v-validate="'required'"
                v-model="userRole" 
                :options="userRoles"
                placeholder="Job Role"
                class="mt-3"          
                id="selectBox"
                :class="{'alert-border': errors.has('userRole')}">
            </v-select>
            <div class="alert alert-danger" v-show="errors.has('userRole')">Please select your job role</div>

            <b-form-input name="name"
                v-validate="'required|alpha_spaces'"
                v-model="userName"
                placeholder="Name"
                :class="{'alert-border': errors.has('name')}">
            </b-form-input>
            <div class="alert alert-danger" v-show="errors.has('name')">Please enter your name</div>

            <b-form-input name="userPhone"
                v-validate="'required|numeric'"
                v-model="userPhone"
                class="no-spinners"
                placeholder="Phone Number"
                :class="{'alert-border': errors.has('userPhone')}">
            </b-form-input>
            <div class="alert alert-danger" v-show="errors.has('userPhone')">Please enter your phone number</div>

            <b-form-input name="email"
                v-validate="'required|email'"
                v-model="userEmail"
                placeholder="Email Address"
                :class="{'alert-border': errors.has('email')}">
            </b-form-input>
            <div class="alert alert-danger" v-show="errors.has('email')">Please enter a valid email address</div>

            <b-form-input name="password"
                v-validate="'required|min:6'"
                type="password"
                v-model="password"
                data-vv-delay="2000"
                placeholder="Password"
                :class="{'alert-border': errors.has('password')}">
            </b-form-input>
            <div class="alert alert-danger" v-show="errors.has('password')">{{ errors.first('password') }}</div>

            <b-form-input name="confirmPassword"
              v-validate="'confirmed:password'"
              type="password"
              v-model="confirmPassword"
              placeholder="Confirm Password"
              data-vv-delay="3000"
              data-vv-as="password"
              :class="{'alert-border': errors.has('name')}">
            </b-form-input>
             <div class="alert alert-danger" v-show="errors.has('confirmPassword')">{{ errors.first('confirmPassword') }}</div>
          </div>

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
      companyName: '',
      address: '',
      city: '',
      postcode: '',
      companyPhone: '',
      userName: '',
      userEmail: '',
      password: '',
      confirmPassword: '',
      userPhone: '',
      userRole: ''
    }
  },
  methods: {
    onSubmit () {
      this.$validator.validateAll().then(async(valid) => {
        if (!valid) { return }
        try {
          const userId = await this.$store.dispatch('newUser', {email: this.userEmail, password: this.password})
          console.log('User registered')
          const company = await this.$store.dispatch('newCompany', {
            name: this.companyName,
            address: this.address,
            city: this.city,
            phone: this.companyPhone,
            postcode: this.postcode,
            principal: true,
            contractor: false,
            user: userId  
          })
          console.log('Company created')
          await this.$store.dispatch('updateUser', {
            name: this.userName,
            email: this.userEmail,
            phone: this.userPhone,
            role: this.userRole,
            admin: true,
            webUser: true,
            company: company
          })
          alert('Congrats! A new company and a new user have been created')
          this.$router.push('/principal')
        } catch (err) {
          console.log(err)
        }
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

  .alert-danger {
    margin-top:10px;
    padding: 5px;
    font-size: 0.9rem;
  }

  .alert-border {
    border: 1px solid salmon;
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