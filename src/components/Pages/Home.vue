<template>
  <b-container fluid>
    <b-card header="Quick View" header-tag="header">
      <div class="scroll-container">
        <!--<jobActivity></jobActivity>-->
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
  .container-fluid {
    padding-top: 20px;
    padding-right: 30px;
  }
  
  .card-header {
    background-color: rgba(56, 56, 56, 0.88);
    font-size: 1.2em;
    color: white;
  }

  .card-body {
    padding-bottom: 0;
  }
</style>