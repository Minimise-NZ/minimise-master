<template>
  <b-container fluid class="outside-container">
    <b-modal 
      v-model="success" 
      v-if="success"
      ok-only
      centered 
      header-bg-variant="success"
      headerTextVariant= 'light'
      title="Success">
      <div class="d-block text-center">
        <h4 class="mt-2">Training register has been updated</h4>
      </div>
    </b-modal>
    <b-modal
      v-model="catcherror" 
      v-if="catcherror" 
      ok-only
      header-bg-variant="danger"
      headerTextVariant= 'light'
      title="Oops..">
      <div class="d-block text-center">
        <h4>Something went wrong. Please try again</h4>
        <h5>{{errorMessage}}</h5>
      </div>
    </b-modal>
    <b-modal
      v-model="addNew" 
      v-if="addNew"
      @ok="onSubmit"
      @cancel="cancel"
      no-close-on-backdrop
      no-close-on-esc
      header-bg-variant="primary"
      headerTextVariant= 'light'
      hide-header-close
      title="New Training Record">
      <div>
        <b-form @submit.prevent="onSubmit">
          <b-form-select 
            :options="workerList" 
            v-model="worker" 
            class="mb-2" 
            :state="workerState">
          </b-form-select>
          <b-form-select 
            :options="trainingList" 
            v-model="newTraining.description" 
            class="mb-2" 
            :state="descriptionState">
          </b-form-select>
          <b-form-input 
            v-if="newTraining.description === 'custom'" 
            v-model="custom" 
            placeholder="Please enter training description" 
            class="mb-2"
            :state="customState">
          </b-form-input>
          <b-form-input 
            v-model="newTraining.ID" 
            placeholder="ID/License No." 
            class="mb-2">
            </b-form-input>
          <b-row>
            <b-col cols="3">
              <label class="mt-3 ml-2" required>Expiry Date: </label>
            </b-col>
            <b-col>
              <b-form-input 
                v-model="newTraining.expiry" 
                type="date" 
                :state="expiryState"
                no-spinners>
              </b-form-input>
            </b-col>
          </b-row>
        </b-form>
      </div>
    </b-modal>

    <b-card header-tag="header">
      <header slot="header">Training Register
        <input type="text" v-model="search" class="form-control searchbox" placeholder="Search"/>
        <b-btn 
          v-if="readonly"
          variant="dark"
          @click="edit"
          v-b-tooltip.hover title="Edit Training Register">
          <i class="far fa-edit" style="color: #ffc80b"></i>
        </b-btn>
        <b-btn
          v-if="readonly"
          variant="dark"
          @click="addNew = true"
          class="mr-2"
          v-b-tooltip.hover title="Add new training record">
          <i class="fas fa-plus" style="color: rgb(1, 206, 187)"></i>
        </b-btn>
        <b-btn
          v-if="!readonly && !loading"
          variant="dark"
          @click="saveUpdates"
          v-b-tooltip.hover title="Save Changes">
          <i class="fas fa-save" style="color: rgb(135, 210, 50)"></i>
        </b-btn>
        <b-btn
          v-if="!readonly && !loading"
          variant="dark"
          @click="discard"
          class="mr-2"
          v-b-tooltip.hover title="Cancel/Discard Changes">
          <i class="fas fa-trash-alt" style="color: #FF9800"></i>
        </b-btn>
        <div class="loader" v-if="loading">
          <pulse-loader :loading="loading"></pulse-loader>
        </div>
      </header>
      <div class="scroll-container">
        <div style="border: 1px solid #d6d6d6">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>ID/License No</th>
                <th>Expiry</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(worker, index) in filtered" :key="index" style="border-bottom: 1px solid #e9ecef">
                <td style="font-weight: bold">{{worker.name}}</td>
                <td>
                  <ul v-for="(training, index) in worker.training" :key="index">
                    <li><b-form-input v-model="training.description" :readonly="readonly"></b-form-input></li>
                  </ul>
                </td>
                <td>
                  <ul v-for="(training, index) in worker.training" :key="index">
                    <li><b-form-input v-model="training.ID" :readonly="readonly"></b-form-input></li>
                  </ul>
                </td>
                <td>
                  <ul v-for="(training, index) in worker.training" :key="index">
                  <li>
                    <b-form-input id="expiry" type="date" class="no-spinners" :value="training.expiry" v-model="training.expiry" :readonly="readonly"/>
                  </li>
                </ul>
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
import moment from 'moment'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  components: {
    PulseLoader
  },
  data () {
    return {
      beforeEditingCache: {},
      search: '',
      readonly: true,
      loading: false,
      success: false,
      catcherror: false,
      errorMessage: '',
      addNew: false,
      newTraining: {
        description: null,
        ID: '',
        expiry: ''
      },
      worker: null,
      custom: '',
      workers: [],
      workerState: true,
      descriptionState: true,
      customState: true,
      expiryState: true
    }
  },
  computed: {
    workerList () {
      let names = [{
        value: null, text: 'Please select worker'
      }]
      let list = this.workers
      list.forEach((item, index, object) => {
        names.push({
          value: item.id, text: item.name
        })
      })
      return names
    },
    trainingList () {
      return this.$store.getters.trainingList
    },
    filtered () {
      return this.workers.filter(worker => {
        return worker.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  beforeMount () {
    this.workers = this.$store.getters.workers
  },
  methods: {
    expiry (date) {
      if (date === '') {
        return ''
      } else {
        return moment(date).format('DD-MM-YYYY')
      }
    },
    edit () {
      this.beforeEditingCache = this._.cloneDeep(this.workers)
      this.readonly = false
    },
    cancel () {
      console.log('cancelling')
      this.newTraining = {
        description: null,
        ID: '',
        expiry: ''
      }
      this.custom = ''
      this.worker = null
      this.workerState = true
      this.descriptionState = true
      this.customState = true
      this.expiryState = true
      this.addNew = false
      this.loading = false
    },
    discard () {
      this.workers = this._.cloneDeep(this.beforeEditingCache)
      this.readonly = true
    },
    saveUpdates () {
      this.loading = true
      console.log('saving updates')
      this.$store.dispatch('updateTraining', this.workers)
      .then(() => {
        this.success = true
        this.readonly = true
        this.loading = false
      })
      .catch((err) => {
        this.catcherror = true
        this.errorMessage = err.errorMessage
        this.loading = false
      })
    },
    onSubmit (e) {
      e.preventDefault()
      if (this.worker === null) {
        this.workerState = false
        return
      } else if (this.newTraining.description === null) {
        this.descriptionState = false
        return
      } else if (this.newTraining.description === 'custom' && this.custom === '') {
        this.customState = false
        return
      } else if (this.newTraining.expiry === '') {
        this.expiryState = false
        return
      } else {
        this.saveNew()
      }
    },
    saveNew () {
      this.loading = true
      console.log('saving new')
      try {
        if (this.custom !== '') {
          this.newTraining.description = this.custom
          console.log('adding custom training')
          this.$store.dispatch('submitFeedback', {
            username: 'minimise internal',
            userEmail: 'minimise.online@gmail.com',
            subject: 'Custom training request',
            platform: 'n/a',
            os: 'n/a',
            mobile: 'n/a',
            details: this.custom
          })
        }
        console.log('updating training', this.newTraining)
        this.$store.dispatch('newTraining', {training: this.newTraining, worker: this.worker})
        .then(() => {
          this.workers = this.$store.getters.workers
          this.cancel()
        })
      } catch (error) {
        console.log(error)
        this.cancel()
      }
    }
  }
}
</script>

<style scoped>
body {
  font-size: 0.9em;
  line-height: 1.0;
}

.form-control {
  font-size: 1em;
}
  .container-fluid {
    padding-top: 20px;
    padding-right: 20px;
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

  .searchbox {
    display: inline-block;
    width: 400px;
    margin-left: 20px;
    line-height: 1.1em;
    background-color: grey;
    color: white;
    cursor: default;
  }

  .btn {
    float: right;
  }

  .table {
    margin-bottom: 0;
  }

  thead {
    background-color: rgba(125, 6, 6, 0.74);
    color: white;
  }

  th {
    border: none;
    font-weight: normal;
  }

  ul {
    list-style: none;
    padding-left:0;
    margin-bottom: 10px;
  }

  #expiry {
    padding-top: 6px;
    padding-bottom: 6px;
  }

  .loader {
    float: right;
    width: 80px;
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
</style>