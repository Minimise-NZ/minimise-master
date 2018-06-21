<template>
 <animated-roll-in>
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
    <b-container class="login-container">
      <h2>Log In</h2>
      <b-form @submit.prevent="loginUser" id="login" autocomplete="on">
         <b-input-group>
           <b-input-group-addon>
             <i class="fa fa-envelope" aria-hidden="true"></i>
           </b-input-group-addon>
           <b-form-input
              id="login-email"
              type="email"
              v-model="email"
              :disabled = "disabled"
              placeholder="Email Address"
              required>
          </b-form-input>
         </b-input-group>

         <b-input-group>
           <b-input-group-addon>
             <i class="fa fa-lock fa-lg" aria-hidden="true"></i>
           </b-input-group-addon>
          <b-form-input
              id="login-password"
              type="password"
              v-model="password"
              :disabled = "disabled"
              placeholder="Password"
              required>
          </b-form-input> 
        </b-input-group>

        <b-button class="btn-block" type="submit" :disabled="disabled">
          <p style="font-size: 1rem; margin-bottom: 0" v-if="loading===false">LOGIN</p>
          <div class="loader">
            <pulse-loader :loading="loading" ></pulse-loader>
          </div>
        </b-button>
        <b-row class="links">
          <router-link to="password">FORGOT PASSWORD</router-link>
        </b-row>
      </b-form>
    </b-container>
  </b-container>
  </animated-roll-in>
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
        email: '',
        password: ''
      }
    },
    methods: {
      loginUser () {
        this.loading = true
        this.disabled = true
        this.$store.dispatch('signIn', {email: this.email, password: this.password})
        .then(async() => {
          console.log('getting user info')
          let user = await this.$store.dispatch('getUser')
          console.log(user)
          if (user.webUser === true) {
            this.loading = false
            this.$router.push('/dashboard')
          } else {
            this.message = 'You do not have access to the web portal. Please log in to the mobile app'
            this.error = true
            this.loading = false
            this.$store.dispatch('logout')
          }
        })
        .catch(
          err => {
            this.message = err.message
            this.error = true
            this.email = ''
            this.password = ''
            this.loading = false
            this.disabled = false
          }
        )
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
  
  .login-container {
    padding: 50px 80px;
    margin-top: 150px;
    width: 500px;
    border-radius: 10px;
    border: 1px solid lightgrey;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .input-group {
    height: 50px;
    margin-bottom: 20px;
  }
  
  .input-group-addon {
    width: 40px;
  }
  
  .btn-block {
    background-color: #616161;
    height: 50px;
  }
  
  .btn:hover {
    background-color: #FFC80B;
    color: #383838;
    cursor: pointer;
  }

  .btn:disabled {
    background-color: #666666;
    cursor: progress;
  }
  
  .row {
    margin-top: 20px;
  }

  .links {
    text-align: center;
  }
  
  a {
    font-size: 0.9rem;
    margin:auto;
  }
  
  
</style>