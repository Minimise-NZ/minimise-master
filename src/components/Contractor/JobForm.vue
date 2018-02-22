<template>
  <b-container fluid class="outside-container">
    <b-card>
      <div class="card-header">Health and Safety Agreement - {{job.address}}</div>
        <div class="scroll-container">
        <b-form @submit.prevent="onSubmit">

          <b-card>
            <div class="item card-header">Site Information</div>
             <b-row>
              <b-col cols="2">
               <p><strong>Principal Contractor:</strong></p>
              </b-col>
              <b-col cols="8">
                <b-form-input type="text" v-model="job.principal" readonly/>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2">
                <p>Project Manager:</p>
              </b-col>
              <b-col cols="3">
                <b-form-input type="text" v-model="job.projectManager" readonly/>
              </b-col>
              <b-col cols="2" class="pl-3">
                <p>Project Manager Phone:</p>
              </b-col>
              <b-col cols="3">
                <b-form-input type="text" v-model="job.PMcontact" readonly/>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2">
                <p>HSE Manager:</p>
              </b-col>
              <b-col cols="3">
                <b-form-input type="text" v-model="job.HSEManager" readonly/>
              </b-col>
              <b-col cols="2" class="pl-3">
                <p>HSE Manager Phone:</p>
              </b-col>
              <b-col cols="3">
                <b-form-input type="text" v-model="job.HSEcontact" readonly=""/>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2">
               <p>Nearest Medical Centre:</p>
              </b-col>
              <b-col cols="8">
                <b-form-input type="text" v-model="job.medical" readonly/>
              </b-col>
            </b-row>
          </b-card>
          
          <b-card>
            <div class="item card-header">Contractor Details</div>
             <b-row>
              <b-col cols="2">
               <p><strong>Contractor/PCBU:</strong></p>
              </b-col>
              <b-col cols="8">
                <b-form-input type="text" v-model="company.name" readonly/>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2">
                <p>Supervisor:</p>
              </b-col>
              <b-col cols="8">
                <b-form-input type="text" placeholder="Supervisor Name" v-model="supervisor" ref="focus" required/>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2">
                <p>Contact Number:</p>
              </b-col>
              <b-col cols="8">
                <b-form-input type="text" placeholder="Supervisor Phone Number" v-model="supervisorPhone" required/>
              </b-col>
            </b-row>
          </b-card>
          
          <b-card>
            <div class="item card-header">Description of Work</div>
            <b-row>
              <b-form-textarea
                id="workDescription"
                v-model="workDescription"
                placeholder="Please describe the work you will be undertaking on this job site"
                :rows="5"
                required>
              </b-form-textarea>
            </b-row>
            <b-row>
              <b-form-checkbox
                class="mt-3"
                v-model="notifiable"
                value='true'>
                There is notifiable works associated with this project
              </b-form-checkbox>
            </b-row>
            <b-row>
              <b-form-checkbox-group
                v-if="notifiable === 'true'"
                id="notifiable"
                stacked 
                v-model="notifiables.selected"  
                :options="notifiables.list"
                class="ml-3">
              </b-form-checkbox-group>
            </b-row>
            <div class="alert alert-danger" v-show="error">Please select an option</div>
            <b-row>
              <b-form-checkbox
                v-if="notifiable === 'true'"
                v-model="notified"
                value='true'
                required>
                We have notified Worksafe and have a copy of the notification
              </b-form-checkbox>
            </b-row>
            <b-row>
              <b-form-checkbox
                v-if="notifiable === 'true'"
                v-model="taskAnalysis"
                value='true'
                required>
                A task analysis has been prepared and our workers have been trained in the process
              </b-form-checkbox>
            </b-row>
          </b-card>
          
          <b-card>
            <div class="item card-header">Safety Planning and Reporting</div>
            <b-row>
              <b-form-checkbox
                value='true'
                v-model="reporting"
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
                v-model="safetyChecks"
                value='true'
                required>
                We agree that our workers will conduct safety checks before undertaking any work on site
              </b-form-checkbox>
            </b-row>
            <b-row>
              <b-form-checkbox
                v-model="trainingRegister"
                value='true'
                required>
                Our training register is complete and up to date
              </b-form-checkbox>
            </b-row>
            <b-row>
              <b-form-checkbox
                v-model="hazardRegister"
                value='true'
                required>
                Our hazard register is complete and up to date
              </b-form-checkbox>
            </b-row>
            <b-row>
              <b-form-checkbox
                v-model="hazSubstances"
                value='true'
                required>
                Our hazardous Substance Register is complete and up to date.<br> We have MSDS sheets for all hazardous substances. <br> Our workers have appropriate PPE for handling hazardous Substances
              </b-form-checkbox>
            </b-row>
            <b-row>
              <b-form-checkbox
                v-model="firstAidKit"
                value='true'
                required>
                Our workers have been provided a first aid kit and fire extinguisher. 
              </b-form-checkbox>
            </b-row>
            <div class="text-center">
            <b-button-group class="pt-4">
              <b-button class="buttons" variant="success" type="submit">Submit</b-button>
              <b-button class="buttons" variant="danger" @click="cancel">Cancel</b-button>
            </b-button-group>
          </div>
          </b-card>
        </b-form>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import moment from 'moment'
