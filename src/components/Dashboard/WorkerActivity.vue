<template>
  <b-card header="Worker Activity" header-tag="header">
    <b-row>
      <b-col>
        <header class="subheader">There is no recent worker activity</header>
      </b-col>
    </b-row>
    <!--
    <b-row class="subheader" v-if="signedIn.length !== 0">
      <b-col cols="3">
        <header>Site Address</header>
      </b-col>
      <b-col>
        <header>Signed In</header>
      </b-col>
      <b-col>
        <header>Date/Time</header>
      </b-col>
      <b-col cols="2">
        <header>Safety Plan</header>
      </b-col>
    </b-row>
    <b-row 
      class="content"
      v-for="worker in signedIn"
      :key="worker.id">
      <b-col cols="2">
        <p></p>
      </b-col>
      <b-col>
        <p>{{worker.name}}</p>
      </b-col>
      <b-col>
        <p>{{incident.reportedBy}}</p>
      </b-col>
      <b-col cols="2">
        <p>{{incident.date | formatDate}}</p>
      </b-col>
    </b-row>
    -->
  </b-card>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    jobSites () {
      return this.$store.getters.jobsInProgress
    }
  },
  methods: {
    viewSafetyPlan (jobid, safetyplanid) {
      console.log(jobid, safetyplanid)
      this.$router.push('/dashboard/jobs/' + jobid + '/' + safetyplanid)
    }
  }
}
</script>

<style scoped>
  .card {
    border: 1px solid #12807a;
    margin-bottom: 30px;
  }
  
  .card-header {
    background-color: rgba(29, 92, 158, 0.89);
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
    color: rgba(29, 92, 158, 0.89);
  }
  
  .col, .col-3, .col-2 {
    margin: 0;
    padding: 0;
  }
  
  .content {
    margin-left: 0;
    margin-top: 20px;
  }
</style>