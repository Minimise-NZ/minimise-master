<template>
  <b-container fluid class="outside-container">
    <b-card>
      <div class="card-header">Jobs In Progress</div>
      <div class="scroll-container">
        <b-row v-if="jobSites.length === 0">
          <b-col>
            <header class="subheader" style="color: rgba(111, 50, 130, 0.86)">You currently have no jobs in progress</header>
          </b-col>
        </b-row>
        <b-card
          v-for="(job, index) in jobSites"
          :key="job.id"
          class="siteCard mt-2 mb-4">
          <b-btn block v-b-toggle="'collapse' + index" class="text-left togglebtn card-header job">
            {{job.address}} - Site Information
            <p style="float:right; margin-bottom:0">Click to hide/show</p>
          </b-btn>
          <b-collapse :id="'collapse' + index" visible>
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
                <b-row>
                  <b-col md="12" lg="3" style="margin-bottom: 10px">
                    <label>Medical Centre:</label>
                  </b-col>
                  <b-col>
                    <b-form-input type="text" :value="job.medical" readonly/>
                  </b-col>
                </b-row>
                <b-row v-if="job.notifiable.length > 0">
                  <b-col md="12" lg="3"></b-col>
                  <b-col>
                    <b-form-file v-model="worksafefile" :state="Boolean(worksafefile)" placeholder="Worksafe Notification Required"></b-form-file>
                    <b-form-text id="inputLiveHelp" style="margin-left: 15px">{{job.notifiable[0]}}</b-form-text>
                  </b-col>
                </b-row>
                <b-row v-if="job.environmental === 'true'">
                  <b-col md="12" lg="3"></b-col>
                  <b-col>
                    <b-form-file v-model="environmentfile" :state="Boolean(environmentfile)" placeholder="An environmental plan is required"></b-form-file>
                  </b-col>
                </b-row>
                <b-row v-if="job.resource === 'true'">
                  <b-col md="12" lg="3"></b-col>
                  <b-col>
                    <b-form-file v-model="resourcefile" :state="Boolean(resourcefile)" placeholder="A resource consent is required"></b-form-file>
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
          
          <header class="card-header plans">{{job.address}} - Safety Plans</header>
          <b-row>
            <b-col>
              <header class="subheader">Safety Plan</header>
              <ul>
                <li v-for="(plan, index) in job.safetyPlans" :key='index'>
                  <router-link
                  :to="{ name: 'safetyplan', params: { jobid: job.id, planid: index} }"
                  >{{plan.workerName}}</router-link>
                </li>
              </ul>
            </b-col>
            <b-col> 
              <header class="subheader">Created By:</header>
              <ul>
                plan.createdBy
              </ul>
            </b-col>
            <b-col> 
              <header class="subheader">Expiry Date:</header>
              <ul>
                plan.expiryDate
              </ul>
            </b-col>
            <b-col> 
              <header class="subheader">Signed In:</header>
              <ul>
                plan.signedIn
              </ul>
            </b-col>
          </b-row>
          </b-form>
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
      worksafefile: null,
      environmentfile: null,
      resourcefile: null
    }
  },
  computed: {
    jobSites () {
      return this.$store.getters.jobsInProgress
    }
  },
  methods: {
    editJob (id) {
      this.readonly = false
    },
    viewSafetyPlan (jobid, safetyplanid) {
      console.log(jobid, safetyplanid)
      this.$router.push('/dashboard/jobs/' + jobid + '/' + safetyplanid)
    },
    addressMap (address) {
      return 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD7W7NiKKy0qZfRUsslzHOe-Hnkp-IncyU&q=' + address
    }
  }
}
</script>

<style scoped>
  .card-header {
    margin: -20px -20px 20px -20px;
    background-color: rgba(111, 50, 130, 0.86);
    font-size: 1.4rem;
    color: white;
  }

  .card-header.job {
    background-color: rgba(29, 92, 158, 0.89);
    margin: 0;
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
  }

  .card-header.plans {
    background-color: #12807a;
    margin: 0;
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
  }

   .editBtn {
    float: right;
    background-color:rgba(223, 233, 255, 0.83);
    color: black;
  }

  .editBtn:hover {
    background-color:#ffc80b;
    color: black;
  }

  .subheader {
    padding: 15px 0 15px 15px;
    border-bottom: 1px solid lightgrey;
    font-weight: bold;
    color: rgba(29, 92, 158, 0.89);
  }
  
  .siteCard > .card-body {
    padding: 0;
  }
  
  .row {
    margin:auto;
    padding: 0px 10px 10px 0px;
  }
  
  .col {
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

</style>