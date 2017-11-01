<template>
  <b-container fluid>
    <b-card header="Incident View" header-tag="header">
    <incidentForm></incidentForm>
    </b-card>
  </b-container>
</template>

<script>
import IncidentForm from '@/components/Shared/IncidentForm.vue'
export default {
  components: {
    'incidentForm': IncidentForm
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
    margin-bottom: 100px;;
  }
  
  .card {
    border: 1px solid grey;
  }
  
  .card-header {
    background-color: #027588;
    font-size: 1.4rem;
    color: white;
  }
</style>