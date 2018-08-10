<template>
  <b-card header="Job Site Activity" header-tag="header">
    <b-row class="subheader" >
      <b-col cols="3">
        <header>Site Address</header>
      </b-col>
       <b-col>
        <header>Safety Plan</header>
      </b-col>
      <b-col>
        <header>Toolbox Talk</header>
      </b-col>
      <b-col>
        <header>Signed In</header>
      </b-col>
    </b-row>
    <b-row 
      class="content"
      v-for="job in jobs"
      :key="job.id">
      <b-col cols="3">
        <p>{{job.address}}</p>
      </b-col>
       <b-col>
        <p>link to plan</p>
      </b-col>
      <b-col>
        <p>link to toolbox</p>
      </b-col>
      <b-col>
        <p>Name:timestamp</p>
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
    jobs () {
      return this.$store.getters.jobsInProgress
    }
  },
  methods: {
    viewPlan (plan) {
      console.log(plan)
      this.$router.push('/dashboard/jobs/safetyplan/' + plan.id)
    }
  }
}
</script>

<style scoped>
  .card {
    border: 1px solid rgba(29, 92, 158, 0.89);
    margin-bottom: 30px;
  }
  
  .card-header {
    background-color: rgba(29, 92, 158, 0.89);
    font-size: 1em;
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