<template>
  <b-card
   header="Job Requests" 
   header-tag="header">
    <b-row class="subheader">
      <b-col>
        <header>Site Address</header>
      </b-col>
      <b-col>
        <header>Principal Contractor</header>
      </b-col>
      <b-col>
        <header>Project Manager</header>
      </b-col>
      <b-col>
        <header>Request Date</header>
      </b-col>
    </b-row>
    <b-row 
       class="content"
       v-for="job in jobRequests"
       :key="job.id">
      <b-col>
        <p class="mb-0 mr-3"
          style="text-decoration: underline; color:#178ac3; cursor: pointer"
          @click="viewJob(job.id)"
          >{{job.address}}</p>
      </b-col>
      <b-col>
        <p>{{job.principal}}</p>
      </b-col>
      <b-col>
        <p>{{job.projectManager}}</p>
      </b-col>
      <b-col>
       <p>{{job.date}}</p>
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
    jobRequests () {
      return this.$store.getters.jobRequests
    }
  },
  methods: {
    viewJob (id) {
      this.$router.push('/contractor/jobs/job/' + id)
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
    border: 1px solid rgba(29, 92, 158, 0.89);
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
    color:#1376ad;
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