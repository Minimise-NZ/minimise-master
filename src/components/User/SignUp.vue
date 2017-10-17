<template>
  <div>
    <div class="form-title">
      <h5 class="my-primary-accent">Sign Up</h5>
    </div>
    <b-form>
      <b-row>
        <b-col cols="6">
          <b-button class="register" @click="registerCompany">Register a Company</b-button>
        </b-col>
        <b-col cols="6">
          <b-button class="register" @click="registerUser">Register a <br>User</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
  export default {
    methods: {
      registerCompany () {
        this.$router.push('/newCompany')
      },
      registerUser () {
        this.$router.push('/newUser')
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
  
  .register {
    height: 80px;
    border-radius: 5px;
    width: 100%;
    font-weight: 500;
    white-space:normal;
  }
  
  button {
    font-family: 'trebuchet MS';
    font-weight: 500;
    color: #383838;
    background-color: #FFC80B;
    font-size: 1.1rem;
  }
  
  button:hover {
    background-color: #383838;
    cursor: pointer;
  }
  
  a {
    color: white;
    text-decoration-line: underline;
    font-size: .8rem;
  }
  
</style>