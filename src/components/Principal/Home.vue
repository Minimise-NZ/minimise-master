<template>
  <b-container fluid>
    <b-card header="Principal Home" header-tag="header">
      <div class="scroll-container">
        <!--<contractorActivity></contractorActivity>-->
        <incidentSummary></incidentSummary>
        <trainingAlerts></trainingAlerts>
      </div>  
    </b-card>
  </b-container>
</template>

<script>
import IncidentSummary from '@/components/Shared/IncidentSummary.vue'
import TrainingAlerts from '@/components/Shared/TrainingAlerts.vue'
// import ContractorActivity from '@/components/Principal/ContractorActivity.vue'
export default {
  components: {
    // 'contractorActivity': ContractorActivity,
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