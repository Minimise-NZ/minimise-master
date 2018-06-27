<template>
  <b-container fluid class="outside-container">
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
          <h4 class="mt-2">This incident has been updated</h4>
        </div>
    </b-modal>
    <b-card>
      <div class=" incident card-header">{{headerText}}
        <b-button  
          class="addBtn"
          @click="edit"
          :disabled="disabled"
          v-if="incident.open === 'true'"
          v-b-tooltip.hover title="Edit/Update this Incident">
          <i class="fa fa-edit fa-lg"></i>
        </b-button> 
      </div>
      <div class="scroll-container">
        <b-form @submit.prevent="onSubmit">
          <b-row>
            <b-col sm="3" lg="2">Date of Incident:</b-col>
            <b-col sm="9" lg="10">
              <b-form-input type="text" :value="displayDate" readonly></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3" lg="2"><label>Reported By:</label></b-col>
            <b-col sm="9" lg="10"><b-form-input v-model="incident.reportedBy" type="text" readonly></b-form-input></b-col>
          </b-row>
          <b-row>
            <b-col sm="3" lg="2"><label>Location:</label></b-col>
            <b-col sm="9" lg="10"><b-form-input v-model="incident.address" readonly></b-form-input></b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col sm="3" lg="2"><label>Incident Type:</label></b-col>
            <b-col sm="9" lg="10">
              <b-form-input v-model="incident.type" :readonly="readonly" v-if="readonly"></b-form-input>
              <v-select
                v-if="!readonly"
                placeholder="Please select incident type"
                v-model="incident.type"
                :options="incidentTypes">
              </v-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3" lg="2"><label>Incident Description:</label></b-col>
            <b-col sm="9" lg="10">
              <b-form-textarea
                v-model="incident.description"
                rows="6"
                placeholder="Please describe what happened"
                :readonly="readonly"> 
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
                :readonly="readonly"> 
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
                :readonly="readonly"> 
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
                :readonly="readonly"> 
              </b-form-textarea>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3" lg="2"><label>Corrective Actions:</label></b-col>
            <b-col sm="9" lg="10">
              <b-form-textarea
                v-model="incident.corrective"
                rows="6"
                placeholder="Please describe any corrective actions taken. Have hazard controls been put in place? Has the site been made safe? Have preventative measures been implemented?"
                :readonly="readonly"> 
              </b-form-textarea>
            </b-col>
          </b-row>
          <b-row class="pt-1" v-if="!readonly">
            <b-col sm="3" lg="2"></b-col>
            <b-col sm="9" lg="10">
              <b-form-checkbox v-model="incident.open" value=false unchecked-value=true>
                <p>Close this incident <em>(Close only if no further action is required)</em></p>
              </b-form-checkbox>
            </b-col>
          </b-row>
          <div class="text-center" v-if="this.readonly === false">
            <b-button-group class="pb-4">
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
import moment from 'moment'
export default {
  props: ['id'],
  components: {
    PulseLoader
  },
  data () {
    return {
      loading: false,
      confirmAction: false,
      success: false,
      readonly: true,
      disabled: false,
      incidentTypes: [
        'Serious Harm', 'Minor Harm', 'Plant Damage', 'Near Miss'
      ]
    }
  },
  computed: {
    notAdmin () {
      let user = this.$store.getters.user
      if (user.role === 'Health and Safety Manager' || user.role === 'Business Administrator') {
        return false
      } else {
        return true
      }
    },
    displayDate () {
      return moment(String(this.incident.date, 'YYYY-MM-DD')).format('DD-MM-YYYY')
    },
    incident () {
      return this.$store.getters.incident(this.id)
    },
    headerText () {
      let text = this.incident.address + ' : ' + this.displayDate
      return text
    },
    status () {
      if (this.incident.open === false) {
        this.disabled === true
      }
    }
  },
  methods: {
    edit () {
      this.readonly = false
      this.disabled = true
    },
    onSubmit () {
      this.loading = true
      if (this.incident.type === '') {
        this.error = 'Please select incident type'
        this.loading = false
        return this.error
      } else {
        if (this.incident.open === false) {
          this.loading = false
          this.confirmAction = true
        } else {
          this.onConfirm()
        }
      }
    },
    onConfirm () {
      this.error = ''
      this.incident.actionOwner = this.actionOwner
      console.log('updating incident', this.incident)
      this.$store.dispatch('updateIncident', this.incident)
      .then(() => {
        this.loading = false
        this.success = true
      })
    },
    route () {
      this.$router.push('/dashboard/incidents')
    },
    cancel () {
      this.readonly = true
      this.disabled = false
    }
  }
}
</script>

<style scoped>
  form {
    padding-right: 15px;
  }

  .card-header.incident {
    margin: -20px -20px 20px -20px;
  }

  .col-sm-3 {
    text-align: right;
    padding-top: 5px;
  }
  
  .row {
    margin-bottom: 15px;
  }
  
  .editBtn {
    float: right;
    background-color: #ffc80b;
    color: black;
    cursor: pointer;
  }

  button:disabled {
    cursor: default;
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


</style>