export default {
  props: ['id'],
  data () {
    return {
      error: false,
      today: '',
      workDescription: '',
      supervisor: '',
      supervisorPhone: '',
      notifiable: 'false',
      notifiables: {
        list: [
          {text: 'Working at heights > 5m', value: 'Working at heights > 5m'},
          {text: 'Work in confined spaces', value: 'Work in confined spaces'},
          {text: 'Work in an excavation > 1.5m', value: 'Work in an excavation > 1.5m'}
        ],
        selected: []
      },
      notified: 'false',
      taskAnalysis: 'false',
      reporting: 'false',
      safetyChecks: 'false',
      trainingRegister: 'false',
      hazardRegister: 'false',
      hazSubstances: 'false',
      firstAidKit: 'false',
      tableItems: [
        {incident_type: 'Serious Injury', timeframe: 'Immediately'},
        {incident_type: 'Injury Requiring First Aid', timeframe: 'Immediately'},
        {incident_type: 'Damage to plant/equipment', timeframe: 'Within 24 hours'},
        {incident_type: 'Near Miss', timeframe: 'Within 24 hours'}
      ]
    }
  },
  computed: {
    job () {
      return this.$store.getters.job(this.id)
    },
    user () {
      return this.$store.getters.user
    },
    company () {
      return this.$store.getters.company
    }
  },
  methods: {
    onSubmit () {
      // add agreement to job sites agreement collection
      // update job site contractorKey approved to true
      // update companies jobSites approved to true
      this.error = false
      if (this.notifiable === 'true' && this.notifiables.selected.length <= 0) {
        this.error = true
        document.getElementById('notifiable').focus()
        return
      } else {
        let form = {
          workDescription: this.workDescription,
          supervisor: this.supervisor,
          supervisorPhone: this.supervisorPhone,
          reporting: this.reporting,
          safetyChecks: this.safetyChecks,
          trainingRegister: this.trainingRegister,
          hazardRegister: this.hazardRegister,
          firstAidKit: this.firstAidKit,
          date: this.today,
          companyName: this.company.name
        }
        if (this.notifiable === 'true') {
          form.notifiable = this.notifiables.selected
          form.notified = this.notified
          form.taskAnalysis = this.taskAnalysis
        }
        this.$store.dispatch('approveContractor', {job: this.job, form})
      }
    },
    cancel () {
      // reset fields and return focus to first input field
      this.workDescription = ''
      this.supervisor = ''
      this.supervisorPhone = ''
      this.notifiable = 'false'
      this.notifiables = {
        list: [
          'Working at heights > 5m',
          'Work in confined spaces',
          'Work in an excavation > 1.5m'
        ],
        selected: []
      }
      this.notified = false
      this.taskAnalysis = false
      this.reporting = false
      this.safetyChecks = false
      this.trainingRegister = false
      this.hazardRegister = false
      this.firstAidKit = false
      this.$refs.focus.$el.focus()
    }
  },
  mounted () {
    this.today = moment().format('DD-MM-YYYY')
  }
}
</script>

<style scoped>
  .card {
    margin-bottom: 10px;
  }

  .card-header {
    margin: -20px -20px 0px -20px;
    background-color: rgba(155, 35, 53, 0.88);
    font-size: 1.4rem;
    color: white;
  }
  
  .item.card-header {
    margin: -20px -20px 20px -20px;
    background-color:rgba(29, 92, 158, 0.89);
    font-size: 1.2rem;
  }

  .row {
    padding: 0 0 10px 15px;
  }

  .col, .col-2, .col-3, .col-8 {
    padding: 0;
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

  p {
    margin-top: 5px;
  }
</style>