<template>
  <b-container fluid>
    <b-card header="Action Items" header-tag="header">
      <b-card
         v-for="action in actions"
         :key="action.title"
         class="actionCard mt-2 mb-4" 
         :header="action.title"
        >
      </b-card>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      actions: [
        {
          title: 'Job Requests',
          groupItems: [
            {
              address: '44 Centennial Avenue, Riccarton, Christchurch, 8041',
              projectManager: 'John Smith - Stonewood Homes',
              date: '14/07/2017'
            }
          ]
        },
        {
          title: 'Incidents'
        },
        {
          title: 'Training Alerts'
        }
      ]
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
    background-color: #901010db;
    font-size: 1.4rem;
    color: white;
  }
  
  .actionCard >.card-header {
    background-color: #131313c9;
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
  }
</style>