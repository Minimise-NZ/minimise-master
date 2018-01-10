<template>
    <b-container fluid class="outside-container">
      <b-card>
        <div class="card-header">Jobs In Progress</div>
        <div class="scroll-container">
          <b-card
            v-for="job in jobSites"
            :key="job.id"
            class="siteCard mt-2 mb-4">
            <header class="card-header job">{{job.address}}
              <b-button class="editBtn pt-1 pb-1" @click="editJob(job.id)">Edit Job</b-button>
            </header>
            <b-row>
              <b-col>
                <header class="subheader">Approved Contractors</header>
                <ul>
                  <li v-for="contractor in job.contractors" :key='contractor.key' v-if="contractor.approved === true">{{contractor}}</li>
                </ul>
              </b-col>
              <b-col>
                <header class="subheader">Pending Contractors</header>
                <ul>
                  <li v-for="contractor in job.contractors" :key='contractor.key' v-if="contractor.approved === false">{{contractor.name}}</li>
                </ul>
              </b-col>
              <b-col> 
                <header class="subheader">Signed In</header>
                <ul>
                  <li>Worker name/Timestamp</li>
                </ul>
              </b-col>
              <b-col>
                <header class="subheader">Current Safety Plans</header>
                <ul>
                  <li>View Safety Plan: Date</li>
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
      pending: [],
      approved: []
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
    status () {
      this.contractors.forEach((contractor) => {
        if (contractor.status === 'pending') {
          this.pending.push(contractor)
        } else {
          this.approved.push(contractor)
        }
      })
    },
    editJob (id) {
      let companyType = this.$store.getters.user.companyType
      this.$router.push('/' + companyType + '/job/' + id)
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