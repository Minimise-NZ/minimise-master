<template>
  <b-container fluid>
    <b-card header="Quick View" header-tag="header">
      <div class="scroll-container">
        <workerActivity></workerActivity>
        <incidentSummary></incidentSummary>
        <trainingAlerts></trainingAlerts>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import IncidentSummary from '@/components/Dashboard/IncidentSummary.vue'
import TrainingAlerts from '@/components/Dashboard/TrainingAlerts.vue'
import WorkerActivity from '@/components/Dashboard/WorkerActivity.vue'

export default {
  components: {
    'incidentSummary': IncidentSummary,
    'trainingAlerts': TrainingAlerts,
    'workerActivity': WorkerActivity
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