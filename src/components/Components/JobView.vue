<template>
  <div>
    <!--MODALS-->
    <b-modal
      size="lg"
      style="z-index: 1"
      v-model="showToolbox"
      v-if="showToolbox" 
      :no-close-on-backdrop="true"
      header-bg-variant="info"
      headerTextVariant= 'light'
      title="Toolbox Talk">
      <b-form @submit.prevent="handleOk">
        <b-row>
          <b-col cols="3">
            <label>Supervisor:</label>
          </b-col>
          <b-col>
            <b-form-input :value="user.name" readonly></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <label>Date/Time:</label>
          </b-col>
          <b-col>
            <b-form-input :value="new Date().toLocaleString()" readonly></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <label>Topics discussed:</label>
          </b-col>
          <b-col>
            <b-form-textarea rows="4" v-model="toolbox.topics"></b-form-textarea>
          </b-col>
        </b-row>
         <b-row>
          <b-col cols="3">
            <label>Employee issues raised:</label>
          </b-col>
          <b-col>
            <b-form-textarea rows="4" v-model="toolbox.issues"></b-form-textarea>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <label>Safe observations reviewed/discussed:</label>
          </b-col>
          <b-col>
            <b-form-textarea rows="4" v-model="toolbox.observations"></b-form-textarea>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <label>Jobs completed/reviewed</label>
          </b-col>
          <b-col>
            <b-form-textarea rows="4" v-model="toolbox.jobsCompleted"></b-form-textarea>
          </b-col>
        </b-row>
      </b-form>
      <div slot="modal-footer">
        <b-btn class="float-right" variant="primary" @click="saveToolbox">Save</b-btn>
        <b-btn class="float-right" variant="danger" @click="handleCancel">Cancel</b-btn>
        <pulse-loader :loading="loading"></pulse-loader>
      </div>
    </b-modal>
    <b-modal 
      v-model="confirmAction" 
      v-if="confirmAction" 
      @ok="closeJob()"
      @cancel="this.jobToClose = ''"
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
    <b-modal 
      v-model="success" 
      v-if="success"
      ok-only
      @ok="jobToClose = ''"
      centered 
      header-bg-variant="success"
      headerTextVariant= 'light'
      title="Success">
      <div class="d-block text-center">
        <h4 class="mt-2">{{jobToClose.address}}</h4>
        <h5>This job has been closed</h5>
      </div>
    </b-modal>
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
      <header slot="header">{{job.address}}
        <b-button-toolbar slot="header">
          <b-btn variant="dark" v-b-tooltip.hover title="Sign In" @click="signIn" size="sm"><i class="fas fa-pen-alt fa-sm" style="color: rgb(1, 206, 187)" ></i></b-btn>
            <b-btn variant="dark" v-b-tooltip.hover title="New Toolbox Talk" @click="newToolbox(job.id)" size="sm">
              <i class="fas fa-toolbox" style="color: #03a9f4"></i>
            </b-btn>
            <b-btn variant="dark" v-b-tooltip.hover title="New Site Inspection" @click="newInspection(job.id)" size="sm">
              <i class="far fa-eye" style="color: #FFEB3B"></i>
            </b-btn>
            <b-btn variant="dark" @click="confirmAction = true, jobToClose = job.id" v-b-tooltip.hover title="Close Job" size="sm">
              <i class="fas fa-times-circle" style="color: rgba(255, 115, 71, 0.94)"></i>
            </b-btn>
        </b-button-toolbar>
      </header>
      <b-row>
        <!--SITE INFORMATION COLUMN-->
        <b-col>
        <h5>Site Information</h5><hr>
          <label>Supervisor</label>
          <b-form-input :value="job.supervisorName" readonly></b-form-input>
          <label>Supervisor Phone</label>
          <b-form-input :value="job.supervisorPhone" readonly></b-form-input>
          <label>Medical Centre</label>
          <b-form-textarea :value="job.medical" readonly rows="2"></b-form-textarea>
          <label>First Aiders</label>
          <b-form-input v-for="(name, index) in firstAiders" :key="index" :value="name" readonly class="mb-1"></b-form-input>
        </b-col>
        
        <!--SITE DOCS COLUMN-->
        <b-col>
        <h5>Site Safety Documents</h5><hr class="mb-3">
        <b-row>
          <router-link v-on:click.native="setSafetyPlan(job)" to="#">SSSP - {{job.address}}</router-link >
        </b-row>
        <b-row>
          <a href="javascript:void(0)" @click="showToolbox = true">Toolbox Talk</a>
        </b-row>
        <b-row>
          <a href="javascript:void(0)" @click="showInspection = true">Site Inspection</a>
        </b-row>
        <b-row>
          <a href="javascript:void(0)" @click="showInductions= true">Induction Register</a>
        </b-row>
        
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
        <b-col >
          <h5>Signed In</h5><hr>
          <div class="content">
            <b-row class="mt-1">
              <label>SSSP and Toolbox Talk:</label>
            </b-row>
            <b-row v-for="(obj, index) in signedIn" :key="index" class="mb-1 mr-1"> 
              <b-form-input :value="(obj.name + ' : ' + obj.date)" readonly></b-form-input>
            </b-row>
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
export default {
  props: ['job', 'index'],
  components: {
    PulseLoader
  },
  data () {
    return {
      TAsignedOn: [
        'name 1', 'name 2'
      ],
      signedIn: [
        {name: 'name 1', date: '12/05/2018'},
        {name: 'name 1', date: '12/05/2018'},
        {name: 'name 1', date: '12/05/2018'},
        {name: 'name 1', date: '12/05/2018'},
        {name: 'name 1', date: '12/05/2018'},
        {name: 'name 1', date: '12/05/2018'},
        {name: 'name 1', date: '12/05/2018'},
        {name: 'name 1', date: '12/05/2018'},
        {name: 'name 1', date: '12/05/2018'}
      ],
      firstAiders: [
        'name 1', 'name 2'
      ],
      loading: false,
      showToolbox: false,
      toolbox: {
        jobKey: '',
        topics: '',
        issues: '',
        observations: '',
        jobsCompleted: ''
      },
      toolboxSuccess: false,
      inspection: {
        jobKey: ''
      },
      showInspection: false,
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
      jobToClose: '',
      showMessage: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    viewPlan (plan) {
      console.log(plan)
      this.$router.push('/dashboard/jobs/safetyplan/' + plan.id)
    },
    async setSafetyPlan (job) {
      this.loading = true
      let res = await this.$store.dispatch('storeSafetyPlan', job)
      console.log(res)
      this.$router.push('/dashboard/jobs/safetyplan')
      this.loading = false
    },
    toolBoxLink (jobKey) {
      this.$store.dispatch('getToolbox', jobKey)
      .then((toolbox) => {
        return toolbox.jobKey
      })
    },
    editJob (id) {
      this.readonly = false
    },
    closeJob () {
      console.log('closing job', this.jobToClose)
      this.$store.dispatch('closeJob', this.jobToClose)
      .then(() => {
        this.success = true
        this.$store.dispatch('getAllJobs')
      })
      .catch((error) => {
        this.errorMessage = error.message
        this.errorModal = true
      })
    },
    signIn () {
      this.showMessage = true
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
    newToolbox (jobkey) {
      this.toolbox.jobKey = jobkey
      this.showToolbox = true
    },
    saveToolbox () {
      this.$store.dispatch('newToolbox', {
        supervisorName: this.user.name,
        timestamp: Date.now(),
        jobKey: this.toolbox.jobKey,
        topics: this.toolbox.topics,
        issues: this.toolbox.issues,
        observations: this.toolbox.observations,
        jobsCompleted: this.toolbox.jobsCompleted
      })
      .then(() => {
        this.showToolbox = false
        this.toolboxSuccess = true
      })
    },
    newInspection (jobKey) {
      this.showMessage = true
      /*
      this.inspection.jobKey = jobKey
      this.showInspection = true
      */
    },
    handleCancel () {
      this.showToolbox = false
      this.toolbox.jobKey = ''
      this.toolbox.topics = ''
      this.toolbox.issues = ''
      this.toolbox.observations = ''
      this.toolbox.jobsCompleted = ''
      this.toolbox.attendees = []
    }
  },
  mounted () {
    autosize(document.querySelectorAll('textarea'))
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
    padding:0;
    padding: 5px 15px 5px 20px;
    line-height: 2.5em;
    font-size: 1.1em;
  }


  hr {
    margin-top: 0;
    margin-bottom: 5px;
    border: 0.5px solid rgba(0, 55, 115, 0.82);
  }

  h5 {
    font-size: 1.1em;
    color: rgba(0, 55, 115, 0.82);
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
  }

  .content {
    padding-left: 10px;
    margin-bottom: 10px;
  }

  a {
    text-decoration-line: underline;
    padding-top: 10px;
    padding-left: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .col-1 {
    margin-top: 10px;
    padding-left: 0;
  }

  .custom-file {
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .btn-toolbar {
    float: right;
  }

  .btn {
    margin: 2px;
  }

</style>