<template>
  <b-container fluid>
    <b-card header="Quick View" header-tag="header">
      <div class="scroll-container">
        <jobActivity class="mt-3"></jobActivity>
        <incidentSummary></incidentSummary>
        <trainingAlerts></trainingAlerts>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import IncidentSummary from '@/components/Components/IncidentSummary.vue'
import TrainingAlerts from '@/components/Components/TrainingAlerts.vue'
import JobActivity from '@/components/Components/JobActivity.vue'

export default {
  components: {
    'jobActivity': JobActivity,
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
  body {
  font-size: 0.9em;
  line-height: 1.0;
}

.form-control {
  font-size: 1em;
}

  .container-fluid {
    padding-top: 20px;
    padding-right: 20px;
  }
  
  .card-header {
    background-color: rgba(56, 56, 56, 0.88);
    font-size: 1.2em;
    color: white;
    line-height: 2em;
  }

  .card-body {
    padding-top: 0;
    padding-bottom: 0;
  }

  .scroll-container {
    height: 80vh;
    overflow-y: scroll;
    margin-top: 10px;
    padding-right: 10px;
  }
</style>