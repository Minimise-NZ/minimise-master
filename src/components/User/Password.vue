<template>
  <div>
    <div class="form-title">
      <h5 class="my-primary-accent">Reset Password</h5>
    </div>
    <b-form @submit="onSubmit" id="form">
      <b-form-group>
        <b-form-input
            id="login-email"
            type="email"
            v-model="form.email"
            placeholder="Email Address">
        </b-form-input>
      </b-form-group>
      <b-button class="btn-block" type="submit" @click="resetPassword">Submit</b-button>
      <div class="row links">
         <router-link to="login">Login</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          email: ''
        }
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      resetPassword () {
        // send an email with reset password
      }
    }
  }
  
</script>

<style scoped>
  
  .form-title {
    background-color: rgba(56, 56, 56, 0.6);
    border-radius: 5px;
    padding: 20px;
  }
  
  .form-control {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  
  form {
    background-color: rgba(56, 56, 56, 0.6);
    border-radius: 5px;
    margin: auto;
    margin-top: 20px;
    padding: 20px;
  }
  
  #form {
    margin-bottom: 0;
  }
  
  h5 {
    font-family: 'trebuchet MS';
    margin-bottom: 0;
    font-weight: bold;
  }
  
  button {
    font-weight: 600;
    color: #383838;
    background-color: #FFC80B;
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
  
</style>