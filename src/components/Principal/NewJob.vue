<template>
  <b-container fluid>
    <b-card header="New Job Site" header-tag="header">
      <div class="scroll-container">
        <b-form @submit.prevent="onSubmit" id="newJobForm" class="pb-5">
          <b-row>
            <b-col sm="12" lg="6" class="manager-details">
              <h5><strong>{{company.name}}</strong></h5><br>
              <p>
                <span class="label">Project Manager: </span>{{user.name}}<br> 
                <span class="label">Contact Number: </span>{{user.phone}}
              </p>
              <p>
                <span class="label">HSE Manager: </span>{{company.hseManager}}<br>
                <span class="label">Contact Number: </span>{{company.hsePhone}}
              </p>
              <br>
              <div class="input-group searchBar">
                <b-form-input
                  required
                  v-model="siteAddress"
                  type="text"
                  class="form-control" 
                  placeholder="Site Address">
                  <span class="input-group-btn">
                  <button 
                    class="btn btn-secondary" 
                    type="button" 
                    @click="searchAddress"
                    >Search</button>
                  </span>
                </b-form-input>
              </div>
            </b-col>
            
            <b-col m="12" lg="5" class="map">
              <iframe
              width="100%"
              height="350px"
              frameborder="0" style="border:0"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD7W7NiKKy0qZfRUsslzHOe-Hnkp-IncyU&q=187+marine+parade, new+brighton" allowfullscreen>
              </iframe>
            </b-col>
          </b-row>
          
          <br>
          <p class="ml-2">Do you have subcontractors?</p>     
          <b-form-radio-group
            class="ml-2"
            id="radiocontractor" 
            v-model="contractors.radioValue"
            :options="contractors.radioOptions"
            >
          </b-form-radio-group>
          
          <v-select
            class="mt-3 ml-2"
            v-if="showList"
            searchable
            placeholder="Please select your contractors"
            multiple 
            :value.sync="contractors.selected"
            :options="contractorList">
          </v-select>
          <div class="alert alert-danger" v-if="selectError">Please select your contractors</div>
          
          <p class="mt-5 ml-2">Is there notifiable works associated with this project?</p>     
          <b-form-radio-group
            class="mb-2 ml-2"
            id="radioNotifiable" 
            v-model="notifiable.radioValue"
            :options="notifiable.radioOptions"
            >
          </b-form-radio-group>
          <b-form-checkbox-group
            class="ml-2"
            v-if="showNotifiable"
            stacked 
            v-model="notifiable.selected" 
            name="notifiables" 
            :options="notifiable.list">
          </b-form-checkbox-group>
          
          <b-form-checkbox
            class="mt-5 ml-2"
            id="addinfo"
            v-model="addinfo"
            value="add">
          Additional information required?
          </b-form-checkbox>
          <b-form-textarea 
              class="ml-2"
              v-if="addinfo"
              required
              id="info"
              v-model="infotext"
              placeholder="Additional information"
              :rows="6">
          </b-form-textarea><br>
          <div class="text-center">
            <b-button-group class="pt-4 pb-4">
              <b-button class="buttons" variant="success" type="submit">Submit</b-button>
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
        siteAddress: '',
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
        addinfo: false,
        infotext: '',
        selectError: false
      }
    },
    methods: {
      searchAddress () {
      },
      cancel () {
        this.$router.push('/principal')
      },
      onSubmit () {
        this.$store.dispatch('newJob', {
          principalKey: this.user.company,
          principalName: this.company.name,
          pm: this.user.name,
          pmPhone: this.user.phone,
          hse: this.company.hseManager,
          hsePhone: this.company.hsePhone,
          address: this.siteAddress,
          notifiable: this.notifiable.selected,
          info: this.infotext,
          status: 'open',
          subcontractors: this.subcontractors,
          date: +new Date()
        })
        .then(() => {
          alert('New job has been created')
          this.$store.dispatch('getJobs')
          this.$router.push('/principal/jobs')
        })
      }
    },
    computed: {
      showList () {
        return (this.contractors.radioValue === 'yes')
      },
      showNotifiable () {
        return (this.notifiable.radioValue === 'yes')
      },
      user () {
        return this.$store.getters.user
      },
      contractorList () {
        return this.$store.getters.companyIndex
      },
      company () {
        return this.$store.getters.company
      },
      subcontractors () {
        var subcontractors = this.contractors.selected.map(contractor => ({
          status: 'pending', name: contractor.label, key: contractor.value
        }))
        return subcontractors
      }
    }
  }
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;
    padding-right: 30px;
  }
  
  .card-header {
    background-color: #12807a;
    font-size: 1.4rem;
    color: white;
  }
  
  .row {
    margin: 0;
    padding-bottom: 10px;
  }
  
  .btn-secondary {
    background-color: #3366cc;
    cursor:pointer;
  }
  .label {
    color: #757575;
  }
  
  .searchBar {
    max-width: 600px;
  }
  
  .map {
    height: 300px;
    width: 100%;
    padding: 10px;
    margin-top: 10px;
  }
  
  .manager-details {
    padding: 10px;
  }

  .alert-danger {
    margin-top:10px;
    padding: 5px;
    font-size: 0.9rem;
  }

  .alert-border {
    border: 1px solid salmon;
  }
  
   .btn-group {
    align-items: center;
    width: 40%;
  }

  .buttons {
    cursor: pointer;
    margin: 20px;
    width: 50%;
  }
  
</style>


