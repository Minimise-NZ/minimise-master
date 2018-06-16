<template>
  <b-container fluid class="outside-container">
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
        <h4 >Job site: {{siteAddress}} has been created</h4>
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

    <b-card>
      <div class="card-header">New Job Site</div>
      <div class="scroll-container">
        <b-form @submit.prevent="onSubmit">
          <b-row class="outer-row">

            <!-- input column -->
            <b-col m="12" lg="7" class="outer-col" style="padding-top: 20px; padding-right: 20px">
              <!--address row-->
               <b-row>
                <b-col md="12" lg="3">
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
                <b-col md="12" lg="3">
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
                <b-col md="12" lg="3">
                  <label>Supervisor Phone:</label>
                </b-col>
                <b-col>
                  <b-form-input type="text" :value="supervisorPhone"/>
                </b-col>
              </b-row>
              <!--medical centre row-->
              <b-row>
                <b-col md="12" lg="3">
                  <label>Medical Centre:</label>
                </b-col>
                <b-col>
                  <b-input-group>
                     <b-input-group-button>
                        <b-button @click="searchMedical" class="fa fa-search"></b-button>
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
          <hr>
          
          <!--checkbox rows-->
          <b-row>
            <b-col md="4" lg="6" xl="5">
              <label>Is there notifiable works associated with this project?</label>
              <b-form-checkbox-group
                class="mt-3 ml-2"
                v-if="showNotifiable"
                stacked 
                v-model="notifiable.selected" 
                name="notifiables" 
                :options="notifiable.list">
              </b-form-checkbox-group>
            </b-col>  
            <b-col md="3" lg="4" xl="2">
              <b-form-radio-group
                class="mt-1"
                id="radioNotifiable" 
                v-model="notifiable.radioValue"
                :options="notifiable.radioOptions">
              </b-form-radio-group>
            </b-col>
            <b-col v-if="notifiable.radioValue === 'true'">
              <!--FILE UPLOAD COMPONENT-->
            </b-col>
          </b-row>
          <b-row class="search mt-0">
            <b-col>
              <div class="alert alert-danger ml-2" v-if="notifiableError">Please select notifiable works</div>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4" lg="6" xl="5">
              <label>Is an environmental plan required?</label>
            </b-col>  
            <b-col md="3" lg="4" xl="2">
              <b-form-radio-group
                class="mt-1"
                id="radioEnvironment" 
                v-model="environmental.radioValue"
                :options="environmental.radioOptions">
              </b-form-radio-group>
            </b-col>
            <b-col v-if="environmental.radioValue === 'true'">
               <!--FILE UPLOAD COMPONENT-->
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4" lg="6" xl="5">
              <label>Is a resource consent required?</label>
            </b-col>  
            <b-col md="3" lg="4" xl="2">
              <b-form-radio-group
                class="mt-1"
                id="radioResource" 
                v-model="resource.radioValue"
                :options="resource.radioOptions">
              </b-form-radio-group>
            </b-col>
            <b-col v-if="resource.radioValue === 'true'">
               <!--FILE UPLOAD COMPONENT-->
            </b-col>
          </b-row>
          
          <hr>

          <div class="text-center">
            <b-button-group class="pt-4 pb-4">
              <b-button class="buttons" variant="success" @click="submit">
                <p style="font-size: 1rem; margin-bottom: 0" v-if="loading===false">Submit</p>
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
      notifiable: {
        radioValue: 'false',
        radioOptions: [
          {text: 'Yes', value: 'true'},
          {text: 'No', value: 'false'}
        ],
        list: [
          'Working at heights > 5m',
          'Work in confined spaces',
          'Work in an excavation > 1.5m'
        ],
        selected: []
      },
      environmental: {
        radioValue: 'false',
        radioOptions: [
          {text: 'Yes', value: 'true'},
          {text: 'No', value: 'false'}
        ]
      },
      resource: {
        radioValue: 'false',
        radioOptions: [
          {text: 'Yes', value: 'true'},
          {text: 'No', value: 'false'}
        ]
      },
      notifiableFile: '',
      environmentalFile: '',
      resourceFile: '',
      selectError: false,
      mapRoot: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD7W7NiKKy0qZfRUsslzHOe-Hnkp-IncyU&q=Christchurch City',
      siteAddress: '',
      supervisorIndex: 0,
      medical: '',
      addressError: false,
      supervisorError: false,
      medicalError: false,
      notifiableError: false,
      successModal: false,
      errorModal: false,
      errorMessage: ''
    }
  },
  computed: {
    showNotifiable () {
      return (this.notifiable.radioValue === 'true')
    },
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
    }
  },
  methods: {
    async uploadFile (file, type) {
      let url = await this.$store.dispatch('uploadFile', {file: file, type: type, address: this.address})
      console.log(url)
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
      this.siteAddress = ''
      this.supervisorIndex = 0
      this.notifiable.radioValue = 'false'
      this.notifiable.selected = []
      this.notifiableFile = ''
      this.environmental.radioValue = 'false'
      this.environmentalFile = ''
      this.resource.radioValue = 'false'
      this.resourceFile = ''
      this.medical = ''
      this.addressError = false
      this.supervisorError = false
      this.medicalError = false
      this.notifiableError = false
      this.selectError = false
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
        this.loading = false
        return
      } else {
        this.addressError = false
      }
      if (this.medical === '') {
        this.medicalError = true
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
      } else {
        this.$store.dispatch('newJob', {
          companyKey: this.user.companyKey,
          companyName: this.company.name,
          supervisorKey: this.supervisorKey,
          supervisorName: this.supervisorName,
          supervisorPhone: this.supervisorPhone,
          address: this.siteAddress,
          notifiable: this.notifiable.selected,
          notifiableFile: this.notifiableFile,
          environmental: this.environmental.radioValue,
          environmentalFile: this.environmentalFile,
          resource: this.resource.radioValue,
          resourceFile: this.resourceFile,
          medical: this.medical
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

  hr {
    background-color: #12807ad4;  
    margin-right: 20px;
  }
  .card {
    margin-bottom: 10px;
  }

  .card-header {
    margin: -20px -20px 0px -20px;
    background-color: #12807a;
    font-size: 1.4rem;
    color: white;
  }
  
  .row {
    padding: 10px 10px 10px 10px;
  }

  .col {
    padding: 0;
    margin: 0;
  }

  .outer-row, .outer-col {
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
    font-size: 0.9rem;
  }

  .alert-border {
    border: 1px solid salmon;
  }

  label {
    margin-top: 5px;
    margin-bottom: 0;
  }

  @media screen and (max-width : 992px) {
    .map {
      display: none;
    }
  }

</style>


