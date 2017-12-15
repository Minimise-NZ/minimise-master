<template>
    <b-container fluid>
      <b-card header="Jobs in Progress" header-tag="header">
        <div class="scroll-container">
          <b-card
            v-for="job in jobSites"
            :key="job.id"
            class="siteCard mt-2 mb-4" 
            :header="job.address"
            >
            <b-row>
              <b-col>
                <header class="subheader">Approved Contractors</header>
                <ul>
                  <li v-for="contractor in job.approved" :key='contractor'>{{contractor}}</li>
                </ul>
              </b-col>
              <b-col>
                <header class="subheader">Pending Contractors</header>
                <ul>
                  <li v-for="contractor in job.pending" :key='contractor'>{{contractor}}</li>
                </ul>
              </b-col>
              <b-col> 
                <header class="subheader">Signed In</header>
                <ul v-for="contractor in job.signedIn" :key='contractor'>
                  <li>{{contractor.name}}</li>
                  <li>{{contractor.timestamp}}</li>
                </ul>
              </b-col>
              <b-col>
                <header class="subheader">Current Safety Plans</header>
                <ul>
                  <li>Safety Plans</li>
                </ul>
              </b-col>
            </b-row>
            <button style="float: right">Edit Job</button>
          </b-card>
        </div>
      </b-card>
    </b-container>
</template>

<script>
export default {
  computed: {
    jobSites () {
      return this.$store.getters.jobsInProgress
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
    background-color: rgba(111, 50, 130, 0.86);
    font-size: 1.4rem;
    color: white;
  }
  
  .siteCard >.card-header {
    background-color: rgba(29, 92, 158, 0.89);
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
  }
  
  .subheader {
    padding: 10px 0 10px 15px;
    border-bottom: 1px solid lightgrey;
    font-weight: bold;
    color: black;
  }
  
  .siteCard > .card-body {
    padding: 0;
  }
  
  .row {
    margin:auto;
  }
  
  .col {
    padding: 0;
    min-width: 250px;
  }
  
  ul {
    list-style: none;
    padding-left: 15px;
    margin-top: 10px;
  }
  
</style>