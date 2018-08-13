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
          <b-form-input 
            v-model="email"
            data-vv-delay="2000"
            placeholder="Email Address"
            style="margin-top: 50px"
            :class="{'alert-border': errors.has('email')}">
          </b-form-input>
          <b-form-text style="padding-top: 15px; margin-bottom:50px">Please contact your administrator if you need to confirm your user details</b-form-text>
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
            :disabled = "disabled"
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
            :disabled = "disabled"
            data-vv-delay="3000"
            placeholder="Confirm Password"
            data-vv-as="password"
            :class="{'alert-border': errors.has('confirmPassword')}">
          </b-form-input>
          <div class="alert alert-danger" v-show="errors.has('confirmPassword')">{{ errors.first('confirmPassword') }}</div>
          <b-button class="btn btn-block mt-4" @click="onSubmit">Sign Up
            <div class="loader">
              <pulse-loader :loading="loading" ></pulse-loader>
            </div>
          </b-button>
          <b-row class="links">
            <router-link to="login">EXISTING USER LOGIN</router-link>
          </b-row>
        </b-form>
      </b-container>
    </b-container>
  </animated-fade-in>
</template>

<script>
  import MiniHeader from '@/components/Webpage/MiniHeader.vue'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  export default {
    components: {
      miniHeader: MiniHeader,
      PulseLoader
    },
    data () {
      return {
        loading: false,
        disabled: false,
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
        this.loading = true
        this.disabled = true
        this.$validator.validateAll().then(async(valid) => {
          if (!valid) { return }
          try {
            // create new user in firebase
            let uid = await this.$store.dispatch('signUp', {email: this.user.email, password: this.password})
            // update userProfile with uid
            this.user.uid = uid
            await this.$store.dispatch('updateCurrentUser', this.user)
            await this.$store.dispatch('getUser')
            this.loading = false
            this.$router.push('/dashboard')
          } catch (err) {
            this.loading = false
            alert(err)
          }
        })
      }
    }
  }
  
</script>


<style scoped>
  .loader {
    margin: auto;
    width: 30%;
  }
  
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

  .form-control {
    margin-top: 10px;
  }
  
  .btn {
    background-color: rgba(18, 128, 122, 0.85);
    cursor: pointer;
    height: 50px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2em;
  }
  
  .btn:hover {
    background-color: rgba(29, 92, 158, 0.75);
  }

  .btn:disabled {
    cursor: progress;
  }
  
  a {
    margin: auto;
    font-size: 0.9em;
  }
  
</style>