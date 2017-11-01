<template>
  <b-container fluid>
    <b-card header="Principal Home" header-tag="header">
      <recentActivity></recentActivity>
      <incidentReports></incidentReports>
      <trainingAlerts></trainingAlerts>
    </b-card>
  </b-container>
</template>

<script>
import IncidentReports from '@/components/Shared/IncidentReports.vue'
import TrainingAlerts from '@/components/Shared/TrainingAlerts.vue'
import RecentActivity from '@/components/Principal/RecentActivity.vue'
export default {
  components: {
    'recentActivity': RecentActivity,
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
  
  .card-header {
    background-color: rgba(56, 56, 56, 0.88);
    font-size: 1.4rem;
    color: white;
  }
</style>