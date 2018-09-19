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
        <h4 class="mt-2">{{worker.name}} has been updated</h4>
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
      @ok="saveNew"
      @cancel="cancel"
      header-bg-variant="primary"
      headerTextVariant= 'light'
      title="New Training Record">
      <div>
        <b-form-select :options="workerList" v-model="newTraining.worker" class="mb-2"></b-form-select>
        <b-form-select :options="trainingList" v-model="newTraining.training" class="mb-2"></b-form-select>
        <b-form-input v-model="newTraining.ID" placeholder="ID/License No." class="mb-2"></b-form-input>
        <b-row>
          <b-col cols="3">
            <label class="mt-3 ml-2">Expiry Date: </label>
          </b-col>
          <b-col>
            <b-form-input v-model="newTraining.expiry" type="date" no-spinners></b-form-input>
          </b-col>
        </b-row>
      </div>
    </b-modal>

    <b-card header-tag="header">
      <header slot="header">Training Register
        <b-btn
          v-if="readonly"
          variant="dark"
          @click="edit"
          v-b-tooltip.hover title="Edit Training Register">
          <i class="far fa-edit" style="color: #ffc80b"></i>
        </b-btn>
        <b-btn
          v-if="!readonly"
          variant="dark"
          @click="saveUpdates"
          v-b-tooltip.hover title="Save">
          <i class="fas fa-save" style="color: rgb(3, 169, 244)"></i>
        </b-btn>
         <b-btn
          v-if="readonly"
          variant="dark"
          @click="addNew = true"
          class="mr-2"
          v-b-tooltip.hover title="Add new training record">
          <i class="fas fa-plus" style="color: rgb(1, 206, 187)"></i>
        </b-btn>
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
                <tr v-for="(worker, index) in workers" :key="index" style="border-bottom: 1px solid #e9ecef">
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
export default {
  components: {
  },
  data () {
    return {
      readonly: true,
      loading: false,
      success: false,
      catcherror: false,
      errorMessage: '',
      addNew: false,
      newTraining: {
        worker: null,
        training: null,
        ID: '',
        expiry: ''
      }
    }
  },
  computed: {
    workers () {
      return this.$store.getters.workers
    },
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
    }
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
      this.readonly = false
    },
    cancel () {
      console.log('cancelling')
      this.newTraining = {
        worker: null,
        training: null,
        ID: '',
        expiry: ''
      }
    },
    add () {
      /*
      let training = this.newtraining
      this.worker.training.push({
        description: training.description,
        ID: training.ID,
        expiry: training.expiry
      })
      this.clear()
      */
    },
    saveUpdates () {
      console.log('saving updates')
    },
    saveNew () {
      this.loading = true
      console.log('saving new')
      // save updates to user profile
      try {
        /*
        if (this.newtraining.description !== '' && this.newtraining.description !== null) {
          console.log('adding training')
          this.addTraining()
        }
        if (this.changed === true) {
          // save changes
          try {
            this.$store.dispatch('updateTraining', this.worker)
            this.original = this._.cloneDeep(this.worker)
            this.success = true
            this.readonly = true
            this.loading = false
          } catch (error) {
            this.catcherror = true
            this.errorMessage = error.message
            this.readonly = true
            this.loading = false
          }
        } else {
          this.loading = false
          this.cancel()
        }
        */
      } catch (err) {
        console.log('ERROR', err.message)
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
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

</style>