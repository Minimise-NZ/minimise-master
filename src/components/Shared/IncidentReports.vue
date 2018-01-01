<template>
  <b-container fluid>
    <b-card header="Incident Reports" header-tag="header">
      <b-row class="subheader">
          <b-col>
            <header>Site Address</header>
          </b-col>
          <b-col>
            <header>Incident Type</header>
          </b-col>
          <b-col>
            <header>Reported By</header>
          </b-col>
          <b-col>
            <header>Date</header>
          </b-col>
          <b-col>
            <header>Status</header>
          </b-col>
        </b-row>
        <div class="scroll-container">
          <b-row class="content" v-for="incident in incidents" :key="incident.address">
            <b-col>
              <p style="text-decoration: underline; color: #178ac3; cursor: pointer"  @click="viewIncident(incident.id)">{{incident.address}}</p>
            </b-col>
            <b-col>
              <p>{{incident.type}}</p>
            </b-col>
            <b-col>
              <p>{{incident.reportedBy}}</p>
            </b-col>
            <b-col>
              <p>{{formattedDate(incident.date)}}</p>
            </b-col>
             <b-col>
              <p>{{status(incident.open)}}</p>
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
    incidents () {
      return this.$store.getters.incidents
    }
  },
  methods: {
    viewIncident (id) {
      let companyType = this.$store.getters.user.companyType
      this.$router.push('/' + companyType + '/incident/' + id)
    },
    status (open) {
      if (open === true) {
        return 'open'
      } else {
        return 'closed'
      }
    },
    formattedDate (incidentDate) {
      let newdate = incidentDate.toString().slice(0, 15)
      return newdate
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
    background-color: #12807a;
    font-size: 1.4rem;
    color: white;
  }
  
  .card-body {
    padding-top: 0;
  }
  
  .subheader {
    padding: 15px 0 15px 15px;
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