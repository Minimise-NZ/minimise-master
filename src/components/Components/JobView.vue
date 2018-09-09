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

    <b-card header="Job Site Activity" header-tag="header">
      <header slot="header">{{job.address}}</header>
        <b-row class="outer-row">
        <!--SITE INFORMATION COLUMN-->
        <b-col sm="12" lg="8">
        <b-row >
            <b-col md="0" lg="3"></b-col>
            <b-col sm="12" lg="9">
            <b-row v-if="job.notifiableurl === ''">
                <b-col  sm="10">
                <b-form-file v-model="notifiablefile" placeholder="Worksafe Notification"></b-form-file>
                </b-col>
                <b-col sm="1">
                <b-btn variant="primary" v-if="notifiablefile !== ''" @click="uploadFile(job, 'notifiable')" v-b-tooltip.hover title="Upload file">
                    <i class="fa fa-cloud-upload-alt"></i>
                </b-btn>
                </b-col>
            </b-row>
            <b-row v-else>
                <a target="_blank" :href="job.notifiableurl">Worksafe Notification</a>
            </b-row>
            </b-col>
        </b-row>
        <b-row v-if="job.environmental === 'true'">
            <b-col md="0" lg="3"></b-col>
            <b-col sm="12" lg="9">
            <b-row v-if="job.environmentalurl === ''">
                <b-col sm="10">
                <b-form-file v-model="environmentalfile" placeholder="Environmental Plan"></b-form-file>
                </b-col>
                <b-col sm="1">
                <b-btn variant="primary" v-if="environmentalfile !== ''" @click="uploadFile(job, 'environmental')" v-b-tooltip.hover title="Upload file">
                    <i class="fa fa-cloud-upload-alt"></i>
                </b-btn>
                </b-col>
            </b-row>
            <b-row v-else >
                <a target="_blank" :href="job.environmentalurl">Environmental Plan</a>
            </b-row>
            </b-col>
        </b-row>
        <b-row v-if="job.resource === 'true'">
            <b-col md="0" lg="3"></b-col>
            <b-col sm="12" lg="9">
            <b-row v-if="job.resourceurl === ''">
                <b-col sm="10" >
                <b-form-file v-model="resourcefile" placeholder="Resource Consent"></b-form-file>
                </b-col>
                <b-col sm="1">
                <b-btn variant="primary" v-if="resourcefile !== ''" @click="uploadFile(job, 'resource')" v-b-tooltip.hover title="Upload file" >
                    <i class="fa fa-cloud-upload-alt"></i>
                </b-btn>
                </b-col>
            </b-row>
            <b-row v-else >
                <a target="_blank" :href="job.resourceurl">Resource Consent</a>
            </b-row>
            </b-col>
        </b-row>
        <b-row v-if="job.nzhpt === 'true'">
            <b-col md="0" lg="3"></b-col>
            <b-col sm="12" lg="9">
            <b-row v-if="job.nzhpturl === ''">
                <b-col sm="10" >
                <b-form-file v-model="nzhptfile" placeholder="NZHPT Clearance"></b-form-file>
                </b-col>
                <b-col sm="1">
                <b-btn variant="primary" v-if="nzhptfile !== ''" @click="uploadFile(job, 'nzhpt')" v-b-tooltip.hover title="Upload file">
                    <i class="fa fa-cloud-upload-alt"></i>
                </b-btn>
                </b-col>
            </b-row>
            <b-row v-else >
                <a target="_blank" :href="job.nzhpturl">NZHPT Clearance</a>
            </b-row>
            </b-col>
        </b-row>

        <b-row class="mb-0 pb-0">
            <b-col md="12" lg="3">
            <label>Site Safety Plan:</label>
            </b-col>
            <b-col sm="12" lg="9">
            <router-link v-on:click.native="setSafetyPlan(job)" to="#" class="ml-2">SSSP - {{job.address}}</router-link >
            </b-col>
        </b-row>
        <!--
        <b-row>
            <b-col md="12" lg="3">
            <label>Toolbox Talk:</label>
            </b-col>
            <b-col sm="12" lg="9">
            <a class="ml-2" href="javascript:void(0)" @click="showToolbox = true">toolbox</a>
            </b-col>
        </b-row>
        -->
        </b-col>
        <div class="vl"></div>
        <!--SITE DOCS COLUMN-->
        <b-col >
        <hr><h5>Site Documents</h5><hr>
        <b-row v-for="(item, index) in job.docs" :key="index">
            <a target="_blank" :href="item.url">{{item.name}}</a>
        </b-row>
        <div class="uploadInput">
            <b-row>
            <b-col  sm="10" lg="11">
                <b-form-file v-model="docsfile" placeholder="Add new document..."></b-form-file>
            </b-col>
            <b-col sm="1">
                <b-btn variant="primary" v-if="docsfile !== ''" @click="uploadFile(job, 'docs')" v-b-tooltip.hover title="Upload file">
                <i class="fas fa-cloud-upload-alt"></i>
                </b-btn>
            </b-col>
            </b-row>
            <b-row>
            <b-btn variant="success" v-b-tooltip.hover title="Sign In" @click="signIn"><i class="fas fa-pen-alt fa-lg"></i></b-btn>
            <b-btn variant="primary" v-b-tooltip.hover title="New Toolbox Talk" @click="newToolbox(job.id)"><i class="fas fa-toolbox fa-lg"></i></b-btn>
            <b-btn style="background-color: #673ab7" v-b-tooltip.hover title="New Site Inspection" @click="newInspection(job.id)"><i class="far fa-eye fa-lg"></i></b-btn>
            <b-btn variant="danger" @click="confirmAction = true, jobToClose = job.id" v-b-tooltip.hover title="Close Job">
                <i class="fas fa-times-circle fa-lg"></i>
            </b-btn>
            </b-row>
        </div>
        </b-col>
        </b-row>
    </b-card>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  props: ['job'],
  components: {
    PulseLoader
  },
  data () {
    return {
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
  }
}
</script>

