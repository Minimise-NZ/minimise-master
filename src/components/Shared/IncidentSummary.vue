<template>
  <b-card header="Incidents Summary" header-tag="header">
    <b-row v-if="incidents.length === 0">
      <b-col>
        <header class="subheader">You have no open incident reports</header>
      </b-col>
    </b-row>
    <b-row class="subheader" v-if="incidents.length !== 0">
      <b-col>
        <header>Site Address</header>
      </b-col>
        <b-col>
        <header>Incident Type</header>
      </b-col>
      <b-col>
        <header>Action Owner</header>
      </b-col>
      <b-col>
        <header>Reported Date</header>
      </b-col>
    </b-row>
    <b-row 
      class="content"
      v-for="incident in incidents"
      v-if="incident.open"
      :key="incident.id">
      <b-col>
        <p style="text-decoration: underline; color: #178ac3; cursor: pointer" @click="viewIncident(incident.id)">{{incident.address}}</p>
      </b-col>
      <b-col>
        <p>{{incident.type}}</p>
      </b-col>
      <b-col>
        <p>{{incident.actionOwner.name}}</p>
      </b-col>
      <b-col>
        <p>{{formattedDate(incident.date)}}</p>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
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
    viewIncident (id) {
      this.$router.push('/principal/incidents/incident/' + id)
    },
    formattedDate (date) {
      var d = new Date(date)
      return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/')
    }
  }
}
</script>

<style scoped>
  .card {
    border: 1px solid #12807a;
    margin-bottom: 30px;
  }
  
  .card-header {
    background-color: #12807a;
    font-size: 1.2rem;
    color: white;
  }
  
  .card-body {
    padding-top: 0;
  }
  
  .subheader {
    padding: 15px 0 15px 15px;
    border-bottom: 1px solid lightgrey;
    font-weight: bold;
    color: #12807a;
  }
  
  .col {
    margin: 0;
    padding: 0;
  }
  
  .content {
    margin-left: 0;
    margin-top: 20px;
  }
</style>