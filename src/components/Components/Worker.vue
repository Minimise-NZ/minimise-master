<template>
  <b-card
    class="workerCard mt-2 mb-4">
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

    <header class="card-header worker">{{worker.name}}
      <b-button  
        class="addBtn pt-1 pb-1"
        style="background-color: #ffc80b; color: black"
        @click="edit"
        v-if="readonly && !loading"
        v-b-tooltip.hover title="Edit training register">
        <i class="fa fa-edit fa-lg"></i>
      </b-button>
      <b-button  
        class="addBtn pt-1 pb-1 ml-2"
        style="background-color: #dc3545"
        @click="cancel"
        v-if="!readonly && !loading"
        v-b-tooltip.hover title="Discard changes">Cancel
        <i class="fa fa-times ml-1"></i>
      </b-button>
      <b-button
        style="background-color: #28a745"
        class="addBtn pt-1 pb-1"
        @click="save"
        v-if="!readonly && !loading"
        v-b-tooltip.hover title="Save updates">Save
        <i class="fa fa-save ml-2"></i>
      </b-button>
      <div class="loader" v-if="loading" style="float: right">
        <pulse-loader :loading="loading" ></pulse-loader>
      </div>
    </header>

    <b-form  @submit.prevent="save">
      <b-row>
        <b-col md="5" >
          <header>Training Description</header>
        </b-col>
        <b-col md="3" >
          <header>ID/Licence No/Certificate</header>
        </b-col>
        <b-col md="3" >
          <header>Expiry Date</header>
        </b-col>
        <b-col md="1" >
        </b-col>
      </b-row>
      <b-row v-if="!readonly">
        <b-col md="5" >
          <b-form-select id="description"  :options="trainingOptions" :disabled="readonly" v-model="newtraining.description"/>
        </b-col>
        <b-col md="3" >
          <b-form-input id="id" placeholder="ID#/Licence no/Certificate" :readonly="readonly" type="text" v-model="newtraining.ID"/>
        </b-col>
        <b-col md="3" >
          <b-form-input id="expiry" class="no-spinners" :readonly="readonly" type="text" onfocus="(this.type='date')" v-model="newtraining.expiry"/>
        </b-col>
        <b-col md="1" >
          <b-button variant="success" 
            :disabled="readonly" 
            @click="addTraining"
            v-b-tooltip.hover title="Add New Training"><i class="fa fa-plus"></i></b-button> 
        </b-col>
      </b-row>
      <b-row v-for="training in worker.training" :key="training.description">
        <b-col md="5" > 
          <b-form-select id="description"  :options="trainingOptions" :disabled="readonly" v-model="training.description"/>
        </b-col>
        <b-col md="3" >
          <b-form-input id="id" :readonly="readonly" type="text" v-model="training.ID"/>
        </b-col>
        <b-col md="3" >
          <b-form-input id="expiry" type="date" class="no-spinners" :value="training.expiry" v-model="training.expiry" :readonly="readonly"/>
        </b-col>
        <b-col md="1" >
        </b-col>
      </b-row>
    </b-form>
  </b-card> 
</template> 

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  props: ['id', 'workers'],
  components: {
    PulseLoader
  },
  data () {
    return {
      loading: false,
      success: false,
      readonly: true,
      catcherror: false,
      errorMessage: '',
      original: {},
      worker: {},
      newtraining: {
        description: null,
        ID: '',
        expiry: ''
      },
      trainingOptions: [
        {value: null, text: 'Please enter training Description'},
        {value: 'Induction', text: 'Company Induction'},
        {value: 'Site Safe Passport', text: 'Site Safe Passport'},
        {value: 'Site Safe Supervisor Gold Card', text: 'Site Safe Supervisor Gold Card'},
        {value: 'License', text: 'License'},
        {value: 'Fall Arrest', text: 'Fall Arrest'},
        {value: 'Hiab', text: 'Hiab'},
        {value: 'Forklift', text: 'Forklift'},
        {value: 'First Aid', text: 'First Aid'},
        {value: 'LBP', text: 'LBP'},
        {value: 'Heights', text: 'Heights'}
      ],
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
  computed: {
    changed () {
      if (this._.isEqual(this.worker, this.original)) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    edit () {
      this.readonly = false
      this.original = this._.cloneDeep(this.worker)
      document.getElementById('expiry').type = 'date'
    },
    save () {
      this.loading = true
      // save updates to user profile
      try {
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
      } catch (err) {
        console.log('ERROR', err.message)
        this.loading = false
      }
    },
    cancel () {
      this.worker = this._.cloneDeep(this.original)
      this.clear()
      this.readonly = true
    },
    clear () {
      // clear training fields
      this.newtraining.description = null
      this.newtraining.ID = ''
      this.newtraining.expiry = ''
      document.getElementById('expiry').type = 'text'
    },
    addTraining () {
      let training = this.newtraining
      this.worker.training.push({
        description: training.description,
        ID: training.ID,
        expiry: training.expiry
      })
      this.clear()
    }
  },
  mounted () {
    this.worker = this._.cloneDeep(this.workers)
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('getWorkers')
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

  .card-header.worker{
    background-color: #8e4e74;
    margin: 0;
    color: white;
    font-size: 1.2em;
    padding-left: 15px;
  }
  
  .workerCard > .card-body {
    padding: 0;
  }

  form {
    padding: 15px;
  }

  .row {
    margin-bottom: 15px;
    padding-left: 15px;
  }

  header {
    padding-left: 5px;
  }

  #expiry {
    padding-bottom: 4px;
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
