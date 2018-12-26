<template>
  <b-container fluid class="outside-container">
    <b-card header-tag="header">
      <header slot="header">Incident Reports
        <input type="text" v-model="search" class="form-control searchbox" placeholder="Search"/>
        <b-btn
          variant="dark"
          size="sm"
          class="addBtn"
          @click="newIncident" 
          v-b-tooltip.hover title="Add New Incident">
          <i class="fa fa-plus" style="color: rgb(1, 206, 187)"></i>
        </b-btn> 
      </header>
      <div class="scroll-container">
        <b-row v-if="incidents.length === 0">
          <b-col>
            <header class="subheader">You have no open incident reports</header>
          </b-col>
        </b-row>
        <div style="border: 1px solid #d6d6d6">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Site Address</th>
                <th>Incident type</th>
                <th>Supervisor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="incident in filtered" :key="incident.address" style="border-bottom: 1px solid #e9ecef">
                <td style="text-decoration: underline; color: #178ac3; cursor: pointer"  @click="viewIncident(incident.id)">{{incident.address}}</td>
                <td>{{incident.type}}</td>
                 <td>{{incident.supervisorName}}</td>
                 <td>{{formattedDate(incident.date)}}</td>
                 <td>{{status(incident.open)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      search: ''
    }
  },
  computed: {
    incidents () {
      let incidents = this.$store.getters.incidents
      var data = this._.orderBy(incidents, ['open'], ['desc'])
      return data
    },
    filtered () {
      return this.incidents.filter(incident => {
        return incident.address.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    formattedDate (date) {
      return moment(date).format('DD-MM-YYYY')
    },
    viewIncident (id) {
      this.$router.push('/dashboard/incidents/incident/' + id)
    },
    newIncident () {
      this.$router.push('/dashboard/incidents/newIncident')
    },
    status (open) {
      if (open === 'true') {
        return 'open'
      } else {
        return 'closed'
      }
    }
  }
}
</script>

<style scoped>
   .container-fluid {
    padding-top: 20px;
  }

  .card-body {
    padding-top: 0;
    padding-bottom: 0;
  }

  .scroll-container {
    height: 80vh;
    overflow-y: scroll;
    padding-right: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .card-header {
    padding-top: 7px;
    padding-bottom: 7px;
    background-color: rgba(56, 56, 56, 0.88);
    font-size: 1.1em;
    color: white;
    line-height:1.8em;
  }

  .searchbox {
    display: inline-block;
    padding-top: 4px;
    padding-bottom: 4px;
    width: 400px;
    margin-left: 20px;
    line-height: 1.1em;
    background-color: grey;
    color: white;
    cursor: default;
  }

  .searchbox::placeholder {
    font-size: 0.9em;
    color: white;
    opacity: 1; /* Firefox */
  }

  .searchbox:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: white;
  }

  .searchbox::-ms-input-placeholder { /* Microsoft Edge */
    color: white;
  }

  .btn {
    float: right;
  }

  .table {
    margin-bottom: 0;
  }

  thead {
    background-color: rgba(37, 26, 99, 0.75);
    color: white;
  }

  th {
    border: none;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-right: 20px;
    font-size: 1em;
    font-weight: normal;
  }

  td {
    font-size: 0.9em;
  }

</style>