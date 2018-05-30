<template>
  <b-container fluid class="outside-container">
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
          <p>This will prevent any further activity on this job site</p>
          <p>This action cannot be undone</p>
        </div>
      </b-modal>
      <b-modal 
        v-model="success" 
        v-if="success"
        ok-only
        @ok="route" 
        centered 
        header-bg-variant="primary"
        headerTextVariant= 'light'
        title="Success">
        <div class="d-block text-center">
          <h4 class="mt-2">{{job.address}}</h4>
          <p>This job has been updated</p>
        </div>
      </b-modal>
    <b-card>
      <div class="card-header jobDetails">{{headerText}}</div>
        <div class="scroll-container">
        <b-form @submit.prevent="saveJob" class="mt-3">
          <b-row class="outer-row">
            <b-col m="12" lg="6" class="outer-col">
              <b-row class="inner-row">
                <b-col md="6" lg="4">
                  <p>Site Address:</p>
                </b-col>
                <b-col md="6" lg="7">
                  <b-form-input type="text" :value="job.address" readonly/>
                </b-col>
              </b-row>
              <b-row class="inner-row">
                <b-col md="6" lg="4">
                  <p>Project Manager:</p>
                </b-col>
                <b-col md="6" lg="7">
                  <!--
                  <v-select
                    class="mb-4"
                    searchable
                    required
                    :value.sync="jobSite.pm"
                    :options="projectManagers">
                  </v-select>
                  -->
                  <b-form-input type="text" :value="job.pm" readonly/>
                </b-col>
              </b-row>
              <b-row class="inner-row">
                <b-col md="6" lg="4">
                  <p>Project Manager Phone:</p>
                </b-col>
                <b-col md="6" lg="7">
                  <b-form-input type="text" :value="job.pmPhone" readonly/>
                </b-col>
              </b-row>
              <b-row class="inner-row">
                <b-col md="6" lg="4">
                  <p>HSE Manager:</p>
                </b-col>
                <b-col md="6" lg="7">
                  <b-form-input type="text" :value="job.hse" readonly/>
                </b-col>
              </b-row>
              <b-row class="inner-row">
                <b-col md="6" lg="4">
                  <p>HSE Phone:</p>
                </b-col>
                <b-col md="6" lg="7">
                  <b-form-input type="text" :value="job.hsePhone" readonly/>
                </b-col>
              </b-row>
            </b-col>
            <b-col m="6" lg="6" class="map">
              <iframe
              width="100%"
              height="320px"
              frameborder="0" style="border:0"
              :src="mapRoot"  
              allowfullscreen>
              </iframe>
            </b-col>
          </b-row>
          
          <div class="card-header contractors">Site Contractors</div>
          <b-row class="inner-row" v-for="contractor in this.job.contractors" :key="contractor.id">
            <contractor-status :contractor="contractor"></contractor-status>
          </b-row>
          <b-row class="inner-row">
            <b-col lg="7" md="12">
              <v-select
                class="mt-2"
                searchable
                placeholder="Add new contractor"
                multiple
                :value.sync="selected"  
                :options="contractorList">
              </v-select>
            </b-col>
          </b-row>

          <div class="card-header additional">Additional Site Information</div>
           <b-row class="outer-row">
            <b-col m="12" lg="6" class="outer-col">
              <b-row class="inner-row">
                <b-col md="6" lg="4">
                  <p class="pl-3">Job Site Start Date:</p>
                </b-col>
                <b-col md="6" lg="7">
                  <b-form-input type="text" :value="formattedDate" readonly/>
                </b-col>
              </b-row>
              <b-row class="inner-row">
                <b-col md="6" lg="4">
                  <p class="pl-3">Notifiable Works:</p>
                </b-col>
                <b-col md="6" lg="7" v-for="item in job.notifiable" :key="item">
                  <b-form-input type="text" readonly/>
                </b-col>
                <b-col md="6" lg="7" v-if="job.notifiable <= 0">
                  <b-form-input type="text" placeholder="No notifiable works" readonly/>
                </b-col>
              </b-row>
              </b-col>
              <b-col md="6" lg="5" class="mt-3">
                <b-form-textarea 
                  :value="job.infotext"
                  readonly
                  placeholder="No Additional information"
                  :rows="6">
                </b-form-textarea>
              </b-col>
           </b-row>

          <div class="text-center">
            <b-button-group class="pt-4 pb-4">
              <b-button class="button" variant="success" @click="saveJob" :disabled="disabled">Update Job Site</b-button>
              <b-button class="button" variant="danger" @click="confirmAction = true">Close this job site</b-button>
            </b-button-group>
          </div>
        </b-form>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import ContractorStatus from '@/components/Principal/ContractorStatus.vue'