<style scoped>

  .container-fluid {
    padding-top: 20px;
  }
 
  .row {
    padding: 0px 10px 20px 15px;
    margin-right: 0;
  }


  .card-header {
    background-color: rgba(56, 56, 56, 0.88);
    margin: -20px -20px 0px -20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .card-body {
    padding-right: 0;
    padding-bottom: 0;
  }

  header {
    line-height: 2em;
  }

  .card-header.job {
    background-color: #1e9577;
    margin: 0;
    color: white;
    font-size: 1.2em;
    padding-left: 15px;
  }

  .uploadBtn {
    display: block;
    float: right;
  }

  .subheader {
    padding: 5px 0 10px 15px;
    font-weight: bold;
    color: #383838;
  }
  
  .siteCard > .card-body {
    padding: 0;
  }

  .vl {
    border-left: 2px solid #12807a;
    margin: 20px 15px;
  }

  hr {
    margin-top: 0;
    margin-bottom: 0;
    border: 0.5px solid #12807a;
  }

  h5 {
    font-size: 1.2em;
    color: #12807a;
    font-weight: bold;
    margin-top: 8px;
    text-align: center;
  }

  .outer-col {
    padding-left:0;
  }

  ul {
    list-style: none;
    padding-left: 15px;
    margin-top: 10px;
  }
  
  label {
    padding-top:5px;
  }

  .alert {
    margin-bottom: 0;
  }

  a {
    text-decoration-line: underline;
  }

  .btn {
    margin-left: 10px;
  }

  .uploadInput {
    padding-top: 0;
    position: absolute; 
    bottom: 0;
  }

  .subheader-col {
    text-align: center;
    padding-left: 0;
    padding-right: 0;
  }

  @media screen and (max-width: 992px) {
    .col {
      padding-left: 15px;
    }
    .uploadInput {
      position: relative;
    }
    .vl {
      display: none;
    }
  }
  

</style>