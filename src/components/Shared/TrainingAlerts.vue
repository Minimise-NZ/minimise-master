<template>
  <b-card header="Training Alerts" header-tag="header">
     <b-row v-if="trainingAlerts.length === 0">
      <b-col>
        <header class="subheader">You currently have no open itrainng alerts</header>
      </b-col>
    </b-row>
    <b-row class="subheader" v-if="trainingAlerts.length !== 0">
      <b-col>
        <header>Name</header>
      </b-col>
      <b-col>
        <header>Training Status</header>
      </b-col>
      <b-col>
        <header>Training Description</header>
      </b-col>
      <b-col>
        <header>Expiry Date</header>
      </b-col>
    </b-row>
    <b-row 
       class="content"
       v-for="training in trainingAlerts"
       :key="training.name">
      <b-col>
        <p style="text-decoration: underline; color:#178ac3; cursor: pointer"
          >{{training.name}}</p>
      </b-col>
      <b-col>
        <p>{{training.status}}</p>
      </b-col>
      <b-col>
        <p>{{training.description}}</p>
      </b-col>
      <b-col>
       <p>{{training.expiry}}</p>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  data () {
    return {
      trainingAlerts: [
        {
          name: 'Sam Stevens',
          status: 'Expired',
          description: 'First Aid Certificate',
          expiry: '18/10/2017'
        }
      ]
    }
  },
  computed: {
    workers () {
      return this.$store.getters.workers
    },
    training () {
      for (let worker in this.workers) {
        for (let item in worker.training) {
          if (item.expiry === '') {
            item.status = 'Incomplete'
            this.trainingAlerts.push(item)
          } else {
            // get difference bwtween expiry daye and now
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;
  }
  
  .card {
    border: 1px solid rgba(40, 26, 101, 0.8);
    margin-bottom: 30px;
  }
  
  .card-header {
    background-color: rgba(40, 26, 101, 0.8);
    font-size: 1.2rem;
    color: white;
  }
  
  .card-body {
    padding-top: 0;
  }
  
  .subheader {
    padding: 15px 0 15px 15px;
    border-bottom: 1px solid lightgrey;
    font-weight: bold;
    color: #281a65d4;;
  }
  
  .col {
    margin: 0;
    padding: 0;
  }
  
  .content {
    margin-left: 0;
    margin-top: 20px;
  }
</style>