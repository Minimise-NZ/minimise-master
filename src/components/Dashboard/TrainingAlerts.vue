<template>
  <b-card header="Training Alerts" header-tag="header">
     <b-row v-if="training.length === 0">
      <b-col>
        <header class="subheader">You have no training alerts</header>
      </b-col>
    </b-row>
    <b-row class="subheader" v-if="training.length !== 0">
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
       v-for="training in training"
       :key="training.name">
      <b-col>
        <a style="text-decoration: underline; color:#178ac3; cursor: pointer" @click="workerView"
          >{{training.name}}</a>
      </b-col>
      <b-col>
        <p>{{training.status}}</p>
      </b-col>
      <b-col>
        <p>{{training.description}}</p>
      </b-col>
      <b-col v-if="training.expiry !== ''">
       <p>{{training.expiry | formatDate}}</p>
      </b-col>
      <b-col v-else>
       <p>Not entered</p>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    workers () {
      return this.$store.getters.workers
    },
    training () {
      return this.$store.getters.training
    }
  },
  methods: {
    workerView () {
      let companyType = this.$store.getters.user.companyType
      this.$router.push('/' + companyType + '/workers')
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