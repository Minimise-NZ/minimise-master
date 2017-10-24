<template>
  <b-container fluid>
    <b-card header="Contractor Home" header-tag="header">
      <jobRequests></jobRequests>
      <incidentReports></incidentReports>
      <trainingAlerts></trainingAlerts>
    </b-card>
  </b-container>
</template>

<script>
import JobRequests from '@/components/Contractor/JobRequests.vue'
import IncidentReports from '@/components/Shared/IncidentReports.vue'
import TrainingAlerts from '@/components/Shared/TrainingAlerts.vue'
export default {
  components: {
    'jobRequests': JobRequests,
    'incidentReports': IncidentReports,
    'trainingAlerts': TrainingAlerts
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;
  }
  
  .card {
    border: 1px solid grey;
  }
  
  .card-header {
    background-color: #484747;
    font-size: 1.4rem;
    color: white;
  }
</style>