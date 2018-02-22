<template>
  <b-container fluid>
    <b-card header="Contractor Home" header-tag="header">
      <div class="scroll-container">
        <jobSummary></jobSummary>
        <incidentSummary></incidentSummary>
        <trainingAlerts></trainingAlerts>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import JobSummary from '@/components/Contractor/JobSummary.vue'
import IncidentSummary from '@/components/Shared/IncidentSummary.vue'
import TrainingAlerts from '@/components/Shared/TrainingAlerts.vue'
export default {
  components: {
    'jobSummary': JobSummary,
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