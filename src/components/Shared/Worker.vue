<template>
  <b-card
    class="workerCard mt-2 mb-4" v-if="active">
    <header class="card-header worker">{{worker.name}}
      <b-button class="editBtn pt-1 pb-1 ml-2" @click="edit" v-if="editMode === false">Update Training</b-button>
      <b-button class="editBtn pt-1 pb-1 ml-2" @click="confirm" v-if="editMode === false">Delete Worker</b-button>
      <b-button class="editBtn pt-1 pb-1 ml-2" @click="cancel" v-if="editMode === true">Cancel</b-button>
      <b-button class="editBtn pt-1 pb-1 ml-2" @click="save" v-if="editMode === true">Save Updates</b-button>
    </header>
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
    <b-row class="outer-row m-0">
      <b-col m="12" lg="5" class="outer-col">
        <b-row class="inner-row">
          <b-col md="6" lg="4">
            <p>Name:</p>
          </b-col>
          <b-col md="6" lg="8">
            <b-form-input type="text" :value="worker.name" readonly/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col md="6" lg="4">
            <p>Email Address:</p>
          </b-col>
          <b-col md="6" lg="8">
            <b-form-input type="text" :value="worker.email" readonly/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col md="6" lg="4">
            <p>Phone Number:</p>
          </b-col>
          <b-col md="6" lg="8">
            <b-form-input type="text" :value="worker.phone" readonly/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col md="6" lg="4">
            <p>Role:</p>
          </b-col>
          <b-col md="6" lg="8">
            <b-form-input type="text" :value="worker.role" readonly/>
          </b-col>
        </b-row>
          <b-row class="inner-row">
          <b-col md="6" lg="4">
            <p>Admin User:</p>
          </b-col>
          <b-col md="6" lg="8">
            <b-form-checkbox id="checkbox"
              :disabled="disabled"
              class="mt-1 mb-1"
              v-model="worker.admin"
              value=true
              unchecked-value=false>
              <p v-if="worker.admin === true" class="mt-0"><span style="color:#007bff">This user has administration priviledges</span></p>
            </b-form-checkbox>
          </b-col>
        </b-row>
      </b-col>
      <b-col m="12" lg="7" class="outer-col second-col">
        <b-row class="inner-row">
          <b-col md="5" class="training-col">
            <b-form-input type="text" placeholder="Training Description" :readonly="readonly" v-model="training.description" :class="{error: error.description}"/>
          </b-col>
          <b-col md="3" class="training-col">
            <b-form-input id="date" class="no-spinners" placeholder="Date" :readonly="readonly" type="text" onfocus="(this.type='date')" v-model="training.date" :class="{error: error.date}"/>
          </b-col>
          <b-col md="3" class="training-col">
            <b-form-input id="expiry" class="no-spinners" placeholder="Expiry" :readonly="readonly" type="text" onfocus="(this.type='date')" v-model="training.expiry" :class="{error: error.expiry}"/>
          </b-col>
          <b-col md="1" class="training-col">
            <b-button variant="primary" :disabled="disabled" @click="addTraining"><i class="fa fa-plus"></i></b-button> 
          </b-col>
        </b-row>
        <b-row class="inner-row" v-for="training in worker.training" :key="training.description">
          <b-col md="5" class="training-col"> 
            <b-form-input type="text" :readonly="readonly" :value="training.description"/>
          </b-col>
          <b-col md="3" class="training-col">
            <b-form-input class="no-spinners" :value="formattedDate(training.date)" :readonly="readonly"/>
          </b-col>
          <b-col md="3" class="training-col">
            <b-form-input class="no-spinners" :value="formattedDate(training.expiry)" :readonly="readonly"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-card> 
</template> 

<script>
export default {
  props: ['worker'],
  data () {
    return {
      active: true,
      success: false,
      confirmAction: false,
      readonly: true,
      editMode: false,
      disabled: true,
      training: {
        description: '',
        date: '',
        expiry: ''
      },
      error: {
        description: false,
        date: false,
        expiry: false
      }
    }
  },
  computed: {
  },
  methods: {
    formattedDate (trainingDate) {
      var d = new Date(trainingDate)
      return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/')
    },
    edit () {
      this.readonly = false
      this.editMode = true
      this.disabled = false
    },
    save () {
      // save updates to user profile
      this.$store.dispatch('updateUser', this.worker)
      .then(() => {
        this.cancel()
        this.success = true
      })
    },
    clear () {
      this.training.description = ''
      this.training.date = ''
      this.training.expiry = ''
      document.getElementById('date').type = 'text'
      document.getElementById('expiry').type = 'text'
    },
    cancel () {
      // cancel and remove readonly
      this.training.description = ''
      this.training.date = ''
      this.training.expiry = ''
      document.getElementById('date').type = 'text'
      document.getElementById('expiry').type = 'text'
      this.readonly = true
      this.editMode = false
      this.disabled = true
    },
    confirm () {
      this.confirmAction = true
    },
    remove (vm) {
      // remove company details from this worker
      this.worker.company = ''
      this.worker.companyName = ''
      this.worker.companyType = ''
      this.$store.dispatch('updateUser', this.worker)
      this.active = false
    },
    addTraining () {
      this.error.description = false
      this.error.date = false
      this.error.expiry = false
      let training = this.training
      if (training.description === '') {
        this.error.description = true
        return
      } else if (training.date === '') {
        this.error.date = true
        return
      } else if (training.expiry === '' || training.expiry <= training.date) {
        this.error.expiry = true
        return
      } else {
        this.worker.training.push({
          description: training.description,
          date: training.date,
          expiry: training.expiry
        })
        this.clear()
      }
    }
  }
}
</script>

<style>

.editBtn {
    float: right;
    background-color:rgba(223, 233, 255, 0.83);
    color: black;
  }
  
  .card-header.worker{
    background-color: rgba(111, 50, 130, 0.86);
    margin: 0;
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
  }
  
  .subheader {
    padding: 15px 0 15px 15px;
    border-bottom: 1px solid lightgrey;
    font-weight: bold;
    color: black;
  }
  
  .workerCard > .card-body {
    padding: 0;
  }

  .outer-col {
    padding-right: 0;
  }

  .inner-row {
    margin-top: 15px;
    margin-right: 0;
    padding-right: 10px;
  }

  .training-col {
    padding: 0 5px 0 5px;
  }

  p {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  button:disabled {
    cursor: default;
  }

  .error {
    border: 1px solid red;
  }

  .no-spinners {
    -moz-appearance:textfield;
  }

  .no-spinners::-webkit-outer-spin-button,
  .no-spinners::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

</style>
