<template>
  <b-container fluid class="outside-container">
    <!--MODALS-->
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
        <h5>This will prevent any further activity on this job site</h5>
        <h5>This action cannot be undone</h5>
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
    
    <!--JOBSITE CARD-->
    <b-card>
      <div class="card-header">
        Jobs In Progress
        <b-button  
          class="addBtn"
          variant="success"
          @click="newJob" 
          v-b-tooltip.hover title="Create New Job Site">
          <i class="fa fa-plus"></i>
        </b-button> 
      </div>
      <div class="scroll-container">
        <b-row v-if="jobSites.length === 0">
          <b-col>
            <header class="subheader" style="color: #383838">You currently have no jobs in progress</header>
          </b-col>
        </b-row>  
        <b-card
          v-for="(job, index) in jobSites"
          :key="job.id"
          class="siteCard mt-2 mb-4">
          <b-btn block v-b-toggle="'collapse' + index" class="text-left togglebtn card-header job" v-b-tooltip.hover title="Click to show/hide job details">
            {{job.address}}
            <i class="fa fa-chevron-down" style="float:right"></i>
          </b-btn>
          <b-collapse :id="'collapse' + index" accordion="my-accordion">
          <b-form @submit.prevent="onSubmit">
            <b-row class="outer-row">
              <b-col m="12" lg="7" class="outer-col" style="padding-top: 20px; padding-right: 20px">
                <b-row>
                  <b-col md="12" lg="3">
                    <label>Supervisor:</label>
                  </b-col>
                  <b-col>
                    <b-input-group>
                      <b-form-input type="text" v-model="job.supervisorName" readonly/>
                    </b-input-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12" lg="3">
                    <label>Supervisor Phone:</label>
                  </b-col>
                  <b-col>
                    <b-form-input type="text" :value="job.supervisorPhone" readonly/>
                  </b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col md="12" lg="3" style="margin-bottom: 10px">
                    <label>Medical Centre:</label>
                  </b-col>
                  <b-col>
                    <b-form-input type="text" :value="job.medical" readonly/>
                  </b-col>
                </b-row>

                <b-row v-if="job.notifiable.length > 0" style="padding-bottom: 0">
                  <b-col md="0" lg="3"></b-col>
                  <b-col>
                    <b-row v-if="job.notifiableurl === ''">
                      <b-col md="10" lg="9" xl="10" class="outer-col">
                        <b-form-file v-model="notifiablefile" placeholder="Worksafe Notification Required"></b-form-file>
                        <b-form-text id="inputLiveHelp" style="margin-left: 15px">{{job.notifiable[0], job.notifiable[1]}}</b-form-text>
                      </b-col>
                      <b-col>
                        <b-btn variant="primary" v-if="notifiablefile !== ''" @click="uploadFile(job, 'notifiable')" v-b-tooltip.hover title="Upload file" class="uploadBtn">
                          <i class="fa fa-cloud-upload"></i>
                        </b-btn>
                      </b-col>
                    </b-row>
                    <b-row v-else style="margin-left: 0; padding-left: 5px">
                      <a target="_blank" :href="job.notifiableurl">Worksafe Notification</a>
                    </b-row>
                  </b-col>
                </b-row>

                <b-row v-if="job.environmental === 'true'" style="padding-bottom: 0">
                  <b-col md="0" lg="3"></b-col>
                  <b-col>
                    <b-row v-if="job.environmentalurl === ''">
                      <b-col md="10" lg="9" xl="10" class="outer-col">
                        <b-form-file v-model="environmentalfile" placeholder="Environmental Plan Required"></b-form-file>
                      </b-col>
                      <b-col>
                        <b-btn variant="primary" v-if="environmentalfile !== ''" @click="uploadFile(job, 'environmental')" v-b-tooltip.hover title="Upload file" class="uploadBtn">
                          <i class="fa fa-cloud-upload"></i>
                        </b-btn>
                      </b-col>
                    </b-row>
                    <b-row v-else style="margin-left: 0; padding-left: 5px">
                      <a target="_blank" :href="job.environmentalurl">Environmental Plan</a>
                    </b-row>
                  </b-col>
                </b-row>

                <b-row v-if="job.resource === 'true'" style="padding-bottom: 0">
                 <b-col md="0" lg="3"></b-col>
                 <b-col>
                    <b-row v-if="job.resourceurl === ''">
                      <b-col md="10" lg="9" xl="10"  class="outer-col">
                        <b-form-file v-model="resourcefile" placeholder="Resource Consent Required"></b-form-file>
                      </b-col>
                      <b-col>
                        <b-btn variant="primary" v-if="resourcefile !== ''" @click="uploadFile(job, 'resource')" v-b-tooltip.hover title="Upload file" class="uploadBtn">
                          <i class="fa fa-cloud-upload"></i>
                        </b-btn>
                      </b-col>
                    </b-row>
                    <b-row v-else style="margin-left: 0; padding-left: 5px">
                      <a target="_blank" :href="job.resourceurl">Resource Consent</a>
                    </b-row>
                 </b-col>
                </b-row>

              </b-col>

              <b-col m="12" lg="5" class="map">
                <iframe
                width="100%"
                height="300px"
                frameborder="0" style="border:0"
                :src="addressMap(job.address)"  
                allowfullscreen>
                </iframe>
              </b-col>
            </b-row>
          
          <hr>
          <b-row>
            <b-col cols="3"><header class="subheader">Safety Plan</header></b-col>
            <b-col cols="3"><header class="subheader">Created By:</header></b-col>
            <b-col cols="3"><header class="subheader">Expiry Date:</header></b-col>
            <b-col cols="3"><header class="subheader">Signed In:</header></b-col>
          </b-row>
          <b-row v-for="plan in safetyPlans" v-if="plan.jobId === job.id" :key='plan.jobId'>
            <b-col cols="3">
              <router-link style="padding-left: 15px"
              :to="'/dashboard/jobs/safetyplan/' + plan.id"
              >{{plan.workerName}}</router-link>
            </b-col>
            <b-col cols="3"><p style="padding-left: 15px">{{plan.createdDate}}</p></b-col>
            <b-col cols="3"><p style="padding-left: 15px">{{plan.expiryDate}}</p></b-col>
            <b-col cols="3" v-if="plan.signedIn === true"><p style="padding-left: 15px">{{plan.workerName}}</p></b-col>
          </b-row>
          </b-form>
          <b-button class="button" variant="danger" @click="confirmAction = true, jobToClose = job">Close job</b-button>
          </b-collapse>
        </b-card>
      </div>
    </b-card>
  </b-container>  
