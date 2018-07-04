<template>
  <b-container fluid>
    <b-modal
      v-model="confirmAction"
      v-if="confirmAction" 
      @ok="onConfirm" 
      @cancel="incident.open = true"
      centered 
      header-bg-variant="danger"
      headerTextVariant= 'light'
      title="Confirm Action">
      <div class="d-block text-center">
        <h4 class="mt-2">Are you sure you want to close <br>this incident?</h4>
        <br>
        <p>This will prevent any further updates</p>
        <p>This action cannot be undone</p>
      </div>
    </b-modal>
    <b-modal 
        v-model="success" 
        v-if="success"
        ok-only
        @ok="route" 
        centered 
        header-bg-variant="success"
        headerTextVariant= 'light'
        title="Success">
        <div class="d-block text-center">
          <h4 class="mt-2">This incident has been submitted</h4>
        </div>
    </b-modal>
    <b-card header="New Incident" header-tag="header">
      <div class="scroll-container">
        <b-form @submit.prevent="onSubmit">
          <b-row>
            <b-col sm="3" lg="2">Date of Incident:</b-col>
            <b-col sm="5" lg="3">
              <b-form-input class="no-spinners" ref="date" type="date" placeholder="Incident Date" v-model="incident.date"/>
            </b-col>
            <b-col><div class="alert alert-danger" v-show="this.dateerror !== ''">{{this.dateerror}}</div></b-col>
          </b-row>
          <b-row>
            <b-col sm="3" lg="2"><label>Reported By:</label></b-col>
            <b-col sm="9" lg="10"><b-form-input v-model="incident.reportedBy" type="text" required></b-form-input></b-col>
          </b-row>
          <b-row>
            <b-col sm="3" lg="2"><label>Location:</label></b-col>
            <b-col sm="9" lg="10"><b-form-input ref="error" v-model="incident.address" required></b-form-input></b-col>
          </b-row>
          <hr>
          <b-row >
            <b-col sm="3" lg="2"><label>Incident Type:</label></b-col>
            <b-col sm="9" lg="10">
              <v-select
                placeholder="Please select incident type"
                v-model="incident.type"
                :options="incidentTypes"
                required>
              </v-select>
              <div class="alert alert-danger" v-show="this.error !== ''">{{this.error}}</div>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3" lg="2"><label>Incident Description:</label></b-col>
            <b-col sm="9" lg="10">
              <b-form-textarea
                v-model="incident.description"
                rows="6"
                placeholder="Please describe what happened"
                required> 
              </b-form-textarea>
            </b-col>
          </b-row>
          <b-row v-if="incident.type === 'Serious Harm' || incident.type === 'Minor Harm'">
            <b-col sm="3" lg="2"><label>Injury Description:</label></b-col>
            <b-col sm="9" lg="10">
              <b-form-textarea
                v-model="incident.injuryDescription"
                rows="6"
                placeholder="Please describe details of injury"
                required> 
              </b-form-textarea>
            </b-col>
          </b-row>
          <b-row v-if="incident.type === 'Plant Damage'">
            <b-col sm="3" lg="2"><label>Description of damage:</label></b-col>
            <b-col sm="9" lg="10">
              <b-form-textarea
                v-model="incident.plantDamage"
                rows="6"
                placeholder="Please describe details of damage to plant or equipment"
                required> 
              </b-form-textarea>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col sm="3" lg="2"><label>Cause / Contributing Factors:</label></b-col>
            <b-col sm="9" lg="10">
              <b-form-textarea
                v-model="incident.cause"
                rows="6"
                placeholder="Please describe the cause of the incident. (Refer to the contributory factors below)"
                required> 
              </b-form-textarea>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3" lg="2"></b-col>
            <b-col sm="4" lg="5">
              <p>Immediate causes</p>
              <ul>
                <li>Guarding</li>
                <li>Defective tools or equipment</li>
                <li>Hazardous arrangements</li>
                <li>Unsafe conditions</li>
                <li>Unsafe design</li>
                <li>Housekeeping</li>
                <li>Environmental Conditions</li>
              </ul>
            </b-col>
            <b-col sm="4" lg="5">
              <p>Substandard Acts</p>
              <ul>
                <li>Operating without authority/training</li>
                <li>Disabling safety devices</li>
                <li>Using unsafe equipment</li>
                <li>Non use of PPE</li>
                <li>Non use of lock out/isolation systems</li>
                <li>Unsafe positioning</li>
                <li>Distraction/fooling around</li>
              </ul>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3" lg="2"><label>Corrective Actions:</label></b-col>
            <b-col sm="9" lg="10">
              <b-form-textarea
                v-model="incident.corrective"
                rows="6"
                placeholder="Please describe any corrective actions taken. Have hazard controls been put in place? Has the site been made safe? Have preventative measures been implemented?"
                required> 
              </b-form-textarea>
            </b-col>
          </b-row>
          <b-row class="pt-1">
            <b-col sm="3" lg="2"></b-col>
            <b-col sm="9" lg="10">
              <b-form-checkbox v-model="incident.open" :value='false'>
                Close this incident <em>(Close only if no further action is required)</em>
              </b-form-checkbox>
            </b-col>
          </b-row>
          <div class="text-center">
            <b-button-group class="pt-4 pb-4">
              <b-button class="buttons" variant="success" type="submit">
                <p style="font-size: 1rem; margin-bottom: 0; font-weight: normal; margin-top: 0;color: white" v-if="loading===false">Save</p>
                <div class="loader">
                  <pulse-loader :loading="loading" ></pulse-loader>
                </div>
              </b-button>
              <b-button class="buttons" variant="danger" @click="cancel" :disabled="loading">Cancel</b-button>
            </b-button-group>
          </div>
        </b-form>
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
      confirmAction: false,
      success: false,
      incident: {
        address: '',
        date: '',
        reportedBy: '',
        type: '',
        description: '',
        injury: '',
        injuryDescription: '',
        plant: '',
        plantDamage: '',
        cause: '',
        corrective: '',
        open: 'true'
      },
      incidentTypes: ['Near Miss', 'Minor Harm', 'Serious Harm', 'Plant Damage'],
      dateerror: '',
      error: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    userKey () {
      return this.$store.getters.userKey
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      this.error = ''
      this.dateerror = ''
      if (this.incident.date === '') {
        this.dateerror = 'Please select incident date'
        this.$refs.date.$el.focus()
        this.loading = false
        return this.dateerror
      }
      if (this.incident.type === '') {
        this.error = 'Please select incident type'
        this.$refs.error.$el.focus()
        this.loading = false
        return this.error
      } else {
        if (this.incident.open === false) {
          this.confirmAction = true
        } else {
          this.onConfirm()
        }
      }
    },
    onConfirm () {
      this.error = ''
      this.dateerror = ''
      this.incident.supervisorKey = this.userKey
      this.incident.supervisorName = this.user.name
      this.incident.company = this.$store.getters.companyKey
      this.$store.dispatch('newIncident', this.incident)
      .then(() => {
        this.loading = false
        this.success = true
      })
    },
    route () {
      this.$router.push('/dashboard/incidents')
    },
    cancel () {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    padding-right: 30px;
  }
  
  .col-sm-3 {
    text-align: right;
    padding-top: 5px;
  }
  
  .row {
    margin-bottom: 15px;
  }
  
  p {
    margin-top: 15px;
    font-weight: bold;
    color: rgba(155, 35, 53, 0.88);
    margin-bottom: 5px;
  }
  
  ul {
    padding-left: 10px;
  }

  .btn-group {
    align-items: center;
    width: 40%;
  }

  .buttons {
    cursor: pointer;
    margin: 20px;
    width: 50%;
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