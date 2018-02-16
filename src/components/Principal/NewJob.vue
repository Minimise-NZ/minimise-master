<template>
  <b-container fluid class="outside-container">
    <b-modal 
      v-model="showModal" 
      v-if="showModal" 
      @ok="route" 
      ok-only 
      centered 
      header-bg-variant="dark"
      headerTextVariant= 'light'
      title="New Job Created">
      <div class="d-block text-center">
        <h4 >{{siteAddress}}</h4>
      </div>
    </b-modal>
    <b-card>
      <div class="card-header">New Job Site</div>
      <div class="scroll-container">
        <b-form @submit.prevent="onSubmit">
          <b-row class="outer-row">
            <b-col m="12" lg="6" class="outer-col">
              <b-row class="input-group search">
                <b-col>
                  <b-input-group>
                    <b-form-input type="text" placeholder="Please enter site address" v-model="siteAddress" required/>
                  </b-input-group>
                </b-col>
              </b-row>
              <b-row class="search mt-0">
                <b-col>
                  <div class="alert alert-danger mt-0" v-if="addressError">Please enter Site Address</div>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12" lg="4">
                  <p>Project Manager:</p>
                </b-col>
                <b-col md="12" lg="7">
                  <b-form-input type="text" v-model="user.name" readonly/>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12" lg="4">
                  <p>Project Manager Phone:</p>
                </b-col>
                <b-col md="12" lg="7">
                  <b-form-input type="text" v-model="user.phone" readonly/>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12" lg="4">
                  <p>HSE Manager:</p>
                </b-col>
                <b-col md="12" lg="7">
                  <b-form-input type="text" v-model="company.hseManager" readonly/>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12" lg="4">
                  <p>HSE Phone:</p>
                </b-col>
                <b-col md="12" lg="7">
                  <b-form-input type="text" v-model="company.hsePhone" readonly/>
                </b-col>
              </b-row>
              <b-row class="input-group search">
                <b-col>
                  <b-input-group>
                     <b-input-group-button>
                        <b-button @click="searchMedical" class="fa fa-search"></b-button>
                      </b-input-group-button>
                    <b-form-input type="text" :placeholder='placeholder' v-model="medical" required></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
              <b-row class="search mt-0">
                <b-col>
                  <div class="alert alert-danger mt-0" v-if="medicalError">You have not entered a medical centre</div>
                </b-col>
              </b-row>
            </b-col>
            <b-col m="12" lg="6" class="map">
              <iframe
              width="100%"
              height="320px"
              frameborder="0" style="border:0"
              :src="mapRoot"  
              allowfullscreen>
              </iframe>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col md="4" lg="6" xl="5">
              <p>Do you have subcontractors?</p>
            </b-col>
            <b-col md="3" lg="4" xl="3">
              <b-form-radio-group
              class="mt-1"
              id="radiocontractor" 
              v-model="contractors.radioValue"
              :options="contractors.radioOptions">
              </b-form-radio-group>
            </b-col>
          </b-row>

          <b-row v-if="showList">
            <b-col lg="9" md="12">
              <v-select
                class="mb-4"
                searchable
                placeholder="Please select your contractors"
                multiple
                required
                :value.sync="contractors.selected"
                :options="contractorList">
              </v-select>
              <div class="alert alert-danger" v-if="contractorError">You have not selected any contractors</div>
            </b-col>
          </b-row>
         
          <hr>
          
          <b-row>
            <b-col md="4" lg="6" xl="5">
              <p>Is there notifiable works associated with this project?</p>
              <b-form-checkbox-group
                class="mt-3 ml-2"
                v-if="showNotifiable"
                stacked 
                v-model="notifiable.selected" 
                name="notifiables" 
                :options="notifiable.list">
              </b-form-checkbox-group>
            </b-col>  
            <b-col md="3" lg="4" xl="3">
              <b-form-radio-group
                class="mt-1"
                id="radioNotifiable" 
                v-model="notifiable.radioValue"
                :options="notifiable.radioOptions">
              </b-form-radio-group>
            </b-col>
          </b-row>
          <b-row class="search mt-0">
            <b-col>
              <div class="alert alert-danger ml-2" v-if="notifiableError">Please select notifiable works</div>
            </b-col>
          </b-row>
          
          <hr>

          <b-row>
            <b-col md="4" lg="6" xl="5">
              <p>Is there any additional information you would like to add?</p>
            </b-col>
            <b-col md="3" lg="4" xl="3">
              <b-form-radio-group
                class="mt-1"
                id="addinfo" 
                v-model="addinfo.radioValue"
                :options="addinfo.radioOptions">
              </b-form-radio-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col xl="12">
              <b-form-textarea 
                v-if="showInfo"
                required
                id="info"
                v-model="addinfo.infotext"
                placeholder="Additional information"
                :rows="6">
            </b-form-textarea>
            </b-col>
          </b-row>
          <div class="text-center">
            <b-button-group class="pt-4 pb-4">
              <b-button class="buttons" variant="success" @click="submit">Submit</b-button>
              <b-button class="buttons" variant="danger" @click="cancel">Cancel</b-button>
            </b-button-group>
          </div>
        </b-form>
      </div>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      placeholder: 'Search for nearby Medical Centre',
      contractors: {
        radioValue: 'yes',
        radioOptions: [
          {text: 'Yes', value: 'yes'},
          {text: 'No', value: 'no'}
        ],
        selected: []
      },
      notifiable: {
        radioValue: 'no',
        radioOptions: [
          {text: 'Yes', value: 'yes'},
          {text: 'No', value: 'no'}
        ],
        list: [
          'Working at heights > 5m',
          'Work in confined spaces',
          'Work in an excavation > 1.5m'
        ],
        selected: []
      },
      addinfo: {
        radioValue: 'no',
        radioOptions: [
          {text: 'Yes', value: 'yes'},
          {text: 'No', value: 'no'}
        ],
        infotext: ''
      },
      selectError: false,
      mapRoot: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD7W7NiKKy0qZfRUsslzHOe-Hnkp-IncyU&q=Christchurch City',
      siteAddress: '',
      medical: '',
      addressError: false,
      medicalError: false,
      contractorError: false,
      notifiableError: false,
      showModal: false
    }
  },
  computed: {
    showList () {
      return (this.contractors.radioValue === 'yes')
    },
    showNotifiable () {
      return (this.notifiable.radioValue === 'yes')
    },
    showInfo () {
      return (this.addinfo.radioValue === 'yes')
    },
    user () {
      return this.$store.getters.user
    },
    contractorList () {
      let list = this.$store.getters.companyIndex
      // remove this user's company name from list
      list.forEach((item, index, object) => {
        if (item.value === this.user.company) {
          object.splice(index, 1)
        }
      })
      return list
    },
    company () {
      return this.$store.getters.company
    },
    subcontractors () {
      var subcontractors = this.contractors.selected.map(contractor => ({
        key: contractor.value
      }))
      return subcontractors
    }
  },
  methods: {
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
      this.$router.go(-1)
    },
    onSubmit (e) {
      if (e.keyCode === 13) {
        return
      } else {
        this.submit()
      }
    },
    submit () {
      if (this.siteAddress === '') {
        this.addressError = true
        return
      } else {
        this.addressError = false
      }
      if (this.medical === '') {
        this.medicalError = true
        return
      } else {
        this.medicalError = false
      }
      if (this.contractors.radioValue === 'yes' && this.contractors.selected <= 0) {
        this.contractorError = true
        return
      } else {
        this.contractorError = false
      }
      if (this.contractors.radioValue === 'no' && this.contractors.selected > 0) {
        this.contractors.selected = []
      }
      if (this.notifiable.radioValue === 'yes' && this.notifiable.selected <= 0) {
        this.notifiableError = true
        return
      } else {
        this.notifiableError = false
      }
      if (this.notifiable.radioValue === 'no' && this.notifiable.selected > 0) {
        this.notifiable.selected = []
      } else {
        this.$store.dispatch('newJob', {
          principalKey: this.user.company,
          principalName: this.company.name,
          pm: this.user.name,
          pmPhone: this.user.phone,
          hse: this.company.hseManager,
          hsePhone: this.company.hsePhone,
          address: this.siteAddress,
          notifiable: this.notifiable.selected,
          info: this.addinfo.infotext,
          subcontractors: this.subcontractors
        })
        .then(() => {
          this.showModal = true
        })
      }
    },
    route () {
      this.$store.dispatch('getJobs')
      this.$router.push('/principal/jobs')
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

  .search {
    margin-left: 2px;
    padding-left: 5px;
    width: 93%;
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

  p {
    margin-top: 5px;
    margin-bottom: 0;
  }

  @media screen and (max-width : 992px) {
    .search {
      width: 100%;
      margin-top: 25px;
      margin-bottom: 20px;
    }
    .map {
      display: none;
    }
  }

</style>


