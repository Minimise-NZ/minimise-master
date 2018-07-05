<template>
  <b-card header="Current Safety Plans" header-tag="header">
    <b-row v-if="safetyPlans.length === 0">
      <b-col>
        <header class="subheader">There are no current safety plans</header>
      </b-col>
    </b-row>
    <b-row class="subheader" v-if="safetyPlans.length !== 0">
      <b-col cols="3">
        <header>Site Address</header>
      </b-col>
       <b-col>
        <header>Created Date</header>
      </b-col>
      <b-col>
        <header>Expiry Date</header>
      </b-col>
      <b-col>
        <header>Signed In</header>
      </b-col>
    </b-row>
    <b-row 
      class="content"
      v-for="plan in safetyPlans"
      :key="plan.id">
      <b-col cols="3">
        <p style="text-decoration: underline; color: #178ac3; cursor: pointer" @click="viewPlan(plan)">{{plan.jobAddress}}</p>
      </b-col>
       <b-col>
        <p>{{plan.createdDate}}</p>
      </b-col>
      <b-col>
        <p>{{plan.expiryDate}}</p>
      </b-col>
      <b-col>
        <p v-if="plan.signedIn === true">{{plan.workerName}}</p>
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
    safetyPlans () {
      return this.$store.getters.safetyPlans
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