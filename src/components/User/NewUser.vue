<template>
  <animated-fade-in>
    <b-container fluid>
      <miniHeader></miniHeader>
      <b-container class="form-container">
        <div class="user-header">
          <h3>Sign Up: New User</h3>
        </div>
        <b-form @submit.prevent="onSubmit" id="form">
          <v-select name="company"
              v-validate="'required'"
              v-model="company" 
              :options="companies"
              placeholder="Company Name"
              id="selectBox"
              :class="{'alert-border': errors.has('company')}">
          </v-select>
          <div class="alert alert-danger" v-show="errors.has('company')">Please select your Company</div>

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
                v-model="name"
                placeholder="Name"
                :class="{'alert-border': errors.has('name')}">
          </b-form-input>
          <div class="alert alert-danger" v-show="errors.has('name')">Please enter your name</div>

          <b-form-input name="phone"
                v-validate="'required|numeric'"
                v-model="phone"
                class="no-spinners"
                placeholder="Phone Number"
                :class="{'alert-border': errors.has('phone')}">
          </b-form-input>
          <div class="alert alert-danger" v-show="errors.has('phone')">Please enter your phone number</div>
          
          <b-form-input name="email"
                v-validate="'required|email'"
                v-model="email"
                data-vv-delay="2000"
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
            data-vv-delay="3000"
            placeholder="Confirm Password"
            data-vv-as="password"
            :class="{'alert-border': errors.has('confirmPassword')}">
          </b-form-input>
          <div class="alert alert-danger" v-show="errors.has('confirmPassword')">{{ errors.first('confirmPassword') }}</div>

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
        userRoles: ['Health and Safety Manager', 'Health and Safety Administrator', 'Business Administrator', 'Project Manager', 'Supervisor'],
        company: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        userRole: ''
      }
    },
    computed: {
      admin () {
        if (this.userRole === 'Health and Safety Manager' | this.userRole === 'Health and Safety Administrator' | this.userRole === 'Business Administrator') {
          return true
        } else {
          return false
        }
      },
      companies () {
        return this.$store.getters.companyIndex
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    created () {
      this.$store.dispatch('getCompanyIndex')
    },
    methods: {
      onSubmit () {
        this.$validator.validateAll().then(async(valid) => {
          if (!valid) { return }
          try {
            // create new user in firebase
            await this.$store.dispatch('signUp', {email: this.email, password: this.password})
            let company = await this.$store.dispatch('getCompany', {key: this.company.value})
            // add user information to firestore
            let companyType = 'contractor'
            if (company.principal === true) {
              companyType = 'principal'
            }
            await this.$store.dispatch('newUser', {
              id: this.$store.getters.userKey,
              name: this.name,
              email: this.email,
              phone: this.phone,
              role: this.userRole,
              admin: this.admin,
              webUser: true,
              company: this.company.value,
              companyName: this.company.label,
              companyType,
              training: []
            })
            // go to companyType home page
            this.$router.push('/' + companyType)
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