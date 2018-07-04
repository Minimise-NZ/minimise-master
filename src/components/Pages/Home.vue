<template>
  <b-container fluid>
    <b-card header="Quick View" header-tag="header">
      <div class="scroll-container">
        <safetyPlans></safetyPlans>
        <incidentSummary></incidentSummary>
        <trainingAlerts></trainingAlerts>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import IncidentSummary from '@/components/Components/IncidentSummary.vue'
import TrainingAlerts from '@/components/Components/TrainingAlerts.vue'
import SafetyPlans from '@/components/Components/safetyPlans.vue'

export default {
  components: {
    'incidentSummary': IncidentSummary,
    'trainingAlerts': TrainingAlerts,
    'safetyPlans': SafetyPlans
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