<template>
  <b-container fluid class="outside-container">
    <b-modal
      v-model="createNew"
      v-if="createNew" 
      @ok="handleOk"
      @cancel="handleCancel"
      centered 
      header-bg-variant="info"
      headerTextVariant= 'light'
      title="Add New Worker">
      <div>
        <form @submit.prevent="handleSubmit">
          <b-row class="inner-row">
            <b-col md="6" lg="4">
              <p>Name:</p>
            </b-col>
            <b-col md="6" lg="8">
              <b-form-input type="text" v-model="name"/>
              <div class="alert alert-danger" v-show="error.name">Please enter name</div>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col md="6" lg="4">
              <p>Role:</p>
            </b-col>
            <b-col md="6" lg="8">
              <b-form-select
                v-validate="'required'"
                v-model="role"
                :options="userRoles"   
                :class="{'alert-border': error.role}">
              </b-form-select>
              <div class="alert alert-danger" v-show="error.role">Please select job role</div>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col md="6" lg="4">
              <p>Email Address:</p>
            </b-col>
            <b-col md="6" lg="8">
              <b-form-input type="text" v-model="email"/>
              <div class="alert alert-danger" v-show="error.email">Please enter email</div>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col md="6" lg="4">
              <p>Phone Number:</p>
            </b-col>
            <b-col md="6" lg="8">
              <b-form-input type="text" v-model="phone"/>
              <div class="alert alert-danger" v-show="error.phone">Please enter phone number</div>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col md="6" lg="4">
              <p>Admin User:</p>
            </b-col>
            <b-col md="6" lg="8">
              <b-form-checkbox id="checkbox"
                class="mt-1 mb-1"
                v-model="admin"
                value=true
                unchecked-value=false>
              </b-form-checkbox>
            </b-col>
          </b-row>
        </form>
      </div>
    </b-modal>

     <b-modal
      v-model="success"
      v-if="success" 
      ok-only
      @ok="handleCancel"
      centered 
      header-bg-variant="info"
      headerTextVariant= 'light'
      title="Success!">
        <h5>{{name}} has been added to your Minimise community.</h5>
        <p>{{successMessage}}</p>
     </b-modal>

    <b-card>
      <div class="card-header">Worker Management
       <b-button class="addBtn" @click="createNew = true">Add New Worker</b-button>
      </div>
      <div class="scroll-container">
        <div v-for="worker in workers" :key="worker.id">
          <workerview :id="worker.id" :worker="worker.worker"></workerview>
        </div>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import WorkerView from '@/components/Shared/Worker.vue'
export default {
  components: {
    'workerview': WorkerView
  },
  data () {
    return {
      error: {
        name: false,
        email: false,
        phone: false,
        role: false
      },
      success: false,
      successMessage: '',
      userRoles: [
        { value: null, text: 'Please select an option' },
        { value: 'Health and Safety Manager', text: 'Health and Safety Manager' },
        { value: 'Health and Safety Administrator', text: 'Health and Safety Administrator' },
        { value: 'Business Administrator', text: 'Business Administrator' },
        { value: 'Project Manager', text: 'Project Manager' },
        { value: 'Supervisor', text: 'Supervisor' },
        { value: 'Worker', text: 'Worker' }
      ],
      createNew: false,
      name: '',
      email: '',
      phone: '',
      role: null,
      admin: false,
      webUser: false,
      training: [
        {
          description: 'Company Induction',
          ID: '',
          expiry: ''
        },
        {
          description: 'First Aid Certificate',
          ID: '',
          expiry: ''
        },
        {
          description: 'Site Safe Passport',
          ID: '',
          expiry: ''
        }
      ]
    }
  },
  computed: {
    workers () {
      return this.$store.getters.workers
    }
  },
  methods: {
    handleOk (evt) {
      // check that form is valid and then call submit function
      evt.preventDefault()
      this.error.name = false
      this.error.email = false
      this.error.phone = false
      this.error.role = false
      if (this.name === '') {
        console.log('name error')
        this.error.name = true
        return
      }
      if (this.role === null) {
        this.error.role = true
        return
      }
      if (this.role !== 'Worker') {
        this.webUser = true
      }
      if (this.email === '') {
        this.error.email = true
        return
      }
      if (this.phone === '') {
        this.error.phone = true
        return
      } else {
        console.log('form ready to submit')
        this.handleSubmit()
      }
    },
    handleCancel () {
      this.name = ''
      this.email = ''
      this.phone = ''
      this.role = null
      this.admin = false
      this.webUser = false
      this.error.name = false
      this.error.email = false
      this.error.phone = false
      this.error.role = false
    },
    handleSubmit () {
      // create a new user and send an email invitation if the user is not a worker
      this.$store.dispatch('inviteUser', {
        worker: {
          name: this.name,
          email: this.email,
          phone: this.phone,
          role: this.role,
          admin: this.admin,
          webUser: this.webUser,
          training: this.training
        }
      })
      .then(() => {
        if (this.role !== 'Worker') {
          this.successMessage = 'An email invitation has been sent'
          this.success = true
        } else {
          this.success = true
        }
      })
    }
  }
}
</script>

<style scoped>
  .card-header {
    margin: -20px -20px 20px -20px;
    background-color: rgba(29, 92, 158, 0.89);
    font-size: 1.4rem;
    color: white;
  }
  
  .addBtn {
    float: right;
    background-color: #ffc80b;
    color: black;
    cursor: pointer;
  }
  
</style>