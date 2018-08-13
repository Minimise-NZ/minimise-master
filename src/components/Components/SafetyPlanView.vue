<template>
  <b-container fluid>
    <b-modal 
      v-model="showMessage" 
      v-if="showMessage" 
      ok-only
      header-bg-variant="primary"
      headerTextVariant= 'light'
      title="Work in progress">
      <div class="d-block text-center">
        <h4>Coming Soon!</h4>
      </div>
    </b-modal>
    <b-card>
      <b-row class="card-header" >
        <b-col>
          <header>{{headerText}}</header>
        </b-col>
        <b-col>
          <b-button  
            class="addBtn"
            style="background-color: white"
            @click="createPdf" 
            v-b-tooltip.hover title="Export to PDF">
            <i class="fa fa-file-pdf fa-lg" style="color: black"></i>
          </b-button> 
        </b-col>
      </b-row>
      <div class="scroll-container">
        <!--OVERVIEW SECTION-->
        <div>
          <b-row>
            <b-col sm="12" lg="7" class="outer-col" style="padding-top: 20px; padding-right: 20px">
            <b-row>
              <b-col md="12" lg="4">
                <label>Supervisor:</label>
              </b-col>
              <b-col>
                <b-input-group>
                  <b-form-input type="text" v-model="jobSite.supervisorName" readonly/>
                </b-input-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12" lg="4">
                <label>Supervisor Phone:</label>
              </b-col>
              <b-col>
                <b-form-input type="text" :value="jobSite.supervisorPhone" readonly/>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12" lg="4">
                <label>Medical Centre:</label>
              </b-col>
              <b-col>
                <b-form-input type="text" :value="jobSite.medical" readonly/>
              </b-col>
            </b-row>
            <b-row >
              <b-col md="12" lg="4">
                <label>First Aiders:</label>
              </b-col>
              <b-col v-for="(name, index) in jobSite.firstAiders" :key="index">
                <b-form-input type="text" :value="name" readonly/>
              </b-col>
            </b-row>
            <b-row >
              <b-col md="12" lg="4">
                <label>Induction:</label>
              </b-col>
              <b-col>
                <b-form-input type="text" value="All workers are inducted and review safety plan prior to commencing work" readonly/>
              </b-col>
            </b-row>
            <b-row >
              <b-col md="12" lg="4">
                <label>Task Analysis:</label>
              </b-col>
              <b-col>
                <b-form-input type="text" value="To be completed as required" readonly/>
              </b-col>
            </b-row>
            <b-row >
              <b-col md="12" lg="4">
                <label>Site Inspection Frequency:</label>
              </b-col>
              <b-col>
                <b-form-input type="text" :value="frequency(jobSite.inspectionFrequency)" readonly/>
              </b-col>
            </b-row>
            <b-row >
              <b-col md="12" lg="4">
                <label>Toolbox Talk Frequency:</label>
              </b-col>
              <b-col>
                <b-form-input type="text" :value="frequency(jobSite.toolboxFrequency)" readonly/>
              </b-col>
            </b-row>
          </b-col>

          <b-col sm="12" lg="5" class="outer-col" style="padding-top: 20px; padding-right: 20px">
            <b-row v-if="jobSite.emergencyPlanURL !== ''">
              <b-col md="12" lg="4">Emergency Plan:</b-col>
              <b-col>
                <b-form-input type="text" value='Emergency Plan is attached' readonly/>
              </b-col>
            </b-row>
            <b-row v-if="jobSite.notifiableurl !== ''">
              <b-col md="12" lg="4">Notifiable Works:</b-col>
              <b-col><b-form-input type="text" value='Worksafe Notification is attached' readonly/></b-col>
            </b-row>
            <b-row v-if="jobSite.environmentalurl !== ''">
              <b-col md="12" lg="4">Environmental Plan:</b-col>
              <b-col><b-form-input type="text" value='Environmental Plan is attached' readonly/></b-col>
            </b-row>
            <b-row v-if="jobSite.resourceurl !== ''">
              <b-col md="12" lg="4">Resource Consent:</b-col>
              <b-col><b-form-input type="text" value='Resource Consent is attached' readonly/></b-col>
            </b-row>
            <b-row v-if="jobSite.nzhpturl !== ''">
              <b-col md="12" lg="4">NZHPT clearance:</b-col>
              <b-col><b-form-input type="text" value='NZHPT is attached' readonly/></b-col>
            </b-row>
          </b-col>
          </b-row>
          
        </div>
        <!--HAZARD SECTION-->
          <hr class="mt-5"><h5 class="mb-4">Hazard Register</h5>
          <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Risks</th>
                <th scope="col">IRA</th>
                <th scope="col">Controls</th>
                <th scope="col">Control Level</th>
                <th scope="col">RRA</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(hazard, index) in hazards" :key="index" style="border-bottom: 1px solid #e9ecef">
                <td style="font-weight: bold">{{hazard.name}}</td>
                <td>
                  <ul v-for="(risk, index) in hazard.risks" :key="index">
                    <li>{{risk}}</li>
                  </ul>
                </td>
                <td>{{hazard.IRA}}</td>
                <td>
                    <ul v-for="(control, index) in hazard.controls" :key="index">
                    <li>{{control}}</li>
                  </ul>
                </td>
                <td>{{hazard.controlLevel}}</td>
                <td>{{hazard.RRA}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--HAZARDOUS SUBSTANCES SECTION-->
        <div v-if="hazSubs.length > 0">
          <hr class="mt-5"><h5 class="mb-4">Hazardous Substance Register</h5>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Hazard Types</th>
                <th scope="col">Potential Harm</th>
                <th scope="col">Storage</th>
                <th scope="col">PPE</th>
                <th scope="col">Actions</th>
                <th scope="col">SDS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(sub, index) in hazSubs" :key="index" style="border-bottom: 1px solid #e9ecef">
                <td style="font-weight: bold">{{sub.name}}</td>
                <td>
                  <ul v-for="(type, index) in sub.hazTypes" :key="index">
                    <li>{{type}}</li>
                  </ul>
                </td>
                <td>{{sub.potentialHarm}}</td>
                <td>{{sub.storageRequirements}}</td>
                <td>{{sub.PPE}}</td>
                <td>{{sub.actions}}</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
          <!--TASK ANALYSIS SECTION
        <hr class="mt-5" v-if="tasks.length > 0" class="mt-5">
          <h5>Task Analysis</h5>
        -->
        <!--TRAINING REGISTER SECTION-->
        <div>
          <hr class="mt-5"><h5 class="mb-4">Training Register</h5>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">ID/License No</th>
                <th scope="col">Expiry</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(worker, index) in workers" :key="index" style="border-bottom: 1px solid #e9ecef">
                <td style="font-weight: bold">{{worker.name}}</td>
                <td>
                  <ul v-for="(training, index) in worker.training" :key="index">
                    <li>{{training.description}}</li>
                  </ul>
                </td>
                <td>
                  <ul v-for="(training, index) in worker.training" :key="index">
                    <li>{{training.ID}}</li>
                  </ul>
                </td>
                <td>
                  <ul v-for="(training, index) in worker.training" :key="index">
                  <li>{{expiry(training.expiry)}}</li>
                </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--
        INDUCTION SECTION
        <hr>
          <h5>Induction Register</h5>
        <hr>
        SIGN IN SECTION
        <hr>
          <h5>Sign In Register</h5>
        <hr>
        -->
      </div>
    </b-card>
  </b-container>
</template>

<script>
import moment from 'moment'
// import * as Pdf from 'jspdf'

export default {
  props: ['jobKey'],
  data () {
    return {
      jobSite: '',
      jobId: '',
      showMessage: false
    }
  },
  beforeMount (jobKey) {
    let jobSite = this.$store.getters.jobSite(jobKey)
    this.jobSite = jobSite.job
    this.jobId = jobSite.jobId
  },
  computed: {
    workers () {
      return this.$store.getters.workers
    },
    headerText () {
      let text = 'Safety Plan: ' + this.jobSite.address
      return text
    },
    hazards () {
      return this.$store.getters.myHazards
    },
    hazSubs () {
      return this.$store.getters.hazardousSubstances
    },
    tasks () {
      return this.$store.getters.taskAnalysis
    }
  },
  methods: {
    frequency (timer) {
      let num = timer / 24 / 60 / 60
      if (num === 1) {
        return 'Daily'
      } else if (num === 7) {
        return 'Weekly'
      } else {
        return 'Monthly'
      }
    },
    expiry (date) {
      if (date === '') {
        return ''
      } else {
        return moment(date).format('DD-MM-YYYY')
      }
    },
    createPdf () {
      this.showMessage = true
    }
  }
}
</script>

<style scoped>

  .card {
    margin-top: 20px;
  }

  .card-header {
    margin: -20px -20px 0 -20px;
    background-color: #0d539a;
  }

  header {
    line-height: 2em;
  }

  label {
    padding-top: 5px;
  }

  hr {
    background-color: #0d539a ;
    margin-right: 20px;
  }

  h5 {
    font-size: 1.2em;
    color: #0d539a;
    font-weight: bold;
    margin-left: 10px;
  }

  .row {
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding-left:0;
    margin-bottom: 10px;
  }

  @media screen and (min-width: 992px) {
    .scroll-container {
      height: 750px;
    }
  }

</style>