<template>
  <b-card
    class="workerCard mt-2 mb-4" v-if="active">
    <header class="card-header worker">{{worker.name}}
      <b-button class="editBtn pt-1 pb-1 ml-2" @click="edit" v-if="editMode === false">Edit Worker</b-button>
      <b-button class="editBtn pt-1 pb-1 ml-2" @click="confirm" v-if="editMode === false">Delete Worker</b-button>
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

    <b-form  @submit.prevent="save" @change="dirty = true">
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
              <!--<b-form-input type="text" :value="worker.role" :readonly="readonly"/>-->
              <b-form-select v-model="worker.role" :options="userRoles" readonly/>
            </b-col>
          </b-row>
            <b-row class="inner-row">
            <b-col md="6" lg="4">
              <p>Admin User:</p>
            </b-col>
            <b-col md="6" lg="8">
              <b-form-checkbox id="checkbox"
                disabled
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
              <b-form-input id="description" placeholder="Training Description" :readonly="readonly" v-model="training.description" :class="{error: error.description}"/>
            </b-col>
            <b-col md="3" class="training-col">
              <b-form-input id="id" placeholder="ID# License#..." :readonly="readonly" type="text" v-model="training.ID"/>
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
              <b-form-input :readonly="readonly" :value="training.description"/>
            </b-col>
            <b-col md="3" class="training-col">
              <b-form-input id="id" placeholder="ID# License#..." :readonly="readonly" type="text" v-model="training.ID"/>
            </b-col>
            <b-col md="3" class="training-col">
              <b-form-input class="no-spinners" placeholder="Expiry" :value="formattedDate(training.expiry)" :readonly="readonly"/>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-form>
  </b-card> 
</template> 

<script>
export default {
  props: ['id', 'worker'],
  data () {
    return {
      dirty: false,
      active: true,
      success: false,
      confirmAction: false,
      readonly: true,
      editMode: false,
      disabled: true,
      training: {
        description: '',
        ID: '',
        expiry: ''
      },
      error: {
        description: false,
        expiry: false
      },
      userRoles: [
        { value: 'Health and Safety Manager', text: 'Health and Safety Manager' },
        { value: 'Health and Safety Administrator', text: 'Health and Safety Administrator' },
        { value: 'Business Administrator', text: 'Business Administrator' },
        { value: 'Project Manager', text: 'Project Manager' },
        { value: 'Supervisor', text: 'Supervisor' },
        { value: 'Worker', text: 'Worker' }
      ]
    }
  },
  methods: {
    formattedDate (trainingDate) {
      if (trainingDate === '') {
        return
      } else {
        var d = new Date(trainingDate)
        return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/')
      }
    },
    edit () {
      this.readonly = false
      this.editMode = true
      this.disabled = false
    },
    save () {
      // save updates to user profile
      if (this.dirty === true) {
        this.$store.dispatch('updateWorker', {id: this.id, worker: this.worker})
        .then(() => {
          this.success = true
        })
      } else {
        this.readonly = true
        this.editMode = false
        this.disabled = true
      }
    },
    clear () {
      // clear training fields
      this.training.description = ''
      this.training.ID = ''
      this.training.expiry = ''
      this.error.description = ''
      this.error.expiry = false
      document.getElementById('expiry').type = 'text'
    },
    confirm () {
      this.confirmAction = true
    },
    remove () {
      // remove company details from this worker
      this.worker.company = ''
      this.worker.companyName = ''
      this.worker.companyType = ''
      this.$store.dispatch('updateWorker', {id: this.id, worker: this.worker})
    },
    addTraining () {
      this.error.description = false
      this.error.expiry = false
      let training = this.training
      if (training.description === '') {
        this.error.description = true
        return
      } else if (training.expiry === '') {
        this.error.expiry = true
        return
      } else {
        this.worker.training.push({
          description: training.description,
          ID: training.ID,
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
