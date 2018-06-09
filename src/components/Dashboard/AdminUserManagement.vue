<template>
  <b-container fluid>
    <!--ADD WORKER MODAL-->
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
              <label>Name:</label>
            </b-col>
            <b-col md="6" lg="8">
              <b-form-input type="text" v-model="name" :class="{'alert-border': error.name}"/>
              <div class="alert alert-danger" v-show="error.name">Please enter name</div>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col md="6" lg="4">
              <label>Role:</label>
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
              <label>Email Address:</label>
            </b-col>
            <b-col md="6" lg="8">
              <b-form-input type="text" v-model="email" :class="{'alert-border': error.email}"/>
              <div class="alert alert-danger" v-show="error.email">Please enter email</div>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col md="6" lg="4">
              <label>Phone Number:</label>
            </b-col>
            <b-col md="6" lg="8">
              <b-form-input type="text" v-model="phone" :class="{'alert-border': error.phone}"/>
              <div class="alert alert-danger" v-show="error.phone">Please enter phone number</div>
            </b-col>
          </b-row>
        </form>
      </div>
    </b-modal>
    <!--SUCCESS MESSAGE MODAL-->
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
      <label>{{successMessage}}</label>
    </b-modal>
    <!--CONFIRM ACTION MODAL-->
    <b-modal
      v-model="confirmAction"
      v-if="confirmAction" 
      @ok="remove" 
      centered
      header-bg-variant="danger"
      headerTextVariant= 'light'
      title="Confirm Action">
      <div class="d-block text-center">
        <h4 class="mt-2">Are you sure you want to remove <br>this worker?</h4>
        <br>
        <p>This action cannot be undone</p>
      </div>
    </b-modal>

    <b-card>
      <div class="card-header">User Management
        <b-button class="addBtn" @click="createNew = true">Add New User</b-button>
      </div>
      <div class="scroll-container">
        <b-card class="itemCard mt-2 mb-4" v-for="worker in workers" :key="worker.id">
          <header class="card-header item">{{worker.name}}
            <b-button class="editBtn pt-1 pb-1 ml-2" @click="confirm">Delete User</b-button>
          </header>
          <b-row class="outer-row">
            <b-col sm="12" lg="6">
              <b-row class="inner-row">
                <b-col md="4" lg="2" xl="3">
                  <label>Name:</label>
                </b-col>
                <b-col>
                  <b-form-input type="text" :value="worker.name" readonly/>
                </b-col>
              </b-row>
               <b-row class="inner-row">
                <b-col md="4" lg="2" xl="3">
                  <label>Role:</label>
                </b-col>
                <b-col>
                  <b-form-input type="text" :value="worker.role" readonly/>
                </b-col>
              </b-row>
            </b-col>
            <b-col lg="6">
              <b-row class="inner-row">
                <b-col md="4" lg="2" xl="3">
                  <label>Email:</label>
                </b-col>
                <b-col>
                  <b-form-input type="text" :value="worker.email" readonly/>
                </b-col>
              </b-row>
              <b-row class="inner-row">
                <b-col md="4" lg="2" xl="3">
                  <label>Phone:</label>
                </b-col>
                <b-col>
                  <b-form-input type="text" :value="worker.phone" readonly/>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </b-card>
  </b-container>
</template>

<script>
export default {
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
      confirmAction: false,
      userRoles: [
        { value: null, text: 'Please select an option' },
        { value: 'Administrator', text: 'Administrator' },
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
      }
      if (this.role === 'Administrator') {
        this.admin = true
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
    },
    confirm () {
      this.confirmAction = true
    },
    remove () {
      // remove company details from this worker
      this.worker.company = ''
      this.worker.companyName = ''
      this.worker.companyType = ''
      this.$store.dispatch('removeWorker', {id: this.id, worker: this.worker})
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;
    padding-right: 30px;
  }

  .card-header {
    margin: -20px -20px 0px -20px;
    background-color: rgba(155, 35, 53, 0.88);
    font-size: 1.4rem;
    color: white;
  }
  
  .card-header.item{
    background-color: #12807a;
    margin: 0;
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
  }
  
  .itemCard > .card-body {
    padding: 0;
    margin-bottom: 15px;
  }

  .addBtn {
    float: right;
    background-color: #ffc80b;
    color: black;
    cursor: pointer;
  }

  .outer-row {
    padding-left: 15px;
    padding-right: 15px;
  }

  .inner-row {
    margin-top: 15px;
    margin-bottom: 10px;
  }

  label {
    padding-top:6px;
  }

  .editBtn {
    float: right;
    background-color:rgba(223, 233, 255, 0.83);
    color: black;
  }
  
</style>