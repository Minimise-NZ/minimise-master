<template>
 <animated-slide-in-right>
  <b-container fluid>
    <miniHeader></miniHeader>
    <b-container class="login-container">
      <h2>Reset Password</h2>
      <b-form id="pwdreset">
         <b-input-group>
           <b-input-group-addon>
             <i class="fa fa-envelope" aria-hidden="true"></i>
           </b-input-group-addon>
           <b-form-input
              id="login-email"
              type="email"
              v-model="entered.email"
              placeholder="Email Address"
              required>
          </b-form-input>
         </b-input-group>

        <b-button class="btn-block login-btn" @click="resetPassword" >SUBMIT</b-button>
        <b-row class="links">
          <router-link to="login">LOGIN</router-link>
        </b-row>
      </b-form>
    </b-container>
  </b-container>
  </animated-slide-in-right>
</template>

<script>
  import MiniHeader from '@/components/Webpage/MiniHeader.vue'
  export default {
    components: {
      miniHeader: MiniHeader
    },
    data () {
      return {
        entered: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      resetPassword () {
        let email = this.entered.email
        this.$store.dispatch('passwordReset', email)
        this.$router.push('/login')
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
    height: 50px;
  }
  
  .row.links {
    margin-top: 20px;
  }
  
  a {
    margin: auto;
    font-size: 0.9rem;
  }
  
  .login-btn {
  background-color: #616161;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.login-btn:hover {
  background-color: #FFC80B;
  color: #383838;
}
</style>