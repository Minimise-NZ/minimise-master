<template>
  <b-container fluid>
     <b-card>
      <div class="card-header">Incident Management
        <b-button v-if="currentView === 'home'" class="addBtn" @click="newIncident">New Incident</b-button>
        <b-button v-else class="addBtn" @click="home">Go Back</b-button>
      </div>
      <incidentReports v-if="currentView === 'home'"></incidentReports>
      <incidentView v-if="currentView === 'view'"></incidentView>
      <incidentForm v-if="currentView === 'new'"></incidentForm>
  </b-card>
  </b-container>
</template>

<script>
import IncidentReports from '@/components/Shared/IncidentReports.vue'
import IncidentView from '@/components/Shared/IncidentView.vue'
import IncidentForm from '@/components/Shared/IncidentForm.vue'
export default {
  components: {
    'incidentReports': IncidentReports,
    'incidentView': IncidentView,
    'incidentForm': IncidentForm
  },
  data () {
    return {
      currentView: 'home'
    }
  },
  methods: {
    newIncident () {
      this.currentView = 'new'
    },
    home () {
      this.currentView = 'home'
    },
    viewIncident () {
      this.currentView = 'view'
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;;
  }

  .card-header {
    margin: -20px -20px 20px -20px;
    background-color: rgba(29, 92, 158, 0.89);
    font-size: 1.4rem;
    color: white;
  }
  
  .addBtn {
    float: right;
    background-color: #ffc80b;
    color: black;
    cursor: pointer;
  }
  
</style>