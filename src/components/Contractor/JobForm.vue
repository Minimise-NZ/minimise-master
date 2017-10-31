<template>
  <b-container fluid>
    <b-card header="Health and Safety Agreement"  header-tag="header">
     <b-form @submit="onSubmit">
      <b-card class="item mb-3" header="Site Information">
        <b-row>
          <strong>Site Address: {{address}}</strong>
        </b-row>
        <b-row>
          Principal Contractor: {{job.principal}}
        </b-row>
        <b-row>
           <b-col>
             Project Manager: {{job.projectManager}}<br>
             Contact Number: {{job.PMcontact}}
           </b-col>
           <b-col>
             HSE Manager: {{job.HSEManager}}<br>
             Contact Number: {{job.HSEcontact}}
           </b-col>
        </b-row>
      </b-card>
      
      <b-card class="item mb-3" header="Contractor Details">
        <b-row>
          Contractor/PCBU: 
        </b-row>
        <b-row>
          Supervisor:<br>
          Contact Number: 
        </b-row>
      </b-card>
      
      <b-card class="item mb-3" header="Description of Work">
        <b-row>
           <b-form-textarea
             id="workDescription"
             v-model="workDescription"
             placeholder="Please describe the work you will be undertaking on this job site"
             :rows="4"
             required>
          </b-form-textarea>
        </b-row>
        <b-row>
          <b-form-checkbox
            id="notifiable"
            v-model="notifiable"
            value=true>
            There is notifiable works associated with this project
          </b-form-checkbox>
        </b-row>
        <b-row>
          <b-form-checkbox-group
            v-if="notifiable"
            stacked 
            v-model="notifiables.selected" 
            name="notifiables" 
            :options="notifiables.list"
            class="ml-3">
          </b-form-checkbox-group>
        </b-row>
        <b-row>
          <b-form-checkbox
           v-if="notifiable"
            id="notified"
            v-model="notified"
            value=true
            required>
            We have notified Worksafe and have a copy of the notification
          </b-form-checkbox>
        </b-row>
        <b-row>
          <b-form-checkbox
            v-if="notifiable"
            id="taskAnalysis"
            v-model="taskAnalysis"
            value=true
            required>
            A task analysis has been prepared and our workers have been trained in the process
          </b-form-checkbox>
        </b-row>
      </b-card>
      
      <b-card class="item mb-3" header="Safety Planning and Reporting">
        <b-row>
           <b-form-checkbox
            required>
            We agree to report all incidents to the Principal Contractor within the specified timeframe
          </b-form-checkbox>
        </b-row>
        <b-table small bordered
          striped hover
          :items="tableItems">
        </b-table>
         <b-row>
           <b-form-checkbox
            class="mt-3"
            required>
            We agree that our workers will conduct safety checks before undertaking any work on site
          </b-form-checkbox>
        </b-row>
        <b-row>
           <b-form-checkbox
            required>
            Our training register is complete and up to date
          </b-form-checkbox>
        </b-row>
        <b-row>
           <b-form-checkbox
            required>
            Our hazard register is complete and up to date
          </b-form-checkbox>
        </b-row>
        <b-row>
          <b-form-checkbox
            required>
            Our hazardous Substance Register is complete and up to date.<br> We have MSDS sheets for all hazardous substances. <br> Our workers have appropriate PPE for handling hazardous Substances
          </b-form-checkbox>
        </b-row>
        <b-row>
          <b-form-checkbox
            required>
            Our workers have been provided a first aid kit and fire extinguisher. 
          </b-form-checkbox>
        </b-row>
      </b-card>
      <b-button type="submit " variant="success">Submit</b-button>
      <b-button @click="cancel" variant="warning">Cancel</b-button>
    </b-form>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      job:
      {
        address: ['187 Marine Parade', 'New Brighton Christchurch'],
        principal: 'Stonewood Homes',
        projectManager: 'John Smith',
        PMcontact: '021 123 456',
        HSEManager: 'Ann Swan',
        HSEcontact: '021 456 789',
        date: '25/10/2017'
      },
      contractor: {
        name: 'Leaky Pipes'
      },
      workDescription: '',
      notifiable: false,
      notifiables: {
        list: [
          'Working at heights > 5m',
          'Work in confined spaces',
          'Work in an excavation > 1.5m'
        ],
        selected: []
      },
      notified: false,
      taskAnalysis: false,
      reporting: false,
      safetyChecks: false,
      trainingRegister: false,
      hazardRegister: false,
      firstAidKit: false,
      tableItems: [
        {incident_type: 'Serious Injury', timeframe: 'Immediately'},
        {incident_type: 'Injury Requiring First Aid', timeframe: 'Immediately'},
        {incident_type: 'Damage to plant/equipment', timeframe: 'Within 24 hours'},
        {incident_type: 'Near Miss', timeframe: 'Within 24 hours'}
      ]
    }
  },
  computed: {
    address () {
      return this.job.address.join(', ')
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    cancel () {
      this.$router.push('/contractor')
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;;
  }
 
  .card-header {
    background-color: rgba(155, 35, 53, 0.88);
    font-size: 1.4rem;
    color: white;
  }
  
  .item.card > .card-header {
    background-color:rgba(29, 92, 158, 0.89);
    font-size: 1.2rem;
  }
  
  .item.card > .card-body {
    padding: 0;
  }
  
  .row {
    margin: 15px;
  }
  
  .col {
    padding: 0;
  }
  
  .table {
    width: 500px;
    margin-left: 40px;
  }
</style>