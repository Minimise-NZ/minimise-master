<template>
  <animated-fade-in>
    <b-container fluid>
      <miniHeader></miniHeader>
      <b-modal 
      v-model="error" 
      v-if="error"
      ok-only
      centered 
      header-bg-variant="danger"
      headerTextVariant= 'light'
      title="Oops...">
      <div class="d-block text-center">
        <h4 class="mt-2">{{message}}</h4>
      </div>
      </b-modal>
      <b-container class="form-container">
        <div class="user-header">
          <h3>Sign Up: New User</h3>
        </div>

        <b-form v-if="!confirmUser">
          <label class="mt-4" for="email">Please enter your email address:</label>
          <b-form-input 
            id="email"
            v-model="email"
            data-vv-delay="2000"
            placeholder="Email Address"
            :class="{'alert-border': errors.has('email')}">
          </b-form-input>
          <div class="alert alert-danger" v-show="errors.has('email')">Please enter a valid email address</div>
          <b-button class="btn btn-block mt-4" @click="getUser">Continue</b-button>
          <b-row class="links">
            <router-link to="login">EXISTING USER LOGIN</router-link>
          </b-row>
        </b-form>

        <b-form @submit.prevent="onSubmit" id="form" v-if="confirmUser">
          <b-form-input :value="user.name" readonly></b-form-input>
          <b-form-input :value="user.phone" readonly></b-form-input>
          <b-form-input :value="user.email" readonly></b-form-input>
          <b-form-input :value="user.companyName" readonly></b-form-input>
          <b-form-input :value="user.role" readonly></b-form-input>
          <b-form-input name="password"
            v-validate="'required|min:6'"
            v-if="confirmUser"
            type="password"
            v-model="password"
            data-vv-delay="2000"
            placeholder="Enter Password"
            :class="{'alert-border': errors.has('password')}">
          </b-form-input>
          <div class="alert alert-danger" v-show="errors.has('password')">{{ errors.first('password') }}</div>
          <b-form-input name="confirmPassword"
            v-validate="'confirmed:password'"
            v-if="confirmUser"
            type="password"
            v-model="confirmPassword"
            data-vv-delay="3000"
            placeholder="Confirm Password"
            data-vv-as="password"
            :class="{'alert-border': errors.has('confirmPassword')}">
          </b-form-input>
          <div class="alert alert-danger" v-show="errors.has('confirmPassword')">{{ errors.first('confirmPassword') }}</div>
          <b-button class="btn btn-block mt-4" @click="onSubmit">Sign Up</b-button>
          <b-row class="links">
            <router-link to="login">EXISTING USER LOGIN</router-link>
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
        error: false,
        message: '',
        confirmUser: false,
        password: '',
        confirmPassword: '',
        user: {},
        email: ''
      }
    },
    computed: {
    },
    created () {
    },
    methods: {
      getUser () {
        // get user with this email address and return user object
        this.$store.dispatch('getPendingUser', this.email)
        .then((user) => {
          console.log(user)
          this.user = user
          this.confirmUser = true
        })
        .catch((error) => {
          this.message = error
          this.error = true
        })
      },
      onSubmit () {
        this.$validator.validateAll().then(async(valid) => {
          if (!valid) { return }
          try {
            // create new user in firebase
            let uid = await this.$store.dispatch('signUp', {email: this.email, password: this.password})
            // update userProfile with uid
            this.user.uid = uid
            await this.$store.dispatch('updateCurrentUser', this.user)
            await this.$store.dispatch('getUser')
            let companyType = this.user.companyType
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
    margin-top: 120px;
    margin-bottom: 100px;
  }
  
  .user-header {
    max-width: 400px;
    border-radius: 5px;
    padding: 15px 0 10px 0;
    margin: auto;
    margin-bottom: 25px;
    text-align: center;
    background-color: rgba(111, 50, 130, 0.75);
    color: white;
    font-family: 'Montserrat', sans-serif;
  }
  
  form {
    max-width: 400px;
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
    margin-top: 10px;
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
    margin: auto;
    font-size: 0.9rem;
  }
  
</style>