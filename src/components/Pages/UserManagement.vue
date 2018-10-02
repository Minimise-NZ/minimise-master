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
        <form>
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
      <h5>{{successMessage}}</h5>
      <label>{{successMessage2}}</label>
    </b-modal>
    <!--ERROR MODAL-->
     <b-modal
      v-model="errorModal"
      v-if="errorModal" 
      ok-only
      header-bg-variant="danger"
      headerTextVariant= 'light'
      title="Oops..">
      <div class="d-block text-center">
        <h4>Something went wrong. Please try again</h4>
        <h5>{{errorMessage}}</h5>
      </div>
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

    <b-card header-tag="header">
      <header slot="header">User Management
        <input type="text" v-model="search" class="form-control searchbox" placeholder="Search"/>
        <b-btn 
          variant="dark"
          @click="createNew = true"
          v-b-tooltip.hover title="Add New User">
          <i class="fas fa-plus" style="color: rgb(1, 206, 187)"></i>
        </b-btn>
      </header>
       <div class="scroll-container">
        <div style="border: 1px solid #d6d6d6">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(worker, index) in filtered" :key="index" style="border-bottom: 1px solid #e9ecef">
                <td style="font-weight: bold; padding-top: 20px" :readonly="readonly(index)">{{worker.name}}</td>
                <td>
                  <b-form-select
                    v-validate="'required'"
                    v-model="worker.role"
                    :options="userRoles"
                    v-if="readonly(index) === false"
                    :class="{'alert-border': error.role}">
                  </b-form-select>
                  <b-form-input v-if="readonly(index) === true" readonly v-model="worker.role"></b-form-input>
                </td>
                <td :readonly="readonly(index)">
                  <b-form-input :readonly="readonly(index)" v-model="worker.email"></b-form-input>
                </td>
                <td :readonly="readonly(index)">
                  <b-form-input :readonly="readonly(index)" v-model="worker.phone"></b-form-input>
                </td>
                <td :readonly="readonly(index)" class="pl-0">
                  <b-btn 
                    v-if="edit !== index && loading === false"
                    variant="dark"
                    @click="edit = index"
                    v-b-tooltip.hover title="Edit User Details">
                    <i class="far fa-edit" style="color: #ffc80b"></i>
                  </b-btn>
                  <b-btn
                    v-if="edit === index && loading === false"
                    variant="dark"
                    @click="updateUser(index)"
                    v-b-tooltip.hover title="Save Updates">
                    <i class="fas fa-save" style="color: rgb(135, 210, 50)"></i>
                  </b-btn>
                  <b-btn
                    v-if="edit === index && loading === false"
                    variant="dark"
                    @click="confirm(index)"
                    class="mr-2"
                    v-b-tooltip.hover title="Remove User">
                    <i class="fas fa-times" style="color: rgb(224, 61, 61)"></i>
                  </b-btn>
                  <div class="loader" v-if="loading">
                    <pulse-loader :loading="loading"></pulse-loader>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  components: {
    PulseLoader
  },
  data () {
    return {
      loading: false,
      search: '',
      edit: '',
      index: '',
      error: {
        name: false,
        email: false,
        phone: false,
        role: false
      },
      success: false,
      successMessage: '',
      successMessage2: '',
      errorModal: false,
      errorMessage: '',
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
    },
    filtered () {
      return this.workers.filter(worker => {
        return worker.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    readonly (index) {
      if (this.edit === index) {
        return false
      } else {
        return true
      }
    },
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
      if (this.role === 'Administrator') {
        this.admin = true
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
      try {
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
          this.successMessage = this.name + ' has been added to your Minimise community'
          if (this.role !== 'Worker') {
            this.successMessage2 = 'An email invitation has been sent'
            this.success = true
          } else {
            this.success = true
          }
        })
      } catch (error) {
        this.errorMessage = error.message
        this.errorModal = true
      }
    },
    confirm (index) {
      this.index = index
      this.confirmAction = true
    },
    updateUser () {
      this.loading = true
      let worker = this.workers[this.index]
      console.log('updating user', worker)
      this.$store.dispatch('updateWorker', {id: worker.id, worker: worker})
      .then(() => {
        this.successMessage = worker.name + ' has been updated'
        this.success = true
        this.loading = false
      })
      .catch((error) => {
        this.errorMessage = error.message
        this.errorModal = true
        this.loading = false
      })
    },
    remove () {
      // remove company details from this worker
      this.loading = true
      let worker = this.workers[this.index]
      worker.companyKey = ''
      worker.companyName = ''
      this.$store.dispatch('updateWorker', {id: worker.id, worker: worker})
      .then(() => {
        this.successMessage = worker.name + ' has been removed from your Minimise community'
        this.success = true
        this.edit = ''
        this.loading = false
      })
      .catch((error) => {
        this.errorMessage = error.message
        this.errorModal = true
        this.edit = ''
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    padding-right: 30px;
  }

  .searchbox {
    display: inline-block;
    width: 400px;
    margin-left: 20px;
    line-height: 1.1em;
    background-color: grey;
    color: white;
    cursor: default;
  }

   .scroll-container {
    height: 80vh;
    overflow-y: scroll;
    padding-right: 10px;
  }

  .card-header {
    background-color: rgba(56, 56, 56, 0.88);
    font-size: 1.2em;
    color: white;
    line-height: 2em;
  }

  .btn {
    float: right;
  }

  .searchbox::placeholder {
    color: white;
    opacity: 1; /* Firefox */
  }

  .searchbox:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: white;
  }

  .searchbox::-ms-input-placeholder { /* Microsoft Edge */
    color: white;
  }

  thead {
    background-color: rgba(9, 69, 90, 0.85);
    color: white;
  }

  th {
    border: none;
    font-weight: normal;
  }

  .inner-row {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  label {
    margin-top: 7px;
  }
  
  .loader {
    float: right;
    width: 80px;
  }

</style>