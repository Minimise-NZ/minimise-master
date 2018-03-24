<template>
  <b-container fluid class="outside-container">
    <b-card>
      <div class="card-header">Jobs In Progress</div>
      <div class="scroll-container">
        <b-row v-if="jobSites.length === 0">
          <b-col>
            <header class="subheader" style="color: rgba(111, 50, 130, 0.86)">You currently have no jobs in progress</header>
          </b-col>
        </b-row>
        <b-card
          v-for="job in jobSites"
          :key="job.id"
          class="siteCard mt-2 mb-4">
          <header class="card-header job">{{job.address}}
            <b-button class="editBtn pt-1 pb-1" @click="editJob(job.id)">View Job Details</b-button>
          </header>
          <b-row>
            <b-col>
              <header class="subheader">Approved Contractors</header>
              <ul>
                <li v-for="contractor in job.contractors" :key='contractor.key' v-if="contractor.approved">{{contractor.name}}</li>
              </ul>
            </b-col>
            <b-col>
              <header class="subheader">Pending Contractors</header>
              <ul>
                <li v-for="contractor in job.contractors" :key='contractor.key' v-if="!contractor.approved">{{contractor.name}}</li>
              </ul>
            </b-col>
            <b-col> 
              <header class="subheader">Signed In</header>
              <ul>
                <li v-for="(plan, index) in job.safetyPlans" :key='index'>{{plan.workerName}}</li>
              </ul>
            </b-col>
            <b-col>
              <header class="subheader">Safety Plans</header>
              <ul>
                <b-link v-for="(plan, index) in job.safetyPlans" :key='index'>{{plan.workerName}}</b-link>
              </ul>
            </b-col>
          </b-row>
        </b-card>
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
    jobSites () {
      return this.$store.getters.jobsInProgress
    },
    contractors () {
      return this.jobSites.contractors
    }
  },
  methods: {
    editJob (id) {
      let companyType = this.$store.getters.user.companyType
      this.$router.push('/' + companyType + '/jobs/job/' + id)
    }
  }
}
</script>

<style scoped>
  .card-header {
    margin: -20px -20px 20px -20px;
    background-color: rgba(111, 50, 130, 0.86);
    font-size: 1.4rem;
    color: white;
  }

   .card-header.job {
    background-color: rgba(29, 92, 158, 0.89);
    margin: 0;
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
  }
   .editBtn {
    float: right;
    background-color:rgba(223, 233, 255, 0.83);
    color: black;
  }

  .editBtn:hover {
    background-color:#ffc80b;
    color: black;
  }

  .subheader {
    padding: 15px 0 15px 15px;
    border-bottom: 1px solid lightgrey;
    font-weight: bold;
    color: rgba(29, 92, 158, 0.89);
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