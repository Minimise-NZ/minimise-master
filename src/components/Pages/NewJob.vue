<template>
  <b-container fluid>
    <!--MODALS-->
    <b-modal 
      v-model="successModal" 
      v-if="successModal" 
      @ok="route" 
      ok-only
      header-bg-variant="success"
      headerTextVariant= 'light'
      title="Success!">
      <div class="d-block text-center">
        <h4>Job site: {{siteAddress}} has been created</h4>
      </div>
    </b-modal>

    <b-modal
      v-model="errorModal" 
      v-if="errorModal" 
      ok-only
      header-bg-variant="danger"
      headerTextVariant= 'light'
      title="Oops..">
      <div class="d-block text-center">
        <h4>{{errorMessage}}</h4>
      </div>
    </b-modal>

    <b-card header="New Job Site" header-tag="header">
      <div class="scroll-container">
        <b-form @submit.prevent="onSubmit">
          <!--JOB SITE GENERAL-->
          <div>
            <b-row>
              <!-- input column -->
              <b-col>
                <!--address row-->
                <b-row id="address">
                  <b-col sm="12" md="4">
                    <label>Site Address:</label>
                  </b-col>
                  <b-col>
                    <b-input-group>
                      <b-form-input type="text" placeholder="Please enter site address" v-model="siteAddress" required/>
                    </b-input-group>
                    <div class="alert alert-danger" v-if="addressError">Please enter site address</div>
                  </b-col>
                </b-row>
                <!--supervisor row-->
                <b-row>
                  <b-col sm="12" md="4">
                    <label>Supervisor:</label>
                  </b-col>
                  <b-col>
                    <b-form-select
                      v-validate="'required'"
                      v-model="supervisorIndex"
                      :options="supervisorList"   
                      :class="{'alert-border': supervisorError}">
                    </b-form-select>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="12" md="4">
                    <label>Supervisor Phone:</label>
                  </b-col>
                  <b-col>
                    <b-form-input type="text" :value="supervisorPhone" disabled/>
                  </b-col>
                </b-row>
                <!--medical centre row-->
                <b-row id="medical">
                  <b-col sm="12" md="4">
                    <label>Medical Centre:</label>
                  </b-col>
                  <b-col>
                    <b-input-group>
                      <b-input-group-button>
                          <b-button @click="searchMedical" v-b-tooltip.hover title="Find nearest medical centre">
                            <i class="fas fa-search"></i></b-button>
                        </b-input-group-button>
                      <b-form-input type="text" :placeholder='placeholder' v-model="medical" required></b-form-input>
                    </b-input-group>
                    <div class="alert alert-danger" v-if="medicalError">Please enter medical centre</div>
                  </b-col>
                </b-row>
              </b-col>

              <!--map column-->
              <b-col m="12" lg="5" class="map">
                <iframe
                width="100%"
                height="300px"
                frameborder="0" style="border:0"
                :src="mapRoot"  
                allowfullscreen>
                </iframe>
              </b-col>
            </b-row>
          </div>
          <!--SITE DOCUMENTS-->
          <div>
            <hr>
              <h5>Site Documents</h5>
            <hr>
            <b-row>
              <b-col sm="7" lg="5">
                <label>Is there notifiable works associated with this project?</label>
              </b-col>  
              <b-col>
                <b-form-radio-group
                  :disabled="notifiable.disabled"
                  class="mt-1"
                  v-model="notifiable.radioValue"
                  :options="radioOptions">
                </b-form-radio-group>
              </b-col>
              <b-col sm="12" lg="5">
                <b-row v-if="notifiable.radioValue === 'true' && notifiable.url === ''" class="pt-0 pb-0">
                <b-col sclass="pl-0">
                  <b-form-file v-model="notifiable.file" placeholder="Choose a file..." :disabled="notifiable.disabled"></b-form-file>
                </b-col>
                <b-col sm="1">
                  <b-btn v-if="notifiable.file !== ''" @click="uploadFile('notifiable')" v-b-tooltip.hover title="Upload file">
                    <i class="fas fa-cloud-upload-alt"></i>
                  </b-btn>
                </b-col>
              </b-row>
              <b-row v-if="notifiable.radioValue === 'true' && notifiable.url !== ''" class="pt-0">
                <a target="_blank" :href="notifiable.url">Worksafe Notification</a>
              </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="7" lg="5">
                <label>Is an environmental plan required?</label>
              </b-col>  
              <b-col>
                <b-form-radio-group
                  :disabled="environmental.disabled"
                  class="mt-1"
                  v-model="environmental.radioValue"
                  :options="radioOptions">
                </b-form-radio-group>
              </b-col>
              <b-col sm="12" lg="5">
                <b-row v-if="environmental.radioValue === 'true' && environmental.url === ''" class="pt-0 pb-0">
                <b-col class="pl-0">
                  <b-form-file v-model="environmental.file" placeholder="Choose a file..." :disabled="environmental.disabled"></b-form-file>
                </b-col>
                <b-col sm="1">
                  <b-btn v-if="environmental.file !== ''" @click="uploadFile('environmental')" v-b-tooltip.hover title="Upload file">
                    <i class="fas fa-cloud-upload-alt"></i>
                  </b-btn>
                </b-col>
              </b-row>
              <b-row v-if="environmental.radioValue === 'true' && environmental.url !== ''" class="pt-0">
                <a target="_blank" :href="environmental.url">Environmental Plan</a>
              </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="7" lg="5">
                <label>Is resource consent required?</label>
              </b-col>  
              <b-col>
                <b-form-radio-group
                  :disabled="resource.disabled"
                  class="mt-1"
                  v-model="resource.radioValue"
                  :options="radioOptions">
                </b-form-radio-group>
              </b-col>
              <b-col sm="12" lg="5">
                <b-row v-if="resource.radioValue === 'true' && resource.url === ''" class="pt-0 pb-0">
                <b-col class="pl-0">
                  <b-form-file v-model="resource.file" placeholder="Choose a file..." :disabled="resource.disabled"></b-form-file>
                </b-col>
                <b-col sm="1">
                  <b-btn v-if="resource.file !== ''" @click="uploadFile('resource')" v-b-tooltip.hover title="Upload file">
                    <i class="fas fa-cloud-upload-alt"></i>
                  </b-btn>
                </b-col>
                </b-row>
                <b-row v-if="resource.radioValue === 'true' && resource.url !== ''" class="pt-0">
                  <a target="_blank" :href="resource.url">Resource Consent</a>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="7" lg="5">
                <label>Is NZHPT clearance required?</label>
              </b-col>  
              <b-col>
                <b-form-radio-group
                  :disabled="nzhpt.disabled"
                  class="mt-1"
                  v-model="nzhpt.radioValue"
                  :options="radioOptions">
                </b-form-radio-group>
              </b-col>
              <b-col sm="12" lg="5">
                <b-row v-if="nzhpt.radioValue === 'true' && nzhpt.url === ''" class="pt-0 pb-0">
                <b-col class="pl-0">
                  <b-form-file v-model="nzhpt.file" placeholder="Choose a file..." :disabled="nzhpt.disabled"></b-form-file>
                </b-col>
                <b-col sm="1">
                  <b-btn v-if="nzhpt.file !== ''" @click="uploadFile('nzhpt')" v-b-tooltip.hover title="Upload file">
                    <i class="fas fa-cloud-upload-alt"></i>
                  </b-btn>
                </b-col>
                </b-row>
                <b-row v-if="nzhpt.radioValue === 'true' && nzhpt.url !== ''" class="pt-0">
                  <a target="_blank" :href="nzhpt.url">NZHPT clearance</a>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" lg="7">
                <label>Additional documents:</label>
                <b-row v-for="(item, index) in docs.urls" :key="index">
                  <a target="_blank" :href="item.url" class="ml-2">{{item.name}}</a>
                </b-row>
              </b-col> 
              <b-col sm="12" lg="5"  class="additional">
              <b-row class="pt-0">
                <b-col class="pl-0">
                  <b-form-file v-model="docs.files" placeholder="Choose files..." multiple></b-form-file>
                </b-col>
                <b-col sm="1" >
                  <b-btn v-if="docs.files.length > 0" @click="uploadFile('docs')" v-b-tooltip.hover title="Upload file">
                    <i class="fas fa-cloud-upload-alt"></i>
                  </b-btn>
                </b-col>
              </b-row>
              </b-col>
            </b-row>
          </div>
          <!--EMERGENCY PLAN-->
          <div>
            <hr><h5>Emergency Information</h5><hr>
            <b-row >
              <b-col sm="12" md="5" lg="4" class="mb-0">
                <label>First Aiders</label>
              </b-col>
              <b-col sm="12" md="7">
                <b-row v-for="name in firstAiders" :key="name" class="pt-1 mt-0 firstaiders">
                  <b-form-input :value="name" readonly></b-form-input>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" md="5" lg="4">
                <label>First Aid Kit Location</label>
              </b-col>
              <b-col md="7">
                <b-form-input v-model="firstAidKit"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" md="5" lg="4">
                <label>Fire Extinguisher Location</label>
              </b-col>
              <b-col md="7">
                <b-form-input v-model="fireExtinguisher"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="pb-0">
              <b-col sm="12" md="5" lg="4">
                <label>Emergency Plan</label>
              </b-col>
              <b-col>
                <b-row v-if="emergencyPlanURL === ''" class="pl-3 mt-0 pt-0">
                  <b-col sm="11" md="11" lg="10">
                    <b-form-file v-model="emergencyPlanFile" placeholder="Choose a file..."></b-form-file>
                  </b-col>
                  <b-col sm="1" class="pl-0">
                    <b-btn v-if="emergencyPlanFile !== ''" @click="uploadFile('emergencyPlan')" v-b-tooltip.hover title="Upload file">
                      <i class="fas fa-cloud-upload-alt"></i>
                    </b-btn>
                  </b-col>
                </b-row>
                <b-row v-if="emergencyPlanURL !== ''" class="pt-0">
                  <a target="_blank" :href="emergencyPlanURL">Emergency Plan</a>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" lg="11">
                <b-form-textarea placeholder="Additional emergency info" rows="3" v-model="emergencyInfo"></b-form-textarea>
              </b-col>
            </b-row>
          </div>
          <!--SAFETY PLANNING AND COMMUNICATION-->
          <div>
            <hr><h5>Safety Planning and Communication</h5><hr>
            <b-row>
              <b-col sm="12" lg="4">
                <label>Safety Plan Review</label>
              </b-col>
              <b-col class="textbox" lg="7">
                <b-form-textarea value="Workers must review safety plan before commencing work on job site" readonly rows="2"></b-form-textarea>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" lg="4">
                <label>Task Analyis Required</label>
              </b-col>
              <b-col lg="7">
                <b-form-select :options="taskSelect" v-model="task"></b-form-select>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" lg="4">
                <label>Site Inspection Frequency</label>
              </b-col>
              <b-col lg="7">
                <b-form-select :options="frequencyOptions" v-model="inspectionFrequency"></b-form-select>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" lg="4">
                <label>Toolbox Talk Frequency</label>
              </b-col>
              <b-col lg="7">
                <b-form-select :options="frequencyOptions" v-model="toolboxFrequency"></b-form-select>
              </b-col>
            </b-row>
          </div>
          <!--SUBCONTRACTOR MANAGEMENT
          <div>
            <hr><h5>Subcontractor Management</h5><hr>
          </div>
          -->
          <!--ADDITIONAL INFORMATION-->
          <div>
            <hr><h5>Additional Information</h5><hr>
             <b-row>
              <b-col sm="12" lg="11">
                <b-form-textarea placeholder="Additional site information" rows="3" v-model="additionalInfo"></b-form-textarea>
              </b-col>
            </b-row>
          </div>     

          <div class="text-center">
            <b-button-group class="pt-4 pb-4">
              <b-button class="buttons" variant="success" @click="submit" :disabled="loading===true">
                <p style="font-size: 1em; margin-bottom: 0" v-if="loading===false">Submit</p>
                <div class="loader">
                  <pulse-loader :loading="loading" ></pulse-loader>
                </div>
              </b-button>
              <b-button class="buttons" variant="danger" @click="cancel" :disabled="loading===true">Cancel</b-button>
            </b-button-group>
          </div>
        </b-form>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  components: {
    PulseLoader
  },
  data () {
    return {
      loading: false,
      placeholder: 'Search for nearby Medical Centre',
      mapRoot: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD7W7NiKKy0qZfRUsslzHOe-Hnkp-IncyU&q=Christchurch City',
      siteAddress: '',
      supervisorIndex: 0,
      medical: '',
      radioOptions: [
        {text: 'Yes', value: 'true'},
        {text: 'No', value: 'false'}
      ],
      frequencyOptions: [
        {value: 60 * 60 * 24, text: 'Daily'},
        {value: 60 * 60 * 24 * 7, text: 'Weekly'},
        {value: 60 * 60 * 24 * 30, text: 'Monthly'},
        {value: null, text: 'As required'}
      ],
      notifiable: {
        radioValue: 'false',
        file: '',
        url: '',
        disabled: false
      },
      environmental: {
        radioValue: 'false',
        file: '',
        url: '',
        disabled: false
      },
      resource: {
        radioValue: 'false',
        file: '',
        url: '',
        disabled: false
      },
      nzhpt: {
        radioValue: 'false',
        file: '',
        url: '',
        disabled: false
      },
      docs: {
        radioValue: 'false',
        files: [],
        urls: []
      },
      firstAiders: ['Name one', 'Name 2'],
      firstAidKit: 'On Site and in vehicles',
      fireExtinguisher: 'On Site and in vehicles',
      emergencyPlanURL: '',
      emergencyPlanFile: '',
      emergencyInfo: '',
      task: null,
      toolboxFrequency: 60 * 60 * 24,
      inspectionFrequency: 60 * 60 * 24 * 7,
      additionalInfo: '',
      addressError: false,
      supervisorError: false,
      medicalError: false,
      successModal: false,
      errorModal: false,
      errorMessage: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    company () {
      return this.$store.getters.company
    },
    supervisors () {
      return this.$store.getters.supervisors
    },
    supervisorList () {
      let supervisorList = []
      let list = this.supervisors
      list.forEach((item, index, object) => {
        supervisorList.push({
          value: index, text: item.name
        })
      })
      return supervisorList
    },
    supervisorKey () {
      return this.supervisors[this.supervisorIndex].key
    },
    supervisorName () {
      if (this.supervisorIndex !== null) {
        return this.supervisors[this.supervisorIndex].name
      } else {
        return ''
      }
    },
    supervisorPhone () {
      if (this.supervisorIndex !== null) {
        return this.supervisors[this.supervisorIndex].phone
      } else {
        return ''
      }
    },
    taskSelect () {
      let options = [{value: null, text: 'None'}]
      let tasks = this.$store.getters.taskAnalysis
      tasks.forEach((item, index, object) => {
        options.push({
          value: index, text: item.title
        })
      })
      return options
    }
  },
  methods: {
    async uploadFile (type) {
      this.loading = true
      try {
        switch (type) {
          case 'notifiable':
            console.log('uploading notifiable')
            this.notifiable.url = await this.$store.dispatch('uploadFile', {file: this.notifiable.file, type: 'notifiable'})
            this.notifiable.disabled = true
            this.notifiable.file = ''
            this.loading = false
            break
          case 'environmental':
            console.log('uploading environmental')
            this.environmental.url = await this.$store.dispatch('uploadFile', {file: this.environmental.file, type: 'environmental'})
            this.environmental.disabled = true
            this.environmental.file = ''
            this.loading = false
            break
          case 'resource':
            console.log('uploading resource')
            this.resource.url = await this.$store.dispatch('uploadFile', {file: this.resource.file, type: 'resource'})
            this.resource.disabled = true
            this.resource.file = ''
            this.loading = false
            break
          case 'nzhpt':
            console.log('uploading nzhpt')
            this.nzhpt.url = await this.$store.dispatch('uploadFile', {file: this.nzhpt.file, type: 'nzhpt'})
            this.nzhpt.disabled = true
            this.nzhpt.file = ''
            this.loading = false
            break
          case 'emergencyPlan':
            console.log('uploading emergencyPlan')
            this.emergencyPlanURL = await this.$store.dispatch('uploadFile', {file: this.emergencyPlanFile, type: 'emergencyPlan'})
            this.emergencyPlanFile = ''
            this.loading = false
            break
          case 'docs':
            console.log(this.docs.files)
            this.docs.files.forEach((file) => {
              console.log(file)
              this.$store.dispatch('uploadFile', {file: file, type: file.name})
              .then(url => {
                this.docs.urls.push({url: url, name: file.name})
              })
            })
            this.docs.files = []
            this.loading = false
            break
        }
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    },
    searchMedical () {
      this.addressError = false
      if (this.siteAddress === '') {
        this.addressError = true
      } else {
        this.mapRoot = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD7W7NiKKy0qZfRUsslzHOe-Hnkp-IncyU&q=' + this.siteAddress + 'medical center'
        this.placeholder = 'Please enter name and address of Medical Centre'
      }
    },
    cancel () {
      this.$router.push('/dashboard')
    },
    onSubmit (e) {
      if (e.keyCode === 13) {
        return
      } else {
        this.submit()
      }
    },
    submit () {
      this.loading = true
      if (this.siteAddress === '') {
        this.addressError = true
        document.getElementById('address').scrollIntoView()
        this.loading = false
        return
      } else {
        this.addressError = false
      }
      if (this.medical === '') {
        this.medicalError = true
        document.getElementById('medical').scrollIntoView()
        this.loading = false
        return
      } else {
        this.medicalError = false
      }
      if (this.notifiable.radioValue === 'true' && this.notifiable.selected <= 0) {
        this.notifiableError = true
        this.loading = false
        return
      } else {
        this.notifiableError = false
      }
      if (this.notifiable.radioValue === 'false' && this.notifiable.selected > 0) {
        this.notifiable.selected = []
      }
      if (this.notifiable.file !== '' || this.environmental.file !== '' || this.resource.file !== '' || this.docs.files.length > 0) {
        this.errorMessage = 'You have files to be uploaded. Please upload files before saving'
        this.errorModal = true
        this.loading = false
        return
      } else {
        this.$store.dispatch('newJob', {
          address: this.siteAddress,
          medical: this.medical,
          companyKey: this.user.companyKey,
          companyName: this.company.name,
          supervisorKey: this.supervisorKey,
          supervisorName: this.supervisorName,
          supervisorPhone: this.supervisorPhone,
          notifiable: this.notifiable.radioValue,
          notifiableurl: this.notifiable.url,
          environmental: this.environmental.radioValue,
          environmentalurl: this.environmental.url,
          resource: this.resource.radioValue,
          resourceurl: this.resource.url,
          nzhpt: this.nzhpt.radioValue,
          nzhpturl: this.nzhpt.url,
          docs: this.docs.urls,
          firstAiders: this.firstAiders,
          firstAidKit: this.firstAidKit,
          fireExtinguisher: this.fireExtinguisher,
          emergencyPlanURL: this.emergencyPlanURL,
          emergencyInfo: this.emergencyInfo,
          task: this.task,
          toolboxFrequency: this.toolboxFrequency,
          inspectionFrequency: this.inspectionFrequency,
          additionalInfo: this.additionalInfo
        })
        .then(() => {
          this.loading = false
          this.successModal = true
        })
        .catch((error) => {
          this.loading = false
          this.errorMessage = error.message
          this.errorModal = true
        })
      }
    },
    route () {
      this.$router.push('/dashboard/jobs')
    }
  }
}
</script>

<style scoped>
   .container-fluid {
    padding-top: 20px;
    padding-right: 20px;
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

  .scroll-container {
    height: 80vh;
    overflow-y: scroll;
    margin-top: 10px;
    padding-right: 10px;
  }
  
  hr {
    background-color: #12807ad4;  
    margin-right: 20px;
  }

  .row {
    padding: 10px;
  }

  .col {
    padding: 0;
    margin: 0;
  }

  .map {
    height: 300px;
  }

  .btn-group {
    align-items: center;
    width: 40%;
  }

  .btn-secondary {
    background-color: #3366cc;
    cursor:pointer;
  }

  .buttons {
    cursor: pointer;
    margin: 20px;
    width: 50%;
  }

  .alert-danger {
    margin-top:10px;
    padding: 5px;
    font-size: 0.9em;
  }

  .alert-border {
    border: 1px solid salmon;
  }

  label {
    margin-top: 5px;
    margin-bottom: 10px;
  }

  h5 {
    font-size: 1.2em;
    color: #12807a;
    font-weight: bold;
    margin-left: 5px;
  }

  :disabled {
    cursor: not-allowed;
  }

  .col-sm-1 {
    padding-left: 5px;
  }

  @media screen and (max-width: 768px) {
    label {
      padding-bottom: 5px;
    }
    .scroll-container {
      padding-left: 10px;
      padding-right: 20px;
    }
    [class*='col-'] {
      padding-left: 5px;
    }
    .row {
      margin-top: 5px;
      padding-bottom: 0px;
    }
  }

  @media screen and (max-width : 992px) {
    .map {
      display: none;
    }
    .firstaiders {
      padding-left: 15px;
    }
    .textbox {
      padding-left: 15px;
    }
  }

  @media screen and (min-width: 992px) {
    .firstaiders {
      padding-left: 15px;
    }
    .textbox {
      padding-left: 15px;
    }
  }

</style>


