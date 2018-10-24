<template>
  <b-container fluid>
    <!--COMING SOON-->
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

    <b-card header-tag="header">
      <header slot="header">{{headerText}}
        <b-btn 
          class="addBtn"
          style="background-color: white"
          @click="exportPdf" 
          v-b-tooltip.hover title="Export to PDF">
          <i class="fa fa-file-pdf fa-lg" style="color: black"></i>
        </b-btn>
      </header>
      <div class="scroll-container">
        <!--OVERVIEW SECTION-->
        <div id="overview">
          <b-btn block @click="toggleShowOverview" class="text-left togglebtn " v-b-tooltip.hover title="Click to show/hide details">
            Site Safety Information
            <i class="fa fa-chevron-down" style="float:right"></i>
          </b-btn>
          <b-card class="section" v-if="showOverview === true">
            <b-row>
              <b-col sm="12" lg="6" style="padding-top: 10px; padding-right: 20px">
                <b-row>
                  <b-col md="12" lg="3">
                    <label>Supervisor:</label>
                  </b-col>
                  <b-col>
                    <b-input-group>
                      <b-form-input type="text" v-model="jobSite.supervisorName" readonly/>
                    </b-input-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12" lg="3">
                    <label>Supervisor Phone:</label>
                  </b-col>
                  <b-col>
                    <b-form-input type="text" :value="jobSite.supervisorPhone" readonly/>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12" lg="3">
                    <label>Medical Centre:</label>
                  </b-col>
                  <b-col>
                    <b-form-textarea :value="jobSite.medical" readonly/>
                  </b-col>
                </b-row>
                <b-row >
                  <b-col md="12" lg="3">
                    <label>First Aiders:</label>
                  </b-col>
                  <b-col>
                    <b-form-input v-for="(name, index) in jobSite.firstAiders" :key="index" type="text" :value="name" readonly class="mb-1"/>
                  </b-col>
                </b-row>
                <b-row >
                  <b-col md="12" lg="3">
                    <label>Induction:</label>
                  </b-col>
                  <b-col>
                    <b-form-textarea value="All workers are inducted and review safety plan prior to commencing work" readonly/>
                  </b-col>
                </b-row>
                <b-row >
                  <b-col md="12" lg="3">
                    <label>Task Analysis:</label>
                  </b-col>
                  <b-col>
                    <b-form-input type="text" value="To be completed as required" readonly/>
                  </b-col>
                </b-row>
                <b-row >
                  <b-col md="12" lg="3">
                    <label>Additional Information:</label>
                  </b-col>
                  <b-col>
                    <b-form-textarea v-if="jobSite.additionalInfo !== ''" :value="jobSite.additionalInfo" readonly rows='2'/>
                    <b-form-textarea v-else value='No additional emergency information' readonly rows='2'/>
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="12" lg="6" style="padding-top: 10px; padding-right: 20px" class="pl-0">
                <b-row>
                  <b-col md="12" lg="4">
                    <label>Incident Reporting:</label>
                  </b-col>
                  <b-col>
                    <b-form-textarea type="text" value='We have an incident/event reporting and investigation system in place' readonly/>
                  </b-col>
                </b-row>
                <b-row>
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
                <b-row >
                  <b-col md="12" lg="4">
                    <label>Emergency Plan:</label>
                  </b-col>
                  <b-col >
                    <b-form-input v-if="jobSite.emergencyPlanURL !== ''" type="text" value='Emergency Plan is attached' readonly/>
                    <b-form-input v-else type="text" value='Emergency Plan not required' readonly/>
                  </b-col>
                </b-row>
                <b-row >
                  <b-col md="12" lg="4">
                    <label>Notifiable Works:</label>
                  </b-col>
                  <b-col >
                    <b-form-input v-if="jobSite.notifiableurl !== ''" type="text" value='Worksafe Notification is attached' readonly/>
                    <b-form-input v-else type="text" value='Worksafe Notification not required' readonly/>
                  </b-col>
                </b-row>
                <b-row >
                  <b-col md="12" lg="4">Environmental Plan:</b-col>
                  <b-col>
                    <b-form-input v-if="jobSite.environmentalurl !== ''" type="text" value='Environmental Plan is attached' readonly/>
                    <b-form-input v-else type="text" value='Environmental Plan not required' readonly/>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12" lg="4">Resource Consent:</b-col>
                  <b-col>
                    <b-form-input v-if="jobSite.resourceurl !== ''" type="text" value='Resource Consent is attached' readonly/>
                    <b-form-input v-else type="text" value='Resource Consent not required' readonly/>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12" lg="4">NZHPT clearance:</b-col>
                  <b-col>
                    <b-form-input v-if="jobSite.nzhpturl !== ''" type="text" value='NZHPT clearance is attached' readonly/>
                    <b-form-input v-else type="text" value='NZHPT clearance not required' readonly/>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
        </div>
        <!--HAZARD SECTION-->
        <div>
          <b-btn block @click="toggleShowHazards" class="text-left togglebtn " v-b-tooltip.hover title="Click to show/hide details">
            Hazard Register
            <i class="fa fa-chevron-down" style="float:right"></i>
          </b-btn>
          <b-card class="table-responsive section" v-if="showHazards === true">
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
                  <td style="font-weight: bold" class="hazardName">{{hazard.name}}</td>
                  <td class="hazardRisks">
                    <ul v-for="(risk, index) in hazard.risks" :key="index">
                      <li>{{risk}}</li>
                    </ul>
                  </td>
                  <td :class="hazard.IRA" class="heat-div">{{hazard.IRA}}</td>
                  <td class="hazardControls">
                      <ul v-for="(control, index) in hazard.controls" :key="index">
                      <li>{{control}}</li>
                    </ul>
                  </td>
                  <td class="hazardControlLevel">{{hazard.controlLevel}}</td>
                  <td :class="hazard.RRA" class="heat-div">{{hazard.RRA}}</td>
                </tr>
              </tbody>
            </table>
          </b-card>
        </div>
        <!--HAZARDOUS SUBSTANCES SECTION-->
        <div v-if="hazSubs.length > 0">
          <b-btn block @click="toggleShowSubstances" class="text-left togglebtn " v-b-tooltip.hover title="Click to show/hide details">
            Hazardous Substance Register
            <i class="fa fa-chevron-down" style="float:right"></i>
          </b-btn>
          <b-card class="table-responsive section" v-if="showSubstances === true">
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
          </b-card>
        </div>
        <!--TASK ANALYSIS SECTION-->
        <div v-if="tasks.length > 0" v-for="(task, index) in tasks" :key="index">
          <b-btn block v-b-toggle="'collapseTask' + index" class="text-left togglebtn" v-b-tooltip.hover title="Click to show/hide details">
            Task Analysis - {{task.title}}
            <i class="fa fa-chevron-down" style="float:right"></i>
          </b-btn>
          <b-collapse :id="'collapseTask' + index">
            <b-card class="section">
              <div class="task-header">
                <b-row>
                  <b-col sm="6" md="3" lg="2">
                    <label>PPE Required</label>
                  </b-col>
                  <b-col>
                    <b-form-textarea :value="task.ppe" readonly></b-form-textarea>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6" md="3" lg="2">
                    <label>Plant Required</label>
                  </b-col>
                  <b-col>
                    <b-form-textarea :value="task.plant" readonly></b-form-textarea>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6" md="3" lg="2">
                    <label>Signage Required</label>
                  </b-col>
                  <b-col>
                    <b-form-textarea :value="task.signage" readonly></b-form-textarea>
                  </b-col>
                </b-row>
              </div>
              
              <div class="task-section">
                <div class="steps" v-for="(step, index) in task.steps" :key="index">
                  <div class="step-header">
                    <b-row>
                      <b-col sm="2">
                        <h5>Step {{index + 1}}: </h5>
                      </b-col>
                      <b-col style="padding-left: 20px; padding-right: 20px">
                        <b-form-input :value="step.description" style="font-weight:bold" readonly></b-form-input>
                      </b-col>
                    </b-row>
                  </div>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Hazard</th>
                        <th>Risks</th>
                        <th>IRA</th>
                        <th>Controls</th>
                        <th>Control Level</th>
                        <th>RRA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(hazard, index) in step.hazards" :key="index" style="border-bottom: 1px solid #e9ecef">
                        <td style="font-weight: bold" class="hazardName">{{hazard.name}}</td>
                        <td class="hazardRisks">
                          <ul v-for="(risk, index) in hazard.risks" :key="index">
                            <li>{{risk}}</li>
                          </ul>
                        </td>
                        <td :class="hazard.IRA" class="heat-div">{{hazard.IRA}}</td>
                        <td class="hazardControls">
                            <ul v-for="(control, index) in hazard.controls" :key="index">
                            <li>{{control}}</li>
                          </ul>
                        </td>
                        <td class="hazardControlLevel">{{hazard.controlLevel}}</td>
                        <td :class="hazard.RRA" class="heat-div">{{hazard.RRA}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </b-card>
          </b-collapse>
        </div>
        <!--TRAINING REGISTER SECTION-->
        <div>
          <b-btn block @click="toggleShowTraining" class="text-left togglebtn " v-b-tooltip.hover title="Click to show/hide details">
            Training Register
            <i class="fa fa-chevron-down" style="float:right"></i>
          </b-btn>
          <b-card class="section" v-if="showTraining === true">
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
          </b-card>
        </div>
        <!--INDUCTION SECTION
        <div>
          <b-btn block @click="toggleShowInduction" class="text-left togglebtn " v-b-tooltip.hover title="Click to show/hide details">
            Induction Register
            <i class="fa fa-chevron-down" style="float:right"></i>
          </b-btn>
            <b-card class="section" v-if="showInduction === true">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Company</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(inducted, index) in inductions" :key="index" style="border-bottom: 1px solid #e9ecef">
                    <td style="font-weight: bold">{{inducted.name}}</td>
                    <td>{{inducted.company}}</td>
                    <td>{{inducted.date}}</td>
                  </tr>
                </tbody>
              </table>
            </b-card>
        </div>
        -->
        <!--SIGN IN SECTION-->
        <div>
          <b-btn block @click="toggleShowSignIn" class="text-left togglebtn " v-b-tooltip.hover title="Click to show/hide details">
            Sign In Register
            <i class="fa fa-chevron-down" style="float:right"></i>
          </b-btn>
            <b-card class="section" v-if="showSignIn === true">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Company</th>
                    <th scope="col">Signed in Date/Time</th>
                    <th scope="col">Signed Out Date/Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(signedIn, index) in signInRegister" :key="index" style="border-bottom: 1px solid #e9ecef">
                    <td style="font-weight: bold">{{signedIn.name}}</td>
                    <td>{{signedIn.company}}</td>
                    <td>{{formatDate(signedIn.signedIn)}}</td>
                    <td v-if="signedIn.signedOut !== null">{{formatDate(signedIn.signedOut)}}</td>
                  </tr>
                </tbody>
              </table>
            </b-card>
        </div>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import moment from 'moment'
import autosize from 'autosize'
var pdfMake = require('pdfmake/build/pdfmake.js')
var pdfFonts = require('pdfmake/build/vfs_fonts.js')
pdfMake.vfs = pdfFonts.pdfMake.vfs

export default {
  data () {
    return {
      showOverview: false,
      showHazards: false,
      showSubstances: false,
      showTraining: false,
      showInduction: false,
      showSignIn: false,
      showMessage: false,
      signInRegister: null,
      columns: [
        {title: 'ID', dataKey: 'id'},
        {title: 'name', dataKey: 'name'},
        {title: 'address', dataKey: 'address'},
        {title: 'phone', dataKey: 'phone'}
      ],
      rows: [
        {'id': 1, 'name': 'Dolores', 'address': 'NZ', 'phone': '021457879'},
        {'id': 2, 'name': 'Sam', 'address': 'NZ', 'phone': '021485545'},
        {'id': 3, 'name': 'Teddy', 'address': 'NZ', 'phone': '0214575689'},
        {'id': 4, 'name': 'Hannah', 'address': 'NZ', 'phone': '021444846'}
      ]
    }
  },
  computed: {
    jobSite () {
      return this.$store.getters.safetyPlan
    },
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
    },
    header () {
      return 'Site Specific Safety Plan: ' + this.jobSite.address
    }
  },
  methods: {
    getData (prop) {
      console.log(this.jobSite[prop])
      return this.jobSite[prop]
    },
    exportPdf () {
      var dd = {
        header: {text: this.getData('companyName') + ' - Site Specific Safety Plan: ' + this.getData('address'), style: 'header'},
        footer: function (currentPage, pageCount) {
          return {
            text: currentPage.toString() + ' of ' + pageCount, alignment: 'center'
          }
        },
        content: [
          {text: 'Site Safety Information', style: 'subheader'},
          this.pdfOverview(),
          {text: 'Hazard Register', style: 'subheader', pageBreak: 'before', pageOrientation: 'landscape'},
          this.pdfHazardRegister()
          /*
          {text: 'Task Analysis', style: 'subheader', pageBreak: 'before', pageOrientation: 'landscape'},
          this.pdfTaskAnalysis(),
          {text: 'Hazardous Substances', style: 'subheader', pageBreak: 'before', pageOrientation: 'landscape'},
          this.pdfHazardousSubstanceRegister(),
          {text: 'Training Register', style: 'subheader', pageBreak: 'before', pageOrientation: 'landscape'},
          this.pdfTrainingRegister(),
          {text: 'Induction Register', style: 'subheader', pageBreak: 'before', pageOrientation: 'portrait'},
          this.pdfInductionRegister(),
          {text: 'Sign In Register', style: 'subheader', pageBreak: 'before', pageOrientation: 'portrait'},
          this.pdfSignInRegister()
          */
        ],
        styles: {
          header: {
            fontSize: 12,
            bold: true,
            width: '*',
            color: '#a2a2a2',
            margin: [38, 15]
          },
          subheader: {
            fontSize: 14,
            bold: true,
            color: '#03477d',
            margin: [0, 10, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            fillColor: '#e0e0e0'
          }
        }
      }
      pdfMake.createPdf(dd).open()
    },
    pdfOverview () {
      var dd = {
        content: [
          {
            table: {
              heights: 20,
              body: [
                ['Address:', this.getData('address')],
                ['Company Name:', this.getData('companyName')],
                ['Supervisor Name:', this.getData('supervisorName')],
                ['Supervisor Phone:', this.getData('supervisorPhone')],
                ['Medical Centre:', this.getData('medical')],
                ['First Aiders:', this.getData('firstAiders')],
                ['Induction:', 'All workers are inducted and review safety plan prior to commencing work'],
                ['Task Analysis:', 'To be completed as required'],
                ['Incident Reporting: ', 'We have an incident/event reporting process in place'],
                ['Site Inspections: ', 'Site inspections are conducted....frequency'],
                ['Toolbox Talks: ', 'Toolbox Talks are conducted....frequency'],
                ['Notifiable Works: ', 'check notifiable'],
                ['Environmental Plan: ', 'check environmental'],
                ['Resource Consent: ', 'check resource consent'],
                ['NZHPT Clearance: ', 'check NZHPT']
              ]
            },
            layout: {
              fillColor: function (i, node) {
                return (i % 2 === 0) ? '#e0e0e0' : null
              }
            }
          }
        ]
      }
      // return dd
      return dd.content
    },
    pdfHazardRegister () {
      var bodyContent = [[
        {text: 'Hazard Name', style: 'tableHeader'},
        {text: 'Risks', style: 'tableHeader'},
        {text: 'IRA', style: 'tableHeader'},
        {text: 'Controls', style: 'tableHeader'},
        {text: 'Control Level', style: 'tableHeader'},
        {text: 'RRA', style: 'tableHeader'}
      ]]
      let hazards = this.hazards
      for (let hazard of hazards) {
        bodyContent.push([hazard.name, hazard.risks, hazard.IRA, hazard.controls, hazard.controlLevel, hazard.RRA])
      }
      console.log('body', bodyContent)
      var dd = {
        content: [
          {
            table: {
              headerRows: 1,
              heights: 25,
              body: bodyContent
            }
          }
        ]
      }
      // return dd
      return dd.content
    },
    formatDate (date) {
      return moment(date).format('hh:mm D/MM/YY')
    },
    toggleShowOverview () {
      this.showOverview = !this.showOverview
      this.autosize()
    },
    toggleShowHazards () {
      this.showHazards = !this.showHazards
    },
    toggleShowSubstances () {
      this.showSubstances = !this.showSubstances
    },
    toggleShowTraining () {
      this.showTraining = !this.showTraining
    },
    toggleShowSignIn () {
      this.showSignIn = !this.showSignIn
    },
    toggleShowInduction () {
      this.showInduction = !this.showInduction
    },
    autosize () {
      setTimeout(() => {
        autosize(document.querySelectorAll('textarea'))
      }, 100)
    },
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
    }
  },
  mounted () {
    autosize(document.querySelectorAll('textarea'))
    this.$store.dispatch('getSignInRegister', this.jobSite.id)
    .then((register) => {
      console.log('register', register)
      this.signInRegister = register
    })
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    padding-right: 20px;
    overflow-y: hidden;
  }

   .scroll-container {
    height: 80vh;
    overflow-y: scroll;
    margin-top: 15px;
    padding-bottom: 20px;
  }

  .card-header {
    background-color: rgba(56, 56, 56, 0.88);
    font-size: 1.2em;
    color: white;
    line-height: 2em;
  }

  .card-body {
    padding-top: 0;
    padding-bottom: 0;
  }

  .btn {
    float: right;
  }

  .togglebtn {
    background-color: rgba(16, 73, 119, 0.91);
    color: white;
    border-radius: 0;
  }

  label {
    padding-top: 5px;
  }

  .row {
    margin-bottom: 7px;
    padding-left: 7px;
  }

  .section > .card-body{
    padding: 0;
  }

  .table {
    margin-bottom: 0;
  }

  thead {
    background-color: #c1c1c1;
  }

  ul {
    list-style: none;
    padding-left:0;
    margin-bottom: 10px;
  }

  .task-header {
    padding: 10px;
  }

  .step-header {
    background-color: #6f6f6f;
    margin-top: 10px;
    color: white;
    padding-top: 4px;
    padding-right: 5px;
    padding-bottom: 1px;
  }

  h5 {
    padding-top: 10px;
    padding-left: 10px;
    font-size: 1.1em;
  }

  .hazardName {
    width: 15%;
  }

  .hazardRisks {
     width: 20%;
  }

  .hazardControls {
    width: 40%;
  }

  .hazardControlLevel {
    width: 15%;
  }

  .heat-div {
    font-weight: bold;
    line-height: 1.5em;
    text-align: center;
    min-width: 90px;
    max-width: 90px;
  }
  .Low {
    background-color: rgb(76, 175, 80);
  }

  .Moderate {
    background-color: rgba(255, 87, 34, 0.75);
  }

  .High {
    background-color: rgb(244, 67, 54);
  }

  .Critical {
    background-color:rgba(233, 30, 99, 0.75);
  }

</style>