export default {
  props: ['id'],
  components: {
    'contractorStatus': ContractorStatus
  },
  data () {
    return {
      confirmAction: false,
      confirmed: false,
      success: false,
      selected: [],
      job: {}
    }
  },
  computed: {
    contractorList () {
      let list = this.$store.getters.companyIndex
      // remove this user's company name from list
      list.forEach((item, index, object) => {
        if (item.value === this.$store.getters.companyKey) {
          object.splice(index, 1)
        }
      })
      return list
    },
    admin () {
      let user = this.$store.getters.user
      if (user.admin === true) {
        return true
      } else {
        return false
      }
    },
    disabled () {
      if (this.selected.length === 0) {
        return true
      } else {
        return false
      }
    },
    headerText () {
      let text = 'Job Site: ' + this.job.address
      return text
    },
    mapRoot () {
      return 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD7W7NiKKy0qZfRUsslzHOe-Hnkp-IncyU&q=' + this.job.address
    },
    formattedDate () {
      return this.job.date.toString().slice(0, 15)
    },
    projectManagers () {
      return this.$store.getters.projectManagers
    }
  },
  methods: {
    status (contractor) {
      if (contractor.approved === true) {
        this.approved = true
        return 'Approved'
      } else {
        return 'Pending'
      }
    },
    saveJob () {
      // add contractors and save the job
      let newItems = []
      for (let index in this.selected) {
        let newItem = {
          approved: false,
          key: this.selected[index].value
        }
        newItems.push(newItem)
      }
      this.$store.dispatch('addSiteContractor', {id: this.id, contractors: newItems})
      this.success = true
    },
    closeJob () {
      this.$store.dispatch('closeJob', this.job)
      .then(() => {
        if (this.admin === true) {
          this.$store.dispatch('getAllJobs')
        } else {
          this.$store.dispatch('getMyJobs')
        }
      })
      .then(() => {
        this.$router.go(-1)
      })
    },
    route () {
      this.$router.go(-1)
    }
  },
  beforeMount () {
    this.job = this.$store.getters.jobSite(this.id)
  }
}
</script>

<style>

  .card-header.jobDetails {
    margin: -20px -20px 0px -20px;
    background-color: rgba(155, 35, 53, 0.88);
    font-size: 1.4rem;
    color: white;
  }

  p {
    margin-top: 5px;
  }
  
  .map {
    height: 300px;
    margin-bottom: 20px;
  }

  .inner-row {
    margin-top: 15px;
    margin-left: 5px;
  }

  .card-header.contractors {
    margin-top: 50px;
    margin-bottom: 20px;
    margin-right: 20px;
    border-radius: 5px;
    background-color: #12807ad4; 
    font-size: 1.2rem;
    color: white;
  }

  .card-header.additional {
    margin-top: 50px;
    margin-bottom: 20px;
    margin-right: 20px;
    border-radius: 5px;
    background-color: rgba(40, 26, 101, 0.8);
    font-size: 1.2rem;
    color: white;
  }

  .btn-group {
    align-items: center;
    width: 40%;
  }

  .button {
    margin: 20px;
    width: 50%;
  }


@media screen and (max-width : 992px) {
    .map {
      display: none;
    }
  }
</style>