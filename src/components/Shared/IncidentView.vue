<template>
  <b-container fluid>
    <b-card>
      <div class="card-header">{{headerText}}
        <b-button class="editBtn" @click="edit" :disabled="disabled">Edit/Update Incident</b-button>
      </div>
      <div class="scroll-container">
        <b-form @submit.prevent="onSubmit">
          <b-row>
            <b-col sm="3" lg="2">Date of Incident:</b-col>
            <b-col sm="9" lg="10">
              <b-form-input type="text" v-model="formattedDate" readonly></b-form-input>
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
          <b-row class="pt-3" v-if="!readonly">
            <b-col sm="3" lg="2"></b-col>
            <b-col sm="9" lg="10">
              <b-form-checkbox v-model="incident.escalate" :value='true'>
                <p>Further investigation is required <em>(To be escalated to Health and Safety Manager)</em></p>
              </b-form-checkbox>
            </b-col>
          </b-row>
          <b-row class="pt-1" v-if="!readonly">
            <b-col sm="3" lg="2"></b-col>
            <b-col sm="9" lg="10" v-if="incident.escalate === false">
              <b-form-checkbox v-model="incident.open" :value='false'>
                <p>Close this incident <em>(Close only if no further action is required)</em></p>
              </b-form-checkbox>
            </b-col>
          </b-row>
          <div class="text-center">
            <b-button-group class="pt-4 pb-4">
              <b-button class="buttons" variant="success" type="submit">Save</b-button>
              <b-button class="buttons" variant="danger" @click="cancel">Cancel</b-button>
            </b-button-group>
          </div>
        </b-form>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import IncidentForm from '@/components/Shared/IncidentForm.vue'
export default {
  props: ['id'],
  components: {
    'incidentForm': IncidentForm
  },
  data () {
    return {
      readonly: true,
      disabled: false,
      incidentTypes: [
        'Serious Harm', 'Minor Harm', 'Plant Damage', 'Near Miss'
      ]
    }
  },
  computed: {
    incident () {
      return this.$store.getters.incident(this.id)
    },
    headerText () {
      let text = this.incident.address + ' - ' + this.formattedDate
      return text
    },
    formattedDate () {
      return this.incident.date.toString().slice(0, 15)
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
      // update incident in firebase
    },
    cancel () {
      this.readonly = true
      this.disabled = false
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;
    padding-right: 30px;
  }
  
  .card-header {
    margin: -20px -20px 20px -20px;
    background-color: #027588;
    font-size: 1.4rem;
    color: white;
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