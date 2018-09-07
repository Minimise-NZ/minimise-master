<template>
  <b-container fluid>
    <!--JOBSITE CARD-->
    <b-card>
      <b-row class="card-header" >
        <b-col>
          <header>Jobs In Progress</header>
        </b-col>
        <b-col>
         <b-button  
          class="addBtn"
          variant="success"
          @click="newJob" 
          v-b-tooltip.hover title="Create New Job Site">
          <i class="fa fa-plus"></i>
        </b-button> 
        </b-col>
      </b-row>
      <div class="scroll-container">
        <b-row v-if="jobSites.length === 0">
          <b-col>
            <header class="subheader" style="color: #383838">You currently have no jobs in progress</header>
          </b-col>
        </b-row>  
        <b-card
          v-for="(obj, index) in jobSites"
          :key="index"
          class="siteCard mt-2 mb-4">
          <div class="text-left card-header job">{{obj.job.address}}</div>

          <b-form @submit.prevent="onSubmit">
            <b-row class="outer-row">
              <!--SITE INFORMATION COLUMN-->
              <b-col sm="12" lg="8" class="outer-col" style="padding-top: 20px; padding-right: 20px">
                <b-row>
                  <b-col md="12" lg="3">
                    <label>Supervisor:</label>
                  </b-col>
                  <b-col>
                    <b-input-group>
                      <b-form-input type="text" v-model="obj.job.supervisorName" readonly/>
                    </b-input-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12" lg="3">
                    <label>Supervisor Phone:</label>
                  </b-col>
                  <b-col>
                    <b-form-input type="text" :value="obj.job.supervisorPhone" readonly/>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12" lg="3" style="margin-bottom: 10px">
                    <label>Medical Centre:</label>
                  </b-col>
                  <b-col>
                    <b-form-input type="text" :value="obj.job.medical" readonly/>
                  </b-col>
                </b-row>
                <b-row >
                  <b-col md="12" lg="3" style="margin-bottom: 10px">
                    <label>First Aiders:</label>
                  </b-col>
                  <b-col v-for="(name, index) in obj.job.firstAiders" :key="index">
                    <b-form-input type="text" :value="name" readonly/>
                  </b-col>
                </b-row>

                <b-row style="padding-bottom: 0">
                  <b-col md="0" lg="3"></b-col>
                  <b-col sm="12" lg="9">
                    <b-row v-if="obj.job.notifiableurl === ''">
                      <b-col class="outer-col" sm="10">
                        <b-form-file v-model="notifiablefile" placeholder="Worksafe Notification"></b-form-file>
                      </b-col>
                      <b-col sm="1">
                        <b-btn variant="primary" v-if="notifiablefile !== ''" @click="uploadFile(obj.job, 'notifiable')" v-b-tooltip.hover title="Upload file">
                          <i class="fa fa-cloud-upload-alt"></i>
                        </b-btn>
                      </b-col>
                    </b-row>
                    <b-row v-else style="margin-left: 0; padding-left: 5px">
                      <a target="_blank" :href="obj.job.notifiableurl">Worksafe Notification</a>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row v-if="obj.job.environmental === 'true'" style="padding-bottom: 0">
                  <b-col md="0" lg="3"></b-col>
                  <b-col sm="12" lg="9">
                    <b-row v-if="obj.job.environmentalurl === ''">
                      <b-col class="outer-col" sm="10">
                        <b-form-file v-model="environmentalfile" placeholder="Environmental Plan"></b-form-file>
                      </b-col>
                      <b-col sm="1">
                        <b-btn variant="primary" v-if="environmentalfile !== ''" @click="uploadFile(obj.job, 'environmental')" v-b-tooltip.hover title="Upload file">
                          <i class="fa fa-cloud-upload-alt"></i>
                        </b-btn>
                      </b-col>
                    </b-row>
                    <b-row v-else style="margin-left: 0; padding-left: 5px">
                      <a target="_blank" :href="obj.job.environmentalurl">Environmental Plan</a>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row v-if="obj.job.resource === 'true'" style="padding-bottom: 0">
                 <b-col md="0" lg="3"></b-col>
                 <b-col sm="12" lg="9">
                    <b-row v-if="obj.job.resourceurl === ''">
                      <b-col sm="10" class="outer-col">
                        <b-form-file v-model="resourcefile" placeholder="Resource Consent"></b-form-file>
                      </b-col>
                      <b-col sm="1">
                        <b-btn variant="primary" v-if="resourcefile !== ''" @click="uploadFile(obj.job, 'resource')" v-b-tooltip.hover title="Upload file" >
                          <i class="fa fa-cloud-upload-alt"></i>
                        </b-btn>
                      </b-col>
                    </b-row>
                    <b-row v-else style="margin-left: 0; padding-left: 5px">
                      <a target="_blank" :href="obj.job.resourceurl">Resource Consent</a>
                    </b-row>
                 </b-col>
                </b-row>
                <b-row v-if="obj.job.nzhpt === 'true'" style="padding-bottom: 0">
                 <b-col md="0" lg="3"></b-col>
                 <b-col sm="12" lg="9">
                    <b-row v-if="obj.job.nzhpturl === ''">
                      <b-col sm="10" class="outer-col">
                        <b-form-file v-model="nzhptfile" placeholder="NZHPT Clearance"></b-form-file>
                      </b-col>
                      <b-col sm="1">
                        <b-btn variant="primary" v-if="nzhptfile !== ''" @click="uploadFile(obj.job, 'nzhpt')" v-b-tooltip.hover title="Upload file">
                          <i class="fa fa-cloud-upload-alt"></i>
                        </b-btn>
                      </b-col>
                    </b-row>
                    <b-row v-else style="margin-left: 0; padding-left: 5px">
                      <a target="_blank" :href="obj.job.nzhpturl">NZHPT Clearance</a>
                    </b-row>
                 </b-col>
                </b-row>

                <b-row class="mb-0 pb-0">
                  <b-col md="12" lg="3">
                    <label>Site Safety Plan:</label>
                  </b-col>
                  <b-col sm="12" lg="9">
                    <router-link v-on:click.native="setSafetyPlan(obj.job)" to='/dashboard/jobs/safetyplan/' class="ml-2">SSSP - {{obj.job.address}}</router-link >
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
              <b-col class="outer-col" style="padding-top: 20px; padding-right: 20px">
                <hr><h5>Site Documents</h5><hr style="margin-bottom: 10px">
                <b-row v-for="(item, index) in obj.job.docs" :key="index">
                  <a target="_blank" :href="item.url" class="ml-2">{{item.name}}</a>
                </b-row>
                <div class="uploadInput">
                  <b-row>
                    <b-col class="pl-0" sm="10" lg="11">
                      <b-form-file v-model="docsfile" placeholder="Add new document..."></b-form-file>
                    </b-col>
                    <b-col sm="1" class="pl-0">
                      <b-btn variant="primary" v-if="docsfile !== ''" @click="uploadFile(obj.job, 'docs')" v-b-tooltip.hover title="Upload file">
                        <i class="fas fa-cloud-upload-alt"></i>
                      </b-btn>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-btn variant="success" v-b-tooltip.hover title="Sign In" @click="signIn"><i class="fas fa-pen-alt fa-lg"></i></b-btn>
                    <b-btn variant="primary" v-b-tooltip.hover title="New Toolbox Talk" @click="newToolbox(obj.job.id)"><i class="fas fa-toolbox fa-lg"></i></b-btn>
                    <b-btn style="background-color: #673ab7" v-b-tooltip.hover title="New Site Inspection" @click="newInspection(obj.job.id)"><i class="far fa-eye fa-lg"></i></b-btn>
                    <b-btn variant="danger" @click="confirmAction = true, jobToClose = obj.job.id" v-b-tooltip.hover title="Close Job">
                      <i class="fas fa-times-circle fa-lg"></i>
                    </b-btn>
                  </b-row>
                </div>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </div>
    </b-card>
  </b-container>  
</template>

<script>
import JobView from '@/components/Components/JobView.vue'
export default {
  components: {
    'jobView': JobView
  },
  data () {
    return {
    }
  },
  computed: {
    jobSites () {
      return this.$store.getters.jobsInProgress
    }
  },
  methods: {
    setSafetyPlan (job) {
      this.$store.dispatch('storeSafetyPlan', job)
    },
    toolBoxLink (jobKey) {
      this.$store.dispatch('getToolbox', jobKey)
      .then((toolbox) => {
        return toolbox.jobKey
      })
    },
    newJob () {
      this.$router.push('/dashboard/newJob')
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