<template>
  <b-container fluid class="outside-container">
    <b-card>
      <div class="card-header">Job Requests</div>
      <div class="scroll-container">
        <b-row v-if="jobRequests.length === 0">
          <b-col>
            <header class="subheader">You have no new job requests</header>
          </b-col>
        </b-row>
        <b-row class="subheader" v-if="jobRequests.length !== 0">
          <b-col>
            <p>Site Address</p>
          </b-col>
          <b-col>
            <p>Principal Contractor</p>
          </b-col>
          <b-col>
            <header>Project Manager</header>
          </b-col>
          <b-col>
            <header>Request Date</header>
          </b-col>
        </b-row>
        <b-row v-for="job in jobRequests" :key="job.id" class="content">
          <b-col>
            <p style="text-decoration: underline; color: #178ac3; cursor: pointer"  @click="viewJob(job.id)">{{job.address}}</p>
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
      </div>
    </b-card>
  </b-container>
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

  .card-header {
    margin: -20px -20px 0px -20px;
    background-color: #12807a;
    font-size: 1.4rem;
    color: white;
  }
  
  .subheader {
    padding: 10px 0 10px 15px;
    border-bottom: 1px solid lightgrey;
    font-weight: bold;
    color: #12807a;
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