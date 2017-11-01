<template>
  <b-container fluid>
    <b-card header="New Job Site" header-tag="header">
      <b-row>
        <b-col sm="12" lg="7" class="manager-details">
          <h5>{{principal.name}}</h5><br>
          <p>
            <em>Project Manager:</em> {{user.name}}<br> 
            <em>Contact Number: </em>{{user.phone}}
          </p>
          <p>
            <em>HSE Manager: </em>{{principal.HSE.name}}<br>
            <em>Contact Number: </em>{{principal.HSE.phone}}
          </p>
          <br>
          <div class="input-group searchBar">
            <input type="text" class="form-control" placeholder="Site Address">
            <span class="input-group-btn">
              <button 
                class="btn btn-secondary" 
                type="button" 
                @click="searchAddress"
                >Search</button>
            </span>
          </div>
          <h5>{{siteAddress}}</h5>
        </b-col>
        
        <b-col m="12" lg="5" class="address">
          <iframe
          width="100%"
          height="280px"
          frameborder="0" style="border:0"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD7W7NiKKy0qZfRUsslzHOe-Hnkp-IncyU&q=187+marine+parade, new+brighton" allowfullscreen>
          </iframe>
        </b-col>
      </b-row>
      
      <hr><br>
      <p>Do you have subcontractors?</p>     
      <b-form-radio-group 
        id="radiocontractor" 
        v-model="contractors.radioValue"
        :options="contractors.radioOptions"
        >
      </b-form-radio-group>
      
      <v-select
        class="mt-3"
        v-if="showList"
        searchable
        placeholder="Please select your contractors"
        multiple 
        :value.sync="contractors.selected"
        :options="contractors.list">
      </v-select>
      
      <p class="mt-5">Is there notifiable works associated with this project?</p>     
      <b-form-radio-group
        class="mb-2"
        id="radioNotifiable" 
        v-model="notifiable.radioValue"
        :options="notifiable.radioOptions"
        >
      </b-form-radio-group>
      <b-form-checkbox-group
       v-if="showNotifiable"
        stacked 
        v-model="notifiable.selected" 
        name="notifiables" 
        :options="notifiable.list">
      </b-form-checkbox-group>
      
      <b-form-checkbox
        class="mt-5"
        id="addinfo"
        v-model="addinfo"
        value="add">
      Additional information required?
    </b-form-checkbox>
    <b-form-textarea 
        v-if="addinfo"
        id="info"
        v-model="infotext"
        placeholder="Additional information"
        :rows="6">
    </b-form-textarea><br>
    <b-button class="mt-3 submit" block  variant="success">Submit</b-button>
    </b-card>
  </b-container>
</template>

<script>
  export default {
    data () {
      return {
        principal: {
          name: 'Stonewood Homes',
          HSE: {
            name: 'Ann Swan',
            phone: '021 456 789'
          }
        },
        user: {
          name: 'John Smith',
          phone: '021 123 456'
        },
        siteAddress: '',
        contractors: {
          radioValue: 'yes',
          radioOptions: [
            {text: 'Yes', value: 'yes'},
            {text: 'No', value: 'no'}
          ],
          list: [
            'Bob the Builder',
            'Leaky Pipes',
            'Pete the Painter',
            'Upside Down Scaffold',
            'Contractor 1',
            'Contractor 2',
            'Contractor 3',
            'Contractor 4',
            'Contractor 5'
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
        addinfo: false
      }
    },
    methods: {
      searchAddress () {
      }
    },
    computed: {
      showList () {
        return (this.contractors.radioValue === 'yes')
      },
      showNotifiable () {
        return (this.notifiable.radioValue === 'yes')
      }
    }
  }
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;;
  }
  
  .card {
    border: 1px solid grey;
  }
  
  .card-header {
    background-color: #12807a;
    font-size: 1.4rem;
    color: white;
  }
  
  .row {
    padding-bottom: 10px;
  }
  
  .btn-secondary {
    background-color: #3366cc;
    cursor:pointer;
  }
  em {
    color: #757575;
  }
  
  .searchBar {
    max-width: 600px;
  }
  
  .address {
    height: 300px;
    padding: 10px;
    margin-top: 10px;
  }
  
  .manager-details {
    padding: 10px;
  }
  
  .submit {
    max-width: 300px;
    cursor: pointer;
  }
</style>


