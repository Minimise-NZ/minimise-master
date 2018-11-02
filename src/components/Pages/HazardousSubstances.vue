<template>
  <b-container fluid>
    <b-modal
      size="lg"
      v-model="showModal"
      v-if="showModal" 
      :no-close-on-backdrop="true"
      header-bg-variant="info"
      headerTextVariant= 'light'
      title="Add New Substance">
      <b-form @submit.prevent="handleOk">
        <b-row class="inner-row">
          <b-col cols="4">
            <label>Product/Substance Name:</label>
          </b-col>
          <b-col>
            <b-form-input v-model="newSubstance.name"/>
            <b-alert :show="alert" variant="danger">This field is required</b-alert>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col cols="4">
            <label>Hazard Types:</label>
          </b-col>
          <b-col>
            <b-form-group>
              <b-form-checkbox-group v-model="newSubstance.hazTypes" :options="hazOptions" class="mb-0"></b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col cols="4">
            <label>Potential Harm:</label>
          </b-col>
          <b-col>
            <b-form-textarea v-model="newSubstance.potentialHarm" rows="4"/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col  cols="4">
            <label>Storage Requirements:</label>
          </b-col>
          <b-col>
            <b-form-textarea v-model="newSubstance.storage" rows="4"/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col cols="4">
            <label>PPE required:</label>
          </b-col>
          <b-col>
            <b-form-textarea v-model="newSubstance.PPE" rows="4"/>
          </b-col>
        </b-row>
         <b-row class="inner-row">
          <b-col cols="4">
            <label>Actions:</label>
          </b-col>
          <b-col>
            <b-form-textarea v-model="newSubstance.actions" rows="4"/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col cols="4"></b-col>
          <b-col v-if="newSubstance.sds === ''">
            <b-form-file v-model="sdsFile" placeholder="Safety Data Sheet"></b-form-file>
          </b-col>
          <b-col sm="1" class="pl-0" v-if="sdsFile !== ''">
            <b-btn variant="primary" @click="uploadFile()" v-b-tooltip.hover title="Upload file">
              <i class="fa fa-cloud-upload-alt"></i>
            </b-btn>
          </b-col>
          <b-col v-if="newSubstance.sds !== ''">
            <a :href="newSubstance.sds" target="_blank">{{newSubstance.name}}</a>
          </b-col>
        </b-row>
      </b-form>
      <div slot="modal-footer">
        <b-btn class="float-right" variant="primary" @click="handleOk" v-if="loading === false">Save</b-btn>
        <b-btn class="float-right mr-2" variant="danger" @click="handleCancel" v-if="loading === false">Cancel </b-btn>
        <pulse-loader :loading="loading"></pulse-loader>
      </div>
    </b-modal>
    <b-modal
      v-model="error" 
      v-if="error" 
      ok-only
      header-bg-variant="danger"
      headerTextVariant= 'light'
      title="Oops..">
      <div class="d-block text-center">
        <h4>Something went wrong. Please try again</h4>
        <h5>{{errorMessage}}</h5>
      </div>
    </b-modal>
    <b-card header-tag="header">
      <header slot="header">Hazardous Substances
        <b-btn
          variant="dark"
          @click="addNew" 
          v-b-tooltip.hover title="Add New Substance">
          <i class="fa fa-plus" style="color: rgb(1, 206, 187)"></i>
        </b-btn> 
      </header>
      <div class="scroll-container">
        <b-row v-if="hazSubs.length === 0" >
          <b-col class="p-0">
            <header class="subheader">Click the add + button to enter a hazardous substance</header>
          </b-col>
        </b-row>
        <div v-for="(hazSub, index) in hazSubs" :key="index">
          <substanceview :substance="hazSub" :index="index"></substanceview>
        </div>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import SubstanceView from '@/components/Components/SubstanceView.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  components: {
    'substanceview': SubstanceView,
    PulseLoader
  },
  data () {
    return {
      loading: false,
      showModal: false,
      alert: false,
      error: false,
      errorMessage: '',
      newSubstance: {
        name: '',
        hazTypes: [],
        potentialHarm: '',
        storage: '',
        PPE: '',
        actions: '',
        sds: ''
      },
      sdsFile: '',
      hazOptions: [
        { text: 'Explosive', value: 'Explosive' },
        { text: 'Flammable', value: 'Flammable' },
        { text: 'Corrosive', value: 'Corrosive' },
        { text: 'Eco-Toxic', value: 'Eco-Toxic' },
        { text: 'Oxidiser', value: 'Oxidiser' },
        { text: 'Toxic', value: 'Toxic' },
        { text: 'Health Effects', value: 'Health Effects' }
      ]
    }
  },
  computed: {
    hazSubs () {
      return this.$store.getters.hazardousSubstances
    }
  },
  methods: {
    addNew () {
      this.showModal = true
      this._beforeEditingCache = Object.assign({}, this.newSubstance)
    },
    handleOk (evt) {
      this.loading = true
      this.alert = false
      evt.preventDefault()
      if (this.newSubstance.name === '') {
        this.alert = true
        this.loading = false
      } else {
        console.log('adding new substance')
        let substance = Object.assign({}, this.newSubstance)
        let promise = new Promise((resolve, reject) => {
          this.$store.dispatch('newHazardousSubstance', substance)
          .then(() => {
            this.showModal = false
            this.loading = false
            this.handleCancel()
            resolve
          })
          .catch((error) => {
            this.loading = false
            this.error = true
            this.errorMessage = error.message
            reject()
          })
        })
        return promise
      }
    },
    handleCancel () {
      this.showModal = false
      Object.assign(this.newSubstance, this._beforeEditingCache)
      this._beforeEditingCache = null
    },
    uploadFile () {
      this.loading = true
      this.$store.dispatch('uploadFile', {file: this.sdsFile, type: this.newSubstance.name})
      .then((url) => {
        this.newSubstance.sds = url
        this.sdsFile = ''
        this.loading = false
      })
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
  }

  .scroll-container {
    height: 80vh;
    overflow-y: scroll;
    margin-top: 15px;
    padding-right: 10px;
  }

  .card-body {
    padding-top: 0;
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

  .inner-row {
    margin-bottom: 15px;
  }

  label {
    padding-top: 5px;
  }

  .form-group {
    margin-bottom: 0px;
  }

  
  .subheader {
    margin-left: 15px;
    font-weight: bold;
    font-size: 1.2em;
    color: rgba(63, 81, 181, 0.94);
  }
  

</style>