<template>
  <b-container fluid class="outside-container">
    <b-card>
      <div class="card-header">Incident Reports</div>
      <div class="scroll-container">
        <b-row v-if="incidents.length === 0">
          <b-col>
            <header class="subheader">You have no open incident reports</header>
          </b-col>
        </b-row>
        <b-row class="subheader" v-if="incidents.length !== 0">
          <b-col lg="3">
            <header>Site Address</header>
          </b-col>
          <b-col lg="2">
            <header>Incident Type</header>
          </b-col>
          <b-col lg="3">
            <header>Supervisor</header>
          </b-col>
          <b-col lg="2">
            <header>Date</header>
          </b-col>
          <b-col lg="2">
            <header>Status</header>
          </b-col>
        </b-row>
        <b-row v-for="incident in incidents" :key="incident.address" class="content">
          <b-col lg="3">
            <p style="text-decoration: underline; color: #178ac3; cursor: pointer"  @click="viewIncident(incident.id)">{{incident.address}}</p>
          </b-col>
          <b-col lg="2">
            <p>{{incident.type}}</p>
          </b-col>
          <b-col lg="3">
            <p>{{incident.supervisorName}}</p>
          </b-col>
          <b-col lg="2">
            <p>{{incident.date}}</p>
          </b-col>
          <b-col lg="2">
            <p>{{status(incident.open)}}</p>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    incidents () {
      let incidents = this.$store.getters.incidents
      var data = this._.orderBy(incidents, ['open'], ['desc'])
      return data
    }
  },
  methods: {
    viewIncident (id) {
      this.$router.push('/dashboard/incidents/incident/' + id)
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

  .card-header {
    margin: -20px -20px 0px -20px;
  }
  
  .subheader {
    padding: 15px 0 10px 15px;
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