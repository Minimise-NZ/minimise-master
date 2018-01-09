<template>
  <b-container fluid>
    <b-card header="Contractor Home" header-tag="header">
      <jobRequests></jobRequests>
      <incidentSummary></incidentSummary>
      <trainingAlerts></trainingAlerts>
    </b-card>
  </b-container>
</template>

<script>
import JobRequests from '@/components/Contractor/JobRequests.vue'
import IncidentSummary from '@/components/Shared/IncidentSummary.vue'
import TrainingAlerts from '@/components/Shared/TrainingAlerts.vue'
export default {
  components: {
    'jobRequests': JobRequests,
    'incidentSummary': IncidentSummary,
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
    padding-right: 30px;
  }
  
  .card-header {
    background-color: rgba(56, 56, 56, 0.88);
    font-size: 1.4rem;
    color: white;
  }
</style>