</template>

<script>
export default {
  data () {
    return {
      confirmAction: false,
      confirmed: false,
      success: false,
      error: false,
      errorMessage: '',
      notifiablefile: '',
      environmentalfile: '',
      resourcefile: '',
      jobToClose: ''
    }
  },
  computed: {
    jobSites () {
      return this.$store.getters.jobsInProgress
    },
    safetyPlans () {
      return this.$store.getters.safetyPlans
    }
  },
  methods: {
    newJob () {
      this.$router.push('/dashboard/newJob')
    },
    editJob (id) {
      this.readonly = false
    },
    closeJob () {
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
    viewSafetyPlan (jobid, safetyplanid) {
      console.log(jobid, safetyplanid)
      this.$router.push('/dashboard/jobs/' + jobid + '/' + safetyplanid)
    },
    addressMap (address) {
      return 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD7W7NiKKy0qZfRUsslzHOe-Hnkp-IncyU&q=' + address
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
      }
    }
  }
}
</script>

<style scoped>
  .card-header {
    background-color: rgba(56, 56, 56, 0.88);
    margin: -20px -20px 0 -20px;
  }

  .card-header.job {
    background-color: #1e9577;
    margin: 0;
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
  }

  .uploadBtn {
    display: block;
    float: right;
  }

  .subheader {
    padding: 15px 0 15px 15px;
    border-bottom: 1px solid lightgrey;
    font-weight: bold;
    background-color: whitesmoke;
    color: #383838;
  }
  
  .siteCard > .card-body {
    padding: 0;
  }
  
  .row {
    padding: 0px 10px 20px 15px;
  }
  
  .col {
    padding: 0;
  }

  .col-3 {
    padding: 0;
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

  .map {
    margin-top: 15px;
  }

  hr {
    margin-bottom: 0;
  }

  a {
    text-decoration-line: underline;
  }
  
  .button {
    margin: 20px;
    width: 100px;
    float: right;
  }
</style>