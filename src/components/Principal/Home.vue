<template>
  <b-container fluid>
    <div class="scroll-container">
      <b-card header="Principal Home" header-tag="header">
        <contractorActivity></contractorActivity>
        <incidentSummary></incidentSummary>
        <trainingAlerts></trainingAlerts>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import IncidentSummary from '@/components/Shared/IncidentSummary.vue'
import TrainingAlerts from '@/components/Shared/TrainingAlerts.vue'
import ContractorActivity from '@/components/Principal/ContractorActivity.vue'
export default {
  components: {
    'contractorActivity': ContractorActivity,
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
    margin-bottom: 100px;
    padding-right: 30px;
  }
  .card-header {
    background-color: rgba(56, 56, 56, 0.88);
    font-size: 1.4rem;
    color: white;
  }
</style>