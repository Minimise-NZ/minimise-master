<template>
  <div>
    <!--TOOLBOX-->
    <b-modal
      id="toolboxModal"
      size="lg"
      style="z-index: 1"
      v-model="showToolbox"
      v-if="showToolbox" 
      :no-close-on-backdrop="true"
      header-bg-variant="primary"
      headerTextVariant= 'light'
      title="Toolbox Talk">
      <b-form>
        <b-row class="mb-2">
          <b-col cols="3">
            <label>Supervisor:</label>
          </b-col>
          <b-col>
            <b-form-input v-if="this._.isEmpty(toolbox)" :value="user.name" readonly></b-form-input>
            <b-form-input v-else :value="toolbox.supervisorName" readonly></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="3">
            <label>Date/Time:</label>
          </b-col>
          <b-col>
            <b-form-input v-if="this._.isEmpty(toolbox)" :value="new Date().toLocaleString()" readonly></b-form-input>
            <b-form-input v-else :value="toolbox.date" readonly></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="3">
            <label>Topics discussed:</label>
          </b-col>
          <b-col>
            <b-form-textarea rows="4" v-if="this._.isEmpty(toolbox)" v-model="newToolbox.topics"></b-form-textarea>
            <b-form-textarea rows="4" v-else :value="toolbox.topics" readonly></b-form-textarea>
          </b-col>
        </b-row>
         <b-row class="mb-2">
          <b-col cols="3">
            <label>Employee issues raised:</label>
          </b-col>
          <b-col>
            <b-form-textarea rows="4" v-if="this._.isEmpty(toolbox)" v-model="newToolbox.issues"></b-form-textarea>
            <b-form-textarea rows="4" v-else :value="toolbox.issues" readonly></b-form-textarea>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="3">
            <label>Safe observations reviewed/discussed:</label>
          </b-col>
          <b-col>
            <b-form-textarea rows="4" v-if="this._.isEmpty(toolbox)" v-model="newToolbox.observations"></b-form-textarea>
            <b-form-textarea rows="4" v-else :value="toolbox.observations" readonly></b-form-textarea>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="3">
            <label>Jobs completed/reviewed</label>
          </b-col>
          <b-col>
            <b-form-textarea rows="4" v-if="this._.isEmpty(toolbox)" v-model="newToolbox.jobsCompleted"></b-form-textarea>
            <b-form-textarea rows="4" v-else :value="toolbox.jobsCompleted" readonly></b-form-textarea>
          </b-col>
        </b-row>
        <b-row v-if="toolbox !== null">
          <b-col cols="3">
            <label>Attendees Signed On</label>
          </b-col>
          <b-col>
            <b-form-textarea rows="4" readonly></b-form-textarea>
          </b-col>
          <!--
          <b-col>
            <b-form-textarea rows="4" :value="toolbox.attendees.toString()" readonly></b-form-textarea>
          </b-col>
          -->
        </b-row>
      </b-form>
      <div slot="modal-footer">
        <b-btn class="float-right" variant="primary" @click="saveToolbox">Save</b-btn>
        <b-btn class="float-right" variant="danger" @click="handleCancel">Cancel</b-btn>
        <pulse-loader :loading="loading"></pulse-loader>
      </div>
    </b-modal>
    <!--CONFIRM CLOSE-->
    <b-modal 
      v-model="confirmAction" 
      v-if="confirmAction" 
      @ok="closeJob()"
      centered 
      header-bg-variant="danger"
      headerTextVariant= 'light'
      title="Confirm Action">
      <div class="d-block text-center">
        <h4 class="mt-2">Are you sure you want to close <br>this job site?</h4>
        <br>
        <h5 style="color:grey">This will prevent any further activity on this job site</h5>
        <h5 style="color:grey">This action cannot be undone</h5>
      </div>
    </b-modal>
    <!--CLOSE SUCCESS MESSAGE-->
    <b-modal 
      v-model="success" 
      v-if="success"
      ok-only
      @ok="getJobs()"
      centered 
      header-bg-variant="success"
      headerTextVariant= 'light'
      title="Success">
      <div class="d-block text-center">
        <h4 class="mt-2">{{job.address}}</h4>
        <h5>This job has been closed</h5>
      </div>
    </b-modal>
    <!--TOOLBOX SAVE SUCESS-->
    <b-modal 
      v-model="toolboxSuccess" 
      v-if="toolboxSuccess"
      ok-only
      centered 
      header-bg-variant="success"
      headerTextVariant= 'light'
      title="Success">
      <div class="d-block text-center">
        <h4>This toolbox talk has been saved</h4>
      </div>
    </b-modal>
    <!--ERROR-->
    <b-modal
      v-model="error" 
      v-if="error" 
      ok-only
      header-bg-variant="danger"
      headerTextVariant= 'light'
      title="Oops..">
      <div class="d-block text-center">
        <h4>{{errorMessage}}</h4>
      </div>
    </b-modal>
    <!--SIGNED IN/OUT-->
     <b-modal 
      v-model="signedInOut" 
      v-if="signedInOut"
      ok-only
      centered 
      header-bg-variant="success"
      headerTextVariant= 'light'
      title="Success">
      <div class="d-block text-center">
        <h4>{{signedInOutMessage}}</h4>
        <h4>{{job.address}}</h4>
      </div>
    </b-modal>


    <b-card header-tag="header">
      <header slot="header">{{job.address}}
        <b-button-toolbar slot="header" v-if="!loading">
          <div v-if="this._.isEmpty(currentJob) === false && currentJob.register.jobId === this.job.id">
            <b-btn variant="dark" v-b-tooltip.hover title="Sign Out" @click="signOut" size="sm"><i class="fas fa-sign-out-alt fa-sm" style="color: rgba(249, 82, 188, 0.86)" ></i></b-btn>
            <!--
            <b-btn variant="dark" v-b-tooltip.hover title="New Site Inspection" @click="showInspection = true" size="sm">
              <i class="far fa-eye" style="color: #FFEB3B"></i>
            </b-btn>
            -->
          </div>
          <div v-if="this._.isEmpty(currentJob)">
            <b-btn variant="dark" v-b-tooltip.hover title="Sign In" @click="signIn" size="sm"><i class="fas fa-pen-alt fa-sm" style="color: rgb(1, 206, 187)" ></i></b-btn>
          </div>
          <div>
            <b-btn v-if="this._.isEmpty(toolbox)" variant="dark" v-b-tooltip.hover title="New Toolbox Talk" @click="showToolbox = true" size="sm">
              <i class="fas fa-toolbox" style="color: #03a9f4"></i>
            </b-btn>
          </div>
          <div>
            <b-btn variant="dark" @click="confirmAction = true, jobToClose = job.id" v-b-tooltip.hover title="Close Job" size="sm">
              <i class="fas fa-times-circle" style="color: rgba(255, 115, 71, 0.94)"></i>
            </b-btn>
          </div>
        </b-button-toolbar>
        <b-button-toolbar v-if="loading">
          <div class="loader">
            <pulse-loader :loading="loading" ></pulse-loader>
          </div>
        </b-button-toolbar>
      </header>

      <b-row>
        <!--SITE INFORMATION COLUMN-->
        <b-col sm="12" lg="4">
          <h5>Site Information</h5><hr>
          <label>Supervisor</label>
          <b-form-input :value="job.supervisorName" readonly></b-form-input>
          <label>Supervisor Phone</label>
          <b-form-input :value="job.supervisorPhone" readonly></b-form-input>
          <label>Medical Centre</label>
          <b-form-textarea :value="job.medical" readonly rows="2"></b-form-textarea>
          <label>First Aiders</label>
          <b-form-input v-for="(name, index) in job.firstAiders" :key="index" :value="name" readonly class="mb-1"></b-form-input>
        </b-col>
        
        <!--SITE DOCS COLUMN-->
        <b-col sm="12" lg="4">
          <h5>Site Safety Documents</h5><hr class="mb-3">
          <b-row>
            <router-link v-on:click.native="setSafetyPlan(job)" to="#">SSSP - {{job.address}}</router-link >
          </b-row>
          <b-row v-if="this._.isEmpty(toolbox) === false">
            <a href="javascript:void(0)" @click="showToolbox = true">Toolbox Talk</a>
          </b-row>
          <!--
          <b-row>
            <a href="javascript:void(0)" @click="showInspection = true">Site Inspection</a>
          </b-row>
          <b-row>
            <a href="javascript:void(0)" @click="showInductions= true" v-if="job.inductionRegister.length > 0">Induction Register</a>
          </b-row>
          -->
          <div>
            <b-row v-if="job.emergencyPlanURL === ''">
              <b-col cols="10">
                <b-form-file v-model="emergencyfile" placeholder="Emergency Plan" accept="image/*, .pdf"></b-form-file>
              </b-col>
              <b-col cols="1">
                <b-btn variant="primary" v-if="emergencyfile != ''" @click="uploadFile(job, 'emergency')" v-b-tooltip.hover title="Upload file">
                  <i class="fa fa-cloud-upload-alt"></i>
                </b-btn>
              </b-col>
            </b-row>
            <b-row v-else>
              <a target="_blank" :href="job.emergencyPlanURL">Emergency Plan</a>
            </b-row>
          </div>
          <div v-if="job.notifiable === 'true'">
            <b-row v-if="job.notifiableurl === ''">
              <b-col cols="10">
                <b-form-file v-model="notifiablefile" placeholder="Worksafe Notification" accept="image/*, .pdf"></b-form-file>
              </b-col>
              <b-col cols="1">
              <b-btn variant="primary" v-if="notifiablefile !== ''" @click="uploadFile(job, 'notifiable')" v-b-tooltip.hover title="Upload file">
                <i class="fa fa-cloud-upload-alt"></i>
              </b-btn>
              </b-col>
            </b-row>
            <b-row v-else>
              <a target="_blank" :href="job.notifiableurl">Worksafe Notification</a>
            </b-row>
          </div>
          <div v-if="job.environmental === 'true'">
            <b-row v-if="job.environmentalurl === ''">
              <b-col cols="10">
                <b-form-file v-model="environmentalfile" placeholder="Environmental Plan" accept="image/*, .pdf"></b-form-file>
              </b-col>
              <b-col cols="1">
                <b-btn variant="primary" v-if="environmentalfile !== ''" @click="uploadFile(job, 'environmental')" v-b-tooltip.hover title="Upload file">
                    <i class="fa fa-cloud-upload-alt"></i>
                </b-btn>
              </b-col>
            </b-row>
            <b-row v-else>
              <a target="_blank" :href="job.environmentalurl">Environmental Plan</a>
            </b-row>
          </div>
          <div v-if="job.resource === 'true'">
            <b-row v-if="job.resourceurl === ''">
              <b-col cols="10">
                <b-form-file v-model="resourcefile" placeholder="Resource Consent" accept="image/*, .pdf"></b-form-file>
              </b-col>
              <b-col cols="1">
                <b-btn variant="primary" v-if="resourcefile !== ''" @click="uploadFile(job, 'resource')" v-b-tooltip.hover title="Upload file">
                  <i class="fa fa-cloud-upload-alt"></i>
                </b-btn>
              </b-col>
            </b-row>
            <b-row v-else>
              <a target="_blank" :href="job.resourceurl">Resource Consent</a>
            </b-row>
          </div>
          <div v-if="job.nzhpt === 'true'">
            <b-row v-if="job.nzhpturl === ''">
              <b-col cols="10">
                <b-form-file v-model="nzhptfile" placeholder="NZHPT Clearance" accept="image/*, .pdf"></b-form-file>
              </b-col>
              <b-col cols="1">
                <b-btn variant="primary" v-if="nzhptfile !== ''" @click="uploadFile(job, 'nzhpt')" v-b-tooltip.hover title="Upload file">
                    <i class="fa fa-cloud-upload-alt"></i>
                </b-btn>
              </b-col>
            </b-row>
            <b-row v-else>
              <a target="_blank" :href="job.nzhpturl">NZHPT Clearance</a>
            </b-row>
          </div>
          <b-row v-for="(item, index) in job.docs" :key="index">
            <a target="_blank" :href="item.url">{{item.name}}</a>
          </b-row>
          <b-row>
            <b-col cols="10">
                <b-form-file v-model="docsfile" placeholder="Add new document..." accept="image/*, .pdf"></b-form-file>
            </b-col>
            <b-col cols="1">
              <b-btn variant="primary" v-if="docsfile !== ''" @click="uploadFile(job, 'docs')" v-b-tooltip.hover title="Upload file">
                <i class="fas fa-cloud-upload-alt"></i>
              </b-btn>
            </b-col>
          </b-row>
        </b-col>

        <!--SIGNED IN  COLUMN-->
        <b-col sm="12" lg="4">
          <h5>Signed In</h5><hr>
          <div class="content">
            <b-row class="mt-1">
              <label>SSSP and Toolbox Talk:</label>
            </b-row>
            <div v-if="signedIn !== null">
              <b-row v-for="(worker, index) in signedIn" :key="index" class="mb-1 mr-1"> 
                <b-form-input :value="(formatDate(worker.time) + ' : ' + worker.name)" readonly></b-form-input>
              </b-row>
            </div>
          </div>
          <div class="content" v-if="job.task !== null">
            <b-row>
              <label>Task Analysis: Signed On</label>
            </b-row>
            <b-row v-for="(name, index) in TAsignedOn" :key="index" class="mb-1 mr-1">
              <b-form-input :value="name" readonly></b-form-input>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import autosize from 'autosize'
