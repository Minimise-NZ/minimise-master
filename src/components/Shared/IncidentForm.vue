<template>
  <b-container fluid>
    <b-card header="New Incident">
      <b-form @submit="onSubmit">
        <b-row>
          <b-col sm="3" lg="2">Date of Incident:</b-col>
          <b-col sm="9" lg="10"><b-form-input v-model="incident.date" type="date" required></b-form-input></b-col>
        </b-row>
        <b-row>
          <b-col sm="3" lg="2">Time of Incident:</b-col>
          <b-col sm="9" lg="10"><b-form-input v-model="incident.time" type="time" required></b-form-input></b-col>
        </b-row>
        <b-row>
          <b-col sm="3" lg="2"><label>Reported By:</label></b-col>
          <b-col sm="9" lg="10"><b-form-input v-model="incident.reportedBy" type="text" required></b-form-input></b-col>
        </b-row>
        <b-row>
          <b-col sm="3" lg="2"><label>Location:</label></b-col>
          <b-col sm="9" lg="10"><b-form-input v-model="incident.address" required></b-form-input></b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col sm="3" lg="2"><label>Incident Type:</label></b-col>
          <b-col sm="9" lg="10">
            <v-select
              placeholder="Please select incident type"
              :value.sync="incident.types"
              :options="incidentTypes"
              required>
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
              required> 
            </b-form-textarea>
          </b-col>
        </b-row>
        <b-row>
         <b-col sm="3" lg="2"></b-col>
          <b-col sm="9" lg="10">
            <b-form-checkbox
              v-model="incident.injury"
              value='true'>
            Was anybody injured?
            </b-form-checkbox>
          </b-col>
        </b-row>
        <b-row v-if="incident.injury">
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
        <b-row>
         <b-col sm="3" lg="2"></b-col>
          <b-col sm="9" lg="10">
            <b-form-checkbox
              v-model="incident.plant"
              value='true'>
            Was plant or equipment damaged?
            </b-form-checkbox>
          </b-col>
        </b-row>
        <b-row v-if="incident.plant">
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
        <b-row>
         <b-col sm="3" lg="2"></b-col>
          <b-col sm="9" lg="10">
            <b-form-checkbox
              v-model="incident.escalate"
              value='true'
              @click="escalate">
            Is further investigation required? (Escalate to Health and Safety Manager)
            </b-form-checkbox>
          </b-col>
        </b-row>
         <b-button type="submit " variant="success" style="float: right">Submit</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
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
        escalate: ''
      },
      incidentTypes: [
        'Serious Harm', 'Minor Harm', 'Plant Damage', 'Near Miss'
      ]
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    escalate () {
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    margin-bottom: 100px;;
  }
  
  .card {
     margin: -20px -20px 20px -20px;
  }
  
   .card-header {
    background-color: rgba(155, 35, 53, 0.88);
    font-size: 1.2rem;
    color: white;
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
  
</style>