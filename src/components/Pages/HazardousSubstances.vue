<template>
  <b-container fluid>
    <b-modal
      size="lg"
      v-model="showModal"
      v-if="showModal" 
      @ok="handleOk"
      data-backdrop="static"
      @cancel="handleCancel"
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
            <label>UN number:</label>
          </b-col>
          <b-col>
            <b-form-input v-model="newSubstance.UN"/>
          </b-col>
        </b-row>            
        <b-row class="inner-row">
          <b-col  cols="4">
            <label>Approval No./Group Standard:</label>
          </b-col>
          <b-col>
            <b-form-textarea v-model="newSubstance.group"/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col  cols="4">
            <label>Hazard Classification:</label>
          </b-col>
          <b-col>
            <b-form-input v-model="newSubstance.hazClassification"/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col  cols="4">
            <label>Storage Requirements:</label>
          </b-col>
          <b-col>
            <b-form-textarea v-model="newSubstance.storageRequirements"/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col cols="4">
            <label>Max Quantity on Site:</label>
          </b-col>
          <b-col>
            <b-form-input v-model="newSubstance.maxQuantity"/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col cols="4">
            <label>Site Storage Location:</label>
          </b-col>
          <b-col>
            <b-form-input v-model="newSubstance.location"/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col cols="4">
            <label>PPE required:</label>
          </b-col>
          <b-col>
            <b-form-textarea v-model="newSubstance.PPE"/>
          </b-col>
        </b-row>
         <b-row class="inner-row">
          <b-col cols="4">
            <label>Substance Type:</label>
          </b-col>
          <b-col>
            <b-form-select v-model="newSubstance.subType">
              <option :value="null">Please select an option</option>
              <option value="solid">Solid</option>
              <option value="liquid">Liquid</option>
              <option value="gas">Gas</option>
            </b-form-select>
          </b-col>
        </b-row>
         <b-row class="inner-row">
          <b-col cols="4">
            <label>Hazard Statements:</label>
          </b-col>
          <b-col>
            <b-form-textarea v-model="newSubstance.hazStatements"/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col cols="4">
            <label>Hazard Types:</label>
          </b-col>
          <b-col>
            <b-form-group>
              <b-form-checkbox-group v-model="newSubstance.hazTypes" :options="hazOptions" style="padding: 5px"></b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col cols="4"></b-col>
          <b-col>
            <label style="margin-right: 15px">Is current SDS available?</label>
            <b-btn style="width: 75px" :style="{backgroundColor: btnColor(newSubstance.SDS)}" @click="newSubstance.SDS = !newSubstance.SDS">{{SDSText(newSubstance.SDS)}}</b-btn>
          </b-col>
        </b-row>
      </b-form>
      <div slot="modal-footer" v-if="loading">
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
    <b-card>
      <div class="card-header">
      Hazardous Substances
        <b-button  
          class="addBtn"
          variant="success"
          @click="addNew" 
          v-b-tooltip.hover title="Add New Substance">
          <i class="fa fa-plus"></i>
        </b-button> 
      </div>
      <div class="scroll-container">
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
        UN: '',
        group: '',
        hazClassification: '',
        SDS: false,
        storageRequirements: '',
        maxQuantity: '',
        location: '',
        subType: '',
        hazTypes: [],
        PPE: '',
        hazStatements: ''
      },
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
    btnColor (SDS) {
      if (SDS === true) {
        return '#12807a'
      } else {
        return '#b70011e3'
      }
    },
    SDSText (SDS) {
      if (SDS === true) {
        return 'Yes'
      } else {
        return 'No'
      }
    },
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
      this.alert = false
      Object.assign(this.newSubstance, this._beforeEditingCache)
      this._beforeEditingCache = null
    }
  }
}
</script>

<style scoped>

  .container-fluid {
    padding-top: 20px;
  }

  .card-header {
    margin: -20px -20px 0px -20px;
  }

  .inner-row {
    margin-bottom: 15px;
  }

</style>