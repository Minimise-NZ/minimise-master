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
              placeholder="Password"
              required>
          </b-form-input> 
        </b-input-group>

        <b-button class="btn-block" type="submit">LOGIN</b-button>
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
  export default {
    components: {
      miniHeader: MiniHeader
    },
    data () {
      return {
        error: false,
        message: '',
        email: '',
        password: ''
      }
    },
    methods: {
      loginUser () {
        this.$store.dispatch('signIn', {email: this.email, password: this.password})
        .then(async() => {
          console.log('getting user info')
          let user = await this.$store.dispatch('getUser')
          console.log(user)
          if (user.webUser === true) {
            this.$router.push('/dashboard')
          } else {
            this.message = 'You do not have access to the web portal. Please log in to the mobile app'
            this.error = true
            this.$store.dispatch('logout')
          }
        })
        .catch(
          err => {
            this.message = err.message
            this.error = true
            this.email = ''
            this.password = ''
          }
        )
      }
    }
  }
  
</script>

<style scoped>
  
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