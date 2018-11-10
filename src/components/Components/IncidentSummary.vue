<template>
  <b-card header="Open Incidents" header-tag="header">
    <b-row v-if="incidents.length === 0">
      <b-col>
        <header class="subheader">You have no open incident reports</header>
      </b-col>
    </b-row>
    <b-row class="subheader" v-if="incidents.length !== 0">
      <b-col cols="3">
        <header>Site Address</header>
      </b-col>
      <b-col cols="2">
        <header>Incident Type</header>
      </b-col>
      <b-col>
        <header>Supervisor</header>
      </b-col>
      <b-col>
        <header>Reported By</header>
      </b-col>
      <b-col cols="2">
        <header>Reported Date</header>
      </b-col>
    </b-row>
    <b-row 
      class="content"
      v-for="incident in incidents"
      v-if="incident.open === 'true'"
      :key="incident.id">
      <b-col cols="3">
        <p style="text-decoration: underline; color: #178ac3; cursor: pointer" @click="viewIncident(incident.id)">{{incident.address}}</p>
      </b-col>
      <b-col cols="2">
        <p>{{incident.type}}</p>
      </b-col>
      <b-col>
        <p>{{incident.supervisorName}}</p>
      </b-col>
      <b-col>
        <p>{{incident.reportedBy}}</p>
      </b-col>
      <b-col cols="2">
        <p>{{formattedDate(incident.date)}}</p>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
    }
  },
  computed: {
    incidents () {
      return this.$store.getters.incidents
    }
  },
  methods: {
    formattedDate (date) {
      return moment(date).format('DD-MM-YYYY')
    },
    viewIncident (id) {
      this.$router.push('/dashboard/incidents/incident/' + id)
    }
  }
}
</script>

<style scoped>
  p {
    font-size: 0.9em;
  }
  .card {
    border: 1px solid #12807a;
    margin-bottom: 20px;
  }
  
  .card-header {
    background-color: #12807a;
    font-size: 1em;
    line-height: 1.1em;
    color: white;
  }
  
  .card-body {
    padding-top: 0;
  }
  
  .subheader {
    padding: 15px 0 10px 15px;
    border-bottom: 1px solid lightgrey;
    font-weight: bold;
    color: #12807a;
    font-size: 0.9em;
  }
  
  .col, .col-3, .col-2 {
    margin: 0;
    padding: 0;
  }
  
  .content {
    margin-left: 0;
    margin-top: 20px;
  }
</style>