import moment from 'moment'
// const today = moment().format('DD-MM-YYYY')
export default {
  props: ['job', 'index'],
  components: {
    PulseLoader
  },
  data () {
    return {
      TAsignedOn: [
      ],
      loading: false,
      showToolbox: false,
      newToolbox: {
        jobKey: this.job.id,
        topics: '',
        issues: '',
        observations: '',
        jobsCompleted: ''
      },
      toolbox: {},
      signedIn: [],
      toolboxSuccess: false,
      confirmAction: false,
      confirmed: false,
      success: false,
      error: false,
      errorMessage: '',
      notifiablefile: '',
      environmentalfile: '',
      emergencyfile: '',
      resourcefile: '',
      nzhptfile: '',
      docsfile: '',
      signedInOut: false,
      signedInOutMessage: ''
    }
  },
  computed: {
    currentJob () {
      return this.$store.getters.currentJob
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    formatDate (date) {
      return moment(date).format('hh:mm')
    },
    async setSafetyPlan (job) {
      this.loading = true
      this.$store.dispatch('storeSafetyPlan', job)
      .then(() => {
        this.$router.push('/dashboard/jobs/safetyplan')
        this.loading = false
      })
    },
    editJob (id) {
      this.readonly = false
    },
    closeJob () {
      this.loading = true
      console.log('closing job', this.job.id)
      this.$store.dispatch('closeJob', this.job.id)
      .then(() => {
        this.success = true
        this.loading = false
      })
      .catch((error) => {
        this.errorMessage = error.message
        this.errorModal = true
        this.loading = false
      })
    },
    signIn () {
      this.loading = true
      this.$store.dispatch('jobSignOn', this.job.id)
      .then(() => {
        this.getSignedIn()
        this.signedInOut = true
        this.signedInOutMessage = 'You are signed in:'
        this.loading = false
      })
    },
    signOut () {
      this.loading = true
      this.$store.dispatch('signOutCurrentJob')
      .then(() => {
        this.getSignedIn()
        this.signedInOut = true
        this.signedInOutMessage = 'You are signed out:'
        this.loading = false
      })
    },
    async uploadFile (job, type) {
      console.log(job, type)
      switch (type) {
        case 'notifiable':
          console.log('uploading notifiable')
          job.notifiableurl = await this.$store.dispatch('uploadFile', {file: this.notifiablefile, type: 'notifiable'})
          console.log('Updated job', job)
          this.$store.dispatch('updateJob', job)
          break
        case 'environmental':
          console.log('uploading environmental')
          job.environmentalurl = await this.$store.dispatch('uploadFile', {file: this.environmentalfile, type: 'environmental'})
          console.log('Updated job', job)
          this.$store.dispatch('updateJob', job)
          break
        case 'resource':
          console.log('uploading resource')
          job.resourceurl = await this.$store.dispatch('uploadFile', {file: this.resourcefile, type: 'resource'})
          console.log('Updated job', job)
          this.$store.dispatch('updateJob', job)
          break
        case 'nzhpt':
          console.log('uploading nzhpt')
          job.nzhpturl = await this.$store.dispatch('uploadFile', {file: this.nzhptfile, type: 'nzhpt'})
          console.log('Updated job', job)
          this.$store.dispatch('updateJob', job)
          break
        case 'emergency':
          console.log('uploading emergency plan')
          job.emergencyPlanURL = await this.$store.dispatch('uploadFile', {file: this.emergencyfile, type: 'mergency'})
          console.log('Updated job', job)
          this.$store.dispatch('updateJob', job)
          break
        case 'docs':
          console.log('uploading doc')
          this.$store.dispatch('uploadFile', {file: this.docsfile, type: this.docsfile.name})
          .then((url) => {
            job.docs.push({url: url, name: this.docsfile.name})
            console.log('Updated job', job)
            this.$store.dispatch('updateJob', job)
          })
          break
      }
    },
    getJobs () {
      this.$store.dispatch('getAllJobs')
    },
    getToolbox () {
      this.$store.dispatch('getToolbox', this.job.id)
      .then((toolbox) => {
        if (toolbox !== null) {
          this.toolbox = toolbox
        }
      })
    },
    getSignedIn () {
      this.$store.dispatch('getSignedIn', this.job.id)
      .then((register) => {
        if (register !== null) {
          this.signedIn = register
        }
      })
    },
    saveToolbox () {
      this.loading = true
      this.$store.dispatch('newToolbox', this.newToolbox)
      .then(() => {
        this.newToolbox = {
          jobKey: '',
          topics: '',
          issues: '',
          observations: '',
          jobsCompleted: ''
        }
        this.toolboxSuccess = true
        this.handleCancel()
        this.getToolbox()
        this.loading = false
      })
    },
    handleCancel () {
      this.showToolbox = false
      this.newToolbox.jobKey = ''
      this.newToolbox.topics = ''
      this.newToolbox.issues = ''
      this.newToolbox.observations = ''
      this.newToolbox.jobsCompleted = ''
      this.newToolbox.attendees = []
    }
  },
  mounted () {
    autosize(document.querySelectorAll('textarea'))
    this.getToolbox()
    this.getSignedIn()
  }
}
</script>

<style scoped>

  .container-fluid {
    padding-top: 20px;
  }

  .card {
    margin-bottom: 15px;
  }
 
  .card-header {
    background-color: rgba(0, 55, 115, 0.82);
    color: white;
    padding-top: 5px;
    padding-bottom: 5px;
    line-height: 2em;
    font-size: 1em;
  }

  hr {
    margin-top: 0;
    margin-bottom: 5px;
    border: 0.5px solid #383838;
  }

  h5 {
    font-size: 1em;
    color: #383838;
    font-weight: bold;
    margin-left: 8px;
  }

  .card-body {
    padding: 15px;
  }

  label {
    padding: 10px 10px 0 10px;
    font-weight: bold;
    color: #194e8a;
    font-size: 0.9em;
  }

  .form-control {
    font-size: 0.9em;
  }

  .content {
    padding-left: 10px;
    margin-bottom: 10px;
  }

  a {
    text-decoration-line: underline;
    padding-left: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    font-size: 0.9em;
  }

  .col-1 {
    margin-top: 10px;
    padding-left: 0;
    font-size: 0.9em;
  }

  .custom-file {
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 0.9em !important;
  }

  .btn-toolbar {
    float: right;
  }

  .btn {
    margin: 2px;
  }

  @media screen and (max-width: 768px) {
  }

  @media screen and (max-width : 992px) {
    .col-sm-12 {
      margin-bottom: 20px;
    }
  }

  @media screen and (max-width : 1200px) {
  }

  @media screen and (min-width : 1200px) {
  }

</style>